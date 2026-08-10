"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

const CURSOR_SIZE = 16;

export default function CustomCursor() {
  const [isReady, setIsReady] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const springX = useSpring(cursorX, { damping: 28, stiffness: 380, mass: 0.5 });
  const springY = useSpring(cursorY, { damping: 28, stiffness: 380, mass: 0.5 });

  useEffect(() => {
    // Only take over the cursor on devices that actually have a precise
    // pointer — touchscreens keep their native behavior untouched.
    if (!window.matchMedia("(pointer: fine)").matches) return;

    setIsReady(true);

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - CURSOR_SIZE / 2);
      cursorY.set(e.clientY - CURSOR_SIZE / 2);
    };

    const handleOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (target?.closest("a, button, [data-cursor-hover]")) {
        setIsHovering(true);
      }
    };

    const handleOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (target?.closest("a, button, [data-cursor-hover]")) {
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", moveCursor);
    document.addEventListener("mouseover", handleOver);
    document.addEventListener("mouseout", handleOut);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      document.removeEventListener("mouseover", handleOver);
      document.removeEventListener("mouseout", handleOut);
    };
  }, [cursorX, cursorY]);

  if (!isReady) return null;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[9999] rounded-full bg-bone mix-blend-difference"
      style={{
        width: CURSOR_SIZE,
        height: CURSOR_SIZE,
        x: springX,
        y: springY,
      }}
      animate={{ scale: isHovering ? 2.75 : 1 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
    />
  );
}
