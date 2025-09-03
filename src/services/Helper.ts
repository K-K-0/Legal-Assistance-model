import axios from 'axios'
import dotenv from 'dotenv'


dotenv.config()

const API_KEY = process.env.API_KEY_ALL


export async function Simplified(text:string) {

    try {
        const response = await axios.post('https://openrouter.ai/api/v1/completions', {
            model: "google/gemini-flash-1.5",
            prompt: `Simplify the following legal text into plain English: ${text}`
        },
        {
            headers: {
                "Authorization": `Bearer ${API_KEY}`,
                "Content-Type": "application/json",
            }
        })

        let output = response.data.choices?.[0].text
        output = output.trim().replace(/^["']|["']$/g, "")
        output = output.replace(/\\n/g, "\n").replace(/\\"/g, '"');

        return output
        
    
        
    } catch (error: any) {
        console.log(API_KEY)

        console.error("❌ Error calling OpenRouter:", error.response?.data || error.message);
        throw new Error("Failed to simplify text");
    }
}