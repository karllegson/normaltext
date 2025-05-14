import React, { useState, useRef, useEffect } from 'react';
import { Copy, Check, RotateCcw, ArrowDown, Info, Maximize2, Minimize2 } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import TextStats from './TextStats';

interface StyleChange {
  color?: string;
  backgroundColor?: string;
  fontFamily?: string;
  fontSize?: string;
  fontWeight?: string;
  textDecoration?: string;
}

// Color name mapping
const colorNames: { [key: string]: string } = {
  'rgb(0, 0, 0)': 'black',
  'rgb(255, 255, 255)': 'white',
  'rgb(255, 0, 0)': 'red',
  'rgb(0, 255, 0)': 'green',
  'rgb(0, 0, 255)': 'blue',
  'rgb(255, 255, 0)': 'yellow',
  'rgb(255, 0, 255)': 'magenta',
  'rgb(0, 255, 255)': 'cyan',
  'rgb(128, 128, 128)': 'gray',
  'rgb(128, 0, 0)': 'maroon',
  'rgb(128, 128, 0)': 'olive',
  'rgb(0, 128, 0)': 'dark green',
  'rgb(128, 0, 128)': 'purple',
  'rgb(0, 128, 128)': 'teal',
  'rgb(0, 0, 128)': 'navy',
  'rgba(0, 0, 0, 0)': 'transparent'
};

// Convert RGB to Hex
const rgbToHex = (rgb: string): string => {
  // Handle rgba strings
  const matches = rgb.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*[\d.]+)?\)$/);
  if (!matches) return rgb;

  const r = parseInt(matches[1], 10);
  const g = parseInt(matches[2], 10);
  const b = parseInt(matches[3], 10);

  const toHex = (n: number): string => {
    const hex = n.toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  };

  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
};

