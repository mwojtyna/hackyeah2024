/**
 * This file will automatically be loaded by vite and run in the "renderer" context.
 * To learn more about the differences between the "main" and the "renderer" context in
 * Electron, visit:
 *
 * https://electronjs.org/docs/tutorial/application-architecture#main-and-renderer-processes
 *
 * By default, Node.js integration in this file is disabled. When enabling Node.js integration
 * in a renderer process, please be aware of potential security implications. You can read
 * more about security risks here:
 *
 * https://electronjs.org/docs/tutorial/security
 *
 * To enable Node.js integration in this file, open up `main.ts` and enable the `nodeIntegration`
 * flag:
 *
 * ```
 *  // Create the browser window.
 *  mainWindow = new BrowserWindow({
 *    width: 800,
 *    height: 600,
 *    webPreferences: {
 *      nodeIntegration: true
 *    }
 *  });
 * ```
 */

import { extract_info_json, website_search_summary } from "../../src/backend/ai";
import "./globals.css";
import "./root.tsx";

console.log('👋 This message is being logged by "renderer.ts", included via Vite');

(async () => {
const tmp = (await import(`../../tmp?raw`)).default
console.log("tehtueh", tmp)
const res1 = await website_search_summary("find me a contact info", tmp)
console.log("res1", res1);
const res2 = await extract_info_json("find me a contact info", res1)
console.log("res2", res2);
})()

