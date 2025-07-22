package com.ecom_dashboard.ecom.exception;

public class UserAlreadyExistsException extends RuntimeException{
    public UserAlreadyExistsException(String e){
        super(e);
    }
}
