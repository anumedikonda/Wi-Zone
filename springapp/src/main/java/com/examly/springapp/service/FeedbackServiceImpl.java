package com.examly.springapp.service;

import com.examly.springapp.exceptions.WiFiSchemeException;
import com.examly.springapp.model.Feedback;
import com.examly.springapp.model.User;
import com.examly.springapp.model.WiFiScheme;
import com.examly.springapp.repository.FeedbackRepo;
import com.examly.springapp.repository.UserRepo;
import com.examly.springapp.repository.WiFiSchemeRepo;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
public class FeedbackServiceImpl implements FeedbackService {

    private final FeedbackRepo feedbackRepo;
    private final UserRepo userRepo;
    private final WiFiSchemeRepo wiFiSchemeRepo;

    private static final String USER_ID_REQUIRED = "User id is required";
    private static final String USER_NOT_FOUND = "User not found with id ";
    private static final String WIFI_SCHEME_NOT_FOUND = "WiFi Scheme not found with id ";
    private static final String FEEDBACK_NOT_FOUND = "Feedback not found with id ";
    private static final String NO_FEEDBACKS_FOR_USER = "No feedbacks found for userId ";

    @Override
    @Transactional
    public Feedback createFeedback(Feedback feedback) {
        log.info("Creating feedback for userId={}", extractUserId(feedback));

        feedback.setUser(resolveUser(feedback));
        feedback.setWifiScheme(resolveWifiScheme(feedback).orElse(null));

        Feedback saved = feedbackRepo.save(feedback);
        log.info("Feedback created successfully with id={}", saved.getFeedbackId());
        return saved;
    }

    @Override
    @Transactional(readOnly = true)
    public Feedback getFeedbackById(Long feedbackId) {
        log.debug("Fetching feedback with id={}", feedbackId);
        return feedbackRepo.findById(feedbackId)
                .orElseThrow(() -> new WiFiSchemeException(FEEDBACK_NOT_FOUND + feedbackId));
    }

    @Override
    @Transactional(readOnly = true)
    public List<Feedback> getAllFeedbacks() {
        log.debug("Fetching all feedbacks");
        return feedbackRepo.findAll();
    }

    @Override
    @Transactional
    public Feedback deleteFeedback(Long feedbackId) {
        log.info("Deleting feedback with id={}", feedbackId);
        Feedback existing = feedbackRepo.findById(feedbackId)
                .orElseThrow(() -> new WiFiSchemeException(FEEDBACK_NOT_FOUND + feedbackId));
        feedbackRepo.delete(existing);
        log.info("Feedback deleted successfully with id={}", feedbackId);
        return existing;
    }

    @Override
    @Transactional(readOnly = true)
    public List<Feedback> getFeedbacksByUserId(Long userId) {
        log.debug("Fetching feedbacks for userId={}", userId);
        List<Feedback> list = feedbackRepo.findByUser_UserId(userId);
        return Optional.of(list)
                .filter(l -> !l.isEmpty())
                .orElseThrow(() -> new WiFiSchemeException(NO_FEEDBACKS_FOR_USER + userId));
    }

    /** Extract userId safely from feedback, returns null if missing */
    private Long extractUserId(Feedback feedback) {
        return Optional.ofNullable(feedback.getUser())
                .map(User::getUserId)
                .orElse(null);
    }

    /** Resolves user from DB, throws if user id missing or not found */
    private User resolveUser(Feedback feedback) {
        Long userId = Optional.ofNullable(feedback.getUser())
                .map(User::getUserId)
                .orElseThrow(() -> new WiFiSchemeException(USER_ID_REQUIRED));

        return userRepo.findById(userId)
                .orElseThrow(() -> new WiFiSchemeException(USER_NOT_FOUND + userId));
    }

    /** Resolves optional WiFi scheme from DB, empty if not linked */
    private Optional<WiFiScheme> resolveWifiScheme(Feedback feedback) {
        return Optional.ofNullable(feedback.getWifiScheme())
                .map(WiFiScheme::getWifiSchemeId)
                .map(id -> wiFiSchemeRepo.findById(id)
                        .orElseThrow(() -> new WiFiSchemeException(WIFI_SCHEME_NOT_FOUND + id)));
    }
}