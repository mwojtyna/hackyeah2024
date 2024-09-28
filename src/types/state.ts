export class State {
    currentView: "enterURL" | "loading" | "chatWithWebPage" = "enterURL";
    ollamaURL: URL = new URL("hy24.plasny.one:80");
    webPageURL: URL = null;
}
