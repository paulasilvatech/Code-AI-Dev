# AI-Powered Documentation Templates

Comprehensive templates for generating and maintaining high-quality documentation using AI assistance.

## 📚 API Documentation Generation

### 1. OpenAPI/Swagger Documentation Generator

```javascript
// AI-powered API documentation generator

class APIDocumentationGenerator {
  constructor() {
    this.openApiSpec = {
      openapi: '3.0.0',
      info: {},
      servers: [],
      paths: {},
      components: {
        schemas: {},
        securitySchemes: {}
      }
    };
  }

  /**
   * Generate complete OpenAPI documentation from code analysis
   * @param {string} sourceCode - The API source code to analyze
   * @param {object} config - Configuration options
   * @returns {object} Complete OpenAPI specification
   */
  async generateDocumentation(sourceCode, config = {}) {
    // Analyze code structure
    const apiStructure = await this.analyzeAPIStructure(sourceCode);
    
    // Generate base information
    this.generateInfo(config);
    
    // Generate server information
    this.generateServers(config.servers || ['http://localhost:3000']);
    
    // Generate path documentation
    for (const endpoint of apiStructure.endpoints) {
      this.generatePathDocumentation(endpoint);
    }
    
    // Generate schemas from data models
    for (const model of apiStructure.models) {
      this.generateSchemaDocumentation(model);
    }
    
    // Generate security schemes
    this.generateSecuritySchemes(apiStructure.authentication);
    
    // Add examples and enhance with AI
    await this.enhanceWithAI();
    
    return this.openApiSpec;
  }

  generateInfo(config) {
    this.openApiSpec.info = {
      title: config.title || 'API Documentation',
      version: config.version || '1.0.0',
      description: this.generateAPIDescription(config),
      termsOfService: config.termsOfService || 'https://example.com/terms',
      contact: {
        name: config.contactName || 'API Support',
        email: config.contactEmail || 'api@example.com',
        url: config.contactUrl || 'https://example.com/support'
      },
      license: {
        name: config.licenseName || 'MIT',
        url: config.licenseUrl || 'https://opensource.org/licenses/MIT'
      }
    };
  }

  generateAPIDescription(config) {
    return `
# ${config.title || 'API'} Documentation

${config.description || 'This API provides comprehensive functionality for managing resources.'}

## Features

- RESTful API design
- JSON request/response format
- OAuth 2.0 authentication
- Rate limiting: ${config.rateLimit || '100 requests per minute'}
- Versioning through URL path

## Getting Started

