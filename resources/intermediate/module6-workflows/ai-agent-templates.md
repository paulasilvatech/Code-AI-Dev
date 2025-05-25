# AI Agent Templates

Complete templates for building intelligent AI agents for various development scenarios.

## 🤖 Basic Agent Architecture

### 1. Code Review Agent

```python
import ast
import re
from typing import List, Dict, Any
from dataclasses import dataclass
from enum import Enum

class SeverityLevel(Enum):
    INFO = "info"
    WARNING = "warning"
    ERROR = "error"
    CRITICAL = "critical"

@dataclass
class CodeIssue:
    line: int
    column: int
    severity: SeverityLevel
    category: str
    message: str
    suggestion: str

class CodeReviewAgent:
    """AI-powered code review agent for automated code quality checks"""
    
    def __init__(self):
        self.rules = self._initialize_rules()
        self.issues = []
        
    def _initialize_rules(self) -> Dict[str, Any]:
        """Initialize code review rules"""
        return {
            'naming_conventions': {
                'function': r'^[a-z_][a-z0-9_]*$',
                'class': r'^[A-Z][a-zA-Z0-9]*$',
                'constant': r'^[A-Z_][A-Z0-9_]*$'
            },
            'complexity_thresholds': {
                'cyclomatic_complexity': 10,
                'function_length': 50,
                'file_length': 500
            },
            'security_patterns': [
                r'eval\s*\(',
                r'exec\s*\(',
                r'__import__\s*\(',
                r'os\.system\s*\(',
                r'subprocess\.call\s*\([^,]+shell\s*=\s*True'
            ]
        }
    
    def review_code(self, code: str, filename: str) -> List[CodeIssue]:
        """Perform comprehensive code review"""
        self.issues = []
        
        # Parse code
        try:
            tree = ast.parse(code)
        except SyntaxError as e:
            self.issues.append(CodeIssue(
                line=e.lineno or 0,
                column=e.offset or 0,
                severity=SeverityLevel.ERROR,
                category="syntax",
                message=f"Syntax error: {e.msg}",
                suggestion="Fix the syntax error before proceeding"
            ))
            return self.issues
        
        # Run various checks
        self._check_naming_conventions(tree)
        self._check_code_complexity(tree)
        self._check_security_issues(code)
        self._check_best_practices(tree, code)
        
        return sorted(self.issues, key=lambda x: (x.line, x.severity.value))
    
    def _check_naming_conventions(self, tree: ast.AST):
        """Check naming conventions"""
        for node in ast.walk(tree):
            if isinstance(node, ast.FunctionDef):
                if not re.match(self.rules['naming_conventions']['function'], node.name):
                    self.issues.append(CodeIssue(
                        line=node.lineno,
                        column=node.col_offset,
                        severity=SeverityLevel.WARNING,
                        category="naming",
                        message=f"Function '{node.name}' doesn't follow naming convention",
                        suggestion="Use snake_case for function names"
                    ))
            
            elif isinstance(node, ast.ClassDef):
                if not re.match(self.rules['naming_conventions']['class'], node.name):
                    self.issues.append(CodeIssue(
                        line=node.lineno,
                        column=node.col_offset,
                        severity=SeverityLevel.WARNING,
                        category="naming",
                        message=f"Class '{node.name}' doesn't follow naming convention",
                        suggestion="Use PascalCase for class names"
                    ))
    
    def _check_code_complexity(self, tree: ast.AST):
        """Check code complexity metrics"""
        for node in ast.walk(tree):
            if isinstance(node, ast.FunctionDef):
                complexity = self._calculate_cyclomatic_complexity(node)
                if complexity > self.rules['complexity_thresholds']['cyclomatic_complexity']:
                    self.issues.append(CodeIssue(
                        line=node.lineno,
                        column=node.col_offset,
                        severity=SeverityLevel.WARNING,
                        category="complexity",
                        message=f"Function '{node.name}' has high complexity ({complexity})",
                        suggestion="Consider breaking this function into smaller functions"
                    ))
    
    def _calculate_cyclomatic_complexity(self, node: ast.AST) -> int:
        """Calculate cyclomatic complexity of a function"""
        complexity = 1
        for child in ast.walk(node):
            if isinstance(child, (ast.If, ast.While, ast.For)):
                complexity += 1
            elif isinstance(child, ast.ExceptHandler):
                complexity += 1
        return complexity
    
    def _check_security_issues(self, code: str):
        """Check for security vulnerabilities"""
        for pattern in self.rules['security_patterns']:
            for match in re.finditer(pattern, code):
                line_num = code[:match.start()].count('\n') + 1
                self.issues.append(CodeIssue(
                    line=line_num,
                    column=match.start() - code.rfind('\n', 0, match.start()),
                    severity=SeverityLevel.CRITICAL,
                    category="security",
                    message=f"Potential security issue: {match.group()}",
                    suggestion="Avoid using dangerous functions; consider safer alternatives"
                ))
    
    def _check_best_practices(self, tree: ast.AST, code: str):
        """Check for best practices"""
        # Check for missing docstrings
        for node in ast.walk(tree):
            if isinstance(node, (ast.FunctionDef, ast.ClassDef)):
                if not ast.get_docstring(node):
                    self.issues.append(CodeIssue(
                        line=node.lineno,
                        column=node.col_offset,
                        severity=SeverityLevel.INFO,
                        category="documentation",
                        message=f"Missing docstring for {node.__class__.__name__} '{node.name}'",
                        suggestion="Add a docstring to document purpose and usage"
                    ))
    
    def generate_report(self, issues: List[CodeIssue]) -> str:
        """Generate a formatted review report"""
        if not issues:
            return "✅ No issues found! Code looks good."
        
        report = f"Found {len(issues)} issues:\n\n"
        
        # Group by severity
        by_severity = {}
        for issue in issues:
            by_severity.setdefault(issue.severity, []).append(issue)
        
        for severity in SeverityLevel:
            if severity in by_severity:
                report += f"\n{severity.value.upper()} ({len(by_severity[severity])})\n"
                report += "-" * 50 + "\n"
                for issue in by_severity[severity]:
                    report += f"Line {issue.line}: {issue.message}\n"
                    report += f"  → {issue.suggestion}\n\n"
        
        return report

# Usage example
agent = CodeReviewAgent()
code = '''
def CalculateTotal(items):
    total = 0
    for item in items:
        if item.price > 0:
            if item.quantity > 0:
                if item.discount > 0:
                    total += item.price * item.quantity * (1 - item.discount)
                else:
                    total += item.price * item.quantity
    return total
'''

issues = agent.review_code(code, "shopping_cart.py")
print(agent.generate_report(issues))
```

