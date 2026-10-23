package com.examly.springapp.service;

import com.examly.springapp.exceptions.WiFiSchemeException;
import com.examly.springapp.model.Feedback;

import java.util.List;

public interface FeedbackService {

    Feedback createFeedback(Feedback feedback) throws WiFiSchemeException;

    Feedback getFeedbackById(Long feedbackId) throws WiFiSchemeException;

    List<Feedback> getAllFeedbacks() throws WiFiSchemeException;

    Feedback deleteFeedback(Long feedbackId) throws WiFiSchemeException;

    List<Feedback> getFeedbacksByUserId(Long userId) throws WiFiSchemeException;
}
