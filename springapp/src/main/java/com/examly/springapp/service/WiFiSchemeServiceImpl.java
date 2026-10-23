package com.examly.springapp.service;

import com.examly.springapp.exceptions.DuplicateWiFiSchemeException;
import com.examly.springapp.exceptions.WiFiSchemeDeletionException;
import com.examly.springapp.exceptions.WiFiSchemeException;
import com.examly.springapp.model.Feedback;
import com.examly.springapp.model.WiFiScheme;
import com.examly.springapp.model.WiFiSchemeRequest;
import com.examly.springapp.repository.FeedbackRepo;
import com.examly.springapp.repository.WiFiSchemeRepo;
import com.examly.springapp.repository.WiFiSchemeRequestRepo;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.Set;

@Slf4j
@Service
@RequiredArgsConstructor
public class WiFiSchemeServiceImpl implements WiFiSchemeService {

    private final WiFiSchemeRepo wifiSchemeRepo;
    private final WiFiSchemeRequestRepo requestRepo;
    private final FeedbackRepo feedbackRepo;

    private static final String SCHEME_NOT_FOUND = "WiFiScheme not found with id ";
    private static final String SCHEME_ALREADY_EXISTS = "WiFiScheme with name '%s' already exists";
    private static final String SCHEME_HAS_ACTIVE_REQS = "Cannot delete this scheme — it has active or pending user requests.";
    private static final String SCHEME_DELETE_FAILED = "Unable to delete WiFiScheme: ";

    private static final Set<String> ACTIVE_STATUSES = Set.of("APPROVED", "PENDING");

    @Override
    @Transactional
    public WiFiScheme addWiFiScheme(WiFiScheme wifiScheme) {
        log.info("Adding new WiFi scheme: {}", wifiScheme.getSchemeName());

        Optional.of(wifiScheme.getSchemeName())
                .filter(wifiSchemeRepo::existsBySchemeName)
                .ifPresent(name -> {
                    throw new DuplicateWiFiSchemeException(String.format(SCHEME_ALREADY_EXISTS, name));
                });

        WiFiScheme saved = wifiSchemeRepo.save(wifiScheme);
        log.info("WiFi scheme created successfully with id={}", saved.getWifiSchemeId());
        return saved;
    }

    @Override
    @Transactional(readOnly = true)
    public WiFiScheme getWiFiSchemeById(Long wifiSchemeId) {
        log.debug("Fetching WiFi scheme with id={}", wifiSchemeId);
        return findSchemeOrThrow(wifiSchemeId);
    }

    @Override
    @Transactional(readOnly = true)
    public List<WiFiScheme> getAllWiFiSchemes() {
        log.debug("Fetching all WiFi schemes");
        return wifiSchemeRepo.findAll();
    }

    @Override
    @Transactional
    public WiFiScheme updateWiFiScheme(Long wifiSchemeId, WiFiScheme wifiScheme) {
        log.info("Updating WiFi scheme with id={}", wifiSchemeId);

        WiFiScheme existing = findSchemeOrThrow(wifiSchemeId);
        applyUpdates(existing, wifiScheme);

        WiFiScheme updated = wifiSchemeRepo.save(existing);
        log.info("WiFi scheme updated successfully with id={}", updated.getWifiSchemeId());
        return updated;
    }

    @Override
    @Transactional
    public WiFiScheme deleteWiFiScheme(Long wifiSchemeId) {
        log.info("Attempting to delete WiFi scheme with id={}", wifiSchemeId);

        WiFiScheme existing = findSchemeOrThrow(wifiSchemeId);
        List<WiFiSchemeRequest> relatedRequests = fetchRelatedRequests(wifiSchemeId);

        ensureNoActiveRequests(relatedRequests);
        performCascadeDelete(existing, relatedRequests, wifiSchemeId);

        log.info("WiFi scheme deleted successfully with id={}", wifiSchemeId);
        return existing;
    }


    /** Fetches WiFi scheme by id or throws WiFiSchemeException */
    private WiFiScheme findSchemeOrThrow(Long wifiSchemeId) {
        return wifiSchemeRepo.findById(wifiSchemeId)
                .orElseThrow(() -> new WiFiSchemeException(SCHEME_NOT_FOUND + wifiSchemeId));
    }

    /** Applies incoming field values to the existing entity */
    private void applyUpdates(WiFiScheme existing, WiFiScheme incoming) {
        existing.setSchemeName(incoming.getSchemeName());
        existing.setDescription(incoming.getDescription());
        existing.setRegion(incoming.getRegion());
        existing.setSpeed(incoming.getSpeed());
        existing.setDataLimit(incoming.getDataLimit());
        existing.setFee(incoming.getFee());
        existing.setAvailabilityStatus(incoming.getAvailabilityStatus());
    }

    /** Returns all requests linked to the given scheme id */
    private List<WiFiSchemeRequest> fetchRelatedRequests(Long wifiSchemeId) {
        return requestRepo.findAll().stream()
                .filter(r -> isLinkedToScheme(r.getWifiScheme(), wifiSchemeId))
                .toList();
    }

    /** Returns all feedbacks linked to the given scheme id */
    private List<Feedback> fetchRelatedFeedbacks(Long wifiSchemeId) {
        return feedbackRepo.findAll().stream()
                .filter(f -> isLinkedToScheme(f.getWifiScheme(), wifiSchemeId))
                .toList();
    }

    /** Null-safe equality check between a scheme reference and a scheme id */
    private boolean isLinkedToScheme(WiFiScheme scheme, Long wifiSchemeId) {
        return Optional.ofNullable(scheme)
                .map(WiFiScheme::getWifiSchemeId)
                .filter(id -> id.equals(wifiSchemeId))
                .isPresent();
    }

    /**
     * Throws WiFiSchemeDeletionException when any request is Approved or Pending
     */
    private void ensureNoActiveRequests(List<WiFiSchemeRequest> relatedRequests) {
        boolean hasActive = relatedRequests.stream()
                .map(WiFiSchemeRequest::getStatus)
                .filter(s -> s != null)
                .map(String::toUpperCase)
                .anyMatch(ACTIVE_STATUSES::contains);

        if (hasActive) {
            log.warn("Deletion blocked — scheme has active/pending requests");
            throw new WiFiSchemeDeletionException(SCHEME_HAS_ACTIVE_REQS);
        }
    }

    /** Deletes related requests, feedbacks, then the scheme itself */
    private void performCascadeDelete(WiFiScheme scheme,
            List<WiFiSchemeRequest> relatedRequests,
            Long wifiSchemeId) {
        try {
            deleteIfPresent(relatedRequests, requestRepo::deleteAll);
            deleteIfPresent(fetchRelatedFeedbacks(wifiSchemeId), feedbackRepo::deleteAll);
            wifiSchemeRepo.delete(scheme);
        } catch (Exception e) {
            log.error("Failed to delete WiFi scheme id={}: {}", wifiSchemeId, e.getMessage(), e);
            throw new WiFiSchemeDeletionException(SCHEME_DELETE_FAILED + e.getMessage());
        }
    }

    /** Executes bulk delete only when list is non-empty */
    private <T> void deleteIfPresent(List<T> items, java.util.function.Consumer<List<T>> deleteAction) {
        Optional.of(items)
                .filter(list -> !list.isEmpty())
                .ifPresent(deleteAction);
    }
}