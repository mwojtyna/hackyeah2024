// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("api", {
    sendInitialUrl: (url: string) => ipcRenderer.send("send-initial-url", url),
    onUrlLoaded: (callback: () => void) => ipcRenderer.on("url-loaded", callback),
});

// Add type definitions here
declare global {
    interface Window {
        api: {
            sendInitialUrl: (url: string) => void;
            onUrlLoaded: (callback: () => void) => void;
        };
    }
}
