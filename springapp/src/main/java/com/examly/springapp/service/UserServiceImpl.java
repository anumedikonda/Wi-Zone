package com.examly.springapp.service;

import com.examly.springapp.exceptions.DuplicateWiFiSchemeException;
import com.examly.springapp.exceptions.WiFiSchemeException;
import com.examly.springapp.model.User;
import com.examly.springapp.repository.UserRepo;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private static final String USER_ALREADY_EXISTS =
            "User with email %s already exists";

    private static final String INVALID_CREDENTIALS =
            "Invalid email or password";

    private final UserRepo userRepo;
    private final PasswordEncoder passwordEncoder;

    @Override
    @Transactional
    public User createUser(User user) {
        log.info("Creating a new user");

        validateEmailAvailability(user.getEmail());

        user.setPassword(passwordEncoder.encode(user.getPassword()));

        User savedUser = userRepo.save(user);

        log.info(
                "User created successfully with id={}",
                savedUser.getUserId()
        );

        return savedUser;
    }

    @Override
    @Transactional(readOnly = true)
    public User loginUser(User user) {
        log.debug("Authenticating user");

        User existingUser = userRepo.findByEmail(user.getEmail());

        if (existingUser == null ||
                !passwordEncoder.matches(
                        user.getPassword(),
                        existingUser.getPassword()
                )) {

            log.warn("User authentication failed");
            throw new WiFiSchemeException(INVALID_CREDENTIALS);
        }

        log.info(
                "User authenticated successfully with id={}",
                existingUser.getUserId()
        );

        return existingUser;
    }

    /**
     * Validates that the given email is not already registered.
     *
     * @param email email address entered during registration
     * @throws DuplicateWiFiSchemeException if the email already exists
     */
    private void validateEmailAvailability(String email) {
        if (userRepo.findByEmail(email) != null) {
            throw new DuplicateWiFiSchemeException(
                    USER_ALREADY_EXISTS.formatted(email)
            );
        }
    }
}


 
 