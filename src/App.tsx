import { FormEvent, ReactNode, useEffect, useRef, useState } from "react";
import profilePhoto from "./assets/mohammed-abubakkar-profile.jpeg";

const resumeUrl = "/Mohammed-Abubakkar-Resume.pdf";

type ButtonProps = {
  children: ReactNode;
  href?: string;
  variant?: "primary" | "outline" | "ghost";
  icon?: string;
  download?: boolean;
  type?: "button" | "submit";
  disabled?: boolean;
};

const iconPaths: Record<string, ReactNode> = {
  arrow: <><path d="M5 12h14" /><path d="m13 6 6 6-6 6" /></>,
  award: <><circle cx="12" cy="8" r="5" /><path d="M8.5 12 7 22l5-3 5 3-1.5-10" /></>,
  back: <><path d="m18 15-6-6-6 6" /></>,
  code: <><path d="m8 9-5 3 5 3" /><path d="m16 9 5 3-5 3" /><path d="m14 5-4 14" /></>,
  email: <><rect width="18" height="14" x="3" y="5" rx="2" /><path d="m3 7 9 6 9-6" /></>,
  external: <><path d="M15 3h6v6" /><path d="M10 14 21 3" /><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /></>,
  github: <path d="M15 22v-4c.14-1.3-.37-2.57-1.38-3.4 3.25-.36 6.67-1.6 6.67-7.2A5.6 5.6 0 0 0 18.8 3.5 5.2 5.2 0 0 0 18.65.08S17.48-.3 14.8 1.57a13.4 13.4 0 0 0-7 0C5.12-.3 3.95.08 3.95.08A5.2 5.2 0 0 0 3.8 3.5 5.6 5.6 0 0 0 2.3 7.4c0 5.59 3.42 6.83 6.67 7.2A3.4 3.4 0 0 0 8 17.25V22M8 19c-3 .92-3-1.5-4.2-2" />,
  layers: <><path d="m12 2 9 5-9 5-9-5 9-5Z" /><path d="m3 12 9 5 9-5" /><path d="m3 17 9 5 9-5" /></>,
  leetcode: <><path d="m16 3-9.5 9.5a3.5 3.5 0 0 0 0 5l2 2a3.5 3.5 0 0 0 5 0l2-2" /><path d="M8 12h11" /><path d="m10 6 3-3" /></>,
  linkedin: <><rect x="3" y="9" width="4" height="12" /><path d="M5 3v.01" /><path d="M11 21V9h4v2c1-2 6-2.15 6 3v7h-4v-6c0-2-2-2-2 0v6Z" /></>,
  location: <><path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="2.5" /></>,
  menu: <><path d="M4 7h16M4 12h16M4 17h16" /></>,
  phone: <path d="M22 16.9v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.12 4.2 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.9.33 1.78.62 2.63a2 2 0 0 1-.45 2.11L8 9.73a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.85.29 1.73.5 2.63.62A2 2 0 0 1 22 16.9Z" />,
  send: <><path d="m22 2-7 20-4-9-9-4Z" /><path d="M22 2 11 13" /></>,
  terminal: <><path d="m4 17 6-6-6-6" /><path d="M12 19h8" /></>,
  x: <><path d="m6 6 12 12M18 6 6 18" /></>,
};

function Icon({ name, size = 20 }: { name: string; size?: number }) {
  return (
    <svg aria-hidden="true" className="icon" fill="none" height={size} viewBox="0 0 24 24" width={size}>
      <g stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8">
        {iconPaths[name]}
      </g>
    </svg>
  );
}

function Button({ children, href, variant = "primary", icon, download, type = "button", disabled }: ButtonProps) {
  const className = `button button--${variant}`;
  if (href) {
    return (
      <a
        className={className}
        download={download}
        href={href}
        rel={href.startsWith("https://") ? "noreferrer" : undefined}
        target={href.startsWith("https://") ? "_blank" : undefined}
      >
        {children}
        {icon && <Icon name={icon} size={17} />}
      </a>
    );
  }
  return (
    <button className={className} disabled={disabled} type={type}>
      {children}
      {icon && <Icon name={icon} size={17} />}
    </button>
  );
}

