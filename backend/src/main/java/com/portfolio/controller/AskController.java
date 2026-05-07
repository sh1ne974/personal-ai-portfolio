package com.portfolio.controller;

import com.portfolio.dto.AskRequest;
import com.portfolio.service.AskService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/ask")
public class AskController {

    private final AskService askService;

    public AskController(AskService askService) {
        this.askService = askService;
    }

    @PostMapping
    public ResponseEntity<?> ask(@Valid @RequestBody AskRequest req) {
        String answer = askService.ask(req.getQuestion());
        return ResponseEntity.ok(Map.of("answer", answer));
    }
}
