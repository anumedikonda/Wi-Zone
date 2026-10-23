package com.examly.springapp.repository;

import com.examly.springapp.model.WiFiSchemeRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface WiFiSchemeRequestRepo extends JpaRepository<WiFiSchemeRequest, Long> {
    List<WiFiSchemeRequest> findByUser_UserId(Long userId);
} 