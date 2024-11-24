import React from 'react';

const codeDisplay = ({ code = '' }) => {
  // Убедимся, что code всегда строка и разделим на строки
  const lines = String(code).split('\n');
  
  return (
    <div className="h-full overflow-y-auto w-full rounded-lg overflow-hidden bg-[#1e1e1e] font-mono text-sm">
      
      
      {/* Code container */}
      <div className="p-4 relative flex">
        {/* Line numbers */}
        <div className="flex-none mr-4 text-right select-none">
          {lines.map((_, index) => (
            <div key={index + 1} className="text-gray-600 pr-2">
              {index + 1}
            </div>
          ))}
        </div>
        
        {/* Code content */}
        <div className="flex-1 overflow-x-auto">
          {lines.map((line, index) => (
            <div key={index} className="text-gray-300">
              {(line || '').split(/(\s+)/).map((part, i) => {
                // Basic syntax highlighting
                if (part.match(/^(import|export|function|return|from)$/)) {
                  return <span key={i} className="text-[#C586C0]">{part}</span>;
                }
                if (part.startsWith('"') || part.startsWith("'")) {
                  return <span key={i} className="text-[#CE9178]">{part}</span>;
                }
                if (part.match(/^[A-Z][A-Za-z]+$/)) {
                  return <span key={i} className="text-[#4EC9B0]">{part}</span>;
                }
                if (part.startsWith('<') || part.startsWith('/>') || part.startsWith('</')) {
                  return <span key={i} className="text-[#808080]">{part}</span>;
                }
                return <span key={i}>{part}</span>;
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default codeDisplay;