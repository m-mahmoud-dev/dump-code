
const STORAGE_KEY = "workTimerState";
const WORK_DURATION_MS = 25 * 60 * 1000; // 25 minutes
const BREAK_DURATION_MS = 5 * 60 * 1000; // 5 minutes

// ---------- DOM Elements ----------
const timerDisplay = document.getElementById("timerDisplay");
const statusText = document.getElementById("statusText");
const todayTotal = document.getElementById("todayTotal");
const sessionList = document.getElementById("sessionList");

const startBtn = document.getElementById("startBtn");
const pauseBtn = document.getElementById("pauseBtn");
const resetBtn = document.getElementById("resetBtn");
const clearHistoryBtn = document.getElementById("clearHistoryBtn");

const sessionLabelInput = document.getElementById("sessionLabel");
const modeSelect = document.getElementById("modeSelect");

const phaseText = document.getElementById("phaseText");
const phaseTargetText = document.getElementById("phaseTargetText");
const pomodoroInfo = document.getElementById("pomodoroInfo");

// ---------- App State ----------
const state = {
  isRunning: false,
  startTimestamp: null,      
  accumulatedMs: 0,          
  lastTickIntervalId: null, 
  sessions: [],             
  currentLabel: "",
  mode: "normal",            
  pomodoroPhase: "work",     
  phaseDurationMs: WORK_DURATION_MS
};

// ---------- Initialization ----------
function init() {
  loadState();
  syncInputsFromState();
  restoreRunningStateAfterRefresh();
  bindEvents();
  updatePhaseUI();
  render();
}

// ---------- Event Binding ----------
function bindEvents() {
  startBtn.addEventListener("click", startTimer);
  pauseBtn.addEventListener("click", pauseTimer);
  resetBtn.addEventListener("click", resetTimer);
  clearHistoryBtn.addEventListener("click", clearHistory);

  sessionLabelInput.addEventListener("input", (e) => {
    state.currentLabel = e.target.value.trim();
    saveState();
  });

  modeSelect.addEventListener("change", (e) => {
    const newMode = e.target.value;

    // Prevent mode change while timer is running to keep logic simple and predictable
    if (state.isRunning) {
      modeSelect.value = state.mode;
      alert("Pause the timer before changing mode.");
      return;
    }

    state.mode = newMode;
    resetTimer(false);

    if (state.mode === "pomodoro") {
      state.pomodoroPhase = "work";
      state.phaseDurationMs = WORK_DURATION_MS;
    } else {
      state.pomodoroPhase = "work";
      state.phaseDurationMs = WORK_DURATION_MS;
    }

    updatePhaseUI();
    saveState();
    render();
  });

  document.addEventListener(
    "click",
    () => {
      requestNotificationPermission();
    },
    { once: true }
  );
}

// ---------- Timer Controls ----------
function startTimer() {
  if (state.isRunning) return;

  state.isRunning = true;

  state.startTimestamp = Date.now();

  startRenderLoop();
  saveState();
  render();
}

function pauseTimer() {
  if (!state.isRunning) return;

  state.accumulatedMs = getElapsedMs();
  state.isRunning = false;
  state.startTimestamp = null;

  stopRenderLoop();

  if (state.mode === "normal" && state.accumulatedMs > 0) {
    saveCurrentSession(state.accumulatedMs);
  }

  saveState();
  render();
}

function resetTimer(shouldSave = true) {
  const elapsed = getElapsedMs();

  if (shouldSave && state.mode === "normal" && elapsed > 0) {
    saveCurrentSession(elapsed);
  }

  state.isRunning = false;
  state.startTimestamp = null;
  state.accumulatedMs = 0;

  if (state.mode === "pomodoro") {
    state.pomodoroPhase = "work";
    state.phaseDurationMs = WORK_DURATION_MS;
  }

  stopRenderLoop();
  updatePhaseUI();
  saveState();
  render();
}

function getElapsedMs() {
  if (!state.isRunning || !state.startTimestamp) {
    return state.accumulatedMs;
  }

  return state.accumulatedMs + (Date.now() - state.startTimestamp);
}

