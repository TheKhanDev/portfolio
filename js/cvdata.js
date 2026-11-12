/* ============================================================
   cvdata.js — All CV content
   ============================================================ */
const cvData = {
  header: {
    photo: "assets/images/waqas-cv.jpg",
    name: "Waqas Khan",
    title: "Team Lead & Principal Architect | TheKhanDev | Full-Stack Systems & AI Engineer | Harvard Certified",
    tagline: "📍 Islamabad / Peshawar, Pakistan",
    contacts: [
      { icon: "fas fa-phone",    label: "+92 319 7742317",         href: "tel:+923197742317" },
      { icon: "fas fa-phone",    label: "+92 344 1092910",         href: "tel:+923441092910" },
      { icon: "fas fa-envelope", label: "thekhandev.pk@gmail.com", href: "mailto:thekhandev.pk@gmail.com" },
      { icon: "fas fa-envelope", label: "waqaskhank128@gmail.com", href: "mailto:waqaskhank128@gmail.com" },
      { icon: "fas fa-globe",    label: "Portfolio",               href: "https://thekhandev.github.io/portfolio" },
      { icon: "fab fa-github",   label: "@thekhandev",             href: "https://github.com/thekhandev" }
    ]
  },

  summary: [
    "Elite <strong>Full-Stack Software Engineer</strong>, <strong>System Architect</strong>, and <strong>Technical Educator</strong> with over 5 years of production-grade expertise engineering high-performance, secure, and horizontally scalable web, mobile, and AI-driven architectures. As the Founder and Principal Engineer of <strong>TheKhanDev</strong>, I have spearheaded the design, optimization, and successful deployment of <strong>50+ enterprise and consumer software systems</strong> for global clientele, consistently solving intricate technical challenges including memory leaks, high-latency bottlenecks, database indexing failures, and unoptimized Core Web Vitals.",
    "Beyond core engineering, I operate as a technical mentor and educator, having trained over <strong>1,000 aspiring software developers</strong> in advanced MERN stack mechanics, system design paradigms, modern Python backends, and robust cybersecurity engineering. My foundational philosophy centers on absolute technical ownership, immaculate code maintainability, strict adherence to clean architecture principles, and building resilient software that drives measurable business ROI."
  ],

  competencies: [
    { label: "Frontend Architecture", values: "React.js, Next.js 14/15 (App Router, SSR, SSG, ISR, Edge Runtime), TypeScript (Advanced Generics & Utility Types), Redux Toolkit, Context API, Tailwind CSS, HTML5, Responsive UI/UX Systems." },
    { label: "Backend & API Systems", values: "Node.js, Express.js, NestJS, Python (Django, FastAPI, Flask, RESTful Endpoints, Asynchronous Workers), PHP, WebSockets, JWT/OAuth Authentication, Microservices Design." },
    { label: "Databases & Cloud", values: "PostgreSQL, MongoDB (Aggregation Pipelines, N+1 Query Optimization), MySQL, Firebase Firestore, Supabase, Docker, CI/CD Pipeline Configuration, Vercel, AWS (EC2, S3), Hostinger, Netlify, Linux Server Administration." },
    { label: "Engineering Tools & Methodologies", values: "Git & GitHub Actions, Postman, PyInstaller, Vite, Webpack, Performance Profiling (Lighthouse, WebPageTest), Agile/Scrum Methodologies." }
  ],

  experience: [
    {
      role: "Application Developer",
      company: "Zentic Solution",
      date: "Jul 2026 – Present",
      location: "Peshawar, Khyber Pakhtunkhwa, Pakistan (Full-Time)",
      bullets: [
        "Architect and engineer high-performance cross-platform mobile and desktop applications with native integrations, optimized memory management, and fluid UI rendering.",
        "Collaborate closely with cross-functional engineering teams to build resilient backend microservices, streamline data synchronization, and enforce enterprise-grade security protocols.",
        "Conduct rigorous code reviews, automated testing, and performance profiling to ensure zero-downtime deployments and optimal production reliability."
      ]
    },
    {
      role: "Team Lead & Founder",
      company: "TheKhanDev",
      date: "Jun 2022 – Present",
      location: "Peshawar / Islamabad, Pakistan (Remote / Self-Employed)",
      bullets: [
        "Lead a multidisciplinary engineering squad, directing the end-to-end architecture, development, and delivery of 35+ high-impact digital solutions across MERN Stack, Next.js 14, TypeScript, and Python.",
        "Engineered critical performance overhauls: resolved complex N+1 query bottlenecks in MongoDB aggregations, eliminated memory leaks in state management trees, and enforced strict input sanitization to block injection vectors.",
        "Re-architected legacy monolithic codebases into modular, testable, and highly maintainable components utilizing Server-Side Rendering (SSR) and Incremental Static Regeneration (ISR).",
        "<strong>Quantifiable Impact:</strong> Achieved a 70% performance improvement across client properties, lowering average page load times from 4.8s to 1.2s, consistently hitting 95+ Lighthouse scores, and maintaining a 100% on-time project delivery track record.",
        "Designed and deployed immersive programming curriculums, bootcamps, and interactive learning frameworks for software engineering students."
      ]
    },
    {
      role: "Web Developer (Internship)",
      company: "CodeAlpha",
      date: "Apr 2026 – Jul 2026",
      location: "Africa (Remote)",
      bullets: [
        "Developed robust, scalable front-end and back-end modules for distributed web applications, optimizing cross-browser compatibility and API response payloads.",
        "Contributed to the enhancement of automated deployment scripts and code quality assurance checks within agile sprint cycles."
      ]
    },
    {
      role: "Web Developer",
      company: "HexSoftwares",
      date: "2026 – Jul 2026",
      location: "Asia (Remote)",
      bullets: [
        "Built responsive, dynamic user interfaces and integrated secure authentication layers for high-traffic web platforms."
      ]
    }
  ],

  projects: [
    {
      title: "PyMastery (Cross-Platform Mobile & Desktop App)",
      featured: true,
      description: "Architected and developed a full-featured Python learning application utilizing React Native, Expo, and TypeScript. Implemented structured interactive lesson modules, real-time code execution challenges, local SQLite/AsyncStorage persistence, and a dynamic PDF notes generation engine.",
      tech: ["React Native", "Expo", "TypeScript", "SQLite"],
      liveUrl: ""
    },
    {
      title: "TheKhanDev Enterprise Platform & LMS",
      featured: true,
      description: "Engineered a comprehensive digital learning and software house ecosystem featuring sequential video streaming loops, multi-language tracking arrays, asynchronous progress synchronization, conditional GitHub repository display cards, and an encrypted administrative dashboard.",
      tech: ["Next.js", "TypeScript", "MongoDB", "Node.js"],
      liveUrl: "https://thekhandev.github.io/portfolio"
    },
    {
      title: "Standalone Desktop Utilities & Python Automation",
      description: "Programmed high-efficiency Windows desktop applications, automation scripts, and scientific calculators using Python (Tkinter/PyQt) compiled into secure standalone executables via PyInstaller with custom runtime flags.",
      tech: ["Python", "Tkinter", "PyQt", "PyInstaller"],
      liveUrl: ""
    },
    {
      title: "Quran Web Application",
      description: "Complete Quran reading application with multiple features, surah navigation, and modern JavaScript frontend.",
      tech: ["HTML5", "CSS3", "JavaScript", "Quran API"],
      liveUrl: "https://thekhandev.github.io/Quraan-web-app/"
    }
  ],

  education: [
    {
      title: "Bachelor of Science in Computer Science (B.Sc. CS)",
      institution: "Abasyn University, Peshawar (with cross-institutional academic alignment with Harvard University)",
      date: "Sep 2024 – Present",
      note: "Currently in 5th Semester | Student Roll No: 25754. Maintaining an exceptional 3.96+ CGPA, focusing heavily on advanced algorithms, database structures, operating systems, and distributed system design."
    },
    {
      title: "Intermediate of Computer Science (ICS)",
      institution: "BISE Malakand",
      date: "Completed 2024",
      note: "Grade: 'A'"
    },
    {
      title: "Matriculation",
      institution: "BISE Malakand",
      date: "Completed 2022",
      note: "Grade: 'A'"
    }
  ],

  certifications: [
    {
      title: "Specialized Diplomas & Professional Tech Credentials",
      icon: "fas fa-award",
      variant: "professional",
      items: [
        "Diploma in Information Technology (DIT) — Board of Technical Education (BTE) Peshawar",
        "Web Development Professional Certificate — Corvit Systems (PMYSDP–NAVTTC)",
        "CCNP Enterprise Certification — NVTTI",
        "AWS Certified Database – Specialty — NVTTI"
      ]
    },
    {
      title: "HarvardX / Harvard University Online (CS50 Computer Science Series)",
      icon: "fas fa-university",
      variant: "harvard",
      items: [
        "CS50P: Programming with Python",
        "CS50W: Web Programming with Python & JavaScript",
        "CS50AI: Introduction to Artificial Intelligence with Python",
        "CS50 Cybersecurity: Introduction to Cybersecurity Principles"
      ]
    },
    {
      title: "Technical & Vocational Certifications (DigiSkills & Coursera)",
      icon: "fas fa-laptop-code",
      variant: "vocational",
      items: [
        "Fundamentals of Machine Learning and Artificial Intelligence — Coursera",
        "WordPress Web Engineering — DigiSkills",
        "Computer-Aided Design (AutoCAD) — DigiSkills"
      ]
    },
    {
      title: "Professional & Business Readiness (HP LIFE)",
      icon: "fas fa-briefcase",
      variant: "business",
      items: [
        "AI & Cybersecurity: AI for Business Professionals | AI for Beginners | Critical Thinking in the AI Era | Cybersecurity Awareness",
        "Management & Communication: Effective Leadership | Agile Project Management | Unique Value Proposition | Digital Business Skills | Business Email | Resume Writing & Interviewing"
      ]
    }
  ],

  footer: {
    text: "Available for freelance & full-time opportunities worldwide.",
    contact: "thekhandev.pk@gmail.com"
  }
};