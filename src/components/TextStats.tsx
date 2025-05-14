import React from 'react';

interface TextStatsProps {
  text: string;
}

const TextStats: React.FC<TextStatsProps> = ({ text }) => {
  const charCount = text.length;
  const wordCount = text.trim() === '' ? 0 : text.trim().split(/\s+/).length;
  
  return (
    <div className="font-mono text-xs opacity-70">
      <span>{wordCount} words</span>
      <span className="mx-1">•</span>
      <span>{charCount} chars</span>
    </div>
  );
};

export default TextStats;