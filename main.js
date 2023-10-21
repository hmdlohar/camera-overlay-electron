const {
  app,
  BrowserWindow,
  globalShortcut,
  ipcRenderer,
  ipcMain,
} = require("electron");
const WindowPosition = require("electron-window-position");

const createWindow = () => {
  var position = new WindowPosition();

  //   console.log(position, position.display);
  //   position.display;
  let height = Math.floor(position.display.bounds.height * 0.35);
  let width = Math.floor(position.display.bounds.height * 0.35);
  const win = new BrowserWindow({
    width,
    height,
    x: 10,
    // y:10,
    // x: position.display.bounds.width - 230,
    y: position.display.bounds.height - height,
    title: "Daily",
    webPreferences: {
      // The path to our aforementioned preload script!
      nodeIntegration: true,
      devTools: true,
      contextIsolation: false,
    },
    // Remove the default frame around the window
    frame: false,
    // Hide Electron’s default menu
    autoHideMenuBar: true,
    transparent: true,
    // Do not display our app in the task bar
    // (It will live in the system tray!)
    skipTaskbar: true,
    hasShadow: false,
    // Don't show the window until the user is in a call.
    // show: false,
  });

  // win.webContents.openDevTools();

  win.setIgnoreMouseEvents(true, { forward: true });
  win.setVisibleOnAllWorkspaces(true, { visibleOnFullScreen: true });

  let level = "normal";
  // Mac OS requires a different level for our drag/drop and overlay
  // functionality to work as expected.
  if (process.platform === "darwin") {
    level = "floating";
  }
  win.setAlwaysOnTop(true, level);

  win.loadFile("index.html");

  globalShortcut.register("Alt+CommandOrControl+Up", () => {
    win.setFullScreen(true);
    win.setIgnoreMouseEvents(false, { forward: false });
    win.webContents.send("maximize", "max is sent");
  });
  globalShortcut.register("Alt+CommandOrControl+Down", () => {
    win.setFullScreen(false);
    win.setIgnoreMouseEvents(true, { forward: true });
    win.setSize(width, height, true);
    win.webContents.send("restore", "max is sent");
  });
  globalShortcut.register("Alt+CommandOrControl+num1", () => {
    win.setFullScreen(false);
    win.setIgnoreMouseEvents(true, { forward: true });
    win.setSize(width, height, true);
    win.setPosition(10, position.display.bounds.height - height);
    win.webContents.send("restore");
  });
  globalShortcut.register("Alt+CommandOrControl+num3", () => {
    win.setFullScreen(false);
    win.setIgnoreMouseEvents(true, { forward: true });
    win.setSize(width, height, true);
    win.setPosition(
      position.display.bounds.width - width,
      position.display.bounds.height - height
    );
    win.webContents.send("restore");
  });
  globalShortcut.register("Alt+CommandOrControl+num7", () => {
    win.setFullScreen(false);
    win.setIgnoreMouseEvents(true, { forward: true });
    win.setSize(width, height, true);
    win.setPosition(10, 10);
    win.webContents.send("restore");
  });
  globalShortcut.register("Alt+CommandOrControl+num9", () => {
    win.setFullScreen(false);
    win.setIgnoreMouseEvents(true, { forward: true });
    win.setSize(width, height, true);
    win.setPosition(position.display.bounds.width - width, 10);
    win.webContents.send("restore");
  });
  globalShortcut.register("Alt+CommandOrControl+num4", () => {
    win.setFullScreen(false);
    win.setIgnoreMouseEvents(true, { forward: true });
    win.setPosition(10, position.display.bounds.height / 2 - height);
    win.setSize(width*2, height*2, true);
    win.webContents.send("noOpacity");
  });
  globalShortcut.register("Alt+CommandOrControl+num6", () => {
    win.setFullScreen(false);
    win.setIgnoreMouseEvents(true, { forward: true });
    win.setPosition(
      position.display.bounds.width - (width*2),
      position.display.bounds.height / 2 - (height)
    );
    win.setSize(width*2, height*2, true);
    win.webContents.send("noOpacity");
  });
  globalShortcut.register("Alt+CommandOrControl+num5", () => {
    win.setFullScreen(false);
    win.setIgnoreMouseEvents(true, { forward: true });
    win.setPosition(
      position.display.bounds.width / 2 - width,
      position.display.bounds.height / 2 - height
    );
    win.setSize(width*2, height*2, true);
    win.webContents.send("noOpacity");
  });
  globalShortcut.register("Alt+CommandOrControl+num8", () => {
    win.webContents.send("setOpacity", 1);
  });
  globalShortcut.register("Alt+CommandOrControl+num2", () => {
    win.webContents.send("setOpacity", 0.8);
  });
};

app.whenReady().then(() => {
  createWindow();
});
