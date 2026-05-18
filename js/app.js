// =========================
// 📅 GLOBAL STATE
// =========================
let today = new Date();
let month = today.getMonth();
let year = today.getFullYear();

function formatDateLocal(date) {
  let y = date.getFullYear();
  let m = String(date.getMonth() + 1).padStart(2, "0");
  let d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

let selectedDate = formatDateLocal(today);

// =========================
// 🌙 DARK MODE
// =========================
function toggleTheme() {
  const body = document.body;
  body.classList.toggle("dark");

  localStorage.setItem("theme",
    body.classList.contains("dark") ? "dark" : "light"
  );
}

// load saved theme
(function () {
  const saved = localStorage.getItem("theme");
  if (saved === "dark") {
    document.body.classList.add("dark");
  }
})();

// =========================
// 🚀 INIT
// =========================
(async () => {
  await requireAuth();
  await loadEvents();
  render();
})();

// =========================
// 🔁 MAIN RENDER
// =========================
function render() {
  renderCalendar();
  renderEvents();
}

// =========================
// 📅 CALENDAR
// =========================
function renderCalendar() {
  const grid = document.getElementById("calendarGrid");
  grid.innerHTML = "";

  const months = [
    "January","February","March","April","May","June",
    "July","August","September","October","November","December"
  ];

  document.getElementById("monthYear").innerText =
    `${months[month]} ${year}`;

  let first = new Date(year, month, 1).getDay();
  let days = new Date(year, month + 1, 0).getDate();

  let todayStr = formatDateLocal(new Date());

  for (let i = 0; i < first; i++) {
    grid.appendChild(document.createElement("div"));
  }

  for (let d = 1; d <= days; d++) {
    let dateObj = new Date(year, month, d);
    let date = formatDateLocal(dateObj);

    let el = document.createElement("div");
    el.innerText = d;

    el.onclick = () => {
      selectedDate = date;
      render();
    };

    if (date === selectedDate) el.classList.add("selected");
    if (date === todayStr) el.classList.add("today");

    grid.appendChild(el);
  }
}

// =========================
// 📅 MONTH SWITCH FIX
// =========================
function nextMonth() {
  month++;
  if (month > 11) {
    month = 0;
    year++;
  }
  render();
}

function prevMonth() {
  month--;
  if (month < 0) {
    month = 11;
    year--;
  }
  render();
}

// =========================
// 📋 EVENTS
// =========================
function renderEvents() {
  const list = document.getElementById("events");
  list.innerHTML = "";

  let events = dataStore[selectedDate] || [];

  if (events.length === 0) {
    list.innerHTML = "<p>No events</p>";
  } else {
    events.forEach(e => {
      let div = document.createElement("div");
      div.className = "event-item";

      div.innerHTML = `
        <span>${e.time || "--"} - ${e.text}</span>
        <button class="delete-btn" onclick="deleteEvent('${e.id}')">✕</button>
      `;

      list.appendChild(div);
    });
  }

  document.getElementById("selectedDate").innerText =
    "Selected: " + selectedDate;
}