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
  const win = new BrowserWindow({
    width: 400,
    height: 400,
    x: 10,
    // y:10,
    // x: position.display.bounds.width - 400,
    y: position.display.bounds.height - 400,
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
    win.setSize(400, 400, true);
    win.webContents.send("restore", "max is sent");
  });
  globalShortcut.register("Alt+CommandOrControl+num1", () => {
    win.setFullScreen(false);
    win.setIgnoreMouseEvents(true, { forward: true });
    win.setSize(400, 400, true);
    win.setPosition(10, position.display.bounds.height - 400);
    win.webContents.send("restore");
  });
  globalShortcut.register("Alt+CommandOrControl+num3", () => {
    win.setFullScreen(false);
    win.setIgnoreMouseEvents(true, { forward: true });
    win.setSize(400, 400, true);
    win.setPosition(
      position.display.bounds.width - 400,
      position.display.bounds.height - 400
    );
    win.webContents.send("restore");
  });
  globalShortcut.register("Alt+CommandOrControl+num7", () => {
    win.setFullScreen(false);
    win.setIgnoreMouseEvents(true, { forward: true });
    win.setSize(400, 400, true);
    win.setPosition(10, 10);
    win.webContents.send("restore");
  });
  globalShortcut.register("Alt+CommandOrControl+num9", () => {
    win.setFullScreen(false);
    win.setIgnoreMouseEvents(true, { forward: true });
    win.setSize(400, 400, true);
    win.setPosition(position.display.bounds.width - 400, 10);
    win.webContents.send("restore");
  });
  globalShortcut.register("Alt+CommandOrControl+num4", () => {
    win.setFullScreen(false);
    win.setIgnoreMouseEvents(true, { forward: true });
    win.setPosition(10, position.display.bounds.height / 2 - 400);
    win.setSize(800, 800, true);
    win.webContents.send("noOpacity");
  });
  globalShortcut.register("Alt+CommandOrControl+num6", () => {
    win.setFullScreen(false);
    win.setIgnoreMouseEvents(true, { forward: true });
    win.setPosition(
      position.display.bounds.width - 400,
      position.display.bounds.height / 2 - 400
    );
    win.setSize(800, 800, true);
    win.webContents.send("noOpacity");
  });
  globalShortcut.register("Alt+CommandOrControl+num5", () => {
    win.setFullScreen(false);
    win.setIgnoreMouseEvents(true, { forward: true });
    win.setPosition(
      position.display.bounds.width / 2 - 400,
      position.display.bounds.height / 2 - 400
    );
    win.setSize(800, 800, true);
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
