package com.aliaydin.todo.service;

import com.aliaydin.todo.dto.JwtAuthResponse;
import com.aliaydin.todo.dto.LoginDto;
import com.aliaydin.todo.dto.RegisterDto;

public interface AuthService {
    String register(RegisterDto registerDto);

    JwtAuthResponse login(LoginDto loginDto);
}
