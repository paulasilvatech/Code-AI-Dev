# MCP Integration Guide

This guide demonstrates how to integrate MCP (Model Context Protocol) with various development tools and services.

## 🔌 Tool Integrations

### 1. VS Code Integration

```json
// .vscode/settings.json
{
  "mcp.servers": {
    "workshop": {
      "command": "node",
      "args": ["${workspaceFolder}/mcp-server.js"],
      "env": {
        "AZURE_OPENAI_ENDPOINT": "${env:AZURE_OPENAI_ENDPOINT}",
        "AZURE_OPENAI_API_KEY": "${env:AZURE_OPENAI_API_KEY}"
      }
    }
  },
  "mcp.autoStart": true,
  "mcp.showNotifications": true
}
```

```typescript
// VS Code Extension for MCP
import * as vscode from 'vscode';
import { MCPClient } from '@modelcontextprotocol/sdk';

export function activate(context: vscode.ExtensionContext) {
  const client = new MCPClient();
  
  // Register code review command
  const reviewCommand = vscode.commands.registerCommand(
    'mcp.reviewCode',
    async () => {
      const editor = vscode.window.activeTextEditor;
      if (!editor) return;
      
      const code = editor.document.getText();
      const language = editor.document.languageId;
      
      // Call MCP tool
      const review = await client.callTool('code_review', {
        code,
        language,
        reviewType: 'all'
      });
      
      // Display results
      const panel = vscode.window.createWebviewPanel(
        'codeReview',
        'AI Code Review',
        vscode.ViewColumn.Two,
        {}
      );
      
      panel.webview.html = formatReviewResults(review);
    }
  );
  
  context.subscriptions.push(reviewCommand);
}
```

### 2. GitHub Integration

```yaml
# .github/workflows/mcp-integration.yml
name: MCP AI Analysis

on:
  pull_request:
    types: [opened, synchronize]

jobs:
  ai-review:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup MCP
        run: |
          npm install -g @modelcontextprotocol/cli
          mcp server start --config ./mcp-server-config.json &
          sleep 5
      
      - name: Run AI Code Review
        uses: ./.github/actions/mcp-review
        with:
          github-token: ${{ secrets.GITHUB_TOKEN }}
          mcp-config: ./mcp-client-config.json
      
      - name: Security Scan
        run: |
          node scripts/mcp-security-scan.js
        env:
          AZURE_OPENAI_ENDPOINT: ${{ secrets.AZURE_OPENAI_ENDPOINT }}
          AZURE_OPENAI_API_KEY: ${{ secrets.AZURE_OPENAI_API_KEY }}
```

```javascript
// .github/actions/mcp-review/index.js
const core = require('@actions/core');
const github = require('@actions/github');
const { MCPClient } = require('@modelcontextprotocol/sdk');

async function run() {
  try {
    const token = core.getInput('github-token');
    const octokit = github.getOctokit(token);
    
    const { context } = github;
    const pr = context.payload.pull_request;
    
    // Get changed files
    const { data: files } = await octokit.rest.pulls.listFiles({
      owner: context.repo.owner,
      repo: context.repo.repo,
      pull_number: pr.number
    });
    
    // Initialize MCP client
    const client = new MCPClient();
    await client.connect('workshop');
    
    // Review each file
    const comments = [];
    for (const file of files) {
      if (file.status === 'removed') continue;
      
      // Get file content
      const { data: content } = await octokit.rest.repos.getContent({
        owner: context.repo.owner,
        repo: context.repo.repo,
        path: file.filename,
        ref: pr.head.sha
      });
      
      const code = Buffer.from(content.content, 'base64').toString();
      
      // Perform AI review
      const review = await client.callTool('code_review', {
        code,
        language: getLanguageFromFile(file.filename),
        reviewType: 'all'
      });
      
      // Convert to GitHub comments
      if (review.issues && review.issues.length > 0) {
        for (const issue of review.issues) {
          comments.push({
            path: file.filename,
            line: issue.line,
            body: `**AI Review**: ${issue.message}\n\n${issue.suggestion}`
          });
        }
      }
    }
    
    // Post review
    if (comments.length > 0) {
      await octokit.rest.pulls.createReview({
        owner: context.repo.owner,
        repo: context.repo.repo,
        pull_number: pr.number,
        body: 'AI-powered code review completed',
        event: 'COMMENT',
        comments
      });
    }
    
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
```

