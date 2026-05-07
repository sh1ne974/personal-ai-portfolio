package com.portfolio.controller;

import com.portfolio.dto.ContactRequest;
import com.portfolio.service.ContactService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/contact")
public class ContactController {

    private final ContactService contactService;

    public ContactController(ContactService contactService) {
        this.contactService = contactService;
    }

    @PostMapping
    public ResponseEntity<?> submit(@Valid @RequestBody ContactRequest req) {
        contactService.submit(req);
        return ResponseEntity.ok(Map.of("message", "留言已提交，感谢你的联系！"));
    }
}
