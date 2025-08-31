export const navItems = [
  { name: "About", link: "#about" },
  { name: "Technologies", link: "#technologies" },
  { name: "Projects", link: "#projects" },
  { name: "Certificates", link: "#certificates" },
  { name: "Experience", link: "#experience" },
  { name: "Contact", link: "#contact" },
]

export const gridItems = [
  {
    id: 1,
    title: "Crafting Scalable Solutions with Modern Tech",
    description: "Full-Stack Developer specializing in React, Next.js, and AI Integration",
    className: "lg:col-span-3 md:col-span-6 md:row-span-4 lg:min-h-[60vh]",
    imgClassName: "w-full h-full",
    titleClassName: "justify-end",
    img: "/b1.svg",
    spareImg: "",
  },
  {
    id: 3,
    title: "My Tech Arsenal",
    description: "Python | JavaScript | TypeScript | React | Next.js | Django | AWS | Docker",
    className: "lg:col-span-2 md:col-span-3 md:row-span-2",
    imgClassName: "",
    titleClassName: "justify-center",
    img: "",
    spareImg: "",
  },
  {
    id: 5,
    title: "Currently building a Fullstack Video Conferencing Platform",
    description: "Like Riverside - Built with Next.js and Django for seamless video sharing and collaboration",
    className: "md:col-span-3 md:row-span-2",
    imgClassName: "absolute right-0 bottom-0 md:w-96 w-60",
    titleClassName: "justify-center md:justify-start lg:justify-center",
    img: "/b5.svg",
    spareImg: "/grid.svg",
  },
  {
    id: 6,
    title: "Ready to collaborate on your next big project?",
    description: "Let's build something extraordinary together",
    className: "lg:col-span-2 md:col-span-3 md:row-span-1",
    imgClassName: "",
    titleClassName: "justify-center md:max-w-full max-w-60 text-center",
    img: "",
    spareImg: "",
  },
]

// Large Scale Project
export const largeScaleProject = {
  id: "juris-lead",
  title: "Juris-Lead - IPC Justice Aid 🏛️⚖️",
  des:
    "Democratizing access to justice through AI-powered legal analysis of Indian Penal Code. Juris-Lead is a comprehensive legal-tech platform providing free AI-powered legal case analysis for citizens and lead generation for legal professionals. Built with Flutter, Next.js, Django, Docker, and Ollama AI.",
  img: "./projects/Juris-Lead.png",
  iconLists: ["/django.svg", "/flutter.svg", "/next.svg", "/docker.svg", "/ai.svg"],
  link: "https://github.com/AnupamSingh2004/Juris-Lead",
  liveLink: "https://juris-lead.vercel.app/",
}

// Ongoing Projects
export const ongoingProjects = [
  {
    id: "internflow",
    title: "InternFlow - Internship Tracking Platform",
    des:
      "InternFlow streamlines the job search process with real-time updates, analytics, and community-driven insights. Track applications, discover opportunities, and land your dream internship. Built with Next.js, Django, PostgreSQL, Docker.",
    img: "./projects/Internflow.png",
    iconLists: ["/next.svg", "/django.svg", "/postgresql.svg", "/docker.svg"],
    link: "https://github.com/AnupamSingh2004/Internflow",
    liveLink: null,
  },
  {
    id: "prismeet",
    title: "Prismeet - Next-Gen Video Meeting Platform",
    des:
      "Prismeet revolutionizes remote collaboration with advanced recording, AI-powered insights, and seamless post-meeting workflows. Built for content creators and remote teams. Next.js, Django, Docker, FFmpeg, AI/NLP.",
    img: "./projects/Prismeet.png",
    iconLists: ["/next.svg", "/django.svg", "/docker.svg", "/ai.svg"],
    link: "https://github.com/AnupamSingh2004/Prismeet",
    liveLink: null,
  },
]

