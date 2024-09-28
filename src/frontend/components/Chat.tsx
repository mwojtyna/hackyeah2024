import { useMutation } from "@tanstack/react-query";
import { CornerDownLeft, Mic, Paperclip } from "lucide-react";
import { useState } from "react";
import { State } from "@/types/state";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

export function Chat({
    state,
    updateState,
}: {
    state: State;
    updateState: React.Dispatch<React.SetStateAction<State>>;
}) {
    const [input, setInput] = useState("");
    const mutation = useMutation({
        mutationFn: (msg: string) =>
            new Promise(() => {
                console.log("mutation");
            }),
        onMutate: () => {
            console.log("onmutation");
        },
    });

    return (
        <div className="flex h-full w-full flex-col p-4 gap-4 justify-between">
            <div>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas tristique commodo
                semper. Nam cursus in quam quis interdum. Curabitur malesuada sem lacus, in
                porttitor ex feugiat consequat. Phasellus ipsum diam, ullamcorper eget augue ac,
                faucibus aliquam risus. Nam mollis sodales quam et mattis. Integer orci diam,
                pulvinar sed dolor id, lobortis dapibus magna. Praesent sed lorem ipsum.
                Pellentesque rhoncus ex sed lacus auctor eleifend eu eget velit. Cras ac massa nec
                erat aliquam feugiat ac non est. In lobortis tincidunt mattis. Sed vitae augue eu
                quam facilisis sollicitudin in id arcu. Nulla elementum turpis nec mi eleifend
                commodo. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per
                inceptos himenaeos. Quisque feugiat tristique laoreet.
            </div>

            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    mutation.mutate(input);
                }}
                className="mb-7 overflow-hidden rounded-lg border bg-background focus-within:ring-1 focus-within:ring-ring"
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
                            mutation.mutate(input);
                        }
                    }}
                    onChange={(e) => setInput(e.currentTarget.value)}
                />
                <div className="flex items-center p-2 pt-0">
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button variant="ghost" size="icon">
                                <Paperclip className="size-4" />
                                <span className="sr-only">Attach file</span>
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent side="top">Attach File</TooltipContent>
                    </Tooltip>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button variant="ghost" size="icon">
                                <Mic className="size-4" />
                                <span className="sr-only">Use Microphone</span>
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent side="top">Use Microphone</TooltipContent>
                    </Tooltip>
                    <Button type="submit" size="sm" className="ml-auto gap-1.5">
                        Send Message
                        <CornerDownLeft className="size-3.5" />
                    </Button>
                </div>
            </form>
        </div>
    );
}
