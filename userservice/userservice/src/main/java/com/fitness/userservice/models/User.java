package com.fitness.userservice.models;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "users")
@Data
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    private String keyclockId;

    @Column(unique = true)
    private String email;

    @Column(nullable = false)
    private String password;

    private String firstName;
    private String lastName;
    @Enumerated(EnumType.STRING)
    private UserRole role=UserRole.USER;

    @CreationTimestamp
    private LocalDateTime createAt;

    @UpdateTimestamp
    private  LocalDateTime updateAt;
}
