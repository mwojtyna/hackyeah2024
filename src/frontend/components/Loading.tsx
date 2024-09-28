import { useState } from "react";
import { State } from "../../types/state";

export function Loading({
    state,
    updateState,
}: {
    state: State;
    updateState: React.Dispatch<React.SetStateAction<State>>;
}) {
    window.api.onUrlLoaded(() => {
        state.currentView = "chatWithWebPage"
        updateState({ ...state })
    })
    return (
        <div className="w-screen h-screen flex flex-col justify-center items-center">
            <div className="m-auto">
                loading...
            </div>
        </div>
    );
}
