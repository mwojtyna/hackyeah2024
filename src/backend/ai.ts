import { ChatResponse, Ollama } from "ollama";

const ollama = new Ollama({ host: "http://hy24.plasny.one:80" });

async function ask(recipe: string, prompt: string, config: {} = {}) {
    return (
        await ollama.chat({
            model: "llama3.2",
            ...config,
            messages: [
                {
                    role: "system",
                    content: recipe,
                },
                {
                    role: "user",
                    content: prompt,
                },
            ],
        })
    ).message.content;
}

async function* ask_stream(recipe: string, prompt: string, config: {} = {}) {
    const response = await ollama.chat({
        model: "llama3.2",
        stream: true,
        ...config,
        messages: [
            {
                role: "system",
                content: recipe,
            },
            {
                role: "user",
                content: prompt,
            },
        ],
    });

    for await (const part of response) {
        yield part.message.content;
    }
}

export async function evaluate_urls(prompt: string, urls: string[]): Promise<string[]> {
    const recipe = (await import(`./prompts/url_evaluation.md?raw`)).default;

    const response = await ask(
        recipe,
        JSON.stringify({
            prompt,
            urls,
        }),
        { json: true },
    );

    return JSON.parse(response).urls;
}

export async function improve_user_request(request: string): Promise<string> {
    const recipe = (await import(`./prompts/improve_user_request.md?raw`)).default;

    return await ask(recipe, request);
}

export async function website_search_summary(prompt: string, website: string) {
    const recipe = (await import(`./prompts/website_search_summary.md?raw`)).default;

    return ask_stream(
        recipe,
        JSON.stringify({
            prompt,
            website,
        }),
    );
}

export async function extract_info_json(prompt: string, text: string): Promise<string[]> {
    const recipe = (await import(`./prompts/extract_info_json.md?raw`)).default;

    const response = await ask(
        recipe,
        JSON.stringify({
            prompt,
            text,
        }),
        { json: true },
    );

    return JSON.parse(response).results;
}