// Get closest named color
const getColorName = (rgb: string): string => {
  // Check if it's a direct match in our color names
  if (colorNames[rgb]) {
    return colorNames[rgb];
  }

  // Convert to hex for easier comparison
  const hex = rgbToHex(rgb).toLowerCase();
  
  // Common CSS color names and their hex values
  const cssColors: { [key: string]: string } = {
    '#f0f8ff': 'alice blue',
    '#faebd7': 'antique white',
    '#00ffff': 'aqua',
    '#7fffd4': 'aquamarine',
    '#f0ffff': 'azure',
    '#f5f5dc': 'beige',
    '#ffe4c4': 'bisque',
    '#000000': 'black',
    '#ffebcd': 'blanched almond',
    '#0000ff': 'blue',
    '#8a2be2': 'blue violet',
    '#a52a2a': 'brown',
    '#deb887': 'burly wood',
    '#5f9ea0': 'cadet blue',
    '#7fff00': 'chartreuse',
    '#d2691e': 'chocolate',
    '#ff7f50': 'coral',
    '#6495ed': 'cornflower blue',
    '#fff8dc': 'cornsilk',
    '#dc143c': 'crimson',
    '#00ffff': 'cyan',
    '#00008b': 'dark blue',
    '#008b8b': 'dark cyan',
    '#b8860b': 'dark goldenrod',
    '#a9a9a9': 'dark gray',
    '#006400': 'dark green',
    '#bdb76b': 'dark khaki',
    '#8b008b': 'dark magenta',
    '#556b2f': 'dark olive green',
    '#ff8c00': 'dark orange',
    '#9932cc': 'dark orchid',
    '#8b0000': 'dark red',
    '#e9967a': 'dark salmon',
    '#8fbc8f': 'dark sea green',
    '#483d8b': 'dark slate blue',
    '#2f4f4f': 'dark slate gray',
    '#00ced1': 'dark turquoise',
    '#9400d3': 'dark violet',
    '#ff1493': 'deep pink',
    '#00bfff': 'deep sky blue',
    '#696969': 'dim gray',
    '#1e90ff': 'dodger blue',
    '#b22222': 'firebrick',
    '#fffaf0': 'floral white',
    '#228b22': 'forest green',
    '#ff00ff': 'fuchsia',
    '#dcdcdc': 'gainsboro',
    '#f8f8ff': 'ghost white',
    '#ffd700': 'gold',
    '#daa520': 'goldenrod',
    '#808080': 'gray',
    '#008000': 'green',
    '#adff2f': 'green yellow',
    '#f0fff0': 'honeydew',
    '#ff69b4': 'hot pink',
    '#cd5c5c': 'indian red',
    '#4b0082': 'indigo',
    '#fffff0': 'ivory',
    '#f0e68c': 'khaki',
    '#e6e6fa': 'lavender',
    '#fff0f5': 'lavender blush',
    '#7cfc00': 'lawn green',
    '#fffacd': 'lemon chiffon',
    '#add8e6': 'light blue',
    '#f08080': 'light coral',
    '#e0ffff': 'light cyan',
    '#fafad2': 'light goldenrod yellow',
    '#90ee90': 'light green',
    '#d3d3d3': 'light gray',
    '#ffb6c1': 'light pink',
    '#ffa07a': 'light salmon',
    '#20b2aa': 'light sea green',
    '#87cefa': 'light sky blue',
    '#778899': 'light slate gray',
    '#b0c4de': 'light steel blue',
    '#ffffe0': 'light yellow',
    '#00ff00': 'lime',
    '#32cd32': 'lime green',
    '#faf0e6': 'linen',
    '#ff00ff': 'magenta',
    '#800000': 'maroon',
    '#66cdaa': 'medium aquamarine',
    '#0000cd': 'medium blue',
    '#ba55d3': 'medium orchid',
    '#9370db': 'medium purple',
    '#3cb371': 'medium sea green',
    '#7b68ee': 'medium slate blue',
    '#00fa9a': 'medium spring green',
    '#48d1cc': 'medium turquoise',
    '#c71585': 'medium violet red',
    '#191970': 'midnight blue',
    '#f5fffa': 'mint cream',
    '#ffe4e1': 'misty rose',
    '#ffe4b5': 'moccasin',
    '#ffdead': 'navajo white',
    '#000080': 'navy',
    '#fdf5e6': 'old lace',
    '#808000': 'olive',
    '#6b8e23': 'olive drab',
    '#ffa500': 'orange',
    '#ff4500': 'orange red',
    '#da70d6': 'orchid',
    '#eee8aa': 'pale goldenrod',
    '#98fb98': 'pale green',
    '#afeeee': 'pale turquoise',
    '#db7093': 'pale violet red',
    '#ffefd5': 'papaya whip',
    '#ffdab9': 'peach puff',
    '#cd853f': 'peru',
    '#ffc0cb': 'pink',
    '#dda0dd': 'plum',
    '#b0e0e6': 'powder blue',
    '#800080': 'purple',
    '#663399': 'rebecca purple',
    '#ff0000': 'red',
    '#bc8f8f': 'rosy brown',
    '#4169e1': 'royal blue',
    '#8b4513': 'saddle brown',
    '#fa8072': 'salmon',
    '#f4a460': 'sandy brown',
    '#2e8b57': 'sea green',
    '#fff5ee': 'seashell',
    '#a0522d': 'sienna',
    '#c0c0c0': 'silver',
    '#87ceeb': 'sky blue',
    '#6a5acd': 'slate blue',
    '#708090': 'slate gray',
    '#fffafa': 'snow',
    '#00ff7f': 'spring green',
    '#4682b4': 'steel blue',
    '#d2b48c': 'tan',
    '#008080': 'teal',
    '#d8bfd8': 'thistle',
    '#ff6347': 'tomato',
    '#40e0d0': 'turquoise',
    '#ee82ee': 'violet',
    '#f5deb3': 'wheat',
    '#ffffff': 'white',
    '#f5f5f5': 'white smoke',
    '#ffff00': 'yellow',
    '#9acd32': 'yellow green'
  };

  // Return the color name if we have an exact match
  if (cssColors[hex]) {
    return cssColors[hex];
  }

  // If no exact match, return the hex code
  return hex;
};

// Add a sanitizer to allow only inline formatting and spacing tags, but strip bold
function sanitizeHtml(html: string) {
  // Remove all <b> and <strong> tags (bold)
  let sanitized = html.replace(/<\/?(b|strong)\b[^>]*>/gi, '');
  // Allow only i, em, u, br, p, div, span (no style attributes)
  sanitized = sanitized
    .replace(/<(?!\/?(i|em|u|br|p|div|span)\b)[^>]*>/gi, '') // remove all other tags
    .replace(/<((i|em|u|br|p|div|span)[^>]*) style="[^"]*"/gi, '<$1') // remove style attributes
    .replace(/<((i|em|u|br|p|div|span)[^>]*) (class|id|color|bgcolor|face|size|align|width|height|data-[^=]*)="[^"]*"/gi, '<$1');
  return sanitized;
}

