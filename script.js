/* ============================================
   THEMES
   ============================================ */
const THEMES = {
  midnight: 'Midnight',
  ocean: 'Ocean',
  forest: 'Forest',
  sunset: 'Sunset',
  light: 'Light',
  matrix: 'Matrix',
  cyberpunk: 'Cyberpunk',
};

const WALLPAPERS = [
  'wallpapers/4k-black-hole-with-bright-horizon-kug5rf2bs46mxcur.webp',
  'https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?w=1920&q=80',
  'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=1920&q=80',
  'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=1920&q=80',
  'https://images.unsplash.com/photo-1502134249126-9f3755a50d78?w=1920&q=80',
  'https://images.unsplash.com/photo-1494500764479-0c8f2919a3d8?w=1920&q=80',
];

const MUSIC_API = {
  base: 'https://musicapi.x007.workers.dev',
  searchEngine: 'seevn',
};

const THEME_COLORS = {
  midnight: ['#0d0d14', '#7c6dfa'],
  ocean: ['#0a1628', '#3b9eff'],
  forest: ['#0f1a14', '#4ade80'],
  sunset: ['#1a0f0a', '#fb923c'],
  light: ['#f5f5f8', '#6366f1'],
  matrix: ['#000000', '#00ff00'],
  cyberpunk: ['#0f001a', '#00ffff'],
};

const ICONS = {
  welcome: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"/></svg>`,
  about: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`,
  projects: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/></svg>`,
  notes: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><line x1="10" y1="9" x2="8" y2="9"/></svg>`,
  terminal: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/></svg>`,
  calculator: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="2" width="16" height="20" rx="2"/><line x1="8" y1="6" x2="16" y2="6"/><line x1="8" y1="10" x2="8" y2="10.01"/><line x1="12" y1="10" x2="12" y2="10.01"/><line x1="16" y1="10" x2="16" y2="10.01"/><line x1="8" y1="14" x2="8" y2="14.01"/><line x1="12" y1="14" x2="12" y2="14.01"/><line x1="16" y1="14" x2="16" y2="14.01"/><line x1="8" y1="18" x2="8" y2="18.01"/><line x1="12" y1="18" x2="16" y2="18.01"/></svg>`,
  settings: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>`,
  browser: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>`,
  music: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>`,
  weather: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9z"/></svg>`,
  calendar: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>`,
  tasks: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7"/></svg>`,
};

/* ============================================
    APPS REGISTRY
    ============================================ */
const APPS = {
  welcome: {
    id: 'welcome',
    title: 'Welcome',
    icon: ICONS.welcome,
    width: 420,
    height: 400,
    render: renderWelcome,
    setup: () => {},
  },
  about: {
    id: 'about',
    title: 'About Me',
    icon: ICONS.about,
    width: 440,
    height: 420,
    render: renderAbout,
    setup: () => {},
  },
  projects: {
    id: 'projects',
    title: 'Projects',
    icon: ICONS.projects,
    width: 520,
    height: 400,
    render: renderProjects,
    setup: () => {},
  },
  notes: {
    id: 'notes',
    title: 'Notes',
    icon: ICONS.notes,
    width: 500,
    height: 420,
    render: renderNotes,
    setup: setupNotes,
  },
  terminal: {
    id: 'terminal',
    title: 'Terminal',
    icon: ICONS.terminal,
    width: 520,
    height: 340,
    render: renderTerminal,
    setup: setupTerminal,
  },
  calculator: {
    id: 'calculator',
    title: 'Calculator',
    icon: ICONS.calculator,
    width: 280,
    height: 400,
    render: renderCalculator,
    setup: setupCalculator,
  },
  settings: {
    id: 'settings',
    title: 'Settings',
    icon: ICONS.settings,
    width: 480,
    height: 440,
    render: renderSettings,
    setup: setupSettings,
  },
  browser: {
    id: 'browser',
    title: 'Browser',
    icon: ICONS.browser,
    width: 640,
    height: 480,
    render: renderBrowser,
    setup: setupBrowser,
  },
  music: {
    id: 'music',
    title: 'Music',
    icon: ICONS.music,
    width: 400,
    height: 420,
    render: renderMusic,
    setup: setupMusic,
  },
  weather: {
    id: 'weather',
    title: 'Weather',
    icon: ICONS.weather,
    width: 320,
    height: 360,
    render: renderWeather,
    setup: () => {},
  },
  calendar: {
    id: 'calendar',
    title: 'Calendar',
    icon: ICONS.calendar,
    width: 340,
    height: 380,
    render: renderCalendar,
    setup: setupCalendar,
  },
  tasks: {
    id: 'tasks',
    title: 'Tasks',
    icon: ICONS.tasks,
    width: 400,
    height: 400,
    render: renderTasks,
    setup: setupTasks,
  },
};

/* ============================================
   STATE
   ============================================ */
const state = {
  windows: new Map(),
  topZ: 100,
  theme: localStorage.getItem('web-os-theme') || 'midnight',
  wallpaper: localStorage.getItem('web-os-wallpaper') || WALLPAPERS[0],
  notes: JSON.parse(localStorage.getItem('web-os-notes') || JSON.stringify([
    { id: 1, title: 'Pinned Notes', body: 'Welcome to my OS! Click on any note on the left to read it.', date: '2026-08-17' },
    { id: 2, title: 'Projects', body: 'Working on web-os - a portfolio styled like a desktop operating system.', date: '2026-08-16' },
    { id: 3, title: 'Reading', body: 'Currently reading: Opposite of Always by Justin A. Reynolds', date: '2026-08-15' },
    { id: 4, title: 'Ideas', body: 'Add a terminal window, a music player, and a custom feature to play games on this web os!', date: '2026-08-14' },
  ])),
  currentNoteId: 1,
  terminalHistory: [],
  terminalHistoryIndex: -1,
  tasks: JSON.parse(localStorage.getItem('web-os-tasks') || JSON.stringify([
    { id: 1, text: 'Build web OS', done: true },
    { id: 2, text: 'Add more themes', done: true },
    { id: 3, text: 'Add terminal app', done: false },
    { id: 4, text: 'Write documentation', done: false },
  ])),
  musicPlaying: false,
  currentTrack: null,
  musicProgress: 0,
  musicInterval: null,

  musicResults: false,
  musicAudio: null,
  musicHls: null,
  musicSearchQuery: '',

  calcDisplay: '0',
  calcPrev: null,
  calcOperator: null,
  calcNewNumber: true,
  browserHistory: [],
  calendarDate: new Date(),
};

