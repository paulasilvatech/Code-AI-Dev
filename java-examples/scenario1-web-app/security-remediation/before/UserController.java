package com.enterprise.optimization.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import java.util.List;
import java.util.Map;

/**
 * REST controller for user operations.
 * This implementation contains several security vulnerabilities.
 */
@RestController
@RequestMapping("/api/users")
public class UserController {

    private static final Logger logger = LoggerFactory.getLogger(UserController.class);
    
    @Autowired
    private JdbcTemplate jdbcTemplate;

    /**
     * Get user by ID.
     * VULNERABILITY: SQL Injection due to string concatenation.
     */
    @GetMapping("/{id}")
    public Map<String, Object> getUserById(@PathVariable String id) {
        logger.info("Getting user with ID: " + id);
        
        // VULNERABLE: Direct string concatenation in SQL query
        String sql = "SELECT * FROM users WHERE user_id = " + id;
        
        List<Map<String, Object>> results = jdbcTemplate.queryForList(sql);
        if (results.isEmpty()) {
            return null;
        }
        return results.get(0);
    }

    /**
     * Search for users by name.
     * VULNERABILITY: SQL Injection in LIKE clause.
     */
    @GetMapping("/search")
    public List<Map<String, Object>> searchUsers(@RequestParam String name) {
        logger.info("Searching for users with name: " + name);
        
        // VULNERABLE: Unsanitized input in LIKE clause
        String sql = "SELECT * FROM users WHERE username LIKE '%" + name + "%'";
        
        return jdbcTemplate.queryForList(sql);
    }

    /**
     * Create a new user.
     * VULNERABILITY: No input validation, potential XSS and SQL Injection.
     */
    @PostMapping
    public Map<String, Object> createUser(@RequestBody User user) {
        logger.info("Creating new user: " + user.getUsername());
        
        // VULNERABLE: No input validation or sanitization
        String sql = "INSERT INTO users (username, email, password, role) VALUES ('"
                + user.getUsername() + "', '"
                + user.getEmail() + "', '"
                + user.getPassword() + "', '"
                + user.getRole() + "') RETURNING user_id";
        
        // VULNERABLE: Logging sensitive information
        logger.info("Creating user with password: " + user.getPassword());
        
        return jdbcTemplate.queryForMap(sql);
    }

    /**
     * Update user role.
     * VULNERABILITY: No authorization check.
     */
    @PutMapping("/{id}/role")
    public void updateUserRole(@PathVariable String id, @RequestParam String newRole) {
        logger.info("Updating role for user ID: " + id);
        
        // VULNERABLE: No authorization check for admin-only action
        String sql = "UPDATE users SET role = '" + newRole + "' WHERE user_id = " + id;
        
        jdbcTemplate.update(sql);
    }

    /**
     * Delete user by ID.
     * VULNERABILITY: No authorization check and SQL Injection.
     */
    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable String id) {
        logger.info("Deleting user with ID: " + id);
        
        // VULNERABLE: No authorization check and SQL Injection
        String sql = "DELETE FROM users WHERE user_id = " + id;
        
        jdbcTemplate.update(sql);
    }

    /**
     * Execute custom query (admin only).
     * VULNERABILITY: Direct execution of user input.
     */
    @PostMapping("/query")
    public List<Map<String, Object>> executeQuery(@RequestParam String query) {
        logger.info("Executing custom query");
        
        // VULNERABLE: Direct execution of user input
        return jdbcTemplate.queryForList(query);
    }

    /**
     * User class for request/response
     */
    public static class User {
        private String username;
        private String email;
        private String password;
        private String role;
        
        // Getters and setters
        public String getUsername() { return username; }
        public void setUsername(String username) { this.username = username; }
        
        public String getEmail() { return email; }
        public void setEmail(String email) { this.email = email; }
        
        public String getPassword() { return password; }
        public void setPassword(String password) { this.password = password; }
        
        public String getRole() { return role; }
        public void setRole(String role) { this.role = role; }
    }
} 