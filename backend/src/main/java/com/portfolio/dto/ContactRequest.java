package com.portfolio.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class ContactRequest {
    @NotBlank(message = "姓名不能为空")
    private String name;

    @NotBlank(message = "邮箱不能为空")
    private String email;

    private String phone;

    @NotBlank(message = "留言不能为空")
    @Size(max = 1000, message = "留言不能超过1000字")
    private String message;
}