/* ============================================
   UTILITIES
   ============================================ */
function $(id) {
  return document.getElementById(id);
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

function saveState() {
  localStorage.setItem('web-os-theme', state.theme);
  localStorage.setItem('web-os-wallpaper', state.wallpaper);
  localStorage.setItem('web-os-notes', JSON.stringify(state.notes));
  localStorage.setItem('web-os-tasks', JSON.stringify(state.tasks));
}

/* ============================================
   NOTIFICATIONS
   ============================================ */
function showNotification(title, body) {
  const area = $('notification-area');
  const notif = document.createElement('div');
  notif.className = 'notification';
  notif.innerHTML = `
    <div>
      <div class="notification-title">${escapeHtml(title)}</div>
      <div class="notification-body">${escapeHtml(body)}</div>
    </div>
  `;
  area.appendChild(notif);
  setTimeout(() => {
    notif.classList.add('removing');
    setTimeout(() => notif.remove(), 300);
  }, 3000);
}

/* ============================================
   THEME ENGINE
   ============================================ */
function applyTheme(themeName) {
  document.body.setAttribute('data-theme', themeName);
  state.theme = themeName;
  saveState();
}

function setWallpaper(url) {
  document.body.style.backgroundImage = `url('${url}')`;
  state.wallpaper = url;
  saveState();
}

/* ============================================
   GLOBAL DRAG / RESIZE STATE
   ============================================ */
let dragState = null;
let resizeState = null;

document.addEventListener('mousemove', (e) => {
  if (dragState) {
    dragState.el.style.left = dragState.startLeft + e.clientX - dragState.startX + 'px';
    dragState.el.style.top = dragState.startTop + e.clientY - dragState.startY + 'px';
  }
  if (resizeState) {
    const w = Math.max(320, resizeState.startW + e.clientX - resizeState.startX);
    const h = Math.max(200, resizeState.startH + e.clientY - resizeState.startY);
    resizeState.el.style.width = w + 'px';
    resizeState.el.style.height = h + 'px';
  }
});

document.addEventListener('mouseup', () => {
  dragState = null;
  resizeState = null;
});

/* ============================================
   WINDOW MANAGER
   ============================================ */
class WindowManager {
  constructor() {
    this.container = $('windows-container');
    this.taskbarApps = $('taskbar-apps');
    this.zCounter = 100;
    this.activeWindow = null;
  }

  open(appId) {
    const app = APPS[appId];
    if (!app) return;

    let winData = state.windows.get(appId);
    if (winData) {
      if (winData.element.classList.contains('minimized')) {
        this.restore(appId);
      }
      this.focus(appId);
      return;
    }

    const el = document.createElement('div');
    el.className = 'window';
    el.id = `win-${appId}`;
    el.style.width = app.width + 'px';
    el.style.height = app.height + 'px';
    el.style.top = (60 + Math.random() * 100) + 'px';
    el.style.left = (60 + Math.random() * 100) + 'px';
    el.style.zIndex = ++this.zCounter;

    el.innerHTML = `
      <div class="window-header" data-app="${appId}">
        <div class="window-controls">
          <div class="control-btn minimize" data-action="minimize" data-app="${appId}" title="Minimize"></div>
          <div class="control-btn maximize" data-action="maximize" data-app="${appId}" title="Maximize"></div>
          <div class="control-btn close" data-action="close" data-app="${appId}" title="Close"></div>
        </div>
        <span class="window-title">${escapeHtml(app.title)}</span>
        <div style="width:52px"></div>
      </div>
      <div class="window-body">${app.render()}</div>
      <div class="window-resize-handle" data-app="${appId}"></div>
    `;

    this.container.appendChild(el);

    winData = {
      id: appId,
      element: el,
      maximized: false,
      prevRect: null,
      intervals: [],
      timeouts: [],
    };
    state.windows.set(appId, winData);

    this.attachDrag(el, appId);
    this.attachResize(el, appId);
    this.focus(appId);
    this.updateTaskbar();

    if (app.setup) {
      const cleanup = app.setup(el, appId);
      if (typeof cleanup === 'function') {
        winData.cleanup = cleanup;
      }
    }

    el.addEventListener('mousedown', () => this.focus(appId));
  }

  close(appId) {
    const winData = state.windows.get(appId);
    if (!winData) return;

    const el = winData.element;
    el.classList.add('closing');

    if (winData.cleanup) winData.cleanup();
    winData.intervals.forEach(clearInterval);
    winData.timeouts.forEach(clearTimeout);

    setTimeout(() => {
      el.remove();
      state.windows.delete(appId);
      this.updateTaskbar();
    }, 150);
  }

  minimize(appId) {
    const winData = state.windows.get(appId);
    if (!winData) return;
    winData.element.classList.add('minimized');
    this.updateTaskbar();
  }

  restore(appId) {
    const winData = state.windows.get(appId);
    if (!winData) return;
    winData.element.classList.remove('minimized');
    this.focus(appId);
    this.updateTaskbar();
  }

  toggleMaximize(appId) {
    const winData = state.windows.get(appId);
    if (!winData) return;

    const el = winData.element;
    if (winData.maximized) {
      el.classList.remove('maximized');
      if (winData.prevRect) {
        el.style.top = winData.prevRect.top;
        el.style.left = winData.prevRect.left;
        el.style.width = winData.prevRect.width;
        el.style.height = winData.prevRect.height;
      }
      winData.maximized = false;
    } else {
      winData.prevRect = {
        top: el.style.top,
        left: el.style.left,
        width: el.style.width,
        height: el.style.height,
      };
      el.classList.add('maximized');
      winData.maximized = true;
    }
  }

  focus(appId) {
    const winData = state.windows.get(appId);
    if (!winData) return;
    winData.element.style.zIndex = ++this.zCounter;
    this.activeWindow = appId;
    this.updateTaskbar();
  }

  updateTaskbar() {
    this.taskbarApps.innerHTML = '';
    state.windows.forEach((winData, appId) => {
      const app = APPS[appId];
      if (!app) return;

      const item = document.createElement('div');
      item.className = 'taskbar-item';
      if (appId === this.activeWindow && !winData.element.classList.contains('minimized')) {
        item.classList.add('active');
      }
      item.innerHTML = `
        <span class="taskbar-item-icon">${app.icon}</span>
        <span>${escapeHtml(app.title)}</span>
      `;
      item.addEventListener('click', () => {
        if (winData.element.classList.contains('minimized')) {
          this.restore(appId);
        } else if (this.activeWindow === appId) {
          this.minimize(appId);
        } else {
          this.focus(appId);
        }
      });
      this.taskbarApps.appendChild(item);
    });
  }

  attachDrag(el, appId) {
    const header = el.querySelector('.window-header');
    if (!header) return;

    header.addEventListener('mousedown', (e) => {
      if (e.target.closest('.control-btn')) return;
      const winData = state.windows.get(appId);
      if (winData && winData.maximized) return;

      dragState = {
        el,
        startX: e.clientX,
        startY: e.clientY,
        startLeft: el.offsetLeft,
        startTop: el.offsetTop,
      };
      this.focus(appId);
      e.preventDefault();
    });
  }

  attachResize(el, appId) {
    const handle = el.querySelector('.window-resize-handle');
    if (!handle) return;

    handle.addEventListener('mousedown', (e) => {
      const winData = state.windows.get(appId);
      if (winData && winData.maximized) return;

      resizeState = {
        el,
        startX: e.clientX,
        startY: e.clientY,
        startW: el.offsetWidth,
        startH: el.offsetHeight,
      };
      this.focus(appId);
      e.preventDefault();
      e.stopPropagation();
    });
  }
}

const wm = new WindowManager();

/* ============================================
   CLOCK
   ============================================ */
function updateClock() {
  const now = new Date();
  const time = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  const date = now.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
  const clock = $('clock');
  if (clock) clock.textContent = `${date} ${time}`;
}
setInterval(updateClock, 1000);
updateClock();

/* ============================================
   BOOT SEQUENCE
   ============================================ */
function boot() {
  applyTheme(state.theme);
  if (state.wallpaper) setWallpaper(state.wallpaper);

  const bootScreen = $('boot-screen');
  const bootText = $('boot-text');

  const bootMessages = [
    'Initializing system...',
    'Loading kernel modules...',
    'Starting window manager...',
    'Loading apps...',
    'Mounting file system...',
    'Welcome to ZI OS',
  ];

  let i = 0;
  const interval = setInterval(() => {
    if (i < bootMessages.length) {
      bootText.textContent = bootMessages[i];
      i++;
    } else {
      clearInterval(interval);
      setTimeout(() => {
        bootScreen.classList.add('fade-out');
        setTimeout(() => bootScreen.remove(), 600);
        showNotification('Welcome back!', 'Click desktop icons or use the Start menu.');
      }, 400);
    }
  }, 300);
}

/* ============================================
   START MENU
   ============================================ */
function toggleStartMenu() {
  const menu = $('start-menu');
  menu.classList.toggle('open');
  if (menu.classList.contains('open')) {
    const search = $('start-menu-search');
    if (search) search.focus();
  }
}

function renderStartMenu() {
  const container = $('start-menu-apps');
  container.innerHTML = '';
  Object.values(APPS).forEach(app => {
    const item = document.createElement('div');
    item.className = 'start-app-item';
    item.innerHTML = `
      <div class="start-app-icon">${app.icon}</div>
      <div class="start-app-name">${escapeHtml(app.title)}</div>
    `;
    item.addEventListener('click', () => {
      wm.open(app.id);
      $('start-menu').classList.remove('open');
    });
    container.appendChild(item);
  });
}

/* ============================================
   CONTEXT MENU
   ============================================ */
function showContextMenu(x, y) {
  const menu = $('context-menu');
  const menuWidth = 180;
  const menuHeight = 150;
  const adjustedX = Math.min(x, window.innerWidth - menuWidth);
  const adjustedY = Math.min(y, window.innerHeight - menuHeight);
  menu.style.left = adjustedX + 'px';
  menu.style.top = adjustedY + 'px';
  menu.classList.add('open');
}

function hideContextMenu() {
  $('context-menu').classList.remove('open');
}

/* ============================================
   APP RENDERERS
   ============================================ */

function renderWelcome() {
  return `
    <div class="flex flex-col items-center text-center">
      <img src="https://avatars.githubusercontent.com/u/583231?v=4" alt="Profile" class="profile-pic" />
      <h1 class="text-2xl font-bold mb-2">Hey, I'm <span class="text-accent">ZI</span></h1>
      <p class="text-sm text-[var(--muted)] font-mono mb-3">Developer * Designer * Explorer</p>
      <p class="text-sm text-[var(--text-secondary)] mb-5 max-w-[320px] leading-relaxed">
        Welcome to a lil corner of the internet - build like an OS because why have a boring portfolio when you can have a whole custom operating system.
      </p>
      <div class="flex flex-wrap gap-2 justify-center">
        <a href="https://github.com/" target="_blank" class="btn btn-primary">GitHub</a>
        <a href="https://linkedin.com/" target="_blank" class="btn">LinkedIn</a>
        <a href="mailto:hello@example.com" target="_blank" class="btn">Email</a>
      </div>
    </div>
  `;
}

function renderAbout() {
  return `
    <div>
      <h2 class="section-heading">About Me</h2>
      <p class="text-sm text-[var(--text-secondary)] mb-4 leading-relaxed">
        I'm a developer who loves building things that feel alive. This web OS is my playground for experimenting with UI/UX, state management, and creative coding.
      </p>
      <ul class="flex flex-col gap-2 text-sm text-[var(--text-secondary)] mb-5 list-disc list-inside">
        <li>Based in the world</li>
        <li>Currently learning Rust and Go</li>
        <li>Loves building cool projects</li>
        <li>Open source enthusiast</li>
      </ul>
      <h2 class="section-heading">Skills</h2>
      <div class="flex flex-wrap gap-2">
        ${['HTML','CSS','JavaScript','Rust','Python','Svelte','TypeScript','Go','Tailwind','Node.js'].map(s => `<span class="tag">${s}</span>`).join('')}
      </div>
    </div>
  `;
}

function renderProjects() {
  const projects = [
    { name: 'web-os', desc: 'A portfolio styled like a desktop operating system.', icon: ICONS.terminal },
    { name: 'TaskFlow', desc: 'Minimalist task management app with drag-and-drop.', icon: ICONS.tasks },
    { name: 'DevTools UI', desc: 'Developer dashboard with live metrics and logs.', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 3v18h18"/><path d="M18.7 8l-5.1 5.2-2.8-2.7L7 14.3"/></svg>' },
    { name: 'ChatBot', desc: 'AI-powered chat interface with streaming responses.', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>' },
    { name: 'WeatherNow', desc: 'Real-time weather app with beautiful visualizations.', icon: ICONS.weather },
    { name: 'CodePen Clone', desc: 'Online code editor with live preview and sharing.', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>' },
  ];
  return `
    <div>
      <h2 class="section-heading mb-4">Projects</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
        ${projects.map(p => `
          <div class="card">
            <div class="text-2xl mb-2" style="display:flex;align-items:center;justify-content:center;height:32px;">${p.icon}</div>
            <div class="font-semibold text-sm mb-1">${escapeHtml(p.name)}</div>
            <div class="text-xs text-[var(--muted)]">${escapeHtml(p.desc)}</div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

function renderNotes() {
  return `
    <div class="notes-layout">
      <div class="notes-sidebar" id="notes-sidebar"></div>
      <div class="notes-content" id="notes-content">
        <p class="notes-placeholder">Pick a note from the list</p>
      </div>
    </div>
  `;
}

function setupNotes(el, appId) {
  const sidebar = el.querySelector('#notes-sidebar');
  const content = el.querySelector('#notes-content');

  function renderNoteList() {
    sidebar.innerHTML = '';
    state.notes.forEach(note => {
      const item = document.createElement('div');
      item.className = 'note-item' + (note.id === state.currentNoteId ? ' active' : '');
      item.innerHTML = `
        <div class="note-item-title">${escapeHtml(note.title)}</div>
        <div class="note-item-date">${escapeHtml(note.date)}</div>
      `;
      item.addEventListener('click', () => {
        state.currentNoteId = note.id;
        saveState();
        renderNoteList();
        renderNoteContent(note);
      });
      sidebar.appendChild(item);
    });
  }

  function renderNoteContent(note) {
    content.innerHTML = `
      <h3 class="note-content-title">${escapeHtml(note.title)}</h3>
      <p class="note-content-date">${escapeHtml(note.date)}</p>
      <p class="note-content-body">${escapeHtml(note.body)}</p>
    `;
  }

  function renderActiveNote() {
    const note = state.notes.find(n => n.id === state.currentNoteId);
    if (note) {
      renderNoteList();
      renderNoteContent(note);
    }
  }

  renderActiveNote();
  return () => {};
}

function renderTerminal() {
  return `
    <div class="flex flex-col h-full">
      <div id="terminal-output" class="terminal-output flex-1 overflow-y-auto mb-2" style="max-height:260px;"></div>
      <div class="terminal-input-line">
        <span class="terminal-prompt">visitor@ZI-os:~$</span>
        <input type="text" id="terminal-input" class="terminal-input" autocomplete="off" spellcheck="false" />
      </div>
    </div>
  `;
}

function setupTerminal(el, appId) {
  const output = el.querySelector('#terminal-output');
  const input = el.querySelector('#terminal-input');
  const winData = state.windows.get(appId);

  function print(text, color) {
    const line = document.createElement('div');
    line.style.color = color || 'var(--text-secondary)';
    line.textContent = text;
    output.appendChild(line);
    output.scrollTop = output.scrollHeight;
  }

  function printWelcome() {
    print('ZI OS Terminal v1.0.0');
    print('Type "help" for available commands.\n');
  }

  function execute(cmdRaw) {
    const cmd = cmdRaw.trim();
    if (!cmd) return;

    print(`visitor@ZI-os:~$ ${cmd}`);
    state.terminalHistory.push(cmd);
    state.terminalHistoryIndex = state.terminalHistory.length;

    const parts = cmd.split(' ');
    const command = parts[0].toLowerCase();
    const args = parts.slice(1);

    switch (command) {
      case 'help':
        print('Available commands:');
        print('  help        - Show this help message');
        print('  echo [text]  - Print text');
        print('  clear       - Clear terminal');
        print('  date        - Show current date/time');
        print('  whoami      - Print current user');
        print('  ls          - List files');
        print('  cat [file]  - Read file contents');
        print('  neofetch    - System info');
        print('  calc [expr] - Simple calculator');
        print('  theme [name]- Change theme');
        print('  exit        - Close terminal');
        break;
      case 'echo':
        print(args.join(' '));
        break;
      case 'clear':
        output.innerHTML = '';
        break;
      case 'date':
        print(new Date().toString());
        break;
      case 'whoami':
        print('visitor');
        break;
      case 'ls':
        print('Desktop/  Documents/  Downloads/  Pictures/  Music/  notes.txt  readme.md');
        break;
      case 'cat':
        const file = args[0] || '';
        if (file === 'notes.txt') print('Welcome to my OS! This is a note.');
        else if (file === 'readme.md') print('# web-os\nA portfolio styled like an OS.');
        else print(`cat: ${escapeHtml(file)}: No such file`);
        break;
      case 'neofetch':
        print('       ___       ');
        print('      /   \\      visitor@ZI-os');
        print('     /     \\     -----------');
        print('    / ZI  \\    OS: Web OS v1.0');
        print('   /  OS    \\   Host: Browser');
        print('  /_________\\   Resolution: ' + screen.width + 'x' + screen.height);
        print('                 Theme: ' + state.theme);
        print('                 Shell: web-terminal');
        break;
      case 'calc':
        try {
          const expr = args.join(' ');
          if (!expr) throw new Error('Usage: calc [expression]');
          const result = Function('"use strict"; return (' + expr + ')')();
          print('= ' + result);
        } catch (e) {
          print('Error: ' + e.message);
        }
        break;
      case 'theme':
        const themeName = args[0];
        if (themeName && THEMES[themeName]) {
          applyTheme(themeName);
          print(`Theme changed to ${THEMES[themeName]}`);
        } else {
          print('Available themes: ' + Object.keys(THEMES).join(', '));
        }
        break;
      case 'exit':
        wm.close('terminal');
        break;
      default:
        print(`Command not found: ${escapeHtml(command)}. Type "help" for available commands.`);
    }
  }

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      execute(input.value);
      input.value = '';
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (state.terminalHistoryIndex > 0) {
        state.terminalHistoryIndex--;
        input.value = state.terminalHistory[state.terminalHistoryIndex] || '';
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (state.terminalHistoryIndex < state.terminalHistory.length - 1) {
        state.terminalHistoryIndex++;
        input.value = state.terminalHistory[state.terminalHistoryIndex] || '';
      } else {
        state.terminalHistoryIndex = state.terminalHistory.length;
        input.value = '';
      }
    }
  });

  printWelcome();

  const focusInterval = setInterval(() => {
    if (!state.windows.has('terminal')) {
      clearInterval(focusInterval);
      return;
    }
    if (document.activeElement !== input) {
      input.focus();
    }
  }, 500);
  winData.intervals.push(focusInterval);

  return () => {};
}

function renderCalculator() {
  return `
    <div class="calc-grid">
      <div class="calc-display" id="calc-display">0</div>
      ${['C','±','%','÷','7','8','9','×','4','5','6','-','1','2','3','+','0','.','⌫','='].map(btn => `
        <div class="calc-btn ${['÷','×','-','+','='].includes(btn) ? 'operator' : ''} ${btn === '=' ? 'equals' : ''}" data-calc="${btn}">${btn}</div>
      `).join('')}
    </div>
  `;
}

function setupCalculator(el, appId) {
  const display = el.querySelector('#calc-display');
  let current = '0';
  let prev = null;
  let op = null;
  let newNumber = true;

  function updateDisplay() {
    display.textContent = current;
  }

  function calculate() {
    if (prev === null || op === null) return;
    const a = parseFloat(prev);
    const b = parseFloat(current);
    let result;
    switch (op) {
      case '+': result = a + b; break;
      case '-': result = a - b; break;
      case '×': result = a * b; break;
      case '÷': result = b === 0 ? 'Error' : a / b; break;
      default: return;
    }
    current = String(parseFloat(result.toFixed(10)));
    prev = null;
    op = null;
    newNumber = true;
    updateDisplay();
  }

  el.querySelectorAll('.calc-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const val = btn.dataset.calc;
      if (val >= '0' && val <= '9') {
        if (newNumber) {
          current = val;
          newNumber = false;
        } else {
          current += val;
        }
      } else if (val === '.') {
        if (newNumber) {
          current = '0.';
          newNumber = false;
        } else if (!current.includes('.')) {
          current += '.';
        }
      } else if (val === 'C') {
        current = '0';
        prev = null;
        op = null;
        newNumber = true;
      } else if (val === '±') {
        current = String(-parseFloat(current));
      } else if (val === '%') {
        current = String(parseFloat(current) / 100);
      } else if (val === '⌫') {
        if (current.length > 1) {
          current = current.slice(0, -1);
        } else {
          current = '0';
          newNumber = true;
        }
      } else if (val === '=') {
        calculate();
      } else if (['+', '-', '×', '÷'].includes(val)) {
        if (prev !== null && op && !newNumber) {
          calculate();
        }
        prev = current;
        op = val;
        newNumber = true;
      }
      updateDisplay();
    });
  });

  updateDisplay();
  return () => {};
}

