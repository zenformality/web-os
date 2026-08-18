const themes = {
  midnight: 'Midnight', light: 'Light', ocean: 'Ocean', matrix: 'Matrix'
};

const wallpapers = [
  'wallpapers/4k-black-hole-with-bright-horizon-kug5rf2bs46mxcur.webp',
  'https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?w=1920&q=80',
  'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=1920&q=80',
  'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=1920&q=80',
  'https://images.unsplash.com/photo-1502134249126-9f3755a50d78?w=1920&q=80',
];

const themeColors = {
  midnight: ['#1a1a1a', '#7c6dfa'],
  light: ['#e8e8e8', '#6366f1'],
  ocean: ['#122040', '#3b9eff'],
  matrix: ['#001a00', '#00ff00'],
};

const icons = {
  welcome: 'zap', about: 'user', projects: 'rocket', notes: 'file-text',
  terminal: 'terminal', calculator: 'calculator', settings: 'settings',
  browser: 'globe', music: 'music', weather: 'cloud', calendar: 'calendar',
  tasks: 'clipboard-check'
};

function icon(name) {
  return '<i class="icon-' + name + '"></i>';
}

const APPS = {
  welcome:   { id: 'welcome',   title: 'Welcome',   icon: icons.welcome,   w: 400, h: 380, render: renderWelcome,   setup: null },
  about:     { id: 'about',     title: 'About Me',  icon: icons.about,     w: 420, h: 400, render: renderAbout,     setup: null },
  projects:  { id: 'projects',  title: 'Projects',  icon: icons.projects,  w: 500, h: 380, render: renderProjects,  setup: null },
  notes:     { id: 'notes',     title: 'Notes',     icon: icons.notes,     w: 480, h: 400, render: renderNotes,     setup: setupNotes },
  terminal:  { id: 'terminal',  title: 'Terminal',  icon: icons.terminal,  w: 500, h: 320, render: renderTerminal,  setup: setupTerminal },
  calculator:{ id: 'calculator',title: 'Calculator',icon: icons.calculator, w: 260, h: 380, render: renderCalculator, setup: setupCalculator },
  settings:  { id: 'settings',  title: 'Settings',  icon: icons.settings,  w: 460, h: 420, render: renderSettings,  setup: setupSettings },
  browser:   { id: 'browser',   title: 'Browser',   icon: icons.browser,   w: 620, h: 460, render: renderBrowser,   setup: setupBrowser },
  music:     { id: 'music',     title: 'Music',     icon: icons.music,     w: 380, h: 400, render: renderMusic,     setup: setupMusic },
  weather:   { id: 'weather',   title: 'Weather',   icon: icons.weather,   w: 300, h: 340, render: renderWeather,   setup: null },
  calendar:  { id: 'calendar',  title: 'Calendar',  icon: icons.calendar,  w: 320, h: 360, render: renderCalendar,  setup: setupCalendar },
  tasks:     { id: 'tasks',     title: 'Tasks',     icon: icons.tasks,     w: 380, h: 380, render: renderTasks,     setup: setupTasks },
};

const state = {
  windows: new Map(),
  topZ: 100,
  theme: localStorage.getItem('web-os-theme') || 'midnight',
  wallpaper: localStorage.getItem('web-os-wallpaper') || wallpapers[0],
  notes: JSON.parse(localStorage.getItem('web-os-notes') || '[{"id":1,"title":"Pinned Notes","body":"Welcome! Click any note on the left.","date":"2026-08-17"},{"id":2,"title":"Projects","body":"Working on web-os","date":"2026-08-16"},{"id":3,"title":"Reading","body":"Opposite of Always by Justin A. Reynolds","date":"2026-08-15"},{"id":4,"title":"Ideas","body":"Add terminal, music player, and games.","date":"2026-08-14"}]'),
  currentNoteId: 1,
  terminalHistory: [],
  terminalHistoryIdx: -1,
  tasks: JSON.parse(localStorage.getItem('web-os-tasks') || '[{"id":1,"text":"Build web OS","done":true},{"id":2,"text":"Add more themes","done":true},{"id":3,"text":"Add terminal app","done":false},{"id":4,"text":"Write documentation","done":false}]'),
  musicPlaying: false,
  currentTrack: null,
  musicResults: null,
  musicAudio: null,
  calendarDate: new Date(),
};

function $(id) { return document.getElementById(id); }

function esc(t) {
  const d = document.createElement('div');
  d.textContent = t;
  return d.innerHTML;
}

function save() {
  localStorage.setItem('web-os-theme', state.theme);
  localStorage.setItem('web-os-wallpaper', state.wallpaper);
  localStorage.setItem('web-os-notes', JSON.stringify(state.notes));
  localStorage.setItem('web-os-tasks', JSON.stringify(state.tasks));
}

