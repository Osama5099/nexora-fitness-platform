package com.fitness.aiservice.service;



import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.Map;

@Service

public class GeminiService {
    private final WebClient webClient;


    @Value("${gemini.api.url}")
    private  String geminiApiUrl;
    @Value("${gemini.api.key}")
    private String geminiApiKey;


    public GeminiService(WebClient.Builder webClientBuilder){
        this.webClient=webClientBuilder.build();


    }
    public String getRecommendations(String details){
        Map<String , Object>requestBody=Map.of(
                "contents", new Object[]{
                        Map.of("parts",new Object[]{
                                Map.of("text", details)
        })
                }
        );
        return webClient.post()
                .uri(geminiApiUrl)
                .header("Content-Type", "application/json")
                .header("x-goog-api-key"  ,geminiApiKey)
                .bodyValue(requestBody)
                .retrieve()
                .bodyToMono(String.class)
                .block();
    }
    public String askNexoraAI(String question) {

        String prompt = """
            You are NEXORA AI, a smart fitness assistant.

            Help the user with simple, practical and safe fitness advice.

            User Question:
            %s

            Give a clear and useful answer.
            Keep the answer easy to understand.
            Do not give dangerous or extreme fitness advice.
            """.formatted(question);

        return webClient.post()
                .uri(geminiApiUrl)
                .header("Content-Type", "application/json")
                .header("x-goog-api-key", geminiApiKey)
                .bodyValue(
                        Map.of(
                                "contents",
                                new Object[]{
                                        Map.of(
                                                "parts",
                                                new Object[]{
                                                        Map.of(
                                                                "text",
                                                                prompt
                                                        )
                                                }
                                        )
                                }
                        )
                )
                .retrieve()
                .bodyToMono(String.class)
                .block();
    }


}
