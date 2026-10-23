package com.examly.springapp.exceptions;

import lombok.extern.log4j.Log4j2;

@Log4j2
public class DuplicateWiFiSchemeException extends RuntimeException {


    public DuplicateWiFiSchemeException() {
        super();
    }

    public DuplicateWiFiSchemeException(String message) {
        super(message);
        log.error(message);
        
    }

    public DuplicateWiFiSchemeException(String message, Throwable cause) {
        super(message, cause);
        log.error(message, cause);
    }

    public DuplicateWiFiSchemeException(Throwable cause) {
        super(cause);
        log.error(cause.getMessage(), cause);
    }
}