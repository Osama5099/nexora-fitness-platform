package com.fitness.activityservice.service;

import com.fitness.activityservice.ActivityRepository;
import com.fitness.activityservice.dto.ActivityRequest;
import com.fitness.activityservice.dto.ActivityResponse;
import com.fitness.activityservice.model.Activity;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Slf4j
@RequiredArgsConstructor
public class ActivityService {

    private final ActivityRepository activityRepository;
    private final UserValidationService userValidationService;
    private final WebClient aiServiceWebClient;

    public ActivityResponse trackActivity(ActivityRequest request) {
        log.info("Received activity request for userId: {}", request.getUserId());
        boolean isValidUser=userValidationService.validateUser(request.getUserId());

        if (!isValidUser){
            throw new RuntimeException("Invalid User: "+request.getUserId());
        }
        Activity activity= Activity.builder()
                .userId(request.getUserId())
                .type(request.getType())
                .duration(request.getDuration())
                .caloriesBurned(request.getCaloriesBurned())
                .startTime(request.getStartTime())
                .additionalMetrices(request.getAdditionalMetrices())
                .build();

        Activity savedActivity=activityRepository.save(activity);

        try{
            aiServiceWebClient.post()
                    .uri("/api/recommendations/process")
                    .bodyValue(savedActivity)
                    .retrieve()
                    .bodyToMono(Void.class)
                    .subscribe();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return  mapToReponse(savedActivity);
    }

    private ActivityResponse mapToReponse(Activity activity) {
        ActivityResponse response=new ActivityResponse();
        response.setId(activity.getId());
        response.setUserId(activity.getUserId());
        response.setType(activity.getType());
        response.setDuration(activity.getDuration());
        response.setCaloriesBurned(activity.getCaloriesBurned());
        response.setStartTime(activity.getStartTime());
        response.setAdditionalMetrices(activity.getAdditionalMetrices());
        response.setCreatedAt(activity.getCreatedAt());
        response.setUpdatedAt(activity.getUpdatedAt());
        return  response;
    }

    public List<ActivityResponse> getUserActivities(String userId) {
        List<Activity> activityList= activityRepository.findByUserId(userId);
        return activityList.stream()
                .map(this::mapToReponse)
                .collect(Collectors.toList());
    }
}