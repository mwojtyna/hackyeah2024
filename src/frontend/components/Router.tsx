import { State } from "@/types/state";
import { useState } from "react";
import { Chat } from "./Chat";
import { EnterUrlScreen } from "./EnterUrl";
import { Loading } from "./Loading";
import { Settings } from "./Settings";

export function Router() {
    const [state, setState] = useState(new State());

    switch (state.currentView) {
        case "enterURL":
            return <EnterUrlScreen state={state} updateState={setState} />;
        case "loading":
            return <Loading state={state} updateState={setState} />;
        case "chatWithWebPage":
            return <Chat />;
        case "settings":
            return <Settings state={state} updateState={setState} />;
        default:
            return null;
    }
}
