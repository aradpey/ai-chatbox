"use client";

import { useState, ChangeEvent } from "react";
import { MotionButton } from "@/components/ui/motionButton";
import { Textarea } from "@/components/ui/textarea";
import { useChatStore } from "@/store/chatStore";

// This component provides a simple textarea for editing the personality (system prompt) of the active chat session.
const PromptEditor = () => {
  // Get the active session and the setPersonality function from the chat store.
  const { activeSessionId, sessions, setPersonality } = useChatStore();
  // Find the active session from the list of sessions.
  const activeSession = sessions.find(
    (session) => session.id === activeSessionId
  );
  // State to manage the input of the personality.
  const [personality, setLocalPersonality] = useState(
    activeSession?.personality || ""
  );

  // This function handles the saving of the personality.
  const handleSave = () => {
    // If there is an active session, save the personality.
    if (activeSessionId) {
      setPersonality(activeSessionId, personality);
    }
  };

  return (
    // The main container for the prompt editor.
    <div className="p-4">
      {/* The header of the prompt editor. */}
      <h3 className="text-lg font-bold mb-2">Personality</h3>
      {/* The textarea for editing the personality. */}
      <Textarea
        value={personality}
        onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
          setLocalPersonality(e.target.value)
        }
        placeholder="e.g., You are a helpful assistant."
        className="mb-2"
      />
      {/* The button to save the personality. */}
      <MotionButton onClick={handleSave}>Save Personality</MotionButton>
    </div>
  );
};

export default PromptEditor;