### 2. Performance Optimization Agent

```typescript
interface PerformanceMetric {
    name: string;
    value: number;
    unit: string;
    threshold?: number;
}

interface OptimizationSuggestion {
    type: 'memory' | 'cpu' | 'io' | 'algorithm';
    severity: 'low' | 'medium' | 'high';
    description: string;
    impact: string;
    implementation: string;
}

class PerformanceOptimizationAgent {
    private metrics: Map<string, PerformanceMetric> = new Map();
    private suggestions: OptimizationSuggestion[] = [];
    
    constructor(private config: {
        cpuThreshold: number;
        memoryThreshold: number;
        responseTimeThreshold: number;
    }) {}
    
    async analyzeFunction<T>(
        fn: (...args: any[]) => T,
        args: any[],
        iterations: number = 100
    ): Promise<void> {
        const results = await this.profileFunction(fn, args, iterations);
        this.generateOptimizationSuggestions(results);
    }
    
    private async profileFunction<T>(
        fn: (...args: any[]) => T,
        args: any[],
        iterations: number
    ): Promise<Map<string, PerformanceMetric>> {
        const metrics = new Map<string, PerformanceMetric>();
        
        // Memory profiling
        const memoryBefore = process.memoryUsage();
        const startTime = performance.now();
        
        // Run function multiple times
        const results: T[] = [];
        for (let i = 0; i < iterations; i++) {
            results.push(fn(...args));
        }
        
        const endTime = performance.now();
        const memoryAfter = process.memoryUsage();
        
        // Calculate metrics
        const avgTime = (endTime - startTime) / iterations;
        const memoryDelta = memoryAfter.heapUsed - memoryBefore.heapUsed;
        
        metrics.set('executionTime', {
            name: 'Average Execution Time',
            value: avgTime,
            unit: 'ms',
            threshold: this.config.responseTimeThreshold
        });
        
        metrics.set('memoryUsage', {
            name: 'Memory Usage',
            value: memoryDelta / 1024 / 1024,
            unit: 'MB',
            threshold: this.config.memoryThreshold
        });
        
        this.metrics = metrics;
        return metrics;
    }
    
    private generateOptimizationSuggestions(
        metrics: Map<string, PerformanceMetric>
    ): void {
        this.suggestions = [];
        
        // Check execution time
        const execTime = metrics.get('executionTime');
        if (execTime && execTime.threshold && execTime.value > execTime.threshold) {
            this.suggestions.push({
                type: 'cpu',
                severity: 'high',
                description: 'Function execution time exceeds threshold',
                impact: `Current: ${execTime.value.toFixed(2)}ms, Target: ${execTime.threshold}ms`,
                implementation: `
Consider these optimizations:
1. Use memoization for repeated calculations
2. Implement early returns for edge cases
3. Replace loops with more efficient algorithms
4. Use Web Workers for CPU-intensive tasks
5. Consider using WASM for performance-critical code`
            });
        }
        
        // Check memory usage
        const memUsage = metrics.get('memoryUsage');
        if (memUsage && memUsage.threshold && memUsage.value > memUsage.threshold) {
            this.suggestions.push({
                type: 'memory',
                severity: 'medium',
                description: 'High memory allocation detected',
                impact: `Using ${memUsage.value.toFixed(2)}MB per operation`,
                implementation: `
