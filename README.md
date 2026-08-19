# web-os

A desktop operating system that runs in your browser. Boot screen, taskbar, draggable windows, start menu, the works. No backend, no framework, just three files.

## What this is

ZI OS is a web-based desktop environment. You open `index.html`, it boots up, and you get a full desktop with apps you can open, drag around, resize, minimize, and close.

It started as an experiment to see how far you can push vanilla JS and CSS without any build tools.

## Built-in apps

12 apps ship with the OS:

- **Welcome** -- boot greeting and quick links to apps
- **About Me** -- background and skills
- **Projects** -- project showcase (currently a placeholder)
- **Notes** -- pinned notes with sidebar navigation, saved to localStorage
- **Terminal** -- working shell with `help`, `ls`, `cat`, `calc`, `theme`, `whoami`, and more
- **Calculator** -- basic arithmetic with keyboard support
- **Settings** -- theme picker and wallpaper selector
- **Browser** -- iframe-based web browser
- **Music** -- YouTube embed player with presets and URL input
- **Weather** -- static 7-day forecast widget
- **Calendar** -- navigable monthly calendar with day selection
- **Tasks** -- todo list with add/complete/delete, saved to localStorage

## Customization

Four themes: Midnight, Light, Ocean, Matrix. Five wallpaper options. Theme and wallpaper choices stick around in localStorage. Notes and Tasks persist too.

## Tech stack

- `index.html` -- desktop markup, boot screen, start menu, taskbar
- `styles.css` -- layout, themes, animations, app styles
- `script.js` -- window manager, app registry, all app logic
- Vanilla JavaScript, no framework, no build step
- localStorage for persistence
- YouTube iframe embeds for the music player

## How to run

Open `index.html` in a browser. Or serve it locally if you want to avoid file:// quirks.

To publish, push the repo and enable GitHub Pages on `main`.

## File structure

```
index.html       -- desktop, boot screen, start menu, taskbar, context menu
styles.css       -- layout, themes, animations, app styles
script.js        -- window manager, apps, boot sequence
wallpapers/      -- local wallpaper image
```
