"use client";
import { Button } from "@/components/ui/button";
import { User, Bot, Smile, Star, Heart, Zap } from "lucide-react";

// Avatar options for user selection
const avatarOptions = [
  { id: "user", label: "User", icon: User },
  { id: "smile", label: "Smile", icon: Smile },
  { id: "star", label: "Star", icon: Star },
  { id: "heart", label: "Heart", icon: Heart },
  { id: "zap", label: "Zap", icon: Zap },
];

// Avatar options for AI selection
const aiAvatarOptions = [
  { id: "bot", label: "Bot", icon: Bot },
  { id: "smile", label: "Smile", icon: Smile },
  { id: "star", label: "Star", icon: Star },
  { id: "heart", label: "Heart", icon: Heart },
  { id: "zap", label: "Zap", icon: Zap },
];

// Interface for the props of the AvatarSelector component.
interface AvatarSelectorProps {
  // The currently selected avatar ID.
  selectedAvatar: string;
  // The type of avatar selector (user or AI).
  type: "user" | "ai";
  // Function to call when the avatar selection changes.
  onAvatarChange: (avatarId: string) => void;
}

// This component allows users to select an avatar for themselves or the AI.
// It displays a grid of avatar options with icons and labels.
export const AvatarSelector: React.FC<AvatarSelectorProps> = ({
  selectedAvatar,
  type,
  onAvatarChange,
}) => {
  // Choose the appropriate avatar options based on the type.
  const options = type === "user" ? avatarOptions : aiAvatarOptions;

  return (
    // The main container for the avatar selector.
    <div className="p-4">
      {/* The title for the avatar selector. */}
      <h3 className="text-lg font-bold mb-4 text-gray-900 dark:text-white">
        {type === "user" ? "Your Avatar" : "AI Avatar"}
      </h3>

      {/* The grid of avatar options. */}
      <div className="grid grid-cols-3 gap-3">
        {options.map((option) => {
          const IconComponent = option.icon;
          const isSelected = selectedAvatar === option.id;

          return (
            // Each avatar option button.
            <Button
              key={option.id}
              variant={isSelected ? "default" : "outline"}
              className={`h-16 w-16 flex flex-col items-center justify-center p-2 ${
                isSelected
                  ? "ring-2 ring-gray-500 bg-gray-600 dark:bg-[#303030] text-white"
                  : "text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
              }`}
              onClick={() => onAvatarChange(option.id)}
            >
              {/* The avatar icon. */}
              <IconComponent className="h-6 w-6 mb-1" />
              {/* The avatar label. */}
              <span className="text-xs">{option.label}</span>
            </Button>
          );
        })}
      </div>
    </div>
  );
};

export default AvatarSelector;
