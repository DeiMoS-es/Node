const openai = require('openai');
openai.apiKey = process.env.OPENAI_API_KEY;

exports.askQuestion = async (req, res) => {
    const { question } = req.body;
    try {
        const response = await openai.Completion.create({
            engine: 'davinci',
            prompt: question,
            maxTokens: 150
        });
        res.json({ answer: response.choices[0].text.trim() });
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener respuesta de OpenAI' });
    }
};