import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { Message } from "@/hooks/useChat";
import { v4 as uuidv4 } from "uuid";

// Interface for a chat session with all its properties
export interface ChatSession {
  id: string;
  name: string;
  messages: Message[];
  personality: string;
  // New fields for automated titling
  isTitleGenerated: boolean;
  createdAt: number;
}

// Interface for the chat store that manages all chat sessions
interface ChatStore {
  // State
  sessions: ChatSession[];
  activeSessionId: string | null;

  // Actions for session management
  createSession: () => void;
  deleteSession: (sessionId: string) => void;
  renameSession: (sessionId: string, newName: string) => void;
  setActiveSessionId: (sessionId: string) => void;

  // Actions for message management
  addMessage: (sessionId: string, message: Message) => void;
  updateLastMessage: (sessionId: string, text: string) => void;
  getMessages: (sessionId: string) => Message[];

  // Actions for personality management
  setPersonality: (sessionId: string, personality: string) => void;

  // Actions for automated titling
  generateTitle: (sessionId: string) => void;
  updateSessionTitle: (sessionId: string, title: string) => void;
}

// Default personality for new sessions
const defaultPersonality = "You are a helpful assistant.";

// Create the chat store with persistence to localStorage
export const useChatStore = create<ChatStore>()(
  persist(
    (set, get) => ({
      // Initialize with one empty session
      sessions: [
        {
          id: uuidv4(),
          name: "New Chat",
          messages: [],
          personality: defaultPersonality,
          isTitleGenerated: false,
          createdAt: Date.now(),
        },
      ],
      activeSessionId: null,

      // Create a new chat session
      createSession: () => {
        const newSession: ChatSession = {
          id: uuidv4(),
          name: "New Chat",
          messages: [],
          personality: defaultPersonality,
          isTitleGenerated: false,
          createdAt: Date.now(),
        };

        set((state) => ({
          sessions: [...state.sessions, newSession],
          activeSessionId: newSession.id,
        }));
      },

      // Delete a chat session
      deleteSession: (sessionId) => {
        set((state) => {
          const newSessions = state.sessions.filter((s) => s.id !== sessionId);
          let newActiveSessionId = state.activeSessionId;

          // If we're deleting the active session, switch to another one
          if (state.activeSessionId === sessionId) {
            newActiveSessionId =
              newSessions.length > 0 ? newSessions[0].id : null;
          }

          return {
            sessions: newSessions,
            activeSessionId: newActiveSessionId,
          };
        });
      },

      // Rename a chat session
      renameSession: (sessionId, newName) => {
        set((state) => ({
          sessions: state.sessions.map((s) =>
            s.id === sessionId ? { ...s, name: newName } : s
          ),
        }));
      },

      // Set the active session
      setActiveSessionId: (sessionId) => {
        set({ activeSessionId: sessionId });
      },

      // Add a message to a session
      addMessage: (sessionId, message) => {
        set((state) => ({
          sessions: state.sessions.map((s) =>
            s.id === sessionId
              ? { ...s, messages: [...s.messages, message] }
              : s
          ),
        }));

        // Generate title immediately for the first user message
        const session = get().sessions.find((s) => s.id === sessionId);
        if (
          session &&
          !session.isTitleGenerated &&
          message.role === "user" &&
          session.messages.length === 1
        ) {
          const title = message.text.slice(0, 50);
          get().updateSessionTitle(
            sessionId,
            title + (title.length >= 50 ? "..." : "")
          );
        }
      },

      // Update the last message (for streaming)
      updateLastMessage: (sessionId, text) => {
        set((state) => ({
          sessions: state.sessions.map((s) =>
            s.id === sessionId
              ? {
                  ...s,
                  messages: s.messages.map((msg, index) =>
                    index === s.messages.length - 1
                      ? { ...msg, text: msg.text + text }
                      : msg
                  ),
                }
              : s
          ),
        }));
      },

      // Get messages for a session
      getMessages: (sessionId) => {
        const session = get().sessions.find((s) => s.id === sessionId);
        return session ? session.messages : [];
      },

      // Set personality for a session
      setPersonality: (sessionId, personality) => {
        set((state) => ({
          sessions: state.sessions.map((s) =>
            s.id === sessionId ? { ...s, personality } : s
          ),
        }));
      },

      // Generate a title for a session based on the conversation
      generateTitle: async (sessionId) => {
        const session = get().sessions.find((s) => s.id === sessionId);
        if (!session || session.isTitleGenerated) return;

        // Get the first few messages to generate a title
        const messages = session.messages.slice(0, 4);
        if (messages.length < 2) return;

        try {
          // Create a simple title based on the first user message
          const firstUserMessage = messages.find((m) => m.role === "user");
          if (firstUserMessage) {
            const title = firstUserMessage.text.slice(0, 50);
            get().updateSessionTitle(
              sessionId,
              title + (title.length >= 50 ? "..." : "")
            );
          }
        } catch (error) {
          console.error("Failed to generate title:", error);
        }
      },

      // Update the title of a session
      updateSessionTitle: (sessionId, title) => {
        set((state) => ({
          sessions: state.sessions.map((s) =>
            s.id === sessionId
              ? { ...s, name: title, isTitleGenerated: true }
              : s
          ),
        }));
      },
    }),
    {
      name: "chat-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