function Tag({ children }: { children: ReactNode }) {
  return <span className="tag">{children}</span>;
}

function Reveal({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        el.classList.add("is-visible");
        observer.disconnect();
      }
    }, { threshold: 0.08 });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return <div className={`reveal ${className}`} ref={ref}>{children}</div>;
}

function SectionHeading({ eyebrow, title, intro }: { eyebrow: string; title: string; intro?: string }) {
  return (
    <div className="section-heading">
      <span className="eyebrow">{eyebrow}</span>
      <h2>{title}</h2>
      {intro && <p>{intro}</p>}
    </div>
  );
}

const navItems = ["About", "Skills", "Projects", "Education", "Certifications", "Contact"];

function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <header className="navbar">
      <div className="nav-inner">
        <a aria-label="Mohammed Abubakkar home" className="logo" href="#top">MA<span>.</span></a>
        <nav aria-label="Primary navigation" className={open ? "nav-links is-open" : "nav-links"}>
          {navItems.map((item) => (
            <a href={`#${item.toLowerCase()}`} key={item} onClick={() => setOpen(false)}>{item}</a>
          ))}
          <span className="nav-mobile-resume"><Button download href={resumeUrl} variant="outline">Download Resume</Button></span>
        </nav>
        <span className="nav-resume"><Button download href={resumeUrl} variant="outline">Download Resume</Button></span>
        <button aria-label={open ? "Close menu" : "Open menu"} className="menu-button" onClick={() => setOpen(!open)} type="button">
          <Icon name={open ? "x" : "menu"} size={23} />
        </button>
      </div>
    </header>
  );
}

const skillGroups = [
  { title: "Programming Languages", icon: "terminal", skills: ["Java", "JavaScript", "SQL"] },
  { title: "Frontend", icon: "code", skills: ["HTML5", "CSS3", "React.js", "Bootstrap"] },
  { title: "Backend", icon: "layers", skills: ["Java", "Spring Boot", "Node.js", "Express.js", "REST APIs"] },
  { title: "Databases", icon: "layers", skills: ["MySQL", "MongoDB"] },
  { title: "Cloud & DevOps", icon: "terminal", skills: ["AWS (EC2, S3, VPC, RDS, IAM, Route 53)", "Linux", "Git", "GitHub", "Docker", "CI/CD"] },
  { title: "Core CS", icon: "code", skills: ["OOP", "Data Structures & Algorithms", "Computer Networks", "DBMS", "Operating Systems"] },
];

function SkillCard({ title, icon, skills }: (typeof skillGroups)[number]) {
  return (
    <article className="skill-card card">
      <div className="card-icon"><Icon name={icon} /></div>
      <h3>{title}</h3>
      <div className="tags">{skills.map((skill) => <Tag key={skill}>{skill}</Tag>)}</div>
    </article>
  );
}

const projects = [
  {
    title: "NRI Remote Voting System",
    code: "01",
    github: "https://github.com/imohammedabubakkar/nri-voting",
    demo: "https://nri-voting-6grf-blue.vercel.app/",
    stack: ["React", "Node.js", "Express.js", "MongoDB"],
    bullets: [
      "Web-based remote voting system for eligible Indian citizens residing abroad.",
      "Separate user and admin authentication with voter registration workflows.",
      "Voting interface with voter verification and vote confirmation mechanisms.",
      "Admin dashboard for voter management and election-result monitoring.",
    ],
  },
  {
    title: "CloudDeployX",
    code: "02",
    github: "https://github.com/imohammedabubakkar/cloud_deploy",
    demo: "https://cloud-deploy-one.vercel.app/",
    stack: ["Java", "Spring Boot", "React.js", "PostgreSQL", "Docker", "Kubernetes", "AWS"],
    bullets: [
      "Cloud-native platform for application deployment and monitoring.",
      "Secure authentication and REST APIs using Spring Boot and JWT.",
      "Containerized with Docker and deployed using Kubernetes and AWS.",
      "CI/CD automation using GitHub Actions and Terraform.",
    ],
  },
  {
    title: "FinTrack – Fraud Detection System",
    code: "03",
    github: "https://github.com/imohammedabubakkar/fin-track",
    demo: "https://fin-track-two-self.vercel.app/",
    stack: ["Java", "Spring Boot", "React.js", "PostgreSQL", "Kafka"],
    bullets: [
      "Full-stack financial transaction platform using React.js, Spring Boot, and REST APIs.",
      "JWT authentication, RBAC, and Kafka-based fraud detection.",
      "PostgreSQL and Redis for data storage and caching.",
      "Docker services with CI/CD via GitHub Actions.",
    ],
  },
];

