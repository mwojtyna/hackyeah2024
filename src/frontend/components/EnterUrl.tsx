import { Search } from "lucide-react";
import React, { useCallback, useRef } from "react";
import { State } from "../../types/state";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export function EnterUrlScreen({
    state,
    updateState,
}: {
    state: State;
    updateState: React.Dispatch<React.SetStateAction<State>>;
}) {
    const inputRef = useRef<HTMLInputElement | null>(null);
    const submitCb = useCallback(() => {
        try {
            state.webPageURL = new URL(inputRef.current.value);
        } catch {
            console.error("wrong url");
        }
        updateState({ ...state });
        window.api.sendInitialUrl(state.webPageURL.toString());
    }, []);

    return (
        <div className="w-screen h-screen flex flex-col justify-center items-center">
            <h1 className="mx-auto text-6xl font-bold">Better Web</h1>
            <div className="mx-auto flex gap-4 mt-8">
                <Input
                    className="h-16 min-w-64 text-3xl rounded-md p-2 border-2"
                    ref={inputRef}
                    onKeyDown={(e) => {
                        if (e.key == "Enter") {
                            submitCb();
                        }
                    }}
                    placeholder="https://google.com"
                />
                <Button className="h-16 w-16" onClick={submitCb}>
                    <Search size={32} />
                </Button>
            </div>
        </div>
    );
}