function notify(title, body) {
  const area = $('notification-area');
  const n = document.createElement('div');
  n.className = 'notification';
  n.innerHTML = '<div class="notification-title">' + esc(title) + '</div><div class="notification-body">' + esc(body) + '</div>';
  area.appendChild(n);
  setTimeout(() => { n.classList.add('removing'); setTimeout(() => n.remove(), 300); }, 3000);
}

function applyTheme(name) {
  document.body.setAttribute('data-theme', name);
  state.theme = name;
  save();
}

function setWallpaper(url) {
  document.body.style.backgroundImage = "url('" + url + "')";
  state.wallpaper = url;
  save();
}

let dragState = null;
let resizeState = null;

document.addEventListener('mousemove', (e) => {
  if (dragState) {
    dragState.el.style.left = (dragState.startLeft + e.clientX - dragState.startX) + 'px';
    dragState.el.style.top = (dragState.startTop + e.clientY - dragState.startY) + 'px';
  }
  if (resizeState) {
    resizeState.el.style.width = Math.max(280, resizeState.startW + e.clientX - resizeState.startX) + 'px';
    resizeState.el.style.height = Math.max(200, resizeState.startH + e.clientY - resizeState.startY) + 'px';
  }
});

document.addEventListener('mouseup', () => { dragState = null; resizeState = null; });

// Window Manager
const wm = {
  container: null,
  taskbarApps: null,
  zCounter: 100,
  activeWindow: null,

  init() {
    this.container = $('windows-container');
    this.taskbarApps = $('taskbar-apps');
  },

  open(appId) {
    const app = APPS[appId];
    if (!app) return;
    const existing = state.windows.get(appId);
    if (existing) {
      if (existing.el.classList.contains('minimized')) this.restore(appId);
      this.focus(appId);
      return;
    }
    const el = document.createElement('div');
    el.className = 'window';
    el.id = 'win-' + appId;
    el.style.width = app.w + 'px';
    el.style.height = app.h + 'px';
    el.style.top = (50 + Math.random() * 80) + 'px';
    el.style.left = (50 + Math.random() * 80) + 'px';
    el.style.zIndex = ++this.zCounter;
    el.innerHTML =
      '<div class="window-header" data-app="' + appId + '">' +
        '<div class="window-controls">' +
          '<div class="control-btn minimize" data-action="minimize" data-app="' + appId + '"></div>' +
          '<div class="control-btn maximize" data-action="maximize" data-app="' + appId + '"></div>' +
          '<div class="control-btn close" data-action="close" data-app="' + appId + '"></div>' +
        '</div>' +
        '<span class="window-title">' + esc(app.title) + '</span>' +
        '<div style="width:50px"></div>' +
      '</div>' +
      '<div class="window-body">' + app.render() + '</div>' +
      '<div class="window-resize-handle" data-app="' + appId + '"></div>';
    this.container.appendChild(el);
    const winData = { id: appId, el, maximized: false, prevRect: null, cleanup: null };
    state.windows.set(appId, winData);
    this.drag(el, appId);
    this.resize(el, appId);
    this.focus(appId);
    this.updateTaskbar();
    if (app.setup) winData.cleanup = app.setup(el, appId);
    el.addEventListener('mousedown', () => this.focus(appId));
  },

  close(appId) {
    const d = state.windows.get(appId);
    if (!d) return;
    if (d.cleanup) d.cleanup();
    d.el.remove();
    state.windows.delete(appId);
    this.updateTaskbar();
  },

  minimize(appId) {
    const d = state.windows.get(appId);
    if (!d) return;
    d.el.classList.add('minimized');
    this.updateTaskbar();
  },

  restore(appId) {
    const d = state.windows.get(appId);
    if (!d) return;
    d.el.classList.remove('minimized');
    this.focus(appId);
    this.updateTaskbar();
  },

  toggleMax(appId) {
    const d = state.windows.get(appId);
    if (!d) return;
    if (d.maximized) {
      d.el.classList.remove('maximized');
      if (d.prevRect) {
        d.el.style.top = d.prevRect.top;
        d.el.style.left = d.prevRect.left;
        d.el.style.width = d.prevRect.width;
        d.el.style.height = d.prevRect.height;
      }
      d.maximized = false;
    } else {
      d.prevRect = {
        top: d.el.style.top, left: d.el.style.left,
        width: d.el.style.width, height: d.el.style.height
      };
      d.el.classList.add('maximized');
      d.maximized = true;
    }
  },

  focus(appId) {
    const d = state.windows.get(appId);
    if (!d) return;
    d.el.style.zIndex = ++this.zCounter;
    this.activeWindow = appId;
    this.updateTaskbar();
  },

  updateTaskbar() {
    this.taskbarApps.innerHTML = '';
    state.windows.forEach((d, appId) => {
      const app = APPS[appId];
      if (!app) return;
      const item = document.createElement('div');
      item.className = 'taskbar-item' + (appId === this.activeWindow && !d.el.classList.contains('minimized') ? ' active' : '');
      item.innerHTML = icon(app.icon) + ' ' + esc(app.title);
      item.addEventListener('click', () => {
        if (d.el.classList.contains('minimized')) this.restore(appId);
        else if (this.activeWindow === appId) this.minimize(appId);
        else this.focus(appId);
      });
      this.taskbarApps.appendChild(item);
    });
  },

  drag(el, appId) {
    const header = el.querySelector('.window-header');
    header.addEventListener('mousedown', (e) => {
      if (e.target.closest('.control-btn')) return;
      const d = state.windows.get(appId);
      if (d && d.maximized) return;
      dragState = { el, startX: e.clientX, startY: e.clientY, startLeft: el.offsetLeft, startTop: el.offsetTop };
      this.focus(appId);
      e.preventDefault();
    });
  },

  resize(el, appId) {
    const handle = el.querySelector('.window-resize-handle');
    handle.addEventListener('mousedown', (e) => {
      const d = state.windows.get(appId);
      if (d && d.maximized) return;
      resizeState = { el, startX: e.clientX, startY: e.clientY, startW: el.offsetWidth, startH: el.offsetHeight };
      this.focus(appId);
      e.preventDefault();
      e.stopPropagation();
    });
  }
};

