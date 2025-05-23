// MCP Server Implementation for AI Workshop
// This server provides AI-powered development tools via Model Context Protocol

const { Server } = require('@modelcontextprotocol/sdk/server');
const { StdioServerTransport } = require('@modelcontextprotocol/sdk/server/stdio');
const { OpenAI } = require('openai');
const { exec } = require('child_process');
const { promisify } = require('util');
const fs = require('fs').promises;
const path = require('path');

const execAsync = promisify(exec);

class AIWorkshopMCPServer {
  constructor() {
    // Initialize OpenAI client with Azure OpenAI
    this.openai = new OpenAI({
      apiKey: process.env.AZURE_OPENAI_API_KEY,
      baseURL: `${process.env.AZURE_OPENAI_ENDPOINT}/openai/deployments/${process.env.AZURE_OPENAI_DEPLOYMENT}`,
      defaultQuery: { 'api-version': '2024-02-01' },
      defaultHeaders: { 'api-key': process.env.AZURE_OPENAI_API_KEY }
    });

    // Initialize MCP server
    this.server = new Server(
      {
        name: 'ai-workshop-mcp-server',
        version: '1.0.0',
        description: 'MCP Server for AI-Powered Development Workshop',
      },
      {
        capabilities: {
          tools: {},
          resources: {},
          prompts: {}
        }
      }
    );

    this.setupHandlers();
  }

  setupHandlers() {
    // Tool: Code Review
    this.server.setRequestHandler('tools/list', async () => ({
      tools: [
        {
          name: 'code_review',
          description: 'AI-powered code review tool',
          inputSchema: {
            type: 'object',
            properties: {
              code: { type: 'string', description: 'Code to review' },
              language: { type: 'string', description: 'Programming language' },
              reviewType: {
                type: 'string',
                enum: ['security', 'performance', 'quality', 'all'],
                default: 'all'
              }
            },
            required: ['code', 'language']
          }
        },
        {
          name: 'generate_tests',
          description: 'Generate unit tests for code',
          inputSchema: {
            type: 'object',
            properties: {
              code: { type: 'string', description: 'Code to generate tests for' },
              framework: {
                type: 'string',
                enum: ['jest', 'pytest', 'junit', 'nunit'],
                description: 'Testing framework'
              },
              coverage: {
                type: 'string',
                enum: ['basic', 'comprehensive', 'edge-cases'],
                default: 'comprehensive'
              }
            },
            required: ['code', 'framework']
          }
        },
        {
          name: 'optimize_code',
          description: 'Optimize code for performance',
          inputSchema: {
            type: 'object',
            properties: {
              code: { type: 'string', description: 'Code to optimize' },
              targetMetric: {
                type: 'string',
                enum: ['speed', 'memory', 'both'],
                default: 'both'
              },
              constraints: {
                type: 'array',
                items: { type: 'string' },
                description: 'Optimization constraints'
              }
            },
            required: ['code']
          }
        },
        {
          name: 'security_scan',
          description: 'Scan code for security vulnerabilities',
          inputSchema: {
            type: 'object',
            properties: {
              code: { type: 'string', description: 'Code to scan' },
              scanType: {
                type: 'string',
                enum: ['SAST', 'secrets', 'dependencies', 'all'],
                default: 'all'
              },
              severity: {
                type: 'string',
                enum: ['all', 'high', 'critical'],
                default: 'all'
              }
            },
            required: ['code']
          }
        },
        {
          name: 'generate_documentation',
          description: 'Generate documentation from code',
          inputSchema: {
            type: 'object',
            properties: {
              code: { type: 'string', description: 'Code to document' },
              style: {
                type: 'string',
                enum: ['markdown', 'jsdoc', 'sphinx', 'docstring'],
                default: 'markdown'
              },
              includeExamples: { type: 'boolean', default: true }
            },
            required: ['code']
          }
        }
      ]
    }));

    // Handle tool calls
    this.server.setRequestHandler('tools/call', async (request) => {
      const { name, arguments: args } = request.params;

      try {
        switch (name) {
          case 'code_review':
            return await this.performCodeReview(args);
          case 'generate_tests':
            return await this.generateTests(args);
          case 'optimize_code':
            return await this.optimizeCode(args);
          case 'security_scan':
            return await this.performSecurityScan(args);
          case 'generate_documentation':
            return await this.generateDocumentation(args);
          default:
            throw new Error(`Unknown tool: ${name}`);
        }
      } catch (error) {
        return {
          content: [
            {
              type: 'text',
              text: `Error: ${error.message}`
            }
          ]
        };
      }
    });

    // Resources
    this.server.setRequestHandler('resources/list', async () => ({
      resources: [
        {
          uri: 'workshop://templates/copilot',
          name: 'GitHub Copilot Templates',
          description: 'Prompt engineering templates for GitHub Copilot',
          mimeType: 'text/markdown'
        },
        {
          uri: 'workshop://templates/agents',
          name: 'AI Agent Templates',
          description: 'Templates for building AI agents',
          mimeType: 'text/markdown'
        },
        {
          uri: 'workshop://examples/optimization',
          name: 'Code Optimization Examples',
          description: 'Before/after optimization examples',
          mimeType: 'text/markdown'
        }
      ]
    }));

    // Handle resource reads
    this.server.setRequestHandler('resources/read', async (request) => {
      const { uri } = request.params;
      
      const resourceMap = {
        'workshop://templates/copilot': 'prompt-engineering-templates.md',
        'workshop://templates/agents': 'ai-agent-templates.md',
        'workshop://examples/optimization': 'code-optimization-examples.md'
      };

      const filename = resourceMap[uri];
      if (!filename) {
        throw new Error(`Resource not found: ${uri}`);
      }

      const content = await fs.readFile(path.join(__dirname, filename), 'utf-8');
      return {
        contents: [
          {
            uri,
            mimeType: 'text/markdown',
            text: content
          }
        ]
      };
    });

    // Prompts
    this.server.setRequestHandler('prompts/list', async () => ({
      prompts: [
        {
          name: 'refactor_for_performance',
          description: 'Refactor code for better performance',
          arguments: [
            {
              name: 'code',
              description: 'Code to refactor',
              required: true
            }
          ]
        },
        {
          name: 'implement_security_best_practices',
          description: 'Apply security best practices to code',
          arguments: [
            {
              name: 'code',
              description: 'Code to secure',
              required: true
            }
          ]
        },
        {
          name: 'generate_api_from_spec',
          description: 'Generate API implementation from OpenAPI spec',
          arguments: [
            {
              name: 'spec',
              description: 'OpenAPI specification',
              required: true
            }
          ]
        }
      ]
    }));

    // Handle prompt execution
    this.server.setRequestHandler('prompts/get', async (request) => {
      const { name, arguments: args } = request.params;

      const prompts = {
        refactor_for_performance: {
          messages: [
            {
              role: 'system',
              content: 'You are an expert performance engineer. Refactor the given code for optimal performance while maintaining readability and correctness.'
            },
            {
              role: 'user',
              content: `Please refactor this code for better performance:\n\n${args.code}`
            }
          ]
        },
        implement_security_best_practices: {
          messages: [
            {
              role: 'system',
              content: 'You are a security expert. Apply security best practices to the given code, including input validation, proper authentication, and protection against common vulnerabilities.'
            },
            {
              role: 'user',
              content: `Apply security best practices to this code:\n\n${args.code}`
            }
          ]
        },
        generate_api_from_spec: {
          messages: [
            {
              role: 'system',
              content: 'You are an API development expert. Generate a complete, production-ready API implementation from the given OpenAPI specification.'
            },
            {
              role: 'user',
              content: `Generate a complete API implementation from this OpenAPI spec:\n\n${args.spec}`
            }
          ]
        }
      };

      return prompts[name] || { messages: [] };
    });
  }

