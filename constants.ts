
import { PortfolioNode, PortfolioLink } from './types';

// Define color mapping for the surreal theme
export const NODE_COLORS: Record<PortfolioNode['type'], string> = {
  project: '#fbe5a0', // A soft gold
  skill: '#64ffda',   // The neon accent
  experience: '#a8b2d1', // Light slate
};

const nodes: PortfolioNode[] = [
  // Core Node
  { id: 'me', name: 'Abderrahim Safou', type: 'experience', val: 15, details: 'Full-stack developer, AI enthusiast, and ambitious entrepreneur passionate about building powerful tools that solve real-world problems. Founder of Hedrobat, building custom apps, tools, and consulting solutions.' },

  // Experience
  { id: 'exp-1', name: 'Founder @ Hedrobat', type: 'experience', val: 12, details: 'My software company for building custom apps, tools, and consulting solutions for a variety of clients and internal projects.' },

  // Projects
  { id: 'proj-finnexpay', name: 'FinnexPay', type: 'project', val: 10, details: 'A fintech super app for Algeria to handle recharges, payments, and rewards, designed for financial inclusion.' },
  { id: 'proj-focusflow', name: 'FocusFlow', type: 'project', val: 10, details: 'A Tauri + React desktop app for scheduling and productivity. Manages 14-hour time blocks with alarms and tracking.' },
  { id: 'proj-predatorbot', name: 'PredatorBot', type: 'project', val: 10, details: 'Automated trading bot and wallet tracker with Telegram alerts and database logging.' },
  { id: 'proj-manager', name: 'Manager-Moudir', type: 'project', val: 8, details: 'Tracks employee presence and payments for small shops, focusing on transparency and accountability.' },
  { id: 'proj-tradejournal', name: 'TradeJournal', type: 'project', val: 8, details: 'A tool to log, review, and analyze trades, helping traders apply Wyckoff and Smart Money Concepts.' },
  { id: 'proj-ml', name: 'ML-Algos', type: 'project', val: 8, details: 'A curated collection of core machine learning algorithms, implemented from scratch in Python.' },
  { id: 'proj-org', name: 'Org File Manager', type: 'project', val: 8, details: 'A C++ Qt-based file manager with a focus on clean UI, performance, and features.' },
  { id: 'proj-gymo', name: 'GymoMap', type: 'project', val: 8, details: 'Gym tracker for logging workout progress, linked with machine photos and session stats.' },
  
  // Skills - Languages
  { id: 'skill-ts', name: 'TypeScript', type: 'skill', val: 5, details: 'Primary language for building robust, scalable full-stack applications.' },
  { id: 'skill-js', name: 'JavaScript', type: 'skill', val: 5, details: 'Core language for web development, used across many projects.' },
  { id: 'skill-python', name: 'Python', type: 'skill', val: 5, details: 'Used for machine learning, data analysis, and automation scripts.' },
  { id: 'skill-cpp', name: 'C++', type: 'skill', val: 5, details: 'Applied for performance-critical applications like the Org file manager and embedded systems.' },
  { id: 'skill-php', name: 'PHP', type: 'skill', val: 5, details: 'Utilized in backend development, particularly with the Laravel framework for FinnexPay.' },

  // Skills - Frameworks & Tools
  { id: 'skill-react', name: 'React/React Native', type: 'skill', val: 5, details: 'Building modern, component-based UIs for web and mobile.' },
  { id: 'skill-nextjs', name: 'Next.js', type: 'skill', val: 5, details: 'Used for performant, server-rendered React applications.' },
  { id: 'skill-tauri', name: 'Tauri', type: 'skill', val: 5, details: 'Creating lightweight, cross-platform desktop applications with web technologies.' },
  { id: 'skill-laravel', name: 'Laravel', type: 'skill', val: 5, details: 'A powerful PHP framework for building robust back-end services.' },
  { id: 'skill-angular', name: 'Angular', type: 'skill', val: 5, details: 'Leveraged for building feature-rich, client-side applications.' },
  { id: 'skill-qt', name: 'Qt', type: 'skill', val: 5, details: 'A C++ framework for building cross-platform applications with native performance.' },
  { id: 'skill-esp32', name: 'Embedded (ESP32)', type: 'skill', val: 5, details: 'Developing IoT devices and working with microcontrollers like the ESP32.' },

  // Skills - Concepts & Soft Skills
  { id: 'skill-entrepreneurship', name: 'Entrepreneurship', type: 'skill', val: 7, details: 'Driven by an entrepreneurial mindset, focused on building high-impact, scalable ventures.' },
  { id: 'skill-ml', name: 'Machine Learning', type: 'skill', val: 7, details: 'Knowledge of core ML concepts and algorithms, with practical implementation experience.' },
  { id: 'skill-trading', name: 'Trading Strategies', type: 'skill', val: 7, details: 'Understanding and application of Wyckoff and Smart Money Concepts in financial markets.' },
  { id: 'skill-problem-solving', name: 'Problem-Solving', type: 'skill', val: 7, details: 'Creative and analytical thinking to solve complex technical and business challenges.' }
];

const links: PortfolioLink[] = [
  // Connect core node
  { source: 'me', target: 'exp-1' },
  { source: 'me', target: 'skill-entrepreneurship' },
  { source: 'me', target: 'skill-problem-solving' },
  { source: 'exp-1', target: 'proj-finnexpay' },
  { source: 'exp-1', target: 'proj-focusflow' },
  { source: 'exp-1', target: 'proj-predatorbot' },
  
  // Connect projects to skills
  { source: 'proj-finnexpay', target: 'skill-laravel' },
  { source: 'proj-finnexpay', target: 'skill-angular' },
  { source: 'proj-finnexpay', target: 'skill-react' },
  { source: 'proj-finnexpay', target: 'skill-php' },
  { source: 'proj-focusflow', target: 'skill-tauri' },
  { source: 'proj-focusflow', target: 'skill-react' },
  { source: 'proj-focusflow', target: 'skill-ts' },
  { source: 'proj-predatorbot', target: 'skill-python' },
  { source: 'proj-predatorbot', target: 'skill-trading' },
  { source: 'proj-manager', target: 'skill-ts' },
  { source: 'proj-tradejournal', target: 'skill-ts' },
  { source: 'proj-tradejournal', target: 'skill-trading' },
  { source: 'proj-ml', target: 'skill-python' },
  { source: 'proj-ml', target: 'skill-ml' },
  { source: 'proj-org', target: 'skill-cpp' },
  { source: 'proj-org', target: 'skill-qt' },
  { source: 'proj-gymo', target: 'skill-ts' },

  // Connect related skills
  { source: 'skill-ts', target: 'skill-js' },
  { source: 'skill-react', target: 'skill-ts' },
  { source: 'skill-nextjs', target: 'skill-react' },
  { source: 'skill-cpp', target: 'skill-esp32' },
  { source: 'skill-ml', target: 'skill-python' }
];

export const portfolioData = { nodes, links };
