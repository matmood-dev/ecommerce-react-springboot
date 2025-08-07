// src/main/java/com/example/ecommerce/util/JwtUtil.java
package com.example.ecommerce.util;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

import java.security.Key;
import java.util.Date;

public class JwtUtil {
    private static final Key SECRET_KEY = Keys.hmacShaKeyFor("secret123secret123secret123secret12".getBytes()); // 32+ chars
    private static final long EXPIRATION = 86400000; // 1 day in milliseconds

    public static String generateToken(String username) {
        return Jwts.builder()
                .setSubject(username)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION))
                .signWith(SECRET_KEY, SignatureAlgorithm.HS256)
                .compact();
    }
}