Memory optimization strategies:
1. Use object pooling for frequently created objects
2. Clear references to allow garbage collection
3. Use streaming for large data processing
4. Implement lazy loading patterns
5. Consider using typed arrays for numeric data`
            });
        }
    }
    
    async optimizeCode(code: string): Promise<string> {
        // AI-powered code optimization
        const optimizations = [
            this.optimizeLoops,
            this.optimizeDataStructures,
            this.optimizeAsyncOperations,
            this.eliminateRedundancy
        ];
        
        let optimizedCode = code;
        for (const optimization of optimizations) {
            optimizedCode = await optimization.call(this, optimizedCode);
        }
        
        return optimizedCode;
    }
    
    private async optimizeLoops(code: string): Promise<string> {
        // Convert forEach to for...of for better performance
        return code.replace(
            /(\w+)\.forEach\((.*?)\s*=>\s*{([^}]+)}\)/g,
            'for (const $2 of $1) {$3}'
        );
    }
    
    private async optimizeDataStructures(code: string): Promise<string> {
        // Suggest Map instead of object for dynamic keys
        const objectPatterns = /const\s+(\w+)\s*=\s*{};[\s\S]*?\1\[([^\]]+)\]\s*=/g;
        
        if (objectPatterns.test(code)) {
            console.log('💡 Suggestion: Consider using Map for dynamic key access');
        }
        
        return code;
    }
    
    private async optimizeAsyncOperations(code: string): Promise<string> {
        // Convert sequential awaits to Promise.all
        const sequentialAwaitPattern = /(const\s+\w+\s*=\s*await\s+[^;]+;\s*){2,}/g;
        
        return code.replace(sequentialAwaitPattern, (match) => {
            const awaits = match.match(/const\s+(\w+)\s*=\s*await\s+([^;]+);/g) || [];
            if (awaits.length < 2) return match;
            
            const variables = awaits.map(a => a.match(/const\s+(\w+)/)?.[1]);
            const promises = awaits.map(a => a.match(/await\s+([^;]+)/)?.[1]);
            
            return `const [${variables.join(', ')}] = await Promise.all([
    ${promises.join(',\n    ')}
]);`;
        });
    }
    
    private eliminateRedundancy(code: string): string {
        // Detect and suggest removal of redundant operations
        // This is a simplified example
        return code;
    }
    
    generateReport(): string {
        let report = '# Performance Analysis Report\n\n';
        
        // Metrics section
        report += '## Performance Metrics\n\n';
        this.metrics.forEach((metric) => {
            const status = metric.threshold && metric.value > metric.threshold ? '❌' : '✅';
            report += `- ${status} ${metric.name}: ${metric.value.toFixed(2)} ${metric.unit}`;
            if (metric.threshold) {
                report += ` (threshold: ${metric.threshold} ${metric.unit})`;
            }
            report += '\n';
        });
        
        // Suggestions section
        if (this.suggestions.length > 0) {
            report += '\n## Optimization Suggestions\n\n';
            this.suggestions.forEach((suggestion, index) => {
                report += `### ${index + 1}. ${suggestion.description}\n\n`;
                report += `**Type:** ${suggestion.type}\n`;
                report += `**Severity:** ${suggestion.severity}\n`;
                report += `**Impact:** ${suggestion.impact}\n\n`;
                report += `**Implementation:**\n${suggestion.implementation}\n\n`;
            });
        }
        
        return report;
    }
}

// Usage
const agent = new PerformanceOptimizationAgent({
    cpuThreshold: 10, // 10ms
    memoryThreshold: 50, // 50MB
    responseTimeThreshold: 100 // 100ms
});

// Example function to optimize
async function processLargeDataset(data: any[]): Promise<any[]> {
    const result1 = await fetchDataFromAPI1();
    const result2 = await fetchDataFromAPI2();
    const result3 = await fetchDataFromAPI3();
    
    return data.map(item => ({
        ...item,
        enriched: combineResults(result1, result2, result3)
    }));
}

// Analyze and optimize
await agent.analyzeFunction(processLargeDataset, [[/* test data */]], 10);
console.log(agent.generateReport());
```

### 3. Security Scanning Agent

```java
import java.util.*;
import java.util.regex.*;
import java.nio.file.*;
import java.security.MessageDigest;

public class SecurityScanningAgent {
    
    public enum VulnerabilityType {
        SQL_INJECTION("SQL Injection"),
        XSS("Cross-Site Scripting"),
        XXE("XML External Entity"),
        INSECURE_DESERIALIZATION("Insecure Deserialization"),
        WEAK_CRYPTO("Weak Cryptography"),
        HARDCODED_SECRETS("Hardcoded Secrets"),
        PATH_TRAVERSAL("Path Traversal"),
        COMMAND_INJECTION("Command Injection");
        
        private final String displayName;
        
        VulnerabilityType(String displayName) {
            this.displayName = displayName;
        }
    }
    
    public static class Vulnerability {
        public final VulnerabilityType type;
        public final String severity;
        public final String filePath;
        public final int lineNumber;
        public final String description;
        public final String recommendation;
        public final String codeSnippet;
        
