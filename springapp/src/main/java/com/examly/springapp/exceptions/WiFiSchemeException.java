package com.examly.springapp.exceptions;

import lombok.extern.log4j.Log4j2;

@Log4j2
public class WiFiSchemeException extends RuntimeException {


    public WiFiSchemeException() {
        super();
    }

    public WiFiSchemeException(String message) {
        super(message);
        log.error(message);
    }

    public WiFiSchemeException(String message, Throwable cause) {
        super(message, cause);
        log.error(message, cause);
    }

    public WiFiSchemeException(Throwable cause) {
        super(cause);
        log.error(cause.getMessage(), cause);
    }
}