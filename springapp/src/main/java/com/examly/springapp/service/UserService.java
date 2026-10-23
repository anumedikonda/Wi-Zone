package com.examly.springapp.service;
 
import com.examly.springapp.exceptions.WiFiSchemeException;
import com.examly.springapp.model.User;
 
public interface UserService {
 
    User createUser(User user)throws WiFiSchemeException;
 
    User loginUser(User user)throws WiFiSchemeException;
}
 