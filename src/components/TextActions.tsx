import React from 'react';
import { AlignJustify, AlignLeft, AlignRight } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface TextActionsProps {
  onModify: (type: 'lowercase' | 'uppercase' | 'titlecase') => void;
}

const TextActions: React.FC<TextActionsProps> = ({ onModify }) => {
  const { theme } = useTheme();
  
  return (
    <div className="flex flex-wrap gap-2 mt-2">
      <button
        onClick={() => onModify('lowercase')}
        className={`px-2 py-1 font-mono text-xs rounded flex items-center gap-1 ${
          theme === 'dark'
            ? 'bg-gray-800 hover:bg-gray-700'
            : 'bg-amber-200 hover:bg-amber-300'
        }`}
        title="Convert to lowercase"
      >
        <AlignLeft size={12} /> lowercase
      </button>
      <button
        onClick={() => onModify('uppercase')}
        className={`px-2 py-1 font-mono text-xs rounded flex items-center gap-1 ${
          theme === 'dark'
            ? 'bg-gray-800 hover:bg-gray-700'
            : 'bg-amber-200 hover:bg-amber-300'
        }`}
        title="Convert to UPPERCASE"
      >
        <AlignRight size={12} /> UPPERCASE
      </button>
      <button
        onClick={() => onModify('titlecase')}
        className={`px-2 py-1 font-mono text-xs rounded flex items-center gap-1 ${
          theme === 'dark'
            ? 'bg-gray-800 hover:bg-gray-700'
            : 'bg-amber-200 hover:bg-amber-300'
        }`}
        title="Convert To Title Case"
      >
        <AlignJustify size={12} /> Title Case
      </button>
    </div>
  );
};

export default TextActions;