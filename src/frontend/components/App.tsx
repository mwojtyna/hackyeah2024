import { TooltipProvider } from "@radix-ui/react-tooltip";
import { Router } from "./Router";

export function App() {
    return (
        <TooltipProvider>
            <Router />
        </TooltipProvider>
    );
}
