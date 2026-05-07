package com.portfolio.service;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.portfolio.entity.Comment;
import com.portfolio.mapper.CommentMapper;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CommentService {

    private final CommentMapper commentMapper;

    public CommentService(CommentMapper commentMapper) {
        this.commentMapper = commentMapper;
    }

    public List<Comment> list() {
        return commentMapper.selectList(
                new LambdaQueryWrapper<Comment>().orderByDesc(Comment::getCreatedAt));
    }

    public Comment create(String authorName, String content) {
        Comment comment = new Comment();
        comment.setAuthorName(authorName);
        comment.setContent(content);
        commentMapper.insert(comment);
        return comment;
    }

    public boolean delete(Long id) {
        return commentMapper.deleteById(id) > 0;
    }
}
