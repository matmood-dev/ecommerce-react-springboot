// src/main/java/com/example/ecommerce/dto/UserDto.java
package com.example.ecommerce.dto;

public class UserDto {
    private Long id;
    private String username;
    private String email;
    private String role;
    private String firstName;
    private String lastName;

    public UserDto(Long id, String username, String email, String role, String firstName, String lastName) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.role = role;
        this.firstName = firstName;
        this.lastName = lastName;
    }

    // Getters
    public Long getId() { return id; }
    public String getUsername() { return username; }
    public String getEmail() { return email; }
    public String getRole() { return role; }
    public String getFirstName() { return firstName; }
    public String getLastName() { return lastName; }
}
