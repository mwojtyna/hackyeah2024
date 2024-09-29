import { Layout } from "@/types/shared";
import { app, BrowserWindow, ipcMain, WebContentsView } from "electron";
import { extract_info_json, website_search_summary } from "@/backend/ai";
import path from "path";
import { State } from "../types/state";

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require("electron-squirrel-startup")) {
    app.quit();
}

const WIDTH = 1420;
const HEIGHT = 800;
const UI_HORI_SIZE = 500;
const UI_VERT_SIZE = 400;

const frontendState = new State();
let layout: Layout = "landscape";

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
        width: mainWindow.getContentSize()[0],
        height: mainWindow.getContentSize()[1],
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
                    width: mainWindow.getContentSize()[0],
                    height: mainWindow.getContentSize()[1],
                });
                break;
            }
        }
    });
    embedView.webContents.on("did-navigate", () => {
        uiView.webContents.send("url-changed", embedView.webContents.getURL());
    });

    // Open the DevTools.
    if (process.env.NODE_ENV !== "Release" && !process.env.PROD) {
        uiView.webContents.openDevTools({ mode: "detach" });
        embedView.webContents.openDevTools({ mode: "detach" });
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
    if (UI_HORI_SIZE < mainWindow.getContentSize()[0] / 2) {
        embedView.setBounds({
            x: UI_HORI_SIZE,
            y: 0,
            width: mainWindow.getContentSize()[0] - UI_HORI_SIZE,
            height: mainWindow.getContentSize()[1],
        });
        uiView.setBounds({
            x: 0,
            y: 0,
            width: UI_HORI_SIZE,
            height: mainWindow.getContentSize()[1],
        });
        if (layout == "portrait") {
            layout = "landscape";
            uiView.webContents.send("layout-change", layout);
        }
    } else {
        embedView.setBounds({
            x: 0,
            y: 0,
            width: mainWindow.getContentSize()[0],
            height: mainWindow.getContentSize()[1] - UI_VERT_SIZE,
        });
        uiView.setBounds({
            x: 0,
            y: mainWindow.getContentSize()[1] - UI_VERT_SIZE,
            width: mainWindow.getContentSize()[0],
            height: UI_VERT_SIZE,
        });
        if (layout == "landscape") {
            layout = "portrait";
            uiView.webContents.send("layout-change", layout);
        }
    }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", () => {
    const { mainWindow, uiView, embedView } = createWindow();
    ipcMain.on("send-initial-url", (_, url: string) => {
        uiView.setBounds({ x: 0, y: 0, width: 0, height: 0 });
        embedView.setBounds({
            x: 0,
            y: 0,
            width: mainWindow.getContentSize()[0],
            height: mainWindow.getContentSize()[1],
        });
        embedView.webContents.loadURL(url);
        embedView.webContents.insertCSS(`
            .highlight {
                background: rgba(252, 232, 180, 0.5);
            }
            *:has(> .highlight) {
                border: 4px solid yellow;
            }
        `);
        embedView.webContents.on("dom-ready", async () => {
            const highlightScript = (await import("./highlight.js?raw")).default;
            embedView.webContents.executeJavaScript(highlightScript);
            uiView.webContents.send("url-loaded");
            uiView.webContents.send("url-changed", embedView.webContents.getURL());
        });
        layoutViews(mainWindow, uiView, embedView);
        frontendState.currentView = "chatWithWebPage";
    });
    ipcMain.on("find-text", (_, text) => {
        const t1 = text.toString().replace(/'/g, "\\'").toLowerCase();
        embedView.webContents.executeJavaScript(`highlight(document.body, '${t1}')`);
    });
    ipcMain.on("send-chat-message", async (_, prompt: string) => {
        console.log("send-chat-message");
        const websiteText =
            await embedView.webContents.executeJavaScript("document.body.innerText");
        const generator = await website_search_summary(prompt, websiteText);

        console.log("send-chat-message response begin");
        for await (const chunk of generator) {
            uiView.webContents.send("chat-message-chunk", chunk);
        }
        console.log("send-chat-message response finished");
        uiView.webContents.send("chat-message-end");

        // console.log(res1);
        //const res2 = await extract_info_json("find me a contact info for a mentor support", res1)
        //console.log("res2", res2);
    });
    ipcMain.on("go-back", () => {
        embedView.webContents.navigationHistory.goBack();
        uiView.webContents.send("url-changed", embedView.webContents.getURL());
    });
    ipcMain.on("go-forward", () => {
        embedView.webContents.navigationHistory.goForward();
        uiView.webContents.send("url-changed", embedView.webContents.getURL());
    });
    ipcMain.on("reload", () => {
        embedView.webContents.reloadIgnoringCache();
    });
    ipcMain.on("change-url", (_, url: string) => {
        embedView.webContents.loadURL(url);
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
