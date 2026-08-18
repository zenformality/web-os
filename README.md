# web-os

A portfolio built to look and feel like a desktop operating system. Instead of scrolling through a typical landing page, you get a full desktop environment with windows you can open, drag around, resize, minimize, and close.

**Live site:** https://zenformality.github.io/web-os/

## What this is

This is a personal portfolio disguised as an operating system. The whole thing runs in the browser with no backend and no build step. You land on a boot screen, the desktop loads, and from there you open apps that contain the actual portfolio content -- about section, projects, notes, contact info.

The OS is called **ZI OS** internally. The desktop has a taskbar, a Start menu with search, desktop icons, a right-click context menu, and notification toasts. Windows have draggable title bars, minimize/maximize/close controls, and resizable corners. It behaves like a simplified desktop environment.

## Built-in apps

There are 12 apps available from the desktop icons and the Start menu:

- **Welcome** -- landing screen with profile intro and links
- **About Me** -- background, skills list, and tech stack tags
- **Projects** -- a grid of project cards with descriptions
- **Notes** -- pinned notes with sidebar navigation; persisted in localStorage
- **Terminal** -- a working shell with commands like `help`, `ls`, `cat`, `neofetch`, `calc`, `theme`, and `whoami`
- **Calculator** -- basic arithmetic with a grid layout
- **Settings** -- theme picker and wallpaper selector
- **Browser** -- iframe-based browser for navigating the web (limited by iframe policies)
- **Music** -- search and preview tracks via the iTunes Search API
- **Weather** -- a static 7-day forecast widget
- **Calendar** -- a navigable monthly calendar
- **Tasks** -- a todo list with add/complete/delete; persisted in localStorage

## Customization

Six themes are included: Midnight, Ocean, Forest, Sunset, Light, Matrix, and Cyberpunk. Each theme changes the glass panels, accent colors, text colors, and taskbar styling. Five wallpaper options ship with the project -- one local `.webp` file and four Unsplash images. Theme and wallpaper choices are saved to localStorage and persist across sessions.

The Notes and Tasks apps also persist their data locally, so returning visitors see whatever they left behind.

## Tech stack

- Single `index.html`, one CSS file, one JS file
- Tailwind CSS loaded via CDN for utility classes
- Google Fonts: Space Grotesk and Space Mono
- Vanilla JavaScript -- no framework, no build step, no dependencies
- localStorage for theme, wallpaper, notes, and task persistence
- iTunes Search API for the music player
- HLS.js is loaded but the music player uses native `<audio>` with preview URLs

## How to run

Open `index.html` in any modern browser. That is it. No server required, though a local server works too if you want to avoid any CDA restrictions.

To publish, push the repo and enable GitHub Pages on the `main` branch.

## File structure

```
index.html       -- markup for the desktop, boot screen, start menu, taskbar, and context menu
styles.css       -- all layout, themes, animations, and app-specific styles
script.js        -- window manager, app registry, boot sequence, and all app logic
wallpapers/      -- local wallpaper image
```