// Clock
function updateClock() {
  const now = new Date();
  const time = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  const date = now.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
  $('clock').textContent = date + ' ' + time;
}
setInterval(updateClock, 1000);

// Boot
function boot() {
  applyTheme(state.theme);
  if (state.wallpaper) setWallpaper(state.wallpaper);
  const msgs = ['Initializing...', 'Loading modules...', 'Starting window manager...', 'Loading apps...', 'Welcome to ZI OS'];
  let i = 0;
  const interval = setInterval(() => {
    if (i < msgs.length) { $('boot-text').textContent = msgs[i]; i++; }
    else {
      clearInterval(interval);
      setTimeout(() => {
        $('boot-screen').classList.add('fade-out');
        setTimeout(() => $('boot-screen').remove(), 500);
        notify('Welcome back!', 'Click desktop icons or use Start.');
      }, 300);
    }
  }, 250);
}

// Start menu
function toggleStartMenu() {
  const m = $('start-menu');
  m.classList.toggle('open');
  if (m.classList.contains('open')) $('start-menu-search').focus();
}

function renderStartMenu() {
  const c = $('start-menu-apps');
  c.innerHTML = '';
  Object.values(APPS).forEach(app => {
    const item = document.createElement('div');
    item.className = 'start-app-item';
    item.innerHTML = icon(app.icon) + '<div class="start-app-name">' + esc(app.title) + '</div>';
    item.addEventListener('click', () => { wm.open(app.id); $('start-menu').classList.remove('open'); });
    c.appendChild(item);
  });
}

// Context menu
function showCtx(x, y) {
  const m = $('context-menu');
  m.style.left = Math.min(x, window.innerWidth - 170) + 'px';
  m.style.top = Math.min(y, window.innerHeight - 120) + 'px';
  m.classList.add('open');
}
function hideCtx() { $('context-menu').classList.remove('open'); }

// App renderers
function renderWelcome() {
  return '<div style="text-align:center;">' +
    '<img src="https://avatars.githubusercontent.com/u/583231?v=4" style="width:60px;height:60px;border:2px solid var(--accent);margin-bottom:12px;" alt="avatar">' +
    '<h1 style="font-size:20px;font-weight:bold;margin-bottom:4px;">Hey, I\'m <span style="color:var(--accent)">ZI</span></h1>' +
    '<p style="font-size:12px;color:var(--text2);margin-bottom:12px;">Developer * Designer * Explorer</p>' +
    '<p style="font-size:12px;color:var(--text2);margin-bottom:16px;">Welcome to my corner of the internet. Built like an OS because why not.</p>' +
    '<div style="display:flex;gap:6px;justify-content:center;">' +
      '<a href="https://github.com/" target="_blank" class="btn btn-primary">GitHub</a>' +
      '<a href="https://linkedin.com/" target="_blank" class="btn">LinkedIn</a>' +
      '<a href="mailto:hello@example.com" class="btn">Email</a>' +
    '</div>' +
  '</div>';
}

function renderAbout() {
  const skills = ['HTML','CSS','JavaScript','Rust','Python','Svelte','TypeScript','Go','Node.js'];
  return '<div>' +
    '<h2 class="section-heading">About Me</h2>' +
    '<p style="font-size:12px;color:var(--text2);margin-bottom:12px;">I\'m a developer who likes building things that feel alive. This web OS is my playground.</p>' +
    '<ul style="font-size:12px;color:var(--text2);margin-bottom:16px;padding-left:16px;list-style:disc;">' +
      '<li>Based in the world</li><li>Learning Rust and Go</li><li>Open source enthusiast</li>' +
    '</ul>' +
    '<h2 class="section-heading">Skills</h2>' +
    '<div style="display:flex;flex-wrap:wrap;gap:4px;">' +
      skills.map(s => '<span class="tag">' + s + '</span>').join('') +
    '</div>' +
  '</div>';
}

