package com.examly.springapp.config;
 
import jakarta.servlet.http.HttpServletResponse;
 
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
 
@Configuration
public class SecurityConfig {
 
    private JwtAuthenticationFilter jwtAuthenticationFilter;
 
    private JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint;
 
    @Autowired
    public SecurityConfig(JwtAuthenticationFilter jwtAuthenticationFilter,
            JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint) {
        this.jwtAuthenticationFilter = jwtAuthenticationFilter;
        this.jwtAuthenticationEntryPoint = jwtAuthenticationEntryPoint;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
 
        http
                .csrf(csrf -> csrf.disable())
                .cors(cors -> {
                })
                .exceptionHandling(ex -> ex
                        .authenticationEntryPoint(jwtAuthenticationEntryPoint)
                        .accessDeniedHandler((request, response, accessDeniedException) -> {
                            response.sendError(HttpServletResponse.SC_FORBIDDEN, "Forbidden");
                        }))
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(auth -> auth

                        .requestMatchers(
                                "/swagger-ui/**",
                                "/swagger-ui.html",
                                "/v3/api-docs/**",
                                "/v3/api-docs",
                                "/swagger-resources/**",
                                "/webjars/**").permitAll()

                        .requestMatchers("/api/register", "/api/login").permitAll()

                        .requestMatchers(HttpMethod.POST, "/api/wifiScheme").hasRole("Admin")
                        .requestMatchers(HttpMethod.PUT, "/api/wifiScheme/**").hasRole("Admin")
                        .requestMatchers(HttpMethod.GET, "/api/wifiScheme").hasAnyRole("Admin", "User")
                        .requestMatchers(HttpMethod.GET, "/api/wifiScheme/**").hasRole("Admin")

                        .requestMatchers(HttpMethod.POST, "/api/wifiSchemeRequest").hasRole("User")
                        .requestMatchers(HttpMethod.GET, "/api/wifiSchemeRequest/user/**").hasRole("User")
                        .requestMatchers(HttpMethod.GET, "/api/wifiSchemeRequest").hasRole("Admin")
                        .requestMatchers(HttpMethod.GET, "/api/wifiSchemeRequest/**").hasAnyRole("Admin", "User")

                        .requestMatchers(HttpMethod.POST, "/api/feedback").hasRole("User")
                        .requestMatchers(HttpMethod.GET, "/api/feedback").hasRole("Admin")
                        .requestMatchers(HttpMethod.GET, "/api/feedback/user/**").hasRole("User")

                        .anyRequest().authenticated()

                );

        http.addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);
 
        return http.build();
    }


    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();

    }
}
 