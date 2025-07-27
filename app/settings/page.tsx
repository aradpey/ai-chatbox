"use client";

import PromptEditor from "./components/PromptEditor";
import AvatarSelector from "@/components/AvatarSelector";
import { useSettingsStore } from "@/store/settingsStore";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Eye, EyeOff, CheckCircle, AlertCircle } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { validateApiKey } from "@/lib/openai";
import useApiKey from "@/hooks/useApiKey";
import { MotionButton } from "@/components/ui/motionButton";

const SettingsPage = () => {
  const {
    showTimestamps,
    autoScroll,
    defaultModel,
    defaultTemperature,
    defaultMaxTokens,
    setShowTimestamps,
    setAutoScroll,
    setDefaultModel,
    setDefaultTemperature,
    setDefaultMaxTokens,
  } = useSettingsStore();
  const [userAvatar, setUserAvatar] = useState("user");
  const [aiAvatar, setAiAvatar] = useState("bot");

  // API Key management
  const [apiKey, setApiKey] = useApiKey();
  const [showApiKey, setShowApiKey] = useState(false);
  const [isValidating, setIsValidating] = useState(false);
  const [validationStatus, setValidationStatus] = useState<
    "idle" | "valid" | "invalid"
  >("idle");

  const handleApiKeyChange = (newKey: string) => {
    setApiKey(newKey);
    setValidationStatus("idle");
  };

  const handleValidateApiKey = async () => {
    if (!apiKey.trim()) {
      setValidationStatus("invalid");
      return;
    }

    setIsValidating(true);
    try {
      const isValid = await validateApiKey(apiKey);
      setValidationStatus(isValid ? "valid" : "invalid");
    } catch {
      setValidationStatus("invalid");
    } finally {
      setIsValidating(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#181818]">
      {/* Header with back navigation */}
      <div className="bg-white dark:bg-[#212121] border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center space-x-4">
            <Link href="/chat">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Chat
              </Button>
            </Link>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Settings
            </h1>
          </div>
        </div>
      </div>

      {/* Settings Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="grid gap-8 md:grid-cols-2">
          {/* API Key Management */}
          <div className="bg-white dark:bg-[#212121] rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                API Configuration
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Manage your OpenAI API key and model settings
              </p>
            </div>
            <div className="p-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="api-key">OpenAI API Key</Label>
                <div className="relative">
                  <Input
                    id="api-key"
                    type={showApiKey ? "text" : "password"}
                    value={apiKey}
                    onChange={(e) => handleApiKeyChange(e.target.value)}
                    placeholder="sk-..."
                    className="pr-20"
                  />
                  <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center space-x-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowApiKey(!showApiKey)}
                      className="h-8 w-8 p-0"
                    >
                      {showApiKey ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </Button>
                    {validationStatus === "valid" && (
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    )}
                    {validationStatus === "invalid" && (
                      <AlertCircle className="h-4 w-4 text-red-500" />
                    )}
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <MotionButton
                    onClick={handleValidateApiKey}
                    disabled={isValidating || !apiKey.trim()}
                    size="sm"
                    variant="outline"
                  >
                    {isValidating ? "Validating..." : "Validate Key"}
                  </MotionButton>
                  {validationStatus === "valid" && (
                    <span className="text-sm text-green-600 dark:text-green-400">
                      ✓ Valid API key
                    </span>
                  )}
                  {validationStatus === "invalid" && (
                    <span className="text-sm text-red-600 dark:text-red-400">
                      ✗ Invalid API key
                    </span>
                  )}
                </div>
              </div>

              <div className="bg-gray-50 dark:bg-[#303030] border border-gray-200 dark:border-gray-600 rounded-lg p-4">
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  🔒 Your API key is stored securely in your browser and never
                  sent to our servers.
                </p>
              </div>
            </div>
          </div>

          {/* Model Settings */}
          <div className="bg-white dark:bg-[#212121] rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Model Settings
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Configure your preferred AI model and parameters
              </p>
            </div>
            <div className="p-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="model-select">Default Model</Label>
                <select
                  id="model-select"
                  value={defaultModel}
                  onChange={(e) =>
                    setDefaultModel(
                      e.target.value as
                        | "gpt-3.5-turbo"
                        | "gpt-4"
                        | "gpt-4-turbo"
                    )
                  }
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-[#303030] text-gray-900 dark:text-white"
                >
                  <option value="gpt-3.5-turbo">
                    GPT-3.5 Turbo (Fast & Cost-effective)
                  </option>
                  <option value="gpt-4">GPT-4 (More Capable)</option>
                  <option value="gpt-4-turbo">
                    GPT-4 Turbo (Latest & Most Capable)
                  </option>
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="temperature">Temperature (Creativity)</Label>
                <input
                  id="temperature"
                  type="range"
                  min="0"
                  max="2"
                  step="0.1"
                  value={defaultTemperature}
                  onChange={(e) =>
                    setDefaultTemperature(parseFloat(e.target.value))
                  }
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-gray-500">
                  <span>Focused (0)</span>
                  <span>Balanced ({defaultTemperature})</span>
                  <span>Creative (2)</span>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="max-tokens">Max Tokens</Label>
                <input
                  id="max-tokens"
                  type="range"
                  min="100"
                  max="4000"
                  step="100"
                  value={defaultMaxTokens}
                  onChange={(e) =>
                    setDefaultMaxTokens(parseInt(e.target.value))
                  }
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-gray-500">
                  <span>Short (100)</span>
                  <span>Medium ({defaultMaxTokens})</span>
                  <span>Long (4000)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Personality Settings */}
          <div className="bg-white dark:bg-[#212121] rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                AI Personality
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Customize how the AI responds and behaves in conversations
              </p>
            </div>
            <PromptEditor />
          </div>

          {/* Avatar Settings */}
          <div className="bg-white dark:bg-[#212121] rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Avatar Settings
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Choose avatars for yourself and the AI
              </p>
            </div>
            <div className="space-y-6">
              <AvatarSelector
                selectedAvatar={userAvatar}
                type="user"
                onAvatarChange={setUserAvatar}
              />
              <AvatarSelector
                selectedAvatar={aiAvatar}
                type="ai"
                onAvatarChange={setAiAvatar}
              />
            </div>
          </div>

          {/* Chat Interface Settings */}
          <div className="bg-white dark:bg-[#212121] rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Chat Interface
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Customize your chat experience
              </p>
            </div>
            <div className="p-6 space-y-4">
              {/* Show Timestamps Toggle */}
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                    Show Timestamps
                  </h3>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    Display when messages were sent
                  </p>
                </div>
                <Button
                  variant={showTimestamps ? "default" : "outline"}
                  size="sm"
                  onClick={() => setShowTimestamps(!showTimestamps)}
                >
                  {showTimestamps ? "On" : "Off"}
                </Button>
              </div>

              {/* Auto Scroll Toggle */}
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                    Auto Scroll
                  </h3>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    Automatically scroll to new messages
                  </p>
                </div>
                <Button
                  variant={autoScroll ? "default" : "outline"}
                  size="sm"
                  onClick={() => setAutoScroll(!autoScroll)}
                >
                  {autoScroll ? "On" : "Off"}
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Actions */}
        <div className="mt-8 text-center">
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/">
              <MotionButton variant="outline">Return to Home</MotionButton>
            </Link>
            <Link href="/chat">
              <MotionButton>Start Chatting</MotionButton>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