function renderProjects() {
  return '<div style="text-align:center;padding-top:60px;">' +
    '<div style="font-size:36px;font-weight:bold;color:var(--text2);margin-bottom:8px;">404</div>' +
    '<p style="font-size:12px;color:var(--text2);">No projects here yet.</p>' +
  '</div>';
}

function renderNotes() {
  return '<div class="notes-layout">' +
    '<div class="notes-sidebar" id="notes-sidebar"></div>' +
    '<div class="notes-content" id="notes-content"><p class="notes-placeholder">Pick a note</p></div>' +
  '</div>';
}

function setupNotes(el) {
  const sidebar = el.querySelector('#notes-sidebar');
  const content = el.querySelector('#notes-content');
  function renderList() {
    sidebar.innerHTML = '';
    state.notes.forEach(n => {
      const item = document.createElement('div');
      item.className = 'note-item' + (n.id === state.currentNoteId ? ' active' : '');
      item.innerHTML = '<div class="note-item-title">' + esc(n.title) + '</div><div class="note-item-date">' + esc(n.date) + '</div>';
      item.addEventListener('click', () => { state.currentNoteId = n.id; save(); renderList(); renderContent(n); });
      sidebar.appendChild(item);
    });
  }
  function renderContent(n) {
    content.innerHTML = '<h3 class="note-content-title">' + esc(n.title) + '</h3>' +
      '<p class="note-content-date">' + esc(n.date) + '</p>' +
      '<p class="note-content-body">' + esc(n.body) + '</p>';
  }
  const active = state.notes.find(n => n.id === state.currentNoteId);
  if (active) { renderList(); renderContent(active); }
  return () => {};
}

function renderTerminal() {
  return '<div style="display:flex;flex-direction:column;height:100%;">' +
    '<div id="terminal-output" class="terminal-output" style="flex:1;overflow-y:auto;margin-bottom:8px;max-height:240px;"></div>' +
    '<div class="terminal-input-line">' +
      '<span class="terminal-prompt">visitor@ZI-os:~$</span>' +
      '<input type="text" id="terminal-input" class="terminal-input" autocomplete="off" spellcheck="false">' +
    '</div>' +
  '</div>';
}

function setupTerminal(el, appId) {
  const output = el.querySelector('#terminal-output');
  const input = el.querySelector('#terminal-input');
  const winData = state.windows.get(appId);

  function print(text, color) {
    const line = document.createElement('div');
    if (color) line.style.color = color;
    line.textContent = text;
    output.appendChild(line);
    output.scrollTop = output.scrollHeight;
  }

  print('ZI OS Terminal v1.0.0');
  print('Type "help" for commands.\n');

  function execute(raw) {
    const cmd = raw.trim();
    if (!cmd) return;
    print('visitor@ZI-os:~$ ' + cmd);
    state.terminalHistory.push(cmd);
    state.terminalHistoryIdx = state.terminalHistory.length;
    const parts = cmd.split(' ');
    const c = parts[0].toLowerCase();
    const args = parts.slice(1);

    switch (c) {
      case 'help':
        print('Commands: help, echo, clear, date, whoami, ls, cat, calc, theme, exit');
        break;
      case 'echo': print(args.join(' ')); break;
      case 'clear': output.innerHTML = ''; break;
      case 'date': print(new Date().toString()); break;
      case 'whoami': print('visitor'); break;
      case 'ls': print('Desktop/  Documents/  Downloads/  notes.txt  readme.md'); break;
      case 'cat': {
        const f = args[0] || '';
        if (f === 'notes.txt') print('Welcome to my OS!');
        else if (f === 'readme.md') print('# web-os\nA portfolio styled like an OS.');
        else print('cat: ' + esc(f) + ': No such file');
        break;
      }
      case 'calc':
        try {
          const r = Function('"use strict"; return (' + args.join(' ') + ')')();
          print('= ' + r);
        } catch (e) { print('Error: ' + e.message); }
        break;
      case 'theme': {
        const t = args[0];
        if (t && themes[t]) { applyTheme(t); print('Theme: ' + themes[t]); }
        else print('Themes: ' + Object.keys(themes).join(', '));
        break;
      }
      case 'exit': wm.close('terminal'); break;
      default: print('Unknown command: ' + esc(c));
    }
  }

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') { execute(input.value); input.value = ''; }
    else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (state.terminalHistoryIdx > 0) {
        state.terminalHistoryIdx--;
        input.value = state.terminalHistory[state.terminalHistoryIdx] || '';
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (state.terminalHistoryIdx < state.terminalHistory.length - 1) {
        state.terminalHistoryIdx++;
        input.value = state.terminalHistory[state.terminalHistoryIdx] || '';
      } else {
        state.terminalHistoryIdx = state.terminalHistory.length;
        input.value = '';
      }
    }
  });

  const focusInterval = setInterval(() => {
    if (!state.windows.has('terminal')) { clearInterval(focusInterval); return; }
    if (document.activeElement !== input) input.focus();
  }, 500);
  return () => clearInterval(focusInterval);
}

