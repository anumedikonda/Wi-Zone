package com.examly.springapp.service;

import com.examly.springapp.exceptions.DuplicateWiFiSchemeException;
import com.examly.springapp.exceptions.WiFiSchemeDeletionException;
import com.examly.springapp.exceptions.WiFiSchemeException;
import com.examly.springapp.model.WiFiScheme;

import java.util.List;


public interface WiFiSchemeService {

    WiFiScheme addWiFiScheme(WiFiScheme wifiScheme)throws DuplicateWiFiSchemeException;

    WiFiScheme getWiFiSchemeById(Long wifiSchemeId)throws WiFiSchemeException;

    List<WiFiScheme> getAllWiFiSchemes()throws WiFiSchemeException;

    WiFiScheme updateWiFiScheme(Long wifiSchemeId,WiFiScheme wifiScheme)throws WiFiSchemeException;

    WiFiScheme deleteWiFiScheme(Long wifiSchemeId)throws WiFiSchemeException, WiFiSchemeDeletionException;
}