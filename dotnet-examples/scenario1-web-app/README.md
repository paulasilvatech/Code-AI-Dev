# .NET Web Application Optimization Scenario

This directory contains examples of optimizing an ASP.NET Core web application using AI-assisted techniques. The examples focus on two key areas:

## Security Remediation

The `security-remediation` directory demonstrates how to use AI tools to identify and fix security vulnerabilities in an ASP.NET Core API controller.

### Key Security Optimizations

- **SQL Injection Prevention**: Converting string concatenation to parameterized queries
- **Input Validation**: Adding data annotations and validation
- **Authorization Checks**: Implementing proper role-based access controls
- **Type Safety**: Using strongly-typed parameters and proper data types
- **Secure Error Handling**: Implementing proper exception handling and appropriate status codes

### Before/After Examples

Compare the `before/UserController.cs` and `after/UserController.cs` files to see:
- How GitHub Copilot Agent can identify SQL injection vulnerabilities
- How to implement parameterized queries properly
- How to add validation with data annotations
- How to implement proper authentication and authorization
- Best practices for secure error handling

## Service Optimization

The `service-optimization` directory demonstrates performance optimization techniques for ASP.NET Core services.

### Key Performance Optimizations

- **Efficient Memory Usage**: Reducing allocations with `Span<T>` and `Memory<T>`
- **Asynchronous Programming**: Proper use of async/await patterns
- **Caching**: Implementing effective caching strategies
- **Request Processing**: Optimizing middleware and filter execution
- **Response Optimization**: Efficient JSON serialization and compression

### Before/After Examples

Compare the `before/ApiService.cs` and `after/ApiService.cs` files to see:
- How to optimize memory usage in high-throughput APIs
- Proper implementation of asynchronous patterns
- Effective caching strategies
- How to reduce allocations in request processing

## Working with These Examples

### Using GitHub Copilot Agent

To use GitHub Copilot Agent with these examples:

1. Open a file in your IDE with Copilot Agent enabled
2. Request an analysis using a prompt like:
   ```
   Scan this controller for security vulnerabilities and remediate them using parameterized queries and proper authorization.
   ```

### Running Performance Tests

To run performance tests for these examples:

1. Ensure you have .NET 8 SDK installed
2. From the root directory, run:
   ```bash
   dotnet test
   ```

3. For detailed benchmarks:
   ```bash
   dotnet run --project Enterprise.Benchmarks --configuration Release -- --filter *Api*
   ```

## Key Learnings

- Security vulnerabilities can often be remediated with proper input validation, parameterized queries, and authorization
- Modern .NET features like Span<T> can significantly improve performance in high-throughput scenarios
- Proper async/await usage is crucial for scalable web applications
- Effective caching strategies can dramatically reduce processing time and database load

## Next Steps

After exploring these examples, you can:

1. Apply similar optimization patterns to your own codebase
2. Use GitHub Copilot Agent to scan your existing controllers for security issues
3. Implement benchmarking with BenchmarkDotNet to measure the impact of your optimizations
4. Set up security scanning as part of your CI/CD pipeline using Microsoft Defender for DevOps 