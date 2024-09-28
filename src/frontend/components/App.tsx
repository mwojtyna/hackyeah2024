import { useState } from "react";
import { EnterUrlScreen } from "./EnterUrl";
import { State } from "../../types/State";

export function App() {
    const [state, setState] = useState(new State());

    switch (state.currentView) {
        case 'enterURL':
            return <EnterUrlScreen state={state} updateState={setState} />;
        default:
            return 'nosuchfile'
    }
}
