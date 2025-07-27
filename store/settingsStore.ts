import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

// Interface for the settings store that manages all application settings
interface SettingsStore {
  // Theme settings
  theme: "light" | "dark" | "system";

  // Chat interface settings
  showTimestamps: boolean;
  autoScroll: boolean;

  // Model settings
  defaultModel: "gpt-3.5-turbo" | "gpt-4" | "gpt-4-turbo";
  defaultTemperature: number;
  defaultMaxTokens: number;

  // Actions
  setTheme: (theme: "light" | "dark" | "system") => void;
  setShowTimestamps: (showTimestamps: boolean) => void;
  setAutoScroll: (autoScroll: boolean) => void;
  setDefaultModel: (model: "gpt-3.5-turbo" | "gpt-4" | "gpt-4-turbo") => void;
  setDefaultTemperature: (temperature: number) => void;
  setDefaultMaxTokens: (maxTokens: number) => void;
}

// Create the settings store with persistence to localStorage
export const useSettingsStore = create<SettingsStore>()(
  persist(
    (set) => ({
      // Default values for all settings
      theme: "system",
      showTimestamps: false,
      autoScroll: true,
      defaultModel: "gpt-3.5-turbo",
      defaultTemperature: 0.7,
      defaultMaxTokens: 2000,

      // Actions to update settings
      setTheme: (theme) => set({ theme }),
      setShowTimestamps: (showTimestamps) => set({ showTimestamps }),
      setAutoScroll: (autoScroll) => set({ autoScroll }),
      setDefaultModel: (defaultModel) => set({ defaultModel }),
      setDefaultTemperature: (defaultTemperature) =>
        set({ defaultTemperature }),
      setDefaultMaxTokens: (defaultMaxTokens) => set({ defaultMaxTokens }),
    }),
    {
      name: "settings-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
