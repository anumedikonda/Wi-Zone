package com.examly.springapp.service;

import com.examly.springapp.exceptions.WiFiSchemeRequestException;
import com.examly.springapp.model.WiFiSchemeRequest;
import com.examly.springapp.repository.WiFiSchemeRequestRepo;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
public class WiFiSchemeRequestServiceImpl implements WiFiSchemeRequestService {

    private static final String REQUEST_NULL =
            "WiFiSchemeRequest cannot be null";

    private static final String REQUEST_NOT_FOUND =
            "WiFiSchemeRequest not found with id ";

    private final WiFiSchemeRequestRepo requestRepo;

    @Override
    @Transactional
    public WiFiSchemeRequest addWiFiSchemeRequest(WiFiSchemeRequest wifiSchemeRequest) {

        log.info("Creating WiFi scheme request");

        var saved = Optional.ofNullable(wifiSchemeRequest)
                .map(requestRepo::save)
                .orElseThrow(() ->
                        new WiFiSchemeRequestException(REQUEST_NULL));

        log.info("WiFi scheme request created successfully with id={}",
                saved.getWifiSchemeRequestId());

        return saved;
    }

    @Override
    @Transactional(readOnly = true)
    public WiFiSchemeRequest getWiFiSchemeRequestById(Long wifiSchemeRequestId) {

        log.debug("Fetching WiFi scheme request with id={}", wifiSchemeRequestId);

        return requestRepo.findById(wifiSchemeRequestId)
                .orElseThrow(() ->
                        new WiFiSchemeRequestException(
                                REQUEST_NOT_FOUND + wifiSchemeRequestId));
    }

    @Override
    @Transactional(readOnly = true)
    public List<WiFiSchemeRequest> getAllWiFiSchemeRequests() {

        log.debug("Fetching all WiFi scheme requests");

        return requestRepo.findAll();
    }

    @Override
    @Transactional
    public WiFiSchemeRequest updateWiFiSchemeRequest(
            Long wifiSchemeRequestId,
            WiFiSchemeRequest wifiSchemeRequest) {

        log.info("Updating WiFi scheme request with id={}", wifiSchemeRequestId);

        Optional.ofNullable(wifiSchemeRequest)
                .orElseThrow(() ->
                        new WiFiSchemeRequestException(REQUEST_NULL));

        return requestRepo.findById(wifiSchemeRequestId)
                .map(existing -> {
                    existing.setRequestDate(wifiSchemeRequest.getRequestDate());
                    existing.setStatus(wifiSchemeRequest.getStatus());
                    existing.setComments(wifiSchemeRequest.getComments());
                    existing.setProof(wifiSchemeRequest.getProof());
                    existing.setStreetName(wifiSchemeRequest.getStreetName());
                    existing.setLandmark(wifiSchemeRequest.getLandmark());
                    existing.setCity(wifiSchemeRequest.getCity());
                    existing.setState(wifiSchemeRequest.getState());
                    existing.setZipCode(wifiSchemeRequest.getZipCode());
                    existing.setPreferredSetupDate(wifiSchemeRequest.getPreferredSetupDate());
                    existing.setTimeSlot(wifiSchemeRequest.getTimeSlot());

                    var updated = requestRepo.save(existing);

                    log.info("WiFi scheme request updated successfully with id={}",
                            wifiSchemeRequestId);

                    return updated;
                })
                .orElseThrow(() ->
                        new WiFiSchemeRequestException(
                                REQUEST_NOT_FOUND + wifiSchemeRequestId));
    }

    @Override
    @Transactional
    public boolean deleteWiFiSchemeRequest(Long wifiSchemeRequestId) {

        log.info("Deleting WiFi scheme request with id={}", wifiSchemeRequestId);

        return requestRepo.findById(wifiSchemeRequestId)
                .map(existing -> {
                    requestRepo.delete(existing);

                    log.info("WiFi scheme request deleted successfully with id={}",
                            wifiSchemeRequestId);

                    return true;
                })
                .orElseThrow(() ->
                        new WiFiSchemeRequestException(
                                REQUEST_NOT_FOUND + wifiSchemeRequestId));
    }

    @Override
    @Transactional(readOnly = true)
    public List<WiFiSchemeRequest> getWiFiSchemeRequestsByUserId(Long userId) {

        log.debug("Fetching WiFi scheme requests for userId={}", userId);

        return requestRepo.findByUser_UserId(userId);
    }
}