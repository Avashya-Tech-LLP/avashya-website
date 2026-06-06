'use client';

import { motion } from 'framer-motion';
import { useState, useRef } from 'react';
import { ArrowRight, Upload, CheckCircle2, Moon, Sun, Menu, X, Loader2, Search, MapPin, Clock, Building2, ChevronRight, Briefcase } from 'lucide-react';
import Image from 'next/image';
import { useEffect } from 'react';

const APPLY_API_URL = 'https://l73ucplj1l.execute-api.us-east-1.amazonaws.com';

interface Job {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  mode: string;
  about: string;
  whatYoullDo: string[];
  whatWereLookingFor: string[];
  bonusPoints: string[];
}

const JOBS: Job[] = [
  {
    id: 'fdse-1',
    title: 'Forward Deployed Software Engineer',
    department: 'ENGINEERING',
    location: 'Bengaluru',
    type: 'Full Time',
    mode: 'Hybrid',
    about: 'You will work directly with enterprise clients to deploy, integrate, and optimize AI systems in production environments. This is not a support role — you will ship code that runs at scale inside client infrastructure, solving problems that require deep technical skill and strong client communication.',
    whatYoullDo: [
      'Deploy and integrate AI agents, RAG pipelines, and LLM-powered workflows into client production environments',
      'Architect solutions that bridge client infrastructure (AWS, Azure, GCP) with Avashya\'s platform capabilities',
      'Debug and optimize deployed AI systems — latency, accuracy, cost efficiency, and reliability',
      'Work directly with engineering and product leaders at client organizations to scope and deliver technical solutions',
      'Build reusable deployment patterns and tooling that accelerate future engagements',
      'Translate ambiguous client requirements into concrete, shippable technical specifications',
    ],
    whatWereLookingFor: [
      'Strong Python and TypeScript — comfortable across the full stack',
      '2+ years shipping production systems, not just prototypes',
      'Experience with AWS services (Lambda, SageMaker, Bedrock, S3, ECS)',
      'Comfort working directly with clients and navigating ambiguity',
      'Understanding of LLM APIs, prompt engineering, and AI system architecture',
      'Strong debugging skills — you can trace issues across distributed systems',
      'Bias toward shipping over perfection',
    ],
    bonusPoints: [
      'Prior consulting or professional services experience',
      'Experience deploying ML models to production (not just training them)',
      'Infrastructure-as-code (Terraform, CDK, CloudFormation)',
      'Familiarity with agent frameworks (LangChain, CrewAI, AutoGen)',
      'Background in DevOps or SRE',
    ],
  },
  {
    id: 'fdse-2',
    title: 'Senior Forward Deployed Software Engineer',
    department: 'ENGINEERING',
    location: 'Bengaluru',
    type: 'Full Time',
    mode: 'Hybrid',
    about: 'You will lead complex client engagements end-to-end — from technical discovery through production deployment and handoff. You will own the engineering relationship with strategic accounts and mentor junior FDSEs on the team.',
    whatYoullDo: [
      'Lead technical delivery for enterprise AI deployments across multiple concurrent engagements',
      'Design system architectures that handle 100K+ users in production client environments',
      'Define and execute the ISDLC (Intend, Structure, Develop, Launch, Continuously Evolve) framework at client sites',
      'Own the technical relationship with VP/CTO-level stakeholders at client organizations',
      'Establish deployment best practices, runbooks, and quality gates for the FDSE team',
      'Contribute back to the core platform based on patterns observed across deployments',
    ],
    whatWereLookingFor: [
      '5+ years of production software engineering experience',
      'Track record of leading technical delivery for enterprise clients',
      'Deep AWS expertise — you can architect and cost-optimize complex cloud deployments',
      'Experience with production AI/ML systems at scale',
      'Strong communication skills — can present technical concepts to non-technical stakeholders',
      'Comfort with ambiguity and high ownership',
      'Undergraduate degree in CS, Engineering, or equivalent experience',
    ],
    bonusPoints: [
      'Prior experience at a consulting firm, systems integrator, or in a solutions architect role',
      'Published work or open-source contributions in AI/ML tooling',
      'Experience with AI governance, security, and compliance frameworks',
      'Multi-cloud architecture experience',
    ],
  },
  {
    id: 'research-scientist',
    title: 'Research Scientist — AI Systems',
    department: 'ENGINEERING',
    location: 'Bengaluru',
    type: 'Full Time',
    mode: 'Hybrid',
    about: 'You will drive research that directly impacts production AI systems — agent orchestration, context optimization, evaluation frameworks, and novel approaches to the Intelligent Software Development Lifecycle. This is applied research with a short path to production.',
    whatYoullDo: [
      'Research and develop novel approaches to AI agent orchestration and multi-agent systems',
      'Design evaluation frameworks that measure Engineering Effectiveness Index across client deployments',
      'Investigate context window optimization techniques — retrieval, compression, and adaptive context management',
      'Prototype new capabilities that extend the ISDLC framework with measurable ROI',
      'Publish findings and contribute to the broader AI engineering community',
      'Collaborate with FDSE team to validate research in production environments',
    ],
    whatWereLookingFor: [
      'MS or PhD in Computer Science, AI/ML, or related field',
      'Strong publication record or demonstrated research output in NLP, LLMs, or AI systems',
      'Hands-on coding ability — you can implement and validate your own research',
      'Experience with LLM fine-tuning, RLHF, or prompt optimization techniques',
      'Strong experimental methodology — hypothesis-driven, metrics-oriented',
      'Comfort bridging research and production engineering',
    ],
    bonusPoints: [
      'Experience with multi-agent systems or agent orchestration frameworks',
      'Background in software engineering productivity research',
      'Prior work on RAG systems, knowledge graphs, or information retrieval',
      'Experience with evaluation and benchmarking of AI systems',
      'Contributions to open-source AI/ML projects',
    ],
  },
  {
    id: 'research-intern',
    title: 'Research Intern — AI Engineering',
    department: 'ENGINEERING',
    location: 'Bengaluru',
    type: 'Internship',
    mode: 'Hybrid',
    about: 'A 6-month research internship focused on applied AI engineering problems. You will work alongside our research scientist and engineering team on projects that ship to production. This is not a paper-writing internship — you will build systems that real enterprises use.',
    whatYoullDo: [
      'Implement and evaluate novel approaches to agent orchestration and context management',
      'Build prototypes that test hypotheses about AI system performance and reliability',
      'Run experiments and analyze results across real production workloads',
      'Contribute to internal tooling for AI system evaluation and monitoring',
      'Present findings to the team and contribute to technical documentation',
    ],
    whatWereLookingFor: [
      'Currently pursuing MS or PhD in CS, AI/ML, or related field',
      'Strong Python skills and familiarity with ML frameworks (PyTorch, HuggingFace)',
      'Experience working with LLMs — fine-tuning, prompting, or evaluation',
      'Ability to read and implement techniques from research papers',
      'Self-directed and comfortable with open-ended problems',
      'Available for at least 6 months',
    ],
    bonusPoints: [
      'Prior publication or research experience',
      'Experience with cloud infrastructure (AWS preferred)',
      'Familiarity with agent frameworks or multi-agent systems',
      'Open-source contributions',
    ],
  },
  {
    id: 'fullstack-1',
    title: 'Full Stack Developer',
    department: 'ENGINEERING',
    location: 'Bengaluru',
    type: 'Full Time',
    mode: 'Hybrid',
    about: 'You will build the internal platform and client-facing applications that power Avashya\'s AI delivery. This includes dashboards, monitoring systems, developer tools, and the infrastructure that our FDSE team uses to deploy and manage AI systems at scale.',
    whatYoullDo: [
      'Build and maintain client-facing dashboards for AI system monitoring and analytics',
      'Develop internal tooling that accelerates AI deployment workflows',
      'Implement APIs and backend services (Node.js, Python) that integrate with AI/ML infrastructure',
      'Build responsive, performant frontend applications (React, Next.js, TypeScript)',
      'Design and maintain databases, caching layers, and event-driven architectures',
      'Collaborate with FDSEs to build reusable components for client deployments',
    ],
    whatWereLookingFor: [
      'Strong TypeScript and React — you can build complex, production-grade UIs',
      'Backend experience with Node.js or Python — REST APIs, async processing, databases',
      'AWS services experience (Lambda, DynamoDB, S3, CloudFront, ECS)',
      '2+ years of full stack production experience',
      'Good design sensibility — you care about UX even without a dedicated designer',
      'Comfort with rapid iteration and shipping frequently',
    ],
    bonusPoints: [
      'Experience building developer tools or internal platforms',
      'Familiarity with AI/ML APIs and integration patterns',
      'Infrastructure-as-code experience (CDK, Terraform)',
      'Experience with real-time systems (WebSockets, SSE)',
      'Background in data visualization or analytics dashboards',
    ],
  },
  {
    id: 'fullstack-2',
    title: 'Senior Full Stack Developer',
    department: 'ENGINEERING',
    location: 'Bengaluru',
    type: 'Full Time',
    mode: 'Hybrid',
    about: 'You will own the architecture and technical direction of Avashya\'s platform products. This is a high-ownership role where you will make key technology decisions, mentor developers, and ship systems that enterprise clients depend on daily.',
    whatYoullDo: [
      'Architect and build platform products that serve enterprise AI workflows at scale',
      'Make technology decisions — database choices, API design, deployment strategies',
      'Mentor full stack developers and establish engineering best practices',
      'Build systems that handle high concurrency, real-time updates, and complex state management',
      'Own the reliability and performance of production applications',
      'Collaborate with research and FDSE teams to productize internal capabilities',
    ],
    whatWereLookingFor: [
      '5+ years of full stack engineering experience with production systems',
      'Expert-level TypeScript, React/Next.js, and Node.js',
      'Strong systems design skills — can architect for scale, reliability, and maintainability',
      'Deep AWS or cloud platform expertise',
      'Experience leading technical projects end-to-end',
      'Strong opinions on code quality, testing, and development practices',
      'Track record of mentoring other engineers',
    ],
    bonusPoints: [
      'Experience building SaaS or platform products',
      'Background in AI/ML infrastructure or developer tooling',
      'Open-source contributions or technical writing',
      'Experience with event-driven architectures or microservices at scale',
    ],
  },
  {
    id: 'account-manager-1',
    title: 'Account Manager — Enterprise AI',
    department: 'SALES',
    location: 'Bengaluru',
    type: 'Full Time',
    mode: 'Hybrid',
    about: 'You will own and grow relationships with enterprise accounts that use Avashya\'s AI engineering services. This role requires someone who can speak credibly about AI systems while driving commercial outcomes — pipeline, renewals, and expansion.',
    whatYoullDo: [
      'Own the commercial relationship with a portfolio of enterprise accounts',
      'Identify expansion opportunities — new use cases, additional teams, platform adoption',
      'Partner with FDSEs to translate technical delivery into business value narratives',
      'Manage contract renewals, upsells, and pricing negotiations',
      'Build relationships with VP and C-level stakeholders at client organizations',
      'Provide market intelligence back to the product and engineering teams',
    ],
    whatWereLookingFor: [
      '3+ years in B2B account management, customer success, or enterprise sales',
      'Experience in technology services, SaaS, or AI/ML industry',
      'Ability to understand and articulate technical concepts to business stakeholders',
      'Track record of growing accounts and hitting revenue targets',
      'Strong relationship-building skills and executive presence',
      'Comfort working in a fast-moving startup environment',
    ],
    bonusPoints: [
      'Prior experience selling AI/ML services or cloud consulting',
      'Technical background or CS degree',
      'Existing relationships with enterprise engineering or IT leadership',
      'Experience with consultative selling or solution selling methodologies',
    ],
  },
  {
    id: 'account-manager-2',
    title: 'Account Manager — Mid-Market',
    department: 'SALES',
    location: 'Delhi',
    type: 'Full Time',
    mode: 'Hybrid',
    about: 'You will build and manage relationships with mid-market companies adopting AI-powered development practices. This role focuses on newer accounts — companies that are earlier in their AI journey and need guidance on where to start.',
    whatYoullDo: [
      'Manage a portfolio of mid-market accounts across industries',
      'Run discovery conversations to understand client AI maturity and identify opportunities',
      'Develop account plans that grow initial engagements into long-term partnerships',
      'Coordinate with engineering teams to scope and price proposals',
      'Drive pipeline generation through referrals, events, and outbound outreach',
      'Close new business and manage the transition to delivery teams',
    ],
    whatWereLookingFor: [
      '2+ years in B2B sales, account management, or business development',
      'Genuine interest in AI/ML technology and its enterprise applications',
      'Strong communication skills — written and verbal',
      'Ability to manage multiple accounts and prioritize effectively',
      'Self-starter mentality — comfortable building processes from scratch',
      'Based in or willing to relocate to Delhi NCR',
    ],
    bonusPoints: [
      'Experience in technology or SaaS sales',
      'Understanding of software development practices and tools',
      'Network in the Indian startup or enterprise tech ecosystem',
      'Prior experience at a consulting firm or professional services company',
    ],
  },
];

