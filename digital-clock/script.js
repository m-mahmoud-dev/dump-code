function updateClock() {
  const now = new Date();

  let hours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();

  const ampm = hours >= 12 ? "PM" : "AM";

  hours = hours % 12;
  hours = hours ? hours : 12;

  document.getElementById("hours").textContent =
    String(hours).padStart(2, "0");

  document.getElementById("minutes").textContent =
    String(minutes).padStart(2, "0");

  document.getElementById("seconds").textContent =
    String(seconds).padStart(2, "0");

  document.getElementById("ampm").textContent = ampm;

  const options = {
    weekday: "long",
    month: "long",
    day: "numeric",
  };

  document.getElementById("date").textContent =
    now.toLocaleDateString("en-US", options);
}

setInterval(updateClock, 1000);
updateClock();

/* Fullscreen Shortcut */

document.addEventListener("keydown", (e) => {
  if (e.key.toLowerCase() === "f") {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  }
});