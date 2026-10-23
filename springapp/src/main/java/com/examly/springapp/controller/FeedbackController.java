package com.examly.springapp.controller;

import com.examly.springapp.model.Feedback;
import com.examly.springapp.service.FeedbackService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Tag(name = "Feedback Management", description = "APIs for creating, retrieving and deleting user feedback")
@RestController
@RequestMapping("/api/feedback")
public class FeedbackController {

    private FeedbackService feedbackService;

    @Autowired
    public FeedbackController(FeedbackService feedbackService) {
        this.feedbackService = feedbackService;
    }

    @Operation(summary = "Create new feedback")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Feedback submitted successfully"),
            @ApiResponse(responseCode = "400", description = "Invalid feedback details"),
            @ApiResponse(responseCode = "404", description = "Associated user or WiFi scheme not found")
    })
    @PostMapping
    public ResponseEntity<Feedback> createFeedback(@RequestBody Feedback feedback) {

        return ResponseEntity.status(HttpStatus.CREATED).body(feedbackService.createFeedback(feedback));
    }

    @Operation(summary = "Get feedback by ID")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Feedback retrieved successfully"),
            @ApiResponse(responseCode = "404", description = "Feedback not found")
    })
    @GetMapping("/{feedbackId}")
    public ResponseEntity<Feedback> getFeedbackById(@PathVariable Long feedbackId) {

        return ResponseEntity.status(HttpStatus.OK).body(feedbackService.getFeedbackById(feedbackId));
    }

    @Operation(summary = "Get all feedback")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Feedback list retrieved successfully")
    })
    @GetMapping
    public ResponseEntity<List<Feedback>> getAllFeedbacks() {

        return ResponseEntity.status(HttpStatus.OK).body(feedbackService.getAllFeedbacks());
    }

    @Operation(summary = "Get feedback by user ID")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "User feedback retrieved successfully"),
            @ApiResponse(responseCode = "404", description = "User not found")
    })
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Feedback>> getFeedbacksByUserId(@PathVariable Long userId) {

        return ResponseEntity.status(HttpStatus.OK).body(feedbackService.getFeedbacksByUserId(userId));
    }

    @Operation(summary = "Delete a feedback")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Feedback deleted successfully"),
            @ApiResponse(responseCode = "404", description = "Feedback not found")
    })
    @DeleteMapping("/{feedbackId}")
    public ResponseEntity<Feedback> deleteFeedback(@PathVariable Long feedbackId) {

        return ResponseEntity.status(HttpStatus.OK).body(feedbackService.deleteFeedback(feedbackId));
    }
}