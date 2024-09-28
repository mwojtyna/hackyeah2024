import { State } from "../../types/state";

export function Chat({
    state,
    updateState,
}: {
    state: State;
    updateState: React.Dispatch<React.SetStateAction<State>>;
}) {
    return (
        <div className="w-screen h-screen flex flex-col justify-center items-center">
            <div className="m-auto">
                chat
            </div>
        </div>
    );
}
