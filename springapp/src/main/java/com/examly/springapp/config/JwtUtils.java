package com.examly.springapp.config;

import java.nio.charset.StandardCharsets;
import java.util.Base64;

import org.springframework.stereotype.Component;

@Component
public class JwtUtils {

    private final String SECRET = "examly-secret-key";

    private static final long EXPIRATION_TIME = 15 * 60 * 1000;

    public String generateToken(Long userId, String email, String role) {

        long expiryTime = System.currentTimeMillis() + EXPIRATION_TIME;

        String data = userId + ":" +
                      email + ":" +
                      role + ":" +
                      expiryTime + ":" +
                      SECRET;

        return Base64.getEncoder()
                .encodeToString(data.getBytes(StandardCharsets.UTF_8));
    }

    public Long getUserIdFromToken(String token) {
        try {
            String decoded = new String(
                    Base64.getDecoder().decode(token),
                    StandardCharsets.UTF_8);

            String[] parts = decoded.split(":");
            return Long.parseLong(parts[0]);

        } catch (Exception e) {
            return null;
        }
    }

    public String getEmailFromToken(String token) {
        try {
            String decoded = new String(
                    Base64.getDecoder().decode(token),
                    StandardCharsets.UTF_8);

            String[] parts = decoded.split(":");
            return parts[1];

        } catch (Exception e) {
            return null;
        }
    }

    public String getRoleFromToken(String token) {
        try {
            String decoded = new String(
                    Base64.getDecoder().decode(token),
                    StandardCharsets.UTF_8);

            String[] parts = decoded.split(":");
            return parts[2];

        } catch (Exception e) {
            return null;
        }
    }

    public boolean validateToken(String token) {
        try {
            String decoded = new String(
                    Base64.getDecoder().decode(token),
                    StandardCharsets.UTF_8);

            String[] parts = decoded.split(":");

            // Expected format:
            // userId:email:role:expiryTime:secret
            if (parts.length != 5) {
                return false;
            }

            String secret = parts[4];

            if (!SECRET.equals(secret)) {
                return false;
            }

            long expiryTime = Long.parseLong(parts[3]);

            return System.currentTimeMillis() < expiryTime;

        } catch (Exception e) {
            return false;
        }
    }
}