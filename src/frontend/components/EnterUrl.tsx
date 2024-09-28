import React, { useRef } from "react"
import { State } from "../../types/State"


export function EnterUrlScreen({ state, updateState }: { state: State, updateState: React.Dispatch<React.SetStateAction<State>> }) {
    const inputRef = useRef<HTMLInputElement | null>(null)
    return (
        <div className="w-screen h-screen flex flex-col justify-center items-center">
            <h1 className="mx-auto text-6xl font-bold">Better Web</h1>
            <div className="mx-auto flex gap-4 mt-8">
                <input
                    className="h-16 min-w-64 text-4xl rounded-md p-2 border border-black border-2"
                    ref={inputRef}
                    onKeyDown={(e) => {
                        if (e.key == 'Enter') {
                            try {
                                state.webPageURL = new URL(e.currentTarget.value)
                            } catch {
                                console.error('wrong url')
                            }
                            updateState({ ...state })
                        }
                    }}
                    placeholder="https://google.com"
                />
                <button
                    className="h-16 w-16 rounded-md border border-black border-2"
                    onClick={() => {
                        try {
                            state.webPageURL = new URL(inputRef.current.value)
                        } catch {
                            console.error('wrong url')
                        }
                        updateState({ ...state })
                    }}
                >ENT</button>
            </div>
        </div>
    )
}
