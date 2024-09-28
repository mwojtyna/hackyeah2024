import { TooltipProvider } from "@radix-ui/react-tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Router } from "./Router";

const queryClient = new QueryClient();

export function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <TooltipProvider>
                <Router />
            </TooltipProvider>
        </QueryClientProvider>
    );
}
