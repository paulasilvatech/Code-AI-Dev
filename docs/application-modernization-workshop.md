# Application Modernization Workshop (120 Minutes)

This workshop provides a structured approach for using GitHub Copilot and related tools to modernize legacy applications. Learn how to leverage AI-assisted development to accelerate framework upgrades, code refactoring, and application modernization.

## Workshop Overview

**Duration**: 120 minutes  
**Target Audience**: Developers and architects responsible for application modernization  
**Prerequisites**: 
- Intermediate experience with either Java or .NET development
- GitHub Copilot access (Enterprise or Pro+ recommended for full features)
- Basic understanding of application modernization concepts

## Required Resources

- GitHub account with Copilot access
- Development environment for Java and/or .NET
- Sample legacy applications (provided in this repository)
- GitHub account with permissions to create repositories
- For .NET: Visual Studio 2022 or JetBrains Rider
- For Java: IntelliJ IDEA, Eclipse, or VS Code with Java extensions

## Workshop Timeline

| Time | Activity | Description |
|------|----------|-------------|
| 0:00 - 0:10 | Introduction | Workshop overview and modernization challenges |
| 0:10 - 0:25 | Setup and Configuration | Environment preparation and tool access |
| 0:25 - 0:45 | Framework Upgrade Theory | Best practices and strategies for upgrades |
| 0:45 - 1:15 | .NET Modernization Lab | Hands-on lab with .NET Upgrade Assistant |
| 1:15 - 1:45 | Java Modernization Lab | Hands-on lab with Java framework upgrades |
| 1:45 - 2:00 | Wrap-up and Discussion | Review, challenges, and next steps |

## Detailed Agenda

### 1. Introduction (10 minutes)

- Welcome and workshop objectives
- Common application modernization challenges
- Benefits of AI-assisted modernization
- Agentic DevOps approach to modernization

### 2. Setup and Configuration (15 minutes)

#### Access Requirements Verification

Ensure all participants have access to:
- GitHub Copilot (verify subscription tier)
- GitHub repositories (check permissions)
- Local development environments (verify installations)

#### Repository Setup

- Fork the sample legacy applications
- Clone the repositories locally
- Configure GitHub Copilot in your IDE

#### Tool Configuration

- Configure GitHub Copilot Chat
- Set up GitHub Copilot for Pull Requests (Enterprise/Pro+ subscribers)
- Install .NET Upgrade Assistant (for .NET modernization)

### 3. Framework Upgrade Theory (20 minutes)

#### Modernization Strategies

- Incremental vs. big-bang modernization
- Risk assessment and mitigation
- Testing strategies for upgrades
- Dependency management

#### AI-Assisted Modernization Approaches

- Prompt engineering for modernization tasks
- Using Copilot to identify upgrade targets
- Handling breaking changes with AI assistance
- Documentation generation for modernized components

#### Agentic DevOps for Modernization

- Using GitHub Copilot Coding Agent for automated upgrades
- Integration with CI/CD pipelines
- Quality gates and automated testing
- Monitoring and rollback strategies

### 4. .NET Modernization Lab (30 minutes)

#### Scenario: Upgrading a .NET Framework Application to .NET 8

**Step-by-Step Instructions**:

1. **Assessment**: 
   - Open the legacy .NET Framework application
   - Use GitHub Copilot to analyze compatibility issues
   - Document dependencies and migration challenges

2. **Setup .NET Upgrade Assistant**:
   - Run the .NET Upgrade Assistant tool
   - Configure upgrade options with AI assistance
   - Generate an upgrade plan

3. **Execute Upgrade**:
   - Perform the automated upgrade
   - Review changes with GitHub Copilot
   - Address compatibility issues using AI suggestions

4. **Agentic Approach** (for Enterprise/Pro+ subscribers):
   - Create an issue describing the upgrade requirements
   - Assign to GitHub Copilot Coding Agent
   - Review the created pull request
   - Provide feedback and see iterative improvements

5. **Testing and Validation**:
   - Run the modernized application
   - Execute test suite
   - Address failures with AI assistance

#### Key Learning Objectives:
- Executing framework upgrades with minimal manual intervention
- Using AI to identify and resolve compatibility issues
- Implementing modern patterns in legacy applications

### 5. Java Modernization Lab (30 minutes)

#### Scenario: Upgrading a Spring Boot Application from 2.x to 3.x

**Step-by-Step Instructions**:

1. **Assessment**: 
   - Open the legacy Spring Boot application
   - Use GitHub Copilot to analyze compatibility issues
   - Document dependencies and migration challenges

2. **Dependency Updates**:
   - Update pom.xml or build.gradle with AI assistance
   - Address deprecated libraries
   - Update Spring Boot version

3. **Code Modernization**:
   - Refactor deprecated API usages with Copilot
   - Update configuration classes
   - Modernize controller implementations

4. **Agentic Approach** (for Enterprise/Pro+ subscribers):
   - Create an issue describing the upgrade requirements
   - Assign to GitHub Copilot Coding Agent
   - Review the created pull request
   - Provide feedback and see iterative improvements

5. **Testing and Validation**:
   - Run the modernized application
   - Execute test suite
   - Address failures with AI assistance

#### Key Learning Objectives:
- Executing Spring Boot upgrades with minimal manual intervention
- Using AI to identify and resolve compatibility issues
- Implementing modern Spring patterns

### 6. Wrap-up and Discussion (15 minutes)

- Review of completed modernization exercises
- Discussion of challenges encountered
- Best practices recap
- Q&A session
- Next steps for applying in real-world scenarios

## Workshop Materials

- Presentation slides
- Sample legacy applications:
  - .NET Framework 4.8 Web Application
  - Spring Boot 2.5 REST API
- Step-by-step lab guides
- Solution repositories
- Prompt templates for modernization tasks

## Free Access Options

For participants without full GitHub Copilot access:
- Use the 30-day free trial for individual participants
- Prepare pre-configured Codespaces environments
- Share the documented examples and solutions

For participants without required development environments:
- Provide GitHub Codespaces templates
- Share Docker configurations for consistent environments
- Prepare cloud-based lab environments

## Business Impact Metrics

To measure the effectiveness of AI-assisted modernization:

- **Time Savings**: Compare manual vs. AI-assisted upgrade times
- **Error Reduction**: Track issues found during testing
- **Code Quality**: Measure complexity and technical debt before/after
- **Developer Productivity**: Survey participants on perceived efficiency
- **Cost Savings**: Calculate resource requirements for traditional vs. AI-assisted approaches

## Follow-up Resources

- Documentation on GitHub Copilot for application modernization
- Additional application modernization patterns
- Case studies of successful AI-assisted modernization projects
- Advanced prompting techniques for modernization tasks 