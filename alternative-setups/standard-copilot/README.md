# 🤖 Using Standard GitHub Copilot Instead of Agent

This guide shows how to complete the workshop examples using the standard GitHub Copilot (free trial or individual subscription) instead of the enterprise Agent version.

## 📝 Key Differences

| Feature | GitHub Copilot Agent | Standard GitHub Copilot | Workaround |
|---------|---------------------|------------------------|------------|
| Asynchronous tasks | Can work on tasks in background | Provides real-time suggestions only | Break tasks into smaller steps |
| Repository-wide analysis | Can scan entire codebases | Works file-by-file | Analyze one file at a time |
| Automated PRs | Can create PRs automatically | No automated PR creation | Create PRs manually |
| Autonomous mode | Can work with minimal guidance | Requires more specific prompts | Use detailed prompts (examples below) |

## 🔍 Effective Prompting Techniques

When using standard GitHub Copilot, your prompts need to be more specific:

### 1. Be Explicit About Context

**Agent Prompt (Simple):**
```
Optimize this controller for better performance
```

**Standard Copilot Prompt (Detailed):**
```
// I want to optimize this Spring controller for better performance.
// Focus on:
// 1. Reducing database queries
// 2. Adding pagination
// 3. Implementing asynchronous processing
// Here's the current implementation:
```

### 2. Break Down Complex Tasks

**Agent Approach:**
```
Refactor this service class to follow SOLID principles and improve performance
```

**Standard Copilot Approach:**
- Step 1: "// Extract these methods into a separate interface following Single Responsibility"
- Step 2: "// Now optimize the database access in this method"
- Step 3: "// Implement proper error handling following these patterns"

### 3. Use Comments as Guidance

Standard Copilot works best with comments that guide the generation:

```java
// TODO: Implement an efficient batch processing method that:
// 1. Processes records in chunks of 100
// 2. Uses parallel streams for each chunk
// 3. Handles exceptions without stopping the entire batch
// 4. Returns a summary of processed/failed items
public BatchResult processBatch(List<Record> records) {
    // Copilot will generate implementation here
}
```

## 📋 Example Translations

Here are examples from the workshop, translated for standard Copilot:

### Java Stream Optimization

**With Agent:**
```
Optimize this Java Stream operation for better performance with large datasets
```

**With Standard Copilot:**
```java
// TODO: Optimize this stream operation for better performance with large datasets.
// Consider:
// - Using parallel streams appropriately
// - Reducing intermediate operations
// - Avoiding unnecessary boxing/unboxing
// - Using specialized streams for primitives

List<Integer> numbers = getMillionNumbers();
double average = numbers.stream()
    .filter(n -> n % 2 == 0)
    .map(n -> n * 2)
    .collect(Collectors.averagingInt(n -> n));
```

### Security Vulnerability Remediation

**With Agent:**
```
Fix security vulnerabilities in this code, focusing on SQL injection and XSS
```

**With Standard Copilot:**
```java
// TODO: Fix the security vulnerabilities in this code:
// 1. Replace the raw SQL query with parameterized PreparedStatement
// 2. Implement proper input validation
// 3. Sanitize user input before displaying in HTML
// 4. Use proper authentication checks

String query = "SELECT * FROM users WHERE username = '" + request.getParameter("username") + "'";
Statement stmt = connection.createStatement();
ResultSet rs = stmt.executeQuery(query);
```

## 🛠️ Step-by-Step Example Workflows

For each of the workshop scenarios, we've provided step-by-step guides using standard Copilot:

1. [Java Web Application Optimization](java-web-app-optimization.md)
2. [.NET Data Processing Optimization](dotnet-data-processing.md)
3. [Security Vulnerability Remediation](security-remediation.md)

## 📊 Comparing Results

To help you validate your results, each example includes:

- Before/after code snippets
- Expected performance improvements
- Key indicators to check
- Common mistakes to avoid

Remember, the standard version of GitHub Copilot is still extremely powerful - you'll just need to be more specific with your guidance and break larger tasks into smaller steps. 