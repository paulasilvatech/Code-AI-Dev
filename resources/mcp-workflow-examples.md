# MCP (Model Context Protocol) Workflow Examples

This guide provides practical workflows for using MCP in AI-powered development scenarios.

## 🚀 Getting Started with MCP

### 1. Basic MCP Setup Workflow

```bash
# Install MCP CLI
npm install -g @modelcontextprotocol/cli

# Initialize MCP in your project
mcp init

# Start MCP server
mcp server start --config ./mcp-server-config.json

# Connect client
mcp client connect --config ./mcp-client-config.json
```

### 2. Code Review Workflow with MCP

```javascript
// Example: Using MCP for automated code review

import { MCPClient } from '@modelcontextprotocol/sdk';

async function reviewCode() {
  // Initialize MCP client
  const client = new MCPClient({
    configPath: './mcp-client-config.json'
  });
  
  // Connect to workshop server
  await client.connect('workshop');
  
  // Code to review
  const code = `
    function calculateTotal(items) {
      let total = 0;
      for (let i = 0; i < items.length; i++) {
        total += items[i].price * items[i].quantity;
      }
      return total;
    }
  `;
  
  // Perform code review
  const review = await client.callTool('code_review', {
    code: code,
    language: 'javascript',
    reviewType: 'all'
  });
  
  console.log('Code Review Results:', review);
  
  // Get optimization suggestions
  const optimized = await client.callTool('optimize_code', {
    code: code,
    targetMetric: 'both'
  });
  
  console.log('Optimized Code:', optimized);
}

// Execute review
reviewCode().catch(console.error);
```

## 🔄 Advanced MCP Workflows

### 3. Multi-Agent Development Workflow

```python
# Multi-agent workflow using MCP

import asyncio
from mcp_sdk import MCPClient, MCPServer

class DevelopmentOrchestrator:
    """Orchestrates multiple AI agents via MCP"""
    
    def __init__(self):
        self.client = MCPClient(config_path='./mcp-client-config.json')
        self.agents = {
            'reviewer': 'workshop',
            'tester': 'workshop',
            'documenter': 'workshop',
            'optimizer': 'workshop'
        }
    
    async def develop_feature(self, specification):
        """Complete feature development workflow"""
        
        # Step 1: Generate initial implementation
        print("🚀 Generating initial implementation...")
        implementation = await self.generate_implementation(specification)
        
        # Step 2: Review code
        print("🔍 Reviewing code...")
        review_results = await self.review_code(implementation)
        
        # Step 3: Fix issues
        if review_results['issues']:
            print("🔧 Fixing identified issues...")
            implementation = await self.fix_issues(implementation, review_results)
        
        # Step 4: Generate tests
        print("🧪 Generating tests...")
        tests = await self.generate_tests(implementation)
        
        # Step 5: Optimize performance
        print("⚡ Optimizing performance...")
        optimized_code = await self.optimize_code(implementation)
        
        # Step 6: Generate documentation
        print("📝 Generating documentation...")
        documentation = await self.generate_documentation(optimized_code)
        
        return {
            'code': optimized_code,
            'tests': tests,
            'documentation': documentation,
            'review': review_results
        }
    
    async def generate_implementation(self, spec):
        """Generate code from specification"""
        await self.client.connect('workshop')
        
        prompt = f"""
        Generate a production-ready implementation based on this specification:
        {spec}
        
        Requirements:
        - Follow SOLID principles
        - Include error handling
        - Add logging
        - Make it testable
        """
        
        response = await self.client.callPrompt('generate_api_from_spec', {
            'spec': spec
        })
        
        return response['code']
    
    async def review_code(self, code):
        """Perform comprehensive code review"""
        await self.client.connect('workshop')
        
        review = await self.client.callTool('code_review', {
            'code': code,
            'language': 'python',
            'reviewType': 'all'
        })
        
        return review
    
    async def generate_tests(self, code):
        """Generate comprehensive test suite"""
        await self.client.connect('workshop')
        
        tests = await self.client.callTool('generate_tests', {
            'code': code,
            'framework': 'pytest',
            'coverage': 'comprehensive'
        })
        
        return tests
    
    async def optimize_code(self, code):
        """Optimize code for performance"""
        await self.client.connect('workshop')
        
        optimized = await self.client.callTool('optimize_code', {
            'code': code,
            'targetMetric': 'both',
            'constraints': ['maintain_readability', 'preserve_functionality']
        })
        
        return optimized['code']
    
    async def generate_documentation(self, code):
        """Generate comprehensive documentation"""
        await self.client.connect('workshop')
        
        docs = await self.client.callTool('generate_documentation', {
            'code': code,
            'style': 'markdown',
            'includeExamples': True
        })
        
        return docs

# Usage
async def main():
    orchestrator = DevelopmentOrchestrator()
    
    specification = """
    API Endpoint: User Management
    - GET /users - List all users with pagination
    - GET /users/{id} - Get specific user
    - POST /users - Create new user
    - PUT /users/{id} - Update user
    - DELETE /users/{id} - Delete user
    
    Requirements:
    - Authentication required
    - Role-based access control
    - Audit logging
    - Input validation
    """
    
    result = await orchestrator.develop_feature(specification)
    
    # Save generated artifacts
    with open('user_api.py', 'w') as f:
        f.write(result['code'])
    
    with open('test_user_api.py', 'w') as f:
        f.write(result['tests'])
    
    with open('USER_API.md', 'w') as f:
        f.write(result['documentation'])

# Run the workflow
asyncio.run(main())
```

