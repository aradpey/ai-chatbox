// This function validates an OpenAI API key by making a test call to the API.
// It sends a simple request to the chat completions endpoint and checks if the response is successful.
// This is a crucial step to ensure that the user has provided a valid API key before proceeding with the application.
export const validateApiKey = async (apiKey: string) => {
  try {
    // Make a test call to the OpenAI API.
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      // The test call includes a simple message to the AI to verify that the key is valid.
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: "This is a test." }],
        max_tokens: 5,
      }),
    });

    // If the response is not successful, throw an error.
    if (!response.ok) {
      throw new Error("API key is invalid.");
    }

    // If the response is successful, return true.
    return true;
  } catch (error) {
    // If there is an error, log it to the console and return false.
    console.error("API key validation failed:", error);
    return false;
  }
};