### 3. Azure DevOps Integration

```yaml
# azure-pipelines-mcp.yml
trigger:
  branches:
    include:
      - main
      - develop
  paths:
    exclude:
      - docs/*
      - README.md

pool:
  vmImage: 'ubuntu-latest'

variables:
  - group: mcp-credentials

stages:
  - stage: AIAnalysis
    displayName: 'AI-Powered Analysis'
    jobs:
      - job: CodeAnalysis
        displayName: 'MCP Code Analysis'
        steps:
          - task: NodeTool@0
            inputs:
              versionSpec: '18.x'
          
          - script: |
              npm install -g @modelcontextprotocol/cli
              npm install
            displayName: 'Install Dependencies'
          
          - task: PowerShell@2
            displayName: 'Start MCP Server'
            inputs:
              targetType: 'inline'
              script: |
                $env:AZURE_OPENAI_ENDPOINT = "$(AZURE_OPENAI_ENDPOINT)"
                $env:AZURE_OPENAI_API_KEY = "$(AZURE_OPENAI_API_KEY)"
                Start-Process -NoNewWindow -FilePath "mcp" -ArgumentList "server", "start", "--config", "./mcp-server-config.json"
                Start-Sleep -Seconds 10
          
          - task: PowerShell@2
            displayName: 'Run AI Analysis'
            inputs:
              filePath: 'scripts/azure-devops-mcp-analysis.ps1'
              arguments: '-BuildId $(Build.BuildId) -SourceBranch $(Build.SourceBranch)'
          
          - task: PublishTestResults@2
            condition: always()
            inputs:
              testResultsFormat: 'JUnit'
              testResultsFiles: '**/mcp-test-results.xml'
              
          - task: PublishCodeCoverageResults@1
            inputs:
              codeCoverageTool: 'Cobertura'
              summaryFileLocation: '**/mcp-coverage.xml'
```

```powershell
# scripts/azure-devops-mcp-analysis.ps1
param(
    [string]$BuildId,
    [string]$SourceBranch
)

# Initialize MCP client
$mcpClient = New-Object -TypeName MCPClient -ArgumentList "./mcp-client-config.json"
$mcpClient.Connect("workshop")

# Get changed files
$changedFiles = git diff --name-only HEAD~1

foreach ($file in $changedFiles) {
    if (Test-Path $file) {
        $content = Get-Content $file -Raw
        $extension = [System.IO.Path]::GetExtension($file)
        
        # Determine language
        $language = switch ($extension) {
            ".cs" { "csharp" }
            ".js" { "javascript" }
            ".ts" { "typescript" }
            ".py" { "python" }
            ".java" { "java" }
            default { "unknown" }
        }
        
        if ($language -ne "unknown") {
            # Run security scan
            $securityResult = $mcpClient.CallTool("security_scan", @{
                code = $content
                scanType = "all"
                severity = "all"
            })
            
            # Generate tests
            $testResult = $mcpClient.CallTool("generate_tests", @{
                code = $content
                framework = Get-TestFramework $language
                coverage = "comprehensive"
            })
            
            # Save results
            $testFile = $file -replace "\.[^.]+$", ".test$extension"
            Set-Content -Path $testFile -Value $testResult.tests
            
            # Log vulnerabilities
            if ($securityResult.vulnerabilities.Count -gt 0) {
                Write-Host "##vso[task.logissue type=warning]Security issues found in $file"
                foreach ($vuln in $securityResult.vulnerabilities) {
                    Write-Host "##vso[task.logissue type=warning;sourcepath=$file;linenumber=$($vuln.line)]$($vuln.message)"
                }
            }
        }
    }
}

# Generate summary report
$report = $mcpClient.GenerateReport(@{
    buildId = $BuildId
    branch = $SourceBranch
    timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
})

# Publish as build artifact
$reportPath = "$(Build.ArtifactStagingDirectory)/mcp-analysis-report.html"
Set-Content -Path $reportPath -Value $report
Write-Host "##vso[artifact.upload artifactname=MCPReport]$reportPath"
```