### 4. Continuous Security Scanning Workflow

```typescript
// MCP-based security scanning workflow

import { MCPClient } from '@modelcontextprotocol/sdk';
import { watch } from 'chokidar';
import { readFile } from 'fs/promises';

class SecurityMonitor {
  private client: MCPClient;
  private vulnerabilities: Map<string, any[]> = new Map();
  
  constructor() {
    this.client = new MCPClient({
      configPath: './mcp-client-config.json'
    });
  }
  
  async initialize() {
    await this.client.connect('workshop');
    this.setupFileWatcher();
  }
  
  setupFileWatcher() {
    // Watch for code changes
    const watcher = watch('src/**/*.{js,ts,py,java,cs}', {
      ignored: /node_modules/,
      persistent: true
    });
    
    watcher.on('change', async (path) => {
      console.log(`📁 File changed: ${path}`);
      await this.scanFile(path);
    });
    
    watcher.on('add', async (path) => {
      console.log(`📁 New file: ${path}`);
      await this.scanFile(path);
    });
  }
  
  async scanFile(filePath: string) {
    try {
      const code = await readFile(filePath, 'utf-8');
      
      // Perform security scan
      const scanResult = await this.client.callTool('security_scan', {
        code: code,
        scanType: 'all',
        severity: 'all'
      });
      
      // Process results
      if (scanResult.vulnerabilities && scanResult.vulnerabilities.length > 0) {
        this.vulnerabilities.set(filePath, scanResult.vulnerabilities);
        await this.handleVulnerabilities(filePath, scanResult.vulnerabilities);
      } else {
        this.vulnerabilities.delete(filePath);
        console.log(`✅ ${filePath}: No vulnerabilities found`);
      }
    } catch (error) {
      console.error(`Error scanning ${filePath}:`, error);
    }
  }
  
  async handleVulnerabilities(filePath: string, vulnerabilities: any[]) {
    console.log(`⚠️  ${filePath}: ${vulnerabilities.length} vulnerabilities found`);
    
    // Group by severity
    const critical = vulnerabilities.filter(v => v.severity === 'critical');
    const high = vulnerabilities.filter(v => v.severity === 'high');
    
    if (critical.length > 0) {
      console.error(`🚨 CRITICAL vulnerabilities detected!`);
      
      // Auto-fix if possible
      for (const vuln of critical) {
        if (vuln.autoFixAvailable) {
          await this.autoFixVulnerability(filePath, vuln);
        }
      }
      
      // Block deployment
      await this.blockDeployment('Critical vulnerabilities detected');
    }
    
    // Generate report
    await this.generateSecurityReport();
  }
  
  async autoFixVulnerability(filePath: string, vulnerability: any) {
    console.log(`🔧 Attempting auto-fix for ${vulnerability.type}...`);
    
    // Implementation would apply the fix
    // This is a placeholder for the workshop
  }
  
  async generateSecurityReport() {
    const report = {
      timestamp: new Date().toISOString(),
      summary: {
        totalFiles: this.vulnerabilities.size,
        totalVulnerabilities: Array.from(this.vulnerabilities.values())
          .reduce((sum, vulns) => sum + vulns.length, 0)
      },
      details: Object.fromEntries(this.vulnerabilities)
    };
    
    // Save report
    await writeFile('security-report.json', JSON.stringify(report, null, 2));
  }
  
  async blockDeployment(reason: string) {
    // Integration with CI/CD to block deployment
    console.error(`🛑 Deployment blocked: ${reason}`);
  }
}

// Start monitoring
const monitor = new SecurityMonitor();
monitor.initialize().catch(console.error);
```

