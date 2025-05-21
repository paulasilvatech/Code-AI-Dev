package com.enterprise.optimization.service;

import org.springframework.stereotype.Service;
import java.util.List;
import java.util.ArrayList;
import java.util.StringJoiner;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * Service for handling string operations in the application.
 * This implementation demonstrates optimized string handling.
 */
@Service
public class StringHandlingService {

    /**
     * Concatenates a list of strings with a separator.
     * Optimized implementation using StringBuilder and a more efficient algorithm.
     */
    public String concatenateStrings(List<String> strings, String separator) {
        if (strings == null || strings.isEmpty()) {
            return "";
        }
        
        // Using StringJoiner for optimal performance
        StringJoiner joiner = new StringJoiner(separator);
        for (String str : strings) {
            joiner.add(str);
        }
        
        return joiner.toString();
    }

    /**
     * Builds a complex string representation from an object.
     * Optimized implementation using StringBuilder.
     */
    public String buildComplexString(UserProfile profile) {
        if (profile == null) {
            return "";
        }
        
        StringBuilder builder = new StringBuilder(256); // Pre-allocate capacity
        builder.append("User: ").append(profile.getUsername()).append('\n')
               .append("Name: ").append(profile.getFirstName()).append(' ').append(profile.getLastName()).append('\n')
               .append("Email: ").append(profile.getEmail()).append('\n')
               .append("Joined: ").append(profile.getJoinDate()).append('\n')
               .append("Status: ").append(profile.getStatus()).append('\n')
               .append("Roles: ");
        
        List<String> roles = profile.getRoles();
        if (roles != null && !roles.isEmpty()) {
            StringJoiner roleJoiner = new StringJoiner(", ");
            for (String role : roles) {
                roleJoiner.add(role);
            }
            builder.append(roleJoiner.toString());
        }
        
        return builder.toString();
    }

    /**
     * Searches for occurrences of a string within text.
     * Optimized implementation using Pattern and Matcher.
     */
    public List<Integer> findAllOccurrences(String text, String searchString) {
        if (text == null || searchString == null || searchString.isEmpty()) {
            return new ArrayList<>();
        }
        
        List<Integer> positions = new ArrayList<>();
        Pattern pattern = Pattern.compile(Pattern.quote(searchString));
        Matcher matcher = pattern.matcher(text);
        
        while (matcher.find()) {
            positions.add(matcher.start());
        }
        
        return positions;
    }

    /**
     * Replaces all occurrences of a string with another string.
     * Optimized implementation using built-in String.replace method.
     */
    public String replaceAllOccurrences(String text, String searchString, String replacement) {
        if (text == null || searchString == null || replacement == null || searchString.isEmpty()) {
            return text;
        }
        
        // Using the built-in replace method is more efficient
        return text.replace(searchString, replacement);
    }

    /**
     * Dummy user profile class for the example
     */
    public static class UserProfile {
        private String username;
        private String firstName;
        private String lastName;
        private String email;
        private String joinDate;
        private String status;
        private List<String> roles;
        
        // Getters and setters
        public String getUsername() { return username; }
        public void setUsername(String username) { this.username = username; }
        
        public String getFirstName() { return firstName; }
        public void setFirstName(String firstName) { this.firstName = firstName; }
        
        public String getLastName() { return lastName; }
        public void setLastName(String lastName) { this.lastName = lastName; }
        
        public String getEmail() { return email; }
        public void setEmail(String email) { this.email = email; }
        
        public String getJoinDate() { return joinDate; }
        public void setJoinDate(String joinDate) { this.joinDate = joinDate; }
        
        public String getStatus() { return status; }
        public void setStatus(String status) { this.status = status; }
        
        public List<String> getRoles() { return roles; }
        public void setRoles(List<String> roles) { this.roles = roles; }
    }
} 