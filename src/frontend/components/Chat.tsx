import { useMutation } from "@tanstack/react-query";
import { CornerDownLeft, LoaderCircle, Mic } from "lucide-react";
import { useEffect, useState } from "react";
import { State } from "@/types/state";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { cn } from "../utils";
import { Layout } from "@/types/shared";

type ChatMessage = {
    message: React.ReactNode;
    sender: "user" | "ai";
};

function ChatBubble({ message, sender }: ChatMessage) {
    return (
        <div
            className={cn(
                "px-4 py-2 text-white rounded-lg whitespace-pre-line",
                sender === "user" ? "bg-gray-600" : "bg-stone-900",
                sender === "user" ? "ml-auto" : "mr-auto",
            )}
        >
            <p>{message}</p>
        </div>
    );
}

function DotsLoading() {
    return (
        <div>
            {Array(3)
                .fill(undefined)
                .map((_, i) => (
                    <span
                        className="inline-block animate-bounce h-3"
                        style={{ animationDelay: `${i * 50}ms` }}
                    >
                        .
                    </span>
                ))}
        </div>
    );
}

export function Chat({
    state,
    updateState,
}: {
    state: State;
    updateState: React.Dispatch<React.SetStateAction<State>>;
}) {
    const [layout, setLayout] = useState<Layout>("landscape");
    useEffect(() => {
        window.api.onLayoutChange((newLayout) => setLayout(newLayout));
        return () => window.api.onLayoutChange(() => {});
    }, []);

    const [input, setInput] = useState("");
    const [bubbles, setBubbles] = useState<ChatMessage[]>([]);
    const mutation = useMutation({
        mutationFn: async (msg: string) => {
            setInput("");
            setBubbles((bubbles) => [...bubbles, { message: msg, sender: "user" }]);
            return window.api.sendChatMessage(msg);
        },
        onSuccess: (res) => {
            setBubbles((bubbles) => [...bubbles, { message: res, sender: "ai" }]);
        },
    });

    return (
        <div
            className={cn(
                "flex h-full w-full flex-col p-4 justify-between",
                layout == "landscape" ? "border-r" : "border-t",
            )}
        >
            <div className="flex flex-col max-h-[80%] gap-4 overflow-auto">
                {bubbles.map((bubble, i) => (
                    <ChatBubble key={i} message={bubble.message} sender={bubble.sender} />
                ))}

                {mutation.isPending && <ChatBubble message={<DotsLoading />} sender={"ai"} />}
            </div>

            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    if (input.trim() !== "") {
                        mutation.mutate(input);
                    }
                }}
                className="overflow-hidden rounded-lg border bg-background focus-within:ring-1 focus-within:ring-ring"
            >
                <Label htmlFor="message" className="sr-only">
                    Message
                </Label>
                <Textarea
                    id="message"
                    placeholder="Type your message here..."
                    className="min-h-12 resize-none border-0 p-3 shadow-none focus-visible:ring-0"
                    value={input}
                    onKeyDown={(e) => {
                        if (e.key == "Enter" && !e.shiftKey) {
                            e.preventDefault();
                            if (input.trim() !== "" && !mutation.isPending) {
                                mutation.mutate(input);
                            }
                        }
                    }}
                    onChange={(e) => setInput(e.currentTarget.value)}
                />
                <div className="flex items-center p-2 pt-0">
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button variant="ghost" size="icon">
                                <Mic className="size-4" />
                                <span className="sr-only">Use Microphone</span>
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent side="top">Use Microphone</TooltipContent>
                    </Tooltip>
                    <Button
                        type="submit"
                        size="sm"
                        className="ml-auto gap-1.5 disabled:opacity-50"
                        disabled={mutation.isPending}
                    >
                        Send Message
                        <CornerDownLeft className="size-3.5" />
                    </Button>
                </div>
            </form>
        </div>
    );
}