function renderSettings() {
  const themeOptions = Object.entries(THEMES).map(([key, name]) => `
    <div
      class="theme-option ${state.theme === key ? 'active' : ''}"
      data-theme="${key}"
    >
      <div class="theme-preview">

        <svg
          class="theme-preview-svg"
          viewBox="0 0 120 70"
          preserveAspectRatio="xMidYMid slice"
        >

          <!-- Background -->
          <defs>
            <linearGradient
              id="theme-gradient-${key}"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop
                offset="0%"
                stop-color="${THEME_COLORS[key][0]}"
              />

              <stop
                offset="100%"
                stop-color="${THEME_COLORS[key][1]}"
              />
            </linearGradient>
          </defs>

          <rect
            width="120"
            height="70"
            rx="12"
            fill="url(#theme-gradient-${key})"
          />

          <!-- Fake window -->
          <rect
            x="9"
            y="9"
            width="102"
            height="52"
            rx="8"
            fill="rgba(0,0,0,0.28)"
          />

          <!-- Window controls -->
          <circle
            cx="20"
            cy="19"
            r="3"
            fill="rgba(255,255,255,0.9)"
          />

          <circle
            cx="30"
            cy="19"
            r="3"
            fill="rgba(255,255,255,0.55)"
          />

          <circle
            cx="40"
            cy="19"
            r="3"
            fill="rgba(255,255,255,0.3)"
          />

          <!-- Fake text -->
          <rect
            x="17"
            y="30"
            width="50"
            height="4"
            rx="2"
            fill="rgba(255,255,255,0.75)"
          />

          <rect
            x="17"
            y="39"
            width="34"
            height="4"
            rx="2"
            fill="rgba(255,255,255,0.35)"
          />

          <!-- Fake play button -->
          <circle
            cx="88"
            cy="43"
            r="10"
            fill="rgba(255,255,255,0.9)"
          />

          <path
            d="M85 37v12l8-6z"
            fill="${THEME_COLORS[key][1]}"
          />

        </svg>

      </div>

      <div class="theme-name">
        ${name}
      </div>
    </div>
  `).join('');

  const wallpaperOptions = WALLPAPERS.map((url, i) => `
    <div class="wallpaper-option ${state.wallpaper === url ? 'active' : ''}" data-wallpaper="${i}" style="background-image: url('${url}')"></div>
  `).join('');

  return `
    <div>
      <div class="settings-section">
        <div class="settings-label">Theme</div>
        <div class="theme-grid">${themeOptions}</div>
      </div>
      <div class="settings-section">
        <div class="settings-label">Wallpaper</div>
        <div class="wallpaper-grid">${wallpaperOptions}</div>
      </div>
      <div class="settings-section">
        <div class="settings-label">About</div>
        <div class="text-xs text-[var(--muted)]">
          ZI OS v1.0.0<br>
          Built with vanilla JS + Tailwind CSS<br>
          No frameworks, no build step.
        </div>
      </div>
    </div>
  `;
}

