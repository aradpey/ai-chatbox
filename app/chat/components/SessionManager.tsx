"use client";

import { useChatStore } from "@/store/chatStore";
import { MotionButton } from "@/components/ui/motionButton";
import { PlusCircle, Trash2, Edit, Settings } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { ThemeSwitcher } from "@/components/ThemeSwitcher";

// This component provides a sidebar for managing chat sessions.
// It allows users to create, delete, rename, and switch between different chat sessions.
const SessionManager = () => {
  const {
    sessions,
    activeSessionId,
    createSession,
    deleteSession,
    renameSession,
    setActiveSessionId,
  } = useChatStore();

  // State to track which session is being renamed.
  const [renamingSessionId, setRenamingSessionId] = useState<string | null>(
    null
  );
  const [newName, setNewName] = useState("");

  // Function to handle the rename action for a session.
  const handleRename = (sessionId: string) => {
    const session = sessions.find((s) => s.id === sessionId);
    if (session) {
      setRenamingSessionId(sessionId);
      setNewName(session.name);
    }
  };

  // Function to save the new name for a session.
  const handleSaveRename = () => {
    if (renamingSessionId && newName.trim()) {
      renameSession(renamingSessionId, newName.trim());
      setRenamingSessionId(null);
      setNewName("");
    }
  };

  // Function to cancel the rename action.
  const handleCancelRename = () => {
    setRenamingSessionId(null);
    setNewName("");
  };

  return (
    // The main container for the session manager sidebar.
    <div className="w-64 bg-gray-50 dark:bg-[#181818] p-4 flex flex-col border-r border-gray-200 dark:border-gray-700">
      {/* Header section with title and create button. */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold text-gray-900 dark:text-white">
          Chat Sessions
        </h2>
        <MotionButton
          onClick={createSession}
          size="icon"
          variant="ghost"
          className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
        >
          <PlusCircle className="h-5 w-5" />
        </MotionButton>
      </div>

      {/* List of chat sessions. */}
      <div className="flex-1 overflow-y-auto">
        {sessions.map((session) => (
          <div
            key={session.id}
            className={`flex items-center justify-between p-2 rounded-md cursor-pointer mb-2 ${
              activeSessionId === session.id
                ? "bg-gray-200 dark:bg-[#303030] text-gray-900 dark:text-white"
                : "hover:bg-gray-100 dark:hover:bg-[#303030] text-gray-700 dark:text-gray-300"
            }`}
            onClick={() => setActiveSessionId(session.id)}
          >
            {/* Session name or rename input. */}
            {renamingSessionId === session.id ? (
              <div className="flex-1 flex items-center space-x-2">
                <input
                  type="text"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      handleSaveRename();
                    } else if (e.key === "Escape") {
                      handleCancelRename();
                    }
                  }}
                  className="flex-1 px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-[#303030] text-gray-900 dark:text-white"
                  autoFocus
                />
                <MotionButton
                  onClick={handleSaveRename}
                  size="sm"
                  variant="ghost"
                  className="h-6 w-6 p-0 text-green-600 dark:text-green-400"
                >
                  ✓
                </MotionButton>
                <MotionButton
                  onClick={handleCancelRename}
                  size="sm"
                  variant="ghost"
                  className="h-6 w-6 p-0 text-red-600 dark:text-red-400"
                >
                  ✕
                </MotionButton>
              </div>
            ) : (
              <>
                <span className="truncate flex-1">{session.name}</span>
                <div className="flex items-center space-x-1">
                  <MotionButton
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRename(session.id);
                    }}
                    size="icon"
                    variant="ghost"
                    className="h-7 w-7 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                  >
                    <Edit className="h-4 w-4" />
                  </MotionButton>
                  <MotionButton
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteSession(session.id);
                    }}
                    size="icon"
                    variant="ghost"
                    className="h-7 w-7 text-red-500 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300"
                  >
                    <Trash2 className="h-4 w-4" />
                  </MotionButton>
                </div>
              </>
            )}
          </div>
        ))}
      </div>

      {/* Footer section with settings link and theme switcher. */}
      <div className="mt-auto flex items-center justify-between">
        <Link href="/settings">
          <MotionButton
            variant="ghost"
            className="w-full justify-start text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
          >
            <Settings className="h-5 w-5 mr-2" />
            Settings
          </MotionButton>
        </Link>
        <ThemeSwitcher />
      </div>
    </div>
  );
};

export default SessionManager;
