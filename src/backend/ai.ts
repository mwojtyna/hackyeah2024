import { Ollama } from "ollama";

const ollama = new Ollama({ host: "http://hy24.plasny.one:80" });
const CONFIG = {
    model: "llama3.2",
};

export async function evaluate_urls(prompt: string, urls: string[]): Promise<string[]> {
    try {
        const evaluate_urls_prompt = (await import(`./prompts/url_evaluation.md?raw`)).default;
        const response = await ollama.chat({
            ...CONFIG,
            format: "json",
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
            ]
        })

        return JSON.parse(response.message.content).urls;
    } catch (e) {
        console.log("error", e);
        return [];
    }
}

export async function website_search_summary(prompt: string, website: string): Promise<string> {
    try {
        const recipe = (await import(`./prompts/website_search_summary.md?raw`)).default
        const response = await ollama.chat({
            ...CONFIG,
            messages: [
                {
                    role: 'system',
                    content: recipe
                },
                {
                    role: 'user',
                    content: JSON.stringify({
                        prompt,
                        website
                    })
                }
            ]
        })

        return response.message.content
    } catch  (e){
        console.log('error', e)
        return ""
    }
}
export async function extract_info_json(prompt: string, text: string): Promise<string[]> {
    try {
        const recipe = (await import(`./prompts/extract_info_json.md?raw`)).default
        console.log('recipe', recipe)
        const response = await ollama.chat({
            ...CONFIG,
            format: "json",
            messages: [
                {
                    role: 'system',
                    content: recipe
                },
                {
                    role: 'user',
                    content: JSON.stringify({
                        prompt,
                        text
                    })
                }
            ]
        })

        return JSON.parse(response.message.content).results
    } catch  (e){
        console.log('error', e)
        return []
    }
}
