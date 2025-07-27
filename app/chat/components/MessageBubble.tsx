"use client";

import { Copy } from "lucide-react";
import { Message } from "@/hooks/useChat";
import { MotionButton } from "@/components/ui/motionButton";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

// Interface for the props of the MessageBubble component.
interface MessageBubbleProps {
  // The message object to display.
  message: Message;
}

// This component renders a single chat message with distinct styling for user and AI messages.
// It includes a copy-to-clipboard button that appears on hover.
const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  // Function to copy the message text to the clipboard.
  const handleCopy = () => {
    navigator.clipboard.writeText(message.text);
  };

  // Determine if this is a user message or AI message.
  const isUser = message.role === "user";

  // Set the alignment and styling based on the message type.
  const bubbleAlignment = isUser ? "justify-end" : "justify-start";

  // Define the CSS classes for the message bubble based on the message type.
  const bubbleClasses = cn(
    "max-w-xs md:max-w-md lg:max-w-lg px-4 py-2 rounded-lg",
    isUser
      ? "bg-gray-200 dark:bg-[#303030] text-gray-900 dark:text-white rounded-br-md"
      : "bg-gray-200 dark:bg-[#303030] text-gray-900 dark:text-white rounded-bl-md" // #CCCCCC in light mode
  );

  return (
    // The main container for the message bubble with animation.
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex ${bubbleAlignment} mb-4`}
    >
      {/* The message bubble container with relative positioning for the copy button. */}
      <div className="relative group">
        {/* The actual message bubble with the text content. */}
        <div className={bubbleClasses}>
          <p>{message.text}</p>
        </div>

        {/* The copy button that appears on hover. */}
        <MotionButton
          onClick={handleCopy}
          size="icon"
          variant="ghost"
          className="absolute -top-2 -right-2 h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600"
        >
          <Copy className="h-4 w-4" />
        </MotionButton>
      </div>
    </motion.div>
  );
};

export default MessageBubble;
