"use client";

import { useState } from "react";
import { useChatStore } from "@/store/chatStore";
import { useSettingsStore } from "@/store/settingsStore";
import useApiKey from "./useApiKey";
import { streamResponse } from "@/lib/streaming";

export interface Message {
  id: string;
  text: string;
  role: "user" | "assistant";
}

// Interface for OpenAI API messages
interface OpenAIMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

export const useChat = (sessionId: string) => {
  const {
    addMessage,
    updateLastMessage,
    getMessages,
    setPersonality,
    sessions,
  } = useChatStore();

  const { defaultModel, defaultTemperature, defaultMaxTokens } =
    useSettingsStore();
  const [apiKey] = useApiKey();
  const messages = getMessages(sessionId);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendMessage = async (text: string) => {
    // Clear any previous errors
    setError(null);
    setIsLoading(true);

    try {
      const userMessage: Message = {
        id: Date.now().toString(),
        text,
        role: "user",
      };
      addMessage(sessionId, userMessage);

      const currentSession = sessions.find((s) => s.id === sessionId);
      const personality =
        currentSession?.personality || "You are a helpful assistant.";

      // Convert our Message format to OpenAI API format
      const conversation: OpenAIMessage[] = [
        { role: "system", content: personality },
        ...getMessages(sessionId).map((msg) => ({
          role: msg.role as "user" | "assistant",
          content: msg.text,
        })),
      ];

      console.log("Sending conversation:", conversation);
      console.log("Using model:", defaultModel);

      const stream = await streamResponse(
        conversation,
        apiKey,
        defaultModel,
        defaultTemperature,
        defaultMaxTokens
      );
      if (!stream) {
        throw new Error("Failed to get response from OpenAI");
      }

      const assistantMessage: Message = {
        id: Date.now().toString(),
        text: "",
        role: "assistant",
      };
      addMessage(sessionId, assistantMessage);

      const reader = stream.getReader();
      const decoder = new TextDecoder();
      let done = false;
      let accumulatedResponse = "";

      while (!done) {
        const { value, done: doneReading } = await reader.read();
        done = doneReading;

        if (value) {
          accumulatedResponse += decoder.decode(value, { stream: true });
          console.log("Raw accumulated response:", accumulatedResponse);

          const lines = accumulatedResponse.split("\n");
          accumulatedResponse = lines.pop() || "";

          const parsedLines = lines
            .map((line) => line.replace(/^data: /, "").trim())
            .filter((line) => line !== "" && line !== "[DONE]")
            .map((line) => {
              try {
                return JSON.parse(line);
              } catch (e) {
                console.log("Failed to parse line:", line);
                return null;
              }
            })
            .filter(Boolean);

          console.log("Parsed lines:", parsedLines);

          for (const parsedLine of parsedLines) {
            const { choices } = parsedLine;
            if (choices && choices[0]) {
              const { delta } = choices[0];
              const { content } = delta;
              if (content) {
                console.log("Adding content:", content);
                updateLastMessage(sessionId, content);
              }
            }
          }
        }
      }
    } catch (error) {
      console.error("Chat error:", error);
      // Create an error message for the user
      const errorMessage =
        error instanceof Error ? error.message : "An unexpected error occurred";
      setError(errorMessage);

      // Add an error message to the chat
      const errorMsg: Message = {
        id: Date.now().toString(),
        text: `❌ Error: ${errorMessage}`,
        role: "assistant",
      };
      addMessage(sessionId, errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  return { messages, sendMessage, setPersonality, isLoading, error };
};
