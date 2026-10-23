package com.examly.springapp.model;

public record LoginDTO(
        String email,
        String password
) {}