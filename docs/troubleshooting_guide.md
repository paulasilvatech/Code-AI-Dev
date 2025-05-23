# Workshop Troubleshooting Guide

## Pre-Workshop Setup Issues

### GitHub Copilot Access Problems

**Issue**: "I can't see GitHub Copilot suggestions"
**Diagnosis Steps**:
1. Check subscription status: [github.com/settings/copilot](https://github.com/settings/copilot)
2. Verify IDE extension is installed and enabled
3. Confirm you're signed into the correct GitHub account

**Solutions**:
```bash
# VS Code: Check extension status
# Ctrl+Shift+P → "GitHub Copilot: Check Status"

# If not working, try:
# 1. Sign out and sign back in
# 2. Reload VS Code window
# 3. Disable/enable extension
```

**Issue**: "GitHub Copilot trial expired"
**Solutions**:
- Sign up for individual plan ($10/month)
- Request organizational access from admin
- Use documented examples if budget is a constraint

### Development Environment Issues

**Issue**: Java/Maven not working
**Diagnosis**: 
```bash
java -version
mvn -version
echo $JAVA_HOME
```

**Solutions**:
```bash
# Windows
set JAVA_HOME=C:\Program Files\Eclipse Adoptium\jdk-17.0.x
set PATH=%JAVA_HOME%\bin;%PATH%

# macOS/Linux  
export JAVA_HOME=/usr/lib/jvm/java-17-openjdk
export PATH=$JAVA_HOME/bin:$PATH
```

**Issue**: .NET SDK not found
**Diagnosis**:
```bash
dotnet --version
dotnet --list-sdks
```

**Solutions**:
```bash
# Install .NET 8
# Windows: winget install Microsoft.DotNet.SDK.8
# macOS: brew install dotnet
# Linux: See docs.microsoft.com/dotnet/core/install/linux

# Verify installation
dotnet new console -n TestApp
cd TestApp
dotnet run
```

### Azure Account Issues

**Issue**: "Azure free account signup failed"
**Common Causes**:
- Credit card verification issues
- Account already exists
- Geographic restrictions

**Solutions**:
1. Use different email if account exists
2. Try alternative payment method for verification
3. Contact Azure support for geographic issues
4. Use local alternatives from `/alternative-setups/`

## During Workshop Issues

### GitHub Copilot Performance

**Issue**: "Copilot suggestions are slow or not appearing"
**Immediate Fixes**:
1. Check internet connection
2. Restart IDE
3. Clear Copilot cache
4. Try different prompt wording

**Workarounds**:
- Use GitHub Copilot Chat as alternative
- Pair with someone whose Copilot is working
- Follow along with provided code examples

### Code Compilation Errors

**Issue**: Java compilation failures
**Common Solutions**:
```bash
# Clear Maven cache
mvn clean install -U

# Check Java version compatibility
mvn compile -X

# Reset project structure
mvn archetype:generate -DgroupId=com.example -DartifactId=test-project
```

**Issue**: .NET build failures
**Common Solutions**:
```bash
# Clean and restore
dotnet clean
dotnet restore
dotnet build

# Check SDK version
dotnet --list-sdks
dotnet new globaljson --sdk-version 8.0.100
```

### Azure Resource Creation Failures

**Issue**: "Insufficient quota" or "Resource limit exceeded"
**Solutions**:
1. Choose different Azure region
2. Use smaller SKU sizes
3. Delete unused resources
4. Request quota increase (for paid accounts)

**Alternative Approach**:
```bash
# Use basic tiers instead of standard
az appservice plan create --sku F1  # Free tier
az sql db create --service-objective Basic  # Basic tier
```

### Git and Repository Issues

**Issue**: Repository access problems
**Solutions**:
```bash
# Check Git configuration
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"

# Clone with HTTPS instead of SSH
git clone https://github.com/paulasilvatech/Code-AI-Dev.git

# Fix permission issues (macOS/Linux)
sudo chown -R $(whoami) /path/to/repo
```

## Advanced Troubleshooting

### Performance Issues

**Issue**: Workshop environment running slowly
**Diagnosis**:
```bash
# Check system resources
# Windows: Task Manager
# macOS: Activity Monitor  
# Linux: htop or top
```

**Solutions**:
1. Close unnecessary applications
2. Use GitHub Codespaces for cloud development
3. Reduce IDE extensions
4. Use lighter IDE alternatives (VS Code instead of full IDE)

### Network and Firewall Issues

**Issue**: Corporate firewall blocking tools
**Common Blocks**:
- GitHub Copilot API calls
- Azure resource access
- Package downloads (npm, Maven, NuGet)

**Solutions**:
```bash
# Configure proxy settings
# Maven: ~/.m2/settings.xml
<proxies>
  <proxy>
    <host>proxy.company.com</host>
    <port>8080</port>
  </proxy>
</proxies>

# npm proxy
npm config set proxy http://proxy.company.com:8080
npm config set https-proxy http://proxy.company.com:8080

# Git proxy
git config --global http.proxy http://proxy.company.com:8080
```

### Specific Workshop Exercise Issues

**Issue**: String optimization exercise not working
**Debug Steps**:
1. Check if code compiles without AI suggestions
2. Verify input data format
3. Test with smaller dataset
4. Compare with provided solution

**Issue**: Security remediation exercise failing
**Common Problems**:
- Database connection strings incorrect
- SQL permissions issues
- Missing dependencies

**Solutions**:
```java
// Use in-memory database for testing
@TestPropertySource(properties = {
    "spring.datasource.url=jdbc:h2:mem:testdb",
    "spring.jpa.hibernate.ddl-auto=create-drop"
})
```

## Emergency Backup Plans

### If GitHub Copilot Completely Fails
1. **Switch to documented examples**: All exercises have complete before/after code
2. **Use pair programming**: Working participants help others
3. **Focus on concepts**: Emphasize understanding over tool usage
4. **Extended Q&A**: More discussion, less hands-on coding

### If Azure Resources Fail
1. **Use local alternatives**: Docker containers for databases
2. **Focus on code optimization**: Skip deployment exercises
3. **Use simulation**: Walk through Azure portal without actual resources
4. **Provide homework**: Azure setup as take-home exercise

### If Network Issues Affect Everyone
1. **Offline mode**: Use pre-downloaded materials
2. **Local Git repos**: Work with local copies only
3. **Theory focus**: More architecture discussion
4. **Group exercises**: Collaborative problem-solving without tools

## Post-Workshop Support

### Common Follow-up Questions

**Q**: "How do I get GitHub Copilot approved at my company?"
**A**: Provide business case template:
- ROI calculation worksheet
- Security assessment document
- Pilot program proposal
- Success metrics framework

**Q**: "The code doesn't work in my production environment"
**A**: Environment-specific troubleshooting:
- Dependency conflicts
- Version compatibility
- Configuration differences
- Security policy restrictions

### Long-term Support Resources

**Community Forums**:
- GitHub Discussions for repository
- Stack Overflow with specific tags
- Discord/Slack community channels

**Documentation Updates**:
- Maintain FAQ based on common issues
- Video tutorials for complex setups
- Regular content updates for tool changes

**Follow-up Sessions**:
- Monthly Q&A calls
- Advanced topic deep-dives
- Success story sharing sessions

## Facilitator Emergency Kit

### Must-Have Backups
- [ ] Offline copies of all materials
- [ ] Pre-built code examples (working versions)
- [ ] Alternative exercise variations
- [ ] Contact info for technical support
- [ ] Mobile hotspot for internet backup

### Preparation Checklist
- [ ] Test all exercises 24 hours before workshop
- [ ] Verify all links and resources work
- [ ] Prepare troubleshooting cheat sheet
- [ ] Have contact info for GitHub/Azure support
- [ ] Create backup GitHub repository with solutions

### Quick Reference Commands

```bash
# GitHub Copilot status check
gh copilot status

# Azure login and resource check  
az login
az account show
az group list

# Development environment verification
java -version && mvn -version
dotnet --version
git --version
code --version

# Quick project setup
mkdir workshop-backup
cd workshop-backup
git init
# Copy working examples here
```

This troubleshooting guide should be printed and available during all workshop sessions. Consider creating a digital version accessible via QR code for easy reference.