### 4. Jenkins Integration

```groovy
// Jenkinsfile with MCP integration
pipeline {
    agent any
    
    environment {
        AZURE_OPENAI_ENDPOINT = credentials('azure-openai-endpoint')
        AZURE_OPENAI_API_KEY = credentials('azure-openai-api-key')
    }
    
    stages {
        stage('Setup MCP') {
            steps {
                sh '''
                    npm install -g @modelcontextprotocol/cli
                    mcp server start --config ./mcp-server-config.json &
                    sleep 10
                '''
            }
        }
        
        stage('AI Code Analysis') {
            steps {
                script {
                    def mcpAnalysis = load 'jenkins/mcp-analysis.groovy'
                    def results = mcpAnalysis.analyzeCode()
                    
                    if (results.criticalIssues > 0) {
                        currentBuild.result = 'UNSTABLE'
                        error("Critical issues found by AI analysis")
                    }
                }
            }
        }
        
        stage('Generate AI Tests') {
            steps {
                sh 'node jenkins/generate-tests.js'
                junit '**/test-results/*.xml'
            }
        }
        
        stage('Security Scan') {
            steps {
                sh 'node jenkins/security-scan.js'
                publishHTML([
                    allowMissing: false,
                    alwaysLinkToLastBuild: true,
                    keepAll: true,
                    reportDir: 'security-reports',
                    reportFiles: 'index.html',
                    reportName: 'AI Security Report'
                ])
            }
        }
    }
    
    post {
        always {
            sh 'mcp server stop'
        }
    }
}
```

### 5. IDE Plugins

```java
// IntelliJ IDEA Plugin for MCP
package com.workshop.mcp.intellij;

import com.intellij.openapi.actionSystem.AnAction;
import com.intellij.openapi.actionSystem.AnActionEvent;
import com.intellij.openapi.editor.Editor;
import com.intellij.openapi.project.Project;
import com.modelcontextprotocol.MCPClient;

public class MCPCodeReviewAction extends AnAction {
    private final MCPClient mcpClient;
    
    public MCPCodeReviewAction() {
        this.mcpClient = new MCPClient("mcp-client-config.json");
    }
    
    @Override
    public void actionPerformed(AnActionEvent e) {
        Project project = e.getProject();
        Editor editor = e.getData(CommonDataKeys.EDITOR);
        
        if (project == null || editor == null) return;
        
        String code = editor.getDocument().getText();
        String language = getFileLanguage(e);
        
        // Run AI review asynchronously
        ApplicationManager.getApplication().executeOnPooledThread(() -> {
            try {
                mcpClient.connect("workshop");
                
                Map<String, Object> review = mcpClient.callTool("code_review", Map.of(
                    "code", code,
                    "language", language,
                    "reviewType", "all"
                ));
                
                // Show results in tool window
                showReviewResults(project, review);
                
            } catch (Exception ex) {
                showError(project, ex.getMessage());
            }
        });
    }
    
    private void showReviewResults(Project project, Map<String, Object> review) {
        ToolWindowManager.getInstance(project).invokeLater(() -> {
            MCPToolWindow toolWindow = 
                ServiceManager.getService(project, MCPToolWindow.class);
            toolWindow.displayReview(review);
        });
    }
}
```

### 6. CLI Integration

