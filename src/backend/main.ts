import { app, BrowserWindow, ipcMain, WebContentsView, BaseWindow } from "electron";
import path from "path";

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require("electron-squirrel-startup")) {
    app.quit();
}

const WIDTH = 1420;
const HEIGHT = 800;
const UI_HORI_SIZE = 500;
const UI_VERT_SIZE = 300;

function createWindow() {
    // Create the browser window.
    const mainWindow = new BrowserWindow({
        width: WIDTH,
        height: HEIGHT,
    });

    const uiView = new WebContentsView({
        webPreferences: {
            preload: path.join(__dirname, "preload.js"),
        },
    });
    mainWindow.contentView.addChildView(uiView);
    if (landscape(mainWindow, UI_HORI_SIZE)) {
        uiView.setBounds({
            x: 0,
            y: 0,
            width: UI_HORI_SIZE,
            height: mainWindow.getSize()[1],
        });
    } else {
        uiView.setBounds({
            x: 0,
            y: mainWindow.getSize()[1] - UI_VERT_SIZE,
            width: mainWindow.getSize()[0],
            height: UI_VERT_SIZE,
        });
    }
    mainWindow.on("resize", () => {
        if (landscape(mainWindow, UI_HORI_SIZE)) {
            uiView.setBounds({
                x: 0,
                y: 0,
                width: UI_HORI_SIZE,
                height: mainWindow.getSize()[1],
            });
        } else {
            uiView.setBounds({
                x: 0,
                y: mainWindow.getSize()[1] - UI_VERT_SIZE,
                width: mainWindow.getSize()[0],
                height: UI_VERT_SIZE,
            });
        }
    });

    // and load the index.html of the app.
    // @ts-expect-error missing types for env
    if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
        // @ts-expect-error missing types for env
        uiView.webContents.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
    } else {
        mainWindow.loadFile(
            // @ts-expect-error missing types for env
            path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`),
        );
    }

    const embedView = new WebContentsView();
    mainWindow.contentView.addChildView(embedView);
    embedView.webContents.loadURL("https://google.pl");
    if (landscape(mainWindow, UI_HORI_SIZE)) {
        embedView.setBounds({
            x: UI_HORI_SIZE,
            y: 0,
            width: mainWindow.getSize()[0] - UI_HORI_SIZE,
            height: mainWindow.getSize()[1],
        });
    } else {
        embedView.setBounds({
            x: 0,
            y: 0,
            width: mainWindow.getSize()[0],
            height: mainWindow.getSize()[1] - UI_VERT_SIZE,
        });
    }
    mainWindow.on("resize", () => {
        if (landscape(mainWindow, UI_HORI_SIZE)) {
            embedView.setBounds({
                x: UI_HORI_SIZE,
                y: 0,
                width: mainWindow.getSize()[0] - UI_HORI_SIZE,
                height: mainWindow.getSize()[1],
            });
        } else {
            embedView.setBounds({
                x: 0,
                y: 0,
                width: mainWindow.getSize()[0],
                height: mainWindow.getSize()[1] - UI_VERT_SIZE,
            });
        }
    });

    // Open the DevTools.
    uiView.webContents.openDevTools({ mode: "detach" });
    // embedView.webContents.openDevTools({ mode: "detach" });

    function landscape(window: BaseWindow, uiSize: number): boolean {
        return uiSize < window.getSize()[0] / 2;
    }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", () => {
    createWindow();
    ipcMain.on("send-initial-url", (_, a0) => {
        const title = a0 as string;
    });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
    app.quit();
});

app.on("activate", () => {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
