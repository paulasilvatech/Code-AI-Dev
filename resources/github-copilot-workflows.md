# GitHub Copilot Workflow Examples

This guide provides practical workflows for using GitHub Copilot effectively in your development process.

## 🚀 Quick Start Workflows

### 1. Basic Code Generation Workflow

```markdown
## Step 1: Clear Intent Comments
// TODO: Create a function that validates email addresses using regex
// Requirements:
// - Check for @ symbol
// - Validate domain format
// - Return boolean result

## Step 2: Let Copilot Generate
[Press Tab to accept Copilot suggestions]

## Step 3: Review and Refine
// Copilot will suggest implementation
// Review for security and edge cases
```

### 2. Test-Driven Development (TDD) Workflow

```javascript
// Step 1: Write test description
// Test: Calculate fibonacci sequence for n=10

// Step 2: Let Copilot generate test
describe('fibonacci', () => {
  it('should calculate fibonacci for n=10', () => {
    // Copilot will complete the test
  });
});

// Step 3: Generate implementation
function fibonacci(n) {
  // Copilot will suggest implementation based on test
}
```

## 🔄 Advanced Workflows

### 3. Code Refactoring Workflow

```java
// Original code - performance issue
public List<String> processData(List<String> items) {
    List<String> result = new ArrayList<>();
    for(String item : items) {
        if(item != null && !item.isEmpty()) {
            result.add(item.toUpperCase());
        }
    }
    return result;
}

// Refactoring prompt for Copilot:
// TODO: Refactor this method to use Java 8 streams for better performance
// Requirements:
// - Use parallel streams for large datasets
// - Handle null values gracefully
// - Maintain the same functionality
```

### 4. Security Enhancement Workflow

```csharp
// Vulnerable code example
public User GetUser(string username) {
    string query = "SELECT * FROM users WHERE username = '" + username + "'";
    // SQL Injection vulnerability!
}

// Security enhancement prompt:
// TODO: Refactor this method to prevent SQL injection
// Requirements:
// - Use parameterized queries
// - Add input validation
// - Log security events
```

## 📝 Prompt Engineering Best Practices

### 5. Detailed Function Generation

```python
# Effective prompt structure:
# TODO: Create a function that [action]
# Input: [describe input parameters and types]
# Output: [describe expected output]
# Constraints: [any limitations or requirements]
# Example: [provide example input/output]

# Example:
# TODO: Create a function that merges two sorted arrays
# Input: Two sorted integer arrays (arr1, arr2)
# Output: Single sorted array containing all elements
# Constraints: O(n+m) time complexity, handle empty arrays
# Example: merge_arrays([1,3,5], [2,4,6]) -> [1,2,3,4,5,6]
```

### 6. API Integration Workflow

```typescript
// Step 1: Describe the API
// TODO: Create a service to interact with the GitHub API
// Endpoints needed:
// - GET /repos/{owner}/{repo} - Get repository details
// - GET /repos/{owner}/{repo}/issues - List issues
// - POST /repos/{owner}/{repo}/issues - Create new issue

// Step 2: Let Copilot generate service structure
interface GitHubService {
  // Copilot will suggest interface methods
}

// Step 3: Implementation with error handling
class GitHubAPIService implements GitHubService {
  // Copilot will generate implementation with proper error handling
}
```

## 🏗️ Architecture Workflows

### 7. Design Pattern Implementation

```java
// Singleton pattern implementation request
// TODO: Implement thread-safe Singleton pattern for DatabaseConnection
// Requirements:
// - Lazy initialization
// - Thread-safe without synchronization overhead
// - Support for connection pooling

public class DatabaseConnection {
    // Copilot will suggest double-checked locking or enum approach
}
```

### 8. Microservice Scaffolding

```yaml
# Step 1: Describe service requirements
# TODO: Create a REST API microservice for user management
# Framework: Spring Boot / .NET Core
# Endpoints:
# - POST /users - Create user
# - GET /users/{id} - Get user by ID
# - PUT /users/{id} - Update user
# - DELETE /users/{id} - Delete user
# Features:
# - Input validation
# - Error handling
# - Logging
# - Basic authentication
```

