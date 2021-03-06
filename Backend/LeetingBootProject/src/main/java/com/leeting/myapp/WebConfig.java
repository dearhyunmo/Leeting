package com.leeting.myapp;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import com.leeting.myapp.service.JwtInterceptor;

@Configuration
public class WebConfig implements WebMvcConfigurer {
    private static final String[] EXCLUDE_PATHS = {
            "/member/**",
            "/error/**",
            "/recommend/**",
            "/meeting/**",
            "/contents/**",
            "/gallery/**",
            "/notice/**",
            "/question/**",
            "/report/**",
            "/meetingnotice/**",
            "/answer/**",
            "/contentsinfo/**"
    };

    @Autowired
    private JwtInterceptor jwtInterceptor;

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
		registry.addInterceptor(jwtInterceptor)
						.addPathPatterns("/**")
						.excludePathPatterns(EXCLUDE_PATHS);
    }
}