### 5. AI-Powered Test Generation Workflow

```python
# MCP workflow for intelligent test generation

import os
from pathlib import Path
from mcp_sdk import MCPClient

class TestGenerationPipeline:
    """Automated test generation using MCP"""
    
    def __init__(self):
        self.client = MCPClient(config_path='./mcp-client-config.json')
        self.test_mapping = {
            '.py': 'pytest',
            '.js': 'jest',
            '.ts': 'jest',
            '.java': 'junit',
            '.cs': 'nunit'
        }
    
    async def generate_tests_for_project(self, project_path: str):
        """Generate tests for entire project"""
        
        await self.client.connect('workshop')
        
        # Find all source files
        source_files = self.find_source_files(project_path)
        
        for source_file in source_files:
            await self.generate_test_for_file(source_file)
    
    def find_source_files(self, project_path: str):
        """Find all source files that need tests"""
        
        source_files = []
        exclude_dirs = {'node_modules', '.git', '__pycache__', 'venv'}
        
        for root, dirs, files in os.walk(project_path):
            # Remove excluded directories
            dirs[:] = [d for d in dirs if d not in exclude_dirs]
            
            for file in files:
                if any(file.endswith(ext) for ext in self.test_mapping.keys()):
                    # Skip test files
                    if 'test' not in file.lower():
                        source_files.append(os.path.join(root, file))
        
        return source_files
    
    async def generate_test_for_file(self, file_path: str):
        """Generate test for a single file"""
        
        print(f"🧪 Generating tests for: {file_path}")
        
        # Read source code
        with open(file_path, 'r') as f:
            code = f.read()
        
        # Determine test framework
        ext = Path(file_path).suffix
        framework = self.test_mapping.get(ext, 'pytest')
        
        # Generate tests
        test_result = await self.client.callTool('generate_tests', {
            'code': code,
            'framework': framework,
            'coverage': 'comprehensive'
        })
        
        # Generate edge case tests
        edge_cases = await self.generate_edge_case_tests(code, framework)
        
        # Combine tests
        complete_tests = self.combine_tests(test_result, edge_cases)
        
        # Save test file
        test_file_path = self.get_test_file_path(file_path)
        with open(test_file_path, 'w') as f:
            f.write(complete_tests)
        
        print(f"✅ Tests saved to: {test_file_path}")
        
        # Run tests to verify
        await self.run_tests(test_file_path)
    
    async def generate_edge_case_tests(self, code: str, framework: str):
        """Generate specific edge case tests"""
        
        prompt = f"""
        Generate edge case tests for this code:
        {code}
        
        Focus on:
        - Boundary conditions
        - Error scenarios
        - Null/empty inputs
        - Concurrent access
        - Resource exhaustion
        
        Framework: {framework}
        """
        
        response = await self.client.callPrompt('generate_edge_case_tests', {
            'code': code,
            'framework': framework
        })
        
        return response
    
    def get_test_file_path(self, source_file: str) -> str:
        """Generate test file path"""
        
        path = Path(source_file)
        test_dir = path.parent / 'tests'
        test_dir.mkdir(exist_ok=True)
        
        # Generate test file name
        if path.suffix == '.py':
            test_name = f"test_{path.stem}.py"
        elif path.suffix in ['.js', '.ts']:
            test_name = f"{path.stem}.test{path.suffix}"
        elif path.suffix == '.java':
            test_name = f"{path.stem}Test.java"
        elif path.suffix == '.cs':
            test_name = f"{path.stem}Tests.cs"
        else:
            test_name = f"test_{path.stem}{path.suffix}"
        
        return str(test_dir / test_name)
    
    async def run_tests(self, test_file: str):
        """Run generated tests to verify they work"""
        
        ext = Path(test_file).suffix
        
        if ext == '.py':
            os.system(f"pytest {test_file} -v")
        elif ext in ['.js', '.ts']:
            os.system(f"jest {test_file}")
        # Add other test runners as needed

# Usage
async def main():
    pipeline = TestGenerationPipeline()
    await pipeline.generate_tests_for_project('./src')

# Run
import asyncio
asyncio.run(main())
```