1. Obtain API credentials from the developer portal
2. Include the API key in the \`Authorization\` header
3. Make requests to the base URL: \`${config.baseUrl || 'https://api.example.com/v1'}\`

## Common Use Cases

${this.generateUseCases(config.useCases)}

## Error Handling

All errors follow RFC 7807 (Problem Details for HTTP APIs) format.
`;
  }

  generatePathDocumentation(endpoint) {
    const path = endpoint.path;
    const method = endpoint.method.toLowerCase();
    
    if (!this.openApiSpec.paths[path]) {
      this.openApiSpec.paths[path] = {};
    }
    
    this.openApiSpec.paths[path][method] = {
      tags: [endpoint.controller || 'default'],
      summary: this.generateSummary(endpoint),
      description: this.generateDescription(endpoint),
      operationId: endpoint.operationId || `${method}${this.pathToOperationId(path)}`,
      parameters: this.generateParameters(endpoint),
      requestBody: this.generateRequestBody(endpoint),
      responses: this.generateResponses(endpoint),
      security: this.generateSecurity(endpoint),
      'x-code-samples': this.generateCodeSamples(endpoint)
    };
  }

  generateSummary(endpoint) {
    // AI-generated summary based on endpoint analysis
    const actionVerbs = {
      'GET': 'Retrieve',
      'POST': 'Create',
      'PUT': 'Update',
      'DELETE': 'Delete',
      'PATCH': 'Partially update'
    };
    
    const verb = actionVerbs[endpoint.method] || endpoint.method;
    const resource = this.extractResourceName(endpoint.path);
    
    return `${verb} ${resource}`;
  }

  generateDescription(endpoint) {
    // Generate comprehensive description
    let description = `${this.generateSummary(endpoint)}.`;
    
    // Add authentication requirements
    if (endpoint.authentication) {
      description += `\n\n**Authentication:** ${endpoint.authentication.type} required.`;
    }
    
    // Add rate limiting info
    if (endpoint.rateLimit) {
      description += `\n\n**Rate Limit:** ${endpoint.rateLimit} requests per minute.`;
    }
    
    // Add business logic description
    if (endpoint.businessLogic) {
      description += `\n\n**Business Logic:**\n${endpoint.businessLogic}`;
    }
    
    // Add examples
    description += `\n\n**Example Use Case:**\n${this.generateExampleUseCase(endpoint)}`;
    
    return description;
  }

  generateParameters(endpoint) {
    const parameters = [];
    
    // Path parameters
    const pathParams = endpoint.path.match(/{([^}]+)}/g);
    if (pathParams) {
      pathParams.forEach(param => {
        const paramName = param.replace(/[{}]/g, '');
        parameters.push({
          name: paramName,
          in: 'path',
          required: true,
          description: this.generateParameterDescription(paramName, 'path'),
          schema: this.inferParameterSchema(paramName),
          examples: this.generateParameterExamples(paramName)
        });
      });
    }
    
    // Query parameters
    if (endpoint.queryParams) {
      endpoint.queryParams.forEach(param => {
        parameters.push({
          name: param.name,
          in: 'query',
          required: param.required || false,
          description: param.description || this.generateParameterDescription(param.name, 'query'),
          schema: param.schema || this.inferParameterSchema(param.name),
          examples: this.generateParameterExamples(param.name)
        });
      });
    }
    
    // Header parameters
    if (endpoint.headers) {
      endpoint.headers.forEach(header => {
        if (header.name !== 'Authorization') {
          parameters.push({
            name: header.name,
            in: 'header',
            required: header.required || false,
            description: header.description,
            schema: { type: 'string' }
          });
        }
      });
    }
    
    return parameters;
  }

  generateRequestBody(endpoint) {
    if (!endpoint.requestBody) return undefined;
    
    return {
      description: endpoint.requestBody.description || 'Request payload',
      required: endpoint.requestBody.required !== false,
      content: {
        'application/json': {
          schema: this.generateSchema(endpoint.requestBody.schema),
          examples: this.generateRequestExamples(endpoint)
        }
      }
    };
  }

  generateResponses(endpoint) {
    const responses = {};
    
    // Success response
    responses['200'] = {
      description: 'Successful operation',
      content: {
        'application/json': {
          schema: this.generateSchema(endpoint.responseSchema),
          examples: this.generateResponseExamples(endpoint, 'success')
        }
      }
    };
    
    // Common error responses
    if (endpoint.authentication) {
      responses['401'] = {
        description: 'Authentication required',
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/Error' },
            example: {
              type: 'https://example.com/errors/unauthorized',
              title: 'Unauthorized',
              status: 401,
              detail: 'Authentication credentials are missing or invalid'
            }
          }
        }
      };
    }
    
    responses['400'] = {
      description: 'Bad request',
      content: {
        'application/json': {
          schema: { $ref: '#/components/schemas/ValidationError' },
          examples: this.generateErrorExamples('validation')
        }
      }
    };
    
    responses['404'] = {
      description: 'Resource not found',
      content: {
        'application/json': {
          schema: { $ref: '#/components/schemas/Error' },
          example: {
            type: 'https://example.com/errors/not-found',
            title: 'Not Found',
            status: 404,
            detail: 'The requested resource does not exist'
          }
        }
      }
    };
    
    responses['500'] = {
      description: 'Internal server error',
      content: {
        'application/json': {
          schema: { $ref: '#/components/schemas/Error' },
          example: {
            type: 'https://example.com/errors/internal-error',
            title: 'Internal Server Error',
            status: 500,
            detail: 'An unexpected error occurred'
          }
        }
      }
    };
    
    return responses;
  }

  generateCodeSamples(endpoint) {
    const samples = [];
    
    // cURL example
    samples.push({
      lang: 'curl',
      label: 'cURL',
      source: this.generateCurlExample(endpoint)
    });
    
    // JavaScript example
    samples.push({
      lang: 'javascript',
      label: 'JavaScript',
      source: this.generateJavaScriptExample(endpoint)
    });
    
    // Python example
    samples.push({
      lang: 'python',
      label: 'Python',
      source: this.generatePythonExample(endpoint)
    });
    
    return samples;
  }

  generateCurlExample(endpoint) {
    let curl = `curl -X ${endpoint.method} '${endpoint.baseUrl || 'https://api.example.com/v1'}${endpoint.path}'`;
    
    // Add headers
    if (endpoint.authentication) {
      curl += ` \\\n  -H 'Authorization: Bearer YOUR_TOKEN'`;
    }
    curl += ` \\\n  -H 'Content-Type: application/json'`;
    
    // Add request body
    if (endpoint.requestBody) {
      const exampleBody = this.generateExampleRequestBody(endpoint);
      curl += ` \\\n  -d '${JSON.stringify(exampleBody, null, 2)}'`;
    }
    
    return curl;
  }

  generateJavaScriptExample(endpoint) {
    const exampleBody = endpoint.requestBody ? this.generateExampleRequestBody(endpoint) : null;
    
    return `
const response = await fetch('${endpoint.baseUrl || 'https://api.example.com/v1'}${endpoint.path}', {
  method: '${endpoint.method}',
  headers: {
    'Authorization': 'Bearer YOUR_TOKEN',
    'Content-Type': 'application/json'
  }${exampleBody ? `,
  body: JSON.stringify(${JSON.stringify(exampleBody, null, 2).split('\n').join('\n  ')})` : ''}
});

const data = await response.json();
console.log(data);`;
  }

  generatePythonExample(endpoint) {
    const exampleBody = endpoint.requestBody ? this.generateExampleRequestBody(endpoint) : null;
    
    return `
import requests

response = requests.${endpoint.method.toLowerCase()}(
    '${endpoint.baseUrl || 'https://api.example.com/v1'}${endpoint.path}',
    headers={
        'Authorization': 'Bearer YOUR_TOKEN',
        'Content-Type': 'application/json'
    }${exampleBody ? `,
    json=${JSON.stringify(exampleBody, null, 2).split('\n').join('\n    ')}` : ''}
)

data = response.json()
print(data)`;
  }

  async enhanceWithAI() {
    // Use AI to enhance documentation
    // - Generate better descriptions
    // - Create realistic examples
    // - Add common pitfalls and best practices
    // - Generate troubleshooting guides
    
    // Add common schemas if not present
    if (!this.openApiSpec.components.schemas.Error) {
      this.openApiSpec.components.schemas.Error = {
        type: 'object',
        properties: {
          type: { type: 'string', format: 'uri' },
          title: { type: 'string' },
          status: { type: 'integer' },
          detail: { type: 'string' },
          instance: { type: 'string', format: 'uri' }
        },
        required: ['type', 'title', 'status']
      };
    }
  }
}

