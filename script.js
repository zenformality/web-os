var themes = {
  midnight: 'Midnight', light: 'Light', ocean: 'Ocean', matrix: 'Matrix'
};

var wallpapers = [
  'wallpapers/4k-black-hole-with-bright-horizon-kug5rf2bs46mxcur.webp',
  'https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?w=1920&q=80',
  'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=1920&q=80',
  'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=1920&q=80',
  'https://images.unsplash.com/photo-1502134249126-9f3755a50d78?w=1920&q=80',
];

var themeColors = {
  midnight: ['#1a1a1a', '#7c6dfa'],
  light: ['#e8e8e8', '#6366f1'],
  ocean: ['#122040', '#3b9eff'],
  matrix: ['#001a00', '#00ff00'],
};

var iconBase = 'https://unpkg.com/lucide-static@latest/icons/';
var icons = {
  welcome: iconBase + 'zap.svg',
  about: iconBase + 'user.svg',
  projects: iconBase + 'rocket.svg',
  notes: iconBase + 'file-text.svg',
  terminal: iconBase + 'terminal.svg',
  calculator: iconBase + 'calculator.svg',
  settings: iconBase + 'settings.svg',
  browser: iconBase + 'globe.svg',
  music: iconBase + 'music.svg',
  weather: iconBase + 'cloud.svg',
  calendar: iconBase + 'calendar.svg',
  tasks: iconBase + 'clipboard-check.svg',
  clock: iconBase + 'clock.svg',
  editor: iconBase + 'file-code.svg',
  files: iconBase + 'folder.svg'
};

function icon(src) {
  var url = src.startsWith('http') ? src : iconBase + src + '.svg';
  return '<img src="' + url + '" class="app-icon" draggable="false">';
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
  clock:     { id: 'clock',     title: 'Clock',     icon: icons.clock,     w: 340, h: 380, render: renderClock,     setup: setupClock },
  editor:    { id: 'editor',    title: 'Editor',    icon: icons.editor,    w: 500, h: 420, render: renderEditor,    setup: setupEditor },
  files:     { id: 'files',     title: 'Files',     icon: icons.files,     w: 480, h: 380, render: renderFiles,     setup: setupFiles },
};

var state = {
  windows: new Map(),
  topZ: 100,
  theme: localStorage.getItem('web-os-theme') || 'midnight',
  wallpaper: localStorage.getItem('web-os-wallpaper') || wallpapers[0],
  notes: (function() { try { return JSON.parse(localStorage.getItem('web-os-notes')) } catch(e) { return null } })() || [{"id":1,"title":"Pinned Notes","body":"Welcome! Click any note on the left.","date":"2026-08-17"},{"id":2,"title":"Projects","body":"Working on web-os","date":"2026-08-16"},{"id":3,"title":"Reading","body":"Opposite of Always by Justin A. Reynolds","date":"2026-08-15"},{"id":4,"title":"Ideas","body":"Add terminal, music player, and games.","date":"2026-08-14"}],
  currentNoteId: 1,
  terminalHistory: [],
  terminalHistoryIdx: -1,
  tasks: (function() { try { return JSON.parse(localStorage.getItem('web-os-tasks')) } catch(e) { return null } })() || [{"id":1,"text":"Build web OS","done":true},{"id":2,"text":"Add more themes","done":true},{"id":3,"text":"Add terminal app","done":false},{"id":4,"text":"Write documentation","done":false}],
  currentTrack: null,
  calendarDate: new Date(),
  selectedDay: null,
  editorFiles: (function() { try { return JSON.parse(localStorage.getItem('web-os-editor-files')) } catch(e) { return null } })() || [{"id":1,"name":"welcome.txt","body":"Hello! This is a simple text editor.","date":"2026-08-20"},{"id":2,"name":"notes.txt","body":"Some random notes go here.","date":"2026-08-19"},{"id":3,"name":"todo.txt","body":"- finish web os\n- add more apps\n- sleep","date":"2026-08-18"}],
  editorCurrentId: 1,
  fs: (function() { try { return JSON.parse(localStorage.getItem('web-os-fs')) } catch(e) { return null } })() || {"name":"/","type":"folder","children":[{"name":"Documents","type":"folder","children":[{"name":"readme.txt","type":"file","body":"welcome to ZI OS"},{"name":"todo.txt","type":"file","body":"do stuff"}]},{"name":"Downloads","type":"folder","children":[]},{"name":"Pictures","type":"folder","children":[{"name":"notes.txt","type":"file","body":"remember this"}]}]},
  fsPath: [],
};

function $(id) { return document.getElementById(id); }

function esc(t) {
  let d = document.createElement('div');
  d.textContent = t;
  return d.innerHTML;
}

function save() {
  localStorage.setItem('web-os-theme', state.theme);
  localStorage.setItem('web-os-wallpaper', state.wallpaper);
  localStorage.setItem('web-os-notes', JSON.stringify(state.notes));
  localStorage.setItem('web-os-tasks', JSON.stringify(state.tasks));
  localStorage.setItem('web-os-editor-files', JSON.stringify(state.editorFiles));
  localStorage.setItem('web-os-fs', JSON.stringify(state.fs));
}

