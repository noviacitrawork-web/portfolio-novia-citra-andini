import React from 'react';

/**
 * Helper to parse bold text using * syntax
 * Example: "This is *bold* text" -> "This is <b>bold</b> text"
 */
export const parseBoldText = (text: string | React.ReactNode, className = "font-bold text-gray-900 dark:text-white") => {
  if (typeof text !== 'string') return text;
  return text.split('*').map((part, index) => 
    index % 2 === 1 ? <span key={index} className={className}>{part}</span> : part
  );
};
