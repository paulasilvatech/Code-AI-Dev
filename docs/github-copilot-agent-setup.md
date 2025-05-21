# 🤖 Setting Up GitHub Copilot Agent with Asynchronous Coding Features

This guide explains how to set up GitHub Copilot's new asynchronous coding agent for enterprise development teams, leveraging the latest features announced at Microsoft Build 2025.

## 🎁 Free and Trial Options

For workshop participants without enterprise subscriptions, GitHub offers several options:

- **30-Day Free Trial**: Sign up for the [GitHub Copilot trial](https://github.com/features/copilot) to access Copilot features for 30 days
- **Student Access**: Students can get [GitHub Copilot for free](https://education.github.com/pack/offers#github-copilot) through GitHub Education
- **Open Source**: Maintainers of popular open source projects may qualify for free access

While the trial doesn't include all enterprise features like autonomous agents, all the core examples in this workshop can be completed with the standard Copilot functionality.

### Using Standard GitHub Copilot Instead of Agent

If you're using the standard GitHub Copilot instead of the enterprise Agent version:

1. You'll need to be more specific with your prompts
2. Follow the examples in `/alternative-setups/standard-copilot/` for equivalent functionality
3. Some autonomous features will require manual execution of steps

## 🔍 What is GitHub Copilot Agent?

GitHub Copilot Agent is the next-generation evolution of GitHub Copilot, providing more autonomous coding capabilities through its asynchronous coding agent. Unlike the previous version which only provided suggestions in real-time, Copilot Agent can:

- Work on entire tasks autonomously in the background while you focus on other work
- Analyze entire repositories for optimization opportunities
- Refactor code based on best practices and performance patterns
- Implement security fixes across your codebase
- Generate comprehensive documentation and tests

## ✅ Prerequisites

Before setting up GitHub Copilot Agent, ensure you have:

- A GitHub account with appropriate access (Enterprise, Business, or Professional plan)
- Administrative permissions for your organization or repository
- Visual Studio 2025, VS Code, or JetBrains IDE with the latest updates
- GitHub CLI installed (version 2.40.0 or later)

## 🛠️ Installation Steps

### Step 1: Enable GitHub Copilot Agent for Your Organization

1. Navigate to your organization settings on GitHub:
   ```
   https://github.com/organizations/YOUR-ORGANIZATION/settings/copilot
   ```

2. Click on "Enable GitHub Copilot Agent" and select the repositories you want to enable it for

3. Choose your licensing model:
   - Per-seat license
   - Organization-wide license
   - Repository-specific license

4. Accept the terms of service for the autonomous agent capabilities

### Step 2: Install the Latest IDE Extension

#### For Visual Studio Code:

1. Open VS Code
2. Go to the Extensions marketplace (Ctrl+Shift+X)
3. Search for "GitHub Copilot Agent"
4. Click "Install"
5. Restart VS Code

#### For Visual Studio 2025:

1. Open Visual Studio 2025
2. Navigate to Extensions → Manage Extensions
3. Select "Online" from the left panel
4. Search for "GitHub Copilot Agent"
5. Click "Download"
6. Restart Visual Studio

#### For JetBrains IDEs:

1. Open your JetBrains IDE
2. Go to Settings → Plugins
3. Select "Marketplace" tab
4. Search for "GitHub Copilot Agent"
5. Click "Install"
6. Restart your IDE

### Step 3: Configure the Asynchronous Agent

1. Open your IDE's settings/preferences
2. Navigate to the GitHub Copilot Agent section
3. Configure the following settings:

   a. **Autonomy Level**:
      - `limited`: Agent asks for permission before making changes
      - `balanced`: Agent makes changes but requires review before commit
      - `autonomous`: Agent can automatically commit changes (with safeguards)

   b. **Task Processing**:
      - Enable "Background Task Processing"
      - Set "Maximum Background Tasks" (recommended: 3-5)
      - Set "Resource Allocation" (recommended: 30-50% of system resources)

   c. **Code Standards**:
      - Link to your organization's coding standards repository
      - Enable "Enforce Code Standards"
      - Select style guides for supported languages

   d. **Security Settings**:
      - Enable "Security Vulnerability Scanning"
      - Configure "Sensitive Data Detection"
      - Set permissions for automated fixes

### Step 4: Set Up the Command Line Interface

1. Open a terminal or command prompt
2. Update the GitHub CLI:
   ```bash
   gh extension upgrade --all
   ```

3. Install the Copilot Agent extension:
   ```bash
   gh extension install github/gh-copilot-agent
   ```

4. Authenticate the CLI with your GitHub account:
   ```bash
   gh auth login
   ```

5. Verify the installation:
   ```bash
   gh copilot-agent --version
   ```

## 💻 Using GitHub Copilot Agent

### Asynchronous Coding Tasks

To assign a task to the agent, you can use either the IDE interface or the command line:

#### From the IDE:

1. Right-click in your editor and select "GitHub Copilot Agent" → "Assign Task"
2. Describe the task in natural language, for example:
   - "Optimize the performance of the DataProcessingService class"
   - "Add proper error handling to all API endpoints"
   - "Refactor this code to follow the SOLID principles"

3. Set the priority and deadline for the task
4. Click "Send to Agent"

#### From the Command Line:

```bash
gh copilot-agent task create --repo=owner/repo --description="Implement pagination for the users API endpoint" --priority=high
```

### Monitoring Agent Progress

#### From the IDE:

1. Open the "GitHub Copilot Agent" panel
2. View the "Current Tasks" tab to see all pending and in-progress tasks
3. Click on a task to view detailed progress

#### From the Command Line:

```bash
gh copilot-agent task list --status=in-progress
gh copilot-agent task view <task-id>
```

### Reviewing Agent Changes

When the agent completes a task, it will create either:

1. A pull request (default for `balanced` and `autonomous` modes)
2. A draft commit (default for `limited` mode)

To review the changes:

1. Open the pull request in GitHub or the draft commit in your IDE
2. Review the code changes
3. Read the agent's explanation of the changes
4. Accept, modify, or reject the changes

## 👥 Best Practices for Enterprise Teams

### Security Considerations

- Set up IP allow lists for Copilot Agent access
- Configure sensitive data scanning to prevent leaks
- Use SSO integration for enterprise security
- Review all automated commits regularly

### Governance

- Establish clear guidelines for what tasks can be assigned to the agent
- Set up code ownership rules to control where the agent can make changes
- Create organization-wide templates for agent tasks
- Implement approval workflows for agent-created PRs

### Integration with Development Workflow

- Connect Copilot Agent with your issue tracking system
- Set up automated testing for agent-generated code
- Configure code review assignments for agent PRs
- Establish metrics for measuring agent effectiveness

### Team Training

- Provide team training on effective task descriptions
- Create prompt templates for common tasks
- Establish feedback loops to improve agent performance
- Document best practices for agent collaboration

## ⚠️ Troubleshooting

### Common Issues

1. **Agent Not Responding**: Verify network connectivity and authentication status
2. **Low-Quality Solutions**: Improve task descriptions with more details and context
3. **Permission Errors**: Check repository and organization permissions
4. **Resource Constraints**: Adjust resource allocation in settings

### Getting Support

- Community forums: [GitHub Copilot Discussion](https://github.com/github/feedback/discussions/categories/copilot-feedback)
- Enterprise support: [GitHub Enterprise Support Portal](https://enterprise.github.com/support)
- Documentation: [GitHub Copilot Agent Docs](https://docs.github.com/copilot/agent)

## 🔜 Next Steps

- Connect Copilot Agent with Azure AI Foundry for enhanced capabilities
- Set up automated workflows with GitHub Actions
- Explore integrations with GitHub Advanced Security
- Configure organization-wide policies for agent usage 