// Usage
const generator = new APIDocumentationGenerator();
const documentation = await generator.generateDocumentation(sourceCode, {
  title: 'My Awesome API',
  version: '2.0.0',
  description: 'A comprehensive API for managing resources',
  baseUrl: 'https://api.myapp.com/v2'
});

// Export as YAML or JSON
fs.writeFileSync('openapi.yaml', yaml.dump(documentation));
```

### 2. Code Documentation Generator

```python
# AI-powered code documentation generator

import ast
import inspect
import re
from typing import Dict, List, Any, Optional
from dataclasses import dataclass
import json

@dataclass
class DocumentationBlock:
    """Represents a documentation block for code elements"""
    element_type: str  # function, class, method, module
    name: str
    description: str
    parameters: List[Dict[str, Any]]
    returns: Optional[Dict[str, Any]]
    raises: List[Dict[str, Any]]
    examples: List[str]
    notes: List[str]
    references: List[str]
    complexity: Optional[str]
    since: Optional[str]
    deprecated: Optional[bool]

class CodeDocumentationGenerator:
    """AI-enhanced code documentation generator"""
    
    def __init__(self):
        self.documentation = {}
        self.style_guide = self.load_style_guide()
        
    def generate_documentation(self, source_file: str, style: str = 'google') -> str:
        """Generate comprehensive documentation for a source file"""
        
        # Read and parse source code
        with open(source_file, 'r') as f:
            source_code = f.read()
            
        # Parse AST
        tree = ast.parse(source_code)
        
        # Extract module documentation
        module_doc = self.extract_module_documentation(tree, source_file)
        
        # Process all elements
        for node in ast.walk(tree):
            if isinstance(node, ast.ClassDef):
                self.document_class(node, style)
            elif isinstance(node, ast.FunctionDef):
                self.document_function(node, style)
                
        # Generate final documentation
        return self.format_documentation(style)
    
    def document_function(self, node: ast.FunctionDef, style: str) -> DocumentationBlock:
        """Generate documentation for a function"""
        
        # Extract existing docstring
        existing_doc = ast.get_docstring(node)
        
        # Analyze function
        analysis = self.analyze_function(node)
        
        # Generate documentation components
        description = self.generate_description(node, analysis, existing_doc)
        parameters = self.generate_parameter_docs(node, analysis)
        returns = self.generate_return_docs(node, analysis)
        raises = self.generate_exception_docs(node, analysis)
        examples = self.generate_examples(node, analysis)
        
        # Create documentation block
        doc_block = DocumentationBlock(
            element_type='function',
            name=node.name,
            description=description,
            parameters=parameters,
            returns=returns,
            raises=raises,
            examples=examples,
            notes=self.generate_notes(analysis),
            references=self.generate_references(node),
            complexity=self.calculate_complexity(node),
            since=self.extract_version_info(existing_doc),
            deprecated=self.check_deprecated(node)
        )
        
        # Format according to style
        return self.format_docstring(doc_block, style)
    
    def analyze_function(self, node: ast.FunctionDef) -> Dict[str, Any]:
        """Analyze function for documentation generation"""
        
        analysis = {
            'complexity': self.calculate_cyclomatic_complexity(node),
            'has_side_effects': self.detect_side_effects(node),
            'is_pure': self.check_if_pure_function(node),
            'calls_external': self.find_external_calls(node),
            'modifies_state': self.check_state_modification(node),
            'algorithm_type': self.identify_algorithm(node),
            'performance': self.analyze_performance(node)
        }
        
        return analysis
    
    def generate_description(self, node: ast.FunctionDef, analysis: Dict, existing_doc: str) -> str:
        """Generate comprehensive function description"""
        
        if existing_doc and len(existing_doc) > 50:
            # Enhance existing documentation
            description = existing_doc
        else:
            # Generate new description
            description = f"{self.get_action_verb(node.name)} "
            
            # Infer purpose from name and code
            purpose = self.infer_function_purpose(node)
            description += purpose
            
        # Add technical details
        if analysis['complexity'] > 10:
            description += f"\n\nThis function has high complexity (cyclomatic complexity: {analysis['complexity']}). "
            description += "Consider refactoring for better maintainability."
            
        if analysis['algorithm_type']:
            description += f"\n\nImplements {analysis['algorithm_type']} algorithm."
            
        if analysis['performance']:
            description += f"\n\nPerformance: {analysis['performance']}"
            
        return description
    
    def generate_parameter_docs(self, node: ast.FunctionDef, analysis: Dict) -> List[Dict]:
        """Generate parameter documentation"""
        
        parameters = []
        
        # Get function signature
        sig = inspect.signature(self.node_to_function(node))
        
        for param_name, param in sig.parameters.items():
            if param_name == 'self':
                continue
                
            param_doc = {
                'name': param_name,
                'type': self.infer_parameter_type(node, param_name),
                'description': self.generate_parameter_description(param_name, node),
                'required': param.default == inspect.Parameter.empty,
                'default': str(param.default) if param.default != inspect.Parameter.empty else None,
                'constraints': self.infer_parameter_constraints(node, param_name),
                'examples': self.generate_parameter_examples(param_name)
            }
            
            parameters.append(param_doc)
            
        return parameters
    
    def generate_return_docs(self, node: ast.FunctionDef, analysis: Dict) -> Optional[Dict]:
        """Generate return value documentation"""
        
        # Check if function returns anything
        returns_value = False
        return_types = set()
        
        for n in ast.walk(node):
            if isinstance(n, ast.Return) and n.value:
                returns_value = True
                return_type = self.infer_return_type(n.value)
                return_types.add(return_type)
                
        if not returns_value:
            return None
            
        return {
            'type': ' | '.join(return_types) if len(return_types) > 1 else list(return_types)[0],
            'description': self.generate_return_description(node, return_types),
            'examples': self.generate_return_examples(node)
        }
    
    def generate_exception_docs(self, node: ast.FunctionDef, analysis: Dict) -> List[Dict]:
        """Generate exception documentation"""
        
        exceptions = []
        
        for n in ast.walk(node):
            if isinstance(n, ast.Raise):
                exception = {
                    'type': self.get_exception_type(n),
                    'description': self.generate_exception_description(n),
                    'conditions': self.analyze_exception_conditions(n, node)
                }
                exceptions.append(exception)
                
        # Add inferred exceptions
        inferred = self.infer_possible_exceptions(node)
        exceptions.extend(inferred)
        
        return exceptions
    
    def generate_examples(self, node: ast.FunctionDef, analysis: Dict) -> List[str]:
        """Generate usage examples"""
        
        examples = []
        
        # Basic example
        basic_example = self.generate_basic_example(node)
        examples.append(basic_example)
        
        # Edge case examples
        if analysis['complexity'] > 5:
            edge_examples = self.generate_edge_case_examples(node)
            examples.extend(edge_examples)
            
        # Error handling example
        if self.has_error_handling(node):
            error_example = self.generate_error_example(node)
            examples.append(error_example)
            
        return examples
    
    def generate_basic_example(self, node: ast.FunctionDef) -> str:
        """Generate basic usage example"""
        
        # Get function signature
        params = [arg.arg for arg in node.args.args if arg.arg != 'self']
        
        # Generate example values
        example_values = []
        for param in params:
            value = self.generate_example_value(param, node)
            example_values.append(value)
            
        # Format example
        if node.returns:
            example = f">>> result = {node.name}({', '.join(map(str, example_values))})\n"
            example += f">>> print(result)\n"
            example += f"{self.generate_example_output(node)}"
        else:
            example = f">>> {node.name}({', '.join(map(str, example_values))})"
            
        return example
    
    def format_docstring(self, doc_block: DocumentationBlock, style: str) -> str:
        """Format documentation block according to style guide"""
        
        if style == 'google':
            return self.format_google_style(doc_block)
        elif style == 'numpy':
            return self.format_numpy_style(doc_block)
        elif style == 'sphinx':
            return self.format_sphinx_style(doc_block)
        else:
            return self.format_google_style(doc_block)
    
    def format_google_style(self, doc: DocumentationBlock) -> str:
        """Format documentation in Google style"""
        
        docstring = f'"""{doc.description}\n\n'
        
        # Parameters
        if doc.parameters:
            docstring += "Args:\n"
            for param in doc.parameters:
                docstring += f"    {param['name']}"
                if param['type']:
                    docstring += f" ({param['type']})"
                docstring += f": {param['description']}"
                if param['default']:
                    docstring += f" Defaults to {param['default']}."
                docstring += "\n"
            docstring += "\n"
        
        # Returns
        if doc.returns:
            docstring += "Returns:\n"
            docstring += f"    {doc.returns['type']}: {doc.returns['description']}\n\n"
        
        # Raises
        if doc.raises:
            docstring += "Raises:\n"
            for exc in doc.raises:
                docstring += f"    {exc['type']}: {exc['description']}\n"
            docstring += "\n"
        
        # Examples
        if doc.examples:
            docstring += "Examples:\n"
            for example in doc.examples:
                docstring += f"    {example}\n"
            docstring += "\n"
        
        # Notes
        if doc.notes:
            docstring += "Note:\n"
            for note in doc.notes:
                docstring += f"    {note}\n"
            docstring += "\n"
        
        docstring += '"""'
        
        return docstring
    
    def generate_markdown_documentation(self, module_name: str) -> str:
        """Generate Markdown documentation for entire module"""
        
        md = f"# {module_name} Documentation\n\n"
        
        # Table of contents
        md += "## Table of Contents\n\n"
        for item in self.documentation:
            md += f"- [{item['name']}](#{item['name'].lower().replace(' ', '-')})\n"
        md += "\n"
        
        # Module overview
        md += "## Overview\n\n"
        md += self.generate_module_overview()
        md += "\n\n"
        
        # API Reference
        md += "## API Reference\n\n"
        
        # Classes
        classes = [doc for doc in self.documentation.values() if doc.element_type == 'class']
        if classes:
            md += "### Classes\n\n"
            for cls in classes:
                md += self.format_class_markdown(cls)
                md += "\n---\n\n"
        
        # Functions
        functions = [doc for doc in self.documentation.values() if doc.element_type == 'function']
        if functions:
            md += "### Functions\n\n"
            for func in functions:
                md += self.format_function_markdown(func)
                md += "\n---\n\n"
        
        # Examples
        md += "## Examples\n\n"
        md += self.generate_comprehensive_examples()
        
        # Best Practices
        md += "## Best Practices\n\n"
        md += self.generate_best_practices()
        
        return md
    
    def format_function_markdown(self, func: DocumentationBlock) -> str:
        """Format function documentation as Markdown"""
        
        md = f"#### `{func.name}()`\n\n"
        md += f"{func.description}\n\n"
        
        # Signature
        md += "**Signature:**\n```python\n"
        md += self.generate_function_signature(func)
        md += "\n```\n\n"
        
        # Parameters
        if func.parameters:
            md += "**Parameters:**\n\n"
            for param in func.parameters:
                md += f"- `{param['name']}` "
                if param['type']:
                    md += f"*({param['type']})*"
                md += f" - {param['description']}"
                if param['default']:
                    md += f" Default: `{param['default']}`"
                md += "\n"
            md += "\n"
        
        # Returns
        if func.returns:
            md += "**Returns:**\n\n"
            md += f"- *{func.returns['type']}* - {func.returns['description']}\n\n"
        
        # Raises
        if func.raises:
            md += "**Raises:**\n\n"
            for exc in func.raises:
                md += f"- `{exc['type']}` - {exc['description']}\n"
            md += "\n"
        
        # Examples
        if func.examples:
            md += "**Examples:**\n\n```python\n"
            md += "\n\n".join(func.examples)
            md += "\n```\n\n"
        
        # Complexity
        if func.complexity:
            md += f"**Complexity:** {func.complexity}\n\n"
        
        return md

