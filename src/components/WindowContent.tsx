import React from "react";
import {
  Github,
  Linkedin,
  Mail,
  MapPin,
  Calendar,
  Code,
  Database,
  Globe,
  Smartphone,
  ExternalLink,
  Download,
  Star,
  Users,
  Award,
} from "lucide-react";

interface WindowContentProps {
  app: string;
  isDark: boolean;
}

const WindowContent: React.FC<WindowContentProps> = ({ app, isDark }) => {
  const textColor = isDark ? "text-white" : "text-gray-900";
  const secondaryTextColor = isDark ? "text-gray-300" : "text-gray-600";
  const accentColor = isDark ? "text-blue-400" : "text-blue-600";
  const cardBg = isDark ? "bg-gray-800/50" : "bg-white/50";
  const borderColor = isDark ? "border-gray-700/50" : "border-gray-200/50";

  const projects = [
    {
      title: "AI-Powered Portfolio Optimizer",
      description:
        "Machine learning tool that analyzes and optimizes investment portfolios using real-time market data and predictive algorithms.",
      tech: ["Python", "TensorFlow", "React", "Node.js", "PostgreSQL"],
      link: "#",
      stars: 234,
      image:
        "https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=400",
    },
    {
      title: "Real-time Chat Application",
      description:
        "Scalable chat application with end-to-end encryption, multimedia support, and real-time collaboration features.",
      tech: ["React", "Socket.io", "MongoDB", "Express", "Redis"],
      link: "#",
      stars: 189,
      image:
        "https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=400",
    },
    {
      title: "E-commerce Analytics Dashboard",
      description:
        "Comprehensive analytics platform for e-commerce businesses with predictive insights and automated reporting.",
      tech: ["Vue.js", "D3.js", "PostgreSQL", "Docker", "AWS"],
      link: "#",
      stars: 156,
      image:
        "https://images.pexels.com/photos/590016/pexels-photo-590016.jpeg?auto=compress&cs=tinysrgb&w=400",
    },
  ];

  const skills = [
    {
      category: "Frontend Development",
      items: [
        "React",
        "Vue.js",
        "TypeScript",
        "Tailwind CSS",
        "Next.js",
        "Svelte",
      ],
      icon: Globe,
      level: 95,
    },
    {
      category: "Backend Development",
      items: [
        "Node.js",
        "Python",
        "PostgreSQL",
        "MongoDB",
        "Express",
        "FastAPI",
      ],
      icon: Database,
      level: 90,
    },
    {
      category: "DevOps & Tools",
      items: ["Docker", "Git", "AWS", "Kubernetes", "CI/CD", "Terraform"],
      icon: Code,
      level: 85,
    },
    {
      category: "Mobile Development",
      items: ["React Native", "Flutter", "iOS", "Android", "Expo"],
      icon: Smartphone,
      level: 75,
    },
  ];

  switch (app) {
    case "home":
      return (
        <div
          className="p-8"
          style={{
            fontFamily:
              '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Helvetica Neue", Arial, sans-serif',
          }}
        >
          <div className="text-center mb-12">
            <div className="w-32 h-32 rounded-full mx-auto mb-6 shadow-2xl overflow-hidden">
              <img
                src="/profil.jpeg"
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>

            <h1 className={`text-5xl font-light mb-4 ${textColor}`}>
              M Syifaul Anam
            </h1>
            <p className={`text-2xl font-light ${secondaryTextColor} mb-8`}>
              Student
            </p>
            <div className="flex items-center justify-center space-x-8 mb-8">
              <div className={`flex items-center ${secondaryTextColor}`}>
                <MapPin size={18} className="mr-2" />
                Surabaya, Jawa Timur
              </div>
              <div className={`flex items-center ${secondaryTextColor}`}>
                <Calendar size={18} className="mr-2" />
                Available for work
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center justify-center space-x-4 mb-12">
              <a
                href="https://github.com/faulnam"
                target="_blank"
                rel="noopener noreferrer"
                className={`p-3 rounded-full transition-all duration-200 hover:scale-110 ${cardBg} border ${borderColor}`}
              >
                <Github size={20} className={accentColor} />
              </a>

              <a
                href="https://linkedin.com/in/faulnam"
                target="_blank"
                rel="noopener noreferrer"
                className={`p-3 rounded-full transition-all duration-200 hover:scale-110 ${cardBg} border ${borderColor}`}
              >
                <Linkedin size={20} className={accentColor} />
              </a>

              <a
                href="syifakul.anm@gmail.com"
                className={`p-3 rounded-full transition-all duration-200 hover:scale-110 ${cardBg} border ${borderColor}`}
              >
                <Mail size={20} className={accentColor} />
              </a>

              <a
                href="/M SYIFAUL ANAM (CV-ATS) (1).pdf"
                download
                className="px-4 py-2 rounded-full transition-all duration-200 hover:scale-105 bg-blue-600 hover:bg-blue-700 text-white flex items-center space-x-2"
              >
                <Download size={16} />
                <span>Download CV</span>
              </a>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div
              className={`p-6 rounded-2xl ${cardBg} border ${borderColor} backdrop-blur-sm`}
            >
              <h2 className={`text-2xl font-semibold mb-4 ${textColor}`}>
                About Me
              </h2>
              <p
                className={`text-justify ${secondaryTextColor} leading-relaxed mb-4`}
              >
                I'm Syifaul Anam, an Informatics student based in Sidoarjo. I'm
                passionate about front-end development and user interface
                design.
              </p>
              <p
                className={`text-justify ${secondaryTextColor} leading-relaxed`}
              >
                With a strong interest in creating responsive, accessible, and
                interactive web applications, I strive to build clean, efficient
                code and engaging digital experiences.
              </p>
            </div>

            <div
              className={`p-6 rounded-2xl ${cardBg} border ${borderColor} backdrop-blur-sm`}
            >
              <h2 className={`text-2xl font-semibold mb-6 ${textColor}`}>
                Quick Stats
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className={`text-3xl font-bold ${accentColor} mb-1`}>
                    10+
                  </div>
                  <div className={`text-sm ${secondaryTextColor}`}>
                    Projects
                  </div>
                </div>
                <div className="text-center">
                  <div className={`text-3xl font-bold ${accentColor} mb-1`}>
                    3+
                  </div>
                  <div className={`text-sm ${secondaryTextColor}`}>
                    Years Exp
                  </div>
                </div>
                <div className="text-center">
                  <div className={`text-3xl font-bold ${accentColor} mb-1`}>
                    30+
                  </div>
                  <div className={`text-sm ${secondaryTextColor}`}>
                    Happy Clients
                  </div>
                </div>
                <div className="text-center">
                  <div className={`text-3xl font-bold ${accentColor} mb-1`}>
                    ∞
                  </div>
                  <div className={`text-sm ${secondaryTextColor}`}>Coffee</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );

    case "about":
      return (
        <div
          className="p-8"
          style={{
            fontFamily:
              '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Helvetica Neue", Arial, sans-serif',
          }}
        >
          <h1 className={`text-4xl font-light mb-8 ${textColor}`}>About Me</h1>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="md:col-span-2">
              <h2 className={`text-2xl font-semibold mb-6 ${textColor}`}>
                My Journey
              </h2>
              <div className="space-y-6">
                <p
                  className={`text-justify ${secondaryTextColor} leading-relaxed text-lg`}
                >
                  My journey into web development began during my Informatics
                  studies in Sidoarjo. What started as a curiosity about how
                  user interfaces work quickly turned into a deep passion for
                  building meaningful and interactive digital experiences.
                </p>
                <p
                  className={`text-justify ${secondaryTextColor} leading-relaxed text-lg`}
                >
                  I'm especially drawn to front-end development and UI
                  design—creating clean, responsive, and accessible interfaces
                  that are both visually appealing and user-friendly. I take
                  pride in building designs that not only look great but also
                  deliver intuitive experiences.
                </p>
                <p
                  className={`text-justify ${secondaryTextColor} leading-relaxed text-lg`}
                >
                  For me, every project is a new opportunity to learn, grow, and
                  solve real-world problems through code. I'm committed to
                  continuously improving my skills and contributing to a better,
                  more thoughtful web.
                </p>
              </div>
            </div>

            <div
              className={`p-6 rounded-2xl ${cardBg} border ${borderColor} backdrop-blur-sm h-fit`}
            >
              <h2 className={`text-xl font-semibold mb-4 ${textColor}`}>
                Core Values
              </h2>
              <ul className={`space-y-3 ${secondaryTextColor}`}>
                <li className="flex items-center">
                  <span className="text-2xl mr-3">🎯</span>
                  User-centered design
                </li>
                <li className="flex items-center">
                  <span className="text-2xl mr-3">📱</span>
                  Mobile-first approach
                </li>
                <li className="flex items-center">
                  <span className="text-2xl mr-3">🚀</span>
                  Performance optimization
                </li>
                <li className="flex items-center">
                  <span className="text-2xl mr-3">🔄</span>
                  Continuous learning
                </li>
                <li className="flex items-center">
                  <span className="text-2xl mr-3">🤝</span>
                  Collaboration
                </li>
                <li className="flex items-center">
                  <span className="text-2xl mr-3">♿</span>
                  Accessibility for all
                </li>
              </ul>
            </div>
          </div>

          <div>
            <h2 className={`text-2xl font-semibold mb-8 ${textColor}`}>
              My Experience
            </h2>
            <div className="space-y-8">
              {/* Project 1 */}
              <div
                className={`p-6 rounded-2xl ${cardBg} border ${borderColor} backdrop-blur-sm border-l-4 border-l-blue-500`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className={`text-xl font-semibold ${textColor}`}>
                      Modern E-Commerce Platform
                    </h3>
                    <p className={`${accentColor} font-medium`}>
                      Personal Project • 2025
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Users size={16} className={secondaryTextColor} />
                    <span className={`text-sm ${secondaryTextColor}`}>
                      Solo Developer
                    </span>
                  </div>
                </div>
                <p className={`${secondaryTextColor} leading-relaxed`}>
                  A full-stack online store built using React and Node.js.
                  Includes features like product management, shopping cart, and
                  secure checkout process. Designed with responsiveness and
                  performance in mind.
                </p>
              </div>

              {/* Project 2 */}
              <div
                className={`p-6 rounded-2xl ${cardBg} border ${borderColor} backdrop-blur-sm border-l-4 border-l-green-500`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className={`text-xl font-semibold ${textColor}`}>
                      Employee Attendance System
                    </h3>
                    <p className={`${accentColor} font-medium`}>
                      Personal Project • 2025
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Award size={16} className={secondaryTextColor} />
                    <span className={`text-sm ${secondaryTextColor}`}>
                      Built from Scratch
                    </span>
                  </div>
                </div>
                <p className={`${secondaryTextColor} leading-relaxed`}>
                  A web-based application to manage employee attendance and
                  generate daily reports. Developed using modern web
                  technologies with a focus on simplicity and accuracy in data
                  processing.
                </p>
              </div>

              {/* Project 3 */}
              <div
                className={`p-6 rounded-2xl ${cardBg} border ${borderColor} backdrop-blur-sm border-l-4 border-l-purple-500`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className={`text-xl font-semibold ${textColor}`}>
                      Online Store Prototype
                    </h3>
                    <p className={`${accentColor} font-medium`}>
                      Personal Project • 2025
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Star size={16} className={secondaryTextColor} />
                    <span className={`text-sm ${secondaryTextColor}`}>
                      UI/UX Focused
                    </span>
                  </div>
                </div>
                <p className={`${secondaryTextColor} leading-relaxed`}>
                  A responsive and interactive prototype for an online retail
                  store. Features a clean product catalog, shopping cart
                  interface, and smooth navigation—designed with user experience
                  as the main priority.
                </p>
              </div>
            </div>
          </div>
        </div>
      );

    case "skills":
      return (
        <div
          className="p-8"
          style={{
            fontFamily:
              '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Helvetica Neue", Arial, sans-serif',
          }}
        >
          <h1 className={`text-4xl font-light mb-8 ${textColor}`}>
            Skills & Expertise
          </h1>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {skills.map((skillGroup, index) => {
              const IconComponent = skillGroup.icon;
              return (
                <div
                  key={skillGroup.category}
                  className={`p-6 rounded-2xl ${cardBg} border ${borderColor} backdrop-blur-sm hover:shadow-lg transition-all duration-300`}
                >
                  <div className="flex items-center mb-6">
                    <div
                      className={`p-3 rounded-xl mr-4 bg-gradient-to-br from-blue-500 to-purple-600`}
                    >
                      <IconComponent className="text-white" size={24} />
                    </div>
                    <div>
                      <h2 className={`text-xl font-semibold ${textColor}`}>
                        {skillGroup.category}
                      </h2>
                      <div className="flex items-center mt-1">
                        <div
                          className={`w-20 h-2 rounded-full ${
                            isDark ? "bg-gray-700" : "bg-gray-200"
                          } mr-2`}
                        >
                          <div
                            className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-1000"
                            style={{ width: `${skillGroup.level}%` }}
                          />
                        </div>
                        <span className={`text-sm ${secondaryTextColor}`}>
                          {skillGroup.level}%
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {skillGroup.items.map((skill) => (
                      <span
                        key={skill}
                        className={`px-3 py-1 rounded-full text-sm transition-all duration-200 hover:scale-105 ${
                          isDark
                            ? "bg-blue-900/50 text-blue-300 border border-blue-800/50"
                            : "bg-blue-100 text-blue-800 border border-blue-200"
                        }`}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          <div
            className={`p-6 rounded-2xl ${cardBg} border ${borderColor} backdrop-blur-sm`}
          >
            <h2 className={`text-2xl font-semibold mb-6 ${textColor}`}>
              Proficiency Overview
            </h2>
            <div className="space-y-6">
              {[
                {
                  skill: "JavaScript/TypeScript",
                  level: 95,
                  color: "from-yellow-400 to-orange-500",
                },
                {
                  skill: "React/Next.js",
                  level: 90,
                  color: "from-blue-400 to-cyan-500",
                },
                {
                  skill: "Node.js/Express",
                  level: 85,
                  color: "from-green-400 to-emerald-500",
                },
                {
                  skill: "Database Design",
                  level: 80,
                  color: "from-purple-400 to-pink-500",
                },
                {
                  skill: "UI/UX Design",
                  level: 75,
                  color: "from-red-400 to-rose-500",
                },
                {
                  skill: "Mobile Development",
                  level: 70,
                  color: "from-indigo-400 to-purple-500",
                },
              ].map((item) => (
                <div key={item.skill}>
                  <div className="flex justify-between mb-2">
                    <span className={`font-medium ${textColor}`}>
                      {item.skill}
                    </span>
                    <span className={`${secondaryTextColor}`}>
                      {item.level}%
                    </span>
                  </div>
                  <div
                    className={`w-full rounded-full h-3 ${
                      isDark ? "bg-gray-700" : "bg-gray-200"
                    }`}
                  >
                    <div
                      className={`bg-gradient-to-r ${item.color} h-3 rounded-full transition-all duration-1000 shadow-sm`}
                      style={{ width: `${item.level}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      );

    case "projects":
      return (
        <div
          className="p-8"
          style={{
            fontFamily:
              '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Helvetica Neue", Arial, sans-serif',
          }}
        >
          <h1 className={`text-4xl font-light mb-8 ${textColor}`}>
            Featured Projects
          </h1>

          <div className="grid gap-8">
            {[
              {
                title: "Modern E-Commerce Platform",
                image: "/Web onlin.png",
                description:
                  "A full-stack online store built with React and Node.js, featuring product management and secure checkout.",
                tech: ["React", "Node.js", "MongoDB", "Tailwind CSS"],
                stars: 120,
              },
              {
                title: "Employee Attendance System",
                image: "/SI.png",
                description:
                  "A web-based attendance system to manage employee presence and generate daily reports efficiently.",
                tech: ["HTML", "CSS", "PHP", "MySQL"],
                stars: 85,
              },
              {
                title: "Online Store Prototype",
                image: "/web.png",
                description:
                  "A responsive web prototype for online retail with a shopping cart and product display.",
                tech: ["Figma", "HTML", "CSS", "JavaScript"],
                stars: 95,
              },
              {
                title: "Personal Portfolio Website",
                image: "/webpersonal.png",
                description:
                  "An interactive portfolio site to showcase my profile, skills, and recent projects.",
                tech: ["Next.js", "Tailwind CSS", "TypeScript"],
                stars: 200,
              },
              {
                title: "Dynamic Blog Platform",
                image: "/Blog.png",
                description:
                  "A CMS-based blog with user authentication, commenting, and rich text editing.",
                tech: ["React", "Firebase", "QuillJS"],
                stars: 110,
              },
              {
                title: "Creative Canva Designs",
                image: "/design.png",
                description:
                  "A collection of digital marketing visuals and templates made using Canva.",
                tech: ["Canva", "Brand Design", "Marketing"],
                stars: 50,
              },
              {
                title: "Educational Game - Hijaiyah",
                image: "/game.png",
                description:
                  "An interactive Arabic game built with Construct 2 to teach children Hijaiyah letters.",
                tech: ["Construct 2", "Game Design"],
                stars: 130,
              },
              {
                title: "Social Media Growth Strategy",
                image: "/sms.png",
                description:
                  "Grew a TikTok account to over 1,000 followers in 2 months with content planning and analytics.",
                tech: ["TikTok", "Analytics", "Content Strategy"],
                stars: 70,
              },
              {
                title: "UI/UX Design Case Study",
                image: "/uiux.png",
                description:
                  "A comprehensive UI/UX case study focusing on user flow and usability for web and mobile.",
                tech: ["Figma", "UX Research", "Wireframing"],
                stars: 100,
              },
              {
                title: "Social Blog Website",
                image: "/web3.png",
                description:
                  "A social-themed blog platform for community interaction, complete with tags and filters.",
                tech: ["Laravel", "MySQL", "Bootstrap"],
                stars: 90,
              },
            ].map((project, index) => (
              <div
                key={index}
                className={`rounded-2xl border transition-all duration-300 hover:shadow-xl hover:scale-[1.02] ${cardBg} ${borderColor} backdrop-blur-sm overflow-hidden`}
              >
                <div className="md:flex">
                  <div className="md:w-1/3">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-48 md:h-full object-cover"
                    />
                  </div>
                  <div className="md:w-2/3 p-6">
                    <div className="flex items-start justify-between mb-4">
                      <h3 className={`text-2xl font-semibold ${textColor}`}>
                        {project.title}
                      </h3>
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-1">
                          <Star size={16} className={accentColor} />
                          <span className={`text-sm ${secondaryTextColor}`}>
                            {project.stars}
                          </span>
                        </div>
                        <button
                          className={`p-2 rounded-lg transition-colors hover:scale-110 duration-200 ${
                            isDark
                              ? "hover:bg-gray-700 text-gray-400 hover:text-white"
                              : "hover:bg-gray-100 text-gray-600 hover:text-gray-900"
                          }`}
                        >
                          <ExternalLink size={18} />
                        </button>
                      </div>
                    </div>

                    <p
                      className={`${secondaryTextColor} mb-6 leading-relaxed text-lg`}
                    >
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.tech.map((tech) => (
                        <span
                          key={tech}
                          className={`px-3 py-1 rounded-full text-sm ${
                            isDark
                              ? "bg-gray-700/50 text-gray-300 border border-gray-600/50"
                              : "bg-gray-100 text-gray-700 border border-gray-200"
                          }`}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className={`${secondaryTextColor} mb-6 text-lg`}>
              Want to see more of my work?
            </p>
            <a
              href="https://github.com/faulnam?tab=repositories"
              target="_blank"
              rel="noopener noreferrer"
              className={`px-8 py-3 inline-block rounded-lg font-medium transition-all duration-200 hover:scale-105 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg`}
            >
              View All Projects on GitHub
            </a>
          </div>
        </div>
      );

    case "contact":
      return (
        <div
          className="p-8"
          style={{
            fontFamily:
              '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Helvetica Neue", Arial, sans-serif',
          }}
        >
          <h1 className={`text-4xl font-light mb-8 ${textColor}`}>
            Get In Touch
          </h1>

          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className={`text-2xl font-semibold mb-8 ${textColor}`}>
                Contact Information
              </h2>

              <div className="space-y-6">
                <div
                  className={`flex items-center p-4 rounded-xl ${cardBg} border ${borderColor} backdrop-blur-sm hover:shadow-lg transition-all duration-300`}
                >
                  <div
                    className={`p-3 rounded-lg mr-4 bg-gradient-to-br from-red-500 to-pink-600`}
                  >
                    <Mail className="text-white" size={20} />
                  </div>
                  <div>
                    <p className={`font-semibold ${textColor}`}>Email</p>
                    <p
                      className={`${accentColor} hover:underline cursor-pointer`}
                    >
                      syifakul.anm@gmail.com
                    </p>
                  </div>
                </div>

                <div
                  className={`flex items-center p-4 rounded-xl ${cardBg} border ${borderColor} backdrop-blur-sm hover:shadow-lg transition-all duration-300`}
                >
                  <div
                    className={`p-3 rounded-lg mr-4 bg-gradient-to-br from-blue-500 to-blue-600`}
                  >
                    <Linkedin className="text-white" size={20} />
                  </div>
                  <div>
                    <p className={`font-semibold ${textColor}`}>LinkedIn</p>
                    <p
                      className={`${accentColor} hover:underline cursor-pointer`}
                    >
                      linkedin.com/in/faulnam
                    </p>
                  </div>
                </div>

                <div
                  className={`flex items-center p-4 rounded-xl ${cardBg} border ${borderColor} backdrop-blur-sm hover:shadow-lg transition-all duration-300`}
                >
                  <div
                    className={`p-3 rounded-lg mr-4 bg-gradient-to-br from-gray-700 to-gray-900`}
                  >
                    <Github className="text-white" size={20} />
                  </div>
                  <div>
                    <p className={`font-semibold ${textColor}`}>GitHub</p>
                    <p
                      className={`${accentColor} hover:underline cursor-pointer`}
                    >
                      github.com/faulnam
                    </p>
                  </div>
                </div>
              </div>

              <div
                className={`mt-12 p-6 rounded-2xl ${cardBg} border ${borderColor} backdrop-blur-sm`}
              >
                <h3 className={`text-xl font-semibold mb-4 ${textColor}`}>
                  Let's Work Together
                </h3>
                <p className={`text-justify ${secondaryTextColor} leading-relaxed text-lg`}>
                  I'm always interested in hearing about new opportunities and
                  exciting projects. Whether you have a question, want to
                  discuss a project, or just want to say hi, I'd love to hear
                  from you!
                </p>
              </div>
            </div>

            <div>
              <h2 className={`text-2xl font-semibold mb-8 ${textColor}`}>
                Send a Message
              </h2>

              <form
                className="space-y-6"
                action="https://formspree.io/f/mwpkbgvz" // ← GANTI dengan Formspree endpoint kamu
                method="POST"
              >
                <div>
                  <label
                    className={`block text-sm font-semibold mb-3 ${textColor}`}
                    htmlFor="name"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    required
                    className={`w-full px-4 py-3 rounded-xl border transition-all duration-200 focus:scale-[1.02] ${
                      isDark
                        ? "bg-gray-800/50 border-gray-700/50 text-white focus:border-blue-500 backdrop-blur-sm"
                        : "bg-white/50 border-gray-300/50 text-gray-900 focus:border-blue-500 backdrop-blur-sm"
                    } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label
                    className={`block text-sm font-semibold mb-3 ${textColor}`}
                    htmlFor="email"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    required
                    className={`w-full px-4 py-3 rounded-xl border transition-all duration-200 focus:scale-[1.02] ${
                      isDark
                        ? "bg-gray-800/50 border-gray-700/50 text-white focus:border-blue-500 backdrop-blur-sm"
                        : "bg-white/50 border-gray-300/50 text-gray-900 focus:border-blue-500 backdrop-blur-sm"
                    } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                    placeholder="your.email@example.com"
                  />
                </div>

                <div>
                  <label
                    className={`block text-sm font-semibold mb-3 ${textColor}`}
                    htmlFor="message"
                  >
                    Message
                  </label>
                  <textarea
                    name="message"
                    id="message"
                    rows={6}
                    required
                    className={`w-full px-4 py-3 rounded-xl border transition-all duration-200 focus:scale-[1.02] resize-none ${
                      isDark
                        ? "bg-gray-800/50 border-gray-700/50 text-white focus:border-blue-500 backdrop-blur-sm"
                        : "bg-white/50 border-gray-300/50 text-gray-900 focus:border-blue-500 backdrop-blur-sm"
                    } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                    placeholder="Tell me about your project or just say hello!"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 hover:scale-105 shadow-lg"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      );

    default:
      return <div className="p-8">Content not found</div>;
  }
};

export default WindowContent;
