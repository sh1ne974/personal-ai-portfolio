package com.portfolio.config;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.portfolio.entity.User;
import com.portfolio.mapper.UserMapper;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer implements CommandLineRunner {

    private final UserMapper userMapper;

    public DataInitializer(UserMapper userMapper) {
        this.userMapper = userMapper;
    }

    @Override
    public void run(String... args) {
        User admin = userMapper.selectOne(
                new LambdaQueryWrapper<User>().eq(User::getUsername, "admin"));
        if (admin == null) {
            User user = new User();
            user.setUsername("admin");
            user.setPasswordHash(new BCryptPasswordEncoder().encode("admin123"));
            user.setEmail("admin@example.com");
            user.setIsAdmin(1);
            userMapper.insert(user);
            System.out.println("[DataInitializer] Admin user created: admin / admin123");
        }
    }
}