function notify(title, body) {
  var area = $('notification-area');
  var n = document.createElement('div');
  n.className = 'notification';
  n.innerHTML = '<div class="notification-title">' + esc(title) + '</div><div class="notification-body">' + esc(body) + '</div>';
  area.appendChild(n);
  setTimeout(function() { n.classList.add('removing'); setTimeout(function() { n.remove() }, 300) }, 3000);
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

document.addEventListener('mousemove', function(e) {
  if (dragState) {
    dragState.el.style.left = (dragState.startLeft + e.clientX - dragState.startX) + 'px';
    dragState.el.style.top = (dragState.startTop + e.clientY - dragState.startY) + 'px';
  }
  if (resizeState) {
    resizeState.el.style.width = Math.max(280, resizeState.startW + e.clientX - resizeState.startX) + 'px';
    resizeState.el.style.height = Math.max(200, resizeState.startH + e.clientY - resizeState.startY) + 'px';
  }
});

document.addEventListener('mouseup', function() { dragState = null; resizeState = null });

var wm = {
  container: null,
  taskbarApps: null,
  zCounter: 100,
  activeWindow: null,

  init() {
    this.container = $('windows-container');
    this.taskbarApps = $('taskbar-apps');
  },

  open(appId) {
    var app = APPS[appId];
    if (!app) return;
    var existing = state.windows.get(appId);
    if (existing) {
      if (existing.el.classList.contains('minimized')) this.restore(appId);
      this.focus(appId);
      return;
    }
    var el = document.createElement('div');
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
    var winData = { id: appId, el: el, maximized: false, prevRect: null, cleanup: null };
    state.windows.set(appId, winData);
    this.drag(el, appId);
    this.resize(el, appId);
    this.focus(appId);
    this.updateTaskbar();
    if (app.setup) winData.cleanup = app.setup(el, appId);
    el.addEventListener('mousedown', function() { wm.focus(appId) });
  },

  close(appId) {
    var d = state.windows.get(appId);
    if (!d) return;
    if (d.cleanup) d.cleanup();
    d.el.remove();
    state.windows.delete(appId);
    if (this.activeWindow === appId) this.activeWindow = null;
    this.updateTaskbar();
  },

  minimize(appId) {
    var d = state.windows.get(appId);
    if (!d) return;
    d.el.classList.add('minimized');
    d.el.classList.remove('focused');
    if (this.activeWindow === appId) this.activeWindow = null;
    this.updateTaskbar();
  },

  restore(appId) {
    var d = state.windows.get(appId);
    if (!d) return;
    d.el.classList.remove('minimized');
    this.focus(appId);
    this.updateTaskbar();
  },

  toggleMax(appId) {
    var d = state.windows.get(appId);
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
    var d = state.windows.get(appId);
    if (!d) return;
    if (this.activeWindow && this.activeWindow !== appId) {
      var prev = state.windows.get(this.activeWindow);
      if (prev) prev.el.classList.remove('focused');
    }
    d.el.classList.add('focused');
    d.el.style.zIndex = ++this.zCounter;
    this.activeWindow = appId;
    this.updateTaskbar();
  },

  updateTaskbar() {
    this.taskbarApps.innerHTML = '';
    var self = this;
    state.windows.forEach(function(d, appId) {
      var app = APPS[appId];
      if (!app) return;
      var item = document.createElement('div');
      item.className = 'taskbar-item' + (appId === self.activeWindow && !d.el.classList.contains('minimized') ? ' active' : '');
      item.innerHTML = icon(app.icon) + ' ' + esc(app.title);
      item.addEventListener('click', function() {
        if (d.el.classList.contains('minimized')) self.restore(appId);
        else if (self.activeWindow === appId) self.minimize(appId);
        else self.focus(appId);
      });
      self.taskbarApps.appendChild(item);
    });
  },

  drag(el, appId) {
    var header = el.querySelector('.window-header');
    header.addEventListener('mousedown', function(e) {
      if (e.target.closest('.control-btn')) return;
      var d = state.windows.get(appId);
      if (d && d.maximized) return;
      dragState = { el: el, startX: e.clientX, startY: e.clientY, startLeft: el.offsetLeft, startTop: el.offsetTop };
      wm.focus(appId);
      e.preventDefault();
    });
  },

  resize(el, appId) {
    var handle = el.querySelector('.window-resize-handle');
    handle.addEventListener('mousedown', function(e) {
      var d = state.windows.get(appId);
      if (d && d.maximized) return;
      resizeState = { el: el, startX: e.clientX, startY: e.clientY, startW: el.offsetWidth, startH: el.offsetHeight };
      wm.focus(appId);
      e.preventDefault();
      e.stopPropagation();
    });
  }
};

function updateClock() {
  var now = new Date();
  var time = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  var date = now.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
  document.getElementById('clock').textContent = date + ' ' + time;
}
setInterval(updateClock, 1000);

function boot() {
  applyTheme(state.theme);
  if (state.wallpaper) setWallpaper(state.wallpaper);
  var msgs = ['breathing in...', 'exhaling...', 'loading thoughts...', 'finding stillness...', 'ZI is ready'];
  var i = 0;
  var interval = setInterval(function() {
    if (i < msgs.length) { $('boot-text').textContent = msgs[i]; i++; }
    else {
      clearInterval(interval);
      setTimeout(function() {
        $('boot-screen').classList.add('fade-out');
        setTimeout(function() { $('boot-screen').remove() }, 800);
        notify('Welcome back!', 'Click desktop icons or use Start.');
      }, 300);
    }
  }, 350);
}

function toggleStartMenu() {
  var m = $('start-menu');
  m.classList.toggle('open');
  if (m.classList.contains('open')) {
    $('start-menu-search').value = '';
    filterStartMenu('');
    $('start-menu-search').focus();
  }
}

function filterStartMenu(query) {
  var c = $('start-menu-apps');
  c.innerHTML = '';
  var q = query.toLowerCase().trim();
  Object.values(APPS).forEach(function(app) {
    if (q && app.title.toLowerCase().indexOf(q) === -1) return;
    var item = document.createElement('div');
    item.className = 'start-app-item';
    item.innerHTML = icon(app.icon) + '<div class="start-app-name">' + esc(app.title) + '</div>';
    item.addEventListener('click', function() { wm.open(app.id); $('start-menu').classList.remove('open') });
    c.appendChild(item);
  });
}

function renderStartMenu() {
  filterStartMenu('');
  $('start-menu-search').addEventListener('input', function(e) {
    filterStartMenu(e.target.value);
  });
}

function showCtx(x, y) {
  var m = $('context-menu');
  m.style.left = Math.min(x, window.innerWidth - 170) + 'px';
  m.style.top = Math.min(y, window.innerHeight - 120) + 'px';
  m.classList.add('open');
}
function hideCtx() { $('context-menu').classList.remove('open') }

function renderWelcome() {
  return '<div style="text-align:center;">' +
    '<div style="font-size:48px;font-weight:bold;color:var(--accent);margin-bottom:8px;">ZI</div>' +
    '<p style="font-size:12px;color:var(--text2);margin-bottom:4px;">ZI OS v1.0</p>' +
    '<p style="font-size:11px;color:var(--text2);margin-bottom:16px;">A web operating system built with vanilla JS.</p>' +
    '<div style="display:flex;gap:6px;justify-content:center;">' +
      '<button class="btn btn-primary" onclick="wm.open(\'projects\')">Projects</button>' +
      '<button class="btn" onclick="wm.open(\'about\')">About</button>' +
    '</div>' +
  '</div>';
}

function renderAbout() {
  var skills = ['HTML','CSS','JavaScript','Rust','Python','Svelte','TypeScript','Go','Node.js'];
  return '<div>' +
    '<h2 class="section-heading">About Me</h2>' +
    '<p style="font-size:12px;color:var(--text2);margin-bottom:12px;">I\'m a developer who likes building things that feel alive. This web OS is my playground.</p>' +
    '<ul style="font-size:12px;color:var(--text2);margin-bottom:16px;padding-left:16px;list-style:disc;">' +
      '<li>Based in the world</li><li>Learning Rust and Go</li><li>Open source enthusiast</li>' +
    '</ul>' +
    '<h2 class="section-heading">Skills</h2>' +
    '<div style="display:flex;flex-wrap:wrap;gap:4px;">' +
      skills.map(function(s) { return '<span class="tag">' + s + '</span>' }).join('') +
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
  var sidebar = el.querySelector('#notes-sidebar');
  var content = el.querySelector('#notes-content');
  function renderList() {
    sidebar.innerHTML = '';
    state.notes.forEach(function(n) {
      var item = document.createElement('div');
      item.className = 'note-item' + (n.id === state.currentNoteId ? ' active' : '');
      item.innerHTML = '<div class="note-item-title">' + esc(n.title) + '</div><div class="note-item-date">' + esc(n.date) + '</div>';
      item.addEventListener('click', function() { state.currentNoteId = n.id; save(); renderList(); renderContent(n) });
      sidebar.appendChild(item);
    });
  }
  function renderContent(n) {
    content.innerHTML = '<h3 class="note-content-title">' + esc(n.title) + '</h3>' +
      '<p class="note-content-date">' + esc(n.date) + '</p>' +
      '<p class="note-content-body">' + esc(n.body) + '</p>';
  }
  var active = state.notes.find(function(n) { return n.id === state.currentNoteId });
  if (active) { renderList(); renderContent(active) }
  return function() {};
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
  var output = el.querySelector('#terminal-output');
  var input = el.querySelector('#terminal-input');

  function print(text, color) {
    var line = document.createElement('div');
    if (color) line.style.color = color;
    line.textContent = text;
    output.appendChild(line);
    output.scrollTop = output.scrollHeight;
  }

  print('ZI OS Terminal v1.0.0');
  print('Type "help" for commands.\n');

  var cmds = {
    help: function() { print('Commands: help, echo, clear, date, whoami, ls, cat, calc, theme, exit') },
    echo: function(a) { print(a.join(' ')) },
    clear: function() { output.innerHTML = '' },
    date: function() { print(new Date().toString()) },
    whoami: function() { print('visitor') },
    ls: function() { print('Desktop/  Documents/  Downloads/  notes.txt  readme.md') },
    cat: function(a) {
      var f = a[0] || '';
      if (f === 'notes.txt') print('Welcome to my OS!');
      else if (f === 'readme.md') print('# web-os\nA portfolio styled like an OS.');
      else print('cat: ' + esc(f) + ': No such file');
    },
    calc: function(a) {
      var expr = a.join(' ');
      if (!expr || /[+\-*/]$/.test(expr) || expr.split('(').length !== expr.split(')').length) {
        print('Invalid expression'); return;
      }
      try {
        var r = Function('"use strict"; return (' + expr + ')')();
        print('= ' + r);
      } catch (e) { print('Error: ' + e.message) }
    },
    theme: function(a) {
      var t = a[0];
      if (t && themes[t]) { applyTheme(t); print('Theme: ' + themes[t]) }
      else print('Themes: ' + Object.keys(themes).join(', '));
    },
    exit: function() { wm.close('terminal') }
  };

  function execute(raw) {
    var cmd = raw.trim();
    if (!cmd) return;
    print('visitor@ZI-os:~$ ' + cmd);
    state.terminalHistory.push(cmd);
    state.terminalHistoryIdx = state.terminalHistory.length;
    var parts = cmd.split(' ');
    var c = parts[0].toLowerCase();
    var args = parts.slice(1);
    if (cmds[c]) cmds[c](args);
    else print('Unknown command: ' + esc(c));
  }

  input.addEventListener('keydown', function(e) {
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

  var focusInterval = setInterval(function() {
    if (!state.windows.has('terminal')) { clearInterval(focusInterval); return }
    if (document.activeElement !== input) input.focus();
  }, 500);
  return function() { clearInterval(focusInterval) };
}

function renderCalculator() {
  var btns = ['C','\u00B1','%','\u00F7','7','8','9','\u00D7','4','5','6','-','1','2','3','+','0','.','\u232B','='];
  return '<div class="calc-grid">' +
    '<div class="calc-display" id="calc-display">0</div>' +
    btns.map(function(b) {
      var cls = b === '=' ? ' equals' : ['\u00F7','\u00D7','-','+'].includes(b) ? ' operator' : '';
      return '<div class="calc-btn' + cls + '" data-calc="' + b + '">' + b + '</div>';
    }).join('') +
  '</div>';
}

function setupCalculator(el) {
  var display = el.querySelector('#calc-display');
  var cur = '0', prev = null, op = null, fresh = true;
  var lastOp = null, lastOperand = null;

  function update() { display.textContent = cur; }

  function calc() {
    if (prev === null || op === null) return;
    var a = parseFloat(prev), b = parseFloat(cur);
    var r;
    switch (op) {
      case '+': r = a + b; break;
      case '-': r = a - b; break;
      case '\u00D7': r = a * b; break;
      case '\u00F7': r = b === 0 ? 'Error' : a / b; break;
      default: return;
    }
    if (typeof r === 'number') cur = String(parseFloat(r.toFixed(10)));
    else cur = String(r);
    lastOp = op; lastOperand = cur;
    prev = null; op = null; fresh = true;
    update();
  }

  function pressButton(v) {
    if (v >= '0' && v <= '9') { cur = fresh ? v : cur + v; fresh = false; }
    else if (v === '.') { if (fresh) { cur = '0.'; fresh = false } else if (!cur.includes('.')) cur += '.'; }
    else if (v === 'C') { cur = '0'; prev = null; op = null; fresh = true; lastOp = null; lastOperand = null; }
    else if (v === '\u00B1') { cur = String(-parseFloat(cur)); fresh = false; }
    else if (v === '%') { cur = String(parseFloat(cur) / 100); fresh = false; }
    else if (v === '\u232B') { cur = cur.length > 1 ? cur.slice(0, -1) : '0'; fresh = cur === '0'; }
    else if (v === '=') {
      if (prev !== null && op) calc();
      else if (lastOp && lastOperand !== null) {
        prev = cur; op = lastOp; cur = lastOperand;
        calc();
      }
    }
    else if (['+','-','\u00D7','\u00F7'].includes(v)) {
      if (prev !== null && op && !fresh) calc();
      prev = cur; op = v; fresh = true;
    }
    update();
  }

  el.querySelectorAll('.calc-btn').forEach(function(btn) {
    btn.addEventListener('click', function() { pressButton(btn.dataset.calc) });
  });

  el.setAttribute('tabindex', '0');
  el.style.outline = 'none';
  el.addEventListener('keydown', function(e) {
    var k = e.key;
    if (k >= '0' && k <= '9') pressButton(k);
    else if (k === '.') pressButton('.');
    else if (k === '+') pressButton('+');
    else if (k === '-') pressButton('-');
    else if (k === '*') pressButton('\u00D7');
    else if (k === '/') { e.preventDefault(); pressButton('\u00F7') }
    else if (k === 'Enter' || k === '=') pressButton('=');
    else if (k === 'Escape' || k.toLowerCase() === 'c') pressButton('C');
    else if (k === 'Backspace') pressButton('\u232B');
    else if (k === '%') pressButton('%');
  });
  el.focus();

  return function() {};
}

function renderSettings() {
  var themesHtml = Object.entries(themes).map(function([k, name]) {
    return '<div class="theme-option' + (state.theme === k ? ' active' : '') + '" data-theme="' + k + '">' +
      '<div class="theme-preview">' +
        '<div style="background:' + themeColors[k][0] + '"></div>' +
        '<div style="background:' + themeColors[k][1] + '"></div>' +
      '</div>' +
      '<div class="theme-name">' + name + '</div>' +
    '</div>';
  }).join('');

  var wallsHtml = wallpapers.map(function(url, i) {
    return '<div class="wallpaper-option' + (state.wallpaper === url ? ' active' : '') + '" data-wallpaper="' + i + '" style="background-image:url(\'' + url + '\')"></div>';
  }).join('');

  return '<div>' +
    '<div class="settings-section"><div class="settings-label">Theme</div><div class="theme-grid">' + themesHtml + '</div></div>' +
    '<div class="settings-section"><div class="settings-label">Wallpaper</div><div class="wallpaper-grid">' + wallsHtml + '</div></div>' +
    '<div class="settings-section"><div class="settings-label">About</div>' +
      '<div style="font-size:11px;color:var(--text2);">ZI OS v1.0.0<br>Vanilla JS. No build step.</div>' +
    '</div>' +
  '</div>';
}

function setupSettings(el) {
  el.querySelectorAll('.theme-option').forEach(function(opt) {
    opt.addEventListener('click', function() {
      applyTheme(opt.dataset.theme);
      el.querySelectorAll('.theme-option').forEach(function(o) { o.classList.remove('active') });
      opt.classList.add('active');
      notify('Theme changed', themes[opt.dataset.theme]);
    });
  });
  el.querySelectorAll('.wallpaper-option').forEach(function(opt) {
    opt.addEventListener('click', function() {
      setWallpaper(wallpapers[parseInt(opt.dataset.wallpaper)]);
      el.querySelectorAll('.wallpaper-option').forEach(function(o) { o.classList.remove('active') });
      opt.classList.add('active');
      notify('Wallpaper updated', '');
    });
  });
  return function() {};
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
  var urlInput = el.querySelector('#browser-url');
  var frame = el.querySelector('#browser-frame');
  function navigate() {
    var val = urlInput.value.trim();
    if (!val) return;
    if (/^https?:\/\//i.test(val)) frame.src = val;
    else frame.src = 'https://duckduckgo.com/?q=' + encodeURIComponent(val);
  }
  el.querySelector('#browser-go').addEventListener('click', navigate);
  urlInput.addEventListener('keydown', function(e) { if (e.key === 'Enter') navigate() });
  return function() {};
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
  var searchInput = el.querySelector('#music-search');
  var searchBtn = el.querySelector('#music-search-btn');
  var resultsEl = el.querySelector('#music-results');
  var searchStatus = el.querySelector('#music-search-status');
  var playBtn = el.querySelector('#music-play-btn');
  var nowPlaying = el.querySelector('#music-now-playing');
  var statusEl = el.querySelector('#music-status');
  var audio = el.querySelector('#music-audio');
  var currentIdx = null;
  var musicResults = null;

  async function searchMusic() {
    var q = searchInput.value.trim();
    if (!q) { searchStatus.textContent = 'Enter a song name.'; return }
    searchStatus.textContent = 'Searching...';
    searchBtn.disabled = true;
    try {
      var url = 'https://itunes.apple.com/search?term=' + encodeURIComponent(q) + '&media=music&limit=15';
      var res = await fetch(url);
      var data = await res.json();
      if (!data.results || data.results.length === 0) {
        resultsEl.innerHTML = '<span style="font-size:11px;color:var(--text2);">No results.</span>';
        searchStatus.textContent = 'No results.';
        return;
      }
      musicResults = data.results;
      resultsEl.innerHTML = data.results.map(function(t, i) {
        var img = t.artworkUrl100 || '';
        return '<div class="music-track" data-track="' + i + '" style="padding:6px;background:var(--surface2);border:1px solid var(--border);margin-bottom:4px;cursor:pointer;display:flex;align-items:center;gap:8px;">' +
          (img ? '<img src="' + esc(img) + '" style="width:40px;height:40px;" loading="lazy" onerror="this.style.display=\'none\'">' : '') +
          '<div style="flex:1;min-width:0;"><div style="font-size:11px;font-weight:bold;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">' + esc(t.trackName || 'Unknown') + '</div>' +
          '<div style="font-size:10px;color:var(--text2);">' + esc(t.artistName || 'Unknown') + '</div></div>' +
          '<span style="font-size:14px;">&#9654;</span></div>';
      }).join('');
      searchStatus.textContent = data.results.length + ' result(s).';
      el.querySelectorAll('.music-track').forEach(function(te) {
        te.addEventListener('click', function() { playTrack(Number(te.dataset.track)) });
      });
    } catch (e) {
      searchStatus.textContent = 'Music API unavailable.';
      resultsEl.innerHTML = '<span style="font-size:11px;color:var(--text2);">Could not connect.</span>';
    } finally { searchBtn.disabled = false; }
  }

  async function playTrack(index) {
    var track = musicResults[index];
    if (!track || !track.previewUrl) return;
    currentIdx = index;
    nowPlaying.textContent = track.trackName || 'Unknown';
    statusEl.textContent = 'Loading...';
    playBtn.disabled = true;
    try {
      audio.src = track.previewUrl;
      await audio.play();
      statusEl.textContent = 'Playing';
      playBtn.textContent = 'Pause';
      playBtn.disabled = false;
      el.querySelectorAll('.music-track').forEach(function(te) { te.style.background = '' });
      var sel = el.querySelector('[data-track="' + index + '"]');
      if (sel) sel.style.background = 'var(--accent)';
    } catch (e) {
      statusEl.textContent = 'Cannot play this track';
      playBtn.disabled = false;
    }
  }

  searchBtn.addEventListener('click', searchMusic);
  searchInput.addEventListener('keydown', function(e) { if (e.key === 'Enter') searchMusic() });
  playBtn.addEventListener('click', async function() {
    if (!audio.src && currentIdx !== null) { await playTrack(currentIdx); return }
    if (audio.paused) { await audio.play(); statusEl.textContent = 'Playing'; playBtn.textContent = 'Pause' }
    else { audio.pause(); statusEl.textContent = 'Paused'; playBtn.textContent = 'Play' }
  });
  audio.addEventListener('ended', function() { statusEl.textContent = 'Ended'; playBtn.textContent = 'Play' });
  return function() { audio.pause(); audio.src = '' };
}

function renderWeather() {
  var days = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
  var today = new Date().getDay();
  var temps = [24,22,19,23,25,27,21];
  return '<div>' +
    '<div class="weather-card">' +
      '<div style="font-size:36px;margin-bottom:4px;">&#9728;</div>' +
      '<div class="weather-temp">24&deg;C</div>' +
      '<div style="font-size:12px;color:var(--text2);">Sunny</div>' +
      '<div style="font-size:11px;color:var(--text2);margin-top:4px;">Feels like 26&deg;C</div>' +
    '</div>' +
    '<div style="display:grid;grid-template-columns:repeat(7,1fr);gap:2px;text-align:center;font-size:11px;">' +
      days.map(function(d, i) {
        return '<div style="padding:4px;border:1px solid var(--border);' + (i === (today || 7) - 1 ? 'border-color:var(--accent);' : '') + '">' +
          '<div style="color:var(--text2);">' + d + '</div>' +
          '<div style="margin:4px 0;">' + (i === (today || 7) - 1 ? '&#9728;' : '&#9729;') + '</div>' +
          '<div>' + temps[i] + '&deg;</div>' +
        '</div>';
      }).join('') +
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
    '<div id="cal-selected" style="font-size:11px;color:var(--text2);margin-top:8px;text-align:center;min-height:16px;"></div>' +
  '</div>';
}

function setupCalendar(el) {
  var grid = el.querySelector('#cal-grid');
  var monthYear = el.querySelector('#cal-month-year');
  var selectedEl = el.querySelector('#cal-selected');
  var date = state.calendarDate;

  function render() {
    var year = date.getFullYear(), month = date.getMonth();
    var firstDay = new Date(year, month, 1).getDay();
    var daysInMonth = new Date(year, month + 1, 0).getDate();
    monthYear.textContent = date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    var html = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].map(function(d) { return '<div class="calendar-header">' + d + '</div>' }).join('');
    var prevLast = new Date(year, month, 0).getDate();
    for (var i = firstDay - 1; i >= 0; i--) {
      html += '<div class="calendar-day other-month" data-day="' + (prevLast - i) + '" data-month="' + (month - 1) + '" data-year="' + year + '">' + (prevLast - i) + '</div>';
    }
    var today = new Date();
    for (var d = 1; d <= daysInMonth; d++) {
      var isToday = d === today.getDate() && month === today.getMonth() && year === today.getFullYear();
      var isSelected = state.selectedDay && state.selectedDay.day === d && state.selectedDay.month === month && state.selectedDay.year === year;
      html += '<div class="calendar-day' + (isToday ? ' today' : '') + (isSelected ? ' selected-day' : '') + '" data-day="' + d + '" data-month="' + month + '" data-year="' + year + '">' + d + '</div>';
    }
    var nextMonth = month + 1 > 11 ? 0 : month + 1;
    var nextYear = month + 1 > 11 ? year + 1 : year;
    for (var d = 1; d <= 42 - (firstDay + daysInMonth); d++) {
      html += '<div class="calendar-day other-month" data-day="' + d + '" data-month="' + nextMonth + '" data-year="' + nextYear + '">' + d + '</div>';
    }
    grid.innerHTML = html;

    grid.querySelectorAll('.calendar-day').forEach(function(dayEl) {
      dayEl.addEventListener('click', function() {
        var day = parseInt(dayEl.dataset.day);
        var m = parseInt(dayEl.dataset.month);
        var y = parseInt(dayEl.dataset.year);
        state.selectedDay = { day: day, month: m, year: y };
        var d = new Date(y, m, day);
        selectedEl.textContent = d.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
        render();
      });
    });
  }

  el.querySelector('#cal-prev').addEventListener('click', function() { date.setMonth(date.getMonth() - 1); render() });
  el.querySelector('#cal-next').addEventListener('click', function() { date.setMonth(date.getMonth() + 1); render() });
  render();
  return function() {};
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
  var list = el.querySelector('#task-list');
  var input = el.querySelector('#task-input');

  function render() {
    list.innerHTML = state.tasks.map(function(t) {
      return '<div class="task-item">' +
        '<div class="task-checkbox' + (t.done ? ' checked' : '') + '" data-id="' + t.id + '"></div>' +
        '<div class="task-text' + (t.done ? ' done' : '') + '">' + esc(t.text) + '</div>' +
        '<button class="task-delete" data-id="' + t.id + '">&times;</button>' +
      '</div>';
    }).join('');
    list.querySelectorAll('.task-checkbox').forEach(function(cb) {
      cb.addEventListener('click', function() {
        var task = state.tasks.find(function(t) { return t.id === parseInt(cb.dataset.id) });
        if (task) { task.done = !task.done; save(); render() }
      });
    });
    list.querySelectorAll('.task-delete').forEach(function(btn) {
      btn.addEventListener('click', function() {
        state.tasks = state.tasks.filter(function(t) { return t.id !== parseInt(btn.dataset.id) });
        save(); render();
      });
    });
  }

  function add() {
    var text = input.value.trim();
    if (!text) return;
    var id = state.tasks.length > 0 ? Math.max.apply(null, state.tasks.map(function(t) { return t.id })) + 1 : 1;
    state.tasks.push({ id: id, text: text, done: false });
    input.value = '';
    save(); render();
  }

  el.querySelector('#task-add').addEventListener('click', add);
  input.addEventListener('keydown', function(e) { if (e.key === 'Enter') add() });
  render();
  return function() {};
}

function renderClock() {
  return '<div>' +
    '<div class="clock-section" style="text-align:center;margin-bottom:12px;">' +
      '<div id="clock-big-time" style="font-size:42px;font-weight:bold;color:var(--accent);padding:12px 0 4px;">00:00:00</div>' +
      '<div id="clock-big-date" style="font-size:12px;color:var(--text2);">Loading...</div>' +
    '</div>' +
    '<div class="clock-tabs" style="display:flex;gap:0;margin-bottom:0;border-bottom:1px solid var(--border);">' +
      '<button class="clock-tab active" data-tab="stopwatch">Stopwatch</button>' +
      '<button class="clock-tab" data-tab="timer">Timer</button>' +
    '</div>' +
    '<div class="clock-section" id="clock-stopwatch">' +
      '<div id="sw-display" style="font-size:32px;font-weight:bold;margin:12px 0 10px;letter-spacing:2px;">00:00.00</div>' +
      '<div style="display:flex;gap:4px;justify-content:center;margin-bottom:10px;">' +
        '<button class="btn btn-primary" id="sw-start">Start</button>' +
        '<button class="btn" id="sw-lap">Lap</button>' +
        '<button class="btn" id="sw-reset">Reset</button>' +
      '</div>' +
      '<div id="sw-laps" style="max-height:110px;overflow-y:auto;font-size:11px;color:var(--text2);"></div>' +
    '</div>' +
    '<div class="clock-section" id="clock-timer" style="display:none;">' +
      '<div id="tm-display" style="font-size:32px;font-weight:bold;margin:12px 0 10px;letter-spacing:2px;">00:00</div>' +
      '<div style="display:flex;gap:6px;justify-content:center;margin-bottom:10px;align-items:center;">' +
        '<input type="number" id="tm-min" class="input" style="width:60px;text-align:center;" min="0" max="99" value="5" placeholder="min">' +
        '<span style="font-size:12px;color:var(--text2);">m</span>' +
        '<input type="number" id="tm-sec" class="input" style="width:60px;text-align:center;" min="0" max="59" value="0" placeholder="sec">' +
        '<span style="font-size:12px;color:var(--text2);">s</span>' +
      '</div>' +
      '<div style="display:flex;gap:4px;justify-content:center;">' +
        '<button class="btn btn-primary" id="tm-start">Start</button>' +
        '<button class="btn" id="tm-reset">Reset</button>' +
      '</div>' +
    '</div>' +
  '</div>';
}

function setupClock(el) {
  var timeEl = el.querySelector('#clock-big-time');
  var dateEl = el.querySelector('#clock-big-date');
  var swDisplay = el.querySelector('#sw-display');
  var swStart = el.querySelector('#sw-start');
  var swLap = el.querySelector('#sw-lap');
  var swReset = el.querySelector('#sw-reset');
  var swLaps = el.querySelector('#sw-laps');
  var tmDisplay = el.querySelector('#tm-display');
  var tmMin = el.querySelector('#tm-min');
  var tmSec = el.querySelector('#tm-sec');
  var tmStart = el.querySelector('#tm-start');
  var tmReset = el.querySelector('#tm-reset');

  var clockTick = setInterval(function() {
    var now = new Date();
    var h = String(now.getHours()).padStart(2, '0');
    var m = String(now.getMinutes()).padStart(2, '0');
    var s = String(now.getSeconds()).padStart(2, '0');
    timeEl.textContent = h + ':' + m + ':' + s;
    dateEl.textContent = now.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  }, 1000);
  var now = new Date();
  timeEl.textContent = String(now.getHours()).padStart(2, '0') + ':' + String(now.getMinutes()).padStart(2, '0') + ':' + String(now.getSeconds()).padStart(2, '0');
  dateEl.textContent = now.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

  var swRunning = false, swTime = 0, swStartAt = 0, swInterval = null, swLapCount = 0;

  function swFmt(ms) {
    var min = Math.floor(ms / 60000);
    var sec = Math.floor((ms % 60000) / 1000);
    var cs = Math.floor((ms % 1000) / 10);
    return String(min).padStart(2, '0') + ':' + String(sec).padStart(2, '0') + '.' + String(cs).padStart(2, '0');
  }

  function swTick() {
    swTime = Date.now() - swStartAt;
    swDisplay.textContent = swFmt(swTime);
  }

  swStart.addEventListener('click', function() {
    if (!swRunning) {
      swStartAt = Date.now() - swTime;
      swInterval = setInterval(swTick, 33);
      swRunning = true;
      swStart.textContent = 'Stop';
    } else {
      clearInterval(swInterval);
      swRunning = false;
      swStart.textContent = 'Start';
    }
  });

  swLap.addEventListener('click', function() {
    if (!swRunning) return;
    swLapCount++;
    var lap = document.createElement('div');
    lap.style.padding = '3px 0';
    lap.style.borderBottom = '1px solid var(--border)';
    lap.textContent = 'Lap ' + swLapCount + ': ' + swFmt(swTime);
    swLaps.prepend(lap);
  });

  swReset.addEventListener('click', function() {
    clearInterval(swInterval);
    swRunning = false;
    swTime = 0;
    swLapCount = 0;
    swDisplay.textContent = '00:00.00';
    swStart.textContent = 'Start';
    swLaps.innerHTML = '';
  });

  var tmRunning = false, tmTime = 0, tmInterval = null;

  function tmFmt(sec) {
    var m = Math.floor(sec / 60);
    var s = sec % 60;
    return String(m).padStart(2, '0') + ':' + String(s).padStart(2, '0');
  }

  function tmTick() {
    tmTime--;
    tmDisplay.textContent = tmFmt(tmTime);
    if (tmTime <= 0) {
      clearInterval(tmInterval);
      tmRunning = false;
      tmStart.textContent = 'Start';
      tmDisplay.style.color = 'var(--red)';
      notify('Timer', 'Time is up!');
      setTimeout(function() { tmDisplay.style.color = '' }, 2000);
    }
  }

  tmStart.addEventListener('click', function() {
    if (!tmRunning) {
      if (tmTime <= 0) {
        var mins = parseInt(tmMin.value) || 0;
        var secs = parseInt(tmSec.value) || 0;
        tmTime = mins * 60 + secs;
        if (tmTime <= 0) return;
      }
      tmDisplay.textContent = tmFmt(tmTime);
      tmInterval = setInterval(tmTick, 1000);
      tmRunning = true;
      tmStart.textContent = 'Pause';
    } else {
      clearInterval(tmInterval);
      tmRunning = false;
      tmStart.textContent = 'Resume';
    }
  });

  tmReset.addEventListener('click', function() {
    clearInterval(tmInterval);
    tmRunning = false;
    tmTime = 0;
    tmStart.textContent = 'Start';
    tmDisplay.textContent = '00:00';
    tmDisplay.style.color = '';
    tmMin.value = 5;
    tmSec.value = 0;
  });

  el.querySelectorAll('.clock-tab').forEach(function(tab) {
    tab.addEventListener('click', function() {
      el.querySelectorAll('.clock-tab').forEach(function(t) { t.classList.remove('active') });
      tab.classList.add('active');
      var which = tab.dataset.tab;
      el.querySelector('#clock-stopwatch').style.display = which === 'stopwatch' ? '' : 'none';
      el.querySelector('#clock-timer').style.display = which === 'timer' ? '' : 'none';
    });
  });

  return function() { clearInterval(clockTick); clearInterval(swInterval); clearInterval(tmInterval) };
}

function renderEditor() {
  return '<div class="editor-layout">' +
    '<div class="editor-sidebar" id="editor-sidebar"></div>' +
    '<div class="editor-main">' +
      '<div style="display:flex;gap:4px;margin-bottom:8px;align-items:center;">' +
        '<input type="text" id="editor-filename" class="input" style="flex:1;" placeholder="filename.txt">' +
        '<button class="btn btn-primary" id="editor-save">Save</button>' +
        '<button class="btn" id="editor-new">New</button>' +
        '<button class="btn" id="editor-delete" style="color:var(--red);">Del</button>' +
      '</div>' +
      '<textarea id="editor-textarea" class="editor-textarea" placeholder="Start typing..."></textarea>' +
    '</div>' +
  '</div>';
}

function setupEditor(el) {
  var sidebar = el.querySelector('#editor-sidebar');
  var filename = el.querySelector('#editor-filename');
  var textarea = el.querySelector('#editor-textarea');
  var saveBtn = el.querySelector('#editor-save');
  var newBtn = el.querySelector('#editor-new');
  var delBtn = el.querySelector('#editor-delete');

  function renderList() {
    sidebar.innerHTML = '';
    state.editorFiles.forEach(function(f) {
      var item = document.createElement('div');
      item.className = 'editor-file-item' + (f.id === state.editorCurrentId ? ' active' : '');
      item.innerHTML = '<div class="editor-file-name">' + esc(f.name) + '</div><div class="editor-file-date">' + esc(f.date) + '</div>';
      item.addEventListener('click', function() { loadFile(f.id) });
      sidebar.appendChild(item);
    });
  }

  function loadFile(id) {
    var f = state.editorFiles.find(function(x) { return x.id === id });
    if (!f) return;
    state.editorCurrentId = id;
    filename.value = f.name;
    textarea.value = f.body;
    renderList();
  }

  function saveCurrent() {
    var f = state.editorFiles.find(function(x) { return x.id === state.editorCurrentId });
    if (!f) return;
    f.name = filename.value.trim() || 'untitled.txt';
    f.body = textarea.value;
    var d = new Date();
    f.date = d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
    save();
    renderList();
  }

  saveBtn.addEventListener('click', saveCurrent);

  newBtn.addEventListener('click', function() {
    var id = state.editorFiles.length > 0 ? Math.max.apply(null, state.editorFiles.map(function(f) { return f.id })) + 1 : 1;
    var d = new Date();
    var date = d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
    state.editorFiles.push({ id: id, name: 'untitled.txt', body: '', date: date });
    save();
    loadFile(id);
  });

  delBtn.addEventListener('click', function() {
    if (state.editorFiles.length <= 1) return;
    if (!confirm('Delete this file?')) return;
    state.editorFiles = state.editorFiles.filter(function(f) { return f.id !== state.editorCurrentId });
    state.editorCurrentId = state.editorFiles[0].id;
    save();
    loadFile(state.editorCurrentId);
  });

  textarea.addEventListener('keydown', function(e) {
    if ((e.ctrlKey || e.metaKey) && e.key === 's') { e.preventDefault(); saveCurrent() }
    if (e.key === 'Tab') {
      e.preventDefault();
      var start = textarea.selectionStart;
      var end = textarea.selectionEnd;
      textarea.value = textarea.value.substring(0, start) + '  ' + textarea.value.substring(end);
      textarea.selectionStart = textarea.selectionEnd = start + 2;
    }
  });

  if (state.editorFiles.length > 0) loadFile(state.editorCurrentId);
  else renderList();
  return function() {};
}

function renderFiles() {
  return '<div>' +
    '<div class="files-toolbar" id="files-toolbar">' +
      '<button class="btn" id="files-back" disabled>&lt;</button>' +
      '<div id="files-breadcrumb" style="flex:1;font-size:11px;color:var(--text2);overflow:hidden;white-space:nowrap;text-overflow:ellipsis;"></div>' +
      '<button class="btn" id="files-new-folder">+Dir</button>' +
      '<button class="btn" id="files-new-file">+File</button>' +
    '</div>' +
    '<div id="files-list" class="files-list"></div>' +
  '</div>';
}

function setupFiles(el) {
  var list = el.querySelector('#files-list');
  var breadcrumb = el.querySelector('#files-breadcrumb');
  var backBtn = el.querySelector('#files-back');
  var newFolderBtn = el.querySelector('#files-new-folder');
  var newFileBtn = el.querySelector('#files-new-file');

  function getDir() {
    var node = state.fs;
    for (var i = 0; i < state.fsPath.length; i++) {
      var found = node.children.find(function(c) { return c.name === state.fsPath[i] && c.type === 'folder' });
      if (!found) { state.fsPath = state.fsPath.slice(0, i); return state.fs; }
      node = found;
    }
    return node;
  }

  function renderBreadcrumb() {
    var parts = ['<span style="cursor:pointer;color:var(--accent);" data-bc="-1">/</span>'];
    state.fsPath.forEach(function(p, i) {
      parts.push('<span style="cursor:pointer;color:var(--accent);" data-bc="' + i + '">' + esc(p) + '</span>');
    });
    breadcrumb.innerHTML = parts.join(' / ');
    backBtn.disabled = state.fsPath.length === 0;
    breadcrumb.querySelectorAll('[data-bc]').forEach(function(span) {
      span.addEventListener('click', function() {
        var idx = parseInt(span.dataset.bc);
        state.fsPath = idx < 0 ? [] : state.fsPath.slice(0, idx + 1);
        renderDir();
      });
    });
  }

  function renderDir() {
    var dir = getDir();
    renderBreadcrumb();
    list.innerHTML = '';
    if (!dir.children || dir.children.length === 0) {
      list.innerHTML = '<div style="padding:20px;text-align:center;color:var(--text2);font-size:12px;">Empty folder</div>';
      return;
    }
    var sorted = dir.children.slice().sort(function(a, b) {
      if (a.type === b.type) return a.name.localeCompare(b.name);
      return a.type === 'folder' ? -1 : 1;
    });
    sorted.forEach(function(item) {
      var row = document.createElement('div');
      row.className = 'files-row';
      var iconStr = item.type === 'folder' ? icon(iconBase + 'folder.svg') : icon(iconBase + 'file.svg');
      row.innerHTML = iconStr + '<span class="files-name">' + esc(item.name) + '</span>' +
        '<span class="files-type">' + (item.type === 'folder' ? 'folder' : 'file') + '</span>' +
        '<button class="files-rename btn" style="font-size:10px;padding:2px 6px;">Rename</button>' +
        '<button class="files-del btn" style="font-size:10px;padding:2px 6px;color:var(--red);">X</button>';
      if (item.type === 'folder') {
        row.style.cursor = 'pointer';
        row.addEventListener('dblclick', function() {
          state.fsPath.push(item.name);
          renderDir();
        });
      } else {
        row.style.cursor = 'pointer';
        row.addEventListener('dblclick', function() {
          var id = state.editorFiles.length > 0 ? Math.max.apply(null, state.editorFiles.map(function(f) { return f.id })) + 1 : 1;
          var d = new Date();
          var date = d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
          state.editorFiles.push({ id: id, name: item.name, body: item.body || '', date: date });
          state.editorCurrentId = id;
          save();
          if (state.windows.has('editor')) wm.close('editor');
          wm.open('editor');
          notify('Opened in Editor', item.name);
        });
      }
      row.querySelector('.files-rename').addEventListener('click', function(e) {
        e.stopPropagation();
        var newName = prompt('Rename "' + item.name + '" to:', item.name);
        if (newName && newName.trim() && newName.trim() !== item.name) {
          item.name = newName.trim();
          save();
          renderDir();
        }
      });
      row.querySelector('.files-del').addEventListener('click', function(e) {
        e.stopPropagation();
        if (!confirm('Delete "' + item.name + '"?')) return;
        dir.children = dir.children.filter(function(c) { return c !== item });
        save();
        renderDir();
      });
      list.appendChild(row);
    });
  }

  backBtn.addEventListener('click', function() {
    if (state.fsPath.length > 0) { state.fsPath.pop(); renderDir() }
  });

  newFolderBtn.addEventListener('click', function() {
    var name = prompt('Folder name:');
    if (!name || !name.trim()) return;
    var dir = getDir();
    dir.children.push({ name: name.trim(), type: 'folder', children: [] });
    save();
    renderDir();
  });

  newFileBtn.addEventListener('click', function() {
    var name = prompt('File name:');
    if (!name || !name.trim()) return;
    var dir = getDir();
    dir.children.push({ name: name.trim(), type: 'file', body: '' });
    save();
    renderDir();
  });

  renderDir();
  return function() {};
}

function renderDesktopIcons() {
  var c = $('desktop-icons');
  c.innerHTML = '';
  var desktopApps = ['welcome','about','projects','notes','terminal','calculator','settings','browser','music','weather','calendar','tasks','clock','editor','files'];
  desktopApps.forEach(function(appId) {
    var app = APPS[appId];
    if (!app) return;
    var el = document.createElement('div');
    el.className = 'icon';
    el.dataset.app = appId;
    el.innerHTML = icon(app.icon) + '<span class="icon-label">' + esc(app.title) + '</span>';
    el.addEventListener('click', function() { wm.open(appId) });
    c.appendChild(el);
  });
}

function setupEvents() {
  $('start-btn').addEventListener('click', toggleStartMenu);

  document.addEventListener('click', function(e) {
    if ($('start-menu').classList.contains('open') && !$('start-menu').contains(e.target) && e.target !== $('start-btn'))
      $('start-menu').classList.remove('open');
  });

  document.addEventListener('contextmenu', function(e) {
    if (e.target.closest('.window') || e.target.closest('#taskbar') || e.target.closest('#start-menu') || e.target.closest('.icon')) return;
    e.preventDefault();
    showCtx(e.clientX, e.clientY);
  });

  document.addEventListener('click', function(e) {
    if (!e.target.closest('#context-menu')) hideCtx();
  });

  $('context-menu').addEventListener('click', function(e) {
    var item = e.target.closest('.ctx-item');
    if (!item) return;
    var action = item.dataset.action;
    if (action === 'refresh') location.reload();
    if (action === 'terminal') wm.open('terminal');
    if (action === 'settings') wm.open('settings');
    if (action === 'about') wm.open('about');
    hideCtx();
  });

  document.addEventListener('click', function(e) {
    var btn = e.target.closest('.control-btn');
    if (!btn) return;
    var action = btn.dataset.action;
    var appId = btn.dataset.app;
    if (!action || !appId) return;
    if (action === 'close') wm.close(appId);
    if (action === 'minimize') wm.minimize(appId);
    if (action === 'maximize') wm.toggleMax(appId);
  });

  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      $('start-menu').classList.remove('open');
      hideCtx();
    }
  });

  $('settings-shortcut').addEventListener('click', function() {
    wm.open('settings');
    $('start-menu').classList.remove('open');
  });

  $('power-shortcut').addEventListener('click', function() {
    if (confirm('Shut down ZI OS?')) {
      document.body.innerHTML = '<div style="display:flex;align-items:center;justify-content:center;height:100vh;background:#000;color:#888;font-family:monospace;flex-direction:column;gap:12px;">' +
        '<div style="font-size:42px;">&#9211;</div>' +
        '<div>ZI OS has been shut down.</div>' +
        '<div style="font-size:11px;color:#555;">Close the tab to exit.</div>' +
      '</div>';
    }
  });
}

document.addEventListener('DOMContentLoaded', function() {
  wm.init();
  renderDesktopIcons();
  renderStartMenu();
  setupEvents();
  boot();
});
