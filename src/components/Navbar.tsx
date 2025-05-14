import React from 'react';
import { Moon, Sun, Type } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const Navbar: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <header className={`py-4 px-6 border-b ${
      theme === 'dark' 
        ? 'border-gray-700 bg-gray-900' 
        : 'border-amber-200 bg-amber-100'
    } transition-colors duration-300`}>
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center gap-2">
          <h1 className="text-xl md:text-2xl font-mono font-bold tracking-tighter">
            NormalText.com
          </h1>
        </div>
        <button 
          onClick={toggleTheme}
          className={`p-2 rounded-md ${
            theme === 'dark'
              ? 'bg-gray-800 hover:bg-gray-700'
              : 'bg-amber-200 hover:bg-amber-300'
          } transition-colors`}
          aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </div>
    </header>
  );
};

export default Navbar;