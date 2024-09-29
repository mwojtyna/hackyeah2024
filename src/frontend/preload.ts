// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

import { Layout } from "@/types/shared";
import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("api", {
    sendInitialUrl: (url: string) => ipcRenderer.send("send-initial-url", url),
    onUrlLoaded: (callback: () => void) => ipcRenderer.on("url-loaded", callback),

    onLayoutChange: (callback: (layout: Layout) => void) =>
        ipcRenderer.on("layout-change", (_, layout) => callback(layout)),
    selectText: (text: string) => ipcRenderer.send("find-text", text),
    setOllamaURL: (url: string) => ipcRenderer.send("set-ollama-url", url),

    sendChatMessage: (prompt: string) => ipcRenderer.send("send-chat-message", prompt),
    onChatMessageChunk: (callback: (chunk: string) => void) =>
        ipcRenderer.on("chat-message-chunk", (_, chunk) => callback(chunk)),
    onChatMessageEnd: (callback: () => void) => ipcRenderer.on("chat-message-end", callback),

    goBack: () => ipcRenderer.send("go-back"),
    goForward: () => ipcRenderer.send("go-forward"),
    reload: () => ipcRenderer.send("reload"),
    changeUrl: (url: string) => ipcRenderer.send("change-url", url),
    onUrlChanged: (callback: (url: string) => void) =>
        ipcRenderer.on("url-changed", (_, url) => callback(url)),
});

// Add type definitions here
declare global {
    interface Window {
        api: {
            sendInitialUrl: (url: string) => void;
            onUrlLoaded: (callback: () => void) => void;
            onLayoutChange: (callback: (layout: Layout) => void) => void;
            sendChatMessage: (prompt: string) => void;
            onChatMessageChunk: (callback: (chunk: string) => void) => void;
            onChatMessageEnd: (callback: () => void) => void;
            selectText: (text: string) => void;
            setOllamaURL: (url: string) => void;
            goBack: () => void;
            goForward: () => void;
            reload: () => void;
            changeUrl: (url: string) => void;
            onUrlChanged: (callback: (url: string) => void) => void;
        };
    }
}
