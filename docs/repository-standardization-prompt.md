# Repository Standardization Prompt for Workshop Repositories

## Overview
This document outlines all changes made to the Code-AI-Dev repository to create a standardized workshop format. Use this as a guide to apply the same changes to other workshop repositories (Design-to-Code-Dev and Agentic-Ops-Dev).

## Key Changes to Implement

### 1. README.md Structure Standardization

#### Header Section
- Add official website badge: `[![Official Website](https://img.shields.io/badge/Official_Website-[domain]-blue)]([website-url])`
- Add GitHub stars badge
- Add MIT license badge
- Include main workflow diagram after badges

#### Business Impact Section
- Add statistics about developer productivity challenges
- Include specific metrics for improvement (velocity, quality, time-to-market, security, satisfaction)
- Add maturity stages progression (Manual → Assisted → Augmented → Autonomous)

#### Workshop Structure Table
- Create a clear table showing:
  - Level (Basic/Intermediate/Advanced)
  - Duration
  - Focus areas
  - Target audience

#### Learning Path Section
- Remove workshop level headers (Basic Workshop, Intermediate Workshop, etc.)
- Use module names that match the learning path diagram exactly
- Link each module to the correct section in complete_workshop_guide.md
- Format: `### [Module X: Title](docs/complete_workshop_guide.md#anchor)`

### 2. Documentation Organization

#### Create/Update These Documents:
1. **docs/complete_workshop_guide.md**
   - Comprehensive guide with all modules
   - Detailed step-by-step instructions for each exercise
   - Include file creation, saving, and execution steps
   - Add troubleshooting sections for each module
   - Include learning summaries

2. **docs/workshop-faq.md**
   - General AI development questions
   - Tool-specific issues (GitHub Copilot, VS Code)
   - Workshop exercise questions
   - Technical troubleshooting
   - Ethical and professional concerns
   - Enterprise and security questions
   - Learning path and career questions

3. **docs/troubleshooting_guide.md**
   - Common setup issues
   - Platform-specific problems
   - Tool configuration
   - Performance optimization

### 3. Resources Folder Reorganization

Create this structure:
```
resources/
├── basic/
│   ├── module1-[topic]/
│   ├── module2-[topic]/
│   └── module3-[topic]/
├── intermediate/
│   ├── module4-[topic]/
│   ├── module5-[topic]/
│   ├── module6-[topic]/
│   └── module7-[topic]/
├── advanced/
│   ├── module8-[topic]/
│   ├── module9-[topic]/
│   ├── module10-[topic]/
│   └── module11-[topic]/
├── enterprise/
│   ├── module12-[topic]/
│   ├── module13-[topic]/
│   ├── module14-[topic]/
│   └── module15-[topic]/
└── common/
    ├── setup/
    └── templates/
```

### 4. Module Documentation Standards

For each module in complete_workshop_guide.md:

#### Module Header Format:
```markdown
## 🎯 [Level] Module X: [Title] (XX minutes)

### Overview
[Brief description of what will be learned]

### Learning Objectives
- Objective 1
- Objective 2
- Objective 3

### Prerequisites
- Required knowledge
- Required tools
```

#### Exercise Format:
```markdown
### Exercise X.1: [Exercise Name]

#### Step 1: [Action]
[Detailed instructions including exact commands, file paths, and expected outcomes]

**For Windows:**
```
[Windows-specific commands]
```

**For macOS/Linux:**
```
[Unix-specific commands]
```

#### Step 2: [Next Action]
[Continue with detailed steps...]

#### Expected Output:
```
[Show what users should see]
```

#### Troubleshooting:
- **Issue**: [Common problem]
  **Solution**: [How to fix it]
```

### 5. File Reference Updates

#### Update All Internal Links:
- Change repository references from old name to new name
- Update git clone commands to use correct repository URL
- Fix all relative paths to match new folder structure
- Ensure all linked files actually exist

#### Resource File References:
- Update from `../resources/file.ext` to `/resources/[level]/[module]/file.ext`
- Create any missing template files
- Ensure consistency across all documentation

### 6. Setup and Validation Scripts

#### Update/Create:
1. **resources/common/setup/validate-setup.sh**
   - Check all required tools
   - Verify versions
   - Test connections
   - Create necessary directories

2. **resources/common/setup/setup-azure-infrastructure.sh**
   - Use English for all messages
   - Add proper error handling
   - Save outputs to resources folder
   - Include validation steps

### 7. Enterprise Resources

Create these files for enterprise modules:
- `enterprise-adoption-template.md`
- `enterprise-metrics-framework.py`
- `enterprise-governance-policy.md`

### 8. Navigation and Cross-References

#### Ensure:
- All module links in README point to correct anchors
- FAQ is referenced from main documentation
- Troubleshooting guide is linked from relevant sections
- Related repositories section is updated

### 9. Specific Content Updates

#### For Each Workshop Repository:

**Design-to-Code-Dev:**
- Focus on Figma to code transformation
- Include design system integration
- Add accessibility checks
- Include responsive design patterns

**Agentic-Ops-Dev:**
- Focus on observability and monitoring
- Include Azure Monitor integration
- Add SRE practices
- Include incident response automation

**Code-AI-Dev:**
- Focus on AI-assisted development
- Include GitHub Copilot workflows
- Add code optimization patterns
- Include security scanning

### 10. Quality Checklist

Before considering complete, verify:
- [ ] All links work and point to existing files
- [ ] All code examples are tested and working
- [ ] Instructions work on Windows, macOS, and Linux
- [ ] Resource files are in correct folders
- [ ] Module numbers and titles are consistent
- [ ] Learning path matches the visual diagram
- [ ] FAQ covers common questions
- [ ] Troubleshooting guide is comprehensive
- [ ] Setup scripts work correctly
- [ ] All Portuguese text is translated to English

## Implementation Order

1. Start with README.md updates
2. Create/update complete_workshop_guide.md
3. Reorganize resources folder
4. Create missing documentation files
5. Update all internal references
6. Test all scripts and exercises
7. Validate all links and paths

## Key Principles

1. **Consistency**: Use same format across all repositories
2. **Clarity**: Step-by-step instructions that beginners can follow
3. **Completeness**: Include all necessary files and resources
4. **Accessibility**: Support multiple platforms and skill levels
5. **Maintainability**: Organized structure that's easy to update

## Example Module Title Mapping

Map your existing content to these standardized module titles:
- Module 1: Introduction to [Workshop Topic]
- Module 2: Setting Up Your [Tool/Environment]
- Module 3: Building Your First [Core Concept]
- Module 4: [Advanced Feature] Orchestration
- Module 5: Advanced [Topic] Patterns
- Module 6: Real-World Implementation
- Module 7: Production Optimization
- Module 8: Hands-On Challenge Labs

Remember to adapt the content while maintaining the structure and format standards. 