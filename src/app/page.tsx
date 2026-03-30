"use client";

import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";

const navItems = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" },
] as const;

type Theme = "dark" | "light";

export default function Home() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [theme, setTheme] = useState<Theme>("dark");
  const [activeSection, setActiveSection] = useState("hero");

  const typewriterRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    const savedTheme = (localStorage.getItem("theme") as Theme | null) ?? "dark";
    const nextTheme: Theme = savedTheme === "light" ? "light" : "dark";
    setTheme(nextTheme);
    document.documentElement.setAttribute("data-theme", nextTheme);
  }, []);

  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  useEffect(() => {
    const typeEl = typewriterRef.current;
    if (!typeEl) return;

    const phrases = [
      "Building full-stack web apps",
      "React · Next.js · TypeScript",
      "FastAPI · PostgreSQL · Redis",
      "AI-powered features with OpenAI",
      "Real-time apps with WebSocket",
      "Clean, production-ready code",
    ];

    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    typeEl.textContent = "";

    let timeoutId: number | undefined;
    const tick = () => {
      const current = phrases[phraseIndex];

      if (isDeleting) {
        typeEl.textContent = current.substring(0, charIndex--);
      } else {
        typeEl.textContent = current.substring(0, charIndex++);
      }

      let delay = isDeleting ? 40 : 75;

      if (!isDeleting && charIndex === current.length + 1) {
        delay = 2000;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        delay = 400;
      }

      timeoutId = window.setTimeout(tick, delay);
    };

    timeoutId = window.setTimeout(tick, 800);

    return () => {
      if (timeoutId) window.clearTimeout(timeoutId);
    };
  }, []);

  useEffect(() => {
    const fadeEls = Array.from(
      document.querySelectorAll<HTMLElement>(".fade-up"),
    );
    if (!fadeEls.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
    );

    fadeEls.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>("section[id]"),
    );
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const id = (entry.target as HTMLElement).id;
          setActiveSection(id);
        });
      },
      { threshold: 0.4 },
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <nav id="navbar">
        <div className="nav-inner">
          <Link href="/#hero" className="nav-logo">
            LIT
          </Link>

          <div className="nav-links">
            {navItems.map((item) => (
              <Link
                key={item.id}
                href={`/#${item.id}`}
                className={activeSection === item.id ? "active" : ""}
              >
                {item.label}
              </Link>
            ))}
            <button
              className="theme-btn"
              id="themeToggle"
              aria-label="Toggle theme"
              type="button"
              onClick={() => setTheme((t) => (t === "dark" ? "light" : "dark"))}
            >
              {/* Moon icon */}
              <svg
                className="icon-moon"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
              {/* Sun icon */}
              <svg
                className="icon-sun"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="5" />
                <line x1="12" y1="1" x2="12" y2="3" />
                <line x1="12" y1="21" x2="12" y2="23" />
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                <line x1="1" y1="12" x2="3" y2="12" />
                <line x1="21" y1="12" x2="23" y2="12" />
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
              </svg>
            </button>
          </div>

          <button
            className={`hamburger ${mobileOpen ? "open" : ""}`}
            id="hamburger"
            aria-label="Open menu"
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>

        <div
          className={`mobile-menu ${mobileOpen ? "open" : ""}`}
          id="mobileMenu"
        >
          {navItems.map((item) => (
            <Link
              key={item.id}
              href={`/#${item.id}`}
              className={activeSection === item.id ? "active" : ""}
              onClick={() => setMobileOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </nav>

      {/* HERO */}
      <section id="hero">
        <div className="container">
          <div className="hero-inner">
            <div className="hero-content">
              <div className="hero-greeting fade-up">
                <span className="dot"></span>
                Available for new opportunities
              </div>

              <h1 className="hero-name fade-up delay-1">
                Lei Ieong
                <br />
                Tam
              </h1>

              <p className="hero-role fade-up delay-2">Full Stack Developer</p>

              <div className="hero-typewriter fade-up delay-3">
                <span id="typewriter-text" ref={typewriterRef} />
                <span className="cursor"></span>
              </div>

              <div className="hero-cta fade-up delay-4">
                <Link href="/#projects" className="btn-primary">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="3" y="3" width="7" height="7" />
                    <rect x="14" y="3" width="7" height="7" />
                    <rect x="14" y="14" width="7" height="7" />
                    <rect x="3" y="14" width="7" height="7" />
                  </svg>
                  View Projects
                </Link>
                <a
                  href="/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1="12" y1="15" x2="12" y2="3" />
                  </svg>
                  Download Resume
                </a>
              </div>
            </div>

            <div className="hero-avatar fade-up delay-2">
              <div className="avatar-glow"></div>
              <div className="avatar-ring">
                <div className="avatar-inner">
                  <img
                    src="/images/profile_image.jpg"
                    alt="Lei Ieong Tam"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about">
        <div className="container">
          <p className="section-label fade-up">About Me</p>
          <h2 className="section-title fade-up delay-1">
            Building things <span>that matter</span>
          </h2>

          <div className="about-grid">
            <div className="about-text fade-up delay-1">
              <p>
                I&apos;m a <strong>Full Stack Developer</strong> with a background in
                economics and a passion for building products that combine strong
                engineering with thoughtful design.
              </p>
              <p>
                I thrive at the intersection of{" "}
                <strong>frontend precision</strong> and{" "}
                <strong>backend architecture</strong> — from translating Figma
                wireframes into pixel-perfect UIs to designing scalable APIs and
                integrating AI-driven workflows.
              </p>
              <p>
                Currently crafting features at <strong>Above The Spread</strong>,
                a football social platform in Toronto. Previously built production
                modules at <strong>Futurenest</strong> (Taipei) including an AI
                chatbot, data dashboards, and a report generation system.
              </p>
            </div>

            <div className="edu-cards fade-up delay-2">
              <p className="section-label" style={{ marginBottom: "1rem" }}>
                Education
              </p>

              <div className="edu-card">
                <div className="degree">Computer Programming</div>
                <div className="school">Humber Polytechnic</div>
                <div className="edu-meta">
                  <span>🇨🇦 Canada</span>
                  <span>2023 – 2025</span>
                </div>
              </div>

              <div className="edu-card">
                <div className="degree">Bachelor of Economics</div>
                <div className="school">Soochow University</div>
                <div className="edu-meta">
                  <span>🇹🇼 Taiwan</span>
                  <span>2015 – 2020</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* EXPERIENCE */}
      <section id="experience">
        <div className="container">
          <p className="section-label fade-up">Work History</p>
          <h2 className="section-title fade-up delay-1">
            Where I&apos;ve <span>worked</span>
          </h2>

          <div className="timeline">
            <div className="timeline-item fade-up delay-1">
              <div className="timeline-dot"></div>
              <div className="timeline-card">
                <div className="tl-header">
                  <div className="company-logo">
                    <img src="/images/company_1.png" alt="Above The Spread" />
                  </div>
                  <div className="tl-info">
                    <div className="tl-role">Full Stack Developer</div>
                    <div className="tl-company">
                      <a
                        href="https://www.abovethespread.com/"
                        target="_blank"
                        rel="noopener"
                      >
                        Above The Spread ↗
                      </a>
                    </div>
                    <div className="tl-meta">
                      <span>🇨🇦 Toronto, CA</span>
                      <span>Sep 2025 – Present</span>
                    </div>
                  </div>
                </div>

                <ul className="tl-bullets">
                  <li>
                    Collaborated with clients to gather requirements and translate
                    them into technical solutions.
                  </li>
                  <li>
                    Designed UI layouts and implemented full-stack features.
                  </li>
                  <li>
                    Built and maintained full-stack features using React, Next.js,
                    FastAPI, and PostgreSQL.
                  </li>
                  <li>
                    Integrated FootballAPI to display live match data, scores, and
                    statistics.
                  </li>
                  <li>
                    Automated content generation by scraping news sources and
                    using OpenAI to produce match previews.
                  </li>
                  <li>
                    Developed a community platform for users to share picks and
                    opinions.
                  </li>
                </ul>

                <div className="badge-row">
                  <span className="badge badge-blue">React</span>
                  <span className="badge badge-blue">Next.js</span>
                  <span className="badge badge-blue">TypeScript</span>
                  <span className="badge badge-blue">Tailwind CSS</span>
                  <span className="badge badge-teal">FastAPI</span>
                  <span className="badge badge-teal">PostgreSQL</span>
                  <span className="badge badge-teal">Redis</span>
                  <span className="badge badge-teal">Celery</span>
                  <span className="badge badge-gray">AWS</span>
                  <span className="badge badge-gray">OpenAI</span>
                  <span className="badge badge-gray">Figma</span>
                </div>
              </div>
            </div>

            <div className="timeline-item fade-up delay-2">
              <div className="timeline-dot"></div>
              <div className="timeline-card">
                <div className="tl-header">
                  <div className="company-logo">
                    <img src="/images/company_2.jpeg" alt="Futurenest" />
                  </div>
                  <div className="tl-info">
                    <div className="tl-role">Frontend Developer</div>
                    <div className="tl-company">
                      <a
                        href="https://www.futurenest.com/"
                        target="_blank"
                        rel="noopener"
                      >
                        Futurenest ↗
                      </a>
                    </div>
                    <div className="tl-meta">
                      <span>🇹🇼 Taipei, TW</span>
                      <span>Dec 2024 – Jun 2025</span>
                    </div>
                  </div>
                </div>

                <ul className="tl-bullets">
                  <li>
                    Led frontend development for Xerno, translating Figma designs
                    into fully functional, production-ready features.
                  </li>
                  <li>
                    Built core product modules including an AI-agent chatbot, data
                    management platform, dynamic charts, and a report generation
                    system.
                  </li>
                  <li>
                    Collaborated closely with PMs, designers, and backend
                    developers to align on requirements, data contracts, and UX
                    improvements.
                  </li>
                </ul>

                <div className="badge-row">
                  <span className="badge badge-blue">React</span>
                  <span className="badge badge-blue">Next.js</span>
                  <span className="badge badge-blue">TypeScript</span>
                  <span className="badge badge-blue">Tailwind CSS</span>
                  <span className="badge badge-teal">Django</span>
                  <span className="badge badge-teal">PostgreSQL</span>
                  <span className="badge badge-gray">Docker</span>
                  <span className="badge badge-gray">RAG</span>
                  <span className="badge badge-gray">LLamaIndex</span>
                  <span className="badge badge-gray">Figma</span>
                  <span className="badge badge-gray">Git</span>
                </div>
              </div>
            </div>

            <div className="timeline-item fade-up delay-3">
              <div className="timeline-dot"></div>
              <div className="timeline-card">
                <div className="tl-header">
                  <div className="company-logo">
                    <img
                      src="/images/company_3.svg"
                      alt="Macau Light Rapid Transit"
                    />
                  </div>
                  <div className="tl-info">
                    <div className="tl-role">Customer Service Officer</div>
                    <div className="tl-company">
                      <a
                        href="https://www.mlm.com.mo/en/"
                        target="_blank"
                        rel="noopener"
                      >
                        Macau Light Rapid Transit ↗
                      </a>
                    </div>
                    <div className="tl-meta">
                      <span>🇲🇴 Macau, MO</span>
                      <span>Mar 2021 – Aug 2023</span>
                    </div>
                  </div>
                </div>

                <ul className="tl-bullets">
                  <li>
                    Tracked and reconciled daily revenue and expenses in Excel to
                    ensure accurate financial records.
                  </li>
                  <li>
                    Prepared clear financial performance and operations reports
                    for management review.
                  </li>
                </ul>

                <div className="badge-row">
                  <span className="badge badge-gray">Excel</span>
                  <span className="badge badge-gray">Word</span>
                  <span className="badge badge-gray">PowerPoint</span>
                  <span className="badge badge-gray">Outlook</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects">
        <div className="container">
          <p className="section-label fade-up">Personal Work</p>
          <h2 className="section-title fade-up delay-1">
            Things I&apos;ve <span>built</span>
          </h2>

          <div className="projects-grid">
            <div className="project-card fade-up delay-1">
              <div className="project-img">
                <img src="/images/project_1.jpeg" alt="Peter Wordle" loading="lazy" />
                <div className="project-img-overlay"></div>
              </div>

              <div className="project-body">
                <div className="project-title">
                  <a
                    href="https://peterwordle.online"
                    target="_blank"
                    rel="noopener"
                  >
                    Peter Wordle <span className="ext-icon">↗</span>
                  </a>
                </div>

                <ul className="project-desc">
                  <li>
                    Developed a two-player Wordle game leveraging WebSocket for
                    real-time gameplay.
                  </li>
                  <li>
                    Implemented a dark mode feature to enhance user experience.
                  </li>
                  <li>
                    Designed a responsive website optimized for both mobile and
                    laptop devices.
                  </li>
                </ul>

                <div className="badge-row">
                  <span className="badge badge-blue">Next.js</span>
                  <span className="badge badge-blue">Tailwind CSS</span>
                  <span className="badge badge-teal">Node.js</span>
                  <span className="badge badge-teal">WebSocket</span>
                </div>

                <a
                  href="https://peterwordle.online"
                  target="_blank"
                  rel="noopener"
                  className="project-link"
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                    <polyline points="15 3 21 3 21 9" />
                    <line x1="10" y1="14" x2="21" y2="3" />
                  </svg>
                  Live Site
                </a>
              </div>
            </div>

            <div className="project-card fade-up delay-2">
              <div className="project-img">
                <img src="/images/project_2.jpeg" alt="Peter Shop" loading="lazy" />
                <div className="project-img-overlay"></div>
              </div>

              <div className="project-body">
                <div className="project-title">
                  <a
                    href="https://www.petershop.shop/"
                    target="_blank"
                    rel="noopener"
                  >
                    Peter Shop <span className="ext-icon">↗</span>
                  </a>
                </div>

                <ul className="project-desc">
                  <li>
                    A full-stack e-commerce platform built with Next.js and
                    Django, backed by a PostgreSQL database hosted on Neon.
                  </li>
                  <li>
                    Fully responsive across laptop and mobile devices, supports
                    dark and light mode toggling.
                  </li>
                </ul>

                <div className="badge-row">
                  <span className="badge badge-blue">Next.js</span>
                  <span className="badge badge-blue">Tailwind CSS</span>
                  <span className="badge badge-teal">Django</span>
                  <span className="badge badge-teal">PostgreSQL</span>
                  <span className="badge badge-gray">Neon</span>
                </div>

                <a
                  href="https://www.petershop.shop/"
                  target="_blank"
                  rel="noopener"
                  className="project-link"
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                    <polyline points="15 3 21 3 21 9" />
                    <line x1="10" y1="14" x2="21" y2="3" />
                  </svg>
                  Live Site
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills">
        <div className="container">
          <p className="section-label fade-up">Tech Stack</p>
          <h2 className="section-title fade-up delay-1">
            What I <span>work with</span>
          </h2>

          <div className="skills-grid">
            <div className="skill-group fade-up delay-1">
              <div className="skill-group-title">Frontend</div>
              <div className="skill-badges">
                <span className="badge badge-blue">Figma</span>
                <span className="badge badge-blue">React</span>
                <span className="badge badge-blue">Next.js</span>
                <span className="badge badge-blue">Tailwind CSS</span>
                <span className="badge badge-blue">TypeScript</span>
                <span className="badge badge-blue">HTML</span>
                <span className="badge badge-blue">CSS</span>
              </div>
            </div>

            <div className="skill-group fade-up delay-2">
              <div className="skill-group-title">Backend</div>
              <div className="skill-badges">
                <span className="badge badge-teal">FastAPI</span>
                <span className="badge badge-teal">Django</span>
                <span className="badge badge-teal">Node.js</span>
                <span className="badge badge-teal">Python</span>
                <span className="badge badge-teal">PostgreSQL</span>
                <span className="badge badge-teal">MongoDB</span>
                <span className="badge badge-teal">Redis</span>
              </div>
            </div>

            <div className="skill-group fade-up delay-3">
              <div className="skill-group-title">Others</div>
              <div className="skill-badges">
                <span className="badge badge-gray">Docker</span>
                <span className="badge badge-gray">Celery</span>
                <span className="badge badge-gray">WebSocket</span>
                <span className="badge badge-gray">Git</span>
                <span className="badge badge-gray">Ubuntu</span>
                <span className="badge badge-gray">Nginx</span>
                <span className="badge badge-gray">LangChain</span>
                <span className="badge badge-gray">RAG</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact">
        <div className="container">
          <p className="section-label fade-up" style={{ textAlign: "center" }}>
            Get In Touch
          </p>
          <h2
            className="section-title fade-up delay-1"
            style={{ textAlign: "center" }}
          >
            Let&apos;s <span>work together</span>
          </h2>

          <div className="contact-card fade-up delay-2">
            <p className="contact-intro">
              I&apos;m currently open to full-time roles, freelance projects, and
              interesting collaborations.
              <br />
              Drop me a line — I usually respond within a day.
            </p>

            <div className="contact-links">
              <a href="mailto:lei23lei91@gmail.com" className="contact-link">
                <div className="contact-link-icon">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                </div>
                <div className="contact-link-text">
                  <div className="contact-link-label">Email</div>
                  <div className="contact-link-value">lei23lei91@gmail.com</div>
                </div>
              </a>

              <a href="tel:+886916435505" className="contact-link">
                <div className="contact-link-icon">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13.6a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 3h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 10.6a16 16 0 0 0 6 6l1.27-.9a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                </div>
                <div className="contact-link-text">
                  <div className="contact-link-label">Phone</div>
                  <div className="contact-link-value">+886 916-435-505</div>
                </div>
              </a>

              <a
                href="https://www.linkedin.com/in/leeli-peter/"
                target="_blank"
                rel="noopener"
                className="contact-link"
              >
                <div className="contact-link-icon">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                    <rect x="2" y="9" width="4" height="12" />
                    <circle cx="4" cy="4" r="2" />
                  </svg>
                </div>
                <div className="contact-link-text">
                  <div className="contact-link-label">LinkedIn</div>
                  <div className="contact-link-value">leeli-peter</div>
                </div>
              </a>

              <a
                href="https://github.com/lei23lei"
                target="_blank"
                rel="noopener"
                className="contact-link"
              >
                <div className="contact-link-icon">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                  </svg>
                </div>
                <div className="contact-link-text">
                  <div className="contact-link-label">GitHub</div>
                  <div className="contact-link-value">lei23lei</div>
                </div>
              </a>
            </div>

            <a
              href="mailto:lei23lei91@gmail.com"
              className="btn-primary"
              style={{ display: "inline-flex", margin: "0 auto" }}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
              Say Hello
            </a>
          </div>
        </div>
      </section>

      <footer>
        <p>
          Designed &amp; built by{" "}
          <a href="https://github.com/lei23lei" target="_blank" rel="noopener">
            Lei Ieong Tam
          </a>{" "}
          · 2025
        </p>
      </footer>
    </>
  );
}
