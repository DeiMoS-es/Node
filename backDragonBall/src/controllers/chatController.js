const { OpenAI } = require("openai");
// Configurar la API de OpenAI usando la clave desde el .env
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

exports.askQuestion = async (req, res) => {
  const { question } = req.body;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo", // O 'gpt-4' si tienes acceso
      messages: [{ role: "user", content: question }],
      max_tokens: 150,
    });

    res.json({ answer: response.choices[0].message.content.trim() });
  } catch (error) {
    console.error("Error al obtener respuesta de OpenAI:", error);
    res.status(500).json({ error: "Error al obtener respuesta de OpenAI" });
  }
};
