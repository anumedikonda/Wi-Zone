package com.examly.springapp.exceptions;

import lombok.extern.log4j.Log4j2;

@Log4j2
public class WiFiSchemeRequestException extends RuntimeException {

    public WiFiSchemeRequestException() {
        super();
    }

    public WiFiSchemeRequestException(String message) {
        super(message);
        log.error(message);
    }

    public WiFiSchemeRequestException(String message, Throwable cause) {
        super(message, cause);
        log.error(message, cause);
    }

    public WiFiSchemeRequestException(Throwable cause) {
        super(cause);
        log.error(cause.getMessage(), cause);
    }
}