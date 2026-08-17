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

const THEME_COLORS = {
  midnight: ['#0d0d14', '#7c6dfa'],
  ocean: ['#0a1628', '#3b9eff'],
  forest: ['#0f1a14', '#4ade80'],
  sunset: ['#1a0f0a', '#fb923c'],
  light: ['#f5f5f8', '#6366f1'],
  matrix: ['#000000', '#00ff00'],
  cyberpunk: ['#0f001a', '#00ffff'],
};

/* ============================================
   APPS REGISTRY
   ============================================ */
const APPS = {
  welcome: {
    id: 'welcome',
    title: 'Welcome',
    icon: '👋',
    width: 420,
    height: 400,
    render: renderWelcome,
    setup: () => {},
  },
  about: {
    id: 'about',
    title: 'About Me',
    icon: '👤',
    width: 440,
    height: 420,
    render: renderAbout,
    setup: () => {},
  },
  projects: {
    id: 'projects',
    title: 'Projects',
    icon: '🚀',
    width: 520,
    height: 400,
    render: renderProjects,
    setup: () => {},
  },
  notes: {
    id: 'notes',
    title: 'Notes',
    icon: '📝',
    width: 500,
    height: 420,
    render: renderNotes,
    setup: setupNotes,
  },
  terminal: {
    id: 'terminal',
    title: 'Terminal',
    icon: '💻',
    width: 520,
    height: 340,
    render: renderTerminal,
    setup: setupTerminal,
  },
  calculator: {
    id: 'calculator',
    title: 'Calculator',
    icon: '🧮',
    width: 280,
    height: 400,
    render: renderCalculator,
    setup: setupCalculator,
  },
  settings: {
    id: 'settings',
    title: 'Settings',
    icon: '⚙️',
    width: 480,
    height: 440,
    render: renderSettings,
    setup: setupSettings,
  },
  browser: {
    id: 'browser',
    title: 'Browser',
    icon: '🌐',
    width: 640,
    height: 480,
    render: renderBrowser,
    setup: setupBrowser,
  },
  music: {
    id: 'music',
    title: 'Music',
    icon: '🎵',
    width: 400,
    height: 420,
    render: renderMusic,
    setup: setupMusic,
  },
  weather: {
    id: 'weather',
    title: 'Weather',
    icon: '🌤️',
    width: 320,
    height: 360,
    render: renderWeather,
    setup: () => {},
  },
  calendar: {
    id: 'calendar',
    title: 'Calendar',
    icon: '📅',
    width: 340,
    height: 380,
    render: renderCalendar,
    setup: setupCalendar,
  },
  tasks: {
    id: 'tasks',
    title: 'Tasks',
    icon: '✅',
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
    'Welcome to Alex OS',
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
      <h1 class="text-2xl font-bold mb-2">Hey, I'm <span class="text-accent">Alex</span></h1>
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
    { name: 'web-os', desc: 'A portfolio styled like a desktop operating system.', icon: '💻' },
    { name: 'TaskFlow', desc: 'Minimalist task management app with drag-and-drop.', icon: '📋' },
    { name: 'DevTools UI', desc: 'Developer dashboard with live metrics and logs.', icon: '📊' },
    { name: 'ChatBot', desc: 'AI-powered chat interface with streaming responses.', icon: '🤖' },
    { name: 'WeatherNow', desc: 'Real-time weather app with beautiful visualizations.', icon: '🌤️' },
    { name: 'CodePen Clone', desc: 'Online code editor with live preview and sharing.', icon: '✏️' },
  ];
  return `
    <div>
      <h2 class="section-heading mb-4">Projects</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
        ${projects.map(p => `
          <div class="card">
            <div class="text-2xl mb-2">${p.icon}</div>
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
        <span class="terminal-prompt">visitor@alex-os:~$</span>
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
    print('Alex OS Terminal v1.0.0');
    print('Type "help" for available commands.\n');
  }

  function execute(cmdRaw) {
    const cmd = cmdRaw.trim();
    if (!cmd) return;

    print(`visitor@alex-os:~$ ${cmd}`);
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
        print('      /   \\      visitor@alex-os');
        print('     /     \\     -----------');
        print('    / Alex  \\    OS: Web OS v1.0');
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
    <div class="theme-option ${state.theme === key ? 'active' : ''}" data-theme="${key}">
      <div class="theme-preview" style="background: linear-gradient(135deg, ${THEME_COLORS[key][0]}, ${THEME_COLORS[key][1]})"></div>
      <div class="theme-name">${name}</div>
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
          Alex OS v1.0.0<br>
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
        <input type="text" id="browser-url" class="input flex-1" placeholder="Enter URL (e.g., https://example.com)" value="https://en.wikipedia.org/wiki/Special:Random" />
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
    let url = urlInput.value.trim();
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      url = 'https://' + url;
    }
    frame.src = url;
  }

  goBtn.addEventListener('click', navigate);
  urlInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') navigate();
  });

  return () => {};
}