# Usage
generator = CodeDocumentationGenerator()
documentation = generator.generate_documentation('my_module.py', style='google')
print(documentation)
```

### 3. README Generator

```typescript
// AI-powered README generator

interface ProjectInfo {
  name: string;
  description: string;
  version: string;
  author: string;
  license: string;
  repository: string;
  keywords: string[];
}

class ReadmeGenerator {
  private projectInfo: ProjectInfo;
  private sections: Map<string, string> = new Map();
  
  constructor(projectInfo: ProjectInfo) {
    this.projectInfo = projectInfo;
  }
  
  async generateReadme(projectPath: string): Promise<string> {
    // Analyze project structure
    const analysis = await this.analyzeProject(projectPath);
    
    // Generate sections
    this.generateHeader();
    this.generateBadges();
    this.generateDescription();
    this.generateTableOfContents();
    this.generateFeatures(analysis);
    this.generateInstallation(analysis);
    this.generateUsage(analysis);
    this.generateAPI(analysis);
    this.generateExamples(analysis);
    this.generateConfiguration(analysis);
    this.generateDevelopment(analysis);
    this.generateTesting(analysis);
    this.generateDeployment(analysis);
    this.generateContributing();
    this.generateLicense();
    this.generateAcknowledgments();
    
    // Compile README
    return this.compileReadme();
  }
  
