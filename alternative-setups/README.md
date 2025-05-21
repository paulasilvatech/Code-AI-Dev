# 🔄 Alternative Setups for Free/Trial Users

This directory contains instructions for workshop participants who want to follow along using free tiers, trial versions, or local alternatives to the enterprise tools.

## 🎁 Free and Trial Options

### GitHub Copilot

- **Free Trial**: GitHub Copilot offers a [30-day free trial](https://github.com/features/copilot) for individual developers
- **Student Access**: Students can get [GitHub Copilot for free](https://education.github.com/pack/offers#github-copilot) through GitHub Education
- **Open Source**: Maintainers of popular open source projects may qualify for free access

### Azure Services

- **Free Tier**: New Azure users get [$200 in free credits](https://azure.microsoft.com/free/) for 30 days
- **Azure for Students**: Students get [$100 in credits](https://azure.microsoft.com/free/students/) with no credit card required
- **Visual Studio Subscription**: Comes with monthly Azure credits

### Local Alternatives

- **Docker Compose**: Use the included docker-compose files to run necessary services locally
- **Local Code Analysis**: Instructions for using free code analysis tools as alternatives
- **GitHub Actions**: Free tier for public repositories

## 🛠️ Alternative Setup Instructions

### Option 1: Using GitHub Codespaces (Easiest)

1. Click the "Code" button on the GitHub repository
2. Select "Open with Codespaces"
3. Create a new codespace
4. All examples will be pre-configured to run in this environment

### Option 2: Local Development Environment

1. Clone this repository
2. Install the required tools:
   - JDK 17+
   - .NET 8+
   - Docker Desktop
3. Run `docker-compose up -d` in the `/alternative-setups/docker` directory
4. Follow the example-specific README files for local execution instructions

### Option 3: Hybrid Approach

1. Use GitHub Copilot free trial for the AI assistance parts
2. Run the example code locally without Azure integrations
3. Use the included sample datasets for analysis

## 📖 Understanding the Examples Without Enterprise Tools

Each example directory includes:

1. **Documentation**: Detailed explanation of what the AI tools would suggest
2. **Manual Steps**: How to implement the optimizations without AI assistance
3. **Sample Output**: Example results to compare with your work
4. **Learning Resources**: Links to learn more about each optimization technique

## ⚠️ Limitations of Free/Trial Versions

- GitHub Copilot trial is limited to 30 days
- Azure free credits expire after 30 days
- Some advanced features may be limited in free tiers
- Performance may be reduced in free/trial environments

For each limitation, we've provided alternative approaches so you can still complete the workshop successfully.

## 🤝 Support

If you're having trouble with the free/trial setup, please:

1. Check the GitHub repository issues
2. Post questions in the workshop discussion forum
3. Refer to the detailed guides in each example directory

Remember, the goal is to learn the principles of AI-assisted code optimization, which can be achieved with any of these setup options. 