        public Vulnerability(VulnerabilityType type, String severity, 
                           String filePath, int lineNumber, 
                           String description, String recommendation,
                           String codeSnippet) {
            this.type = type;
            this.severity = severity;
            this.filePath = filePath;
            this.lineNumber = lineNumber;
            this.description = description;
            this.recommendation = recommendation;
            this.codeSnippet = codeSnippet;
        }
    }
    
    private final Map<VulnerabilityType, List<Pattern>> vulnerabilityPatterns;
    private final List<Vulnerability> findings;
    
    public SecurityScanningAgent() {
        this.vulnerabilityPatterns = initializePatterns();
        this.findings = new ArrayList<>();
    }
    
    private Map<VulnerabilityType, List<Pattern>> initializePatterns() {
        Map<VulnerabilityType, List<Pattern>> patterns = new HashMap<>();
        
        // SQL Injection patterns
        patterns.put(VulnerabilityType.SQL_INJECTION, Arrays.asList(
            Pattern.compile("\\\".*SELECT.*FROM.*WHERE.*\\\"\\s*\\+", Pattern.CASE_INSENSITIVE),
            Pattern.compile("executeQuery\\s*\\(.*\\+.*\\)", Pattern.CASE_INSENSITIVE),
            Pattern.compile("createStatement\\s*\\(\\s*\\)", Pattern.CASE_INSENSITIVE)
        ));
        
        // XSS patterns
        patterns.put(VulnerabilityType.XSS, Arrays.asList(
            Pattern.compile("innerHTML\\s*=\\s*[^'\"]*\\+"),
            Pattern.compile("document\\.write\\s*\\(.*\\+.*\\)"),
            Pattern.compile("eval\\s*\\(.*\\+.*\\)")
        ));
        
        // Weak Crypto patterns
        patterns.put(VulnerabilityType.WEAK_CRYPTO, Arrays.asList(
            Pattern.compile("MD5|SHA1", Pattern.CASE_INSENSITIVE),
            Pattern.compile("DES|3DES", Pattern.CASE_INSENSITIVE),
            Pattern.compile("Random\\s*\\(\\s*\\)")
        ));
        
        // Hardcoded secrets patterns
        patterns.put(VulnerabilityType.HARDCODED_SECRETS, Arrays.asList(
            Pattern.compile("(password|pwd|pass)\\s*=\\s*[\"'][^\"']+[\"']", Pattern.CASE_INSENSITIVE),
            Pattern.compile("(api_key|apikey|key)\\s*=\\s*[\"'][^\"']+[\"']", Pattern.CASE_INSENSITIVE),
            Pattern.compile("(secret|token)\\s*=\\s*[\"'][^\"']+[\"']", Pattern.CASE_INSENSITIVE)
        ));
        
        return patterns;
    }
    
    public List<Vulnerability> scanFile(Path filePath) throws Exception {
        List<String> lines = Files.readAllLines(filePath);
        String fileName = filePath.getFileName().toString();
        
        for (int i = 0; i < lines.size(); i++) {
            String line = lines.get(i);
            int lineNumber = i + 1;
            
            for (Map.Entry<VulnerabilityType, List<Pattern>> entry : vulnerabilityPatterns.entrySet()) {
                VulnerabilityType vulnType = entry.getKey();
                
                for (Pattern pattern : entry.getValue()) {
                    Matcher matcher = pattern.matcher(line);
                    if (matcher.find()) {
                        findings.add(createVulnerability(
                            vulnType, filePath.toString(), lineNumber, line, matcher.group()
                        ));
                    }
                }
            }
        }
        
        // Additional context-aware scanning
        performContextAnalysis(filePath, lines);
        
        return findings;
    }
    
    private void performContextAnalysis(Path filePath, List<String> lines) {
        // Check for prepared statements usage
        boolean usesPreparedStatements = lines.stream()
            .anyMatch(line -> line.contains("PreparedStatement"));
        
        boolean hasRawQueries = lines.stream()
            .anyMatch(line -> line.contains("executeQuery") || line.contains("executeUpdate"));
        
        if (hasRawQueries && !usesPreparedStatements) {
            findings.add(new Vulnerability(
                VulnerabilityType.SQL_INJECTION,
                "Medium",
                filePath.toString(),
                0,
                "File uses raw SQL queries without prepared statements",
                "Refactor to use PreparedStatement for all database queries",
                "Consider using parameterized queries throughout the file"
            ));
        }
    }
    
    private Vulnerability createVulnerability(VulnerabilityType type, String filePath, 
                                            int lineNumber, String codeLine, String match) {
        String severity = calculateSeverity(type, match);
        String description = generateDescription(type, match);
        String recommendation = generateRecommendation(type);
        
        return new Vulnerability(
            type, severity, filePath, lineNumber, 
            description, recommendation, codeLine.trim()
        );
    }
    