// Projects
export const projects = [
  {
    id: "aarogyarekha",
    title: "AarogyaRekha - AI Health Prediction System 🛡️",
    des:
      "AI-powered preventive healthcare system that predicts disease outbreaks (malaria, dengue, diarrhea) using satellite data, climate patterns, and behavioral insights. Built during Hack4Health Hackathon with Flutter, Django, TensorFlow, and satellite APIs.",
    img: "./projects/AarogyaRekha.png",
    iconLists: ["/flutter.svg", "/django.svg", "/ai.svg", "/python.svg", "/postgresql.svg"],
    link: "https://github.com/AnupamSingh2004/AarogyaRekha/",
    liveLink: null,
  },
  {
    id: "accessibilitypro",
    title: "AccessibilityPro - WCAG Compliance Platform",
    des:
      "A modern, responsive, and accessible React.js application for monitoring and improving website accessibility compliance. Built with Next.js, React, TypeScript, Tailwind CSS.",
    img: "./projects/Accesebility-Pro.png",
    iconLists: ["/next.svg", "/react.svg", "/typescript.svg", "/tailwind.svg"],
    link: "https://github.com/AnupamSingh2004/AccessibilityPro",
    liveLink: "https://accessibility-pro.vercel.app/",
  },
  {
    id: 1,
    title: "BigDocs - AI Healthcare Platform",
    des: "Comprehensive healthcare platform with telemedicine, AI disease prediction (92% accuracy), and prescription management. Built in 48 hours during hackathon.",
    img: "./projects/bigdocs.png",
    iconLists: ["/python.svg", "/django.svg", "/ai.svg", "/react.svg", "/aws.svg"],
    link: "https://github.com/AnupamSingh2004/BigDocs",
    liveLink: "https://big-docs.vercel.app/",
  },
  {
    id: 2,
    title: "BookItzz - Library Exchange Platform",
    des: "Scalable book lending platform using Next.js, TypeScript, Drizzle ORM, and Redis caching. Serves 500+ users with 40% improved performance.",
    img: "./projects/bookitzz.png",
    iconLists: ["/next.svg", "/typescript.svg", "/redis.svg", "/neon.svg", "/drizzle.svg"],
    link: "https://github.com/AnupamSingh2004/BookItzz",
    liveLink: "https://book-itzz.vercel.app/",
  },
  {
    id: 3,
    title: "Chatter - Real-time Chat App",
    des: "Full-stack chat application with Socket.io, Google Auth, and sub-100ms message delivery. Responsive design across 15+ device sizes.",
    img: "./projects/chatter.png",
    iconLists: ["/react.svg", "/nodejs.svg", "/socketio.svg", "/tailwind.svg", "/express.svg"],
    link: "https://github.com/AnupamSingh2004/Chatter",
    liveLink: null,
  },
  {
    id: 4,
    title: "Open Source Contributions",
    des: "Contributing to TimeWarp and Busify repositories, optimizing performance and implementing scalability improvements.",
    img: "./projects/github.png",
    iconLists: ["/github.svg", "/javascript.svg", "/python.svg", "/optimization.svg"],
    link: "https://github.com/AnupamSingh2004",
    liveLink: null,
  },
]

export const moreProjects = [
  {
    quote:
      "Developed AarogyaRekha during Hack4Health Hackathon - an AI-powered preventive healthcare system predicting disease outbreaks like malaria and dengue using satellite data from Sentinel-2 and MODIS. Built with Flutter, Django, TensorFlow, achieving 99.8% prediction confidence for real-time health risk alerts to rural communities.",
    name: "AarogyaRekha",
    title: "AI Health Prediction System - Hackathon Winner",
  },
  {
    quote:
      "Built a modern WCAG compliance platform for monitoring website accessibility with React.js, TypeScript, and Next.js. Features real-time issue detection, CSV/JSON export capabilities, and comprehensive analytics dashboard serving accessibility professionals worldwide.",
    name: "AccessibilityPro",
    title: "WCAG Compliance Platform with Analytics",
  },
  {
    quote:
      "Developed a comprehensive healthcare platform in 48 hours featuring telemedicine with 1080p video quality, AI-powered disease prediction using custom BERT model achieving 92% accuracy across 100+ diseases, and prescription management handling 1000+ medical records daily.",
    name: "BigDocs",
    title: "AI-Powered Healthcare Platform - Hackathon Project",
  },
  {
    quote:
      "Built a scalable library book exchange platform serving 500+ users with Next.js, TypeScript, and Drizzle ORM. Integrated Redis caching reducing database query times by 40% and optimized API endpoints achieving sub-100ms response times.",
    name: "BookItzz",
    title: "Library Exchange Platform with Advanced Caching",
  },
  {
    quote:
      "Created a full-stack real-time chat application with React.js, Node.js, and Socket.io. Integrated Google authentication achieving 95%+ success rate and implemented real-time messaging with sub-100ms delivery speeds for both private and group chats.",
    name: "Chatter",
    title: "Real-time Chat Application with Google Auth",
  },
  {
    quote:
      "Active contributor to open-source projects including TimeWarp and Busify, focusing on performance optimization, bug fixes, and scalability improvements. Demonstrated collaborative development skills in distributed teams.",
    name: "Open Source",
    title: "Community Contributions & Collaborative Development",
  },
]

