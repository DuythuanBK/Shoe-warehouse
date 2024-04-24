package com.shoes.warehoue.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public class Error {
    private final String message;
    private final HttpStatus status;

    public Error(String message, HttpStatus status) {
        this.message = message;
        this.status = status;
    }
}
