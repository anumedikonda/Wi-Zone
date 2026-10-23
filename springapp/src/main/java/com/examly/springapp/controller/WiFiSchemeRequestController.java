package com.examly.springapp.controller;

import com.examly.springapp.model.WiFiSchemeRequest;
import com.examly.springapp.service.WiFiSchemeRequestService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/wifiSchemeRequest")
@Tag(name = "WiFi Scheme Request Management", description = "APIs for creating, retrieving, updating and deleting WiFi scheme requests")
public class WiFiSchemeRequestController {

    private final WiFiSchemeRequestService requestService;

    @Operation(summary = "Create a WiFi scheme request")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "WiFi scheme request created successfully"),
            @ApiResponse(responseCode = "400", description = "Invalid request details"),
            @ApiResponse(responseCode = "404", description = "User or WiFi scheme not found")
    })
    @PostMapping
    public ResponseEntity<WiFiSchemeRequest> addWiFiSchemeRequest(@RequestBody WiFiSchemeRequest req) {
        log.info("Received request to create WiFi scheme request");
        return ResponseEntity.status(HttpStatus.CREATED).body(requestService.addWiFiSchemeRequest(req));
    }

    @Operation(summary = "Get a WiFi scheme request by ID")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "WiFi scheme request retrieved successfully"),
            @ApiResponse(responseCode = "404", description = "WiFi scheme request not found")
    })
    @GetMapping("/{wifiSchemeRequestId}")
    public ResponseEntity<WiFiSchemeRequest> getWiFiSchemeRequestById(@PathVariable Long wifiSchemeRequestId) {
        log.debug("Received request to fetch WiFi scheme request with id={}", wifiSchemeRequestId);
        return ResponseEntity.status(HttpStatus.OK).body(requestService.getWiFiSchemeRequestById(wifiSchemeRequestId));
    }

    @Operation(summary = "Get WiFi scheme requests by user ID")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "User requests retrieved successfully"),
            @ApiResponse(responseCode = "404", description = "User not found")
    })
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<WiFiSchemeRequest>> getWiFiSchemeRequestsByUserId(@PathVariable Long userId) {
        log.debug("Received request to fetch WiFi scheme requests for userId={}", userId);
        return ResponseEntity.status(HttpStatus.OK).body(requestService.getWiFiSchemeRequestsByUserId(userId));
    }

    @Operation(summary = "Get all WiFi scheme requests")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "WiFi scheme requests retrieved successfully")
    })
    @GetMapping
    public ResponseEntity<List<WiFiSchemeRequest>> getAllWiFiSchemeRequests() {
        log.debug("Received request to fetch all WiFi scheme requests");
        return ResponseEntity.status(HttpStatus.OK).body(requestService.getAllWiFiSchemeRequests());
    }

    @Operation(summary = "Update a WiFi scheme request")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "WiFi scheme request updated successfully"),
            @ApiResponse(responseCode = "400", description = "Invalid request details"),
            @ApiResponse(responseCode = "404", description = "WiFi scheme request not found")
    })
    @PutMapping("/{wifiSchemeRequestId}")
    public ResponseEntity<WiFiSchemeRequest> updateWiFiSchemeRequest(@PathVariable Long wifiSchemeRequestId,@RequestBody WiFiSchemeRequest req) {
        log.info("Received request to update WiFi scheme request with id={}", wifiSchemeRequestId);
        return ResponseEntity.status(HttpStatus.OK).body(requestService.updateWiFiSchemeRequest(wifiSchemeRequestId, req));
    }

    @Operation(summary = "Delete a WiFi scheme request")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "WiFi scheme request deleted successfully"),
            @ApiResponse(responseCode = "404", description = "WiFi scheme request not found")
    })
    @DeleteMapping("/{wifiSchemeRequestId}")
    public ResponseEntity<Boolean> deleteWiFiSchemeRequest(@PathVariable Long wifiSchemeRequestId) {
        log.info("Received request to delete WiFi scheme request with id={}", wifiSchemeRequestId);
        return ResponseEntity.status(HttpStatus.OK).body(requestService.deleteWiFiSchemeRequest(wifiSchemeRequestId));
    }
}