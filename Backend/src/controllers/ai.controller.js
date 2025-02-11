const aiService = require("../services/api.services.js");

module.exports.getReview = async (req, res) => {
  try {
    const prompt = req.body.prompt;
    if (!prompt) {
      return res.status(400).send("Prompt is required");
    }

    const response = await aiService(prompt);
    console.log("AI Response:", response, "Type:", typeof response);

    if (!response) {
      return res.status(500).json({ error: "AI service returned an empty response" });
    }

    if (typeof response === "function") {
      return res.status(500).json({ error: "Invalid response type: function received" });
    }

    res.json(response); // Using `res.json()` to ensure proper formatting
  } catch (error) {
    console.error("Error in getResponse:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
