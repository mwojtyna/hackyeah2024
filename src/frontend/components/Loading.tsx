import { State } from "@/types/state";
import { LoaderCircle } from "lucide-react";
import { useEffect } from "react";

export function Loading({
    state,
    updateState,
}: {
    state: State;
    updateState: React.Dispatch<React.SetStateAction<State>>;
}) {
    useEffect(() => {
        window.api.onUrlLoaded(() => updateState({ ...state, currentView: "chatWithWebPage" }));
        return () => window.api.onUrlLoaded(() => {});
    }, []);

    return (
        <div className="w-screen h-screen flex flex-col justify-center items-center">
            <div className="m-auto">
                <LoaderCircle className="animate-spin" size={48} />
            </div>
        </div>
    );
}
