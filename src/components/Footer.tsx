import React from 'react';
import { useTheme } from '../context/ThemeContext';

const Footer: React.FC = () => {
  const { theme } = useTheme();
  const year = new Date().getFullYear();
  
  return (
    <footer className={`py-4 px-6 border-t ${
      theme === 'dark' 
        ? 'border-gray-700 bg-gray-900' 
        : 'border-amber-200 bg-amber-100'
    } transition-colors duration-300`}>
      <div className="container mx-auto text-center">
        <p className="font-mono text-sm">
          © {year} NormalText.com | Strip your text to its purest form
        </p>
      </div>
    </footer>
  );
};

export default Footer;