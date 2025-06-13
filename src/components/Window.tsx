import React, { useState, useRef, useEffect } from 'react';

interface WindowProps {
  id: string;
  title: string;
  children: React.ReactNode;
  isDark: boolean;
  onClose: () => void;
  zIndex?: number;
}

const Window: React.FC<WindowProps> = ({ 
  id, 
  title, 
  children, 
  isDark, 
  onClose,
  zIndex = 30 
}) => {
  const [isMinimized, setIsMinimized] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const windowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Center window on mount
    if (windowRef.current) {
      const rect = windowRef.current.getBoundingClientRect();
      setPosition({
        x: (window.innerWidth - rect.width) / 2,
        y: (window.innerHeight - rect.height) / 2
      });
    }
  }, []);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({
      x: e.clientX - position.x,
      y: e.clientY - position.y
    });
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging) {
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, dragStart]);

  if (isMinimized) {
    return null;
  }

  return (
    <div 
      className="fixed pointer-events-none"
      style={{ zIndex }}
    >
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/20 backdrop-blur-sm pointer-events-auto"
        onClick={onClose}
      />
      
      {/* Window */}
      <div 
        ref={windowRef}
        className={`relative w-full max-w-4xl max-h-[85vh] rounded-xl shadow-2xl overflow-hidden pointer-events-auto transition-all duration-300 ${
          isDark 
            ? 'bg-gray-900/95 border border-gray-700/50' 
            : 'bg-white/95 border border-gray-200/50'
        }`}
        style={{
          transform: `translate(${position.x}px, ${position.y}px)`,
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.1)'
        }}
      >
        {/* Title Bar */}
        <div 
          className={`flex items-center justify-between px-5 py-4 border-b cursor-move select-none ${
            isDark 
              ? 'border-gray-700/50 bg-gray-800/50' 
              : 'border-gray-200/50 bg-gray-50/50'
          }`}
          onMouseDown={handleMouseDown}
          style={{
            fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Helvetica Neue", Arial, sans-serif'
          }}
        >
          {/* Traffic Lights */}
          <div className="flex items-center space-x-2">
            <button
              onClick={onClose}
              className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600 transition-colors shadow-sm hover:shadow-md transform hover:scale-110 duration-150"
            />
            <button
              onClick={() => setIsMinimized(true)}
              className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-600 transition-colors shadow-sm hover:shadow-md transform hover:scale-110 duration-150"
            />
            <button 
              className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-600 transition-colors shadow-sm hover:shadow-md transform hover:scale-110 duration-150"
            />
          </div>

          {/* Title */}
          <h2 className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
            {title}
          </h2>

          {/* Spacer */}
          <div className="w-16" />
        </div>

        {/* Content */}
        <div className="overflow-y-auto max-h-[calc(85vh-70px)] scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Window;