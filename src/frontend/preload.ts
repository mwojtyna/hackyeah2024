// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

import { Layout } from "@/types/shared";
import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("api", {
    sendInitialUrl: (url: string) => ipcRenderer.send("send-initial-url", url),
    onUrlLoaded: (callback: () => void) => ipcRenderer.on("url-loaded", callback),
    onLayoutChange: (callback: (layout: Layout) => void) =>
        ipcRenderer.on("layout-change", (_, layout) => callback(layout)),
    sendChatMessage: (prompt: string) => ipcRenderer.invoke("send-chat-message", prompt),
    selectText: (text: string) => ipcRenderer.send("find-text", text),
});

// Add type definitions here
declare global {
    interface Window {
        api: {
            sendInitialUrl: (url: string) => void;
            onUrlLoaded: (callback: () => void) => void;
            onLayoutChange: (callback: (layout: Layout) => void) => void;
            sendChatMessage: (prompt: string) => Promise<string>;
            selectText: (text: string) => void;
        };
    }
}