function startRenderLoop() {
  stopRenderLoop();


  state.lastTickIntervalId = setInterval(() => {
    handleTick();
  }, 250);
}

function stopRenderLoop() {
  if (state.lastTickIntervalId) {
    clearInterval(state.lastTickIntervalId);
    state.lastTickIntervalId = null;
  }
}

function handleTick() {
  const elapsed = getElapsedMs();

  if (state.mode === "pomodoro") {
    const remaining = Math.max(state.phaseDurationMs - elapsed, 0);

    timerDisplay.textContent = formatDuration(remaining);

    if (remaining <= 0) {
      completePomodoroPhase();
      return;
    }
  } else {
    timerDisplay.textContent = formatDuration(elapsed);
  }

  updateStatusText();
  updateTodayTotal();
  saveState();
}

// ---------- Pomodoro Logic ----------
function completePomodoroPhase() {
  // Save only work phases as work sessions.
  if (state.pomodoroPhase === "work") {
    saveCurrentSession(state.phaseDurationMs);
    notifyUser("Pomodoro complete", "Work session ended. Time for a short break.");
    playBeep();
    state.pomodoroPhase = "break";
    state.phaseDurationMs = BREAK_DURATION_MS;
  } else {
    notifyUser("Break complete", "Break ended. Ready for the next work session.");
    playBeep();
    state.pomodoroPhase = "work";
    state.phaseDurationMs = WORK_DURATION_MS;
  }

  // Restart next phase immediately.
  state.accumulatedMs = 0;
  state.startTimestamp = Date.now();
  updatePhaseUI();
  saveState();
  render();
}

function updatePhaseUI() {
  const isPomodoro = state.mode === "pomodoro";
  pomodoroInfo.style.display = isPomodoro ? "flex" : "none";

  phaseText.textContent = capitalize(state.pomodoroPhase);
  phaseTargetText.textContent =
    state.pomodoroPhase === "work" ? "25:00" : "05:00";
}

// ---------- Sessions ----------
function saveCurrentSession(durationMs) {
  if (durationMs <= 0) return;

  const now = new Date();

  const session = {
    id: crypto.randomUUID ? crypto.randomUUID() : String(Date.now()),
    label: state.currentLabel || "Unlabeled",
    startTime: state.startTimestamp
      ? new Date(state.startTimestamp).toISOString()
      : now.toISOString(),
    endTime: now.toISOString(),
    durationMs
  };

  state.sessions.unshift(session);
  state.accumulatedMs = 0;
  state.startTimestamp = null;
}

function clearHistory() {
  const confirmed = confirm("Are you sure you want to delete all session history?");
  if (!confirmed) return;

  state.sessions = [];
  saveState();
  render();
}

// ---------- Persistence ----------
function saveState() {
  const dataToStore = {
    isRunning: state.isRunning,
    startTimestamp: state.startTimestamp,
    accumulatedMs: state.accumulatedMs,
    sessions: state.sessions,
    currentLabel: state.currentLabel,
    mode: state.mode,
    pomodoroPhase: state.pomodoroPhase,
    phaseDurationMs: state.phaseDurationMs
  };

  localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToStore));
}

function loadState() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return;

  try {
    const saved = JSON.parse(raw);

    state.isRunning = saved.isRunning ?? false;
    state.startTimestamp = saved.startTimestamp ?? null;
    state.accumulatedMs = saved.accumulatedMs ?? 0;
    state.sessions = Array.isArray(saved.sessions) ? saved.sessions : [];
    state.currentLabel = saved.currentLabel ?? "";
    state.mode = saved.mode ?? "normal";
    state.pomodoroPhase = saved.pomodoroPhase ?? "work";
    state.phaseDurationMs = saved.phaseDurationMs ?? WORK_DURATION_MS;
  } catch (error) {
    console.error("Failed to parse saved timer state:", error);
    localStorage.removeItem(STORAGE_KEY);
  }
}