function setupSettings(el, appId) {
  el.querySelectorAll('.theme-option').forEach(opt => {
    opt.addEventListener('click', () => {
      const theme = opt.dataset.theme;
      applyTheme(theme);
      el.querySelectorAll('.theme-option').forEach(o => o.classList.remove('active'));
      opt.classList.add('active');
      showNotification('Theme changed', THEMES[theme]);
    });
  });

  el.querySelectorAll('.wallpaper-option').forEach(opt => {
    opt.addEventListener('click', () => {
      const idx = parseInt(opt.dataset.wallpaper);
      const url = WALLPAPERS[idx];
      setWallpaper(url);
      el.querySelectorAll('.wallpaper-option').forEach(o => o.classList.remove('active'));
      opt.classList.add('active');
      showNotification('Wallpaper updated', '');
    });
  });

  return () => {};
}

function renderBrowser() {
  return `
    <div class="flex flex-col h-full">
      <div class="flex gap-2 mb-3">
        <input type="text" id="browser-url" class="input flex-1" placeholder="Enter URL or search google" value="https://en.wikipedia.org/wiki/Special:Random" />
        <button id="browser-go" class="btn btn-primary btn-sm">Go</button>
      </div>
      <div class="flex-1 bg-black/20 rounded-lg overflow-hidden border border-[var(--border)]" style="min-height:200px;">
        <iframe id="browser-frame" src="https://en.wikipedia.org/wiki/Special:Random" class="w-full h-full border-0" sandbox="allow-scripts allow-same-origin" style="min-height:200px;"></iframe>
      </div>
      <p class="text-[10px] text-[var(--muted)] mt-2">Note: Some websites block embedding in iframes.</p>
    </div>
  `;
}

