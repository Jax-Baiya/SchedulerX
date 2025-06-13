// Simple Tooltip component using native title attribute fallback
import React from "react";

type TooltipProps = {
  content: string;
  children: React.ReactNode;
};

export function Tooltip({ content, children }: TooltipProps) {
  return (
    <span title={content} style={{ cursor: "help", display: "inline-block" }}>
      {children}
    </span>
  );
}
