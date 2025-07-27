// Interface for OpenAI API messages
interface OpenAIMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

// This function sends a message to the OpenAI API and streams the response.
// It takes the conversation history, the user's API key, and optional model settings as input,
// and it returns a ReadableStream of the AI's response.
export const streamResponse = async (
  messages: OpenAIMessage[],
  apiKey: string,
  model: string = "gpt-3.5-turbo",
  temperature: number = 0.7,
  maxTokens: number = 2000
) => {
  // Check if API key is provided
  if (!apiKey || apiKey.trim() === "") {
    throw new Error(
      "OpenAI API key is required. Please enter your API key in the settings."
    );
  }

  try {
    // Send the request to the OpenAI API.
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      // The request body includes the conversation history and the streaming parameter.
      body: JSON.stringify({
        model,
        messages,
        stream: true,
        max_tokens: maxTokens,
        temperature,
      }),
    });

    // If the response is not successful, throw an error with details.
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      const errorMessage =
        errorData.error?.message ||
        `HTTP ${response.status}: ${response.statusText}`;

      if (response.status === 401) {
        throw new Error(
          "Invalid API key. Please check your OpenAI API key and try again."
        );
      } else if (response.status === 429) {
        throw new Error(
          "Rate limit exceeded. Please wait a moment and try again."
        );
      } else if (response.status === 500) {
        throw new Error("OpenAI service error. Please try again later.");
      } else {
        throw new Error(`API Error: ${errorMessage}`);
      }
    }

    // Return the response body as a ReadableStream.
    return response.body;
  } catch (error) {
    // If it's already an Error object, re-throw it
    if (error instanceof Error) {
      throw error;
    }
    // Otherwise, create a generic error
    throw new Error(
      "Failed to connect to OpenAI API. Please check your internet connection and try again."
    );
  }
};