function setupBrowser(el, appId) {
  const urlInput = el.querySelector('#browser-url');
  const goBtn = el.querySelector('#browser-go');
  const frame = el.querySelector('#browser-frame');

  function navigate() {
    const input = urlInput.value.trim();
    if (!input) {
      return;

    }

    const looksLikeUrl =  /^https?:\/\//i.test(input) ||
       /^localhost(?::\d+)?(?:\/|$)/i.test(input) ||
       /^127\.0\.0\.1(?::\d+)?(?:\/|$)/i.test(input) ||
       /^[a-z0-9.-]+\.[a-z]{2,}(?:\/.*)?$/i.test(input);

    if (!looksLikeUrl) {
      let url = input;

      if (
        !url.startsWith('http://') &&
        !url.startsWith('https://')
      ) {
        url = 'https://' + url;
      }

      frame.src = url;
      urlInput.value = url;

      return;
    }

    const googleSearch =
      `https://www.google.com/search?q=${encodeURIComponent(input)}`;

    frame.src = googleSearch;

  }

  goBtn.addEventListener('click', navigate);
  urlInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') navigate();
  });

  return () => {};
}

function renderMusic() {
  return `
    <div class="music-app">
      <div class="music-search-row">
        <input
          type="text"
          id="music-search"
          class="input flex-1"
          placeholder="Search for a song..."
        />

        <button id="music-search-btn" class="btn btn-primary btn-sm">
          Search
        </button>
      </div>

      <div id="music-search-status"
           class="text-xs text-[var(--muted)] mt-2">
        Search for a song to begin.
      </div>

      <div class="music-now-playing mt-3">
        <div class="text-3xl" id="music-playing-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width:32px;height:32px;display:inline;"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>
        </div>

        <div class="flex-1 min-w-0">
          <div
            class="text-sm font-semibold truncate"
            id="music-now-playing"
          >
            Nothing playing
          </div>

          <div
            class="text-xs text-[var(--muted)]"
            id="music-status"
          >
            Paused
          </div>
        </div>

        <button
          id="music-play-btn"
          class="btn btn-primary btn-sm"
          disabled
        >
          Play
        </button>
      </div>

      <div id="music-results" class="music-grid mt-3">
        <div class="text-xs text-[var(--muted)]">
          Search results will appear here.
        </div>
      </div>

      <audio id="music-audio" preload="none"></audio>
    </div>
  `;
}

