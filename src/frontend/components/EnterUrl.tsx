import { Search, Settings } from "lucide-react";
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
        let url = inputRef.current.value;
        if (!url.startsWith("https://") && !url.startsWith("http://")) {
            url = "https://" + url;
        }
        state.currentView = "loading";
        updateState({ ...state });
        window.api.sendInitialUrl(url);
    }, []);

    return (
        <div className="w-screen h-screen flex flex-col justify-center items-center">
            <Button
                className="absolute left-4 top-4 size-10 p-3"
                onClick={() => {
                    state.currentView = "settings";
                    updateState({ ...state });
                }}
            >
                <Settings size={32} />
            </Button>
            <h1 className="mx-auto text-5xl font-bold">Better Web</h1>
            <div className="mx-auto flex gap-4 mt-8">
                <Input
                    className="h-12 min-w-[400px] text-xl rounded-md p-2 border-2"
                    ref={inputRef}
                    onKeyDown={(e) => {
                        if (e.key == "Enter") {
                            submitCb();
                        }
                    }}
                    placeholder="https://google.com"
                />
                <Button className="size-12 p-3" onClick={submitCb}>
                    <Search size={32} />
                </Button>
            </div>
        </div>
    );
}