### 6. Documentation Generation Workflow

```javascript
// MCP-based documentation generation workflow

import { MCPClient } from '@modelcontextprotocol/sdk';
import { glob } from 'glob';
import fs from 'fs/promises';
import path from 'path';

class DocumentationGenerator {
  constructor() {
    this.client = new MCPClient({
      configPath: './mcp-client-config.json'
    });
    this.outputDir = './docs/generated';
  }
  
  async generateProjectDocumentation() {
    await this.client.connect('workshop');
    
    // Create output directory
    await fs.mkdir(this.outputDir, { recursive: true });
    
    // Generate different types of documentation
    await Promise.all([
      this.generateAPIDocumentation(),
      this.generateArchitectureDocumentation(),
      this.generateUserGuide(),
      this.generateDeveloperGuide()
    ]);
    
    // Generate index
    await this.generateDocumentationIndex();
    
    console.log('📚 Documentation generation complete!');
  }
  
  async generateAPIDocumentation() {
    console.log('📝 Generating API documentation...');
    
    // Find all API files
    const apiFiles = await glob('src/api/**/*.{js,ts}');
    
    let apiDoc = '# API Documentation\n\n';
    
    for (const file of apiFiles) {
      const code = await fs.readFile(file, 'utf-8');
      
      const doc = await this.client.callTool('generate_documentation', {
        code: code,
        style: 'markdown',
        includeExamples: true
      });
      
      apiDoc += `## ${path.basename(file)}\n\n${doc}\n\n---\n\n`;
    }
    
    await fs.writeFile(
      path.join(this.outputDir, 'API.md'),
      apiDoc
    );
  }
  
  async generateArchitectureDocumentation() {
    console.log('🏗️ Generating architecture documentation...');
    
    // Analyze project structure
    const projectStructure = await this.analyzeProjectStructure();
    
    // Generate architecture documentation
    const prompt = `
    Generate comprehensive architecture documentation for this project structure:
    ${JSON.stringify(projectStructure, null, 2)}
    
    Include:
    - System overview
    - Component architecture
    - Data flow diagrams (as mermaid)
    - Technology stack
    - Design patterns used
    - Deployment architecture
    `;
    
    const archDoc = await this.client.callPrompt('generate_architecture_doc', {
      structure: projectStructure
    });
    
    await fs.writeFile(
      path.join(this.outputDir, 'ARCHITECTURE.md'),
      archDoc
    );
  }
  
  async generateUserGuide() {
    console.log('👤 Generating user guide...');
    
    // Collect user-facing features
    const features = await this.collectFeatures();
    
    const userGuide = await this.client.callPrompt('generate_user_guide', {
      features: features,
      style: 'friendly',
      includeScreenshots: true
    });
    
    await fs.writeFile(
      path.join(this.outputDir, 'USER_GUIDE.md'),
      userGuide
    );
  }
  
  async generateDeveloperGuide() {
    console.log('💻 Generating developer guide...');
    
    const devGuide = `# Developer Guide
    
## Getting Started

### Prerequisites
- Node.js >= 16.0.0
- MCP CLI installed
- Azure account (for AI services)

### Installation

\`\`\`bash
# Clone the repository
git clone <repository-url>

# Install dependencies
npm install

# Set up MCP
mcp init
mcp server start --config ./mcp-server-config.json
\`\`\`

### Development Workflow

1. **Start MCP Server**
   \`\`\`bash
   mcp server start
   \`\`\`

2. **Run Development Server**
   \`\`\`bash
   npm run dev
   \`\`\`

3. **Run Tests**
   \`\`\`bash
   npm test
   \`\`\`

### Using MCP Tools

${await this.generateMCPToolsDocumentation()}

### Contributing

Please see [CONTRIBUTING.md](../CONTRIBUTING.md) for guidelines.
`;
    
    await fs.writeFile(
      path.join(this.outputDir, 'DEVELOPER_GUIDE.md'),
      devGuide
    );
  }
  
  async generateMCPToolsDocumentation() {
    // Document available MCP tools
    const tools = [
      'code_review',
      'generate_tests',
      'optimize_code',
      'security_scan',
      'generate_documentation'
    ];
    
    let toolsDoc = '';
    
    for (const tool of tools) {
      toolsDoc += `#### ${tool}\n\n`;
      toolsDoc += await this.getToolDocumentation(tool);
      toolsDoc += '\n\n';
    }
    
    return toolsDoc;
  }
  
  async getToolDocumentation(toolName) {
    // Get tool schema from MCP server
    const schema = await this.client.getToolSchema(toolName);
    
    return `
**Description**: ${schema.description}

**Parameters**:
${this.formatParameters(schema.inputSchema.properties)}

**Example**:
\`\`\`javascript
const result = await client.callTool('${toolName}', {
  ${this.generateExampleParams(schema.inputSchema.properties)}
});
\`\`\`
`;
  }
  
  formatParameters(properties) {
    return Object.entries(properties)
      .map(([name, prop]) => `- \`${name}\` (${prop.type}): ${prop.description}`)
      .join('\n');
  }
  
  generateExampleParams(properties) {
    return Object.entries(properties)
      .map(([name, prop]) => {
        const value = this.getExampleValue(prop);
        return `${name}: ${JSON.stringify(value)}`;
      })
      .join(',\n  ');
  }
  
  getExampleValue(prop) {
    switch (prop.type) {
      case 'string':
        return prop.enum ? prop.enum[0] : 'example';
      case 'boolean':
        return true;
      case 'number':
        return 42;
      case 'array':
        return [];
      default:
        return null;
    }
  }
  
  async analyzeProjectStructure() {
    // Analyze project structure for architecture documentation
    const structure = {
      directories: [],
      mainComponents: [],
      dependencies: {},
      configuration: {}
    };
    
    // Read package.json
    try {
      const packageJson = JSON.parse(
        await fs.readFile('package.json', 'utf-8')
      );
      structure.dependencies = packageJson.dependencies || {};
    } catch (e) {
      // Handle error
    }
    
    return structure;
  }
  
  async collectFeatures() {
    // Collect user-facing features for user guide
    // This would analyze routes, UI components, etc.
    return [
      'User Authentication',
      'Dashboard',
      'Code Analysis',
      'Report Generation'
    ];
  }
  
  async generateDocumentationIndex() {
    const index = `# Documentation Index

## 📚 Available Documentation

- [API Documentation](./API.md) - Complete API reference
- [Architecture](./ARCHITECTURE.md) - System architecture and design
- [User Guide](./USER_GUIDE.md) - End-user documentation
- [Developer Guide](./DEVELOPER_GUIDE.md) - Development setup and guidelines

## 🚀 Quick Links

- [Getting Started](./DEVELOPER_GUIDE.md#getting-started)
- [API Reference](./API.md)
- [Troubleshooting](./USER_GUIDE.md#troubleshooting)

Generated on: ${new Date().toISOString()}
`;
    
    await fs.writeFile(
      path.join(this.outputDir, 'INDEX.md'),
      index
    );
  }
}

