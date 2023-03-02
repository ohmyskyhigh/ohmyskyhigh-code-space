import { app, BrowserWindow, shell } from "electron";
import * as path from "path";

const createWindow = (): void => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    height: 600,
    width: 800,
    webPreferences: {
      preload: path.join(__dirname, "../bridge/preload.js"),
    },
  });

  mainWindow.webContents.on("will-navigate", function (e, url) {
    e.preventDefault();
    shell.openExternal(url);
  });

  // and load the index.html of the app.
  if (app.isPackaged) {
    const pathOfBuild = path.join(__dirname, "../dist/index.html");
    console.log(pathOfBuild, ".............................................");

    mainWindow.loadFile(pathOfBuild);
    return;
  }

  mainWindow.loadURL("http://localhost:1133");

  mainWindow.webContents.once("dom-ready", async () => {
    mainWindow.webContents.openDevTools();
  });
};

app.on("ready", createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
