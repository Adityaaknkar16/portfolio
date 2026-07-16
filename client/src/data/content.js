export const profile = {
  name: 'Aditya Sunil Akankar',
  shortName: 'Aditya Akankar',
  location: 'Khamgaon, Maharashtra, India',
  email: 'adityaakankar@gmail.com',
  phone: '+91-8482918176',
  github: 'https://github.com/Adityaaknkar16',
  /** Hero typewriter line — professional title (not snake_case) */
  heroTitle: 'Software Developer',
  heroTitleAccent: 'Full-Stack · MERN · GenAI',
  summary:
    'Final-year IT graduate and full-stack software engineer (MERN) with GenAI and RAG experience. I build performant web applications and intelligent retrieval systems that pair polished UX with production-ready backends.',
};

export const skills = {
  Frontend: ['React.js', 'Next.js', 'Redux Toolkit', 'Tailwind CSS', 'Material UI', 'TypeScript'],
  Backend: ['Node.js', 'Express.js', 'FastAPI', 'Socket.io', 'WebRTC', 'JWT', 'Docker'],
  'AI/GenAI': ['LLMs', 'RAG Pipelines', 'Gemini API', 'Vertex AI', 'Qdrant', 'Ollama'],
  Databases: ['MongoDB', 'MySQL', 'PostgreSQL', 'Firebase'],
  Languages: ['JavaScript (ES6+)', 'TypeScript', 'Java', 'Python', 'SQL', 'C'],
};

export const experience = [
  {
    company: 'Xtrazcon Pvt Ltd',
    role: 'Software Developer Intern',
    period: 'March 2026 – Present',
    location: 'Remote',
    bullets: [
      'Engineered features across 3+ live client projects using MERN + React Native',
      'Delivered 10+ reusable React.js + Tailwind components',
      'Agile environment: sprint planning, Git-based code reviews',
    ],
  },
];

export const projects = [
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
  {
    number: '05',
    title: 'API Mock-up Tool',
    status: '2026',
    github: 'https://github.com/Adityaaknkar16/API-MOCKUP-TOOL',
    stack: ['Node.js', 'Express.js', 'REST API'],
    highlights: [
      'Simulate APIs with customizable JSON/XML responses, delays, and headers',
      'Error simulation for robust frontend testing (404, 500, timeouts)',
      'Rapid prototyping and independent frontend development',
    ],
  },
  {
    number: '06',
    title: 'MERN NoteApp',
    status: '2026',
    github: 'https://github.com/Adityaaknkar16/noteapp',
    stack: ['React.js', 'Node.js', 'Express.js', 'MongoDB'],
    highlights: [
      'Full-stack personal note-taking application with responsive design',
      'User authentication and secure session handling',
      'Complete CRUD operations and RESTful API integration',
    ],
  },
];

export const education = {
  degrees: [
    {
      degree: 'B.E. Information Technology',
      school: 'MGICOET Shegaon',
      year: 'May 2026',
    },
    {
      degree: 'HSC',
      school: 'Mauli Junior College Shegaon',
      year: 'May 2022',
    },
  ],
  certifications: [
    'Google Gen AI Study Jams Level 3 (Gemini API, Vertex AI, LLM Integration)',
    'Backend REST API Development with Node.js — Udemy',
    'Java Programming Masterclass — Udemy',
  ],
};

export const leadership = [
  {
    title: 'Animal Welfare Lead',
    description: 'Managed 10+ volunteers for stray animal care programs and coordinated rescue operations.',
  },
  {
    title: 'Community Social Work',
    description: 'Led weekly cleanliness drives at Shri Veer Hanuman Mandir, fostering local engagement.',
  },
];

export const navLinks = [
  { label: 'About', hash: '#about' },
  { label: 'Experience', hash: '#experience' },
  { label: 'Projects', hash: '#projects' },
  { label: 'Education', hash: '#education' },
  { label: 'Contact', hash: '#contact' },
];

export const stats = [
  { label: 'Projects Shipped', value: '3+' },
  { label: 'Live Client Apps', value: '3+' },
  { label: 'Reusable Components', value: '10+' },
  { label: 'GenAI Focus', value: 'RAG' },
];
