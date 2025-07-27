"use client";

import useLocalStorage from "./useLocalStorage";

// This hook provides a simple and reusable interface for managing the OpenAI API key.
// It uses the useLocalStorage hook to persist the API key in the browser's local storage,
// ensuring that it is not lost when the user reloads the page.
const useApiKey = (): [string, (key: string) => void] => {
  // Retrieve the API key from local storage, or use an empty string as the initial value.
  const [apiKey, setApiKey] = useLocalStorage<string>("openai-api-key", "");

  // Return the API key and the function to update it.
  return [apiKey, setApiKey];
};

export default useApiKey;
