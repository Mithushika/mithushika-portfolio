import { Component, afterNextRender, computed, signal } from '@angular/core';

type Theme = 'dark' | 'light';
type Category = 'web' | 'mobile' | 'research';
type Filter = 'all' | Category;

interface Project {
  title: string;
  category: Category;
  kind: string;
  summary: string;
  role?: string;
  highlights?: string[];
  stack: string[];
  image?: string;
  link?: { label: string; href: string };
}

interface Job {
  role: string;
  company: string;
  period: string;
  summary: string;
  points?: string[];
}

interface Certification {
  name: string;
  issuer: string;
  href?: string;
}

interface Competition {
  event: string;
  category?: string;
  result: string;
  level: 'finalist' | 'semi' | 'participant';
}

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
  host: {
    '(window:scroll)': 'updateActive()',
    '(window:resize)': 'updateActive()',
  },
})
export class App {
  protected readonly year = new Date().getFullYear();
  protected readonly email = 'mithusuvee@gmail.com';

  protected readonly sections = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'projects', label: 'Projects' },
    { id: 'skills', label: 'Skills' },
    { id: 'experience', label: 'Experience' },
    { id: 'certifications', label: 'Certifications' },
    { id: 'contact', label: 'Contact' },
  ];

  protected readonly active = signal('home');
  protected readonly progress = signal(0);
  protected readonly theme = signal<Theme>('dark');
  protected readonly copied = signal(false);

  // Scrolling strip under the hero.
  protected readonly marquee = [
    'Angular',
    'React',
    'React Native',
    'Node.js',
    'TypeScript',
    'Python',
    'Firebase',
    'WordPress',
    'PHP',
    'MongoDB',
  ];

  // ---------- Projects ----------

  protected readonly filters: { value: Filter; label: string }[] = [
    { value: 'all', label: 'All' },
    { value: 'web', label: 'Web' },
    { value: 'mobile', label: 'Mobile' },
    { value: 'research', label: 'Research' },
  ];

  protected readonly filter = signal<Filter>('all');

  // Files in `image` live in public/assets/ (src/assets/ on Angular 17 and earlier).
  protected readonly projects: Project[] = [
    {
      title: 'MESH',
      category: 'research',
      kind: 'AI safety research',
      summary:
        'A research project evaluating how large language models respond to adversarial prompts across mockery, extremism, sarcasm, and hate speech.',
      highlights: [
        'Structured adversarial evaluation',
        'Ensemble judging using multiple language models',
        'Human annotation and validation',
      ],
      stack: ['Python', 'Ollama', 'LLMs'],
    },
    {
      title: 'Blood Bond',
      category: 'mobile',
      kind: 'Mobile app',
      role: 'Backend developer',
      summary:
        'An AI-driven app that connects blood donors and recipients in real time, with personalized reminders and location-based matching.',
      stack: ['React Native', 'Firebase', 'Python'],
      image: 'assets/Blood.png',
      link: { label: 'View on GitHub', href: 'https://github.com/mithushikaS/Blood-Bond1' },
    },
    {
      title: 'PowerSaver',
      category: 'mobile',
      kind: 'Mobile app',
      role: 'Frontend developer',
      summary: 'A mobile app that tracks energy consumption and sends real-time alerts.',
      stack: ['React Native', 'Firebase'],
      image: 'assets/PowerSaver.jpeg',
      link: { label: 'View on GitHub', href: 'https://github.com/mithushikaS/Power-Saver1' },
    },
    {
      title: 'AllergyGuard',
      category: 'mobile',
      kind: 'Mobile app',
      summary:
        'A food-allergy assistant that helps users manage their allergies, look up product information, and connect with experts.',
      highlights: [
        'Personal allergy management',
        'Product scanning and scan history',
        'Role-based user and expert access',
      ],
      stack: ['React Native', 'Firebase', 'Expo'],
      link: { label: 'View on GitHub', href: 'https://github.com/mithushikaS/AllergyGuard1' },
    },
    {
      title: 'MERN Chat App',
      category: 'web',
      kind: 'Web app',
      summary: 'A real-time chat application built on the MERN stack.',
      stack: ['MongoDB', 'Express', 'React', 'Node.js'],
      image: 'assets/chat.png',
      link: { label: 'View on GitHub', href: 'https://github.com/mithushikaS/Chat-app' },
    },
    {
      title: 'Gemini Clone',
      category: 'web',
      kind: 'Web app',
      summary: "A front-end clone of Google Gemini's conversational AI interface.",
      stack: ['React'],
      image: 'assets/MithuGemini.jpg',
      link: { label: 'View on GitHub', href: 'https://github.com/mithushikaS/gemini-clone' },
    },
  ];

  protected readonly visibleProjects = computed(() => {
    const f = this.filter();
    return f === 'all' ? this.projects : this.projects.filter((p) => p.category === f);
  });

  protected setFilter(value: Filter): void {
    this.filter.set(value);
  }

  // ---------- Skills ----------

  protected readonly skills = [
    { name: 'Programming languages', items: ['JavaScript', 'TypeScript', 'PHP', 'Python', 'Java', 'C', 'C#'] },
    {
      name: 'Frameworks and libraries',
      items: ['React', 'React Native', 'Angular', 'WordPress', 'Laravel', 'Ballerina', 'Node.js', 'Express.js', 'Vue.js'],
    },
    { name: 'Databases', items: ['MySQL', 'MongoDB', 'Firebase', 'SQL Server'] },
    { name: 'Tools and platforms', items: ['Git and GitHub', 'Figma', 'VS Code', 'Android Studio', 'Postman'] },
    {
      name: 'Soft skills',
      items: ['Problem solving', 'Team collaboration', 'Communication', 'Project management', 'Critical thinking'],
    },
  ];

  // ---------- Experience ----------

  protected readonly experience: Job[] = [
    {
      role: 'Software Developer',
      company: 'Proitzen',
      period: 'March 2025 to present',
      summary:
        'Developing and maintaining WordPress-based websites and features as part of the development team.',
      points: [
        'Built and maintained WordPress sites and features for client projects',
        'Collaborated with the development team across the project lifecycle',
      ],
    },
  ];

  protected readonly current = this.experience[0];

  // ---------- Certifications and achievements ----------

  protected readonly award = {
    title: 'Best Presenter Award',
    org: 'APSURS',
    detail:
      'For my research abstract on adaptive jailbreak benchmarking of large language models, presented at iPURSE and APSURS.',
  };

  protected readonly certifications: Certification[] = [
    {
      name: 'Web Design for Beginners',
      issuer: 'University of Moratuwa',
      href: 'https://drive.google.com/file/d/1_1tmuq60PPzkuSVAw1pMXcDRxly83ewN/view',
    },
    { name: 'Android App Development for Beginners', issuer: 'Simplilearn' },
    { name: 'Introduction to MERN', issuer: 'Simplilearn' },
    {
      name: 'Foundations of UX Design',
      issuer: 'Coursera',
      href: 'https://drive.google.com/file/d/1atEHiHRvu3P0b9fWjcxsKx46Rz7_XXK1/view',
    },
  ];

  protected readonly competitions: Competition[] = [
    { event: "IDEALIZE'23", category: 'Open category', result: 'Finalist', level: 'finalist' },
    { event: "IDEALIZE'24", category: 'Open category', result: 'Participant', level: 'participant' },
    { event: "Innovate with Ballerina'24", result: 'Participant', level: 'participant' },
    { event: "Pearl Hack'25 Ideathon", result: 'Semi-finalist', level: 'semi' },
    { event: "Code Quest'25", result: 'Finalist', level: 'finalist' },
  ];

  // ---------- Behaviour ----------

  constructor() {
    afterNextRender(() => {
      // index.html sets data-theme before first paint; mirror it into the signal.
      this.theme.set(document.documentElement.dataset['theme'] === 'light' ? 'light' : 'dark');
      this.updateActive();
    });
  }

  protected toggleTheme(): void {
    const next: Theme = this.theme() === 'dark' ? 'light' : 'dark';
    this.theme.set(next);
    document.documentElement.dataset['theme'] = next;
    try {
      localStorage.setItem('theme', next);
    } catch {
      // Storage can be unavailable (private mode); the choice just won't persist.
    }
  }

  protected async copyEmail(): Promise<void> {
    try {
      await navigator.clipboard.writeText(this.email);
      this.copied.set(true);
      setTimeout(() => this.copied.set(false), 2000);
    } catch {
      window.location.href = `mailto:${this.email}`;
    }
  }

  updateActive(): void {
    const marker = window.innerHeight * 0.35;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const atBottom = maxScroll > 0 && window.scrollY >= maxScroll - 4;

    let current = this.sections[0].id;
    for (const { id } of this.sections) {
      const el = document.getElementById(id);
      if (el && el.getBoundingClientRect().top <= marker) {
        current = id;
      }
    }

    this.active.set(atBottom ? this.sections[this.sections.length - 1].id : current);
    this.progress.set(maxScroll > 0 ? Math.min(1, window.scrollY / maxScroll) : 0);
  }
}