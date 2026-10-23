package com.examly.springapp.service;

import com.examly.springapp.exceptions.WiFiSchemeRequestException;
import com.examly.springapp.model.WiFiSchemeRequest;

import java.util.List;

public interface WiFiSchemeRequestService {

    WiFiSchemeRequest addWiFiSchemeRequest(WiFiSchemeRequest wifiSchemeRequest)throws WiFiSchemeRequestException;

    WiFiSchemeRequest getWiFiSchemeRequestById(Long wifiSchemeRequestId)throws WiFiSchemeRequestException;

    List<WiFiSchemeRequest> getAllWiFiSchemeRequests()throws WiFiSchemeRequestException;

    WiFiSchemeRequest updateWiFiSchemeRequest(Long wifiSchemeRequestId,WiFiSchemeRequest wifiSchemeRequest)throws WiFiSchemeRequestException;

    boolean deleteWiFiSchemeRequest(Long wifiSchemeRequestId)throws WiFiSchemeRequestException;

    List<WiFiSchemeRequest> getWiFiSchemeRequestsByUserId(Long userId)throws WiFiSchemeRequestException;
}