    private String calculateSeverity(VulnerabilityType type, String match) {
        switch (type) {
            case SQL_INJECTION:
            case COMMAND_INJECTION:
                return "Critical";
            case XSS:
            case XXE:
            case INSECURE_DESERIALIZATION:
                return "High";
            case WEAK_CRYPTO:
            case PATH_TRAVERSAL:
                return "Medium";
            case HARDCODED_SECRETS:
                return match.length() > 20 ? "High" : "Medium";
            default:
                return "Low";
        }
    }
    
    private String generateDescription(VulnerabilityType type, String match) {
        switch (type) {
            case SQL_INJECTION:
                return "Potential SQL injection vulnerability detected. User input appears to be concatenated directly into SQL query.";
            case XSS:
                return "Potential XSS vulnerability. User input may be rendered without proper sanitization.";
            case WEAK_CRYPTO:
                return "Weak cryptographic algorithm detected: " + match;
            case HARDCODED_SECRETS:
                return "Hardcoded credential or secret detected in source code.";
            default:
                return "Security vulnerability detected: " + type.displayName;
        }
    }
    
    private String generateRecommendation(VulnerabilityType type) {
        switch (type) {
            case SQL_INJECTION:
                return "Use parameterized queries (PreparedStatement) instead of string concatenation. Example:\n" +
                       "PreparedStatement ps = conn.prepareStatement(\"SELECT * FROM users WHERE id = ?\");\n" +
                       "ps.setInt(1, userId);";
            case XSS:
                return "Sanitize all user input before rendering. Use appropriate encoding functions:\n" +
                       "- HTML: StringEscapeUtils.escapeHtml4(input)\n" +
                       "- JavaScript: StringEscapeUtils.escapeEcmaScript(input)";
            case WEAK_CRYPTO:
                return "Use strong cryptographic algorithms:\n" +
                       "- For hashing: SHA-256, SHA-512, or bcrypt for passwords\n" +
                       "- For encryption: AES-256\n" +
                       "- For random numbers: SecureRandom";
            case HARDCODED_SECRETS:
                return "Move secrets to environment variables or secure configuration:\n" +
                       "String password = System.getenv(\"DB_PASSWORD\");\n" +
                       "// Or use a secure vault service";
            default:
                return "Review and fix the security issue according to OWASP guidelines.";
        }
    }
    
    public void generateSecurityReport() {
        System.out.println("=== Security Scan Report ===\n");
        
        if (findings.isEmpty()) {
            System.out.println("✅ No security vulnerabilities detected!");
            return;
        }
        
        // Group by severity
        Map<String, List<Vulnerability>> bySeverity = new HashMap<>();
        for (Vulnerability vuln : findings) {
            bySeverity.computeIfAbsent(vuln.severity, k -> new ArrayList<>()).add(vuln);
        }
        
        // Print summary
        System.out.println("Summary:");
        System.out.println("Total vulnerabilities: " + findings.size());
        bySeverity.forEach((severity, vulns) -> 
            System.out.println("- " + severity + ": " + vulns.size())
        );
        System.out.println();
        
        // Print details
        for (String severity : Arrays.asList("Critical", "High", "Medium", "Low")) {
            List<Vulnerability> vulns = bySeverity.get(severity);
            if (vulns != null && !vulns.isEmpty()) {
                System.out.println("\n" + severity.toUpperCase() + " SEVERITY ISSUES:");
                System.out.println("=" + "=".repeat(severity.length() + 16));
                
                for (Vulnerability vuln : vulns) {
                    System.out.println("\n📍 " + vuln.type.displayName);
                    System.out.println("   File: " + vuln.filePath + ":" + vuln.lineNumber);
                    System.out.println("   Description: " + vuln.description);
                    System.out.println("   Code: " + vuln.codeSnippet);
                    System.out.println("   Recommendation: " + vuln.recommendation);
                }
            }
        }
        
        // Generate SARIF format for CI/CD integration
        generateSARIFReport();
    }
    
    private void generateSARIFReport() {
        // Generate SARIF (Static Analysis Results Interchange Format) for tool integration
        // Implementation would generate JSON in SARIF format
    }
}

// Usage
SecurityScanningAgent scanner = new SecurityScanningAgent();
scanner.scanFile(Paths.get("src/main/java/UserController.java"));
scanner.generateSecurityReport();
```

### 4. Test Generation Agent

```python
import ast
import inspect
from typing import List, Dict, Any, Callable
import unittest
from dataclasses import dataclass

@dataclass
class TestCase:
    name: str
    description: str
    setup: str
    test_code: str
    teardown: str
    expected_result: Any

