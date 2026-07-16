export const profile = {
  name: 'Aditya Sunil Akankar',
  shortName: 'Aditya Akankar',
  location: 'Khamgaon, Maharashtra, India',
  email: 'adityaakankar@gmail.com',
  phone: '+91-8482918176',
  github: 'https://github.com/Adityaaknkar16',
  linkedin: 'https://linkedin.com/in/aditya-akankar', // TODO: replace
  heroTitle: 'Software Developer',
  heroTitleAccent: 'Full-Stack · MERN · GenAI & RAG',
  summary:
    'Full-stack developer with experience building scalable web apps and AI-powered systems using the MERN stack, GenAI, and RAG pipelines. Passionate about crafting performant backends and sleek, dynamic user interfaces.',
};

export const staticSkills = {
  Languages: ['JavaScript (ES6+)', 'TypeScript', 'Java', 'Python', 'SQL', 'C'],
  Frontend: ['React.js', 'Next.js', 'Redux Toolkit', 'Tailwind CSS', 'Material UI'],
  Backend: ['Node.js', 'Express.js', 'FastAPI', 'Socket.io', 'WebRTC', 'JWT', 'Docker'],
  'AI/GenAI': ['LLMs', 'RAG Pipelines', 'Gemini API', 'Vertex AI', 'Qdrant', 'Ollama'],
  Databases: ['MongoDB', 'MySQL', 'PostgreSQL', 'Firebase'],
};

export const experience = [
  {
    company: 'Xtrazcon Pvt Ltd',
    role: 'Software Developer Intern',
    period: 'March 2026 – Present',
    location: 'Remote',
    description: 'Engineered features across 3+ live client projects using MERN + React Native. Delivered 10+ reusable components.',
  },
  {
    company: 'Self-Employed / Freelance',
    role: 'Full-Stack Developer',
    period: '2024 – 2026',
    location: 'Remote',
    description: 'Designed and deployed custom tools, web apps, and RAG-based systems for various projects and clients.',
  }
];

export const staticProjects = [
  {
    number: '01',
    title: 'Legal Reach – AI Legal Consultancy Platform',
    status: 'Ongoing',
    github: 'https://github.com/Adityaaknkar16/Legal-Reach',
    stack: ['React.js', 'Node.js', 'FastAPI', 'Docker', 'Qdrant', 'Ollama', 'Socket.io', 'WebRTC'],
    highlights: [
      'Hybrid Vector+BM25 search with sub-second responses',
      '85% user satisfaction, 99.9% citation accuracy across 50+ legal docs',
      'Sub-100ms latency for 100+ concurrent sessions',
    ],
  },
  {
    number: '02',
    title: 'Sustainable Resource Distribution Platform',
    status: '2025',
    github: 'https://github.com/Adityaaknkar16/Donation-platform',
    stack: ['MongoDB', 'Express.js', 'React.js', 'Node.js', 'Firebase', 'Stripe API'],
    highlights: [
      'Donor–NGO matching with real-time tracking',
      'NGO verification workflow',
      'Stripe payment integration',
    ],
  },
  {
    number: '03',
    title: 'Collaborative Tech Interview Platform',
    status: '2025',
    github: 'https://github.com/Adityaaknkar16/interview-platform',
    stack: ['WebRTC', 'Socket.io', 'Monaco Editor', 'Docker', 'Piston API', 'React.js'],
    highlights: [
      'HD video calling with collaborative code editing',
      '<100ms sync across editors',
      '5+ programming languages supported',
    ],
  },
  {
    number: '04',
    title: 'Git Repo Analyzer',
    status: '2026',
    github: 'https://github.com/Adityaaknkar16/Git-repo',
    stack: ['React.js', 'Node.js', 'Express.js', 'MongoDB'],
    highlights: [
      'Interactive visualizations of GitHub repository data',
      'Insights into architecture, development pace, and community impact',
      'Transforms complex GitHub data from public URLs',
    ],
  },
];

export const education = [
  {
    degree: 'B.E. Information Technology',
    school: 'MGICOET Shegaon',
    year: 'May 2026',
    description: 'Focused on software engineering, database systems, and full-stack development methodologies.',
  },
  {
    degree: 'Google Gen AI Study Jams',
    school: 'Google Developer Student Clubs',
    year: '2024',
    description: 'Level 3 Certification. Specialized hands-on work with Gemini API, Vertex AI, and LLM integrations.',
  }
];

export const navLinks = [
  { label: 'About', hash: '#about' },
  { label: 'Skills', hash: '#skills' },
  { label: 'Projects', hash: '#projects' },
  { label: 'Experience', hash: '#experience' },
  { label: 'Contact', hash: '#contact' },
];