function renderCalculator() {
  const btns = ['C','\u00B1','%','\u00F7','7','8','9','\u00D7','4','5','6','-','1','2','3','+','0','.','\u232B','='];
  return '<div class="calc-grid">' +
    '<div class="calc-display" id="calc-display">0</div>' +
    btns.map(b => {
      const cls = ['\u00F7','\u00D7','-','+','='].includes(b) ? ' operator' : (b === '=' ? ' equals' : '');
      return '<div class="calc-btn' + cls + '" data-calc="' + b + '">' + b + '</div>';
    }).join('') +
  '</div>';
}

function setupCalculator(el) {
  const display = el.querySelector('#calc-display');
  let cur = '0', prev = null, op = null, fresh = true;

  function update() { display.textContent = cur; }
  function calc() {
    if (prev === null || op === null) return;
    const a = parseFloat(prev), b = parseFloat(cur);
    let r;
    switch (op) {
      case '+': r = a + b; break;
      case '-': r = a - b; break;
      case '\u00D7': r = a * b; break;
      case '\u00F7': r = b === 0 ? 'Error' : a / b; break;
      default: return;
    }
    cur = String(parseFloat(r.toFixed(10)));
    prev = null; op = null; fresh = true;
    update();
  }

  el.querySelectorAll('.calc-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const v = btn.dataset.calc;
      if (v >= '0' && v <= '9') { cur = fresh ? v : cur + v; fresh = false; }
      else if (v === '.') { if (fresh) { cur = '0.'; fresh = false; } else if (!cur.includes('.')) cur += '.'; }
      else if (v === 'C') { cur = '0'; prev = null; op = null; fresh = true; }
      else if (v === '\u00B1') cur = String(-parseFloat(cur));
      else if (v === '%') cur = String(parseFloat(cur) / 100);
      else if (v === '\u232B') { cur = cur.length > 1 ? cur.slice(0, -1) : '0'; fresh = cur === '0'; }
      else if (v === '=') calc();
      else if (['+','-','\u00D7','\u00F7'].includes(v)) {
        if (prev !== null && op && !fresh) calc();
        prev = cur; op = v; fresh = true;
      }
      update();
    });
  });
  return () => {};
}

function renderSettings() {
  const themesHtml = Object.entries(themes).map(([k, name]) =>
    '<div class="theme-option' + (state.theme === k ? ' active' : '') + '" data-theme="' + k + '">' +
      '<div class="theme-preview">' +
        '<div style="background:' + themeColors[k][0] + '"></div>' +
        '<div style="background:' + themeColors[k][1] + '"></div>' +
      '</div>' +
      '<div class="theme-name">' + name + '</div>' +
    '</div>'
  ).join('');

  const wallsHtml = wallpapers.map((url, i) =>
    '<div class="wallpaper-option' + (state.wallpaper === url ? ' active' : '') + '" data-wallpaper="' + i + '" style="background-image:url(\'' + url + '\')"></div>'
  ).join('');

  return '<div>' +
    '<div class="settings-section"><div class="settings-label">Theme</div><div class="theme-grid">' + themesHtml + '</div></div>' +
    '<div class="settings-section"><div class="settings-label">Wallpaper</div><div class="wallpaper-grid">' + wallsHtml + '</div></div>' +
    '<div class="settings-section"><div class="settings-label">About</div>' +
      '<div style="font-size:11px;color:var(--text2);">ZI OS v1.0.0<br>Vanilla JS. No build step.</div>' +
    '</div>' +
  '</div>';
}

function setupSettings(el) {
  el.querySelectorAll('.theme-option').forEach(opt => {
    opt.addEventListener('click', () => {
      applyTheme(opt.dataset.theme);
      el.querySelectorAll('.theme-option').forEach(o => o.classList.remove('active'));
      opt.classList.add('active');
      notify('Theme changed', themes[opt.dataset.theme]);
    });
  });
  el.querySelectorAll('.wallpaper-option').forEach(opt => {
    opt.addEventListener('click', () => {
      setWallpaper(wallpapers[parseInt(opt.dataset.wallpaper)]);
      el.querySelectorAll('.wallpaper-option').forEach(o => o.classList.remove('active'));
      opt.classList.add('active');
      notify('Wallpaper updated', '');
    });
  });
  return () => {};
}