  private generateHeader(): void {
    const header = `<div align="center">
  
# ${this.projectInfo.name}

${this.projectInfo.description}

</div>`;
    
    this.sections.set('header', header);
  }
  
  private generateBadges(): void {
    const badges = [];
    
    // Version badge
    badges.push(`![Version](https://img.shields.io/badge/version-${this.projectInfo.version}-blue.svg)`);
    
    // License badge
    badges.push(`![License](https://img.shields.io/badge/license-${this.projectInfo.license}-green.svg)`);
    
    // Build status
    badges.push('![Build Status](https://img.shields.io/github/workflow/status/username/repo/CI)');
    
    // Coverage
    badges.push('![Coverage](https://img.shields.io/codecov/c/github/username/repo)');
    
    // Downloads
    badges.push('![Downloads](https://img.shields.io/npm/dm/package-name)');
    
    const badgeSection = `<div align="center">

${badges.join(' ')}

</div>`;
    
    this.sections.set('badges', badgeSection);
  }
  
  private generateTableOfContents(): void {
    const toc = `## 📋 Table of Contents

- [Features](#-features)
- [Installation](#-installation)
- [Usage](#-usage)
- [API Documentation](#-api-documentation)
- [Examples](#-examples)
- [Configuration](#-configuration)
- [Development](#-development)
- [Testing](#-testing)
- [Deployment](#-deployment)
- [Contributing](#-contributing)
- [License](#-license)`;
    
    this.sections.set('toc', toc);
  }
  
  private generateFeatures(analysis: any): void {
    const features = `## ✨ Features

- 🚀 **High Performance** - Optimized for speed and efficiency
- 🔒 **Secure** - Built with security best practices
- 📱 **Responsive** - Works on all devices
- 🌐 **Internationalization** - Support for multiple languages
- 📊 **Analytics** - Built-in analytics and monitoring
- 🔌 **Extensible** - Plugin architecture for easy extensions
- 📝 **Well Documented** - Comprehensive documentation and examples
- ✅ **Test Coverage** - Extensive test suite with ${analysis.testCoverage}% coverage`;
    
    this.sections.set('features', features);
  }
  
