package com.luxestay.homestay.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.luxestay.homestay.dto.request.UserCreationRequest;
import com.luxestay.homestay.dto.request.VerifyForgotPasswordRequest;
import com.luxestay.homestay.dto.request.VerifyOtpRequest;
import com.luxestay.homestay.entity.EmailVerification;
import com.luxestay.homestay.entity.User;
import com.luxestay.homestay.exception.AppException;
import com.luxestay.homestay.exception.ErrorCode;
import com.luxestay.homestay.repository.EmailVerificationRepository;
import com.luxestay.homestay.repository.UserRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.concurrent.ThreadLocalRandom;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class OtpService {

    MailService mailService;
    EmailVerificationRepository emailVerificationRepository;
    ObjectMapper objectMapper;
    UserRepository userRepository;

    public void sendOtp(UserCreationRequest request) throws JsonProcessingException {

        if(userRepository.existsByUsername(request.getUsername())){
            throw new AppException(ErrorCode.USER_EXISTED);
        }

        String otp = String.format("%06d", ThreadLocalRandom.current().nextInt(1000000));

        EmailVerification verification = emailVerificationRepository.findByEmail(request.getEmail()).orElse(new EmailVerification());

        verification.setEmail(request.getEmail());
        verification.setOtp(otp);
        verification.setExpiredAt(LocalDateTime.now().plusMinutes(5));
        verification.setRequestJson(objectMapper.writeValueAsString(request));

        emailVerificationRepository.save(verification);

        mailService.sendOtp(request.getEmail(), otp);
    }

    public UserCreationRequest verifyOtp(VerifyOtpRequest request) throws JsonProcessingException {
        EmailVerification verification = emailVerificationRepository.findByEmail(request.getEmail()).orElseThrow(
                () -> new AppException(ErrorCode.EMAIL_NOT_FOUND));

        if(LocalDateTime.now().isAfter(verification.getExpiredAt())){
            throw new AppException(ErrorCode.OTP_EXPIRED);
        }

        if(!verification.getOtp().equals(request.getOtp())){
            throw new AppException(ErrorCode.INVALID_OTP);
        }

        UserCreationRequest userRequest = objectMapper.readValue(verification.getRequestJson(), UserCreationRequest.class);
        emailVerificationRepository.delete(verification);
        return userRequest;
    }

    public void resendOtp(String email) {
        EmailVerification verification = emailVerificationRepository.findByEmail(email).orElseThrow(
                () -> new AppException(ErrorCode.VERIFICATION_NOT_FOUND));

        String otp = String.format("%06d", ThreadLocalRandom.current().nextInt(1000000));

        verification.setOtp(otp);
        verification.setExpiredAt(LocalDateTime.now().plusMinutes(5));

        emailVerificationRepository.save(verification);

        mailService.sendOtp(email, otp);
    }

    public void forgotPassword(String email){

        User user = userRepository.findByEmail(email).orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));

        String otp = String.format("%06d", ThreadLocalRandom.current().nextInt(1000000));

        EmailVerification verification = emailVerificationRepository.findByEmail(email).orElse(new EmailVerification());
        verification.setEmail(email);
        verification.setOtp(otp);
        verification.setExpiredAt(LocalDateTime.now().plusMinutes(5));
        verification.setVerified(false);
        verification.setType("FORGOT_PASSWORD");

        emailVerificationRepository.save(verification);
        mailService.sendOtp(email, otp);

    }

    public void verifyForgotPassword(VerifyForgotPasswordRequest request){

        EmailVerification verification = emailVerificationRepository.findByEmail(request.getEmail()).orElseThrow(
                ()-> new AppException(ErrorCode.VERIFICATION_NOT_FOUND));

        if(LocalDateTime.now().isAfter(verification.getExpiredAt())){
            throw new AppException(ErrorCode.OTP_EXPIRED);
        }

        if(!verification.getOtp().equals(request.getOtp())){
            throw new AppException(ErrorCode.INVALID_OTP);
        }
        verification.setVerified(true);
        emailVerificationRepository.save(verification);

    }
}