function renderBrowser() {
  return '<div style="display:flex;flex-direction:column;height:100%;">' +
    '<div class="browser-bar">' +
      '<input type="text" id="browser-url" class="input" style="flex:1;" placeholder="Enter URL or search" value="https://en.wikipedia.org/wiki/Special:Random">' +
      '<button id="browser-go" class="btn btn-primary">Go</button>' +
    '</div>' +
    '<div style="flex:1;background:#000;overflow:hidden;border:1px solid var(--border);min-height:200px;">' +
      '<iframe id="browser-frame" src="https://en.wikipedia.org/wiki/Special:Random" style="width:100%;height:100%;border:0;" sandbox="allow-scripts allow-same-origin"></iframe>' +
    '</div>' +
    '<p style="font-size:10px;color:var(--text2);margin-top:4px;">Some sites block iframe embedding.</p>' +
  '</div>';
}

function setupBrowser(el) {
  const urlInput = el.querySelector('#browser-url');
  const frame = el.querySelector('#browser-frame');
  function navigate() {
    const val = urlInput.value.trim();
    if (!val) return;
    if (/^https?:\/\//i.test(val)) {
      frame.src = val;
    } else {
      frame.src = 'https://www.google.com/search?q=' + encodeURIComponent(val);
    }
  }
  el.querySelector('#browser-go').addEventListener('click', navigate);
  urlInput.addEventListener('keydown', (e) => { if (e.key === 'Enter') navigate(); });
  return () => {};
}

function renderMusic() {
  return '<div>' +
    '<div style="display:flex;gap:4px;margin-bottom:8px;">' +
      '<input type="text" id="music-search" class="input" style="flex:1;" placeholder="Search for a song...">' +
      '<button id="music-search-btn" class="btn btn-primary">Search</button>' +
    '</div>' +
    '<div id="music-search-status" style="font-size:11px;color:var(--text2);margin-bottom:8px;">Search for a song to begin.</div>' +
    '<div style="display:flex;align-items:center;gap:8px;margin-bottom:8px;padding:8px;background:var(--surface2);border:1px solid var(--border);">' +
      '<span id="music-playing-icon">' + icon('music') + '</span>' +
      '<div style="flex:1;min-width:0;">' +
        '<div style="font-size:12px;font-weight:bold;" id="music-now-playing">Nothing playing</div>' +
        '<div style="font-size:10px;color:var(--text2);" id="music-status">Paused</div>' +
      '</div>' +
      '<button id="music-play-btn" class="btn btn-primary" disabled>Play</button>' +
    '</div>' +
    '<div id="music-results" style="font-size:11px;color:var(--text2);">Results will appear here.</div>' +
    '<audio id="music-audio" preload="none"></audio>' +
  '</div>';
}

function setupMusic(el, appId) {
  const searchInput = el.querySelector('#music-search');
  const searchBtn = el.querySelector('#music-search-btn');
  const resultsEl = el.querySelector('#music-results');
  const searchStatus = el.querySelector('#music-search-status');
  const playBtn = el.querySelector('#music-play-btn');
  const nowPlaying = el.querySelector('#music-now-playing');
  const statusEl = el.querySelector('#music-status');
  const audio = el.querySelector('#music-audio');
  let currentIdx = null;
  state.musicAudio = audio;

  async function searchMusic() {
    const q = searchInput.value.trim();
    if (!q) { searchStatus.textContent = 'Enter a song name.'; return; }
    searchStatus.textContent = 'Searching...';
    searchBtn.disabled = true;
    try {
      const res = await fetch('https://itunes.apple.com/search?term=' + encodeURIComponent(q) + '&entity=song&limit=20&country=US');
      const data = await res.json();
      if (!data.results || data.results.length === 0) {
        resultsEl.innerHTML = '<span style="font-size:11px;color:var(--text2);">No results.</span>';
        searchStatus.textContent = 'No results.';
        return;
      }
      state.musicResults = data.results;
      resultsEl.innerHTML = data.results.map((t, i) => {
        const img = (t.artworkUrl100 || '').replace('100x100', '300x300');
        return '<div class="music-track" data-track="' + i + '" style="padding:6px;background:var(--surface2);border:1px solid var(--border);margin-bottom:4px;cursor:pointer;display:flex;align-items:center;gap:8px;">' +
          (img ? '<img src="' + esc(img) + '" style="width:40px;height:40px;" loading="lazy" onerror="this.style.display=\'none\'">' : '') +
          '<div style="flex:1;min-width:0;"><div style="font-size:11px;font-weight:bold;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">' + esc(t.trackName || 'Unknown') + '</div>' +
          '<div style="font-size:10px;color:var(--text2);">' + esc(t.artistName || 'Unknown') + '</div></div>' +
          '<span style="font-size:14px;">&#9654;</span></div>';
      }).join('');
      searchStatus.textContent = data.results.length + ' result(s).';
      el.querySelectorAll('.music-track').forEach(te => {
        te.addEventListener('click', () => playTrack(Number(te.dataset.track)));
      });
    } catch (e) {
      searchStatus.textContent = 'Music API unavailable.';
      resultsEl.innerHTML = '<span style="font-size:11px;color:var(--text2);">Could not connect.</span>';
    } finally { searchBtn.disabled = false; }
  }

  async function playTrack(index) {
    const track = state.musicResults[index];
    if (!track || !track.previewUrl) return;
    currentIdx = index;
    nowPlaying.textContent = track.trackName || 'Unknown';
    statusEl.textContent = 'Loading...';
    playBtn.disabled = true;
    try {
      audio.src = track.previewUrl;
      await audio.play();
      state.musicPlaying = true;
      statusEl.textContent = 'Playing';
      playBtn.textContent = 'Pause';
      playBtn.disabled = false;
      el.querySelectorAll('.music-track').forEach(te => te.style.background = '');
      const sel = el.querySelector('[data-track="' + index + '"]');
      if (sel) sel.style.background = 'var(--accent)';
    } catch (e) {
      statusEl.textContent = 'Cannot play this track';
      playBtn.disabled = false;
    }
  }

  searchBtn.addEventListener('click', searchMusic);
  searchInput.addEventListener('keydown', (e) => { if (e.key === 'Enter') searchMusic(); });
  playBtn.addEventListener('click', async () => {
    if (!audio.src && currentIdx !== null) { await playTrack(currentIdx); return; }
    if (audio.paused) { await audio.play(); statusEl.textContent = 'Playing'; playBtn.textContent = 'Pause'; }
    else { audio.pause(); statusEl.textContent = 'Paused'; playBtn.textContent = 'Play'; }
  });
  audio.addEventListener('ended', () => { statusEl.textContent = 'Ended'; playBtn.textContent = 'Play'; });
  return () => { audio.pause(); audio.src = ''; state.musicAudio = null; };
}

