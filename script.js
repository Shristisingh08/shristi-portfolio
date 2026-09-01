// ===== Theme Toggle =====
const html = document.documentElement;
const themeToggle = document.getElementById('themeToggle');

// Load saved theme or default to dark
const savedTheme = localStorage.getItem('theme') || 'dark';
html.setAttribute('data-theme', savedTheme);

themeToggle.addEventListener('click', () => {
  const current = html.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  html.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
});

// ===== Mobile Menu =====
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

menuToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
  });
});

// ===== Navbar Scroll =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
});

// ===== Active Nav Link =====
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY + 100;
  sections.forEach(section => {
    const top = section.offsetTop;
    const height = section.offsetHeight;
    const id = section.getAttribute('id');
    const link = document.querySelector(`.nav-links a[href="#${id}"]`);
    if (link) {
      link.classList.toggle('active', scrollY >= top && scrollY < top + height);
    }
  });
});

// ===== Chatbot =====
const chatToggle = document.getElementById('chatToggle');
const chatWindow = document.getElementById('chatWindow');
const chatClose = document.getElementById('chatClose');
const chatMessages = document.getElementById('chatMessages');
const chatInput = document.getElementById('chatInput');
const chatSend = document.getElementById('chatSend');

chatToggle.addEventListener('click', () => {
  chatWindow.classList.toggle('open');
  if (chatWindow.classList.contains('open')) chatInput.focus();
});

chatClose.addEventListener('click', () => {
  chatWindow.classList.remove('open');
});

function addMessage(text, type) {
  const div = document.createElement('div');
  div.className = `chat-msg ${type}`;
  div.textContent = text;
  chatMessages.appendChild(div);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function getBotReply(msg) {
  const m = msg.toLowerCase().trim();

  if (m.includes('skill') || m.includes('language') || m.includes('tech')) {
    return "Shristi knows Python, JavaScript, C, C++, HTML, CSS, DBMS, MongoDB, Git & GitHub. She also works with Arduino & Blynk for IoT projects.";
  }
  if (m.includes('project') || m.includes('arduino') || m.includes('srs') || m.includes('food')) {
    return "She has two main projects:\n1. Automated Mobile Phone Rotation Stand (Arduino + Blynk, Dec 2025)\n2. SRS Document for a Food Delivery App (April–May 2026)";
  }
  if (m.includes('education') || m.includes('college') || m.includes('school') || m.includes('cgpa') || m.includes('university')) {
    return "B.Tech CSE at Lovely Professional University (CGPA 9.44, Aug 2025–Present). Higher Secondary 92.8% from Army Public School Chandimandir. Secondary Education 96% from Army Public School Lucknow.";
  }
  if (m.includes('certificate') || m.includes('cert') || m.includes('course')) {
    return "She has completed:\n• Introduction to AI (Infosys, Mar 2026)\n• JavaScript Essentials 1 (Cisco, Feb 2026)\n• CODECARVAN 3.0 Hackathon (Nov 2025)\n• Effective Time Management (Tech Veda, Oct 2025)";
  }
  if (m.includes('contact') || m.includes('email') || m.includes('phone') || m.includes('reach')) {
    return "Email: shristi010308@gmail.com\nPhone: +91 95015 36732\nLinkedIn & GitHub links are in the Contact section.";
  }
  if (m.includes('achievement') || m.includes('olympiad') || m.includes('problem')) {
    return "She has solved 100+ coding problems on various platforms and secured 3rd rank in the Mathematics Olympiad (school level).";
  }
  if (m.includes('hello') || m.includes('hi') || m.includes('hey')) {
    return "Hello! 👋 How can I help you learn about Shristi's portfolio?";
  }
  if (m.includes('cv') || m.includes('resume') || m.includes('download')) {
    return "You can download her CV using the 'Download CV' button in the Hero section or Contact Me section.";
  }
  if (m.includes('name') || m.includes('who')) {
    return "This is the portfolio of Shristi Singh, an aspiring Software Engineer and B.Tech CSE student at LPU.";
  }
  return "I can tell you about her skills, projects, education, certificates, achievements or contact details. Try asking one of those!";
}

function sendMessage() {
  const text = chatInput.value.trim();
  if (!text) return;
  addMessage(text, 'user');
  chatInput.value = '';
  setTimeout(() => {
    addMessage(getBotReply(text), 'bot');
  }, 400);
}

chatSend.addEventListener('click', sendMessage);
chatInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') sendMessage();
});