function ThemeToggle() {
  const [theme, setTheme] = useState<'cream' | 'dark'>('dark');

  useEffect(() => {
    const saved = localStorage.getItem('avashya-theme') as 'cream' | 'dark' | null;
    if (saved) {
      setTheme(saved);
      document.documentElement.setAttribute('data-theme', saved);
    }
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('avashya-theme', theme);
  }, [theme]);

  return (
    <button
      onClick={() => setTheme(theme === 'cream' ? 'dark' : 'cream')}
      className="fixed bottom-6 right-6 z-[100] w-10 h-10 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 border hover:scale-110"
      style={{
        background: theme === 'cream' ? '#1A1A1A' : '#FAF8F5',
        borderColor: theme === 'cream' ? '#333' : '#ddd',
      }}
      aria-label={theme === 'cream' ? 'Switch to dark mode' : 'Switch to light mode'}
    >
      {theme === 'cream' ? (
        <Moon className="w-4 h-4" style={{ color: '#FAF8F5' }} />
      ) : (
        <Sun className="w-4 h-4" style={{ color: '#1A1A1A' }} />
      )}
    </button>
  );
}

function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl border-b" style={{ background: 'var(--color-nav-bg)', borderColor: 'var(--color-border)' }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        <a href="/" className="flex items-center gap-3">
          <Image src="/logo.png" alt="Avashya" width={120} height={36} className="h-8 w-auto object-contain logo-themed" />
        </a>
        <div className="hidden md:flex items-center gap-8">
          <a href="/#services" className="text-sm font-medium transition-colors hover:text-[var(--color-primary)]" style={{ color: 'var(--color-text-secondary)' }}>Services</a>
          <a href="/#solutions" className="text-sm font-medium transition-colors hover:text-[var(--color-primary)]" style={{ color: 'var(--color-text-secondary)' }}>Solutions</a>
          <a href="/#approach" className="text-sm font-medium transition-colors hover:text-[var(--color-primary)]" style={{ color: 'var(--color-text-secondary)' }}>Approach</a>
          <a href="/join-us" className="text-sm font-medium transition-colors" style={{ color: 'var(--color-primary)' }}>Join Us</a>
        </div>
        <div className="flex items-center gap-3">
          <a href="/#contact" className="hidden sm:inline-flex btn-primary px-5 py-2.5 text-sm font-semibold items-center gap-2">
            Book a Call <ArrowRight className="w-3.5 h-3.5" />
          </a>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg"
            style={{ color: 'var(--color-text-primary)' }}
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>
      {isMobileMenuOpen && (
        <div className="md:hidden border-t px-4 py-4 space-y-3" style={{ borderColor: 'var(--color-border)', background: 'var(--color-nav-bg)' }}>
          <a href="/#services" className="block text-sm font-medium py-2" style={{ color: 'var(--color-text-secondary)' }}>Services</a>
          <a href="/#solutions" className="block text-sm font-medium py-2" style={{ color: 'var(--color-text-secondary)' }}>Solutions</a>
          <a href="/#approach" className="block text-sm font-medium py-2" style={{ color: 'var(--color-text-secondary)' }}>Approach</a>
          <a href="/join-us" className="block text-sm font-medium py-2" style={{ color: 'var(--color-primary)' }}>Join Us</a>
          <a href="/#contact" className="btn-primary px-5 py-2.5 text-sm font-semibold inline-flex items-center gap-2 mt-2">
            Book a Call <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>
      )}
    </nav>
  );
}

