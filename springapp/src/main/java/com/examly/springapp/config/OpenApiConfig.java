package com.examly.springapp.config;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Contact;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.annotations.servers.Server;
import org.springframework.context.annotation.Configuration;

@Configuration
@OpenAPIDefinition(
    info = @Info(
        title = "WiZone WiFi Scheme Management API",
        version = "1.0.0",
        description = """
        WiZone Team

        Developed By:
        - Hardikk
        - Shivam
        - Harshit
        - Prajith
        - Anuradha

        """,
        termsOfService = "https://wizone.com/terms",
        contact = @Contact(
            name = "WiZone Development Team",
            email = "support@wizone.com"
        )
    ),
    servers = {
        @Server(
            url = "http://localhost:8080",
            description = "Development Server"
        )
    }
)
public class OpenApiConfig {
}



