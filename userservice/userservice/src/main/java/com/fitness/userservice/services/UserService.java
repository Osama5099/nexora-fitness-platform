package com.fitness.userservice.services;

import com.fitness.userservice.UserRepository;
import com.fitness.userservice.dto.RegisterRequest;
import com.fitness.userservice.dto.UserResponse;
import com.fitness.userservice.models.User;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
@Slf4j
public class UserService {
    private final UserRepository repository;

    public UserRepository getRepository() {
        return repository;
    }

    public UserResponse register(RegisterRequest request) {

        if (repository.existsByEmail(request.getEmail())){
            User existingUser=repository.findByEmail(request.getEmail());
            UserResponse userResponse=new UserResponse();
            userResponse.setId(existingUser.getId());
            userResponse.setPassword(existingUser.getPassword());
            userResponse.setEmail(existingUser.getEmail());
            userResponse.setFirstName(existingUser.getFirstName());
            userResponse.setLastName(existingUser.getLastName());
            userResponse.setCreateAt(existingUser.getCreateAt());
            userResponse.setUpdateAt(existingUser.getUpdateAt());
            return userResponse;

        }
        User user =new User();
        user.setEmail(request.getEmail());
        user.setFirstName(request.getFirstName());
        user.setKeyclockId(request.getKeyclockId());

        user.setLastName(request.getLastName());
        user.setPassword(request.getPassword());

        User savedUser=repository.save(user);
        UserResponse userResponse=new UserResponse();
        userResponse.setId(savedUser.getId());
        userResponse.setPassword(savedUser.getPassword());
        userResponse.setKeyclockId(savedUser.getKeyclockId());
        userResponse.setEmail(savedUser.getEmail());
        userResponse.setFirstName(savedUser.getFirstName());
        userResponse.setLastName(savedUser.getLastName());
        userResponse.setCreateAt(savedUser.getCreateAt());
        userResponse.setUpdateAt(savedUser.getUpdateAt());
        return userResponse;
    }

    public UserResponse getUserProfile(String userId){
        User user= repository.findById(userId)
                .orElseThrow(()->new RuntimeException("User not found"));

        UserResponse userResponse=new UserResponse();
        userResponse.setId(user.getId());
        userResponse.setPassword(user.getPassword());
        userResponse.setEmail(user.getEmail());
        userResponse.setFirstName(user.getFirstName());
        userResponse.setLastName(user.getLastName());
        userResponse.setCreateAt(user.getCreateAt());
        userResponse.setUpdateAt(user.getUpdateAt());
        return userResponse;
    }

    public Boolean existByUserId(String userId) {
        log.info("Calling  User Service for {}", userId);
        return repository.existsByKeyclockId(userId);
    }
}
