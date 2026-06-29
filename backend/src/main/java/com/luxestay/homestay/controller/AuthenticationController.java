package com.luxestay.homestay.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.luxestay.homestay.dto.request.*;
import com.luxestay.homestay.dto.response.ApiResponse;
import com.luxestay.homestay.dto.response.AuthenticationResponse;
import com.luxestay.homestay.dto.response.IntrospectResponse;
import com.luxestay.homestay.dto.response.UserResponse;
import com.luxestay.homestay.service.AuthenticationService;
import com.luxestay.homestay.service.OtpService;
import com.luxestay.homestay.service.UserService;
import com.nimbusds.jose.JOSEException;
import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.text.ParseException;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class AuthenticationController {
    AuthenticationService authenticationService;
    OtpService otpService;
    UserService userService;

    @PostMapping("/token")
    ApiResponse<AuthenticationResponse> authenticate(@RequestBody AuthenticationRequest request){
        var result = authenticationService.authenticate(request);
        return ApiResponse.<AuthenticationResponse>builder()
                .result(result)
                .build();
    }

    @PostMapping("/refresh")
    ApiResponse<AuthenticationResponse> authenticate(@RequestBody RefershRequest request) throws ParseException, JOSEException {
        var result = authenticationService.refreshToken(request);
        return ApiResponse.<AuthenticationResponse>builder()
                .result(result)
                .build();
    }

    @PostMapping("/introspect")
    ApiResponse<IntrospectResponse> authenticate(@RequestBody IntrospectRequest request)
            throws ParseException, JOSEException {
        var result = authenticationService.introspect(request);
        return ApiResponse.<IntrospectResponse>builder()
                .result(result)
                .build();
    }

    @PostMapping("/logout")
    ApiResponse<Void> logout(@RequestBody LogoutRequest request)
            throws ParseException, JOSEException {
        authenticationService.logout(request);
        return ApiResponse.<Void>builder()
                .build();
    }

    @PostMapping("/register")
    public ApiResponse<String> register(@RequestBody @Valid UserCreationRequest request) throws JsonProcessingException {
        otpService.sendOtp(request);
        return ApiResponse.<String>builder()
                .result("Đã gửi mã OTP")
                .build();
    }

    @PostMapping("/verify-pin")
    public ApiResponse<UserResponse> verifyPin(@RequestBody VerifyOtpRequest request) throws JsonProcessingException {
        UserCreationRequest userRequest = otpService.verifyOtp(request);
        UserResponse response = userService.createUser(userRequest);
        return ApiResponse.<UserResponse>builder()
                .result(response)
                .build();
    }
    @PostMapping("/resend-pin")
    public ApiResponse<String> resendOtp(@RequestBody ResendOtpRequest request) {
        otpService.resendOtp(request.getEmail());
        return ApiResponse.<String>builder()
                .result("Đã gửi lại mã OTP")
                .build();
    }
}