function renderMusic() {
  const tracks = [
    { name: 'Lo-Fi Study', artist: 'Chill Beats', icon: '🎧' },
    { name: 'Synthwave Mix', artist: 'Retro Vibes', icon: '🎹' },
    { name: 'Ambient Flow', artist: 'Calm Sounds', icon: '🎼' },
    { name: 'Deep Focus', artist: 'Brain Food', icon: '🎵' },
    { name: 'Night Drive', artist: 'Neon City', icon: '🌃' },
    { name: 'Coffee Shop', artist: 'Morning Brew', icon: '☕' },
  ];

  const tracksHtml = tracks.map((t, i) => `
    <div class="music-track" data-track="${i}">
      <div class="music-track-icon">${t.icon}</div>
      <div class="music-track-name">${escapeHtml(t.name)}</div>
      <div class="music-track-artist">${escapeHtml(t.artist)}</div>
    </div>
  `).join('');

  return `
    <div>
      <div class="flex items-center gap-3 mb-4 p-3 bg-black/20 rounded-lg">
        <div class="text-3xl" id="music-playing-icon">🎵</div>
        <div class="flex-1">
          <div class="text-sm font-semibold" id="music-now-playing">Select a track</div>
          <div class="text-xs text-[var(--muted)]" id="music-status">Paused</div>
        </div>
        <button id="music-play-btn" class="btn btn-primary btn-sm">Play</button>
      </div>
      <div class="music-grid">${tracksHtml}</div>
    </div>
  `;
}

function setupMusic(el, appId) {
  const tracks = [
    { name: 'Lo-Fi Study', artist: 'Chill Beats', icon: '🎧' },
    { name: 'Synthwave Mix', artist: 'Retro Vibes', icon: '🎹' },
    { name: 'Ambient Flow', artist: 'Calm Sounds', icon: '🎼' },
    { name: 'Deep Focus', artist: 'Brain Food', icon: '🎵' },
    { name: 'Night Drive', artist: 'Neon City', icon: '🌃' },
    { name: 'Coffee Shop', artist: 'Morning Brew', icon: '☕' },
  ];

  const playBtn = el.querySelector('#music-play-btn');
  const nowPlaying = el.querySelector('#music-now-playing');
  const statusEl = el.querySelector('#music-status');
  const playingIcon = el.querySelector('#music-playing-icon');

  let currentTrackIndex = null;

  el.querySelectorAll('.music-track').forEach(trackEl => {
    trackEl.addEventListener('click', () => {
      const idx = parseInt(trackEl.dataset.track);
      currentTrackIndex = idx;
      state.currentTrack = idx;
      nowPlaying.textContent = `${tracks[idx].name} - ${tracks[idx].artist}`;
      statusEl.textContent = 'Playing';
      playingIcon.textContent = '🎶';
      playBtn.textContent = 'Pause';
      el.querySelectorAll('.music-track').forEach(t => t.classList.remove('playing'));
      trackEl.classList.add('playing');
      state.musicPlaying = true;
    });
  });

  playBtn.addEventListener('click', () => {
    if (state.currentTrack === null) {
      showNotification('Music', 'Select a track first');
      return;
    }
    state.musicPlaying = !state.musicPlaying;
    if (state.musicPlaying) {
      statusEl.textContent = 'Playing';
      playingIcon.textContent = '🎶';
      playBtn.textContent = 'Pause';
    } else {
      statusEl.textContent = 'Paused';
      playingIcon.textContent = '🎵';
      playBtn.textContent = 'Play';
    }
  });

  return () => {
    state.musicPlaying = false;
    state.currentTrack = null;
  };
}

function renderWeather() {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const today = new Date().getDay();
  return `
    <div>
      <div class="weather-card mb-4">
        <div class="text-4xl mb-2">☀️</div>
        <div class="weather-temp">24°C</div>
        <div class="text-sm text-[var(--muted)]">Sunny</div>
        <div class="text-xs text-[var(--text-secondary)] mt-1">Feels like 26°C</div>
      </div>
      <div class="grid grid-cols-7 gap-2 text-center text-xs">
        ${days.map((d, i) => `
          <div class="card py-2 ${i === today ? 'border-[var(--accent)]' : ''}">
            <div class="font-semibold text-[var(--muted)]">${d}</div>
            <div class="text-lg my-1">${i === today ? '☀️' : ['⛅','☁️','🌧️','⛅','☀️','☀️','⛅'][i]}</div>
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
        <button id="cal-prev" class="btn btn-sm">◀</button>
        <h3 class="font-semibold text-sm" id="cal-month-year"></h3>
        <button id="cal-next" class="btn btn-sm">▶</button>
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
    if (confirm('Shut down Alex OS?')) {
      document.body.innerHTML = `
        <div style="display:flex;align-items:center;justify-content:center;height:100vh;background:#000;color:#888;font-family:monospace;flex-direction:column;gap:12px;">
          <div style="font-size:48px;">💤</div>
          <div>Alex OS has been shut down.</div>
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
