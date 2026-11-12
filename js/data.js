/* ============================================================
   data.js — All portfolio content
   ============================================================ */
const portfolioData = {
  typedRoles: [
    "Team Lead & Principal Architect",
    "Full-Stack Systems Engineer",
    "AI & ML Engineer",
    "Harvard Certified Technologist"
  ],

  socials: [
    { name: "GitHub",    icon: "fab fa-github",       url: "https://github.com/thekhandev" },
    { name: "LinkedIn",  icon: "fab fa-linkedin-in",  url: "https://www.linkedin.com/in/waqas-khan-a45564335/" },
    { name: "Portfolio", icon: "fas fa-globe",        url: "https://thekhandev.github.io/portfolio" },
    { name: "Facebook",  icon: "fab fa-facebook-f",   url: "https://www.facebook.com/profile.php?id=61582277145690" },
    { name: "WhatsApp",  icon: "fab fa-whatsapp",     url: "https://wa.me/923197742317" },
    { name: "Instagram", icon: "fab fa-instagram",    url: "https://instagram.com/waqas__755" }
  ],

  services: [
    { icon: "fas fa-layer-group",     title: "Full-Stack Development", desc: "Enterprise-grade MERN, Next.js 14/15, and Python applications built for scale, security, and sub-second performance." },
    { icon: "fas fa-sitemap",         title: "Systems Architecture",   desc: "Designing horizontally scalable microservices, database optimizations, and resilient distributed systems." },
    { icon: "fas fa-brain",           title: "AI Engineering",         desc: "Integrating LLMs, machine learning pipelines, and intelligent automation into production systems." },
    { icon: "fas fa-chalkboard-user", title: "Technical Mentorship",   desc: "Training developers in advanced MERN, system design, Python backends, and cybersecurity fundamentals." }
  ],

  skillsCategories: [
    {
      title: "Frontend Architecture", icon: "fas fa-code",
      skills: [
        { name: "React / Next.js 14/15", percentage: 95 },
        { name: "TypeScript (Advanced)", percentage: 92 },
        { name: "Tailwind / UI Systems", percentage: 90 },
        { name: "Redux / Context API",    percentage: 88 }
      ]
    },
    {
      title: "Backend & API Systems", icon: "fas fa-server",
      skills: [
        { name: "Node.js / Express / NestJS", percentage: 93 },
        { name: "Python (Django/FastAPI)",    percentage: 90 },
        { name: "RESTful / WebSockets",       percentage: 88 },
        { name: "JWT / OAuth / Security",     percentage: 85 }
      ]
    },
    {
      title: "Databases & Cloud", icon: "fas fa-database",
      skills: [
        { name: "PostgreSQL / MongoDB",        percentage: 90 },
        { name: "MySQL / Firebase / Supabase", percentage: 87 },
        { name: "Docker & CI/CD",              percentage: 84 },
        { name: "AWS / Vercel / Netlify",      percentage: 82 }
      ]
    }
  ],

  portfolioCategories: [
    { id: "all",        label: "All Projects" },
    { id: "islamic",    label: "Islamic Apps" },
    { id: "games",      label: "Games" },
    { id: "web",        label: "Web Apps" },
    { id: "javascript", label: "JavaScript" },
    { id: "python",     label: "Python" },
    { id: "tools",      label: "Tools" }
  ],

  projects: [
    /* ============ EXISTING PROJECTS ============ */
    {
      id: 1,
      title: "Quran Web Application",
      category: "islamic",
      featured: true,
      date: "2025-06",
      image: "assets/images/Quraan.webp",
      infoTitle: "Quran Web Application",
      infoDesc: "Complete Quran reading application with multiple features and surah navigation, built with modern JavaScript.",
      demoUrl: "https://thekhandev.github.io/Quraan-web-app/",
      tags: ["HTML5", "CSS3", "JavaScript", "Quran API"]
    },
    {
      id: 2,
      title: "Quran Reading App",
      category: "islamic",
      featured: true,
      date: "2025-05",
      image: "assets/images/quraan.jpg",
      infoTitle: "Quran Reading App",
      infoDesc: "Interactive Quran reading application with navigation controls and mobile-friendly interface.",
      demoUrl: "https://thekhandev.github.io/WAQaskhanApps/Quraan%20App.html",
      tags: ["HTML5", "CSS3", "JavaScript", "Mobile Friendly"]
    },
    {
      id: 3,
      title: "HHMI Brothers Organization",
      category: "web",
      date: "2025-04",
      image: "assets/images/online-store.webp",
      infoTitle: "HHMI Brothers Organization",
      infoDesc: "Website for HHMI Brothers organization with information, resources, and responsive design.",
      demoUrl: "https://thekhandev.github.io/HHMIBrothers/",
      tags: ["HTML", "CSS", "JavaScript", "Responsive"]
    },
    {
      id: 4,
      title: "Quotes Generator",
      category: "web javascript",
      date: "2025-03",
      image: "assets/images/quotes.png",
      infoTitle: "Quotes Generator",
      infoDesc: "Application that displays random inspirational quotes with sharing features and API integration.",
      demoUrl: "https://thekhandev.github.io/WAQaskhanApps/Quotes.html",
      tags: ["JavaScript", "API", "CSS", "DOM Manipulation"]
    },
    {
      id: 5,
      title: "Funny Chat Bot",
      category: "javascript",
      date: "2025-02",
      image: "assets/images/bot.jpg",
      infoTitle: "Funny Chat Bot",
      infoDesc: "Interactive chatbot that responds with humorous replies and jokes using AI logic.",
      demoUrl: "https://thekhandev.github.io/WAQaskhanApps/funnybot.html",
      tags: ["JavaScript", "Chatbot", "AI Logic", "User Input"]
    },
    {
      id: 6,
      title: "Rock Paper Scissors",
      category: "games",
      date: "2024-12",
      image: "assets/images/rock-paper-scissors.jpg",
      infoTitle: "Rock Paper Scissors Game",
      infoDesc: "Classic game with score tracking and computer AI opponent built in pure JavaScript.",
      demoUrl: "https://thekhandev.github.io/WAQaskhanApps/Rock%20siccor%20paper%20game.html",
      tags: ["JavaScript", "Game Logic", "Randomization", "Score System"]
    },
    {
      id: 7,
      title: "Classic Snake Game",
      category: "games",
      date: "2024-11",
      image: "assets/images/snake.jpeg",
      infoTitle: "Classic Snake Game",
      infoDesc: "Retro snake game with increasing difficulty and score system using HTML5 Canvas.",
      demoUrl: "https://thekhandev.github.io/WAQaskhanApps/snake%20game.html",
      tags: ["JavaScript", "Canvas", "Game Development", "Keyboard Events"]
    },

    /* ============ NEW PROJECTS (7) ============ */
    {
      id: 8,
      title: "TKPython",
      category: "python web",
      featured: true,
      date: "2025-07",
      image: "assets/images/thekhandev-logo.jpg",
      infoTitle: "TKPython — Python Learning Platform",
      infoDesc: "Interactive Python learning platform deployed on Vercel, featuring structured lessons, code challenges, and progress tracking.",
      demoUrl: "https://tkpython.vercel.app",
      tags: ["Python", "Vercel", "Next.js", "Education"]
    },
    {
      id: 9,
      title: "City Actor Game",
      category: "games",
      date: "2025-01",
      image: "assets/images/city-actor-game.jpg",
      infoTitle: "City Actor Game",
      infoDesc: "Interactive browser-based guessing game where players identify actors by their cities — pure JavaScript game logic.",
      demoUrl: "https://thekhandev.github.io/city-actor-game/",
      tags: ["JavaScript", "Game", "HTML5", "CSS3"]
    },
    {
      id: 10,
      title: "Butcher Shop",
      category: "web",
      date: "2025-03",
      image: "assets/images/butcher-shop.png",
      infoTitle: "Butcher Shop — E-Commerce Site",
      infoDesc: "Modern, responsive e-commerce website for a butcher shop with product listings, cart simulation, and clean UI.",
      demoUrl: "https://thekhandev.github.io/ButcherShop/",
      tags: ["HTML", "CSS", "JavaScript", "E-Commerce"]
    },
    {
      id: 11,
      title: "Task Manager Web App",
      category: "web javascript",
      date: "2025-05",
      image: "assets/images/task manager.png",
      infoTitle: "Task Manager Web App",
      infoDesc: "Full-featured task management application with add/edit/delete tasks, priority sorting, and persistent storage via localStorage.",
      demoUrl: "https://thekhandev.github.io/Task-manager-web-app/",
      tags: ["JavaScript", "LocalStorage", "CRUD", "UI/UX"]
    },
    {
      id: 12,
      title: "TameerHub",
      category: "web",
      date: "2025-08",
      image: "assets/images/tameerhub.png",
      infoTitle: "TameerHub — Construction Platform",
      infoDesc: "Construction and contractor marketplace platform deployed on Vercel — connecting clients with professionals, project management, and service listings.",
      demoUrl: "https://wk-tameerhub.vercel.app/",
      tags: ["Next.js", "Vercel", "Marketplace", "TypeScript"]
    },
    {
      id: 13,
      title: "WAQaskhanApps — Multi-Tool Suite",
      category: "tools javascript",
      date: "2025-06",
      image: "assets/images/my-apps.png",
      infoTitle: "WAQaskhanApps — Multi-Tool Suite",
      infoDesc: "Collection of mini web applications — quotes generator, chatbot, games, Quran app, and more, all in one interactive hub.",
      demoUrl: "https://thekhandev.github.io/WAQaskhanApps/",
      tags: ["JavaScript", "HTML5", "CSS3", "Multi-App"]
    }
  ],

  experience: [
    {
      date: "Jul 2026 – Present",
      role: "Application Developer",
      company: "Zentic Solution",
      location: "Peshawar, Khyber Pakhtunkhwa, Pakistan",
      type: "Full-Time",
      description: "Architect and engineer high-performance cross-platform mobile and desktop applications with native integrations, optimized memory management, and fluid UI rendering. Collaborate closely with engineering teams to build resilient backend microservices, streamline data synchronization, and enforce enterprise-grade security protocols. Conduct rigorous code reviews, automated testing, and performance profiling to ensure zero-downtime deployments and optimal production reliability.",
      highlights: [
        "High-performance cross-platform apps with native integrations",
        "Resilient backend microservices & data synchronization",
        "Enterprise-grade security protocols & code reviews",
        "Zero-downtime deployments & production reliability"
      ],
      tech: ["React Native", "Node.js", "Docker", "TypeScript"]
    },
    {
      date: "Jun 2022 – Present",
      role: "Team Lead & Founder",
      company: "TheKhanDev",
      location: "Peshawar / Islamabad, Pakistan",
      type: "Remote / Self-Employed",
      description: "Lead a multidisciplinary engineering squad, directing the end-to-end architecture, development, and delivery of 35+ high-impact digital solutions across MERN Stack, Next.js 14, TypeScript, and Python. Engineered critical performance overhauls: resolved complex N+1 query bottlenecks in MongoDB aggregations, eliminated memory leaks in state management trees, and enforced strict input sanitization to block injection vectors. Re-architected legacy monolithic codebases into modular, testable, and highly maintainable components utilizing Server-Side Rendering (SSR) and Incremental Static Regeneration (ISR).",
      highlights: [
        "70% performance improvement across client properties",
        "Page load times reduced from 4.8s to 1.2s",
        "95+ Lighthouse scores maintained",
        "100% on-time project delivery record",
        "Designed immersive programming curriculums & bootcamps"
      ],
      tech: ["Next.js 14", "TypeScript", "MongoDB", "Python", "React"]
    },
    {
      date: "Apr 2026 – Jul 2026",
      role: "Web Developer (Internship)",
      company: "CodeAlpha",
      location: "Africa (Remote)",
      type: "Internship",
      description: "Developed robust, scalable front-end and back-end modules for distributed web applications, optimizing cross-browser compatibility and API response payloads. Contributed to the enhancement of automated deployment scripts and code quality assurance checks within agile sprint cycles.",
      highlights: [
        "Scalable front-end & back-end modules",
        "Cross-browser compatibility optimization",
        "Automated deployment scripts",
        "Agile sprint cycle contributions"
      ],
      tech: ["JavaScript", "API", "Agile", "CI/CD"]
    },
    {
      date: "2026 – Jul 2026",
      role: "Web Developer",
      company: "HexSoftwares",
      location: "Asia (Remote)",
      type: "Remote",
      description: "Built responsive, dynamic user interfaces and integrated secure authentication layers for high-traffic web platforms.",
      highlights: [
        "Responsive & dynamic user interfaces",
        "Secure authentication layers",
        "High-traffic platform engineering"
      ],
      tech: ["HTML", "CSS", "JavaScript", "Auth"]
    }
  ],

  education: [
    {
      date: "Sep 2024 – Present",
      role: "Bachelor of Science in Computer Science (B.Sc. CS)",
      company: "Abasyn University, Peshawar",
      location: "Peshawar, Pakistan",
      type: "Currently in 5th Semester",
      description: "Maintaining an exceptional 3.96+ CGPA, focusing heavily on advanced algorithms, database structures, operating systems, and distributed system design. Cross-institutional academic alignment with Harvard University.",
      highlights: [
        "3.96+ CGPA (exceptional standing)",
        "Advanced algorithms & data structures",
        "Operating systems & distributed systems",
        "Harvard University academic alignment",
        "Student Roll No: 25754"
      ],
      tech: ["Algorithms", "Databases", "OS", "Distributed Systems"]
    },
    {
      date: "Completed 2024",
      role: "Intermediate of Computer Science (ICS)",
      company: "BISE Malakand",
      location: "Khyber Pakhtunkhwa, Pakistan",
      type: "Grade A",
      description: "Completed Intermediate of Computer Science with an A grade, building strong foundational knowledge in programming, mathematics, and computer systems.",
      highlights: [
        "Grade 'A' achievement",
        "Programming fundamentals",
        "Mathematical foundations",
        "Computer systems basics"
      ],
      tech: ["Programming", "Mathematics", "CS Fundamentals"]
    },
    {
      date: "Completed 2022",
      role: "Matriculation",
      company: "BISE Malakand",
      location: "Khyber Pakhtunkhwa, Pakistan",
      type: "Grade A",
      description: "Completed Matriculation with an A grade, establishing academic excellence and strong analytical foundations.",
      highlights: [
        "Grade 'A' achievement",
        "Analytical foundations",
        "Academic excellence"
      ],
      tech: ["Science", "Mathematics"]
    }
  ],

  certifications: [
    { title: "CS50P: Programming with Python",                 issuer: "HarvardX / Harvard University", icon: "fab fa-python",           category: "harvard",      desc: "CS50P — Programming with Python, Harvard University Online / HarvardX." },
    { title: "CS50W: Web Programming with Python & JavaScript", issuer: "HarvardX / Harvard University", icon: "fas fa-globe",            category: "harvard",      desc: "CS50W — Web Programming with Python & JavaScript (Django, SQL, Git), HarvardX." },
    { title: "CS50AI: Introduction to AI with Python",          issuer: "HarvardX / Harvard University", icon: "fas fa-brain",            category: "harvard",      desc: "CS50AI — Graph Search, Optimization, Machine Learning, HarvardX." },
    { title: "CS50 Cybersecurity",                              issuer: "HarvardX / Harvard University", icon: "fas fa-shield-alt",       category: "harvard",      desc: "CS50 Cybersecurity — Threat Modeling, Cryptography, Network Defense, HarvardX." },
    { title: "Diploma in Information Technology (DIT)",         issuer: "Board of Technical Education (BTE) Peshawar", icon: "fas fa-certificate", category: "professional", desc: "Diploma in Information Technology — BTE Peshawar." },
    { title: "Web Development Professional Certificate",        issuer: "Corvit Systems (PMYSDP–NAVTTC)", icon: "fas fa-code",            category: "professional", desc: "Professional Web Development certificate — Corvit Systems, PMYSDP–NAVTTC." },
    { title: "CCNP Enterprise Certification",                   issuer: "NVTTI",                          icon: "fas fa-network-wired",   category: "professional", desc: "Cisco Certified Network Professional Enterprise — NVTTI." },
    { title: "AWS Certified Database – Specialty",              issuer: "NVTTI",                          icon: "fab fa-aws",             category: "professional", desc: "AWS Certified Database – Specialty — NVTTI." },
    { title: "Fundamentals of Machine Learning & AI",           issuer: "Coursera",                       icon: "fas fa-cogs",            category: "vocational",   desc: "Fundamentals of Machine Learning and AI — Coursera." },
    { title: "WordPress Web Engineering",                       issuer: "DigiSkills",                     icon: "fab fa-wordpress",       category: "vocational",   desc: "WordPress Web Engineering — DigiSkills." },
    { title: "Computer-Aided Design (AutoCAD)",                 issuer: "DigiSkills",                     icon: "fas fa-drafting-compass", category: "vocational",  desc: "Computer-Aided Design (AutoCAD) — DigiSkills." },
    { title: "AI for Business Professionals",                   issuer: "HP LIFE",                        icon: "fas fa-robot",           category: "ai",           desc: "AI for Business Professionals — HP LIFE." },
    { title: "AI for Beginners",                                issuer: "HP LIFE",                        icon: "fas fa-graduation-cap",  category: "ai",           desc: "AI for Beginners — HP LIFE." },
    { title: "Critical Thinking in the AI Era",                 issuer: "HP LIFE",                        icon: "fas fa-lightbulb",       category: "ai",           desc: "Critical Thinking in the AI Era — HP LIFE." },
    { title: "Cybersecurity Awareness",                         issuer: "HP LIFE",                        icon: "fas fa-shield-halved",   category: "ai",           desc: "Cybersecurity Awareness — HP LIFE." },
    { title: "Effective Leadership",                            issuer: "HP LIFE",                        icon: "fas fa-flag",            category: "business",     desc: "Effective Leadership — HP LIFE." },
    { title: "Agile Project Management",                        issuer: "HP LIFE",                        icon: "fas fa-tasks",           category: "business",     desc: "Agile Project Management — HP LIFE." },
    { title: "Unique Value Proposition",                        issuer: "HP LIFE",                        icon: "fas fa-gem",             category: "business",     desc: "Unique Value Proposition — HP LIFE." },
    { title: "Digital Business Skills",                         issuer: "HP LIFE",                        icon: "fas fa-chart-line",      category: "business",     desc: "Digital Business Skills — HP LIFE." },
    { title: "Business Email",                                  issuer: "HP LIFE",                        icon: "fas fa-envelope",        category: "business",     desc: "Business Email — HP LIFE." },
    { title: "Resume Writing & Interviewing",                   issuer: "HP LIFE",                        icon: "fas fa-user-tie",        category: "business",     desc: "Resume Writing and Job Interviewing Professional Skills — HP LIFE." },
    { title: "Advanced Python Backend Engineering",             issuer: "TheKhanDev Academy",             icon: "fab fa-python",          category: "vocational",   desc: "Advanced Python backend engineering — Django, FastAPI, and async workers." },
    { title: "Full-Stack System Design Mastery",                issuer: "TheKhanDev Academy",             icon: "fas fa-sitemap",         category: "professional", desc: "Full-stack system design mastery — distributed systems, caching, and scalability." }
  ],

  certCategories: [
    { id: "all",          label: "All Certifications", icon: "fas fa-certificate" },
    { id: "harvard",      label: "HarvardX",           icon: "fas fa-university" },
    { id: "professional", label: "Professional Tech",  icon: "fas fa-award" },
    { id: "vocational",   label: "Vocational",         icon: "fas fa-laptop-code" },
    { id: "ai",           label: "AI & Security",      icon: "fas fa-brain" },
    { id: "business",     label: "Business & Soft",    icon: "fas fa-briefcase" }
  ],

  testimonials: [
    { name: "Ahmed R.", role: "Startup Founder", avatar: "AR", rating: 5, text: "Waqas delivered our web app ahead of schedule with outstanding quality. His attention to detail and communication made the whole process effortless." },
    { name: "Sarah M.", role: "Project Manager", avatar: "SM", rating: 5, text: "Working with Waqas was a great experience. He understands both design and code — a rare combination that saved us countless hours." },
    { name: "Bilal K.", role: "Business Owner",  avatar: "BK", rating: 5, text: "Our new website looks amazing and loads fast. Waqas truly cares about the user experience and it shows in every detail." }
  ]
};