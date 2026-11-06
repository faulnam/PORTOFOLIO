import React, { useEffect, useState } from "react";

interface TypewriterTextProps {
  text: string;
  isDark: boolean;
  paused?: boolean;
  className?: string;
  speed?: number; // kecepatan ketik per karakter
  deleteSpeed?: number; // kecepatan hapus per karakter
  delayBeforeDelete?: number; // jeda sebelum mulai menghapus
  delayBeforeType?: number; // jeda sebelum mulai ngetik ulang
}

const TypewriterText: React.FC<TypewriterTextProps> = React.memo(({
  text,
  isDark,
  paused = false,
  className = "",
  speed = 100,
  deleteSpeed = 50,
  delayBeforeDelete = 1500,
  delayBeforeType = 500,
}) => {
  const [displayedText, setDisplayedText] = useState("");
  const [typing, setTyping] = useState(true);

  useEffect(() => {
    if (paused) return;
    let timeout: ReturnType<typeof setTimeout>;

    if (typing) {
      if (displayedText.length < text.length) {
        timeout = setTimeout(() => {
          setDisplayedText(text.slice(0, displayedText.length + 1));
        }, speed);
      } else {
        timeout = setTimeout(() => setTyping(false), delayBeforeDelete);
      }
    } else {
      if (displayedText.length > 0) {
        timeout = setTimeout(() => {
          setDisplayedText(text.slice(0, displayedText.length - 1));
        }, deleteSpeed);
      } else {
        timeout = setTimeout(() => setTyping(true), delayBeforeType);
      }
    }

    return () => clearTimeout(timeout);
  }, [text, typing, displayedText, speed, deleteSpeed, delayBeforeDelete, delayBeforeType, paused]);

  return (
    <p
      className={`text-xl md:text-2xl font-light ${
        isDark ? "text-gray-200" : "text-white"
      } ${className}`}
      style={{
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Helvetica Neue", Arial, sans-serif',
        textShadow: "0 1px 10px rgba(0,0,0,0.3)",
        whiteSpace: "pre-line",
      }}
    >
      {displayedText}
      <span className="animate-blink"></span>
    </p>
  );
});

export default TypewriterText;