function renderWeather() {
  const days = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
  const today = new Date().getDay();
  const temps = [24,22,19,23,25,27,21];
  return '<div>' +
    '<div class="weather-card">' +
      '<div style="font-size:36px;margin-bottom:4px;">&#9728;</div>' +
      '<div class="weather-temp">24&deg;C</div>' +
      '<div style="font-size:12px;color:var(--text2);">Sunny</div>' +
      '<div style="font-size:11px;color:var(--text2);margin-top:4px;">Feels like 26&deg;C</div>' +
    '</div>' +
    '<div style="display:grid;grid-template-columns:repeat(7,1fr);gap:2px;text-align:center;font-size:11px;">' +
      days.map((d, i) =>
        '<div style="padding:4px;border:1px solid var(--border);' + (i === (today || 7) - 1 ? 'border-color:var(--accent);' : '') + '">' +
          '<div style="color:var(--text2);">' + d + '</div>' +
          '<div style="margin:4px 0;">' + (i === (today || 7) - 1 ? '&#9728;' : '&#9729;') + '</div>' +
          '<div>' + temps[i] + '&deg;</div>' +
        '</div>'
      ).join('') +
    '</div>' +
    '<div style="font-size:10px;color:var(--text2);margin-top:8px;">Humidity: 45% | Wind: 12 km/h</div>' +
  '</div>';
}

function renderCalendar() {
  return '<div>' +
    '<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px;">' +
      '<button id="cal-prev" class="btn">&lt;</button>' +
      '<span id="cal-month-year" style="font-weight:bold;font-size:13px;"></span>' +
      '<button id="cal-next" class="btn">&gt;</button>' +
    '</div>' +
    '<div class="calendar-grid" id="cal-grid"></div>' +
  '</div>';
}

function setupCalendar(el) {
  const grid = el.querySelector('#cal-grid');
  const monthYear = el.querySelector('#cal-month-year');
  const date = state.calendarDate;

  function render() {
    const year = date.getFullYear(), month = date.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    monthYear.textContent = date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    let html = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].map(d => '<div class="calendar-header">' + d + '</div>').join('');
    const prevLast = new Date(year, month, 0).getDate();
    for (let i = firstDay - 1; i >= 0; i--) html += '<div class="calendar-day other-month">' + (prevLast - i) + '</div>';
    const today = new Date();
    for (let d = 1; d <= daysInMonth; d++) {
      const isToday = d === today.getDate() && month === today.getMonth() && year === today.getFullYear();
      html += '<div class="calendar-day' + (isToday ? ' today' : '') + '">' + d + '</div>';
    }
    for (let d = 1; d <= 42 - (firstDay + daysInMonth); d++) html += '<div class="calendar-day other-month">' + d + '</div>';
    grid.innerHTML = html;
  }

  el.querySelector('#cal-prev').addEventListener('click', () => { date.setMonth(date.getMonth() - 1); render(); });
  el.querySelector('#cal-next').addEventListener('click', () => { date.setMonth(date.getMonth() + 1); render(); });
  render();
  return () => {};
}

