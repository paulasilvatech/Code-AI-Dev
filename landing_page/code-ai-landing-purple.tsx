import { useState, useEffect } from 'react';
import { ChevronRight, Clock, Users, Zap, Check, ExternalLink, Star, Book, Code, Cpu, ArrowRight, Menu, X, GitBranch, Shield, Rocket } from 'lucide-react';

const LandingPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const modules = [
    { id: 1, title: "Introduction to AI-Powered DevOps", duration: "30 min", level: "Basic" },
    { id: 2, title: "Setting Up Your AI Development Environment", duration: "45 min", level: "Basic" },
    { id: 3, title: "Building Your First AI Agent", duration: "60 min", level: "Intermediate" },
    { id: 4, title: "Multi-Agent Orchestration", duration: "90 min", level: "Intermediate" },
    { id: 5, title: "Advanced AI DevOps Patterns", duration: "90 min", level: "Advanced" },
    { id: 6, title: "Real-World Implementation", duration: "120 min", level: "Advanced" },
    { id: 7, title: "Production Optimization", duration: "90 min", level: "Advanced" },
    { id: 8, title: "Hands-On Challenge Labs", duration: "120 min", level: "Advanced" }
  ];

  const benefits = [
    { metric: "50-70%", description: "Reduction in routine tasks" },
    { metric: "40%", description: "Improvement in code quality" },
    { metric: "35%", description: "Faster feature delivery" },
    { metric: "60%", description: "Less security vulnerabilities" }
  ];

  const maturityStages = [
    { stage: "Manual", description: "Traditional development processes", icon: "⚙️" },
    { stage: "Assisted", description: "AI-powered code completion", icon: "🤖" },
    { stage: "Augmented", description: "Intelligent workflows", icon: "⚡" },
    { stage: "Autonomous", description: "Self-optimizing systems", icon: "🚀" }
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
      title: "Design-to-Code",
      description: "Transform Figma designs into production-ready code with AI assistance",
      link: "https://github.com/paulasilvatech/Design-to-Code-Dev"
    },
    {
      title: "AI Code Development",
      description: "Leverage AI tools to optimize and improve code quality in enterprise environments",
      link: "https://github.com/paulasilvatech/Code-AI-Dev"
    },
    {
      title: "Agentic Operations",
      description: "Implement comprehensive observability solutions for cloud applications",
      link: "https://github.com/paulasilvatech/Agentic-Ops-Dev"
    }
  ];

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
              <a href="#stages" className="hover:text-purple-400 transition-colors">Maturity Stages</a>
              <a href="#start" className="hover:text-purple-400 transition-colors">Get Started</a>
              <a href="https://github.com/paulasilvatech/Code-AI-Dev" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-1 bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg transition-colors">
                <Star className="w-4 h-4" />
                <span>Star on GitHub</span>
              </a>
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
              <a href="#stages" className="block px-3 py-2 hover:bg-gray-800 rounded-md">Maturity Stages</a>
              <a href="#start" className="block px-3 py-2 hover:bg-gray-800 rounded-md">Get Started</a>
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
          <div className="flex justify-center mb-6">
            <span className="bg-purple-600/20 text-purple-300 px-4 py-2 rounded-full text-sm font-medium backdrop-blur-sm">
              🚀 Enterprise AI-Assisted Development Workshop
            </span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
            AI-Powered Code Development
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Transform your development workflow with GitHub Copilot, Azure AI, and agentic DevOps practices for enterprise-scale applications.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="https://code-ai.dev" target="_blank" rel="noopener noreferrer" className="group bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-4 rounded-lg font-semibold flex items-center justify-center space-x-2 transition-all transform hover:scale-105">
              <span>Visit Workshop Website</span>
              <ExternalLink className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <a href="#start" className="bg-gray-800 hover:bg-gray-700 text-white px-8 py-4 rounded-lg font-semibold flex items-center justify-center space-x-2 transition-all">
              <span>Get Started</span>
              <ChevronRight className="w-5 h-5" />
            </a>
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

      {/* Developer Time Stats Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="bg-gradient-to-br from-purple-600/20 to-pink-600/20 rounded-2xl p-8 md:p-12 backdrop-blur-sm">
            <h3 className="text-2xl md:text-3xl font-bold mb-8 text-center">The Developer Productivity Challenge</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-purple-400 mb-2">60%</div>
                <p className="text-gray-300">Time on non-coding tasks</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-pink-400 mb-2">30%</div>
                <p className="text-gray-300">Maintaining existing code</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-violet-400 mb-2">10%</div>
                <p className="text-gray-300">Writing new value code</p>
              </div>
            </div>
            <p className="text-center mt-8 text-lg text-gray-300">
              AI-assisted development helps shift this balance towards value creation
            </p>
          </div>
        </div>
      </section>

      {/* Business Impact Section */}
      <section id="impact" className="py-20 px-4 bg-gray-900/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Business Impact</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
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

      {/* Maturity Stages Section */}
      <section id="stages" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">AI Adoption Maturity Stages</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Progress through four stages of AI-enhanced development maturity
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {maturityStages.map((stage, index) => (
              <div key={index} className="relative">
                <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 hover:bg-gray-800/70 transition-all">
                  <div className="text-4xl mb-4">{stage.icon}</div>
                  <h3 className="text-xl font-semibold mb-2 text-purple-400">{stage.stage}</h3>
                  <p className="text-gray-300 text-sm">{stage.description}</p>
                </div>
                {index < maturityStages.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 transform -translate-y-1/2">
                    <ArrowRight className="w-6 h-6 text-purple-400" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modules Section */}
      <section id="modules" className="py-20 px-4 bg-gray-900/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Workshop Modules</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Comprehensive learning path for AI-powered development mastery
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {modules.map((module) => (
              <div key={module.id} className="group bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 hover:bg-gray-800/70 transition-all hover:transform hover:scale-105">
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

      {/* Getting Started Section */}
      <section id="start" className="py-20 px-4 bg-gray-900/50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Start Your AI Development Journey</h2>
          <p className="text-xl text-gray-300 mb-12">
            Begin transforming your development workflow in just a few steps
          </p>

          <div className="space-y-6 text-left">
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6">
              <div className="flex items-start space-x-4">
                <span className="bg-purple-600 text-white w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-semibold">1</span>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-2">Fork and Clone the Repository</h3>
                  <code className="bg-gray-900 px-4 py-2 rounded-md text-sm block overflow-x-auto">
                    git clone https://github.com/paulasilvatech/Code-AI-Dev.git
                  </code>
                </div>
              </div>
            </div>

            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6">
              <div className="flex items-start space-x-4">
                <span className="bg-purple-600 text-white w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-semibold">2</span>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-2">Quick Start (30 minutes)</h3>
                  <p className="text-gray-300">Follow the Quick Start Guide for your first AI-assisted optimization</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6">
              <div className="flex items-start space-x-4">
                <span className="bg-purple-600 text-white w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-semibold">3</span>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-2">Follow the Workshop Structure</h3>
                  <p className="text-gray-300">Start with Pre-Workshop Preparation and progress through modules</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6">
              <div className="flex items-start space-x-4">
                <span className="bg-purple-600 text-white w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-semibold">4</span>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-2">Practice with Challenge Labs</h3>
                  <p className="text-gray-300">Apply your skills with real-world Java and .NET examples</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12">
            <a href="https://github.com/paulasilvatech/Code-AI-Dev" target="_blank" rel="noopener noreferrer" className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-4 rounded-lg font-semibold transition-all transform hover:scale-105">
              <span>View on GitHub</span>
              <ExternalLink className="w-5 h-5" />
            </a>
          </div>
        </div>
      </section>

      {/* Related Repositories */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Related Resources</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Explore our comprehensive ecosystem of AI-powered development workshops
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {relatedRepos.map((repo, index) => (
              <a key={index} href={repo.link} target="_blank" rel="noopener noreferrer" className="group bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 hover:bg-gray-800/70 transition-all hover:transform hover:scale-105">
                <div className="flex items-start justify-between mb-4">
                  <Book className="w-8 h-8 text-purple-400" />
                  <ExternalLink className="w-5 h-5 text-gray-400 group-hover:text-purple-400 transition-colors" />
                </div>
                <h3 className="text-xl font-semibold mb-2 group-hover:text-purple-400 transition-colors">
                  {repo.title}
                </h3>
                <p className="text-gray-300">
                  {repo.description}
                </p>
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
            , Developer Productivity Global Black Belt at Microsoft Americas
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