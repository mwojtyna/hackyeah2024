import { State } from "@/types/state";
import { LoaderCircle } from "lucide-react";

export function Loading({
    state,
    updateState,
}: {
    state: State;
    updateState: React.Dispatch<React.SetStateAction<State>>;
}) {
    window.api.onUrlLoaded(() => {
        updateState({ ...state, currentView: "chatWithWebPage" });
    });
    return (
        <div className="w-screen h-screen flex flex-col justify-center items-center">
            <div className="m-auto">
                <LoaderCircle className="animate-spin" size={48} />
            </div>
        </div>
    );
}