function restoreRunningStateAfterRefresh() {
  // If timer was running before refresh, continue seamlessly.
  if (state.isRunning && state.startTimestamp) {
    startRenderLoop();
  }
}

function syncInputsFromState() {
  sessionLabelInput.value = state.currentLabel;
  modeSelect.value = state.mode;
}

// ---------- Rendering ----------
function render() {
  const elapsed = getElapsedMs();

  if (state.mode === "pomodoro") {
    const remaining = Math.max(state.phaseDurationMs - elapsed, 0);
    timerDisplay.textContent = formatDuration(remaining);
  } else {
    timerDisplay.textContent = formatDuration(elapsed);
  }

  updateStatusText();
  updateTodayTotal();
  renderSessionHistory();
  updatePhaseUI();
}

function updateStatusText() {
  if (state.mode === "pomodoro") {
    if (state.isRunning) {
      statusText.textContent = `${capitalize(state.pomodoroPhase)} phase running`;
    } else {
      statusText.textContent = `Paused (${capitalize(state.pomodoroPhase)} phase)`;
    }
    return;
  }

  if (state.isRunning) {
    statusText.textContent = "Working...";
  } else if (state.accumulatedMs > 0) {
    statusText.textContent = "Paused";
  } else {
    statusText.textContent = "Ready";
  }
}

function renderSessionHistory() {
  sessionList.innerHTML = "";

  if (state.sessions.length === 0) {
    const empty = document.createElement("li");
    empty.className = "empty-state";
    empty.textContent = "No sessions saved yet.";
    sessionList.appendChild(empty);
    return;
  }

  state.sessions.forEach((session) => {
    const li = document.createElement("li");
    li.className = "session-item";

    const start = new Date(session.startTime);
    const end = new Date(session.endTime);

    li.innerHTML = `
      <div class="session-top">
        <span class="session-label">${escapeHtml(session.label)}</span>
        <strong>${formatDuration(session.durationMs)}</strong>
      </div>
      <div class="session-meta">
        ${formatDateTime(start)} → ${formatDateTime(end)}
      </div>
    `;

    sessionList.appendChild(li);
  });
}

function updateTodayTotal() {
  const totalMs = getTodayWorkedMs();
  todayTotal.textContent = formatDuration(totalMs);
}

// ---------- Helpers ----------
function getTodayWorkedMs() {
  const todayKey = getLocalDateKey(new Date());

  return state.sessions.reduce((sum, session) => {
    const sessionDate = getLocalDateKey(new Date(session.endTime));
    return sessionDate === todayKey ? sum + session.durationMs : sum;
  }, 0);
}

function formatDuration(ms) {
  const totalSeconds = Math.floor(ms / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return [hours, minutes, seconds].map(pad2).join(":");
}

function pad2(value) {
  return String(value).padStart(2, "0");
}

function formatDateTime(date) {
  return date.toLocaleString([], {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit"
  });
}

function getLocalDateKey(date) {
  const year = date.getFullYear();
  const month = pad2(date.getMonth() + 1);
  const day = pad2(date.getDate());
  return `${year}-${month}-${day}`;
}

function capitalize(text) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

function escapeHtml(value) {
  const div = document.createElement("div");
  div.textContent = value;
  return div.innerHTML;
}

// ---------- Notifications / Sound ----------
function requestNotificationPermission() {
  if (!("Notification" in window)) return;
  if (Notification.permission === "default") {
    Notification.requestPermission().catch(() => {});
  }
}

function notifyUser(title, body) {
  if ("Notification" in window && Notification.permission === "granted") {
    new Notification(title, { body });
  }
}

function playBeep() {
  // Lightweight beep using Web Audio API
  try {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return;

    const audioCtx = new AudioContextClass();
    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();

    oscillator.type = "sine";
    oscillator.frequency.setValueAtTime(880, audioCtx.currentTime);

    gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime);

    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    oscillator.start();
    oscillator.stop(audioCtx.currentTime + 0.2);

    oscillator.onended = () => {
      audioCtx.close();
    };
  } catch (error) {
    console.warn("Audio beep failed:", error);
  }
}

// ---------- Start App ----------
init();