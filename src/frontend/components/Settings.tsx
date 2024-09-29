import { Link, XIcon } from "lucide-react";
import React, { useCallback, useRef } from "react";
import { State } from "../../types/state";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export function Settings({
    state,
    updateState,
}: {
    state: State;
    updateState: React.Dispatch<React.SetStateAction<State>>;
}) {
    const inputRef = useRef<HTMLInputElement | null>(null);
    const submitCb = useCallback(() => {
        try {
            if (inputRef.current.value) {
                state.ollamaURL = inputRef.current.value;
                window.api.setOllamaURL(inputRef.current.value);
                updateState({ ...state });
            }
        } catch {
            console.error("wrong url");
        }
    }, []);

    return (
        <div className="w-screen h-screen flex flex-col justify-center items-center">
            <Button
                className="absolute left-4 top-4 size-10 p-3"
                onClick={() => {
                    state.currentView = "enterURL";
                    updateState({ ...state });
                }}
            >
                <XIcon size={32} />
            </Button>
            <h1 className="text-4xl font-bold">Settigns</h1>
            <div className="mt-8">
                <h2 className="text-xl font-bold">Ollama host url</h2>
                <div className="flex gap-4 mt-1">
                    <Input
                        className="h-12 min-w-[400px] text-xl rounded-md p-2 border-2"
                        placeholder="http://localhost:11343"
                        ref={inputRef}
                        onKeyDown={(e) => {
                            if (e.key == "Enter") {
                                submitCb();
                            }
                        }}
                    />
                    <Button className="size-12 p-3" onClick={submitCb}>
                        <Link size={32} />
                    </Button>
                </div>
            </div>
        </div>
    );
}
