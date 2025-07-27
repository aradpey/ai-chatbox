"use client";

import React, { useEffect } from "react";
import InputBar from "./InputBar";
import { useChat } from "@/hooks/useChat";
import MessageBubble from "./MessageBubble";
import { useChatStore } from "@/store/chatStore";
import { useSettingsStore } from "@/store/settingsStore";
import { Loader2, Settings, Key } from "lucide-react";
import { MotionButton } from "@/components/ui/motionButton";
import Link from "next/link";
import useApiKey from "@/hooks/useApiKey";

// This component serves as the main chat interface for the application.
// It will contain the message display area, the user input bar, and will orchestrate the chat functionality.
const ChatWindow = () => {
  // Get the active session ID and sessions from the chat store.
  const { activeSessionId, sessions, setActiveSessionId } = useChatStore();
  const { defaultModel, setDefaultModel } = useSettingsStore();
  const [apiKey] = useApiKey();

  // Set the active session to the first session if no session is active.
  useEffect(() => {
    if (!activeSessionId && sessions.length > 0) {
      setActiveSessionId(sessions[0].id);
    }
  }, [activeSessionId, sessions, setActiveSessionId]);

  // Use the useChat hook to manage the chat state and logic.
  // The hook is only called if there is an active session.
  const { messages, sendMessage, isLoading } = useChat(activeSessionId || "");

  // If there is no active session, display a message to the user.
  if (!activeSessionId) {
    return (
      <div className="flex flex-col h-full items-center justify-center">
        <p>Select a chat or create a new one to start.</p>
      </div>
    );
  }

  // If no API key is set, show a helpful message
  if (!apiKey) {
    return (
      <div className="flex flex-col h-full items-center justify-center p-8">
        <div className="text-center max-w-md">
          <Key className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            API Key Required
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            To start chatting with AI, you need to add your OpenAI API key in
            the settings.
          </p>
          <Link href="/settings">
            <MotionButton>
              <Settings className="h-4 w-4 mr-2" />
              Go to Settings
            </MotionButton>
          </Link>
        </div>
      </div>
    );
  }

  return (
    // The main container for the chat window, styled to take up the full height and width of its parent.
    <div className="flex flex-col h-full w-full bg-white dark:bg-[#212121]">
      {/* The header of the chat window. */}
      <header className="bg-gray-100 dark:bg-[#303030] p-4 border-b border-gray-200 dark:border-gray-700 flex-shrink-0">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">
            Chat with AI
          </h1>
          <div className="flex items-center space-x-4">
            {/* Model Selector */}
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Model:
              </span>
              <select
                value={defaultModel}
                onChange={(e) =>
                  setDefaultModel(
                    e.target.value as "gpt-3.5-turbo" | "gpt-4" | "gpt-4-turbo"
                  )
                }
                className="text-sm border border-gray-300 dark:border-gray-600 rounded px-2 py-1 bg-white dark:bg-[#303030] text-gray-900 dark:text-white"
                disabled={isLoading}
              >
                <option value="gpt-3.5-turbo">GPT-3.5 Turbo</option>
                <option value="gpt-4">GPT-4</option>
                <option value="gpt-4-turbo">GPT-4 Turbo</option>
              </select>
            </div>

            {/* Settings Link */}
            <Link href="/settings">
              <MotionButton variant="ghost" size="sm">
                <Settings className="h-4 w-4" />
              </MotionButton>
            </Link>
          </div>
        </div>
      </header>
      {/* The main content area of the chat window, which will display the messages. */}
      <main className="flex-1 p-4 overflow-y-auto">
        {/* We will map over the messages and render a MessageBubble for each one. */}
        {messages.map((message) => (
          <MessageBubble key={message.id} message={message} />
        ))}
        {/* Show loading indicator when AI is responding */}
        {isLoading && (
          <div className="flex items-center space-x-2 p-4">
            <Loader2 className="h-4 w-4 animate-spin" />
            <span className="text-sm text-gray-600 dark:text-gray-400">
              AI is thinking...
            </span>
          </div>
        )}
      </main>
      {/* The footer of the chat window, which will contain the input bar. */}
      <footer className="p-4 border-t border-gray-200 dark:border-gray-700 flex-shrink-0">
        <InputBar onSend={sendMessage} disabled={isLoading} />
      </footer>
    </div>
  );
};

export default ChatWindow;
