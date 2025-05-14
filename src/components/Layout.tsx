import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { useTheme } from '../context/ThemeContext';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { theme } = useTheme();
  
  return (
    <div className={`min-h-screen flex flex-col ${
      theme === 'dark' 
        ? 'bg-gray-900 text-amber-500' 
        : 'bg-amber-50 text-gray-800'
    } transition-colors duration-300`}>
      <div className="scanlines"></div>
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8 relative">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;