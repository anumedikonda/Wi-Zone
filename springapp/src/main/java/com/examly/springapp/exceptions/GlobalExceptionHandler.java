package com.examly.springapp.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(DuplicateWiFiSchemeException.class)
    public ResponseEntity<String> handleDuplicateWiFiSchemeException(DuplicateWiFiSchemeException ex) {
        return new ResponseEntity<>(ex.getMessage(), HttpStatus.CONFLICT);
    }

    @ExceptionHandler(WiFiSchemeDeletionException.class)
    public ResponseEntity<String> handleWiFiSchemeDeletionException(WiFiSchemeDeletionException ex) {
        return new ResponseEntity<>(ex.getMessage(), HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(WiFiSchemeException.class)
    public ResponseEntity<String> handleWiFiSchemeException(WiFiSchemeException ex) {
        return new ResponseEntity<>(ex.getMessage(), HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(WiFiSchemeRequestException.class)
    public ResponseEntity<String> handleWiFiSchemeRequestException(WiFiSchemeRequestException ex) {
        return new ResponseEntity<>(ex.getMessage(), HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<String> handleGeneralException(Exception ex) {
        return new ResponseEntity<>(ex.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
    }
}