function updateClock() {
    const now = new Date();
    document.getElementById('clock').innerText = now.toLocaleTimeString({ hour: "2-digit", minute: "2-digit" });
}
updateClock();
setInterval(updateClock, 1000);

let topZ = 100;

function bringToFront(win) {
    topZ++;
    win.style.zIndex = topZ;
}

function openWindow(win) {
    win.style.display = 'block';
    bringToFront(win);
}

function closeWindow(win) {
    win.style.display = 'none';
}

document.querySelectorAll('.window').forEach(win => {
    win.addEventListener('mousedown', () => {
        bringToFront(win);
    });
});

function makeDraggable(win) {
    const handle = win.querySelector('.window-header');
    if (!handle) return;

    let startX, startY, startLeft, startTop;

    handle.addEventListener('mousedown', (e) => {
        e.preventDefault();
        bringToFront(win);
        startX = e.clientX;
        startY = e.clientY;
        startLeft = win.offsetLeft;
        startTop = win.offsetTop;

        function onMove(e) {
            win.style.left = startLeft + e.clientX - startX + 'px';
            win.style.top = startTop + e.clientY - startY + 'px';
        }

        function onUp() {
            document.removeEventListener('mousemove', onMove);
            document.removeEventListener('mouseup', onUp);
        }

        document.addEventListener('mousemove', onMove);
        document.addEventListener('mouseup', onUp);
    });
}

makeDraggable(document.getElementById("welcome"));
makeDraggable(document.getElementById("notes"));
makeDraggable(document.getElementById("about"));

document.getElementById("closewelcome").addEventListener("click", () =>
    closeWindow(document.getElementById("welcome"))
);
document.getElementById("closenotes").addEventListener("click", () =>
    closeWindow(document.getElementById("notes"))
);
document.getElementById("closeabout").addEventListener("click", () =>
    closeWindow(document.getElementById("about"))
);

document.getElementById("icon-notes").addEventListener("click", () =>
    openWindow(document.getElementById("notes"))
);
document.getElementById("icon-about").addEventListener("click", () =>
    openWindow(document.getElementById("about"))
);

document.getElementById("os-name").addEventListener("click", () =>
    openWindow(document.getElementById("welcome"))
);

const NOTES = [
    {
        title: "Pinned Notes",
        body: "Welcome to my OS! Click on any note on the left to read it.",
    },
    {
        title: "Projects",
        body: "Working on web-os ",
    },
    {
        title: "Reading",
        body: "Currently reading : Opposite of Always by Justin A. Reynolds",
    },
    {
        title: "Ideas",
        body: "Add a terminal window , a music player , and a custom feature to play games on this web os!",
    },
];

const sidebar = document.getElementById("notes-sidebar");
const content = document.getElementById("notes-content");

NOTES.forEach((note, i) => {
    const item = document.createElement("div");
    item.className = "note-item";
    item.innerHTML = `<div class="note-item-title">${note.title}</div><div class="note-item-date">Note ${i + 1}</div>`;
    item.addEventListener("click", () => {
        document.querySelectorAll(".note-item").forEach((e1) => {
            e1.classList.remove("active");
        });
        item.classList.add("active");
        content.innerHTML = `<h3 class="note-content-title">${note.title}</h3><p class="note-content-date">Note ${i + 1}</p><p class="note-content-body">${note.body}</p>`;
    });

    sidebar.appendChild(item);
});

if (sidebar.querySelectorAll(".note-item").length > 0) {
    sidebar.querySelectorAll(".note-item")[0].click();
}