class TestGenerationAgent:
    """AI-powered test generation agent"""
    
    def __init__(self):
        self.test_patterns = {
            'edge_cases': ['empty', 'null', 'boundary', 'overflow'],
            'happy_path': ['normal', 'typical', 'expected'],
            'error_cases': ['invalid', 'malformed', 'exception']
        }
    
    def generate_tests_for_function(self, func: Callable) -> str:
        """Generate comprehensive test suite for a function"""
        
        # Analyze function signature
        sig = inspect.signature(func)
        func_name = func.__name__
        params = list(sig.parameters.keys())
        
        # Get function source code and docstring
        source = inspect.getsource(func)
        docstring = inspect.getdoc(func) or ""
        
        # Analyze function implementation
        tree = ast.parse(source)
        test_cases = self._analyze_function_ast(tree, func_name, params)
        
        # Generate test class
        return self._generate_test_class(func_name, test_cases)
    
    def _analyze_function_ast(self, tree: ast.AST, func_name: str, params: List[str]) -> List[TestCase]:
        """Analyze function AST to determine test cases"""
        test_cases = []
        
        # Find function node
        func_node = None
        for node in ast.walk(tree):
            if isinstance(node, ast.FunctionDef) and node.name == func_name:
                func_node = node
                break
        
        if not func_node:
            return test_cases
        
        # Analyze control flow
        conditions = self._extract_conditions(func_node)
        
        # Generate test cases based on conditions
        test_cases.extend(self._generate_condition_tests(func_name, params, conditions))
        
        # Add edge case tests
        test_cases.extend(self._generate_edge_case_tests(func_name, params))
        
        # Add happy path tests
        test_cases.extend(self._generate_happy_path_tests(func_name, params))
        
        return test_cases
    
    def _extract_conditions(self, node: ast.AST) -> List[Dict[str, Any]]:
        """Extract conditions from function"""
        conditions = []
        
        for child in ast.walk(node):
            if isinstance(child, ast.If):
                conditions.append({
                    'type': 'if',
                    'condition': ast.unparse(child.test),
                    'line': child.lineno
                })
            elif isinstance(child, ast.Raise):
                conditions.append({
                    'type': 'exception',
                    'exception': ast.unparse(child.exc) if child.exc else 'Exception',
                    'line': child.lineno
                })
        
        return conditions
    
    def _generate_condition_tests(self, func_name: str, params: List[str], 
                                conditions: List[Dict[str, Any]]) -> List[TestCase]:
        """Generate tests for each condition"""
        test_cases = []
        
        for i, condition in enumerate(conditions):
            if condition['type'] == 'if':
                # Test true condition
                test_cases.append(TestCase(
                    name=f"test_{func_name}_condition_{i}_true",
                    description=f"Test when {condition['condition']} is True",
                    setup=self._generate_setup_for_condition(condition, True),
                    test_code=f"result = {func_name}({', '.join(params)})",
                    teardown="",
                    expected_result="# Assert expected result for true condition"
                ))
                
                # Test false condition
                test_cases.append(TestCase(
                    name=f"test_{func_name}_condition_{i}_false",
                    description=f"Test when {condition['condition']} is False",
                    setup=self._generate_setup_for_condition(condition, False),
                    test_code=f"result = {func_name}({', '.join(params)})",
                    teardown="",
                    expected_result="# Assert expected result for false condition"
                ))
            
            elif condition['type'] == 'exception':
                test_cases.append(TestCase(
                    name=f"test_{func_name}_raises_{condition['exception'].replace('()', '')}",
                    description=f"Test that function raises {condition['exception']}",
                    setup=self._generate_exception_setup(condition),
                    test_code=f"with self.assertRaises({condition['exception'].split('(')[0]}):\n            {func_name}({', '.join(params)})",
                    teardown="",
                    expected_result=None
                ))
        
        return test_cases
    
    def _generate_edge_case_tests(self, func_name: str, params: List[str]) -> List[TestCase]:
        """Generate edge case tests"""
        test_cases = []
        
        # Empty/None parameters
        if params:
            test_cases.append(TestCase(
                name=f"test_{func_name}_with_none",
                description="Test function with None parameters",
                setup="\n".join([f"{param} = None" for param in params]),
                test_code=f"result = {func_name}({', '.join(params)})",
                teardown="",
                expected_result="# Assert handles None appropriately"
            ))
        
        # Empty collections
        test_cases.append(TestCase(
            name=f"test_{func_name}_empty_input",
            description="Test function with empty inputs",
            setup=self._generate_empty_input_setup(params),
            test_code=f"result = {func_name}({', '.join(params)})",
            teardown="",
            expected_result="# Assert handles empty inputs correctly"
        ))
        
        return test_cases
    
    def _generate_happy_path_tests(self, func_name: str, params: List[str]) -> List[TestCase]:
        """Generate happy path tests"""
        return [
            TestCase(
                name=f"test_{func_name}_typical_case",
                description="Test function with typical valid inputs",
                setup=self._generate_typical_setup(params),
                test_code=f"result = {func_name}({', '.join(params)})",
                teardown="",
                expected_result="# Assert expected typical result"
            )
        ]
    
    def _generate_test_class(self, func_name: str, test_cases: List[TestCase]) -> str:
        """Generate complete test class"""
        
        class_name = f"Test{func_name.capitalize()}"
        
        test_code = f"""import unittest
from unittest.mock import Mock, patch
import pytest

class {class_name}(unittest.TestCase):
    \"\"\"Test cases for {func_name} function\"\"\"
    
    def setUp(self):
        \"\"\"Set up test fixtures\"\"\"
        # Common setup for all tests
        pass
    
    def tearDown(self):
        \"\"\"Clean up after tests\"\"\"
        # Common cleanup
        pass
"""
        
        for test_case in test_cases:
            test_code += f"""
    def {test_case.name}(self):
        \"\"\"
        {test_case.description}
        \"\"\"
        # Setup
{self._indent(test_case.setup, 2)}
        
        # Execute
{self._indent(test_case.test_code, 2)}
        
        # Assert
{self._indent(test_case.expected_result or "pass", 2)}
"""
        
        # Add parametrized tests
        test_code += self._generate_parametrized_tests(func_name, test_cases)
        
        # Add property-based tests
        test_code += self._generate_property_tests(func_name)
        
        return test_code
    
    def _generate_parametrized_tests(self, func_name: str, test_cases: List[TestCase]) -> str:
        """Generate parametrized tests for multiple inputs"""
        return f"""
    @pytest.mark.parametrize("input_val,expected", [
        (0, 0),
        (1, 1),
        (-1, 1),
        (100, 10000),
        # Add more test cases
    ])
    def test_{func_name}_parametrized(self, input_val, expected):
        \"\"\"Test {func_name} with multiple inputs\"\"\"
        result = {func_name}(input_val)
        self.assertEqual(result, expected)
"""
    
    def _generate_property_tests(self, func_name: str) -> str:
        """Generate property-based tests using hypothesis"""
        return f"""
    @given(st.integers())
    def test_{func_name}_property(self, value):
        \"\"\"Property-based test for {func_name}\"\"\"
        result = {func_name}(value)
        # Add property assertions
        # Example: assert result >= 0  # Output is always non-negative
"""
    
    def _indent(self, text: str, level: int) -> str:
        """Indent text by specified level"""
        indent = "    " * level
        return "\n".join(indent + line for line in text.split("\n"))
    
    def _generate_setup_for_condition(self, condition: Dict[str, Any], 
                                    expected: bool) -> str:
        """Generate setup code for condition testing"""
        # Simplified - would need more sophisticated analysis
        return f"# Setup to make condition '{condition['condition']}' evaluate to {expected}"
    
    def _generate_exception_setup(self, condition: Dict[str, Any]) -> str:
        """Generate setup for exception testing"""
        return "# Setup to trigger exception"
    
    def _generate_empty_input_setup(self, params: List[str]) -> str:
        """Generate setup for empty inputs"""
        setup = []
        for param in params:
            setup.append(f"{param} = []  # or '' or 0 depending on type")
        return "\n".join(setup)
    
    def _generate_typical_setup(self, params: List[str]) -> str:
        """Generate setup for typical inputs"""
        setup = []
        for param in params:
            setup.append(f"{param} = # typical value for {param}")
        return "\n".join(setup)

