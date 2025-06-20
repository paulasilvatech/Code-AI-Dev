import { useState, useEffect } from 'react';
import { Clock, Users, Zap, Check, ExternalLink, Star, Book, Code, Cpu, Menu, X, GitBranch, Shield, Rocket, Lock, AlertTriangle, ChevronRight } from 'lucide-react';

// Custom AI Code Development Logo Component
const AICodeLogo = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="codeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#8B5CF6" />
        <stop offset="50%" stopColor="#EC4899" />
        <stop offset="100%" stopColor="#F59E0B" />
      </linearGradient>
      <linearGradient id="brainGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#10B981" />
        <stop offset="100%" stopColor="#3B82F6" />
      </linearGradient>
    </defs>
    
    {/* Background Circle */}
    <circle cx="60" cy="60" r="55" fill="url(#codeGradient)" opacity="0.1" />
    
    {/* AI Brain Structure */}
    <path d="M30 45 Q45 30 60 45 Q75 30 90 45 Q90 60 75 75 Q60 90 45 75 Q30 60 30 45 Z" 
          fill="url(#brainGradient)" opacity="0.3" />
    
    {/* Code Brackets */}
    <path d="M25 35 L15 45 L15 55 L25 65" stroke="url(#codeGradient)" strokeWidth="4" fill="none" strokeLinecap="round" />
    <path d="M95 35 L105 45 L105 55 L95 65" stroke="url(#codeGradient)" strokeWidth="4" fill="none" strokeLinecap="round" />
    
    {/* Neural Network Nodes */}
    <circle cx="45" cy="40" r="3" fill="#8B5CF6" />
    <circle cx="60" cy="35" r="3" fill="#EC4899" />
    <circle cx="75" cy="40" r="3" fill="#F59E0B" />
    <circle cx="40" cy="60" r="3" fill="#10B981" />
    <circle cx="60" cy="65" r="3" fill="#3B82F6" />
    <circle cx="80" cy="60" r="3" fill="#8B5CF6" />
    
    {/* Connection Lines */}
    <line x1="45" y1="40" x2="60" y2="35" stroke="url(#codeGradient)" strokeWidth="2" opacity="0.6" />
    <line x1="60" y1="35" x2="75" y2="40" stroke="url(#codeGradient)" strokeWidth="2" opacity="0.6" />
    <line x1="45" y1="40" x2="40" y2="60" stroke="url(#codeGradient)" strokeWidth="2" opacity="0.6" />
    <line x1="75" y1="40" x2="80" y2="60" stroke="url(#codeGradient)" strokeWidth="2" opacity="0.6" />
    <line x1="40" y1="60" x2="60" y2="65" stroke="url(#codeGradient)" strokeWidth="2" opacity="0.6" />
    <line x1="60" y1="65" x2="80" y2="60" stroke="url(#codeGradient)" strokeWidth="2" opacity="0.6" />
    
    {/* Central AI Core */}
    <circle cx="60" cy="50" r="8" fill="url(#codeGradient)" />
    <text x="60" y="55" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">AI</text>
  </svg>
);

const LandingPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [selectedModule, setSelectedModule] = useState<any>(null);
  const [formData, setFormData] = useState({
    email: '',
    fullName: '',
    company: '',
    jobTitle: '',
    githubUsername: '',
    moduleInterest: [] as string[],
    message: '',
    gdprConsent: false
  });
  const [formStatus, setFormStatus] = useState({ type: '', message: '' });
  const [emailVerificationStep, setEmailVerificationStep] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const [enteredCode, setEnteredCode] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const modules = [
    { 
      id: 1, 
      title: "Introduction to AI-Powered DevOps", 
      duration: "30 min", 
      level: "Basic",
      description: "Discover how AI transforms traditional development workflows with intelligent automation, code assistance, and predictive analytics.",
      objectives: [
        "Understand AI's role in modern development",
        "Identify automation opportunities in your workflow",
        "Learn GitHub Copilot fundamentals"
      ],
      technologies: ["GitHub Copilot", "Azure AI", "VS Code", "Git"],
      exercises: "2 hands-on exercises including setting up AI-assisted code completion and exploring intelligent suggestions"
    },
    { 
      id: 2, 
      title: "Setting Up Your AI Development Environment", 
      duration: "45 min", 
      level: "Basic",
      description: "Configure your complete AI-enhanced development environment with GitHub Copilot, Azure AI services, and essential tools.",
      objectives: [
        "Set up GitHub Copilot and Azure AI services",
        "Configure VS Code for AI-assisted development",
        "Establish secure authentication workflows"
      ],
      technologies: ["GitHub Copilot", "Azure AI Services", "VS Code Extensions", "Azure CLI"],
      exercises: "3 guided setup exercises including environment validation and first AI-generated code snippets"
    },
    { 
      id: 3, 
      title: "Building Your First AI Agent", 
      duration: "60 min", 
      level: "Intermediate",
      description: "Create your first autonomous AI agent that can analyze code, suggest improvements, and automate routine development tasks.",
      objectives: [
        "Design and implement a basic AI agent",
        "Integrate with GitHub APIs for code analysis",
        "Implement automated code review workflows"
      ],
      technologies: ["Python", "GitHub API", "Azure OpenAI", "LangChain"],
      exercises: "4 progressive exercises building from simple scripts to a functional code analysis agent"
    },
    { 
      id: 4, 
      title: "Multi-Agent Orchestration", 
      duration: "90 min", 
      level: "Intermediate",
      description: "Orchestrate multiple AI agents working together to handle complex development workflows with intelligent task distribution.",
      objectives: [
        "Design multi-agent system architectures",
        "Implement agent communication protocols",
        "Create coordinated workflow automation"
      ],
      technologies: ["Multi-Agent Frameworks", "Message Queues", "Docker", "Kubernetes"],
      exercises: "5 collaborative exercises demonstrating agent coordination for CI/CD pipeline automation"
    },
    { 
      id: 5, 
      title: "Advanced AI DevOps Patterns", 
      duration: "90 min", 
      level: "Advanced",
      description: "Implement sophisticated AI-driven DevOps patterns including predictive deployments, intelligent monitoring, and self-healing systems.",
      objectives: [
        "Implement predictive deployment strategies",
        "Build intelligent monitoring and alerting",
        "Create self-healing infrastructure patterns"
      ],
      technologies: ["Azure Monitor", "Prometheus", "Terraform", "Azure DevOps"],
      exercises: "6 advanced scenarios including predictive scaling and automated incident response"
    },
    { 
      id: 6, 
      title: "Real-World Implementation", 
      duration: "120 min", 
      level: "Advanced",
      description: "Apply AI-powered development practices to real enterprise scenarios with complex microservices architectures and production constraints.",
      objectives: [
        "Implement AI solutions in enterprise environments",
        "Handle production deployment considerations",
        "Optimize for performance and reliability"
      ],
      technologies: ["Microservices", "Azure Container Apps", "Service Mesh", "APM Tools"],
      exercises: "7 comprehensive exercises using real-world microservices applications and production scenarios"
    },
    { 
      id: 7, 
      title: "Production Optimization", 
      duration: "90 min", 
      level: "Advanced",
      description: "Optimize AI-assisted development workflows for production environments with focus on performance, security, and maintainability.",
      objectives: [
        "Optimize AI workflows for production scale",
        "Implement security best practices",
        "Monitor and maintain AI-driven systems"
      ],
      technologies: ["Azure Security Center", "Application Insights", "Log Analytics", "Key Vault"],
      exercises: "5 optimization exercises focusing on performance tuning and security hardening"
    },
    { 
      id: 8, 
      title: "Hands-On Challenge Labs", 
      duration: "120 min", 
      level: "Advanced",
      description: "Complete comprehensive challenge scenarios that test your mastery of AI-powered development across multiple technologies and use cases.",
      objectives: [
        "Demonstrate end-to-end AI development mastery",
        "Solve complex multi-technology challenges",
        "Present and defend architecture decisions"
      ],
      technologies: ["Full Technology Stack", "Integration Patterns", "Best Practices", "Documentation"],
      exercises: "8+ comprehensive challenge labs with Java, .NET, Python, and cloud-native scenarios"
    }
  ];

  const benefits = [
    { metric: "50-70%", description: "Reduction in routine tasks" },
    { metric: "40%", description: "Improvement in code quality" },
    { metric: "35%", description: "Faster feature delivery" },
    { metric: "60%", description: "Less security vulnerabilities" }
  ];

  const prerequisites = [
    "Azure Free Account",
    "GitHub account with Copilot",
    "VS Code installed",
    "Git installed",
    "Node.js/Java/.NET environment",
    "Basic programming knowledge"
  ];

  const relatedRepos = [
    {
      title: "Design-to-Code Development",
      description: "Transform Figma designs into production-ready code with AI assistance and automated workflows",
      link: "https://paulasilvatech.github.io/Design-to-Code-Dev",
      tag: "AI Design Automation"
    },
    {
      title: "Secure Code AI Development", 
      description: "Build secure applications with AI-powered security analysis and vulnerability detection",
      link: "https://paulasilvatech.github.io/Secure-Code-AI-Dev",
      tag: "Security & AI"
    },
    {
      title: "Agentic Operations Development",
      description: "Implement autonomous operations and comprehensive observability with AI agents",
      link: "https://paulasilvatech.github.io/Agentic-Ops-Dev",
      tag: "AI Operations"
    },
    {
      title: "Figma-to-Code Development",
      description: "Convert Figma designs directly to functional code using advanced AI automation",
      link: "https://paulasilvatech.github.io/Figma-to-Code-Dev",
      tag: "Design Automation"
    }
  ];

  // Form validation functions
  const validateCorporateEmail = (email: string) => {
    const personalDomains = ['gmail.com', 'hotmail.com', 'yahoo.com', 'outlook.com'];
    const domain = email.split('@')[1];
    return domain && !personalDomains.includes(domain.toLowerCase());
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = 'checked' in e.target ? e.target.checked : false;
    
    if (type === 'checkbox') {
      if (name === 'moduleInterest') {
        setFormData(prev => ({
          ...prev,
          [name]: checked 
            ? [...(prev[name as keyof typeof prev] as string[]), value]
            : (prev[name as keyof typeof prev] as string[]).filter((item: string) => item !== value)
        }));
      } else {
        setFormData(prev => ({ ...prev, [name]: checked }));
      }
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const generateVerificationCode = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };

  const sendNotificationEmail = (data: typeof formData) => {
    // In production, this would send an actual email to paulasilva@microsoft.com
    const emailContent = `
New Workshop Access Request

Full Name: ${data.fullName}
Email: ${data.email}
Company: ${data.company}
Job Title: ${data.jobTitle}
GitHub Username: ${data.githubUsername}
Modules of Interest: ${data.moduleInterest.join(', ')}
Message: ${data.message || 'N/A'}

Submitted at: ${new Date().toISOString()}
    `;
    console.log('Email to paulasilva@microsoft.com:', emailContent);
  };

  const sendConfirmationEmail = (email: string) => {
    // In production, this would send an actual confirmation email
    const confirmationContent = `
Thank you for your interest in the AI Code Development Workshop.

Your access request has been received and is being reviewed. You can expect a response within 48 hours.

If you have any urgent questions, please contact paulasilva@microsoft.com

Best regards,
AI Code Development Team
    `;
    console.log('Confirmation email to:', email, confirmationContent);
  };

  const handleFormSubmit = (e: any) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.email || !formData.fullName || !formData.company || !formData.jobTitle || !formData.githubUsername) {
      setFormStatus({ type: 'error', message: 'Please fill in all required fields.' });
      return;
    }
    
    // Validate corporate email
    if (!validateCorporateEmail(formData.email)) {
      setFormStatus({ type: 'error', message: 'Please use a corporate email address.' });
      return;
    }
    
    // Validate GDPR consent
    if (!formData.gdprConsent) {
      setFormStatus({ type: 'error', message: 'Please agree to the data processing terms.' });
      return;
    }

    // If not verified, send verification code
    if (!emailVerificationStep) {
      const code = generateVerificationCode();
      setVerificationCode(code);
      setEmailVerificationStep(true);
      setFormStatus({ 
        type: 'info', 
        message: `A verification code has been sent to ${formData.email}. Please enter it below.` 
      });
      // In production, send actual email with code
      console.log('Verification code:', code);
      return;
    }

    // Verify the code
    if (enteredCode !== verificationCode) {
      setFormStatus({ type: 'error', message: 'Invalid verification code. Please try again.' });
      return;
    }
    
    // Submit form
    setFormStatus({ type: 'loading', message: 'Submitting your request...' });
    
    setTimeout(() => {
      // Send notification email to Paula
      sendNotificationEmail(formData);
      // Send confirmation email to requester
      sendConfirmationEmail(formData.email);
      
      setFormStatus({ 
        type: 'success', 
        message: 'Request submitted successfully! You will receive a confirmation email shortly. We will respond within 48 hours.' 
      });
      
      // Reset form
      setEmailVerificationStep(false);
      setVerificationCode('');
      setEnteredCode('');
    }, 2000);
  };

  const scrollToAccessForm = () => {
    document.getElementById('access-request')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-pink-900 text-white">
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-gray-900/95 backdrop-blur-md shadow-lg' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Code className="w-8 h-8 text-purple-400" />
              <span className="text-xl font-bold">AI Code Development</span>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <a href="#modules" className="hover:text-purple-400 transition-colors">Modules</a>
              <a href="#impact" className="hover:text-purple-400 transition-colors">Impact</a>
              <a href="#prerequisites" className="hover:text-purple-400 transition-colors">Prerequisites</a>
              <a href="#start" className="hover:text-purple-400 transition-colors">Get Started</a>
              <button onClick={scrollToAccessForm} className="flex items-center space-x-1 bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg transition-colors">
                <Star className="w-4 h-4" />
                <span>Request Access</span>
              </button>
            </div>

            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden">
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-gray-900/95 backdrop-blur-md">
            <div className="px-4 pt-2 pb-3 space-y-1">
              <a href="#modules" className="block px-3 py-2 hover:bg-gray-800 rounded-md">Modules</a>
              <a href="#impact" className="block px-3 py-2 hover:bg-gray-800 rounded-md">Impact</a>
              <a href="#prerequisites" className="block px-3 py-2 hover:bg-gray-800 rounded-md">Prerequisites</a>
              <a href="#start" className="block px-3 py-2 hover:bg-gray-800 rounded-md">Get Started</a>
              <button onClick={scrollToAccessForm} className="mt-2 w-full flex items-center justify-center space-x-2 bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg transition-colors">
                <Star className="w-4 h-4" />
                <span>Request Access</span>
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 pt-16">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -inset-[10px] opacity-50">
            <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
            <div className="absolute top-0 -right-4 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
            <div className="absolute -bottom-8 left-20 w-72 h-72 bg-violet-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
          </div>
        </div>

        <div className="relative max-w-4xl mx-auto text-center">
          {/* Logo - Positioned FIRST above everything */}
          <div className="flex justify-center mb-8">
            <AICodeLogo className="w-24 h-24 animate-pulse" />
          </div>
          
          {/* Badge - Second element */}
          <div className="flex justify-center mb-6">
            <span className="bg-purple-600/20 text-purple-300 px-4 py-2 rounded-full text-sm font-medium backdrop-blur-sm">
              🤖 Enterprise AI-Powered Development Workshop
            </span>
          </div>
          
          {/* Title - Third element */}
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
            AI-Powered Code Development
          </h1>
          
          {/* Description - Fourth element */}
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Transform your development workflow with GitHub Copilot, Azure AI, and agentic DevOps practices for enterprise-scale applications.
          </p>
          
          {/* Button - Fifth element */}
          <div className="flex justify-center">
            <button onClick={scrollToAccessForm} className="group bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-12 py-4 rounded-lg font-semibold flex items-center justify-center space-x-3 transition-all transform hover:scale-105 text-lg">
              <span>Request Workshop Access</span>
              <Lock className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <div className="mt-12 flex flex-wrap justify-center gap-8 text-sm text-gray-400">
            <div className="flex items-center space-x-2">
              <Clock className="w-5 h-5" />
              <span>90 min - 3+ hours</span>
            </div>
            <div className="flex items-center space-x-2">
              <Users className="w-5 h-5" />
              <span>Beginner to Advanced</span>
            </div>
            <div className="flex items-center space-x-2">
              <Zap className="w-5 h-5" />
              <span>Hands-on Learning</span>
            </div>
          </div>
        </div>
      </section>

      {/* Modules Section */}
      <section id="modules" className="py-20 px-4 bg-gray-900/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Workshop Modules</h2>
            <p className="text-xl text-gray-300">
              Comprehensive learning path for AI-powered development mastery
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {modules.map((module) => (
              <div 
                key={module.id} 
                onClick={() => setSelectedModule(module)}
                className="group bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 hover:bg-gray-800/70 transition-all hover:transform hover:scale-105 cursor-pointer"
              >
                <div className="flex items-start justify-between mb-4">
                  <span className="text-3xl font-bold text-gray-600">0{module.id}</span>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    module.level === 'Basic' ? 'bg-green-600/20 text-green-300' :
                    module.level === 'Intermediate' ? 'bg-yellow-600/20 text-yellow-300' :
                    'bg-red-600/20 text-red-300'
                  }`}>
                    {module.level}
                  </span>
                </div>
                <h3 className="text-xl font-semibold mb-2 group-hover:text-purple-400 transition-colors">
                  {module.title}
                </h3>
                <div className="flex items-center text-gray-400 text-sm">
                  <Clock className="w-4 h-4 mr-1" />
                  <span>{module.duration}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Module Modal */}
      {selectedModule && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50" onClick={() => setSelectedModule(null)}>
          <div className="bg-gray-800 rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-start mb-6">
              <div className="flex items-center space-x-4">
                <span className="text-4xl font-bold text-purple-400">0{selectedModule.id}</span>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  selectedModule.level === 'Basic' ? 'bg-green-600/20 text-green-300' :
                  selectedModule.level === 'Intermediate' ? 'bg-yellow-600/20 text-yellow-300' :
                  'bg-red-600/20 text-red-300'
                }`}>
                  {selectedModule.level}
                </span>
              </div>
              <button 
                onClick={() => setSelectedModule(null)} 
                className="text-gray-400 hover:text-white"
                aria-label="Close modal"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <h2 className="text-2xl font-bold mb-4 text-white">{selectedModule.title}</h2>
            
            <div className="flex items-center mb-4 text-gray-300">
              🕐 <span className="ml-2">{selectedModule.duration}</span>
            </div>
            
            <p className="text-gray-300 mb-6">{selectedModule.description}</p>
            
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-3 text-white">
                🎯 Learning Objectives
              </h3>
              <ul className="space-y-2">
                {selectedModule.objectives.map((objective: string, index: number) => (
                  <li key={index} className="flex items-start space-x-2 text-gray-300">
                    <span className="text-green-400 flex-shrink-0">✓</span>
                    <span>{objective}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-3 text-white">
                ⚙️ Technologies & Tools
              </h3>
              <div className="flex flex-wrap gap-2">
                {selectedModule.technologies.map((tech: string, index: number) => (
                  <span key={index} className="bg-purple-600/20 text-purple-300 px-3 py-1 rounded-full text-sm font-medium">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-3 text-white flex items-center">
                💻 Hands-on Exercises
              </h3>
              <p className="text-gray-300">{selectedModule.exercises}</p>
            </div>
            
            <button 
              onClick={() => {
                setSelectedModule(null);
                scrollToAccessForm();
              }}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 py-3 rounded-lg font-semibold flex items-center justify-center space-x-2 transition-all"
            >
              <span>🔒 Request Access</span>
            </button>
          </div>
        </div>
      )}

      {/* Key Impact Section */}
      <section id="impact" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Key Impact</h2>
            <p className="text-xl text-gray-300">
              Organizations implementing AI-assisted development report transformative results
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 text-center transform hover:scale-105 transition-all">
                <div className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 mb-2">
                  {benefit.metric}
                </div>
                <p className="text-gray-300">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Prerequisites Section */}
      <section id="prerequisites" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">Prerequisites</h2>
              <p className="text-xl text-gray-300 mb-8">
                Essential tools and knowledge for your AI development journey. All tools have free tiers available.
              </p>
              <ul className="space-y-4">
                {prerequisites.map((prereq, index) => (
                  <li key={index} className="flex items-center space-x-3">
                    <Check className="w-5 h-5 text-green-400 flex-shrink-0" />
                    <span className="text-lg">{prereq}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gradient-to-br from-purple-600/20 to-pink-600/20 rounded-xl p-6 backdrop-blur-sm">
                <GitBranch className="w-12 h-12 text-purple-400 mb-3" />
                <h3 className="text-lg font-semibold mb-2">Version Control</h3>
                <p className="text-gray-300 text-sm">Master Git workflows with AI assistance</p>
              </div>
              <div className="bg-gradient-to-br from-pink-600/20 to-purple-600/20 rounded-xl p-6 backdrop-blur-sm">
                <Shield className="w-12 h-12 text-pink-400 mb-3" />
                <h3 className="text-lg font-semibold mb-2">Secure Coding</h3>
                <p className="text-gray-300 text-sm">AI-powered security vulnerability detection</p>
              </div>
              <div className="bg-gradient-to-br from-violet-600/20 to-purple-600/20 rounded-xl p-6 backdrop-blur-sm">
                <Rocket className="w-12 h-12 text-violet-400 mb-3" />
                <h3 className="text-lg font-semibold mb-2">Performance</h3>
                <p className="text-gray-300 text-sm">Optimize code performance with AI insights</p>
              </div>
              <div className="bg-gradient-to-br from-purple-600/20 to-violet-600/20 rounded-xl p-6 backdrop-blur-sm">
                <Cpu className="w-12 h-12 text-purple-400 mb-3" />
                <h3 className="text-lg font-semibold mb-2">AI Agents</h3>
                <p className="text-gray-300 text-sm">Build autonomous development workflows</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Access Request Form Section */}
      <section id="access-request" className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Request Workshop Access</h2>
            <p className="text-xl text-gray-300">
              Submit your request for access to our enterprise AI development workshop materials
            </p>
          </div>

          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8">
            <form onSubmit={handleFormSubmit} className="space-y-6">
              {!emailVerificationStep ? (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">Corporate Email *</label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white"
                        placeholder="your.email@company.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Full Name *</label>
                      <input
                        type="text"
                        name="fullName"
                        required
                        value={formData.fullName}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white"
                        placeholder="John Smith"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">Company Name *</label>
                      <input
                        type="text"
                        name="company"
                        required
                        value={formData.company}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white"
                        placeholder="Your Company"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Job Title *</label>
                      <input
                        type="text"
                        name="jobTitle"
                        required
                        value={formData.jobTitle}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white"
                        placeholder="Senior Developer"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">GitHub Username *</label>
                    <input
                      type="text"
                      name="githubUsername"
                      required
                      value={formData.githubUsername}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white"
                      placeholder="@yourusername"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Modules of Interest</label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {modules.map((module) => (
                        <label key={module.id} className="flex items-center">
                          <input
                            type="checkbox"
                            name="moduleInterest"
                            value={module.title}
                            checked={formData.moduleInterest.includes(module.title)}
                            onChange={handleInputChange}
                            className="mr-2 text-purple-600"
                            title={`Select ${module.title}`}
                          />
                          <span className="text-sm">{module.title}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Message / Additional Requirements</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={4}
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white"
                      placeholder="Tell us about your specific requirements or questions..."
                    />
                  </div>

                  <div className="flex items-start space-x-3">
                    <input
                      type="checkbox"
                      name="gdprConsent"
                      checked={formData.gdprConsent}
                      onChange={handleInputChange}
                      className="mt-1 text-purple-600"
                      required
                      title="GDPR consent for data processing"
                    />
                    <label className="text-sm text-gray-300">
                      I agree to the processing of my personal data for the purpose of this workshop access request and related communications. *
                    </label>
                  </div>
                </>
              ) : (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Enter Verification Code *</label>
                    <input
                      type="text"
                      value={enteredCode}
                      onChange={(e) => setEnteredCode(e.target.value)}
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white text-center font-mono text-xl"
                      placeholder="000000"
                      maxLength={6}
                    />
                    <p className="text-sm text-gray-400 mt-2">
                      Please enter the 6-digit code sent to {formData.email}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setEmailVerificationStep(false);
                      setFormStatus({ type: '', message: '' });
                    }}
                    className="text-purple-400 hover:text-purple-300 text-sm"
                  >
                    ← Back to form
                  </button>
                </div>
              )}

              {formStatus.message && (
                <div className={`p-4 rounded-lg ${
                  formStatus.type === 'error' ? 'bg-red-600/20 text-red-300' :
                  formStatus.type === 'success' ? 'bg-green-600/20 text-green-300' :
                  formStatus.type === 'info' ? 'bg-blue-600/20 text-blue-300' :
                  'bg-purple-600/20 text-purple-300'
                }`}>
                  {formStatus.message}
                </div>
              )}

              <button
                type="submit"
                disabled={formStatus.type === 'loading'}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:opacity-50 text-white px-8 py-4 rounded-lg font-semibold transition-all transform hover:scale-105"
              >
                {formStatus.type === 'loading' ? 'Submitting...' : 
                 emailVerificationStep ? 'Verify & Submit' : 'Continue'}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Getting Started Section */}
      <section id="start" className="py-20 px-4 bg-gray-900/50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Get Started</h2>
          <p className="text-xl text-gray-300 mb-12">
            Begin transforming your development workflow in just a few steps
          </p>

          {/* Warning Notice */}
          <div className="bg-yellow-600/20 border border-yellow-600/30 rounded-lg p-4 mb-8 flex items-start space-x-3">
            <AlertTriangle className="w-6 h-6 text-yellow-400 flex-shrink-0 mt-1" />
            <div className="text-left">
              <p className="text-yellow-300 font-medium">Access Required</p>
              <p className="text-yellow-200 text-sm">
                These instructions only work if you already have approved access to the repository. 
                If you don't have access yet, please complete the access request form above.
              </p>
            </div>
          </div>

          <div className="space-y-6 text-left">
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6">
              <div className="flex items-start space-x-4">
                <span className="bg-purple-600 text-white w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-semibold">1</span>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-2">Submit Access Request Form</h3>
                  <p className="text-gray-300">Complete the access request form above to begin the approval process</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6">
              <div className="flex items-start space-x-4">
                <span className="bg-purple-600 text-white w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-semibold">2</span>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-2">Schedule Technical Consultation</h3>
                  <p className="text-gray-300">Our team will contact you to discuss your requirements and schedule a consultation</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6">
              <div className="flex items-start space-x-4">
                <span className="bg-purple-600 text-white w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-semibold">3</span>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-2">Receive Repository Access</h3>
                  <p className="text-gray-300">Once approved, you'll receive access to the private repository and workshop materials</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6">
              <div className="flex items-start space-x-4">
                <span className="bg-purple-600 text-white w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-semibold">4</span>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-2">Begin Your Workshop Journey</h3>
                  <p className="text-gray-300 mb-3">Once you have approved access:</p>
                  <code className="bg-gray-900 px-4 py-2 rounded-md text-sm block overflow-x-auto">
                    git clone https://github.com/paulasilvatech/Code-AI-Dev.git
                  </code>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12">
            <button onClick={scrollToAccessForm} className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-4 rounded-lg font-semibold transition-all transform hover:scale-105">
              <span>Request Access</span>
              <Lock className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* Related Workshops */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Related Workshops</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Explore our comprehensive ecosystem of AI-powered development workshops and training programs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {relatedRepos.map((repo, index) => (
              <a key={index} href={repo.link} target="_blank" rel="noopener noreferrer" className="group bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 hover:bg-gray-800/70 transition-all hover:transform hover:scale-105">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex flex-col">
                    <Book className="w-8 h-8 text-purple-400 mb-2" />
                    <span className="text-xs px-2 py-1 bg-purple-600/20 text-purple-300 rounded-full font-medium">
                      {repo.tag}
                    </span>
                  </div>
                  <ExternalLink className="w-5 h-5 text-gray-400 group-hover:text-purple-400 transition-colors" />
                </div>
                <h3 className="text-lg font-semibold mb-3 group-hover:text-purple-400 transition-colors leading-tight">
                  {repo.title}
                </h3>
                <p className="text-gray-300 mb-4 text-sm leading-relaxed">
                  {repo.description}
                </p>
                <div className="flex items-center text-purple-400 text-sm font-medium">
                  <span>Visit Workshop</span>
                  <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-gray-800">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-gray-400 mb-4">
            Developed by{' '}
            <a href="https://github.com/paulasilvatech" target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:text-purple-300">
              Paula Silva
            </a>
            , Developer Productivity Global Black Belt
          </p>
          <p className="text-gray-500">
            Empowering developers with AI-assisted development practices and agentic DevOps workflows
          </p>
        </div>
      </footer>


    </div>
  );
};

export default LandingPage;