// Usage
const generator = new DocumentationGenerator();
generator.generateProjectDocumentation().catch(console.error);
```

## 🎯 Best Practices for MCP Workflows

### 1. Error Handling

```javascript
// Always implement proper error handling in MCP workflows

async function safeToolCall(client, toolName, params) {
  try {
    const result = await client.callTool(toolName, params);
    
    if (result.error) {
      console.error(`Tool error: ${result.error}`);
      // Implement fallback logic
      return handleToolError(toolName, result.error);
    }
    
    return result;
  } catch (error) {
    console.error(`MCP error: ${error.message}`);
    
    // Retry logic
    if (error.code === 'TIMEOUT') {
      return retryWithBackoff(() => client.callTool(toolName, params));
    }
    
    throw error;
  }
}
```

### 2. Resource Management

```python
# Proper resource management in MCP workflows

class MCPResourceManager:
    def __init__(self):
        self.connections = {}
        self.active_tools = set()
    
    async def __aenter__(self):
        """Context manager entry"""
        await self.initialize()
        return self
    
    async def __aexit__(self, exc_type, exc_val, exc_tb):
        """Context manager exit - cleanup resources"""
        await self.cleanup()
    
    async def initialize(self):
        """Initialize MCP connections"""
        self.client = MCPClient(config_path='./mcp-client-config.json')
        await self.client.connect('workshop')
    
    async def cleanup(self):
        """Clean up all resources"""
        # Cancel active operations
        for tool in self.active_tools:
            await self.client.cancelTool(tool)
        
        # Close connections
        await self.client.disconnect()
    
    async def call_tool_safely(self, tool_name, params):
        """Call tool with resource tracking"""
        tool_id = f"{tool_name}_{time.time()}"
        self.active_tools.add(tool_id)
        
        try:
            result = await self.client.callTool(tool_name, params)
            return result
        finally:
            self.active_tools.remove(tool_id)