## 🔍 Code Review Workflows

### 9. Automated Code Review

```javascript
// Original function
function calculateDiscount(price, customerType) {
  if (customerType === 'premium') {
    return price * 0.8;
  } else if (customerType === 'regular') {
    return price * 0.9;
  }
  return price;
}

// Review prompt:
// TODO: Review this function and suggest improvements for:
// - Error handling
// - Input validation
// - Code maintainability
// - Performance optimization
// - Test coverage
```

### 10. Documentation Generation

```python
def complex_algorithm(data, threshold=0.5, normalize=True):
    """
    TODO: Generate comprehensive documentation for this function
    Include:
    - Purpose and algorithm description
    - Parameter details with types
    - Return value description
    - Example usage
    - Potential exceptions
    - Performance considerations
    """
    # Implementation details...
```

## 💡 Productivity Tips

### 11. Batch Operations Workflow

```sql
-- Generate multiple similar queries
-- TODO: Create INSERT statements for test data
-- Table: users
-- Columns: id (int), name (varchar), email (varchar), created_at (timestamp)
-- Generate: 10 different test records with realistic data

-- Copilot will generate multiple INSERT statements
```

### 12. Error Handling Templates

```csharp
// Request comprehensive error handling
// TODO: Add error handling to this method
// Include:
// - Try-catch blocks
// - Specific exception types
// - Logging
// - User-friendly error messages
// - Retry logic for transient failures

public async Task<Result> ProcessDataAsync(string input) {
    // Copilot will add comprehensive error handling
}
```

## 🚦 Workflow Automation

### 13. CI/CD Pipeline Generation

```yaml
# TODO: Create GitHub Actions workflow for Java Spring Boot application
# Requirements:
# - Build with Maven
# - Run unit tests
# - Code coverage check (minimum 80%)
# - Security scanning with OWASP
# - Deploy to Azure App Service
# - Only deploy from main branch
# - Use secrets for credentials
```

### 14. Git Hook Scripts

```bash
#!/bin/bash
# TODO: Create pre-commit hook that:
# - Runs linting
# - Checks for console.log statements
# - Validates commit message format
# - Runs unit tests for changed files
# - Prevents commits with failing tests
```

## 📊 Performance Optimization Workflows

### 15. Performance Analysis

```java
// Performance optimization request
// TODO: Optimize this method for handling large datasets (1M+ records)
// Current issues:
// - High memory usage
// - Slow execution time
// - Not utilizing multi-core processors

public List<ProcessedData> processLargeDataset(List<RawData> input) {
    // Current inefficient implementation
    List<ProcessedData> results = new ArrayList<>();
    for(RawData data : input) {
        ProcessedData processed = expensiveOperation(data);
        results.add(processed);
    }
    return results;
}

// Copilot will suggest:
// - Stream API with parallel processing
// - Batch processing
// - Memory-efficient approaches
```

## 🔐 Security Workflows

### 16. Security Audit Workflow

```python
# Security audit checklist
# TODO: Review and secure this authentication function
# Check for:
# - SQL injection vulnerabilities
# - Password hashing (not plain text)
# - Session management
# - Rate limiting
# - Input sanitization
# - CSRF protection

def authenticate_user(username, password):
    # Current implementation to be audited
    pass
```

## 🎯 Best Practices Summary

1. **Be Specific**: Detailed prompts yield better results
2. **Provide Context**: Include requirements, constraints, and examples
3. **Iterative Refinement**: Review and refine Copilot suggestions
4. **Security First**: Always review generated code for security issues
5. **Test Generated Code**: Verify functionality with comprehensive tests
6. **Document Intent**: Use clear comments to guide Copilot
7. **Learn Patterns**: Copilot learns from your codebase patterns

## 🚀 Next Steps

- Practice these workflows in your daily development
- Customize prompts for your specific needs
- Share successful patterns with your team
- Continuously refine your prompt engineering skills 