```bash
#!/bin/bash
# mcp-cli wrapper script

# Initialize MCP environment
export MCP_CONFIG_PATH="${MCP_CONFIG_PATH:-./mcp-client-config.json}"

# Function to review code
mcp_review() {
    local file=$1
    local language=${2:-"auto"}
    
    if [ ! -f "$file" ]; then
        echo "Error: File not found: $file"
        return 1
    fi
    
    # Start MCP server if not running
    if ! pgrep -f "mcp server" > /dev/null; then
        echo "Starting MCP server..."
        mcp server start --config ./mcp-server-config.json &
        sleep 5
    fi
    
    # Run code review
    cat "$file" | mcp tool call code_review \
        --param language="$language" \
        --param reviewType="all" \
        --format json | jq '.'
}

# Function to generate tests
mcp_generate_tests() {
    local file=$1
    local framework=${2:-"jest"}
    
    cat "$file" | mcp tool call generate_tests \
        --param framework="$framework" \
        --param coverage="comprehensive" \
        --output "${file%.js}.test.js"
}

# Function to scan security
mcp_security_scan() {
    local directory=${1:-.}
    
    find "$directory" -type f \( -name "*.js" -o -name "*.py" -o -name "*.java" \) | \
    while read -r file; do
        echo "Scanning: $file"
        mcp tool call security_scan \
            --file "$file" \
            --param scanType="all" \
            --param severity="high"
    done
}

# Main command handling
case "$1" in
    review)
        mcp_review "$2" "$3"
        ;;
    test)
        mcp_generate_tests "$2" "$3"
        ;;
    scan)
        mcp_security_scan "$2"
        ;;
    *)
        echo "Usage: $0 {review|test|scan} [options]"
        exit 1
        ;;
esac
```

### 7. Docker Integration

```dockerfile
# Dockerfile with MCP integration
FROM node:18-alpine AS builder

# Install MCP CLI
RUN npm install -g @modelcontextprotocol/cli

# Copy MCP configurations
COPY mcp-server-config.json mcp-client-config.json ./

# Copy application
COPY . .

# Run AI analysis during build
RUN mcp server start --config ./mcp-server-config.json & \
    sleep 10 && \
    node scripts/build-time-analysis.js && \
    mcp server stop

# Production stage
FROM node:18-alpine

# Copy analyzed and optimized code
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/mcp-analysis-report.json ./

# Runtime MCP integration
COPY docker/mcp-runtime.js ./
COPY mcp-client-config.json ./

# Health check with AI monitoring
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD node mcp-runtime.js health-check

CMD ["node", "dist/server.js"]
```

```javascript
// docker/mcp-runtime.js
const { MCPClient } = require('@modelcontextprotocol/sdk');

class MCPRuntime {
  constructor() {
    this.client = new MCPClient({
      configPath: './mcp-client-config.json'
    });
  }
  
  async performHealthCheck() {
    try {
      // Check application health
      const response = await fetch('http://localhost:3000/health');
      const health = await response.json();
      
      // Use AI to analyze health metrics
      await this.client.connect('workshop');
      
      const analysis = await this.client.callPrompt('analyze_health_metrics', {
        metrics: health,
        threshold: {
          cpu: 80,
          memory: 85,
          responseTime: 1000
        }
      });
      
      if (analysis.status === 'unhealthy') {
        console.error('AI detected unhealthy state:', analysis.reasons);
        process.exit(1);
      }
      
      console.log('Health check passed');
      process.exit(0);
      
    } catch (error) {
      console.error('Health check failed:', error);
      process.exit(1);
    }
  }
}

// Run health check
if (process.argv[2] === 'health-check') {
  new MCPRuntime().performHealthCheck();
}
```

### 8. Kubernetes Integration

```yaml
# k8s/mcp-operator.yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: mcp-config
data:
  mcp-server-config.json: |
    ${MCP_SERVER_CONFIG}
  mcp-client-config.json: |
    ${MCP_CLIENT_CONFIG}

---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: mcp-operator
spec:
  replicas: 1
  selector:
    matchLabels:
      app: mcp-operator
  template:
    metadata:
      labels:
        app: mcp-operator
    spec:
      serviceAccountName: mcp-operator
      containers:
      - name: operator
        image: workshop/mcp-operator:latest
        env:
        - name: AZURE_OPENAI_ENDPOINT
          valueFrom:
            secretKeyRef:
              name: mcp-secrets
              key: azure-openai-endpoint
        - name: AZURE_OPENAI_API_KEY
          valueFrom:
            secretKeyRef:
              name: mcp-secrets
              key: azure-openai-api-key
        volumeMounts:
        - name: config
          mountPath: /etc/mcp
          readOnly: true
      volumes:
      - name: config
        configMap:
          name: mcp-config

---
apiVersion: admissionregistration.k8s.io/v1
kind: MutatingWebhookConfiguration
metadata:
  name: mcp-webhook
webhooks:
- name: mcp.workshop.io
  clientConfig:
    service:
      name: mcp-webhook
      namespace: default
      path: "/mutate"
    caBundle: ${CA_BUNDLE}
  rules:
  - operations: ["CREATE", "UPDATE"]
    apiGroups: ["apps"]
    apiVersions: ["v1"]
    resources: ["deployments"]
  admissionReviewVersions: ["v1", "v1beta1"]
  sideEffects: None
```

