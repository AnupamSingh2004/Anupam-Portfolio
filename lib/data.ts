export const navItems = [
  { name: "About", link: "#about" },
  { name: "Technologies", link: "#technologies" },
  { name: "Projects", link: "#projects" },
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

export const projects = [
  {
    id: 1,
    title: "BigDocs - AI Healthcare Platform",
    des: "Comprehensive healthcare platform with telemedicine, AI disease prediction (92% accuracy), and prescription management. Built in 48 hours during hackathon.",
    img: "/projects/bigdocs.png",
    iconLists: ["/python.svg", "/django.svg", "/ai.svg", "/react.svg", "/aws.svg"],
    link: "https://github.com/AnupamSingh2004/BigDocs",
    liveLink: "https://big-docs.vercel.app/",
  },
  {
    id: 2,
    title: "BookItzz - Library Exchange Platform",
    des: "Scalable book lending platform using Next.js, TypeScript, Drizzle ORM, and Redis caching. Serves 500+ users with 40% improved performance.",
    img: "/projects/bookitzz.png",
    iconLists: ["/next.svg", "/typescript.svg", "/redis.svg", "/neon.svg", "/drizzle.svg"],
    link: "https://github.com/AnupamSingh2004/BookItzz",
    liveLink: "https://book-itzz.vercel.app/",
  },
  {
    id: 3,
    title: "Chatter - Real-time Chat App",
    des: "Full-stack chat application with Socket.io, Google Auth, and sub-100ms message delivery. Responsive design across 15+ device sizes.",
    img: "/projects/chatter.png",
    iconLists: ["/react.svg", "/nodejs.svg", "/socketio.svg", "/tailwind.svg", "/express.svg"],
    link: "https://github.com/AnupamSingh2004/Chatter",
    liveLink: null,
  },
  {
    id: 4,
    title: "Open Source Contributions",
    des: "Contributing to TimeWarp and Busify repositories, optimizing performance and implementing scalability improvements.",
    img: "/projects/github.png",
    iconLists: ["/github.svg", "/javascript.svg", "/python.svg", "/optimization.svg"],
    link: "https://github.com/AnupamSingh2004",
    liveLink: null,
  },
]

export const moreProjects = [
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
  devops: ["Terraform", "Jenkins", "Kubernetes"],
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
