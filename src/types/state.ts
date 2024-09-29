export class State {
    currentView: "enterURL" | "loading" | "chatWithWebPage" | "settings" = "enterURL";
    ollamaURL: URL = new URL("http://hy24.plasny.one");
    model: string = "llama3.2";
    webPageURL: URL = null;
}
