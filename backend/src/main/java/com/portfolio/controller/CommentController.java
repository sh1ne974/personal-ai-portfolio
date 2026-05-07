package com.portfolio.controller;

import com.portfolio.dto.CommentRequest;
import com.portfolio.entity.Comment;
import com.portfolio.service.CommentService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/comments")
public class CommentController {

    private final CommentService commentService;

    public CommentController(CommentService commentService) {
        this.commentService = commentService;
    }

    @GetMapping
    public ResponseEntity<?> list() {
        List<Comment> comments = commentService.list();
        return ResponseEntity.ok(Map.of("comments", comments));
    }

    @PostMapping
    public ResponseEntity<?> create(@Valid @RequestBody CommentRequest req, HttpServletRequest request) {
        String username = (String) request.getAttribute("username");
        // Allow both authenticated and unauthenticated users
        String authorName = username != null ? username : "匿名用户";
        Comment comment = commentService.create(authorName, req.getContent().trim());
        return ResponseEntity.ok(Map.of("comment", comment));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id, HttpServletRequest request) {
        Boolean isAdmin = (Boolean) request.getAttribute("isAdmin");
        if (isAdmin == null || !isAdmin) {
            return ResponseEntity.status(403).body(Map.of("error", "无权限，仅管理员可删除"));
        }
        boolean deleted = commentService.delete(id);
        if (!deleted) {
            return ResponseEntity.status(404).body(Map.of("error", "留言不存在"));
        }
        return ResponseEntity.ok(Map.of("message", "删除成功"));
    }
}
