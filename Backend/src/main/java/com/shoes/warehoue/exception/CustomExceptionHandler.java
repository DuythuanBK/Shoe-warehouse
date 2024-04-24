package com.shoes.warehoue.exception;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class CustomExceptionHandler {
    @ExceptionHandler(value = AppException.class)
    public ResponseEntity<ErrorResponse> handleException(AppException e) {
        System.out.println(e);
        return ResponseEntity.status(e.getError().getStatus()).body(new ErrorResponse(e.getError().getMessage()));
    }
}
