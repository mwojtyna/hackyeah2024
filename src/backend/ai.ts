import { Ollama } from "ollama";

const ollama = new Ollama({ host: "http://hy24.plasny.one:80" });
const CONFIG = {
    model: "llama3.2",
    format: "json",
};

export async function evaluate_urls(prompt: string, urls: string[]): Promise<string[]> {
    try {
        const evaluate_urls_prompt = (await import(`./prompts/url_evaluation.md?raw`)).default;
        const response = await ollama.chat({
            messages: [
                {
                    role: "system",
                    content: evaluate_urls_prompt,
                },
                {
                    role: "user",
                    content: JSON.stringify({
                        prompt,
                        urls,
                    }),
                },
            ],
            ...CONFIG,
        });

        return JSON.parse(response.message.content).urls;
    } catch (e) {
        console.log("error", e);
        return [];
    }
}
