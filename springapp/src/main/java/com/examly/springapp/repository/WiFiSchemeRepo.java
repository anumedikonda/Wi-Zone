package com.examly.springapp.repository;

import com.examly.springapp.model.WiFiScheme;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface WiFiSchemeRepo extends JpaRepository<WiFiScheme, Long> {
    boolean existsBySchemeName(String schemeName);
}