# Resource Access Guide

This comprehensive guide provides detailed instructions for obtaining access to all resources needed for the workshops in this playbook. Follow these step-by-step instructions to ensure you have everything required for a successful workshop experience.

## GitHub Resources

### GitHub Account

1. **Create a GitHub Account** (if you don't have one):
   - Visit [github.com/signup](https://github.com/signup)
   - Enter your email address
   - Create a password
   - Choose a username
   - Complete the verification puzzle
   - Click "Create account"

2. **Verify Your Email**:
   - Check your email inbox
   - Click the verification link sent by GitHub
   - Complete the email verification process

### GitHub Copilot Access

#### Option 1: Free Trial (for Individual Use)

1. **Start Your 30-Day Free Trial**:
   - Visit [github.com/features/copilot](https://github.com/features/copilot)
   - Click "Start free trial"
   - Sign in with your GitHub account
   - Follow the prompts to begin your trial
   - No credit card required for trial initiation

2. **Subscription Options After Trial**:
   - Copilot Individual: $10/month or $100/year
   - Copilot Business: $19/user/month (requires organization)
   - Copilot Enterprise: Contact sales for pricing
   - Copilot Pro+: Contact sales for pricing (includes coding agent)

#### Option 2: Free Access for Qualified Users

GitHub Copilot is free for:
   - Verified students, teachers, and maintainers of popular open-source projects
   - Visit [github.com/education](https://github.com/education) for student/teacher verification
   - Open source maintainers should visit [github.com/github-copilot/signup](https://github.com/github-copilot/signup)

#### Option 3: Organization Access

If your organization already has GitHub Copilot:
1. Request access from your organization administrator
2. Once granted, you'll see Copilot activated in your account settings
3. Install the appropriate IDE extensions as outlined below

### GitHub Copilot Installation

#### Visual Studio Code

1. **Install the GitHub Copilot Extension**:
   - Open VS Code
   - Go to Extensions view (Ctrl+Shift+X / Cmd+Shift+X)
   - Search for "GitHub Copilot"
   - Click "Install"
   - Sign in with your GitHub account when prompted

2. **Verify Installation**:
   - Open a code file
   - Type a comment describing a function
   - Press Enter and wait for suggestions
   - If you see inline code suggestions, Copilot is working correctly

#### Visual Studio

1. **Install the GitHub Copilot Extension**:
   - Open Visual Studio
   - Go to Extensions → Manage Extensions
   - Search for "GitHub Copilot"
   - Click "Download"
   - Restart Visual Studio when prompted
   - Sign in with your GitHub account

2. **Verify Installation**:
   - Open a code file
   - Type a comment describing functionality
   - Wait for ghost text suggestions to appear

#### JetBrains IDEs (IntelliJ, PyCharm, Rider, etc.)

1. **Install the GitHub Copilot Plugin**:
   - Open your JetBrains IDE
   - Go to Settings/Preferences → Plugins
   - Select Marketplace tab
   - Search for "GitHub Copilot"
   - Click "Install"
   - Restart the IDE when prompted
   - Sign in with your GitHub account

2. **Verify Installation**:
   - Open a code file
   - Type a comment or code fragment
   - Wait for suggestions to appear

### GitHub Advanced Security

GitHub Advanced Security is a paid feature for private repositories but free for public repositories.

#### For Public Repositories

1. **Enable Code Scanning**:
   - Go to your repository
   - Navigate to Settings → Security & analysis
   - Click "Enable" next to "Code scanning"
   - Choose "Set up a workflow yourself" or use a template
   - Commit the workflow file to your repository

2. **Enable Dependabot**:
   - In the same Security & analysis page
   - Click "Enable" next to "Dependabot alerts"
   - Optionally enable "Dependabot security updates"

#### For Private Repositories (Enterprise)

1. **Check Enterprise License**:
   - Contact your GitHub administrator to confirm GHAS licensing
   - If not licensed, request a trial via your GitHub sales representative

2. **Enable Features**:
   - Once licensed, follow the same steps as for public repositories
   - Organization admins may need to enable features organization-wide first

## Development Environments

### Java Development Environment

#### Option 1: Local Installation

1. **Install JDK 17 or higher**:
   - Download from [Oracle](https://www.oracle.com/java/technologies/downloads/) or [OpenJDK](https://adoptium.net/)
   - Run the installer and follow the prompts
   - Set JAVA_HOME environment variable

2. **Install Maven or Gradle**:
   - Maven: Download from [maven.apache.org](https://maven.apache.org/download.cgi)
   - Gradle: Download from [gradle.org/install](https://gradle.org/install/)
   - Add to system PATH

3. **Install an IDE**:
   - IntelliJ IDEA Community Edition (free): [jetbrains.com/idea/download](https://www.jetbrains.com/idea/download/)
   - Eclipse: [eclipse.org/downloads](https://www.eclipse.org/downloads/)
   - VS Code with Java extensions: [code.visualstudio.com](https://code.visualstudio.com/)

#### Option 2: GitHub Codespaces

1. **Access Codespaces**:
   - From a repository, click "Code" button
   - Select "Codespaces" tab
   - Click "Create codespace on main"
   - Wait for the environment to load (includes Java, Maven, Git)

2. **Configure Java in Codespaces**:
   - The free tier includes 60 hours/month with a 2-core machine
   - No local setup required
   - GitHub Copilot is pre-integrated

### .NET Development Environment

#### Option 1: Local Installation

1. **Install .NET SDK 8.0 or higher**:
   - Download from [dotnet.microsoft.com/download](https://dotnet.microsoft.com/download)
   - Run the installer and follow the prompts
   - Verify installation with `dotnet --version` in terminal

2. **Install an IDE**:
   - Visual Studio 2022 Community Edition (free): [visualstudio.microsoft.com](https://visualstudio.microsoft.com/vs/community/)
   - Visual Studio Code with C# extensions: [code.visualstudio.com](https://code.visualstudio.com/)
   - JetBrains Rider (paid/trial): [jetbrains.com/rider](https://www.jetbrains.com/rider/)

#### Option 2: GitHub Codespaces

Same as Java option above, but select a .NET template when creating your codespace.

## Azure Resources (For Advanced Workshops)

### Free Azure Account

1. **Create a Free Account**:
   - Visit [azure.microsoft.com/free](https://azure.microsoft.com/free/)
   - Click "Start free"
   - Sign in with your Microsoft account or create one
   - Enter personal information and verification method
   - Provide credit card information (required but won't be charged without consent)
   - Agree to terms and conditions
   - Click "Sign up"

2. **Free Tier Benefits**:
   - $200 credit for 30 days
   - 12 months of free services
   - 25+ always-free services
   - No automatic conversion to paid subscription

### Azure DevOps Services

1. **Create an Azure DevOps Organization**:
   - Visit [dev.azure.com](https://dev.azure.com/)
   - Sign in with your Microsoft account
   - Create a new organization or use an existing one
   - Create a new project for workshop exercises

2. **Azure DevOps Free Tier Includes**:
   - 5 free users
   - Unlimited private repositories
   - 2,000 pipeline minutes per month
   - 4 additional parallel jobs

## Workshop Repository Setup

### Clone the Workshop Repository

1. **Fork the Repository** (Optional):
   - Visit the main repository page
   - Click "Fork" button in the top-right
   - Select your account as the destination

2. **Clone to Local Machine**:
   - Click "Code" button
   - Copy the HTTPS URL
   - Open terminal or command prompt
   - Run: `git clone <repository-url>`
   - Navigate to the cloned directory: `cd <repository-directory>`

### Configure Workshop Environment

1. **Sample Applications**:
   - The `/java-examples` and `/dotnet-examples` directories contain pre-configured applications
   - Each has "before" and "after" versions for comparison
   - Run `mvn install` or `dotnet restore` in respective directories

2. **Docker Environment** (Alternative Setup):
   - Install Docker Desktop from [docker.com](https://www.docker.com/products/docker-desktop/)
   - Navigate to `/alternative-setups/docker`
   - Run `docker-compose up -d`
   - All required services will be available in containers

## Troubleshooting Access Issues

### GitHub Copilot

- **Not Seeing Suggestions**:
  - Verify subscription is active in GitHub account settings
  - Check that you're signed in to the correct GitHub account in your IDE
  - Try reinstalling the extension
  - Restart your IDE

- **Authorization Errors**:
  - Sign out and sign back in to GitHub in your IDE
  - Check organization permissions if using through an organization

### Development Environment

- **Java/Maven Issues**:
  - Verify JAVA_HOME environment variable is set correctly
  - Check PATH includes Java and Maven/Gradle
  - Try `java -version` and `mvn -version` to verify installations

- **.NET Issues**:
  - Run `dotnet --info` to verify installation
  - Update to latest SDK if needed: `dotnet --list-sdks`
  - Check Visual Studio installation for required workloads

### Azure Access

- **Subscription Issues**:
  - Verify free credits in Azure Portal → Subscriptions
  - Check if trial period has expired
  - Contact Azure support if credits were depleted unexpectedly

## Getting Help During Workshops

- **Workshop Facilitators**:
  - Dedicated facilitators will be available for all workshops
  - Use the designated communication channel for technical issues

- **Documentation Resources**:
  - This playbook includes comprehensive troubleshooting guides
  - Official documentation links are provided for all tools

- **Community Support**:
  - GitHub Copilot: [github.community](https://github.community/)
  - Azure: [learn.microsoft.com/answers](https://learn.microsoft.com/answers/)
  - General: Stack Overflow with appropriate tags 