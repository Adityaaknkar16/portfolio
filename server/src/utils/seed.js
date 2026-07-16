import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Project from '../models/Project.js';
import Skill from '../models/Skill.js';
import Goal from '../models/Goal.js';
import Guestbook from '../models/Guestbook.js';

dotenv.config();

const sampleProjects = [
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

const sampleSkills = [
  {
    category: 'Languages',
    items: ['JavaScript (ES6+)', 'TypeScript', 'Java', 'Python', 'SQL', 'C'],
  },
  {
    category: 'Frontend',
    items: ['React.js', 'Next.js', 'Redux Toolkit', 'Tailwind CSS', 'Material UI'],
  },
  {
    category: 'Backend',
    items: ['Node.js', 'Express.js', 'FastAPI', 'Socket.io', 'WebRTC', 'JWT', 'Docker'],
  },
  {
    category: 'AI/GenAI',
    items: ['LLMs', 'RAG Pipelines', 'Gemini API', 'Vertex AI', 'Qdrant', 'Ollama'],
  },
  {
    category: 'Databases',
    items: ['MongoDB', 'MySQL', 'PostgreSQL', 'Firebase'],
  },
];

const sampleGoals = [
  {
    title: 'Build portfolio using MERN & Tailwind CSS',
    description: 'Implement a modern, developer-themed MERN stack dashboard app with clean responsive layouts.',
    completed: true,
    category: 'Tech',
  },
  {
    title: 'Create dynamic guestbook & contact form submissions',
    description: 'Integrate dynamic Express API backend endpoints with validation, rate-limiting, and MongoDB storage.',
    completed: true,
    category: 'Tech',
  },
  {
    title: 'Integrate WakaTime and GitHub stats APIs',
    description: 'Pull coding time, language breakdowns, and commit activity dynamically from services.',
    completed: true,
    category: 'Tech',
  },
  {
    title: 'Obtain Google Cloud Professional Architect Certification',
    description: 'Deepen system design, infrastructure design, and cloud architecture patterns.',
    completed: false,
    category: 'Learning',
  },
  {
    title: 'Contribute to a major open source project',
    description: 'Get a pull request merged in a widely-used repository or library.',
    completed: false,
    category: 'Open Source',
  },
  {
    title: 'Complete a 10K running challenge',
    description: 'Commit to weekly runs and complete an official 10K event.',
    completed: false,
    category: 'Life',
  },
];

const sampleGuestbook = [
  {
    name: 'Sarah Connor',
    message: 'Love the dashboard style portfolio! It feels like a real developer workspace.',
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
  },
  {
    name: 'Linus Torvalds',
    message: 'Good start. Now make it compile on a toaster. Jk, looks sleek!',
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
  },
];

const seedDB = async () => {
  const uri = process.env.MONGO_URI || 'mongodb://localhost:27017/portfolio';
  try {
    await mongoose.connect(uri);
    console.log('MongoDB connected for seeding.');

    // Clear previous collections
    await Project.deleteMany({});
    await Skill.deleteMany({});
    await Goal.deleteMany({});
    await Guestbook.deleteMany({});
    console.log('Cleared existing projects, skills, goals, and guestbook entries.');

    // Insert new data
    await Project.insertMany(sampleProjects);
    await Skill.insertMany(sampleSkills);
    await Goal.insertMany(sampleGoals);
    await Guestbook.insertMany(sampleGuestbook);
    console.log('Successfully seeded database with projects, skills, goals, and guestbook messages.');

    await mongoose.disconnect();
    console.log('Disconnected from MongoDB.');
    process.exit(0);
  } catch (error) {
    console.error('Seeding database failed: ', error);
    process.exit(1);
  }
};

seedDB();