  async performCodeReview(args) {
    const { code, language, reviewType = 'all' } = args;

    const systemPrompt = `You are an expert code reviewer. Analyze the given ${language} code and provide a comprehensive review focusing on ${reviewType === 'all' ? 'security, performance, quality, and best practices' : reviewType}. Format your response as JSON with the following structure:
{
  "summary": "Overall assessment",
  "score": 0-100,
  "issues": [
    {
      "type": "security|performance|quality|style",
      "severity": "critical|high|medium|low",
      "line": line_number,
      "message": "Description of the issue",
      "suggestion": "How to fix it"
    }
  ],
  "strengths": ["List of good practices found"],
  "recommendations": ["General recommendations"]
}`;

    try {
      const response = await this.openai.chat.completions.create({
        model: 'gpt-4',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: `Review this ${language} code:\n\n${code}` }
        ],
        temperature: 0.3,
        response_format: { type: 'json_object' }
      });

      const review = JSON.parse(response.choices[0].message.content);

      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(review, null, 2)
          }
        ]
      };
    } catch (error) {
      throw new Error(`Code review failed: ${error.message}`);
    }
  }

  async generateTests(args) {
    const { code, framework, coverage = 'comprehensive' } = args;

    const frameworkTemplates = {
      jest: {
        imports: "import { describe, it, expect, beforeEach, afterEach } from '@jest/globals';",
        testStructure: 'describe/it',
        assertion: 'expect'
      },
      pytest: {
        imports: 'import pytest',
        testStructure: 'class/def',
        assertion: 'assert'
      },
      junit: {
        imports: 'import org.junit.jupiter.api.*;',
        testStructure: '@Test',
        assertion: 'assertEquals/assertTrue'
      },
      nunit: {
        imports: 'using NUnit.Framework;',
        testStructure: '[Test]',
        assertion: 'Assert.That'
      }
    };

    const template = frameworkTemplates[framework];
    const coverageInstructions = {
      basic: 'Generate basic unit tests covering the happy path',
      comprehensive: 'Generate comprehensive tests including edge cases, error scenarios, and boundary conditions',
      'edge-cases': 'Focus on edge cases, boundary conditions, and error scenarios'
    };

    const systemPrompt = `You are an expert test engineer. Generate ${framework} tests for the given code with ${coverage} coverage. Use ${template.testStructure} structure and ${template.assertion} for assertions. Include necessary imports and follow ${framework} best practices.`;

    try {
      const response = await this.openai.chat.completions.create({
        model: 'gpt-4',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: `${coverageInstructions[coverage]}. Generate tests for:\n\n${code}` }
        ],
        temperature: 0.2
      });

      const tests = response.choices[0].message.content;

      return {
        content: [
          {
            type: 'text',
            text: tests
          }
        ]
      };
    } catch (error) {
      throw new Error(`Test generation failed: ${error.message}`);
    }
  }

  async optimizeCode(args) {
    const { code, targetMetric = 'both', constraints = [] } = args;

    const optimizationFocus = {
      speed: 'execution speed and time complexity',
      memory: 'memory usage and space complexity',
      both: 'both execution speed and memory usage'
    };

    const systemPrompt = `You are a performance optimization expert. Optimize the given code for ${optimizationFocus[targetMetric]}. ${constraints.length > 0 ? `Constraints: ${constraints.join(', ')}` : ''}. Provide the optimized code with explanations of the changes made.`;

    try {
      const response = await this.openai.chat.completions.create({
        model: 'gpt-4',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: `Optimize this code:\n\n${code}` }
        ],
        temperature: 0.3
      });

      const optimization = response.choices[0].message.content;

      return {
        content: [
          {
            type: 'text',
            text: optimization
          }
        ]
      };
    } catch (error) {
      throw new Error(`Code optimization failed: ${error.message}`);
    }
  }

  async performSecurityScan(args) {
    const { code, scanType = 'all', severity = 'all' } = args;

    const scanTypes = {
      SAST: 'static application security testing',
      secrets: 'hardcoded secrets and credentials',
      dependencies: 'vulnerable dependencies',
      all: 'all security vulnerabilities including SAST, secrets, and dependencies'
    };

    const systemPrompt = `You are a security expert. Perform ${scanTypes[scanType]} on the given code. Report only ${severity === 'all' ? 'all' : severity + ' and critical'} severity issues. Format your response as JSON with the following structure:
{
  "summary": "Security assessment summary",
  "risk_score": "low|medium|high|critical",
  "vulnerabilities": [
    {
      "type": "vulnerability type",
      "severity": "critical|high|medium|low",
      "line": line_number_if_applicable,
      "description": "Detailed description",
      "cwe_id": "CWE-XXX if applicable",
      "remediation": "How to fix the vulnerability",
      "references": ["Links to resources"]
    }
  ],
  "recommendations": ["Security recommendations"]
}`;

    try {
      const response = await this.openai.chat.completions.create({
        model: 'gpt-4',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: `Scan this code for security vulnerabilities:\n\n${code}` }
        ],
        temperature: 0.2,
        response_format: { type: 'json_object' }
      });

      const scanResults = JSON.parse(response.choices[0].message.content);

      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(scanResults, null, 2)
          }
        ]
      };
    } catch (error) {
      throw new Error(`Security scan failed: ${error.message}`);
    }
  }

  async generateDocumentation(args) {
    const { code, style = 'markdown', includeExamples = true } = args;

    const styleInstructions = {
      markdown: 'Generate comprehensive Markdown documentation',
      jsdoc: 'Generate JSDoc-style documentation',
      sphinx: 'Generate Sphinx-compatible reStructuredText documentation',
      docstring: 'Generate Python docstring-style documentation'
    };

    const systemPrompt = `You are a technical documentation expert. ${styleInstructions[style]} for the given code. Include function/class descriptions, parameters, return values, ${includeExamples ? 'usage examples,' : ''} and any important notes. Make the documentation clear and comprehensive.`;

    try {
      const response = await this.openai.chat.completions.create({
        model: 'gpt-4',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: `Generate documentation for:\n\n${code}` }
        ],
        temperature: 0.3
      });

      const documentation = response.choices[0].message.content;

      return {
        content: [
          {
            type: 'text',
            text: documentation
          }
        ]
      };
    } catch (error) {
      throw new Error(`Documentation generation failed: ${error.message}`);
    }
  }

  async start() {
    const transport = new StdioServerTransport();
    await this.server.connect(transport);
    console.error('AI Workshop MCP Server started');
  }
}

// Start the server
const server = new AIWorkshopMCPServer();
server.start().catch(console.error); 