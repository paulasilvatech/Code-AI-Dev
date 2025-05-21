# Beginner Workshop Guide (60 Minutes)

This guide provides a structured approach to conducting a 60-minute beginner workshop on AI-assisted code optimization. This workshop is designed for developers who are new to using AI tools for code improvement.

## Workshop Overview

**Duration**: 60 minutes  
**Target Audience**: Developers new to AI-assisted code optimization  
**Prerequisites**: Basic understanding of either Java or C#  

## Required Resources

- GitHub account with Copilot access (or free trial)
- Visual Studio Code or other supported IDE
- Internet connection
- Clone of this repository

## Workshop Timeline

| Time | Activity | Description |
|------|----------|-------------|
| 0:00 - 0:05 | Introduction | Workshop overview and objectives |
| 0:05 - 0:20 | GitHub Copilot Setup | Installation and basic configuration |
| 0:20 - 0:45 | Simple Optimization Examples | Walk through prepared examples |
| 0:45 - 0:55 | Hands-on Practice | Participants work on exercises |
| 0:55 - 1:00 | Recap and Q&A | Review learnings and answer questions |

## Detailed Agenda

### 1. Introduction (5 minutes)

- Welcome participants
- Explain the concept of AI-assisted code optimization
- Overview of what will be covered
- Expected outcomes

### 2. GitHub Copilot Setup (15 minutes)

- Guide participants through:
  - Signing up for GitHub Copilot (free trial if needed)
  - Installing the extension in VS Code
  - Basic configuration
  - Testing that it works

- Key points to cover:
  - How to accept/reject suggestions
  - How to trigger suggestions with comments
  - Basic keyboard shortcuts

### 3. Simple Optimization Examples (25 minutes)

#### Example 1: String Handling Optimization (Java or .NET)

- Demonstrate how AI can identify and optimize inefficient string operations
- Use the examples in:
  - Java: `java-examples/scenario1-web-app/service-optimization/before/StringHandlingService.java`
  - .NET: `dotnet-examples/Enterprise.Core/scenario1-web-app/service-optimization/before/StringProcessor.cs`

1. Show the "before" code and explain the inefficiencies
2. Demonstrate using Copilot to optimize 
3. Compare with the "after" version
4. Highlight the performance improvements

#### Example 2: Basic Security Fixes (Java or .NET)

- Show how AI can identify and fix simple security issues
- Use the examples in:
  - Java: `java-examples/scenario1-web-app/security-remediation/before/UserController.java`
  - .NET: `dotnet-examples/Enterprise.Web/scenario1-web-app/security-remediation/before/UserController.cs`

1. Show the "before" code with security vulnerabilities
2. Use Copilot to identify and fix a simple issue
3. Compare with the "after" version
4. Discuss the security implications

### 4. Hands-on Practice (15 minutes)

Participants work independently on one of these exercises:

#### Exercise 1: String Concatenation Optimization

Provide a simple file with inefficient string concatenation and have participants use Copilot to optimize it.

#### Exercise 2: Input Validation Security Fix

Provide a simple controller with missing input validation and have participants use Copilot to add proper validation.

### 5. Recap and Q&A (5 minutes)

- Summarize key learnings
- Address questions
- Provide resources for further learning
- Gather feedback

## Materials to Prepare

- Workshop slides (minimal)
- Sample code files for the exercises
- GitHub Copilot setup instructions
- Cheat sheet of useful Copilot commands

## Free Access Options

For participants without GitHub Copilot access:
- Direct them to sign up for the [30-day free trial](https://github.com/features/copilot)
- Provide the documented examples showing prompts and results
- Consider pairing participants who don't have access with those who do

## Workshop Variants

- **Java Focus**: Emphasize Java examples for teams primarily working with Java
- **C# Focus**: Emphasize C# examples for teams primarily working with .NET
- **Mixed**: Cover both for diverse teams

## Follow-up Resources

- Provide links to:
  - GitHub Copilot documentation
  - The intermediate workshop guide
  - Additional examples in the repository
  - Community resources 