  private generateInstallation(analysis: any): void {
    let installation = `## 📦 Installation

### Prerequisites

- Node.js >= ${analysis.nodeVersion || '14.0.0'}
- npm >= ${analysis.npmVersion || '6.0.0'}`;
    
    if (analysis.dependencies.database) {
      installation += `\n- ${analysis.dependencies.database} >= ${analysis.dependencies.databaseVersion}`;
    }
    
    installation += `\n\n### Quick Start

\`\`\`bash
# Clone the repository
git clone ${this.projectInfo.repository}

# Navigate to project directory
cd ${this.projectInfo.name}

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env

# Run the application
npm start
\`\`\`

### Using npm

\`\`\`bash
npm install ${this.projectInfo.name}
\`\`\`

### Using yarn

\`\`\`bash
yarn add ${this.projectInfo.name}
\`\`\``;
    
    if (analysis.dockerSupport) {
      installation += `\n\n### Using Docker

\`\`\`bash
# Build the image
docker build -t ${this.projectInfo.name} .

# Run the container
docker run -p 3000:3000 ${this.projectInfo.name}
\`\`\``;
    }
    
    this.sections.set('installation', installation);
  }
  
  private generateUsage(analysis: any): void {
    const usage = `## 🚀 Usage

### Basic Usage

\`\`\`javascript
const ${this.toCamelCase(this.projectInfo.name)} = require('${this.projectInfo.name}');

// Initialize
const app = new ${this.toPascalCase(this.projectInfo.name)}({
  // Configuration options
});

// Use the main functionality
app.start();
\`\`\`

### Advanced Usage

\`\`\`javascript
const { Feature1, Feature2 } = require('${this.projectInfo.name}');

// Configure advanced features
const config = {
  feature1: {
    enabled: true,
    options: {
      // Feature-specific options
    }
  }
};

// Initialize with advanced configuration
const app = new ${this.toPascalCase(this.projectInfo.name)}(config);

// Use specific features
const feature1 = new Feature1(app);
feature1.execute();
\`\`\`

### CLI Usage

\`\`\`bash
# Global installation
npm install -g ${this.projectInfo.name}

# Run CLI
${this.projectInfo.name} --help

# Common commands
${this.projectInfo.name} init        # Initialize new project
${this.projectInfo.name} build       # Build the project
${this.projectInfo.name} serve       # Start development server
${this.projectInfo.name} test        # Run tests
${this.projectInfo.name} deploy      # Deploy to production
\`\`\``;
    
    this.sections.set('usage', usage);
  }
  
  private generateAPI(analysis: any): void {
    const api = `## 📚 API Documentation

### Core API

#### \`new ${this.toPascalCase(this.projectInfo.name)}(options)\`

Creates a new instance.

**Parameters:**
- \`options\` (Object) - Configuration options
  - \`option1\` (String) - Description of option1
  - \`option2\` (Number) - Description of option2
  - \`option3\` (Boolean) - Description of option3

**Returns:**
- Instance of ${this.toPascalCase(this.projectInfo.name)}

**Example:**
\`\`\`javascript
const instance = new ${this.toPascalCase(this.projectInfo.name)}({
  option1: 'value1',
  option2: 42,
  option3: true
});
\`\`\`

### Methods

#### \`.start()\`

Starts the application.

**Returns:**
- Promise<void>

#### \`.stop()\`

Stops the application gracefully.

**Returns:**
- Promise<void>

#### \`.configure(options)\`

Updates configuration at runtime.

**Parameters:**
- \`options\` (Object) - New configuration options

**Returns:**
- void

### Events

The instance emits the following events:

- \`ready\` - Emitted when the application is ready
- \`error\` - Emitted on errors
- \`close\` - Emitted when the application is closing

**Example:**
\`\`\`javascript
instance.on('ready', () => {
  console.log('Application is ready');
});

instance.on('error', (error) => {
  console.error('Error occurred:', error);
});
\`\`\`

Full API documentation is available at [https://docs.example.com](https://docs.example.com)`;
    
    this.sections.set('api', api);
  }
  
  private generateExamples(analysis: any): void {
    const examples = `## 💡 Examples

### Example 1: Basic Setup

\`\`\`javascript
const ${this.toCamelCase(this.projectInfo.name)} = require('${this.projectInfo.name}');

async function main() {
  const app = new ${this.toPascalCase(this.projectInfo.name)}({
    port: 3000,
    environment: 'development'
  });
  
  await app.start();
  console.log('Application started on port 3000');
}

main().catch(console.error);
\`\`\`

### Example 2: With Database

\`\`\`javascript
const ${this.toCamelCase(this.projectInfo.name)} = require('${this.projectInfo.name}');
const { Database } = require('${this.projectInfo.name}/database');

async function main() {
  // Initialize database
  const db = new Database({
    host: 'localhost',
    port: 5432,
    database: 'myapp'
  });
  
  await db.connect();
  
  // Initialize app with database
  const app = new ${this.toPascalCase(this.projectInfo.name)}({
    database: db
  });
  
  await app.start();
}

main().catch(console.error);
\`\`\`

### Example 3: Custom Middleware

\`\`\`javascript
const ${this.toCamelCase(this.projectInfo.name)} = require('${this.projectInfo.name}');

const app = new ${this.toPascalCase(this.projectInfo.name)}();

// Add custom middleware
app.use(async (ctx, next) => {
  console.log(\`Request: \${ctx.method} \${ctx.path}\`);
  await next();
});

// Add routes
app.route('/api/users', {
  get: async (ctx) => {
    ctx.body = { users: [] };
  },
  post: async (ctx) => {
    // Create user logic
    ctx.body = { created: true };
  }
});

app.start();
\`\`\`

More examples can be found in the [examples](./examples) directory.`;
    
    this.sections.set('examples', examples);
  }
  
