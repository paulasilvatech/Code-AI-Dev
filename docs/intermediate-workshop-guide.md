# Intermediate Workshop Guide (90 Minutes)

This guide provides a structured approach to conducting a 90-minute intermediate workshop on AI-assisted code optimization. This workshop is designed for developers with some experience using AI tools and basic knowledge of web application architecture.

## Workshop Overview

**Duration**: 90 minutes  
**Target Audience**: Developers with some AI tool experience  
**Prerequisites**: 
- Basic knowledge of GitHub Copilot
- Development environment for Java or .NET
- Understanding of web application concepts

## Required Resources

- GitHub account with Copilot access
- Development environment for Java or .NET
- Clone of this repository
- Internet connection

## Workshop Timeline

| Time | Activity | Description |
|------|----------|-------------|
| 0:00 - 0:05 | Introduction | Workshop overview and objectives |
| 0:05 - 0:20 | GitHub Copilot Setup | Advanced configuration and techniques |
| 0:20 - 0:40 | In-depth Optimization Techniques | Detailed explanation with examples |
| 0:40 - 1:25 | Guided Hands-on Labs | Work through optimization exercises |
| 1:25 - 1:30 | Group Discussion and Best Practices | Review learnings and share insights |

## Detailed Agenda

### 1. Introduction (5 minutes)

- Welcome participants
- Review the workshop objectives
- Overview of the enterprise optimization scenarios to be covered
- Expected outcomes

### 2. GitHub Copilot Setup and Advanced Usage (15 minutes)

- Review of basic Copilot functionality
- Advanced techniques:
  - Crafting effective prompts
  - Working with Copilot in context
  - Multi-file optimization strategies
  - IDE-specific features

- Setup for workshop-specific scenarios:
  - Configure settings for optimal code suggestions
  - Test with a sample optimization task

### 3. In-depth Optimization Techniques (20 minutes)

#### Controller Optimization Patterns

- Review common controller anti-patterns:
  - Business logic in controllers
  - Inefficient endpoint design
  - Poor error handling

- AI-assisted refactoring techniques:
  - Separating concerns
  - Implementing proper patterns
  - Optimizing request/response handling

#### Security Vulnerability Remediation

- Common web application security issues:
  - Input validation vulnerabilities
  - SQL injection
  - Improper authentication/authorization

- Using AI to:
  - Identify security issues
  - Implement security best practices
  - Verify remediation effectiveness

#### Performance Benchmarking Basics

- Introduction to performance measurement:
  - Key metrics to track
  - Setting up simple benchmarks
  - Interpreting results

- Tools and techniques:
  - JMH for Java
  - BenchmarkDotNet for .NET
  - Profiling basics

### 4. Guided Hands-on Labs (45 minutes)

#### Lab 1: Web Controller Optimization (20 minutes)

Participants work on optimizing a controller with various issues:

- Java: `java-examples/scenario1-web-app/controller-optimization/before/ProductController.java`
- .NET: `dotnet-examples/Enterprise.Web/scenario1-web-app/controller-optimization/before/ProductController.cs`

Tasks:
1. Analyze the controller with Copilot
2. Refactor to follow best practices
3. Implement proper error handling
4. Optimize response handling

#### Lab 2: Security Vulnerability Remediation (25 minutes)

Participants work on fixing security issues in an authentication service:

- Java: `java-examples/scenario1-web-app/security-remediation/before/AuthenticationService.java`
- .NET: `dotnet-examples/Enterprise.Web/scenario1-web-app/security-remediation/before/AuthenticationService.cs`

Tasks:
1. Use Copilot to identify security vulnerabilities
2. Implement proper input validation
3. Fix password handling issues
4. Add appropriate authorization checks

### 5. Group Discussion and Best Practices (10 minutes)

- Review of key learnings from the labs
- Discussion of challenges encountered
- Sharing of effective prompt strategies
- Best practices for enterprise environments
- Next steps and advanced topics

## Materials to Prepare

- Workshop slides with detailed code examples
- Lab exercise instructions
- Sample solution files
- Benchmark configuration files
- Prompt engineering cheat sheet

## Free Access Options

For participants without GitHub Copilot access:
- Direct them to sign up for the [30-day free trial](https://github.com/features/copilot)
- Provide documented examples showing prompts and results
- Set up pair programming sessions

For participants without full development environments:
- Provide access to GitHub Codespaces (if available)
- Share Docker setup instructions from `/alternative-setups/docker`
- Prepare simplified examples that run with minimal dependencies

## Workshop Variants

- **Java Focus**: Emphasize Spring Boot examples for Java teams
- **.NET Focus**: Emphasize ASP.NET Core examples for .NET teams
- **Security Focus**: Spend more time on security vulnerability remediation
- **Performance Focus**: Spend more time on benchmarking and optimization

## Follow-up Resources

- Provide links to:
  - GitHub Copilot advanced documentation
  - The advanced workshop guide
  - Enterprise optimization patterns
  - Security best practices
  - Performance benchmarking resources 