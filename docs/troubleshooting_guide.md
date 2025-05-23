# 🆘 Workshop Troubleshooting Guide

> **🎯 Quick solutions for common issues during your AI-assisted development journey**

---

## 📋 Table of Contents

| 🚨 Issue Category | 🔍 Common Problems | ⏱️ Typical Resolution Time |
|-------------------|-------------------|--------------------------|
| [🛠️ Pre-Workshop Setup](#-pre-workshop-setup-issues) | Account creation, tool installation | 5-15 minutes |
| [🤖 GitHub Copilot Issues](#-github-copilot-access-problems) | Authentication, suggestions not working | 2-10 minutes |
| [💻 Development Environment](#-development-environment-issues) | IDE problems, language setup | 10-30 minutes |
| [🔧 Workshop Exercise Problems](#-workshop-exercise-problems) | Code not working, compilation errors | 5-20 minutes |
| [🌐 Network & Connectivity](#-network--connectivity-issues) | Internet, proxy, firewall issues | Variable |

---

## 🛠️ Pre-Workshop Setup Issues

### 🤖 GitHub Copilot Access Problems

#### ❌ **Issue**: "I can't see GitHub Copilot suggestions"

**🔍 Diagnosis Steps:**

| Step | 🎯 Action | 📖 Details |
|------|-----------|------------|
| **1** | ✅ **Check Subscription** | Visit [github.com/settings/copilot](https://github.com/settings/copilot) |
| **2** | 🔧 **Verify Extension** | Ensure IDE extension is installed and enabled |
| **3** | 👤 **Check Account** | Confirm you're signed into correct GitHub account |
| **4** | 🔌 **Test Connection** | Verify internet connectivity |

**✅ Solutions:**

```bash
# VS Code: Check Copilot status
# Press Ctrl+Shift+P (Windows/Linux) or Cmd+Shift+P (Mac)
# Type: "GitHub Copilot: Check Status"

# If status shows issues, try these steps:
# 1. Sign out and sign back in to GitHub
# 2. Reload VS Code window (Ctrl+Shift+P → "Developer: Reload Window")
# 3. Disable and re-enable the GitHub Copilot extension
# 4. Restart VS Code completely
```

#### ❌ **Issue**: "GitHub Copilot trial expired"

**✅ Solutions:**

| 🎯 Option | 📖 Description | 💰 Cost |
|-----------|----------------|---------|
| **💳 Individual Plan** | Sign up for personal subscription | $10/month |
| **🏢 Organization Access** | Request access from company admin | Varies |
| **📚 Educational Use** | Use documented examples from workshop | Free |
| **🆓 Alternative Tools** | Use free AI coding assistants temporarily | Free |

---

### 🔧 Development Environment Issues

#### ❌ **Issue**: Visual Studio Code not starting or crashing

**🔍 Quick Diagnostics:**

```bash
# Check if VS Code is properly installed
code --version

# If command not found, VS Code not in PATH
# Windows: Add to PATH via installer or manually
# Mac: Cmd+Shift+P → "Shell Command: Install 'code' command in PATH"
# Linux: Create symlink or reinstall
```

**✅ Solutions:**

| 🔧 Problem | 🎯 Solution | 📖 Command/Action |
|------------|-------------|-------------------|
| **Not in PATH** | Add VS Code to system PATH | Reinstall with "Add to PATH" option |
| **Extension conflicts** | Start in safe mode | `code --disable-extensions` |
| **Corrupted settings** | Reset user settings | Delete `%APPDATA%\Code\User\settings.json` |
| **Memory issues** | Increase memory limit | `code --max-memory=8192` |

#### ❌ **Issue**: Java Development Kit (JDK) problems

**🔍 Diagnosis Commands:**

```bash
# Check Java installation
java -version
# Expected: openjdk version "17.x.x" or similar

# Check JAVA_HOME environment variable
echo $JAVA_HOME    # Mac/Linux
echo %JAVA_HOME%   # Windows

# Check Maven installation
mvn -version
# Expected: Apache Maven 3.x.x
```

**✅ Common Java Fixes:**

| 🚨 Error | 🔍 Cause | ✅ Solution |
|----------|----------|------------|
| **"java command not found"** | Java not in PATH | Add JDK bin directory to PATH |
| **"JAVA_HOME not set"** | Environment variable missing | Set JAVA_HOME to JDK installation directory |
| **Wrong Java version** | Multiple Java versions installed | Update PATH to point to correct version |
| **Maven not working** | Maven not installed/configured | Install Maven and add to PATH |

**🔧 Java PATH Configuration:**

```bash
# Windows (add to system environment variables)
set JAVA_HOME=C:\Program Files\Eclipse Adoptium\jdk-17.0.x
set PATH=%JAVA_HOME%\bin;%PATH%

# Mac/Linux (add to ~/.bashrc or ~/.zshrc)
export JAVA_HOME=/usr/lib/jvm/java-17-openjdk  # Linux
export JAVA_HOME=/usr/local/opt/openjdk@17     # Mac with Homebrew
export PATH=$JAVA_HOME/bin:$PATH
```

#### ❌ **Issue**: .NET SDK problems

**🔍 Diagnosis Commands:**

```bash
# Check .NET installation
dotnet --version
# Expected: 8.0.x or similar

# List all installed SDKs
dotnet --list-sdks

# Check runtime versions
dotnet --list-runtimes

# Test basic functionality
dotnet new console -n TestApp
cd TestApp
dotnet run
```

**✅ Common .NET Fixes:**

| 🚨 Error | 🔍 Cause | ✅ Solution |
|----------|----------|------------|
| **"dotnet command not found"** | .NET not in PATH | Reinstall .NET SDK with proper PATH configuration |
| **"No .NET SDKs found"** | SDK not installed | Download and install .NET SDK from Microsoft |
| **Permission denied** | Installation permissions | Run installer as administrator (Windows) or with sudo (Linux) |
| **Wrong architecture** | ARM vs x64 mismatch | Download correct architecture version |

---

## 🤖 GitHub Copilot Specific Issues

### 🔧 Copilot Extension Problems

#### ❌ **Issue**: Gray suggestions not appearing

**🔍 Troubleshooting Checklist:**

| ✅ Check | 🎯 Action | 📖 Expected Result |
|----------|-----------|-------------------|
| **🔌 Extension Status** | Look at status bar (bottom right) | Should show Copilot icon |
| **🔐 Authentication** | Check if signed in to GitHub | Green checkmark or "Ready" status |
| **📡 Network** | Test internet connectivity | Able to reach github.com |
| **📄 File Type** | Verify supported language | .java, .cs, .py, .js, etc. |
| **💬 Comments** | Write clear, specific comments | Detailed description of needed code |

**✅ Step-by-Step Resolution:**

```yaml
# 1. Check Copilot Status
Action: Press Ctrl+Shift+P → "GitHub Copilot: Check Status"
Expected: Shows "GitHub Copilot is ready"

# 2. Re-authenticate if needed
Action: Press Ctrl+Shift+P → "GitHub Copilot: Sign Out" then "Sign In"
Expected: Browser opens for GitHub authentication

# 3. Restart Extension
Action: Disable GitHub Copilot extension, reload VS Code, re-enable
Expected: Extension loads without errors

# 4. Test with Simple Code
Action: Create new .java file, type "// Create a hello world method"
Expected: Gray suggestion appears
```

#### ❌ **Issue**: Suggestions are irrelevant or poor quality

**🎯 Improvement Strategies:**

| 🎯 Strategy | 📖 Example | ✅ Better Result |
|-------------|-------------|------------------|
| **📝 Be More Specific** | `// Create method` → `// Create method to validate email format with regex` | More targeted suggestions |
| **📋 Add Context** | Include class name, parameters, return type in comments | Contextually appropriate code |
| **🔢 Provide Examples** | `// Example: isValid("test@email.com") returns true` | Accurate implementation |
| **⚠️ Mention Constraints** | `// Must handle null input and throw IllegalArgumentException` | Robust error handling |

---

## 🧪 Workshop Exercise Problems

### 🔧 Code Compilation Issues

#### ❌ **Issue**: Java compilation errors

**🔍 Common Java Errors & Solutions:**

| 🚨 Error Message | 🔍 Cause | ✅ Solution |
|------------------|----------|------------|
| **"cannot find symbol"** | Missing import or typo | Add correct import statement |
| **"class not found"** | Classpath issues | Ensure file is in correct package |
| **"method not found"** | Wrong method signature | Check method name and parameters |
| **"incompatible types"** | Type mismatch | Cast or convert to correct type |

```java
// Common Java compilation fixes

// ❌ Missing import
String[] names = Arrays.asList("Alice", "Bob");  // Error: Arrays not found

// ✅ Add import
import java.util.Arrays;
String[] names = Arrays.asList("Alice", "Bob");  // Works

// ❌ Wrong package
package com.wrong.package;  // File in different directory

// ✅ Correct package
package com.example.workshop;  // File in src/com/example/workshop/

// ❌ Type mismatch
int result = "hello";  // Error: String cannot be converted to int

// ✅ Correct type
String result = "hello";  // Works
```

#### ❌ **Issue**: C# compilation errors

**🔍 Common C# Errors & Solutions:**

| 🚨 Error Message | 🔍 Cause | ✅ Solution |
|------------------|----------|------------|
| **"using directive is unnecessary"** | Unused import | Remove unused using statements |
| **"name does not exist"** | Missing namespace | Add using directive |
| **"cannot convert"** | Type conversion needed | Use explicit casting |
| **"not accessible"** | Access modifier issue | Make method/field public |

```csharp
// Common C# compilation fixes

// ❌ Missing using directive
List<string> names = new List<string>();  // Error: List not found

// ✅ Add using directive
using System.Collections.Generic;
List<string> names = new List<string>();  // Works

// ❌ Access modifier
class MyClass {
    private string GetName() { return "test"; }  // Private method
}
var name = new MyClass().GetName();  // Error: not accessible

// ✅ Public method
class MyClass {
    public string GetName() { return "test"; }  // Public method
}
var name = new MyClass().GetName();  // Works
```

### 🚀 Performance Exercise Issues

#### ❌ **Issue**: Performance tests showing unexpected results

**🔍 Troubleshooting Performance Issues:**

| 🚨 Problem | 🔍 Possible Cause | ✅ Solution |
|------------|-------------------|------------|
| **No performance difference** | Dataset too small | Increase test data size to 10,000+ items |
| **Inconsistent results** | JVM warmup (Java) or GC interference | Run multiple iterations, discard first few |
| **Memory errors** | Insufficient heap space | Increase JVM heap size: `-Xmx2g` |
| **Timing inaccurate** | System clock resolution | Use `System.nanoTime()` instead of `currentTimeMillis()` |

```java
// Improved performance testing code
public class PerformanceTester {
    
    private static final int WARMUP_ITERATIONS = 5;
    private static final int TEST_ITERATIONS = 10;
    
    public static void main(String[] args) {
        int[] testSizes = {1000, 5000, 10000, 50000};
        
        for (int size : testSizes) {
            System.out.println("\n📊 Testing with " + size + " items:");
            List<String> testData = generateTestData(size);
            
            // 🔥 Warmup JVM
            for (int i = 0; i < WARMUP_ITERATIONS; i++) {
                testStringConcatenation(testData);
                testStringBuilder(testData);
            }
            
            // 📊 Actual performance test
            long totalStringTime = 0;
            long totalBuilderTime = 0;
            
            for (int i = 0; i < TEST_ITERATIONS; i++) {
                totalStringTime += testStringConcatenation(testData);
                totalBuilderTime += testStringBuilder(testData);
            }
            
            long avgStringTime = totalStringTime / TEST_ITERATIONS;
            long avgBuilderTime = totalBuilderTime / TEST_ITERATIONS;
            
            double improvement = (double) avgStringTime / avgBuilderTime;
            System.out.printf("⚡ StringBuilder is %.2fx faster (avg over %d runs)%n", 
                            improvement, TEST_ITERATIONS);
        }
    }
}
```

---

## 🔒 Security Exercise Issues

### 🛡️ SQL Injection Exercise Problems

#### ❌ **Issue**: Database connection errors

**🔍 Database Connection Troubleshooting:**

| 🚨 Error | 🔍 Cause | ✅ Solution |
|----------|----------|------------|
| **"Driver not found"** | JDBC driver missing | Add H2 database dependency |
| **"Connection refused"** | Database not running | Use in-memory database for testing |
| **"Authentication failed"** | Wrong credentials | Use embedded database or correct credentials |
| **"Table not found"** | Database not initialized | Create table before running queries |

```java
// Complete working database example with H2
import java.sql.*;

public class WorkingDatabaseExample {
    
    private static final String DB_URL = "jdbc:h2:mem:testdb;DB_CLOSE_DELAY=-1";
    private static final String USERNAME = "sa";
    private static final String PASSWORD = "";
    
    static {
        try {
            // Initialize database with test data
            Connection conn = DriverManager.getConnection(DB_URL, USERNAME, PASSWORD);
            
            // Create table
            String createTable = """
                CREATE TABLE users (
                    id INT PRIMARY KEY AUTO_INCREMENT,
                    username VARCHAR(50) NOT NULL,
                    email VARCHAR(100) NOT NULL
                )
                """;
            conn.createStatement().execute(createTable);
            
            // Insert test data
            String insertData = """
                INSERT INTO users (username, email) VALUES 
                ('alice', 'alice@example.com'),
                ('bob', 'bob@example.com'),
                ('charlie', 'charlie@example.com')
                """;
            conn.createStatement().execute(insertData);
            
            conn.close();
            System.out.println("✅ Database initialized successfully");
            
        } catch (SQLException e) {
            System.err.println("❌ Database initialization failed: " + e.getMessage());
        }
    }
    
    // Your secure findUser method here...
}
```

**📦 Maven Dependencies for H2:**

```xml
<!-- Add to pom.xml -->
<dependencies>
    <dependency>
        <groupId>com.h2database</groupId>
        <artifactId>h2</artifactId>
        <version>2.2.224</version>
    </dependency>
</dependencies>
```

**📦 .NET Package for SQLite:**

```bash
# Add SQLite package for .NET
dotnet add package Microsoft.Data.Sqlite
```

---

## 🌐 Network & Connectivity Issues

### 🔒 Corporate Firewall Issues

#### ❌ **Issue**: GitHub Copilot blocked by corporate firewall

**🔍 Required Network Access:**

| 🌐 Domain | 📖 Purpose | 🔌 Port |
|-----------|------------|---------|
| `github.com` | Authentication | 443 (HTTPS) |
| `api.github.com` | Copilot API | 443 (HTTPS) |
| `copilot-proxy.githubusercontent.com` | Code suggestions | 443 (HTTPS) |
| `default.exp-tas.com` | Telemetry | 443 (HTTPS) |

**✅ Corporate Environment Solutions:**

```yaml
# Request IT to whitelist these domains
Required Domains:
  - "*.github.com"
  - "*.githubusercontent.com" 
  - "*.exp-tas.com"

# Alternative: Use personal device/network for workshop
Backup Plan:
  - Mobile hotspot
  - Personal laptop with home internet
  - Workshop materials work offline after initial setup
```

### 🔄 Proxy Configuration

#### ❌ **Issue**: Proxy blocking GitHub connections

**✅ VS Code Proxy Settings:**

```json
// VS Code settings.json
{
    "http.proxy": "http://proxy.company.com:8080",
    "http.proxyStrictSSL": false,
    "http.proxyAuthorization": "Basic base64encodedusername:password"
}
```

**✅ Git Proxy Configuration:**

```bash
# Configure Git to use corporate proxy
git config --global http.proxy http://proxy.company.com:8080
git config --global https.proxy https://proxy.company.com:8080

# For authenticated proxy
git config --global http.proxy http://username:password@proxy.company.com:8080
```

---

## 🚨 Emergency Contact Information

### 📞 Getting Help During Workshop

| 🆘 Issue Severity | 🎯 Contact Method | ⏱️ Response Time |
|-------------------|-------------------|------------------|
| **🚨 Critical** | Raise hand / Ask instructor | Immediate |
| **🔴 High** | Chat/message workshop facilitator | 2-5 minutes |
| **🟡 Medium** | Check with neighbor / peer help | Self-service |
| **🟢 Low** | Reference documentation | Self-service |

### 🔗 External Support Resources

| 🌐 Resource | 📖 Description | 🔗 URL |
|-------------|----------------|--------|
| **GitHub Copilot Docs** | Official documentation | [docs.github.com/copilot](https://docs.github.com/copilot) |
| **GitHub Support** | Technical support | [support.github.com](https://support.github.com) |
| **VS Code Docs** | IDE documentation | [code.visualstudio.com/docs](https://code.visualstudio.com/docs) |
| **Stack Overflow** | Community Q&A | [stackoverflow.com](https://stackoverflow.com) |

---

## 📝 Pre-Workshop Checklist

> **✅ Use this checklist to verify your setup before the workshop begins**

### 🔧 Essential Setup Verification

| ✅ Item | 🎯 Verification Command | 📖 Expected Result |
|---------|-------------------------|-------------------|
| **🌐 Internet Access** | Open `github.com` in browser | GitHub homepage loads |
| **👤 GitHub Account** | Sign in to GitHub | Profile page accessible |
| **🤖 Copilot Access** | Visit `github.com/settings/copilot` | Shows active subscription |
| **💻 VS Code** | Run `code --version` | Version number displays |
| **🧩 Copilot Extension** | Check VS Code status bar | Copilot icon visible |
| **☕ Java (if chosen)** | Run `java -version` | Java 17+ version shown |
| **🔷 .NET (if chosen)** | Run `dotnet --version` | .NET 8+ version shown |
| **🌐 Git** | Run `git --version` | Git version 2.x+ shown |

### 🧪 Quick Test

**Create this simple test to verify everything works:**

1. **📄 Create test file:** `Test.java` or `Test.cs`
2. **✍️ Type comment:** `// Create a hello world method`
3. **👀 Watch for:** Gray AI suggestion appears
4. **✅ Accept suggestion:** Press `Tab` to accept
5. **🚀 Compile & run:** Verify code works

> **🎉 If all items pass, you're ready for the workshop!**

---

## 🏆 Advanced Troubleshooting

### 🔧 VS Code Advanced Diagnostics

```bash
# Enable verbose logging for GitHub Copilot
# Add to VS Code settings.json:
{
    "github.copilot.advanced": {
        "debug.overrideEngine": true,
        "debug.testOverrideProxyUrl": "",
        "debug.showScores": true
    }
}

# View Copilot logs
# Ctrl+Shift+P → "Developer: Show Logs" → "GitHub Copilot"
```

### 🐛 System Diagnostics

```bash
# Check system resources
# Windows
tasklist | findstr "Code"
wmic process where name="Code.exe" get PageFileUsage,WorkingSetSize

# Mac/Linux  
ps aux | grep -i code
top -p $(pgrep code)

# Check disk space (VS Code needs ~500MB free)
# Windows: dir C:\ 
# Mac/Linux: df -h
```

---

**🎯 Remember:** Most issues can be resolved by restarting VS Code, checking internet connectivity, and verifying GitHub authentication. When in doubt, ask for help!