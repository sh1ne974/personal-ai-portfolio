package com.portfolio.entity;

import com.baomidou.mybatisplus.annotation.*;
import lombok.Data;
import java.time.LocalDateTime;

@Data
@TableName("contacts")
public class Contact {
    @TableId(type = IdType.AUTO)
    private Long id;
    private String name;
    private String email;
    private String phone;
    private String message;
    @TableField(fill = FieldFill.INSERT)
    private LocalDateTime createdAt;
}