function JobListingPage({ onSelectJob }: { onSelectJob: (job: Job) => void }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('All departments');

  const departments = ['All departments', ...Array.from(new Set(JOBS.map(j => j.department)))];

  const filteredJobs = JOBS.filter(job => {
    const matchesSearch = searchQuery === '' || job.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDept = departmentFilter === 'All departments' || job.department === departmentFilter;
    return matchesSearch && matchesDept;
  });

  const groupedJobs = filteredJobs.reduce((acc, job) => {
    if (!acc[job.department]) acc[job.department] = [];
    acc[job.department].push(job);
    return acc;
  }, {} as Record<string, Job[]>);

  return (
    <>
      {/* Hero */}
      <section className="pt-28 sm:pt-40 pb-16 sm:pb-24 relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.2em] mb-4 sm:mb-6"
            style={{ color: 'var(--color-text-tertiary)' }}
          >
            Careers at Avashya
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-[clamp(1.75rem,5vw,3.25rem)] font-bold leading-[1.15]"
            style={{ color: 'var(--color-text-primary)' }}
          >
            Join us in building the future of
            <br />
            AI-powered software engineering.
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-8"
          >
            <a
              href="#positions"
              className="btn-primary inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-sm font-semibold transition-all duration-300 hover:scale-105"
            >
              <Briefcase className="w-4 h-4" />
              See open positions
            </a>
          </motion.div>
        </div>
      </section>

      {/* Job Listings */}
      <section id="positions" className="pb-20 sm:pb-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl sm:text-3xl font-bold mb-1" style={{ color: 'var(--color-text-primary)' }}>
              {filteredJobs.length} Open Position{filteredJobs.length !== 1 ? 's' : ''}
            </h2>
            <p className="text-sm mb-6 sm:mb-8" style={{ color: 'var(--color-text-tertiary)' }}>
              Find a role where your passion meets purpose
            </p>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-8 sm:mb-10">
              <div className="relative flex-1">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: 'var(--color-text-tertiary)' }} />
                <input
                  type="text"
                  placeholder="Search roles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border text-sm outline-none transition-all focus:ring-2 focus:ring-[var(--color-primary)]/30"
                  style={{ borderColor: 'var(--color-border)', background: 'var(--color-card-bg)', color: 'var(--color-text-primary)' }}
                />
              </div>
              <select
                value={departmentFilter}
                onChange={(e) => setDepartmentFilter(e.target.value)}
                className="px-4 py-3 rounded-xl border text-sm outline-none cursor-pointer"
                style={{ borderColor: 'var(--color-border)', background: 'var(--color-card-bg)', color: 'var(--color-text-primary)' }}
              >
                {departments.map(d => (
                  <option key={d} value={d}>{d === 'All departments' ? d : d.charAt(0) + d.slice(1).toLowerCase()}</option>
                ))}
              </select>
            </div>

            {/* Grouped listings */}
            {Object.entries(groupedJobs).map(([dept, jobs]) => (
              <div key={dept} className="mb-8 sm:mb-10">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-xs font-semibold tracking-wider" style={{ color: 'var(--color-text-tertiary)' }}>{dept}</span>
                  <span className="text-[10px] font-medium px-2 py-0.5 rounded-full" style={{ background: 'var(--color-border)', color: 'var(--color-text-tertiary)' }}>{jobs.length}</span>
                </div>
                <div className="space-y-3">
                  {jobs.map((job) => (
                    <button
                      key={job.id}
                      onClick={() => onSelectJob(job)}
                      className="w-full text-left p-4 sm:p-5 rounded-xl border transition-all duration-200 hover:border-[var(--color-primary)]/40 hover:shadow-sm group"
                      style={{ borderColor: 'var(--color-border)', background: 'var(--color-card-bg)' }}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-sm sm:text-base font-semibold mb-1.5 group-hover:text-[var(--color-primary)] transition-colors" style={{ color: 'var(--color-text-primary)' }}>
                            {job.title}
                          </h3>
                          <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
                            <span className="flex items-center gap-1 text-xs" style={{ color: 'var(--color-text-tertiary)' }}>
                              <MapPin className="w-3 h-3" />{job.location}
                            </span>
                            <span className="text-xs" style={{ color: 'var(--color-text-tertiary)' }}>•</span>
                            <span className="flex items-center gap-1 text-xs" style={{ color: 'var(--color-text-tertiary)' }}>
                              <Clock className="w-3 h-3" />{job.type}
                            </span>
                            <span className="text-xs" style={{ color: 'var(--color-text-tertiary)' }}>•</span>
                            <span className="flex items-center gap-1 text-xs" style={{ color: 'var(--color-text-tertiary)' }}>
                              <Building2 className="w-3 h-3" />{job.mode}
                            </span>
                          </div>
                        </div>
                        <ChevronRight className="w-5 h-5 flex-shrink-0 opacity-40 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" style={{ color: 'var(--color-text-tertiary)' }} />
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            ))}

            {filteredJobs.length === 0 && (
              <div className="text-center py-12">
                <p className="text-sm" style={{ color: 'var(--color-text-tertiary)' }}>No positions match your search. Try a different keyword or department.</p>
              </div>
            )}
          </motion.div>
        </div>
      </section>
    </>
  );
}

function JobDetailPage({ job, onBack }: { job: Job; onBack: () => void }) {
  const [showApplyForm, setShowApplyForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: job.title,
    linkedin: '',
    message: '',
  });
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && droppedFile.size <= 10 * 1024 * 1024) {
      setFile(droppedFile);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      let resumeKey = '';

      if (file) {
        const uploadRes = await fetch(APPLY_API_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            action: 'get-upload-url',
            fileName: file.name,
            contentType: file.type || 'application/pdf',
          }),
        });

        if (!uploadRes.ok) throw new Error('Failed to get upload URL');
        const { uploadUrl, key } = await uploadRes.json();

        const putRes = await fetch(uploadUrl, {
          method: 'PUT',
          headers: { 'Content-Type': file.type || 'application/pdf' },
          body: file,
        });

        if (!putRes.ok) throw new Error('Failed to upload resume');
        resumeKey = key;
      }

      const submitRes = await fetch(APPLY_API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'submit-application',
          ...formData,
          resumeKey,
        }),
      });

      if (!submitRes.ok) {
        const data = await submitRes.json();
        throw new Error(data.error || 'Submission failed');
      }

      setIsSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <section className="pt-28 sm:pt-36 pb-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
            <div className="w-16 h-16 rounded-full mx-auto mb-6 flex items-center justify-center" style={{ background: 'rgba(16, 185, 129, 0.1)' }}>
              <CheckCircle2 className="w-8 h-8" style={{ color: '#10B981' }} />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold mb-3" style={{ color: 'var(--color-text-primary)' }}>Application submitted!</h1>
            <p className="text-sm sm:text-base mb-6" style={{ color: 'var(--color-text-secondary)' }}>
              Thanks for applying for {job.title}. We&apos;ll review your application and get back to you within a few days.
            </p>
            <button onClick={onBack} className="btn-primary px-6 py-3 text-sm font-semibold inline-flex items-center gap-2">
              View other positions <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section className="pt-24 sm:pt-32 pb-20 sm:pb-32">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back button */}
        <motion.button
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={onBack}
          className="flex items-center gap-1.5 text-sm font-medium mb-8 hover:opacity-70 transition-opacity"
          style={{ color: 'var(--color-text-tertiary)' }}
        >
          <ArrowRight className="w-3.5 h-3.5 rotate-180" />
          All positions
        </motion.button>

        {/* Job header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <p className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: 'var(--color-primary)' }}>{job.department}</p>
          <h1 className="text-2xl sm:text-4xl font-bold mb-5" style={{ color: 'var(--color-text-primary)' }}>{job.title}</h1>

          <div className="flex items-center gap-2 sm:gap-3 flex-wrap mb-8">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border" style={{ borderColor: 'var(--color-border)', color: 'var(--color-text-secondary)' }}>
              <Building2 className="w-3 h-3" />{job.department.charAt(0) + job.department.slice(1).toLowerCase()}
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border" style={{ borderColor: 'var(--color-border)', color: 'var(--color-text-secondary)' }}>
              <MapPin className="w-3 h-3" />{job.location}
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border" style={{ borderColor: 'var(--color-border)', color: 'var(--color-text-secondary)' }}>
              <Clock className="w-3 h-3" />{job.type}
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border" style={{ borderColor: 'var(--color-border)', color: 'var(--color-text-secondary)' }}>
              {job.mode}
            </span>
          </div>

          <button
            onClick={() => setShowApplyForm(true)}
            className="btn-primary inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-sm font-semibold transition-all duration-300 hover:scale-105"
          >
            <Briefcase className="w-4 h-4" />
            Apply for this role
          </button>
        </motion.div>

        {/* Divider */}
        <div className="my-10 sm:my-12 border-t" style={{ borderColor: 'var(--color-border)' }} />

        {/* Job content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="space-y-10 sm:space-y-12"
        >
          {/* About Avashya */}
          <div>
            <h2 className="text-lg sm:text-xl font-bold mb-4" style={{ color: 'var(--color-text-primary)' }}>About Avashya</h2>
            <p className="text-sm sm:text-base leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
              Avashya is building the operating system for AI-powered software engineering. We help enterprises move from experimental AI usage to production-grade AI systems through our ISDLC (Intend, Structure, Develop, Launch, Continuously Evolve) framework. Our team works with engineering organizations to optimize their AI agent workflows, improve context efficiency, and deliver measurable improvements in engineering effectiveness.
            </p>
          </div>

          {/* About the Role */}
          <div>
            <h2 className="text-lg sm:text-xl font-bold mb-4" style={{ color: 'var(--color-text-primary)' }}>About the Role</h2>
            <p className="text-sm sm:text-base leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>{job.about}</p>
          </div>

          {/* What You'll Do */}
          <div>
            <h2 className="text-lg sm:text-xl font-bold mb-4" style={{ color: 'var(--color-text-primary)' }}>What You&apos;ll Do</h2>
            <ul className="space-y-3">
              {job.whatYoullDo.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ background: 'var(--color-text-tertiary)' }} />
                  <span className="text-sm sm:text-base leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* What We're Looking For */}
          <div>
            <h2 className="text-lg sm:text-xl font-bold mb-4" style={{ color: 'var(--color-text-primary)' }}>What We&apos;re Looking For</h2>
            <ul className="space-y-3">
              {job.whatWereLookingFor.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ background: 'var(--color-text-tertiary)' }} />
                  <span className="text-sm sm:text-base leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Bonus Points */}
          <div>
            <h2 className="text-lg sm:text-xl font-bold mb-4" style={{ color: 'var(--color-text-primary)' }}>Bonus Points</h2>
            <ul className="space-y-3">
              {job.bonusPoints.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ background: 'var(--color-text-tertiary)' }} />
                  <span className="text-sm sm:text-base leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Why Avashya */}
          <div>
            <h2 className="text-lg sm:text-xl font-bold mb-4" style={{ color: 'var(--color-text-primary)' }}>Why Avashya?</h2>
            <p className="text-sm sm:text-base leading-relaxed mb-4" style={{ color: 'var(--color-text-secondary)' }}>
              Avashya is a fast-moving, high-ownership team building the infrastructure for AI-native software engineering. We work on problems that directly impact how the next generation of software gets built.
            </p>
            <ul className="space-y-3">
              {[
                'Work alongside senior engineers and researchers who ship production AI systems daily',
                'High ownership and high impact, from day one',
                'Every tool we use internally is AI-first — from how we build to how we think about problems',
                'You will work on systems used by real enterprises, not research demos',
                'Competitive compensation and meaningful equity',
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ background: 'var(--color-text-tertiary)' }} />
                  <span className="text-sm sm:text-base leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>{item}</span>
                </li>
              ))}
            </ul>
            <p className="text-sm sm:text-base leading-relaxed mt-5" style={{ color: 'var(--color-text-secondary)' }}>
              If you want to work at the frontier of AI-powered engineering, Avashya is the place to be.
            </p>
          </div>
        </motion.div>

        {/* CTA section */}
        <div className="mt-12 sm:mt-16 p-6 sm:p-8 rounded-2xl" style={{ background: 'var(--color-primary)' }}>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-white mb-1">Interested in this role?</h3>
              <p className="text-sm text-white/60">We&apos;re always looking for curious minds who care deeply about building technology that matters.</p>
            </div>
            <button
              onClick={() => setShowApplyForm(true)}
              className="px-6 py-3 rounded-full text-sm font-semibold transition-all hover:scale-105 flex-shrink-0 bg-white"
              style={{ color: 'var(--color-primary)' }}
            >
              Apply now
            </button>
          </div>
        </div>

        {/* Apply form modal */}
        {showApplyForm && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4" onClick={() => setShowApplyForm(false)}>
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl p-6 sm:p-8 border"
              style={{ background: 'var(--color-card-bg)', borderColor: 'var(--color-border)' }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setShowApplyForm(false)}
                className="absolute top-4 right-4 p-1.5 rounded-lg hover:opacity-70"
                style={{ color: 'var(--color-text-tertiary)' }}
              >
                <X className="w-5 h-5" />
              </button>

              <h2 className="text-lg sm:text-xl font-bold mb-1" style={{ color: 'var(--color-text-primary)' }}>Apply for {job.title}</h2>
              <p className="text-xs mb-6" style={{ color: 'var(--color-text-tertiary)' }}>{job.location} • {job.type} • {job.mode}</p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold mb-1.5" style={{ color: 'var(--color-text-secondary)' }}>Full Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-lg border text-sm outline-none transition-all focus:ring-2 focus:ring-[var(--color-primary)]/30"
                      style={{ borderColor: 'var(--color-border)', background: 'var(--background)', color: 'var(--color-text-primary)' }}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold mb-1.5" style={{ color: 'var(--color-text-secondary)' }}>Email *</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-lg border text-sm outline-none transition-all focus:ring-2 focus:ring-[var(--color-primary)]/30"
                      style={{ borderColor: 'var(--color-border)', background: 'var(--background)', color: 'var(--color-text-primary)' }}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold mb-1.5" style={{ color: 'var(--color-text-secondary)' }}>LinkedIn</label>
                  <input
                    type="url"
                    placeholder="https://linkedin.com/in/..."
                    value={formData.linkedin}
                    onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-lg border text-sm outline-none transition-all focus:ring-2 focus:ring-[var(--color-primary)]/30"
                    style={{ borderColor: 'var(--color-border)', background: 'var(--background)', color: 'var(--color-text-primary)' }}
                  />
                </div>

                {/* Resume upload */}
                <div>
                  <label className="block text-xs font-semibold mb-1.5" style={{ color: 'var(--color-text-secondary)' }}>Resume *</label>
                  <div
                    onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                    onDragLeave={() => setIsDragging(false)}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full p-4 sm:p-6 rounded-lg border-2 border-dashed cursor-pointer transition-all text-center"
                    style={{
                      borderColor: isDragging ? 'var(--color-primary)' : 'var(--color-border)',
                      background: isDragging ? 'rgba(0, 119, 182, 0.04)' : 'var(--background)',
                    }}
                  >
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept=".pdf,.doc,.docx"
                      className="hidden"
                      onChange={(e) => {
                        if (e.target.files?.[0]) setFile(e.target.files[0]);
                      }}
                    />
                    {file ? (
                      <div className="flex items-center justify-center gap-2 flex-wrap">
                        <CheckCircle2 className="w-4 h-4 flex-shrink-0" style={{ color: '#10B981' }} />
                        <span className="text-xs font-medium truncate max-w-[180px]" style={{ color: 'var(--color-text-primary)' }}>{file.name}</span>
                        <button
                          type="button"
                          onClick={(e) => { e.stopPropagation(); setFile(null); }}
                          className="text-xs underline"
                          style={{ color: 'var(--color-text-tertiary)' }}
                        >
                          Remove
                        </button>
                      </div>
                    ) : (
                      <>
                        <Upload className="w-5 h-5 mx-auto mb-1.5" style={{ color: 'var(--color-text-tertiary)' }} />
                        <p className="text-xs font-medium" style={{ color: 'var(--color-text-secondary)' }}>
                          Drop your resume or click to upload
                        </p>
                        <p className="text-[10px] mt-0.5" style={{ color: 'var(--color-text-tertiary)' }}>PDF, DOC, DOCX — max 10MB</p>
                      </>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold mb-1.5" style={{ color: 'var(--color-text-secondary)' }}>Anything else?</label>
                  <textarea
                    rows={3}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="What excites you about this role?"
                    className="w-full px-3 py-2.5 rounded-lg border text-sm outline-none transition-all resize-none focus:ring-2 focus:ring-[var(--color-primary)]/30"
                    style={{ borderColor: 'var(--color-border)', background: 'var(--background)', color: 'var(--color-text-primary)' }}
                  />
                </div>

                {error && (
                  <p className="text-sm text-red-500 font-medium">{error}</p>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-6 py-3.5 rounded-xl text-sm font-semibold text-white transition-all hover:scale-[1.02] disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  style={{ background: 'var(--color-primary)' }}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      Submit Application <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </div>
    </section>
  );
}

export default function JoinUsPage() {
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [selectedJob]);

  return (
    <main className="min-h-screen" style={{ background: 'var(--background)' }}>
      <Navigation />

      {selectedJob ? (
        <JobDetailPage job={selectedJob} onBack={() => setSelectedJob(null)} />
      ) : (
        <JobListingPage onSelectJob={setSelectedJob} />
      )}

      {/* Footer */}
      <footer className="border-t py-8" style={{ borderColor: 'var(--color-border)' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs" style={{ color: 'var(--color-text-tertiary)' }}>&copy; 2026 Avashya. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <a href="mailto:hello@avashya.tech" className="text-xs hover:underline" style={{ color: 'var(--color-text-tertiary)' }}>hello@avashya.tech</a>
            <a href="https://www.linkedin.com/company/avashya-tech/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-xs hover:underline" style={{ color: 'var(--color-text-tertiary)' }}>
              <svg className="w-3.5 h-3.5 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
              LinkedIn
            </a>
          </div>
        </div>
      </footer>

      <ThemeToggle />
    </main>
  );
}