export const companies = [
  {
    id: 1,
    name: "AWS",
    img: "/aws.svg",
    nameImg: "/awsName.svg",
  },
  {
    id: 2,
    name: "Docker",
    img: "/docker.svg",
    nameImg: "/dockerName.svg",
  },
  {
    id: 3,
    name: "Google Cloud",
    img: "/gcp.svg",
    nameImg: "/gcpName.svg",
  },
  {
    id: 4,
    name: "Redis",
    img: "/redis.svg",
    nameImg: "/redisName.svg",
  },
  {
    id: 5,
    name: "MongoDB",
    img: "/mongodb.svg",
    nameImg: "/mongoName.svg",
  },
]

export const achievements = [
  {
    id: 1,
    title: "CodeChef Rating: 1422",
    description: "Achieved in just 2 months of competitive programming",
    icon: "/codechef.svg",
  },
  {
    id: 2,
    title: "Codeforces Rating: 986",
    description: "Accomplished in 5 contests with consistent performance",
    icon: "/codeforces.svg",
  },
  {
    id: 3,
    title: "JEE Mains OBC-NCL-PWD Rank: 400",
    description: "Excellence in national-level engineering entrance exam",
    icon: "/jee.svg",
  },
  {
    id: 4,
    title: "Hackathon Participant",
    description: "CanuHackIt and HACKJMI competitions",
    icon: "/hackathon.svg",
  },
]

export const skills = {
  languages: ["Python", "JavaScript", "TypeScript", "C++", "Java", "PHP", "SQL"],
  frameworks: ["React.js", "Next.js", "Django", "Node.js", "Express.js", "Redux"],
  tools: ["Docker", "Git", "JWT", "Web3.js", "MySQL", "MongoDB", "Supabase", "Redis"],
  platforms: ["AWS", "GCP", "Linux", "Windows"],
  devops: ["Terraform", "Jenkins", "Kubernetes", "Grafana", "SonarQube", "Prometheus", "Ansible", "GitLab CI/CD", "Nginx", "Apache", "Helm", "ArgoCD", "Vault"],
}

export const socialMedia = [
  {
    id: 1,
    img: "/github.svg",
    link: "https://github.com/AnupamSingh2004",
  },
  {
    id: 2,
    img: "/linkedin.svg",
    link: "https://linkedin.com/in/anupam-singh",
  },
  {
    id: 3,
    img: "/email.svg",
    link: "mailto:sanupam2004@gmail.com",
  },
]

export const socialProfiles = [
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/anupam-singh-78911224a/",
    icon: "/linkedin.svg",
    color: "#0077B5",
  },
  {
    name: "GitHub",
    url: "https://github.com/AnupamSingh2004",
    icon: "/github.svg",
    color: "#333",
  },
  {
    name: "LeetCode",
    url: "https://leetcode.com/u/sanupam2004/",
    icon: "/optimization.svg", // Using optimization icon as LeetCode placeholder
    color: "#FFA116",
  },
]

export const certificates = [
  {
    id: 1,
    title: "Introduction to DevOps",
    provider: "Coursera - IBM",
    issueDate: "Mar 12, 2025",
    credentialId: "8YEE0VZCACVY",
    verificationUrl: "https://coursera.org/verify/8YEE0VZCACVY",
    description: "Comprehensive course covering DevOps fundamentals, CI/CD pipelines, containerization, and cloud deployment strategies.",
    skills: ["DevOps", "CI/CD", "Docker", "Kubernetes", "Cloud Computing"],
    certificateFile: "/certificates/Coursera_intro_to_devops.pdf",
    certificateImage: "/certificates/IntroductionToDevOps.png",
    color: "#0056D2", // Coursera blue
    icon: "🏆",
  },
]

export const contactInfo = {
  name: "Anupam Singh",
  email: "sanupam2004@gmail.com",
  location: "IIIT Jabalpur, India",
  education: "B.Tech CSE (2023-2027) - IIIT Jabalpur",
  social: {
    linkedin: "@anupam-singh-78911224a",
    github: "@AnupamSingh2004",
  },
}
