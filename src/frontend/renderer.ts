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

import "./globals.css";
import "./root.tsx";

console.log('👋 This message is being logged by "renderer.ts", included via Vite');

evaluate_urls("test", [
    "https://hackyeah.pl/",
    "https://hackyeah.pl/faq/",
    "https://hackyeah.pl/tasks-prizes/",
    "https://hackyeah.pl/justctf/",
    "https://hackyeah.pl/she-hacks/",
    "https://hackyeah.pl/conference-2024/",
    "https://hackyeah.pl/job-board/",
    "https://hackyeah.pl/media-kit/",
    "https://hackyeah.pl/wp-content/uploads/2024/02/HackYeah-2024-Rules-ENPL.pdf",
    "https://hackyeah.pl/wp-content/uploads/2024/02/HackYeah-2024-Privacy-Policy-ENPL.pdf",
    "https://hackyeah.pl/pl/",
    "https://hackyeah.pl/bio_mentor_2024/",
    "https://hackyeah.pl/mentors-2024/",
    "https://hackyeah.pl/pl/faq/",
    "https://hackyeah.pl/become-a-mentor/",
    "https://hackyeah.pl/become-a-speaker/",
    "https://hackyeah.pl/pl/zadania-nagrody/",
    "https://hackyeah.pl/pl/justctf/",
    "https://hackyeah.pl/pl/she-hacks/",
    "https://hackyeah.pl/pl/konferencja-2024/",
    "https://hackyeah.pl/pl/job-board/",
    "https://hackyeah.pl/pl/media-kit/",
    "https://hackyeah.pl/pl/become-a-mentor/",
    "https://hackyeah.pl/pl/zostan-prelegentem/",
]).then((urls) => {
    console.log("urls", urls);
});
