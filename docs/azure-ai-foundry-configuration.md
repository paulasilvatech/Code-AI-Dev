# 🧠 Configuring Azure AI Foundry for Code Analysis and Optimization

This guide provides step-by-step instructions for setting up Azure AI Foundry to perform advanced code analysis and optimization in enterprise environments, using the latest features announced at Microsoft Build 2025.

## 🎁 Free and Trial Options

For workshop participants without enterprise Azure subscriptions, Microsoft offers several options:

- **Azure Free Account**: New users get [$200 in free credits](https://azure.microsoft.com/free/) for 30 days, with no commitment
- **Azure for Students**: Students get [$100 in credits](https://azure.microsoft.com/free/students/) with no credit card required
- **Visual Studio Subscription**: Comes with monthly Azure credits ranging from $50-$150

If you're using the free tier or have limited Azure access:

1. See the [local alternatives](/alternative-setups/README.md) in the `/alternative-setups` directory
2. Use the provided docker-compose setup with SonarQube as an alternative to AI Foundry
3. Follow the documented examples with expected results if you can't run the analysis yourself

## 🔍 What is Azure AI Foundry?

Azure AI Foundry is Microsoft's unified platform for AI application management, enabling enterprises to build, deploy, and operate AI solutions at scale. For code optimization, it provides:

- Advanced code analysis capabilities powered by large language models
- Performance profiling and optimization recommendations
- Security vulnerability detection and remediation
- Integration with GitHub Copilot Agent for end-to-end workflow automation
- Support for Windows AI and cross-platform development
- Model Context Protocol (MCP) integration for seamless AI interactions

## ✅ Prerequisites

Before configuring Azure AI Foundry, ensure you have:

- An Azure subscription with appropriate permissions
- Azure CLI installed (version 3.0.0 or later)
- Visual Studio 2025, VS Code, or JetBrains IDE with Azure extensions
- GitHub Copilot Agent set up (recommended)
- Administrative access to your Azure tenant

## 🛠️ Setting Up Azure AI Foundry

### Step 1: Create an Azure AI Foundry Resource

1. Log in to the Azure Portal
2. Click on "Create a resource"
3. Search for "Azure AI Foundry" and select it
4. Click "Create"
5. Fill in the following details:
   - **Subscription**: Select your Azure subscription
   - **Resource Group**: Create new or select existing
   - **Region**: Choose a region with AI Foundry support
   - **Name**: Enter a unique name for your AI Foundry resource
   - **Pricing Tier**: Select appropriate tier (Standard or Premium recommended for enterprises)
6. Click "Review + create"
7. After validation passes, click "Create"

### Step 2: Configure Code Analysis Models

1. Once your Azure AI Foundry resource is created, navigate to it in the Azure Portal
2. In the left menu, select "Models"
3. Click "Add model"
4. Select the following models for code analysis:
   - **CodeAnalyst-Pro**: For general code optimization
   - **SecurityScan-Enterprise**: For security vulnerability detection
   - **PerformanceOptimizer**: For performance bottleneck identification
   - **CodeRefactor**: For automated refactoring suggestions
5. For each model, configure:
   - Compute resources (recommended: at least Standard_DS4_v2)
   - Scaling options (Auto-scale recommended)
   - Monitoring settings
6. Click "Apply"

### Step 3: Set Up a Development Environment

#### Using Visual Studio 2025:

1. Open Visual Studio 2025
2. Go to Extensions → Manage Extensions
3. Search for "Azure AI Foundry Tools"
4. Click "Download" and follow installation instructions
5. Restart Visual Studio
6. Go to Tools → Options → Azure AI Foundry
7. Click "Sign in" and authenticate with your Azure account
8. Select your Azure AI Foundry resource

#### Using Visual Studio Code:

1. Open VS Code
2. Go to Extensions (Ctrl+Shift+X)
3. Search for "Azure AI Foundry"
4. Click "Install"
5. After installation, click on the Azure icon in the Activity Bar
6. Sign in to your Azure account
7. Select your subscription and AI Foundry resource

### Step 4: Create a Code Analysis Project

1. In the Azure Portal, navigate to your AI Foundry resource
2. Select "Projects" from the left menu
3. Click "Create Project"
4. Fill in the following:
   - **Project Name**: Enter a name (e.g., "CodeOptimizationProject")
   - **Description**: Provide a description
   - **Repository Integration**: Connect to your GitHub or Azure DevOps repository
   - **Language Support**: Select languages to analyze (e.g., Java, C#, JavaScript)
   - **Analysis Scope**: Define what parts of the codebase to analyze
5. Click "Create"

### Step 5: Configure Analysis Settings

1. In your newly created project, select "Settings"
2. Configure the following:

   a. **Performance Analysis**:
      - Enable "Performance Bottleneck Detection"
      - Set "Analysis Depth" (Standard or Deep)
      - Configure "Resource Usage Thresholds"

   b. **Code Quality**:
      - Enable "Code Smell Detection"
      - Set "Refactoring Suggestions" level
      - Configure "Complexity Analysis"

   c. **Security Scanning**:
      - Enable "Vulnerability Detection"
      - Set "OWASP Compliance" level
      - Configure "Secret Detection"

   d. **Integration Settings**:
      - Enable "GitHub Copilot Agent Integration"
      - Configure "Automated PR Creation"
      - Set "Approval Workflows"

### Step 6: Set Up the Command Line Interface

1. Open a terminal or command prompt
2. Install the Azure AI Foundry CLI:
   ```bash
   az extension add --name ai-foundry
   ```

3. Log in to Azure:
   ```bash
   az login
   ```

4. Set your subscription:
   ```bash
   az account set --subscription <subscription-id>
   ```

5. Initialize AI Foundry for your project:
   ```bash
   az ai-foundry init --resource-group <resource-group> --name <foundry-name>
   ```

## 💻 Using Azure AI Foundry for Code Optimization

### Running a Code Analysis

#### From the IDE:

1. Open your project in the IDE
2. Right-click on a file, folder, or project
3. Select "Analyze with Azure AI Foundry"
4. Choose the analysis type:
   - Performance Optimization
   - Code Quality
   - Security Vulnerabilities
   - All-in-one Analysis
5. Click "Run Analysis"

#### From the Command Line:

```bash
az ai-foundry analyze --project <project-name> --repo-path <local-path> --type performance
```

### Viewing Analysis Results

1. In your IDE, open the "Azure AI Foundry" panel
2. Select the "Analysis Results" tab
3. View findings categorized by:
   - Severity (Critical, High, Medium, Low)
   - Type (Performance, Quality, Security)
   - Location (File, Function, Class)
4. Click on any finding to see:
   - Detailed explanation
   - Suggested fix
   - Impact assessment
   - Implementation recommendations

### Implementing Optimizations

#### Manual Implementation:

1. Review the suggested changes
2. Apply changes directly in your code
3. Run tests to verify improvements
4. Commit and push changes

#### Using GitHub Copilot Agent:

1. From the AI Foundry results panel, select one or more findings
2. Right-click and select "Fix with GitHub Copilot Agent"
3. Review the task description
4. Click "Send to Agent"
5. Review and approve the agent's changes when completed

### Continuous Optimization Workflow

#### Setting Up Automated Analysis:

1. In the Azure Portal, navigate to your AI Foundry project
2. Select "Automation" from the left menu
3. Click "Create Pipeline"
4. Configure:
   - **Trigger**: On pull request, scheduled, or manual
   - **Scope**: Which repositories and branches to analyze
   - **Actions**: What to do with results (notify, create issues, auto-fix)
5. Click "Create"

#### Integrating with CI/CD:

1. Navigate to your repository's CI/CD configuration
2. Add the following step to your workflow:

   **For GitHub Actions**:
   ```yaml
   - name: Azure AI Foundry Code Analysis
     uses: azure/ai-foundry-analyze@v1
     with:
       foundry-resource: ${{ secrets.AI_FOUNDRY_RESOURCE }}
       analysis-type: 'complete'
       create-pr: true
   ```

   **For Azure DevOps Pipelines**:
   ```yaml
   - task: AzureAIFoundryAnalyze@1
     inputs:
       foundryResource: $(AI_FOUNDRY_RESOURCE)
       analysisType: 'complete'
       createPR: true
   ```

## 🔄 Model Context Protocol (MCP) Integration

The Model Context Protocol (MCP) allows for seamless interaction between Azure AI Foundry and other AI systems like GitHub Copilot Agent.

### Setting Up MCP:

1. In your AI Foundry project, go to "Integrations"
2. Select "Model Context Protocol"
3. Click "Enable MCP"
4. Configure:
   - **Context Sharing**: What information to share between systems
   - **Authentication**: How systems authenticate with each other
   - **Scope**: What actions are permitted through MCP
5. Click "Save"

### Using MCP in Your Workflow:

With MCP configured, your AI systems can:
- Share context about code optimization opportunities
- Pass tasks between systems without losing context
- Maintain coherent reasoning across multiple AI interactions
- Leverage specialized capabilities of each system

## 👥 Best Practices for Enterprise Deployment

### Performance Considerations

- Use regional deployment to reduce latency
- Set up dedicated compute resources for analysis jobs
- Configure batch processing for large codebases
- Use incremental analysis for frequent runs

### Security Best Practices

- Implement least-privilege access to AI Foundry resources
- Enable encrypted communication for all integrations
- Set up Private Link for secure Azure connections
- Configure IP restrictions for API access
- Use managed identities for authentication

### Cost Management

- Monitor usage with Azure Cost Management
- Set up budget alerts
- Use auto-scaling for on-demand resources
- Schedule batch analyses during off-peak hours
- Consider reserved instances for predictable workloads

### Governance

- Establish clear approval workflows for automated changes
- Document optimization policies and standards
- Set up audit logging for all AI-assisted changes
- Create role-based access control (RBAC) for AI Foundry
- Implement compliance scanning for regulated industries

## ⚠️ Troubleshooting

### Common Issues

1. **Analysis Timeout**: Increase the timeout setting or reduce the analysis scope
2. **Authentication Errors**: Verify service principal permissions
3. **Integration Failures**: Check network connectivity and API access
4. **Resource Constraints**: Scale up compute resources
5. **Inaccurate Results**: Provide additional context or adjust model parameters

### Logging and Monitoring

1. In the Azure Portal, navigate to your AI Foundry resource
2. Select "Diagnostics settings"
3. Enable logging for:
   - AnalysisLogs
   - PerformanceLogs
   - SecurityLogs
   - IntegrationLogs
4. Send logs to:
   - Log Analytics Workspace
   - Azure Storage Account
   - Event Hub

### Getting Support

- Azure Support: [Azure Support Portal](https://azure.microsoft.com/support/options/)
- Documentation: [Azure AI Foundry Docs](https://docs.microsoft.com/azure/ai-foundry)
- Community: [Azure AI Foundry on Microsoft Q&A](https://learn.microsoft.com/answers/topics/azure-ai-foundry.html)

## 🔜 Next Steps

- Integrate Azure AI Foundry with GitHub Advanced Security
- Set up dashboards for tracking optimization metrics
- Create custom optimization rules for your specific codebase
- Implement automated remediation workflows
- Train your development team on working with AI-assisted optimization 