function ProjectPreview({ code }: { code: string }) {
  return (
    <div aria-label="Project preview placeholder" className={`project-preview preview-${code}`}>
      <div className="preview-window">
        <div className="preview-top"><i /><i /><i /></div>
        <div className="preview-body">
          <div className="preview-side"><b /><b /><b /><b /></div>
          <div className="preview-content">
            <span className="preview-label">PROJECT / {code}</span>
            <strong>{code === "01" ? "Secure vote" : code === "02" ? "Deploy smarter" : "Safer finance"}</strong>
            <div className="preview-chart"><i /><i /><i /><i /><i /></div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProjectCard({ project, index }: { project: (typeof projects)[number]; index: number }) {
  return (
    <article className={`project-card ${index % 2 ? "project-card--reverse" : ""}`}>
      <ProjectPreview code={project.code} />
      <div className="project-info">
        <div className="project-meta"><span>FEATURED PROJECT</span><time>2026</time></div>
        <h3>{project.title}</h3>
        <div className="tags">{project.stack.map((item) => <Tag key={item}>{item}</Tag>)}</div>
        <ul>{project.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>
        <div className="project-actions">
          <Button href={project.github ?? "#"} icon="github" variant="outline">GitHub</Button>
          <Button href={project.demo ?? "#"} icon="external" variant="ghost">Live Demo</Button>
        </div>
      </div>
    </article>
  );
}

const certifications = [
  ["NPTEL", "Cloud Computing"],
  ["Google Cloud", "Cybersecurity Certificate"],
  ["Coursera", "AWS Cloud Practitioner Essentials"],
  ["HCL GUVI", "Full Stack Certificates (MERN)"],
];

function CertificationCard({ provider, title }: { provider: string; title: string }) {
  return (
    <article className="cert-card card">
      <div className="cert-icon"><Icon name="award" size={22} /></div>
      <div><span>{provider}</span><h3>{title}</h3></div>
    </article>
  );
}

function App() {
  const [formStatus, setFormStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormStatus("sending");
    const form = event.currentTarget;
    const formData = new FormData(form);
    const senderName = String(formData.get("name") ?? "").trim();
    const senderEmail = String(formData.get("email") ?? "").trim();
    formData.set("_subject", `Portfolio message from ${senderName}`);
    formData.set("_replyto", senderEmail);
    formData.set("_template", "table");

    try {
      const response = await fetch(
        "https://formsubmit.co/ajax/mohammedabubakkar2004@gmail.com",
        {
          method: "POST",
          headers: { Accept: "application/json" },
          body: formData,
        },
      );
      if (!response.ok) throw new Error("Unable to send message");
      form.reset();
      setFormStatus("sent");
    } catch {
      setFormStatus("error");
    }
  };
  useEffect(() => {
    const updatePointerGlow = (event: PointerEvent) => {
      document.documentElement.style.setProperty("--pointer-x", `${event.clientX}px`);
      document.documentElement.style.setProperty("--pointer-y", `${event.clientY}px`);
      const tiltX = ((event.clientY / window.innerHeight) - 0.5) * -5;
      const tiltY = ((event.clientX / window.innerWidth) - 0.5) * 5;
      document.documentElement.style.setProperty("--tilt-x", `${tiltX.toFixed(2)}deg`);
      document.documentElement.style.setProperty("--tilt-y", `${tiltY.toFixed(2)}deg`);
    };
    const updateScrollProgress = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollable > 0 ? window.scrollY / scrollable : 0;
      document.documentElement.style.setProperty("--scroll-progress", progress.toString());
    };
    window.addEventListener("pointermove", updatePointerGlow, { passive: true });
    window.addEventListener("scroll", updateScrollProgress, { passive: true });
    updateScrollProgress();
    return () => {
      window.removeEventListener("pointermove", updatePointerGlow);
      window.removeEventListener("scroll", updateScrollProgress);
    };
  }, []);

  return (
    <div id="top">
      <Navbar />
      <main>
        <section className="hero section">
          <div className="container hero-grid">
            <Reveal className="hero-copy">
              <span className="hero-kicker">Hello, I&apos;m</span>
              <h1>Mohammed<br />Abubakkar I</h1>
              <p className="hero-role">Java Full-Stack Developer <span>|</span> MERN <span>|</span> AWS Cloud &amp; DevOps</p>
              <p className="hero-intro">B.E. Computer Science Engineering (Honours) student building scalable web applications with Java, Spring Boot, React, and AWS.</p>
              <div className="hero-actions">
                <Button href="#projects" icon="arrow">View Projects</Button>
                <Button download href={resumeUrl} variant="outline">Download Resume</Button>
              </div>
              <div className="hero-bottom">
                <div className="social-links" aria-label="Social links">
                  <a aria-label="Open Mohammed's GitHub profile" href="https://github.com/IMOHAMMEDABUBAKKAR" rel="noreferrer" target="_blank" title="GitHub"><Icon name="github" /></a>
                  <a aria-label="Open Mohammed's LinkedIn profile" href="https://linkedin.com/in/mohammedabubakkar" rel="noreferrer" target="_blank" title="LinkedIn"><Icon name="linkedin" /></a>
                  <a aria-label="Open Mohammed's LeetCode profile" href="https://leetcode.com/mohammedabubakkar" rel="noreferrer" target="_blank" title="LeetCode"><Icon name="leetcode" /></a>
                  <a aria-label="Email" href="mailto:mohammedabubakkar2004@gmail.com"><Icon name="email" /></a>
                </div>
                <span className="location"><Icon name="location" size={17} />Vellore, Tamil Nadu, India</span>
              </div>
            </Reveal>
            <Reveal className="portrait-wrap">
              <div className="portrait-glow" />
              <div className="portrait-frame">
                <div className="portrait-photo">
                  <img
                    alt="Mohammed Abubakkar I, Java Full-Stack Developer"
                    src={profilePhoto}
                  />
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="section section-alt" id="about">
          <div className="container">
            <Reveal><SectionHeading eyebrow="01 / WHO I AM" title="About" /></Reveal>
            <div className="about-grid">
              <Reveal className="about-copy">
                <p>B.E. Computer Science Engineering (Honours) student and aspiring Java Full-Stack Developer with skills in Java, Spring Boot, MERN stack, AWS Cloud, and DevOps. Proficient in developing web applications using React.js, Node.js, Express.js, MySQL, and MongoDB, with a strong foundation in OOP, DSA, REST APIs, Linux, Git, Docker, and AWS services.</p>
              </Reveal>
              <Reveal className="stats">
                <article className="stat-card"><strong>8.9</strong><span>CGPA</span></article>
                <article className="stat-card"><strong>2023—27</strong><span>B.E. CSE (Honours)</span></article>
                <article className="stat-card"><strong>03</strong><span>Full-Stack Projects</span></article>
              </Reveal>
            </div>
          </div>
        </section>

        <section className="section" id="skills">
          <div className="container">
            <Reveal><SectionHeading eyebrow="02 / EXPERTISE" title="Skills" intro="A practical toolkit for building, shipping, and scaling modern applications." /></Reveal>
            <Reveal className="skills-grid">
              {skillGroups.map((group) => <SkillCard key={group.title} {...group} />)}
            </Reveal>
            <Reveal className="tools-card-wrap">
              <SkillCard icon="terminal" skills={["Visual Studio Code", "Postman"]} title="Tools" />
            </Reveal>
          </div>
        </section>

        <section className="section section-alt" id="projects">
          <div className="container">
            <Reveal><SectionHeading eyebrow="03 / SELECTED WORK" title="Projects" intro="Full-stack systems designed around real-world reliability, security, and scale." /></Reveal>
            <div className="projects-list">
              {projects.map((project, index) => <Reveal key={project.title}><ProjectCard index={index} project={project} /></Reveal>)}
            </div>
          </div>
        </section>

        <section className="section" id="education">
          <div className="container">
            <Reveal><SectionHeading eyebrow="04 / ACADEMIC JOURNEY" title="Education" /></Reveal>
            <Reveal className="education-card card">
              <div className="timeline-mark"><span /></div>
              <div className="education-content">
                <div className="education-top">
                  <div>
                    <span className="education-date">AUG 2023 — MAY 2027</span>
                    <h3>C. Abdul Hakeem College of Engineering &amp; Technology</h3>
                    <p>Melvisharam, Tamil Nadu</p>
                  </div>
                  <strong>CGPA <b>8.9</b></strong>
                </div>
                <p className="degree">B.E. Computer Science and Engineering (Honours)</p>
                <div className="coursework"><span>Relevant Coursework</span><div className="tags">
                  {["Data Structures & Algorithms", "Operating Systems", "Computer Networks", "Database Management Systems", "Software Testing", "Web Technologies", "Cloud Computing"].map((item) => <Tag key={item}>{item}</Tag>)}
                </div></div>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="section section-alt" id="certifications">
          <div className="container">
            <Reveal><SectionHeading eyebrow="05 / CONTINUOUS LEARNING" title="Certifications" /></Reveal>
            <Reveal className="cert-grid">
              {certifications.map(([provider, title]) => <CertificationCard key={title} provider={provider} title={title} />)}
            </Reveal>
          </div>
        </section>

        <section className="section contact-section" id="contact">
          <div className="container">
            <Reveal><SectionHeading eyebrow="06 / GET IN TOUCH" title="Contact" /></Reveal>
            <div className="contact-grid">
              <Reveal className="contact-copy">
                <h3>Let&apos;s work together.</h3>
                <p>Open to internships and entry-level Java Full-Stack roles.</p>
                <address>
                  <a href="mailto:mohammedabubakkar2004@gmail.com"><Icon name="email" /><span><small>Email</small>mohammedabubakkar2004@gmail.com</span></a>
                  <a href="tel:+919488065726"><Icon name="phone" /><span><small>Phone</small>+91 9488065726</span></a>
                  <span><Icon name="location" /><span><small>Location</small>Vellore, Tamil Nadu</span></span>
                </address>
                <div aria-label="Social profiles" className="social-links contact-socials">
                  <a aria-label="Open Mohammed's GitHub profile" href="https://github.com/IMOHAMMEDABUBAKKAR" rel="noreferrer" target="_blank" title="GitHub"><Icon name="github" /></a>
                  <a aria-label="Open Mohammed's LinkedIn profile" href="https://linkedin.com/in/mohammedabubakkar" rel="noreferrer" target="_blank" title="LinkedIn"><Icon name="linkedin" /></a>
                  <a aria-label="Open Mohammed's LeetCode profile" href="https://leetcode.com/mohammedabubakkar" rel="noreferrer" target="_blank" title="LeetCode"><Icon name="leetcode" /></a>
                  <a aria-label="Email Mohammed" href="mailto:mohammedabubakkar2004@gmail.com" title="Email"><Icon name="email" /></a>
                </div>
                <span id="resume"><Button download href={resumeUrl} variant="outline">Download Resume (PDF)</Button></span>
              </Reveal>
              <Reveal>
                <form className="contact-form card" onSubmit={handleSubmit}>
                  <label>Name<input name="name" placeholder="Your name" required /></label>
                  <label>Email<input name="email" placeholder="you@example.com" required type="email" /></label>
                  <label>Message<textarea name="message" placeholder="Tell me about the opportunity..." required rows={5} /></label>
                  <Button disabled={formStatus === "sending"} icon="send" type="submit">
                    {formStatus === "sending" ? "Sending..." : "Send Message"}
                  </Button>
                  {formStatus === "sent" && <p className="form-status form-status--success">Message sent successfully. I&apos;ll get back to you soon.</p>}
                  {formStatus === "error" && <p className="form-status form-status--error">The message could not be sent. Please email me directly.</p>}
                </form>
              </Reveal>
            </div>
          </div>
        </section>
      </main>
      <footer>
        <div className="container footer-inner">
          <p>© 2026 Mohammed Abubakkar I</p>
          <a className="back-top" href="#top">Back to top <Icon name="back" size={17} /></a>
        </div>
      </footer>
    </div>
  );
}

export default App;
