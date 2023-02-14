let opacity = parseFloat(localStorage.opacity || "0.8");
document.querySelector("#videoElement").style.opacity = opacity;
const { ipcRenderer } = require("electron");
ipcRenderer.on("maximize", () => {
  console.log("on max");
  document.querySelector("#container").style.borderRadius = "0";
  document.querySelector("#videoElement").style.opacity = 1;
  document.querySelector("#container").style.background = "white";
});

ipcRenderer.on("restore", () => {
  console.log("on max");
  document.querySelector("#container").style.borderRadius = "100%";
  document.querySelector("#videoElement").style.opacity = opacity;
  document.querySelector("#container").style.background = "transparent";
});

ipcRenderer.on("noOpacity", () => {
  document.querySelector("#videoElement").style.opacity = 1;
});

ipcRenderer.on("setOpacity", (data, d2) => {
  if (d2 === 1 && opacity < 1) {
    opacity += 0.1;
  } else if (opacity > 0) {
    opacity -= 0.1;
  }
  document.querySelector("#videoElement").style.opacity = opacity;
  localStorage.opacity = opacity;
});
