import { Ollama } from "ollama";

const ollama = new Ollama({ host: "http://hy24.plasny.one:80" });
const CONFIG = {
    model: "llama3.2",
};

async function ask(recipe: string, prompt: string, json = false) {
    return (await ollama.chat({
        ...CONFIG,
        format: json ? "json" : "text",
        messages: [
            {
                role: "system",
                content: recipe,
            },
            {
                role: "user",
                content: prompt,
            },
        ]
    })).message.content
}

export async function evaluate_urls(prompt: string, urls: string[]): Promise<string[]> {
    const recipe = (await import(`./prompts/url_evaluation.md?raw`)).default;

    const response = await ask(recipe, JSON.stringify({
        prompt,
        urls,
    }), true);

    return JSON.parse(response).urls;
}

export async function improve_user_request(request: string): Promise<string> {
    const recipe = (await import(`./prompts/improve_user_request.md?raw`)).default

    return await ask(recipe, request)
}

export async function website_search_summary(prompt: string, website: string): Promise<string> {
    const recipe = (await import(`./prompts/website_search_summary.md?raw`)).default

    return await ask(recipe, JSON.stringify({
        prompt,
        website
    }))
}

export async function extract_info_json(prompt: string, text: string): Promise<string[]> {
    const recipe = (await import(`./prompts/extract_info_json.md?raw`)).default

    const response = await ask(recipe, JSON.stringify({
        prompt,
        text
    }), true);

    return JSON.parse(response).results
}
