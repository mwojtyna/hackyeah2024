import { ArrowLeft, ArrowRight, RotateCw } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export function Navigation() {
    const [url, setUrl] = useState("");

    useEffect(() => {
        window.api.onUrlChanged((url) => setUrl(url));
        return () => window.api.onUrlChanged(() => {});
    }, []);

    return (
        <div className="mx-auto flex justify-center gap-2 w-full">
            <div className="space-x-1 flex justify-center">
                <Button variant="secondary" className="size-10 p-2" onClick={window.api.goBack}>
                    <ArrowLeft />
                </Button>
                <Button variant="secondary" className="size-10 p-2" onClick={window.api.goForward}>
                    <ArrowRight />
                </Button>
                <Button variant="secondary" className="size-10 p-2" onClick={window.api.reload}>
                    <RotateCw />
                </Button>
            </div>

            <Input
                className="text-base"
                value={url}
                onChange={(e) => setUrl(e.currentTarget.value)}
                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        let url = e.currentTarget.value;
                        if (!url.startsWith("https://") && !url.startsWith("http://")) {
                            url = "https://" + url;
                        }
                        setUrl(url);
                        window.api.changeUrl(url);
                    }
                }}
            />
        </div>
    );
}
