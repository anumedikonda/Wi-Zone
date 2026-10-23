package com.examly.springapp.exceptions;

import lombok.extern.log4j.Log4j2;

@Log4j2
public class WiFiSchemeDeletionException extends RuntimeException {


    public WiFiSchemeDeletionException() {
        super();
    }

    public WiFiSchemeDeletionException(String message) {
        super(message);
        log.error(message);
    }

    public WiFiSchemeDeletionException(String message, Throwable cause) {
        super(message, cause);
        log.error(message, cause);
    }

    public WiFiSchemeDeletionException(Throwable cause) {
        super(cause);
        log.error(cause.getMessage(), cause);
    }
}