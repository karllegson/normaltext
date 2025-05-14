import React from 'react';
import { ThemeProvider } from './context/ThemeContext';
import Layout from './components/Layout';
import TextProcessor from './components/TextProcessor';

function App() {
  return (
    <ThemeProvider>
      <Layout>
        <TextProcessor />
      </Layout>
    </ThemeProvider>
  );
}

export default App;