function renderTasks() {
  return '<div>' +
    '<div style="display:flex;gap:4px;margin-bottom:12px;">' +
      '<input type="text" id="task-input" class="input" style="flex:1;" placeholder="Add a new task...">' +
      '<button id="task-add" class="btn btn-primary">Add</button>' +
    '</div>' +
    '<div id="task-list"></div>' +
  '</div>';
}

function setupTasks(el) {
  const list = el.querySelector('#task-list');
  const input = el.querySelector('#task-input');

  function render() {
    list.innerHTML = state.tasks.map(t =>
      '<div class="task-item">' +
        '<div class="task-checkbox' + (t.done ? ' checked' : '') + '" data-id="' + t.id + '"></div>' +
        '<div class="task-text' + (t.done ? ' done' : '') + '">' + esc(t.text) + '</div>' +
        '<button class="task-delete" data-id="' + t.id + '">&times;</button>' +
      '</div>'
    ).join('');
    list.querySelectorAll('.task-checkbox').forEach(cb => {
      cb.addEventListener('click', () => {
        const task = state.tasks.find(t => t.id === parseInt(cb.dataset.id));
        if (task) { task.done = !task.done; save(); render(); }
      });
    });
    list.querySelectorAll('.task-delete').forEach(btn => {
      btn.addEventListener('click', () => {
        state.tasks = state.tasks.filter(t => t.id !== parseInt(btn.dataset.id));
        save(); render();
      });
    });
  }

  function add() {
    const text = input.value.trim();
    if (!text) return;
    const id = state.tasks.length > 0 ? Math.max(...state.tasks.map(t => t.id)) + 1 : 1;
    state.tasks.push({ id, text, done: false });
    input.value = '';
    save(); render();
  }

  el.querySelector('#task-add').addEventListener('click', add);
  input.addEventListener('keydown', (e) => { if (e.key === 'Enter') add(); });
  render();
  return () => {};
}

// Desktop icons
function renderDesktopIcons() {
  const c = $('desktop-icons');
  c.innerHTML = '';
  const desktopApps = ['welcome','about','projects','notes','terminal','calculator','settings','browser','music','weather','calendar','tasks'];
  desktopApps.forEach(appId => {
    const app = APPS[appId];
    if (!app) return;
    const el = document.createElement('div');
    el.className = 'icon';
    el.dataset.app = appId;
    el.innerHTML = '<i class="icon-' + app.icon + '"></i><span class="icon-label">' + esc(app.title) + '</span>';
    el.addEventListener('click', () => wm.open(appId));
    c.appendChild(el);
  });
}

// Event listeners
function setupEvents() {
  $('start-btn').addEventListener('click', toggleStartMenu);

  document.addEventListener('click', (e) => {
    if ($('start-menu').classList.contains('open') && !$('start-menu').contains(e.target) && e.target !== $('start-btn')) {
      $('start-menu').classList.remove('open');
    }
  });

  document.addEventListener('contextmenu', (e) => {
    if (e.target.closest('.window') || e.target.closest('#taskbar') || e.target.closest('#start-menu') || e.target.closest('.icon')) return;
    e.preventDefault();
    showCtx(e.clientX, e.clientY);
  });

  document.addEventListener('click', (e) => {
    if (!e.target.closest('#context-menu')) hideCtx();
  });

  $('context-menu').addEventListener('click', (e) => {
    const item = e.target.closest('.ctx-item');
    if (!item) return;
    const action = item.dataset.action;
    if (action === 'refresh') location.reload();
    if (action === 'terminal') wm.open('terminal');
    if (action === 'settings') wm.open('settings');
    if (action === 'about') wm.open('about');
    hideCtx();
  });

  document.addEventListener('click', (e) => {
    const btn = e.target.closest('.control-btn');
    if (!btn) return;
    const action = btn.dataset.action;
    const appId = btn.dataset.app;
    if (!action || !appId) return;
    if (action === 'close') wm.close(appId);
    if (action === 'minimize') wm.minimize(appId);
    if (action === 'maximize') wm.toggleMax(appId);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      $('start-menu').classList.remove('open');
      hideCtx();
    }
  });

  $('settings-shortcut').addEventListener('click', () => {
    wm.open('settings');
    $('start-menu').classList.remove('open');
  });

  $('power-shortcut').addEventListener('click', () => {
    if (confirm('Shut down ZI OS?')) {
      document.body.innerHTML = '<div style="display:flex;align-items:center;justify-content:center;height:100vh;background:#000;color:#888;font-family:monospace;flex-direction:column;gap:12px;">' +
        '<div style="font-size:42px;">&#9211;</div>' +
        '<div>ZI OS has been shut down.</div>' +
        '<div style="font-size:11px;color:#555;">Close the tab to exit.</div>' +
      '</div>';
    }
  });
}

// Init
document.addEventListener('DOMContentLoaded', () => {
  wm.init();
  renderDesktopIcons();
  renderStartMenu();
  setupEvents();
  boot();
});