# Usage example
def calculate_discount(price: float, discount_percent: float) -> float:
    """Calculate discounted price"""
    if price < 0:
        raise ValueError("Price cannot be negative")
    if discount_percent < 0 or discount_percent > 100:
        raise ValueError("Discount must be between 0 and 100")
    
    if discount_percent == 0:
        return price
    
    discount_amount = price * (discount_percent / 100)
    return price - discount_amount

# Generate tests
agent = TestGenerationAgent()
test_code = agent.generate_tests_for_function(calculate_discount)
print(test_code)
```

## 🎯 Advanced Agent Patterns

### 5. Multi-Agent Orchestrator

```python
from typing import Dict, List, Any, Optional
from abc import ABC, abstractmethod
import asyncio
from enum import Enum
import json

class AgentRole(Enum):
    CODE_REVIEWER = "code_reviewer"
    PERFORMANCE_OPTIMIZER = "performance_optimizer"
    SECURITY_SCANNER = "security_scanner"
    TEST_GENERATOR = "test_generator"
    DOCUMENTATION_WRITER = "documentation_writer"

class AgentMessage:
    def __init__(self, sender: AgentRole, recipient: AgentRole, 
                 content: Any, message_type: str = "request"):
        self.sender = sender
        self.recipient = recipient
        self.content = content
        self.message_type = message_type
        self.timestamp = asyncio.get_event_loop().time()

class BaseAgent(ABC):
    def __init__(self, role: AgentRole, orchestrator: 'MultiAgentOrchestrator'):
        self.role = role
        self.orchestrator = orchestrator
        self.inbox: asyncio.Queue = asyncio.Queue()
        self.knowledge_base: Dict[str, Any] = {}
    
    @abstractmethod
    async def process_message(self, message: AgentMessage) -> Optional[AgentMessage]:
        """Process incoming message and optionally return response"""
        pass
    
    @abstractmethod
    async def analyze(self, code: str) -> Dict[str, Any]:
        """Perform agent-specific analysis"""
        pass
    
    async def send_message(self, recipient: AgentRole, content: Any, 
                          message_type: str = "request"):
        """Send message to another agent"""
        message = AgentMessage(self.role, recipient, content, message_type)
        await self.orchestrator.route_message(message)
    
    async def run(self):
        """Main agent loop"""
        while True:
            message = await self.inbox.get()
            response = await self.process_message(message)
            if response:
                await self.orchestrator.route_message(response)

