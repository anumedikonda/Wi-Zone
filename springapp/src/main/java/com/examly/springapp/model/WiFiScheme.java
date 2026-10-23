package com.examly.springapp.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class WiFiScheme {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long wifiSchemeId;

    private String schemeName;

    private String description;

    private String region;

    private String speed;

    private String dataLimit;

    private Double fee;

    private String availabilityStatus;

}
