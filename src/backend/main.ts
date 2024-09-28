import { app, BrowserWindow, ipcMain, WebContentsView } from "electron";
import path from "path";
import { State } from "../types/state";

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require("electron-squirrel-startup")) {
    app.quit();
}

const WIDTH = 1420;
const HEIGHT = 800;
const UI_HORI_SIZE = 500;
const UI_VERT_SIZE = 300;

const frontendState = new State();

function createWindow(): {
    mainWindow: BrowserWindow;
    uiView: WebContentsView;
    embedView: WebContentsView;
} {
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
    uiView.setBounds({
        x: 0,
        y: 0,
        width: mainWindow.getSize()[0],
        height: mainWindow.getSize()[1],
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
    mainWindow.on("resize", () => {
        switch (frontendState.currentView) {
            case "chatWithWebPage": {
                layoutViews(mainWindow, uiView, embedView);
                break;
            }
            case "enterURL": {
                uiView.setBounds({
                    x: 0,
                    y: 0,
                    width: mainWindow.getSize()[0],
                    height: mainWindow.getSize()[1],
                });
                break;
            }
        }
    });

    // Open the DevTools.
    if (process.env.NODE_ENV !== "Release") {
        uiView.webContents.openDevTools({ mode: "detach" });
        //embedView.webContents.openDevTools({ mode: "detach" });
    }

    return {
        mainWindow,
        uiView,
        embedView,
    };
}

function layoutViews(
    mainWindow: BrowserWindow,
    uiView: WebContentsView,
    embedView: WebContentsView,
) {
    if (UI_HORI_SIZE < mainWindow.getSize()[0] / 2) {
        embedView.setBounds({
            x: UI_HORI_SIZE,
            y: 0,
            width: mainWindow.getSize()[0] - UI_HORI_SIZE,
            height: mainWindow.getSize()[1],
        });
        uiView.setBounds({
            x: 0,
            y: 0,
            width: UI_HORI_SIZE,
            height: mainWindow.getSize()[1],
        });
    } else {
        embedView.setBounds({
            x: 0,
            y: 0,
            width: mainWindow.getSize()[0],
            height: mainWindow.getSize()[1] - UI_VERT_SIZE,
        });
        uiView.setBounds({
            x: 0,
            y: mainWindow.getSize()[1] - UI_VERT_SIZE,
            width: mainWindow.getSize()[0],
            height: UI_VERT_SIZE,
        });
    }

    //embedView.webContents.on("did-finish-load", async () => {
    //    embedView.webContents.executeJavaScript(`alert()`)
    //})
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", () => {
    const { mainWindow, uiView, embedView } = createWindow();
    ipcMain.on("send-initial-url", (_, a0) => {
        const url = a0 as string;
        uiView.setBounds({ x: 0, y: 0, width: 0, height: 0 });
        embedView.setBounds({
            x: 0,
            y: 0,
            width: mainWindow.getSize()[0],
            height: mainWindow.getSize()[1],
        });
        embedView.webContents.loadURL(url);
        embedView.webContents.on("dom-ready", () => {
            uiView.webContents.send("url-loaded");
        });
        layoutViews(mainWindow, uiView, embedView);
        frontendState.currentView = "chatWithWebPage";
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
