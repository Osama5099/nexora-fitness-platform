package com.fitness.userservice;

import com.fitness.userservice.models.User;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface UserRepository extends JpaRepository<User,String> {


    Boolean existsByEmail(String email);

    Boolean existsByKeyclockId(String userId);

    User findByEmail(String email);
}