const TextProcessor: React.FC = () => {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [copied, setCopied] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [strippedStyles, setStrippedStyles] = useState<string[]>([]);
  const outputRef = useRef<HTMLTextAreaElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const outputDivRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();

  // Track last programmatic update to outputText
  const [lastOutputText, setLastOutputText] = useState('');

  const [isOutputExpanded, setIsOutputExpanded] = useState(false);

  const handlePaste = async (e: React.ClipboardEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    const styles: string[] = [];
    
    // Get HTML content from clipboard
    const htmlContent = e.clipboardData.getData('text/html');
    const plainText = e.clipboardData.getData('text/plain');
    let cleanedHtml = htmlContent;
    
    if (htmlContent) {
      // Aggressively remove all leading <br>, <div>, <p>, and whitespace
      cleanedHtml = htmlContent.replace(/^((<br\s*\/?>|<div>\s*<\/div>|<div><br\s*\/?><\/div>|<p>\s*<\/p>|<p><br\s*\/?><\/p>|\s|\n|\r)+)/i, '');
      // Create a temporary div to parse the HTML
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = cleanedHtml;
      tempDiv.style.visibility = 'hidden';
      document.body.appendChild(tempDiv);
      
      // Function to extract styles from computed style
      const extractStyles = (element: Element) => {
        const style = window.getComputedStyle(element);
        
        // Check text color - ignore black since it's default
        const color = style.color;
        const defaultColor = theme === 'dark' ? 'rgb(74, 222, 128)' : 'rgb(31, 41, 55)';
        const blackColors = ['rgb(0, 0, 0)', '#000000', '#000', 'black'];
        if (color && 
            color !== defaultColor && 
            !blackColors.includes(color.toLowerCase()) && 
            !styles.includes(`${getColorName(color)} text color`)) {
          styles.push(`${getColorName(color)} text color`);
        }
        
        // Check background color
        const bgColor = style.backgroundColor;
        if (bgColor && 
            bgColor !== 'transparent' && 
            bgColor !== 'rgba(0, 0, 0, 0)' && 
            !styles.includes(`${getColorName(bgColor)} background`)) {
          styles.push(`${getColorName(bgColor)} background`);
        }
        
        // Check font family
        const fontFamily = style.fontFamily.replace(/['"]/g, '');
        if (fontFamily && 
            !fontFamily.includes('Courier New') && 
            !fontFamily.includes('monospace') && 
            !styles.includes(`${fontFamily} font`)) {
          styles.push(`${fontFamily} font`);
        }
        
        // Check font size
        const fontSize = style.fontSize;
        if (fontSize && fontSize !== '14px' && !styles.includes(`${fontSize} font size`)) {
          styles.push(`${fontSize} font size`);
        }
        
        // Check font weight
        const fontWeight = style.fontWeight;
        if (fontWeight && fontWeight !== 'normal' && fontWeight !== '400' && !styles.includes('bold text')) {
          styles.push('bold text');
        }
        
        // Check text decoration
        const textDecoration = style.textDecoration;
        if (textDecoration && 
            textDecoration !== 'none' && 
            !textDecoration.includes('none') && 
            !styles.includes(textDecoration)) {
          styles.push(textDecoration);
        }
      };
      
      // Extract styles from all elements
      tempDiv.querySelectorAll('*').forEach(extractStyles);
      
      // Clean up
      document.body.removeChild(tempDiv);
    }
    
    // Update the input with original HTML content
    if (inputRef.current) {
      // Insert at caret position instead of replacing all content
      const selection = window.getSelection();
      if (selection && selection.rangeCount > 0) {
        selection.deleteFromDocument();
        // Use execCommand for compatibility
        document.execCommand('insertHTML', false, cleanedHtml || plainText);
      } else {
        // Fallback: append to end
        inputRef.current.innerHTML += cleanedHtml || plainText;
      }
      // After paste, defer state update to after DOM update
      setTimeout(() => {
        if (inputRef.current) {
          const newHtml = inputRef.current.innerHTML;
          const newText = inputRef.current.textContent || '';
          setInputText(newText);
          setOutputText(sanitizeHtml(newHtml));
        }
      }, 0);
    } else {
      setInputText(plainText);
    }
    
    // Update output with plain text
    setOutputText(plainText);
    
    // Update stripped styles only if there's content
    if (plainText.trim()) {
      if (styles.length > 0) {
        setStrippedStyles(styles.map(style => `Removed ${style}`));
      } else {
        setStrippedStyles(['No formatting detected']);
      }
    } else {
      setStrippedStyles([]);
    }
    
    setIsProcessing(false);
  };

  const resetInputFormat = () => {
    if (inputRef.current) {
      // Store the current text content
      const text = inputRef.current.textContent || '';
      // Clear everything including formatting
      inputRef.current.innerHTML = '';
      // If there was text, add it back without formatting
      if (text) {
        inputRef.current.textContent = text;
      }
      // Reset all styles
      inputRef.current.removeAttribute('style');
      // Set only the necessary default styles
      inputRef.current.style.cssText = `
        width: 100%;
        height: 100%;
        padding: 0.75rem;
        outline: none;
        overflow: auto;
        background-color: ${theme === 'dark' ? 'rgb(31, 41, 55)' : 'white'};
        color: ${theme === 'dark' ? 'rgb(74, 222, 128)' : 'rgb(31, 41, 55)'};
      `;
    }
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;
    if (!newText.trim()) {
      setStrippedStyles([]);
      resetInputFormat();
    }
    setInputText(newText);
    setOutputText(newText);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if ((e.key === 'Backspace' || e.key === 'Delete')) {
      const content = inputRef.current?.textContent || '';
      if (content.length <= 1) {  // Will become empty after this keypress
        setTimeout(resetInputFormat, 0);
      }
    }
  };

  const handleOutputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setOutputText(e.target.value);
  };

  const copyToClipboard = () => {
    if (outputText) {
      navigator.clipboard.writeText(outputText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const clearText = () => {
    setInputText('');
    if (inputRef.current) {
      inputRef.current.innerHTML = '';
    }
  };

  const modifyText = (type: 'lowercase' | 'uppercase' | 'titlecase') => {
    if (!outputText) return;
    
    let newText = outputText;
    
    switch (type) {
      case 'lowercase':
        newText = outputText.toLowerCase();
        break;
      case 'uppercase':
        newText = outputText.toUpperCase();
        break;
      case 'titlecase':
        newText = outputText
          .toLowerCase()
          .split(' ')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');
        break;
    }
    
    setOutputText(newText);
  };

  // When input changes, copy its HTML to output (sanitized)
  const handleInput = (e: React.FormEvent<HTMLDivElement>) => {
    const content = e.currentTarget.innerHTML;
    const textContent = e.currentTarget.textContent || '';
    if (textContent.length === 1 && !inputText) {
      resetInputFormat();
      setStrippedStyles([]);
    }
    setInputText(textContent);
    setOutputText(sanitizeHtml(content));
  };

  // Re-apply input box formatting when theme changes
  useEffect(() => {
    resetInputFormat();
  }, [theme]);

  // Text formatting functions for output
  const formatOutput = (command: 'bold' | 'italic' | 'underline') => {
    if (outputDivRef.current) {
      outputDivRef.current.focus();
      document.execCommand(command, false);
    }
  };

  // Only update output box HTML when outputText changes from outside (not on every keystroke)
  useEffect(() => {
    if (outputDivRef.current && outputText !== lastOutputText) {
      outputDivRef.current.innerHTML = outputText.replace(/\n/g, '<br>');
      setLastOutputText(outputText);
    }
    // eslint-disable-next-line
  }, [outputText]);

  // When user edits output, update state on blur
  const handleOutputInput = (e: React.FormEvent<HTMLDivElement>) => {
    // Do nothing here to avoid caret jump
  };
  const handleOutputBlur = (e: React.FocusEvent<HTMLDivElement>) => {
    setOutputText(sanitizeHtml(e.currentTarget.innerHTML));
    setLastOutputText(sanitizeHtml(e.currentTarget.innerHTML));
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-mono font-bold mb-2">Text Format Stripper</h2>
        <p className="font-mono opacity-80">Paste your formatted text below to strip all formatting</p>
      </div>
      
      <div className={`grid gap-6 items-stretch ${isOutputExpanded ? '' : 'grid-cols-1 md:grid-cols-2'}`}>
        {!isOutputExpanded && (
          <div className="flex flex-col h-full">
            <div className="flex items-center min-h-[48px] mb-2">
              <label htmlFor="input-text" className="block font-mono text-sm font-medium">
                Input Text
              </label>
            </div>
            <div className={`relative rounded-md overflow-hidden border ${
              theme === 'dark' ? 'border-gray-700' : 'border-amber-300'
            }`}>
              <div
                ref={inputRef}
                contentEditable
                className={`w-full min-h-64 h-64 max-h-64 p-3 text-sm resize-none focus:outline-none overflow-auto box-border ${
                  theme === 'dark' 
                    ? 'bg-gray-800 placeholder-gray-500' 
                    : 'bg-white placeholder-amber-300'
                }`}
                onPaste={handlePaste}
                onKeyDown={handleKeyDown}
                onInput={handleInput}
                role="textbox"
                aria-label="Input text"
                style={{ fontFamily: 'inherit' }}
              />
            </div>
            <div className="flex justify-between mt-2">
              <button
                onClick={clearText}
                className={`px-3 py-1 font-mono text-sm rounded flex items-center gap-1 ${
                  theme === 'dark'
                    ? 'bg-gray-800 hover:bg-gray-700'
                    : 'bg-amber-200 hover:bg-amber-300'
                }`}
              >
                <RotateCcw size={14} /> Clear
              </button>
              <TextStats text={inputText} />
            </div>
          </div>
        )}
        
        <div className={`flex flex-col h-full ${isOutputExpanded ? 'col-span-2' : ''}`}>
          <div className="flex items-center min-h-[48px] mb-2 justify-between w-full">
            <label htmlFor="output-text" className="block font-mono text-sm font-medium">
              Output Text
            </label>
            <div className="flex gap-2 items-center">
              <button type="button" className={`px-2 py-1 font-mono text-xs rounded border ${theme === 'dark' ? 'bg-gray-800 border-gray-700 hover:bg-gray-700' : 'bg-amber-100 border-amber-300 hover:bg-amber-200'}`} onClick={() => formatOutput('bold')} title="Bold"><b>B</b></button>
              <button type="button" className={`px-2 py-1 font-mono text-xs rounded border ${theme === 'dark' ? 'bg-gray-800 border-gray-700 hover:bg-gray-700' : 'bg-amber-100 border-amber-300 hover:bg-amber-200'}`} onClick={() => formatOutput('italic')} title="Italic"><i>I</i></button>
              <button type="button" className={`px-2 py-1 font-mono text-xs rounded border ${theme === 'dark' ? 'bg-gray-800 border-gray-700 hover:bg-gray-700' : 'bg-amber-100 border-amber-300 hover:bg-amber-200'}`} onClick={() => formatOutput('underline')} title="Underline"><u>U</u></button>
              <button
                onClick={() => setIsOutputExpanded(expanded => !expanded)}
                className={`p-2 rounded border flex items-center justify-center ${theme === 'dark' ? 'bg-gray-800 border-gray-700 hover:bg-gray-700' : 'bg-amber-100 border-amber-300 hover:bg-amber-200'}`}
                title={isOutputExpanded ? 'Collapse Output' : 'Expand Output'}
                aria-label={isOutputExpanded ? 'Collapse Output' : 'Expand Output'}
              >
                {isOutputExpanded ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
              </button>
            </div>
          </div>
          <div className={`relative rounded-md overflow-hidden border ${
            theme === 'dark' ? 'border-gray-700' : 'border-amber-300'
          }`}>
            <div
              id="output-text"
              ref={outputDivRef}
              contentEditable
              suppressContentEditableWarning
              className={`w-full min-h-64 h-64 p-3 font-mono text-sm resize-none focus:outline-none overflow-auto box-border ${
                theme === 'dark' 
                  ? 'bg-gray-800 text-green-400' 
                  : 'bg-white text-gray-800'
              } ${isProcessing ? 'animate-pulse' : ''}`}
              placeholder="Stripped text will appear here..."
              onInput={handleOutputInput}
              onBlur={handleOutputBlur}
              style={{ fontFamily: 'inherit', whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}
              dangerouslySetInnerHTML={{ __html: outputText }}
            />
          </div>
          <div className="flex justify-between mt-2">
            <button
              onClick={copyToClipboard}
              className={`px-3 py-1 font-mono text-sm rounded flex items-center gap-1 ${
                theme === 'dark'
                  ? 'bg-gray-800 hover:bg-gray-700'
                  : 'bg-amber-200 hover:bg-amber-300'
              } ${copied ? (theme === 'dark' ? 'text-green-400' : 'text-green-700') : ''}`}
              disabled={!outputText || copied}
            >
              {copied ? <Check size={14} /> : <Copy size={14} />}
              {copied ? 'Copied!' : 'Copy'}
            </button>
            <TextStats text={outputText} />
          </div>
          {strippedStyles.length > 0 && inputText.trim() && outputText.trim() && (
            <div className={`mt-4 p-3 rounded-md font-mono text-xs ${
              theme === 'dark' 
                ? 'bg-gray-800 border border-gray-700' 
                : 'bg-amber-50 border border-amber-200'
            }`}>
              <div className="flex items-center gap-1 mb-2 font-medium">
                <Info size={12} />
                <span>Changes Made:</span>
              </div>
              <ul className="space-y-1 opacity-80">
                {strippedStyles.map((style, i) => (
                  <li key={i} className="flex items-center">
                    <span className="mr-2">•</span>
                    <span>{style}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TextProcessor;