  private generateContributing(): void {
    const contributing = `## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Development Process

1. Fork the repository
2. Create your feature branch (\`git checkout -b feature/AmazingFeature\`)
3. Commit your changes (\`git commit -m 'Add some AmazingFeature'\`)
4. Push to the branch (\`git push origin feature/AmazingFeature\`)
5. Open a Pull Request

### Code Style

- We use [ESLint](https://eslint.org/) for JavaScript linting
- We use [Prettier](https://prettier.io/) for code formatting
- Run \`npm run lint\` before committing
- Run \`npm run format\` to auto-format code

### Commit Guidelines

We follow [Conventional Commits](https://www.conventionalcommits.org/):

- \`feat:\` New features
- \`fix:\` Bug fixes
- \`docs:\` Documentation changes
- \`style:\` Code style changes
- \`refactor:\` Code refactoring
- \`test:\` Test changes
- \`chore:\` Build process or auxiliary tool changes`;
    
    this.sections.set('contributing', contributing);
  }
  
  private compileReadme(): string {
    const sections = [
      'header',
      'badges',
      'toc',
      'features',
      'installation',
      'usage',
      'api',
      'examples',
      'configuration',
      'development',
      'testing',
      'deployment',
      'contributing',
      'license',
      'acknowledgments'
    ];
    
    return sections
      .map(section => this.sections.get(section))
      .filter(content => content)
      .join('\n\n---\n\n');
  }
  
  private toCamelCase(str: string): string {
    return str.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
  }
  
  private toPascalCase(str: string): string {
    const camel = this.toCamelCase(str);
    return camel.charAt(0).toUpperCase() + camel.slice(1);
  }
}

// Usage
const generator = new ReadmeGenerator({
  name: 'awesome-project',
  description: 'A revolutionary solution for modern development',
  version: '1.0.0',
  author: 'John Doe',
  license: 'MIT',
  repository: 'https://github.com/username/awesome-project',
  keywords: ['nodejs', 'typescript', 'api']
});

const readme = await generator.generateReadme('./');
fs.writeFileSync('README.md', readme);
```

## 📖 Architecture Documentation

### 4. Architecture Decision Records (ADR) Generator

```python
# AI-powered ADR generator

from datetime import datetime
from typing import List, Dict, Optional
import yaml
import os

