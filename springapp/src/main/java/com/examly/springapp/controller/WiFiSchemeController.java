package com.examly.springapp.controller;
 
import com.examly.springapp.model.WiFiScheme;
import com.examly.springapp.service.WiFiSchemeService;
 
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
 
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
 
import java.util.List;
 
@Tag(name = "WiFi Scheme Management", description = "APIs for creating, retrieving, updating and deleting WiFi schemes")
@RestController
@RequestMapping("/api/wifiScheme")
public class WiFiSchemeController {
 
    private final WiFiSchemeService wifiSchemeService;
 
    @Autowired
    public WiFiSchemeController(WiFiSchemeService wifiSchemeService) {
        this.wifiSchemeService = wifiSchemeService;
    }
 
    @Operation(summary = "Adds a new WiFi scheme")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "WiFi scheme created successfully"),
            @ApiResponse(responseCode = "400", description = "Invalid WiFi scheme details"),
            @ApiResponse(responseCode = "409", description = "WiFi scheme already exists")
    })
    @PostMapping
    public ResponseEntity<WiFiScheme> addWiFiScheme(@RequestBody WiFiScheme wifiScheme) {

        return ResponseEntity.status(HttpStatus.CREATED).body(wifiSchemeService.addWiFiScheme(wifiScheme));
    }
 
    @Operation(summary = "Get a WiFi scheme by ID")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "WiFi scheme retrieved successfully"),
            @ApiResponse(responseCode = "404", description = "WiFi scheme not found")
    })
    @GetMapping("/{wifiSchemeId}")
    public ResponseEntity<WiFiScheme> getWiFiSchemeById(@PathVariable Long wifiSchemeId) {
 
        return ResponseEntity.status(HttpStatus.OK).body(wifiSchemeService.getWiFiSchemeById(wifiSchemeId));
    }
 
    @Operation(summary = "Get all WiFi schemes")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "WiFi schemes retrieved successfully")
    })
    @GetMapping
    public ResponseEntity<List<WiFiScheme>> getAllWiFiSchemes() {
 
        return ResponseEntity.status(HttpStatus.OK).body(wifiSchemeService.getAllWiFiSchemes());
    }
 
    @Operation(summary = "Update an existing WiFi scheme")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "WiFi scheme updated successfully"),
            @ApiResponse(responseCode = "400", description = "Invalid WiFi scheme details"),
            @ApiResponse(responseCode = "404", description = "WiFi scheme not found")
    })
    @PutMapping("/{wifiSchemeId}")
    public ResponseEntity<WiFiScheme> updateWiFiScheme(@PathVariable Long wifiSchemeId, @RequestBody WiFiScheme wifiScheme) {
 
        return ResponseEntity.status(HttpStatus.OK).body(wifiSchemeService.updateWiFiScheme(wifiSchemeId, wifiScheme));
    }
 
    @Operation(summary = "Delete a WiFi scheme")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "WiFi scheme deleted successfully"),
            @ApiResponse(responseCode = "404", description = "WiFi scheme not found")
    })
    @DeleteMapping("/{wifiSchemeId}")
    public ResponseEntity<WiFiScheme> deleteWiFiScheme(@PathVariable Long wifiSchemeId) {
 
        return ResponseEntity.status(HttpStatus.OK).body(wifiSchemeService.deleteWiFiScheme(wifiSchemeId));
    }
}