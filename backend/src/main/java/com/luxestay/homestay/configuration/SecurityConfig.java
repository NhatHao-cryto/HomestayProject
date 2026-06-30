package com.luxestay.homestay.configuration;

import com.luxestay.homestay.enums.Role;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.jose.jws.MacAlgorithm;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.jwt.NimbusJwtDecoder;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationConverter;
import org.springframework.security.oauth2.server.resource.authentication.JwtGrantedAuthoritiesConverter;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class SecurityConfig {


    private final String[] public_endpoints = {"/users", "/auth/token",
            "/auth/introspect", "/auth/logout", "/auth/refresh"};

    @Autowired
    CustomJwtDecoder customJwtDecoder;

   @Bean
public SecurityFilterChain filterChain(HttpSecurity httpSecurity) throws Exception {
    httpSecurity.authorizeHttpRequests(request ->
        request
                .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()

                .requestMatchers(HttpMethod.POST, public_endpoints).permitAll()

                // DEMO: Host Verification
                .requestMatchers(HttpMethod.POST, "/admin/host-verification").permitAll()
                .requestMatchers(HttpMethod.GET, "/admin/host-verifications").permitAll()
                .requestMatchers(HttpMethod.PUT, "/admin/host-verifications/**").permitAll()

                // DEMO: Host Homestay Management
                .requestMatchers(HttpMethod.POST, "/host/homestays").permitAll()
                .requestMatchers(HttpMethod.GET, "/host/homestays").permitAll()
                .requestMatchers(HttpMethod.PUT, "/host/homestays/**").permitAll()
                .requestMatchers(HttpMethod.DELETE, "/host/homestays/**").permitAll()

                // DEMO: Host Room Management
                .requestMatchers(HttpMethod.POST, "/host/rooms").permitAll()
                .requestMatchers(HttpMethod.GET, "/host/rooms").permitAll()
                .requestMatchers(HttpMethod.PUT, "/host/rooms/**").permitAll()
                .requestMatchers(HttpMethod.DELETE, "/host/rooms/**").permitAll()

                // DEMO: System Admin
                .requestMatchers(HttpMethod.GET, "/system/**").permitAll()
                .requestMatchers(HttpMethod.POST, "/system/**").permitAll()
                .requestMatchers(HttpMethod.PUT, "/system/**").permitAll()
                .requestMatchers(HttpMethod.DELETE, "/system/**").permitAll()

                .anyRequest().authenticated()
);
    httpSecurity.oauth2ResourceServer(oauth2 ->
            oauth2.jwt(jwtConfigurer ->
                            jwtConfigurer.decoder(customJwtDecoder)
                                    .jwtAuthenticationConverter(jwtAuthenticationConverter()))
                    .authenticationEntryPoint(new JwtAuthenticationEntryPoint())
    );

    httpSecurity.csrf(AbstractHttpConfigurer::disable);

    return httpSecurity.build();
}

    @Bean
    public CorsFilter corsFilter(){
        CorsConfiguration corsConfiguration = new CorsConfiguration();

        corsConfiguration.addAllowedOrigin("*");
        corsConfiguration.addAllowedMethod("*");
        corsConfiguration.addAllowedHeader("*");

        UrlBasedCorsConfigurationSource urlBasedCorsConfigurationSource = new UrlBasedCorsConfigurationSource();
        urlBasedCorsConfigurationSource.registerCorsConfiguration("/**", corsConfiguration);

        return new CorsFilter(urlBasedCorsConfigurationSource);
    }

    @Bean
    PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder(10);
    }

    @Bean
    JwtAuthenticationConverter jwtAuthenticationConverter(){
        JwtGrantedAuthoritiesConverter jwtGrantedAuthoritiesConverter = new JwtGrantedAuthoritiesConverter();
        jwtGrantedAuthoritiesConverter.setAuthorityPrefix("");

        JwtAuthenticationConverter jwtAuthenticationConverter = new JwtAuthenticationConverter();
        jwtAuthenticationConverter.setJwtGrantedAuthoritiesConverter(jwtGrantedAuthoritiesConverter);
        return jwtAuthenticationConverter;
    }
}
