"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { MotionButton } from "@/components/ui/motionButton";
import { Label } from "@/components/ui/label";
import useApiKey from "@/hooks/useApiKey";
import { validateApiKey } from "@/lib/openai";
import { motion } from "framer-motion";

// This component renders a modal dialog that prompts the user to enter their OpenAI API key.
// It uses the useApiKey hook to manage the key and the validateApiKey function to ensure it's valid before saving it.
const APIKeyModal = () => {
  // Get the API key and the function to update it from the useApiKey hook.
  const [apiKey, setApiKey] = useApiKey();
  // State to manage the input field for the API key.
  const [inputApiKey, setInputApiKey] = useState("");
  // State to manage any error messages.
  const [error, setError] = useState<string | null>(null);
  // State to manage the loading state during validation.
  const [isLoading, setIsLoading] = useState(false);

  // This function handles the submission of the API key.
  // It validates the key and, if it's valid, saves it to local storage.
  const handleSave = async () => {
    // Set the loading state to true to indicate that the key is being validated.
    setIsLoading(true);
    // Clear any previous error messages.
    setError(null);
    // Validate the API key.
    const isValid = await validateApiKey(inputApiKey);
    // If the key is valid, save it and close the modal.
    if (isValid) {
      setApiKey(inputApiKey);
    } else {
      // If the key is invalid, display an error message.
      setError("Invalid API key. Please check your key and try again.");
    }
    // Set the loading state to false.
    setIsLoading(false);
  };

  return (
    // The Dialog component from shadcn/ui is used to create the modal.
    // The modal is displayed if the API key is not set.
    <Dialog open={!apiKey}>
      <DialogContent>
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <DialogHeader>
            <DialogTitle>Enter your OpenAI API Key</DialogTitle>
            <DialogDescription>
              You can get your API key from the OpenAI dashboard.
            </DialogDescription>
          </DialogHeader>
          {/* The input field for the API key. */}
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="api-key" className="text-right">
                API Key
              </Label>
              <Input
                id="api-key"
                value={inputApiKey}
                onChange={(e) => setInputApiKey(e.target.value)}
                className="col-span-3"
                placeholder="sk-..."
              />
            </div>
            {/* Display an error message if the key is invalid. */}
            {error && (
              <p className="text-red-500 text-sm col-span-4">{error}</p>
            )}
          </div>
          <DialogFooter>
            {/* The save button is disabled while the key is being validated. */}
            <MotionButton onClick={handleSave} disabled={isLoading}>
              {isLoading ? "Validating..." : "Save"}
            </MotionButton>
          </DialogFooter>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
};

export default APIKeyModal;