function setupMusic(el, appId) {
  const searchInput = el.querySelector('#music-search');
  const searchBtn = el.querySelector('#music-search-btn');
  const resultsEl = el.querySelector('#music-results');
  const searchStatus = el.querySelector('#music-search-status');

  const playBtn = el.querySelector('#music-play-btn');
  const nowPlaying = el.querySelector('#music-now-playing');
  const statusEl = el.querySelector('#music-status');
  const playingIcon = el.querySelector('#music-playing-icon');

  const audio = el.querySelector('#music-audio');

  let currentIndex = null;
  let hls = null;

  state.musicAudio = audio;

  async function searchMusic() {
    const query = searchInput.value.trim();

    if (!query) {
      searchStatus.textContent = 'Enter a song name first.';
      return;
    }

    searchStatus.textContent = 'Searching...';
    searchBtn.disabled = true;

    try {
      const url =
        `${MUSIC_API.base}/search` +
        `?q=${encodeURIComponent(query)}` +
        `&searchEngine=${encodeURIComponent(MUSIC_API.searchEngine)}`;

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Search failed: ${response.status}`);
      }

      const data = await response.json();

      if (!Array.isArray(data.response) || data.response.length === 0) {
        resultsEl.innerHTML = `
          <div class="text-xs text-[var(--muted)]">
            No results found.
          </div>
        `;

        searchStatus.textContent = 'No results found.';
        return;
      }

      state.musicResults = data.response;

      resultsEl.innerHTML = data.response
        .map((track, index) => `
          <div
            class="music-track"
            data-track="${index}"
          >
            <img
              src="${escapeHtml(track.img || '')}"
              class="music-track-cover"
              alt=""
              loading="lazy"
              onerror="this.style.display='none'"
            />

            <div class="music-track-info">
              <div class="music-track-name">
                ${escapeHtml(track.title || 'Unknown title')}
              </div>

              <div class="music-track-artist">
                Tap to play
              </div>
            </div>

            <div class="music-track-play">
              ▶
            </div>
          </div>
        `)
        .join('');

      searchStatus.textContent =
        `${data.response.length} result(s) found.`;

      el.querySelectorAll('.music-track').forEach(trackEl => {
        trackEl.addEventListener('click', () => {
          const index = Number(trackEl.dataset.track);
          playTrack(index);
        });
      });

    } catch (error) {
      console.error('Music search error:', error);

      searchStatus.textContent =
        'Music API is unavailable right now.';

      resultsEl.innerHTML = `
        <div class="text-xs text-[var(--muted)]">
          Could not connect to the music service.
        </div>
      `;
    } finally {
      searchBtn.disabled = false;
    }
  }

  async function playTrack(index) {
    const track = state.musicResults[index];

    if (!track || !track.id) {
      return;
    }

    currentIndex = index;
    state.currentTrack = index;

    nowPlaying.textContent =
      track.title || 'Unknown title';

    statusEl.textContent = 'Loading...';
    playingIcon.textContent = '♪';

    playBtn.disabled = true;

    try {
      const response = await fetch(
        `${MUSIC_API.base}/fetch?id=${encodeURIComponent(track.id)}`
      );

      if (!response.ok) {
        throw new Error(`Fetch failed: ${response.status}`);
      }

      const data = await response.json();

      const streamUrl = data.response;

      if (!streamUrl) {
        throw new Error('No stream URL returned');
      }

      /*
       * Destroy previous HLS instance.
       */
      if (hls) {
        hls.destroy();
        hls = null;
      }

      /*
       * HLS (.m3u8)
       */
      if (streamUrl.includes('.m3u8')) {

        if (window.Hls && Hls.isSupported()) {
          hls = new Hls();

          hls.loadSource(streamUrl);
          hls.attachMedia(audio);

          hls.on(Hls.Events.MANIFEST_PARSED, async () => {
            await audio.play();

            state.musicPlaying = true;

            statusEl.textContent = 'Playing';
            playingIcon.textContent = '♫';
            playBtn.textContent = 'Pause';
            playBtn.disabled = false;
          });

        } else if (
          audio.canPlayType('application/vnd.apple.mpegurl')
        ) {
          /*
           * Safari/native HLS.
           */
          audio.src = streamUrl;

          await audio.play();

          state.musicPlaying = true;

          statusEl.textContent = 'Playing';
          playingIcon.textContent = '♫';
          playBtn.textContent = 'Pause';
          playBtn.disabled = false;

        } else {
          throw new Error(
            'This browser does not support HLS streams.'
          );
        }

      } else {
        /*
         * Normal MP3 / MP4 stream.
         */
        audio.src = streamUrl;

        await audio.play();

        state.musicPlaying = true;

        statusEl.textContent = 'Playing';
        playingIcon.textContent = '♫';
        playBtn.textContent = 'Pause';
        playBtn.disabled = false;
      }

      el.querySelectorAll('.music-track')
        .forEach(item => item.classList.remove('playing'));

      const selected =
        el.querySelector(`[data-track="${index}"]`);

      if (selected) {
        selected.classList.add('playing');
      }

    } catch (error) {
      console.error('Music playback error:', error);

      statusEl.textContent =
        'Unable to play this track';

      playBtn.disabled = false;
    }
  }

  searchBtn.addEventListener('click', searchMusic);

  searchInput.addEventListener('keydown', e => {
    if (e.key === 'Enter') {
      searchMusic();
    }
  });

  playBtn.addEventListener('click', async () => {
    if (!audio.src && !hls) {
      if (currentIndex !== null) {
        await playTrack(currentIndex);
      }

      return;
    }

    if (audio.paused) {
      await audio.play();

      state.musicPlaying = true;
      statusEl.textContent = 'Playing';
      playBtn.textContent = 'Pause';
    } else {
      audio.pause();

      state.musicPlaying = false;
      statusEl.textContent = 'Paused';
      playBtn.textContent = 'Play';
    }
  });

  audio.addEventListener('ended', () => {
    state.musicPlaying = false;
    statusEl.textContent = 'Ended';
    playBtn.textContent = 'Play';
  });

  return () => {
    if (hls) {
      hls.destroy();
      hls = null;
    }

    audio.pause();
    audio.src = '';

    state.musicAudio = null;
    state.musicPlaying = false;
  };
}

function renderWeather() {
  const days = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
  const today = new Date().getDay();
  const sunSvg = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width:24px;height:24px;display:inline;"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>';
  const cloudSvg = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width:24px;height:24px;display:inline;"><path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9z"/></svg>';
  const rainSvg = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width:24px;height:24px;display:inline;"><path d="M16 13v8M8 13v8M12 15v8"/><path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9z"/></svg>';
  const weatherIcons = [sunSvg, cloudSvg, cloudSvg, rainSvg, cloudSvg, sunSvg, cloudSvg];
  return `
    <div>
      <div class="weather-card mb-4">
        <div class="text-4xl mb-2">${sunSvg}</div>
        <div class="weather-temp">24°C</div>
        <div class="text-sm text-[var(--muted)]">Sunny</div>
        <div class="text-xs text-[var(--text-secondary)] mt-1">Feels like 26°C</div>
      </div>
      <div class="grid grid-cols-7 gap-2 text-center text-xs">
        ${days.map((d, i) => `
          <div class="card py-2 ${i === today ? 'border-[var(--accent)]' : ''}">
            <div class="font-semibold text-[var(--muted)]">${d}</div>
            <div class="text-lg my-1">${i === today ? sunSvg : weatherIcons[i]}</div>
            <div>${[24,22,19,23,25,27,21][i]}°</div>
          </div>
        `).join('')}
      </div>
      <div class="mt-4 text-xs text-[var(--muted)]">Humidity: 45% | Wind: 12 km/h | UV: 3</div>
    </div>
  `;
}

function renderCalendar() {
  return `
    <div>
      <div class="flex items-center justify-between mb-3">
        <button id="cal-prev" class="btn btn-sm">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width:14px;height:14px;display:inline;"><polyline points="15 18 9 12 15 6"/></svg>
        </button>
        <h3 class="font-semibold text-sm" id="cal-month-year"></h3>
        <button id="cal-next" class="btn btn-sm">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width:14px;height:14px;display:inline;"><polyline points="9 18 15 12 9 6"/></svg>
        </button>
      </div>
      <div class="calendar-grid" id="cal-grid"></div>
    </div>
  `;
}

function setupCalendar(el, appId) {
  const grid = el.querySelector('#cal-grid');
  const monthYear = el.querySelector('#cal-month-year');
  const prevBtn = el.querySelector('#cal-prev');
  const nextBtn = el.querySelector('#cal-next');
  const date = state.calendarDate;

  function render() {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDay = firstDay.getDay();
    const daysInMonth = lastDay.getDate();

    monthYear.textContent = date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

    let html = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].map(d => `<div class="calendar-header">${d}</div>`).join('');

    const prevMonthLastDay = new Date(year, month, 0).getDate();
    for (let i = startDay - 1; i >= 0; i--) {
      html += `<div class="calendar-day other-month">${prevMonthLastDay - i}</div>`;
    }

    const today = new Date();
    for (let d = 1; d <= daysInMonth; d++) {
      const isToday = d === today.getDate() && month === today.getMonth() && year === today.getFullYear();
      html += `<div class="calendar-day ${isToday ? 'today' : ''}">${d}</div>`;
    }

    const remaining = 42 - (startDay + daysInMonth);
    for (let d = 1; d <= remaining; d++) {
      html += `<div class="calendar-day other-month">${d}</div>`;
    }

    grid.innerHTML = html;
  }

  prevBtn.addEventListener('click', () => {
    date.setMonth(date.getMonth() - 1);
    render();
  });

  nextBtn.addEventListener('click', () => {
    date.setMonth(date.getMonth() + 1);
    render();
  });

  render();
  return () => {};
}

function renderTasks() {
  return `
    <div>
      <div class="flex gap-2 mb-4">
        <input type="text" id="task-input" class="input flex-1" placeholder="Add a new task..." />
        <button id="task-add" class="btn btn-primary btn-sm">Add</button>
      </div>
      <div id="task-list"></div>
    </div>
  `;
}

function setupTasks(el, appId) {
  const list = el.querySelector('#task-list');
  const input = el.querySelector('#task-input');
  const addBtn = el.querySelector('#task-add');

  function render() {
    list.innerHTML = state.tasks.map(task => `
      <div class="task-item" data-id="${task.id}">
        <div class="task-checkbox ${task.done ? 'checked' : ''}" data-id="${task.id}"></div>
        <div class="task-text ${task.done ? 'done' : ''}">${escapeHtml(task.text)}</div>
        <button class="task-delete" data-id="${task.id}">×</button>
      </div>
    `).join('');

    list.querySelectorAll('.task-checkbox').forEach(cb => {
      cb.addEventListener('click', () => {
        const id = parseInt(cb.dataset.id);
        const task = state.tasks.find(t => t.id === id);
        if (task) {
          task.done = !task.done;
          saveState();
          render();
        }
      });
    });

    list.querySelectorAll('.task-delete').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = parseInt(btn.dataset.id);
        state.tasks = state.tasks.filter(t => t.id !== id);
        saveState();
        render();
      });
    });
  }

  function addTask() {
    const text = input.value.trim();
    if (!text) return;
    const newId = state.tasks.length > 0 ? Math.max(...state.tasks.map(t => t.id)) + 1 : 1;
    state.tasks.push({ id: newId, text, done: false });
    input.value = '';
    saveState();
    render();
  }

  addBtn.addEventListener('click', addTask);
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') addTask();
  });

  render();
  return () => {};
}

/* ============================================
   DESKTOP ICONS
   ============================================ */
function renderDesktopIcons() {
  const container = $('desktop-icons');
  container.innerHTML = '';
  const desktopApps = ['welcome', 'about', 'projects', 'notes', 'terminal', 'calculator', 'settings', 'browser', 'music', 'weather', 'calendar', 'tasks'];
  desktopApps.forEach(appId => {
    const app = APPS[appId];
    if (!app) return;
    const icon = document.createElement('div');
    icon.className = 'icon';
    icon.dataset.app = appId;
    icon.innerHTML = `
      <div class="icon-img">${app.icon}</div>
      <span class="icon-label">${escapeHtml(app.title)}</span>
    `;
    icon.addEventListener('click', () => wm.open(appId));
    container.appendChild(icon);
  });
}

/* ============================================
   EVENT LISTENERS
   ============================================ */
function setupEventListeners() {
  $('start-btn').addEventListener('click', toggleStartMenu);

  document.addEventListener('click', (e) => {
    const startMenu = $('start-menu');
    const startBtn = $('start-btn');
    if (startMenu.classList.contains('open') && !startMenu.contains(e.target) && e.target !== startBtn) {
      startMenu.classList.remove('open');
    }
  });

  document.addEventListener('contextmenu', (e) => {
    if (e.target.closest('.window') || e.target.closest('#taskbar') || e.target.closest('#start-menu') || e.target.closest('.icon')) {
      return;
    }
    e.preventDefault();
    showContextMenu(e.clientX, e.clientY);
  });

  document.addEventListener('click', (e) => {
    if (!e.target.closest('#context-menu')) {
      hideContextMenu();
    }
  });

  $('context-menu').addEventListener('click', (e) => {
    const item = e.target.closest('.ctx-item');
    if (!item) return;
    const action = item.dataset.action;
    if (action === 'refresh') location.reload();
    if (action === 'terminal') wm.open('terminal');
    if (action === 'settings') wm.open('settings');
    if (action === 'about') wm.open('about');
    hideContextMenu();
  });

  document.addEventListener('click', (e) => {
    const btn = e.target.closest('.control-btn');
    if (!btn) return;
    const action = btn.dataset.action;
    const appId = btn.dataset.app;
    if (!action || !appId) return;

    if (action === 'close') wm.close(appId);
    if (action === 'minimize') wm.minimize(appId);
    if (action === 'maximize') wm.toggleMaximize(appId);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      $('start-menu').classList.remove('open');
      hideContextMenu();
    }
  });

  $('settings-shortcut').addEventListener('click', () => {
    wm.open('settings');
    $('start-menu').classList.remove('open');
  });

  $('power-shortcut').addEventListener('click', () => {
    if (confirm('Shut down ZI OS?')) {
      document.body.innerHTML = `
        <div style="display:flex;align-items:center;justify-content:center;height:100vh;background:#000;color:#888;font-family:monospace;flex-direction:column;gap:12px;">
          <div style="font-size:48px;">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width:48px;height:48px;display:inline;"><path d="M18.36 6.64a9 9 0 1 1-12.73 0"/><line x1="12" y1="2" x2="12" y2="12"/></svg>
          </div>
          <div>ZI OS has been shut down.</div>
          <div style="font-size:12px;color:#555;">Close the tab to fully exit.</div>
        </div>
      `;
    }
  });
}

/* ============================================
   INIT
   ============================================ */
document.addEventListener('DOMContentLoaded', () => {
  renderDesktopIcons();
  renderStartMenu();
  setupEventListeners();
  boot();
});