class ADRGenerator:
    """Generate Architecture Decision Records with AI assistance"""
    
    def __init__(self, project_path: str):
        self.project_path = project_path
        self.adr_path = os.path.join(project_path, 'docs', 'adr')
        self.counter = self._get_next_adr_number()
        
    def generate_adr(
        self,
        title: str,
        context: str,
        decision_needed: str,
        options: List[Dict[str, str]],
        chosen_option: int,
        consequences: Optional[List[str]] = None
    ) -> str:
        """Generate a complete ADR document"""
        
        # Generate ADR number and filename
        adr_number = f"{self.counter:04d}"
        filename = f"{adr_number}-{self._slugify(title)}.md"
        
        # Generate ADR content
        content = f"""# {adr_number}. {title}

Date: {datetime.now().strftime('%Y-%m-%d')}

## Status

Proposed

## Context

{self._expand_context(context, decision_needed)}

## Decision Drivers

{self._generate_decision_drivers(context, options)}

## Considered Options

{self._format_options(options)}

## Decision Outcome

Chosen option: "{options[chosen_option]['title']}", because {self._generate_rationale(options[chosen_option], options)}.

### Positive Consequences

{self._generate_positive_consequences(options[chosen_option], consequences)}

### Negative Consequences

{self._generate_negative_consequences(options[chosen_option], consequences)}

## Pros and Cons of the Options

{self._generate_pros_cons(options)}

## Links

{self._generate_related_links(title, context)}
"""
        
        # Save ADR
        self._save_adr(filename, content)
        
        # Update index
        self._update_adr_index(adr_number, title, filename)
        
        return content
    
    def _expand_context(self, context: str, decision_needed: str) -> str:
        """Expand context with additional details"""
        
        expanded = context + "\n\n"
        
        # Add problem statement
        expanded += f"### Problem Statement\n\n{decision_needed}\n\n"
        
        # Add technical constraints
        expanded += "### Technical Constraints\n\n"
        expanded += self._infer_constraints(context)
        
        # Add business constraints
        expanded += "\n\n### Business Constraints\n\n"
        expanded += self._infer_business_constraints(context)
        
        return expanded
    
    def _generate_decision_drivers(self, context: str, options: List[Dict]) -> str:
        """Generate decision drivers based on context"""
        
        drivers = []
        
        # Analyze context for key factors
        if 'performance' in context.lower():
            drivers.append("* Performance requirements")
        if 'scale' in context.lower() or 'scaling' in context.lower():
            drivers.append("* Scalability needs")
        if 'cost' in context.lower():
            drivers.append("* Cost optimization")
        if 'security' in context.lower():
            drivers.append("* Security requirements")
        if 'maintain' in context.lower() or 'maintenance' in context.lower():
            drivers.append("* Maintainability")
        if 'team' in context.lower():
            drivers.append("* Team expertise")
        if 'deadline' in context.lower() or 'time' in context.lower():
            drivers.append("* Time constraints")
            
        # Add generic drivers
        drivers.extend([
            "* Alignment with existing architecture",
            "* Future flexibility",
            "* Operational complexity"
        ])
        
        return '\n'.join(drivers)
    
    def _format_options(self, options: List[Dict]) -> str:
        """Format options list"""
        
        formatted = ""
        for i, option in enumerate(options):
            formatted += f"* Option {i + 1}: {option['title']}"
            if 'brief' in option:
                formatted += f" - {option['brief']}"
            formatted += "\n"
            
        return formatted
    
    def _generate_pros_cons(self, options: List[Dict]) -> str:
        """Generate detailed pros and cons for each option"""
        
        sections = []
        
        for i, option in enumerate(options):
            section = f"### Option {i + 1}: {option['title']}\n\n"
            
            if 'description' in option:
                section += f"{option['description']}\n\n"
            
            # Pros
            section += "#### Pros\n\n"
            if 'pros' in option:
                for pro in option['pros']:
                    section += f"* {pro}\n"
            else:
                # Generate pros based on option analysis
                section += self._generate_pros(option)
            
            section += "\n"
            
            # Cons
            section += "#### Cons\n\n"
            if 'cons' in option:
                for con in option['cons']:
                    section += f"* {con}\n"
            else:
                # Generate cons based on option analysis
                section += self._generate_cons(option)
            
            sections.append(section)
        
        return '\n\n'.join(sections)
    
    def _generate_rationale(self, chosen_option: Dict, all_options: List[Dict]) -> str:
        """Generate rationale for chosen option"""
        
        rationale_parts = []
        
        # Compare with other options
        if 'pros' in chosen_option:
            key_advantages = chosen_option['pros'][:2]
            rationale_parts.append(
                f"it provides {', '.join(key_advantages).lower()}"
            )
        
        # Add comparative advantage
        rationale_parts.append(
            "it best balances our technical and business requirements"
        )
        
        return ' and '.join(rationale_parts)
    
    def generate_adr_template(self, decision_type: str) -> Dict[str, any]:
        """Generate ADR template based on decision type"""
        
        templates = {
            'database': {
                'options': [
                    {
                        'title': 'PostgreSQL',
                        'pros': [
                            'ACID compliance',
                            'Rich feature set',
                            'Strong community support',
                            'Excellent performance for complex queries'
                        ],
                        'cons': [
                            'Vertical scaling limitations',
                            'Higher operational overhead'
                        ]
                    },
                    {
                        'title': 'MongoDB',
                        'pros': [
                            'Flexible schema',
                            'Horizontal scaling',
                            'Good for unstructured data'
                        ],
                        'cons': [
                            'Eventual consistency',
                            'Less mature ecosystem'
                        ]
                    }
                ],
                'decision_drivers': [
                    'Data consistency requirements',
                    'Query complexity',
                    'Scaling patterns'
                ]
            },
            'api_style': {
                'options': [
                    {
                        'title': 'REST',
                        'pros': [
                            'Simple and well-understood',
                            'Good tooling support',
                            'Cache-friendly'
                        ],
                        'cons': [
                            'Over/under-fetching',
                            'Multiple round trips'
                        ]
                    },
                    {
                        'title': 'GraphQL',
                        'pros': [
                            'Precise data fetching',
                            'Strong typing',
                            'Single endpoint'
                        ],
                        'cons': [
                            'Complexity',
                            'Caching challenges'
                        ]
                    }
                ]
            }
        }
        
        return templates.get(decision_type, {})

# Usage
adr_generator = ADRGenerator('./')

# Generate ADR for database choice
adr_generator.generate_adr(
    title="Database Selection for User Service",
    context="We need to choose a database for our new user service that will handle user profiles, authentication, and authorization.",
    decision_needed="Which database technology should we use for the user service?",
    options=[
        {
            'title': 'PostgreSQL',
            'description': 'Traditional relational database',
            'pros': ['ACID compliance', 'SQL support', 'Mature ecosystem'],
            'cons': ['Scaling limitations', 'Schema rigidity']
        },
        {
            'title': 'DynamoDB',
            'description': 'AWS managed NoSQL database',
            'pros': ['Automatic scaling', 'Managed service', 'High performance'],
            'cons': ['Vendor lock-in', 'Limited query flexibility']
        }
    ],
    chosen_option=0
)
```

## 🎯 Best Practices

1. **Keep Documentation Close to Code**
   - Use inline documentation for implementation details
   - Keep high-level docs in separate files
   - Automate synchronization

2. **Write for Your Audience**
   - API docs for developers
   - Architecture docs for architects
   - User guides for end users

3. **Use Examples Liberally**
   - Show, don't just tell
   - Include working code samples
   - Cover common use cases

4. **Maintain Documentation**
   - Update docs with code changes
   - Review regularly
   - Use automation to detect outdated docs

5. **Make Documentation Discoverable**
   - Clear structure and navigation
   - Search functionality
   - Cross-references and links 