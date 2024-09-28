import { Chat } from "./Chat";
import { EnterUrlScreen } from "./EnterUrl";
import { Loading } from "./Loading";
import { State } from "@/types/state";
import { useState } from "react";

export function App() {
    const [state, setState] = useState(new State());

    switch (state.currentView) {
        case "enterURL":
            return <EnterUrlScreen state={state} updateState={setState} />;
        case "loading":
            return <Loading state={state} updateState={setState} />;
        case "chatWithWebPage":
            return <Chat state={state} updateState={setState} />;
        default:
            return null;
    }
}
