
import { Job, UserRole, User } from './types';

export const INITIAL_JOBS: Job[] = [
  // --- MNCs ---
  {
    id: 'mnc-1',
    title: 'Senior Software Engineer (L5)',
    company: 'Google India',
    location: 'Bangalore, KA',
    field: 'Software Engineering',
    experienceLevel: 'Senior',
    description: 'Work on Google Cloud Platform (GCP) or Search infrastructure. Build scalable systems that power millions of users.',
    requirements: ['Java', 'Distributed Systems', 'Go', 'Kubernetes'],
    recruiterId: 'r1',
    postedAt: '2024-03-01',
    deadline: '2025-12-31',
    salary: '₹45L - ₹75L'
  },
  {
    id: 'mnc-2',
    title: 'Cloud Support Architect',
    company: 'Amazon Web Services (AWS)',
    location: 'Hyderabad, TS',
    field: 'Cloud Computing',
    experienceLevel: 'Mid',
    description: 'Help enterprise customers migrate to the cloud. Architect highly available and fault-tolerant solutions.',
    requirements: ['AWS', 'Networking', 'Python', 'Linux Administration'],
    recruiterId: 'r2',
    postedAt: '2024-03-05',
    salary: '₹25L - ₹40L'
  },
  {
    id: 'mnc-3',
    title: 'Research Scientist - AI/ML',
    company: 'Microsoft Research',
    location: 'Noida, UP',
    field: 'Artificial Intelligence',
    experienceLevel: 'Senior',
    description: 'Contributing to state-of-the-art research in Natural Language Processing and Generative AI.',
    requirements: ['PyTorch', 'PhD in CS/Math', 'LLMs', 'Research Publications'],
    recruiterId: 'r1',
    postedAt: '2024-02-15',
    salary: '₹55L - ₹90L'
  },
  {
    id: 'mnc-4',
    title: 'React Frontend Developer',
    company: 'TCS (Tata Consultancy Services)',
    location: 'Pune, MH',
    field: 'Software Engineering',
    experienceLevel: 'Entry',
    description: 'Develop responsive web applications for international banking clients using modern React patterns.',
    requirements: ['React', 'JavaScript', 'HTML5/CSS3', 'Agile'],
    recruiterId: 'r3',
    postedAt: '2024-03-10',
    salary: '₹6L - ₹12L'
  },
  {
    id: 'mnc-5',
    title: 'Full Stack Engineer',
    company: 'Infosys',
    location: 'Mysore, KA',
    field: 'Software Engineering',
    experienceLevel: 'Mid',
    description: 'Join our digital transformation team working on global e-commerce platforms.',
    requirements: ['Spring Boot', 'Angular', 'PostgreSQL', 'Microservices'],
    recruiterId: 'r3',
    postedAt: '2024-03-12',
    salary: '₹12L - ₹22L'
  },
  {
    id: 'mnc-6',
    title: 'Data Engineer',
    company: 'Walmart Global Tech',
    location: 'Chennai, TN',
    field: 'Data Science',
    experienceLevel: 'Mid',
    description: 'Optimize the world\'s largest retail supply chain using Spark and Hadoop ecosystems.',
    requirements: ['Apache Spark', 'Scala', 'Hadoop', 'SQL'],
    recruiterId: 'r2',
    postedAt: '2024-03-08',
    salary: '₹28L - ₹45L'
  },

  // --- STARTUPS ---
  {
    id: 'st-1',
    title: 'Mobile Engineer (iOS/Android)',
    company: 'Zomato',
    location: 'Gurgaon, HR',
    field: 'Mobile Development',
    experienceLevel: 'Mid',
    description: 'Craft the perfect food delivery experience. Optimize app performance for millions of daily active users.',
    requirements: ['React Native', 'Swift', 'Kotlin', 'Redux'],
    recruiterId: 'r4',
    postedAt: '2024-03-15',
    deadline: '2025-05-01',
    salary: '₹30L - ₹50L'
  },
  {
    id: 'st-2',
    title: 'Backend Platform Engineer',
    company: 'Swiggy',
    location: 'Bangalore, KA',
    field: 'Software Engineering',
    experienceLevel: 'Senior',
    description: 'Solve complex logistics and real-time tracking problems at scale.',
    requirements: ['Java', 'Golang', 'Redis', 'Kafka'],
    recruiterId: 'r4',
    postedAt: '2024-03-14',
    salary: '₹40L - ₹65L'
  },
  {
    id: 'st-3',
    title: 'Product Designer (UX/UI)',
    company: 'Zerodha',
    location: 'Bangalore, KA',
    field: 'Design',
    experienceLevel: 'Senior',
    description: 'Design the future of retail trading in India. Focus on simplicity and lightning-fast interfaces.',
    requirements: ['Figma', 'User Research', 'Typography', 'Prototyping'],
    recruiterId: 'r5',
    postedAt: '2024-03-11',
    salary: '₹35L - ₹55L'
  },
  {
    id: 'st-4',
    title: 'Security Engineer',
    company: 'Razorpay',
    location: 'Bangalore, KA',
    field: 'Software Engineering',
    experienceLevel: 'Mid',
    description: 'Ensure the safety of millions of transactions. Perform audits, penetration testing, and build secure systems.',
    requirements: ['Pentesting', 'OAuth', 'Network Security', 'Python'],
    recruiterId: 'r5',
    postedAt: '2024-03-09',
    salary: '₹32L - ₹48L'
  },
  {
    id: 'st-5',
    title: 'Machine Learning Engineer',
    company: 'Ola Electric',
    location: 'Bangalore, KA',
    field: 'Artificial Intelligence',
    experienceLevel: 'Mid',
    description: 'Develop autonomous driving features and battery optimization algorithms for our EVs.',
    requirements: ['Computer Vision', 'PyTorch', 'C++', 'Control Systems'],
    recruiterId: 'r6',
    postedAt: '2024-02-28',
    salary: '₹25L - ₹45L'
  },
  {
    id: 'st-6',
    title: 'Frontend Lead',
    company: 'CRED',
    location: 'Bangalore, KA',
    field: 'Software Engineering',
    experienceLevel: 'Lead',
    description: 'Lead the frontend team to build high-fidelity, aesthetic financial management tools.',
    requirements: ['Next.js', 'Framer Motion', 'Tailwind', 'Performance Optimization'],
    recruiterId: 'r6',
    postedAt: '2024-03-16',
    salary: '₹50L - ₹80L'
  },
  {
    id: 'st-7',
    title: 'Software Development Engineer',
    company: 'Flipkart',
    location: 'Bangalore, KA',
    field: 'Software Engineering',
    experienceLevel: 'Entry',
    description: 'Perfect role for top university graduates. Build features for Big Billion Days.',
    requirements: ['Data Structures', 'Algorithms', 'Java', 'Python'],
    recruiterId: 'r7',
    postedAt: '2024-03-02',
    salary: '₹18L - ₹24L'
  },
  {
    id: 'st-8',
    title: 'Growth Marketing Manager',
    company: 'Paytm',
    location: 'Noida, UP',
    field: 'Marketing',
    experienceLevel: 'Mid',
    description: 'Drive user acquisition and retention for our digital payments and lending products.',
    requirements: ['Digital Marketing', 'Retention Metrics', 'A/B Testing', 'SQL'],
    recruiterId: 'r7',
    postedAt: '2024-03-18',
    salary: '₹20L - ₹35L'
  },
  {
    id: 'st-9',
    title: 'Product Developer',
    company: 'Zoho Corporation',
    location: 'Chennai, TN',
    field: 'Software Engineering',
    experienceLevel: 'Mid',
    description: 'Build SaaS products that compete on a global scale. We value coding craftsmanship.',
    requirements: ['Java', 'Object Oriented Design', 'C', 'Problem Solving'],
    recruiterId: 'r8',
    postedAt: '2024-02-20',
    salary: '₹15L - ₹30L'
  },
  {
    id: 'st-10',
    title: 'QA Automation Engineer',
    company: 'Groww',
    location: 'Bangalore, KA',
    field: 'Software Engineering',
    experienceLevel: 'Mid',
    description: 'Build automated test suites for our investment platform. Zero-tolerance for bugs.',
    requirements: ['Selenium', 'Cypress', 'Appium', 'Java'],
    recruiterId: 'r8',
    postedAt: '2024-03-20',
    salary: '₹18L - ₹28L'
  }
];

export const MOCK_USERS: User[] = [
  { 
    id: 'c1', 
    name: 'John Doe', 
    email: 'john@example.com', 
    role: UserRole.CANDIDATE, 
    resumeText: 'Experienced React developer with 5 years in TypeScript and UI design.',
    location: 'Pune, MH',
    phone: '+91 9876543210',
    education: [{ school: 'IIT Bombay', degree: 'B.Tech CS', year: '2018' }],
    experience: [{ company: 'TCS', role: 'Software Engineer', duration: '2018-2022' }],
    certificates: ['AWS Developer Associate', 'React Specialist'],
    bio: 'Passionate about building scalable frontend architectures and user-centric designs.',
    socials: {
        linkedin: 'https://linkedin.com/in/johndoe',
        github: 'https://github.com/johndoe'
    }
  },
  { id: 'r1', name: 'Jane Recruiter', email: 'jane@techflow.com', role: UserRole.RECRUITER, companyName: 'TechFlow' }
];