class MultiAgentOrchestrator:
    def __init__(self):
        self.agents: Dict[AgentRole, BaseAgent] = {}
        self.workflow_queue: asyncio.Queue = asyncio.Queue()
        self.results: Dict[str, Any] = {}
        
    def register_agent(self, agent: BaseAgent):
        """Register an agent with the orchestrator"""
        self.agents[agent.role] = agent
    
    async def route_message(self, message: AgentMessage):
        """Route messages between agents"""
        if message.recipient in self.agents:
            await self.agents[message.recipient].inbox.put(message)
        else:
            print(f"Warning: No agent found for role {message.recipient}")
    
    async def orchestrate_workflow(self, code: str, workflow: List[AgentRole]) -> Dict[str, Any]:
        """Orchestrate a multi-agent workflow"""
        
        # Initialize workflow
        self.results = {"code": code, "analyses": {}}
        
        # Execute workflow steps
        for agent_role in workflow:
            if agent_role not in self.agents:
                continue
                
            agent = self.agents[agent_role]
            
            # Perform analysis
            analysis_result = await agent.analyze(code)
            self.results["analyses"][agent_role.value] = analysis_result
            
            # Check if any agent requests collaboration
            if "requires_collaboration" in analysis_result:
                for collaborator in analysis_result["requires_collaboration"]:
                    await agent.send_message(
                        collaborator,
                        {"code": code, "context": analysis_result},
                        "collaboration_request"
                    )
        
        # Aggregate results
        final_results = await self.aggregate_results()
        
        return final_results
    
    async def aggregate_results(self) -> Dict[str, Any]:
        """Aggregate results from all agents"""
        
        aggregated = {
            "overall_score": 0,
            "critical_issues": [],
            "recommendations": [],
            "automated_fixes": []
        }
        
        # Calculate overall code quality score
        scores = []
        for agent_role, analysis in self.results["analyses"].items():
            if "score" in analysis:
                scores.append(analysis["score"])
        
        if scores:
            aggregated["overall_score"] = sum(scores) / len(scores)
        
        # Collect critical issues
        for agent_role, analysis in self.results["analyses"].items():
            if "critical_issues" in analysis:
                aggregated["critical_issues"].extend(analysis["critical_issues"])
        
        # Prioritize recommendations
        all_recommendations = []
        for agent_role, analysis in self.results["analyses"].items():
            if "recommendations" in analysis:
                for rec in analysis["recommendations"]:
                    rec["source"] = agent_role
                    all_recommendations.append(rec)
        
        # Sort by priority
        aggregated["recommendations"] = sorted(
            all_recommendations,
            key=lambda x: x.get("priority", 0),
            reverse=True
        )[:10]  # Top 10 recommendations
        
        return aggregated

# Concrete agent implementations
class CodeReviewAgentImpl(BaseAgent):
    def __init__(self, orchestrator):
        super().__init__(AgentRole.CODE_REVIEWER, orchestrator)
    
    async def analyze(self, code: str) -> Dict[str, Any]:
        # Implement code review logic
        return {
            "score": 85,
            "issues": [
                {"type": "naming", "severity": "low", "line": 10},
                {"type": "complexity", "severity": "medium", "line": 25}
            ],
            "recommendations": [
                {"text": "Refactor complex function", "priority": 7}
            ]
        }
    
    async def process_message(self, message: AgentMessage) -> Optional[AgentMessage]:
        # Handle collaboration requests
        if message.message_type == "collaboration_request":
            # Perform additional analysis based on context
            return AgentMessage(
                self.role,
                message.sender,
                {"additional_insights": "..."},
                "collaboration_response"
            )
        return None

# Usage example
async def main():
    # Create orchestrator
    orchestrator = MultiAgentOrchestrator()
    
    # Create and register agents
    code_reviewer = CodeReviewAgentImpl(orchestrator)
    orchestrator.register_agent(code_reviewer)
    
    # Define workflow
    workflow = [
        AgentRole.CODE_REVIEWER,
        AgentRole.SECURITY_SCANNER,
        AgentRole.PERFORMANCE_OPTIMIZER,
        AgentRole.TEST_GENERATOR
    ]
    
    # Execute workflow
    code = """
    def process_data(items):
        result = []
        for item in items:
            if item > 0:
                result.append(item * 2)
        return result
    """
    
    results = await orchestrator.orchestrate_workflow(code, workflow)
    print(json.dumps(results, indent=2))

# Run
asyncio.run(main())
```

## 🚀 Next Steps

1. **Customize agents** for your specific use cases
2. **Integrate with CI/CD** pipelines
3. **Train agents** on your codebase patterns
4. **Create domain-specific** agents
5. **Implement feedback loops** for continuous improvement 