```go
// k8s/mcp-webhook/main.go
package main

import (
    "encoding/json"
    "fmt"
    "net/http"
    
    admissionv1 "k8s.io/api/admission/v1"
    appsv1 "k8s.io/api/apps/v1"
    corev1 "k8s.io/api/core/v1"
    "k8s.io/apimachinery/pkg/runtime"
)

func handleMutate(w http.ResponseWriter, r *http.Request) {
    var admissionReview admissionv1.AdmissionReview
    
    if err := json.NewDecoder(r.Body).Decode(&admissionReview); err != nil {
        http.Error(w, err.Error(), http.StatusBadRequest)
        return
    }
    
    // Extract deployment
    deployment := appsv1.Deployment{}
    if err := json.Unmarshal(admissionReview.Request.Object.Raw, &deployment); err != nil {
        http.Error(w, err.Error(), http.StatusBadRequest)
        return
    }
    
    // Add MCP sidecar for AI monitoring
    patches := addMCPSidecar(&deployment)
    
    // Create response
    response := admissionv1.AdmissionReview{
        TypeMeta: admissionReview.TypeMeta,
        Response: &admissionv1.AdmissionResponse{
            UID:     admissionReview.Request.UID,
            Allowed: true,
            Patch:   patches,
            PatchType: func() *admissionv1.PatchType {
                pt := admissionv1.PatchTypeJSONPatch
                return &pt
            }(),
        },
    }
    
    json.NewEncoder(w).Encode(response)
}

func addMCPSidecar(deployment *appsv1.Deployment) []byte {
    sidecar := corev1.Container{
        Name:  "mcp-monitor",
        Image: "workshop/mcp-sidecar:latest",
        Env: []corev1.EnvVar{
            {
                Name: "POD_NAME",
                ValueFrom: &corev1.EnvVarSource{
                    FieldRef: &corev1.ObjectFieldSelector{
                        FieldPath: "metadata.name",
                    },
                },
            },
        },
        Resources: corev1.ResourceRequirements{
            Limits: corev1.ResourceList{
                "cpu":    "100m",
                "memory": "128Mi",
            },
        },
    }
    
    // Create JSON patch
    patch := []map[string]interface{}{
        {
            "op":    "add",
            "path":  "/spec/template/spec/containers/-",
            "value": sidecar,
        },
    }
    
    patchBytes, _ := json.Marshal(patch)
    return patchBytes
}

func main() {
    http.HandleFunc("/mutate", handleMutate)
    http.HandleFunc("/health", func(w http.ResponseWriter, r *http.Request) {
        w.WriteHeader(http.StatusOK)
    })
    
    fmt.Println("MCP Webhook server starting on :8443")
    http.ListenAndServeTLS(":8443", "/certs/tls.crt", "/certs/tls.key", nil)
}
```

## 🎯 Best Practices

1. **Environment Configuration**
   - Store MCP credentials securely
   - Use environment-specific configurations
   - Implement proper key rotation

2. **Error Handling**
   - Implement retry logic for transient failures
   - Graceful degradation when MCP is unavailable
   - Comprehensive logging and monitoring

3. **Performance Optimization**
   - Use connection pooling
   - Implement caching for repeated analyses
   - Batch operations when possible

4. **Security Considerations**
   - Encrypt MCP communications
   - Implement access control
   - Audit all AI operations

5. **Monitoring and Observability**
   - Track MCP usage metrics
   - Monitor response times
   - Alert on anomalies

## 🚀 Next Steps

1. **Choose** integration points that provide most value
2. **Start** with simple integrations and expand
3. **Monitor** performance and adjust configurations
4. **Share** successful integrations with your team
5. **Contribute** improvements back to the community 