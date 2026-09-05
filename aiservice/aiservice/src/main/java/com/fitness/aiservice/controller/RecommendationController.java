package com.fitness.aiservice.controller;


import com.fitness.aiservice.model.Recommendation;
import com.fitness.aiservice.service.RecommendationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.fitness.aiservice.model.AIRequest;
import com.fitness.aiservice.service.GeminiService;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/recommendations")
public class RecommendationController {
    private  final RecommendationService recommendationService;
    private final GeminiService geminiService;

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Recommendation>> getUserRecommendation(@PathVariable String userId){


        return  ResponseEntity.ok(recommendationService.getUserRecommendation(userId));
    }

    @GetMapping("/activity/{activityId}")
    public  ResponseEntity<Recommendation>getActivityRecommendation(@PathVariable String activityId){
        return ResponseEntity.ok(recommendationService.getActivityRecommendation(activityId));
    }
    @PostMapping("/ask")
    public ResponseEntity<String> askNexoraAI(
            @RequestBody AIRequest request
    ) {

        if (
                request.getQuestion() == null ||
                        request.getQuestion().trim().isEmpty()
        ) {

            return ResponseEntity
                    .badRequest()
                    .body("Question cannot be empty.");
        }

        String response =
                geminiService.askNexoraAI(
                        request.getQuestion()
                );

        return ResponseEntity.ok(response);
    }

}
