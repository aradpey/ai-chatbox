"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import React from "react";

// This component is a simple wrapper around the shadcn/ui Button component that adds Framer Motion animations.
// It can be used as a drop-in replacement for the regular Button component to add hover and tap animations.
export const MotionButton = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof Button>
>((props, ref) => (
  <motion.div
    whileHover={{
      scale: 1.02,
      transition: { duration: 0.2 },
    }}
    whileTap={{
      scale: 0.98,
      transition: { duration: 0.1 },
    }}
    whileFocus={{
      scale: 1.01,
      transition: { duration: 0.1 },
    }}
  >
    <Button ref={ref} {...props} />
  </motion.div>
));

MotionButton.displayName = "MotionButton";
