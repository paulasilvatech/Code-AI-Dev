package com.enterprise.optimization.service;

import org.springframework.stereotype.Service;
import java.util.List;
import java.util.ArrayList;

/**
 * Service for handling string operations in the application.
 * This implementation has several performance issues.
 */
@Service
public class StringHandlingService {

    /**
     * Concatenates a list of strings with a separator.
     * Inefficient implementation using String concatenation in a loop.
     */
    public String concatenateStrings(List<String> strings, String separator) {
        String result = "";
        for (String str : strings) {
            result = result + str + separator;
        }
        // Remove trailing separator
        if (result.length() > 0 && strings.size() > 0) {
            result = result.substring(0, result.length() - separator.length());
        }
        return result;
    }

    /**
     * Builds a complex string representation from an object.
     * Inefficient implementation using String concatenation.
     */
    public String buildComplexString(UserProfile profile) {
        String result = "";
        result = result + "User: " + profile.getUsername() + "\n";
        result = result + "Name: " + profile.getFirstName() + " " + profile.getLastName() + "\n";
        result = result + "Email: " + profile.getEmail() + "\n";
        result = result + "Joined: " + profile.getJoinDate() + "\n";
        result = result + "Status: " + profile.getStatus() + "\n";
        
        result = result + "Roles: ";
        for (String role : profile.getRoles()) {
            result = result + role + ", ";
        }
        
        // Remove trailing comma and space
        if (profile.getRoles().size() > 0) {
            result = result.substring(0, result.length() - 2);
        }
        
        return result;
    }

    /**
     * Searches for occurrences of a string within text.
     * Inefficient implementation using repeated String operations.
     */
    public List<Integer> findAllOccurrences(String text, String searchString) {
        List<Integer> positions = new ArrayList<>();
        String remainingText = text;
        int currentPosition = 0;
        
        while (remainingText.contains(searchString)) {
            int index = remainingText.indexOf(searchString);
            currentPosition += index;
            positions.add(currentPosition);
            
            // Move past this occurrence
            remainingText = remainingText.substring(index + searchString.length());
            currentPosition += searchString.length();
        }
        
        return positions;
    }

    /**
     * Replaces all occurrences of a string with another string.
     * Inefficient implementation using String operations in a loop.
     */
    public String replaceAllOccurrences(String text, String searchString, String replacement) {
        while (text.contains(searchString)) {
            int index = text.indexOf(searchString);
            text = text.substring(0, index) + replacement + text.substring(index + searchString.length());
        }
        return text;
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