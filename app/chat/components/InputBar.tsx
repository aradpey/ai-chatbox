"use client";

import { useState, useRef, useEffect } from "react";
import { MotionButton } from "@/components/ui/motionButton";
import { Textarea } from "@/components/ui/textarea";
import { Send } from "lucide-react";

// Interface for the props of the InputBar component.
interface InputBarProps {
  // Function to call when a message should be sent.
  onSend: (message: string) => void;
  // Whether the input should be disabled (e.g., when AI is responding).
  disabled?: boolean;
}

// This component provides the input field and send button for the chat interface.
// It handles both single-line and multi-line input with Shift+Enter support.
const InputBar: React.FC<InputBarProps> = ({ onSend, disabled = false }) => {
  // State to manage the input text.
  const [input, setInput] = useState("");
  // Reference to the textarea element for focus management.
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Focus the textarea when the component mounts or when disabled state changes.
  useEffect(() => {
    if (!disabled && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [disabled]);

  // Function to handle sending the message.
  const handleSend = () => {
    if (input.trim() && !disabled) {
      onSend(input);
      setInput("");
      // Refocus the textarea after sending.
      setTimeout(() => {
        if (textareaRef.current) {
          textareaRef.current.focus();
        }
      }, 0);
    }
  };

  // Function to handle key press events in the textarea.
  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // If Enter is pressed without Shift, send the message.
    if (e.key === "Enter" && !e.shiftKey && !disabled) {
      e.preventDefault(); // Prevent default to avoid new line.
      handleSend();
    }
    // If Shift+Enter is pressed, allow the default behavior (new line).
    // No need to handle this explicitly as it's the default behavior.
  };

  // Function to handle auto-resize of the textarea.
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);

    // Auto-resize the textarea based on content.
    const textarea = e.target;
    textarea.style.height = "auto";
    textarea.style.height = Math.min(textarea.scrollHeight, 120) + "px"; // Max height of 120px
  };

  return (
    // The main container for the input bar.
    <div className="flex w-full items-center space-x-2">
      {/* The textarea for user input. */}
      <Textarea
        ref={textareaRef}
        placeholder={
          disabled
            ? "AI is responding..."
            : "Type your message... (Shift+Enter for new line)"
        }
        value={input}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
        className="flex-1 resize-none min-h-[40px] max-h-[120px]"
        disabled={disabled}
        autoFocus
        rows={1}
      />
      {/* The send button. */}
      <MotionButton
        type="submit"
        onClick={handleSend}
        disabled={disabled || !input.trim()}
        className="flex-shrink-0"
      >
        <Send className="h-4 w-4" />
      </MotionButton>
    </div>
  );
};

export default InputBar;
