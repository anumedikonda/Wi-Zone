package com.examly.springapp.model;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;

@Entity
@Data
public class WiFiSchemeRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long wifiSchemeRequestId;

    @ManyToOne
    @JoinColumn(name = "userId")
    private User user;

    @ManyToOne
    @JoinColumn(name = "wifiSchemeId")
    private WiFiScheme wifiScheme;

    private LocalDate requestDate;

    private String status;

    private String comments;


   @Lob
   @Column(columnDefinition = "LONGTEXT",nullable = true)
    private String proof;

    private String streetName;

    private String landmark;

    private String city;

    private String state;

    private String zipCode;

    private LocalDate preferredSetupDate;

    private String timeSlot;

}