# Usage with context manager
async def main():
    async with MCPResourceManager() as manager:
        result = await manager.call_tool_safely('code_review', {
            'code': 'function test() { return 42; }',
            'language': 'javascript'
        })
        print(result)
```

### 3. Performance Optimization

```typescript
// Optimize MCP workflows for performance

class MCPBatchProcessor {
  private client: MCPClient;
  private batchSize: number = 10;
  private concurrency: number = 5;
  
  constructor() {
    this.client = new MCPClient({
      configPath: './mcp-client-config.json',
      connectionPool: {
        maxConnections: 10,
        idleTimeout: 30000
      }
    });
  }
  
  async processBatch<T>(
    items: T[],
    processor: (item: T) => Promise<any>
  ): Promise<any[]> {
    const results = [];
    
    // Process in batches
    for (let i = 0; i < items.length; i += this.batchSize) {
      const batch = items.slice(i, i + this.batchSize);
      
      // Process batch with concurrency control
      const batchResults = await this.processWithConcurrency(
        batch,
        processor,
        this.concurrency
      );
      
      results.push(...batchResults);
      
      // Progress update
      console.log(`Processed ${results.length}/${items.length} items`);
    }
    
    return results;
  }
  
  private async processWithConcurrency<T>(
    items: T[],
    processor: (item: T) => Promise<any>,
    concurrency: number
  ): Promise<any[]> {
    const results = [];
    const executing = [];
    
    for (const item of items) {
      const promise = processor(item).then(result => {
        results.push(result);
      });
      
      executing.push(promise);
      
      if (executing.length >= concurrency) {
        await Promise.race(executing);
        executing.splice(
          executing.findIndex(p => p === promise),
          1
        );
      }
    }
    
    await Promise.all(executing);
    return results;
  }
}

// Usage
const processor = new MCPBatchProcessor();

const files = await glob('src/**/*.js');
const results = await processor.processBatch(files, async (file) => {
  const code = await fs.readFile(file, 'utf-8');
  return client.callTool('security_scan', { code });
});
```

## 🚀 Next Steps

1. **Experiment** with different MCP configurations
2. **Integrate** MCP into your CI/CD pipeline
3. **Create** custom MCP servers for your specific needs
4. **Monitor** MCP performance and optimize
5. **Share** successful workflows with your team 