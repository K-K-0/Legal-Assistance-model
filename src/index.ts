import express from "express";
import type { Request, Response } from "express";
import { Simplified } from "./services/Helper";

const app = express()


app.use(express.json())

app.get('/', (req: Request,res: Response) => {
    res.send("Legal-AI Api is running")
})

app.post('/simplify', async (req: Request,res: Response) => {
    try {
        const { text } = req.body
        if (!text) {
            return res.status(400).json({error: "Text Is not Available"})
        }

        const simplified = await Simplified(text)
        res.json({ simplified })
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: "something went wrong with AI. We will solve" })
    }
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`Server is running on ${PORT}`))