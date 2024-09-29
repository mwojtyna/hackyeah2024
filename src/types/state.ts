export class State {
    currentView: "enterURL" | "loading" | "chatWithWebPage" | "settings" = "enterURL";
    ollamaURL: string = "http://hy24.plasny.one";
    model: string = "llama3.2";
}
