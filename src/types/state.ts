export class State {
    currentView: "enterURL" | "chatWithWebPage" = "enterURL";
    ollamaURL: URL = new URL("hy24.plasny.one:80");
    webPageURL: URL = null;
}
