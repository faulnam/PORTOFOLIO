import React, { useState, useRef, useEffect, useCallback } from 'react';

interface WindowProps {
  id: string;
  title: string;
  children: React.ReactNode;
  isDark: boolean;
  onClose: () => void;
  onFocus?: () => void;
  onInteract?: () => void;
  zIndex?: number;
}

const Window: React.FC<WindowProps> = React.memo(({ 
  id,
  title, 
  children, 
  isDark, 
  onClose,
  onFocus,
  onInteract,
  zIndex = 30 
}) => {
  const [isMinimized, setIsMinimized] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const windowRef = useRef<HTMLDivElement>(null);
  const offsetRef = useRef({ x: 0, y: 0 });
  const dragStartRef = useRef({ x: 0, y: 0 });
  const isDraggingRef = useRef(false);
  const rafRef = useRef<number | null>(null);

  const isWide = id === 'projects' || id === 'documentation';
  const sizeClass = isMaximized 
    ? 'w-[96vw] md:w-[98vw] max-w-7xl h-[calc(100dvh-6.5rem)] md:h-[88vh]' 
    : isWide 
      ? 'w-[94vw] md:w-[92vw] max-w-5xl max-h-[calc(100dvh-6.5rem)] md:max-h-[85vh]' 
      : 'w-[94vw] md:w-[90vw] max-w-4xl max-h-[calc(100dvh-6.5rem)] md:max-h-[85vh]';

  const applyTransform = useCallback((x: number, y: number) => {
    if (windowRef.current) {
      windowRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    }
  }, []);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (isMaximized) return;
    if (window.innerWidth < 768) return;
    if ((e.target as HTMLElement).closest('button')) return;
    onFocus?.();
    onInteract?.();
    isDraggingRef.current = true;
    dragStartRef.current = {
      x: e.clientX - offsetRef.current.x,
      y: e.clientY - offsetRef.current.y
    };
    document.body.style.userSelect = 'none';
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDraggingRef.current) return;
      const nextX = e.clientX - dragStartRef.current.x;
      const nextY = e.clientY - dragStartRef.current.y;
      offsetRef.current = { x: nextX, y: nextY };

      if (rafRef.current === null) {
        rafRef.current = requestAnimationFrame(() => {
          applyTransform(offsetRef.current.x, offsetRef.current.y);
          rafRef.current = null;
        });
      }
    };

    const handleMouseUp = () => {
      if (isDraggingRef.current) {
        isDraggingRef.current = false;
        document.body.style.userSelect = '';
        if (rafRef.current !== null) {
          cancelAnimationFrame(rafRef.current);
          rafRef.current = null;
        }
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [applyTransform]);

  if (isMinimized) {
    return null;
  }

  const toggleMaximize = () => {
    setIsMaximized((prev) => {
      const next = !prev;
      if (next) {
        applyTransform(0, 0);
      } else {
        applyTransform(offsetRef.current.x, offsetRef.current.y);
      }
      return next;
    });
  };

  return (
    <div 
      className="fixed inset-0 flex items-center justify-center p-2.5 pt-9 pb-16 md:p-4 md:pt-10 md:pb-24 pointer-events-none"
      style={{ zIndex }}
      onMouseDown={() => onFocus?.()}
    >
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/25 pointer-events-auto"
        onClick={onClose}
      />
      
      {/* Window */}
      <div 
        ref={windowRef}
        className={`relative ${sizeClass} rounded-xl shadow-2xl overflow-hidden pointer-events-auto animate-window-open ${
          isDark 
            ? 'bg-gray-900 border border-gray-700/70' 
            : 'bg-white border border-gray-200/80'
        }`}
        style={{
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.35), 0 0 0 1px rgba(255, 255, 255, 0.1)',
          willChange: 'transform',
        }}
      >
        {/* Title Bar */}
        <div 
          className={`flex items-center justify-between px-3.5 py-2.5 md:px-5 md:py-3.5 border-b md:cursor-move select-none ${
            isDark 
              ? 'border-gray-700/70 bg-gray-800' 
              : 'border-gray-200/80 bg-gray-50'
          }`}
          onMouseDown={handleMouseDown}
          style={{
            fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Helvetica Neue", Arial, sans-serif'
          }}
        >
          {/* Traffic Lights */}
          <div className="flex items-center space-x-2 shrink-0">
            <button
              data-guide={id === 'home' ? 'close' : undefined}
              onClick={onClose}
              className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600 transition-transform duration-150 hover:scale-110"
              title="Close"
              aria-label="Close window"
            />
            <button
              data-guide={id === 'home' ? 'minimize' : undefined}
              onClick={() => {
                onInteract?.();
                setIsMinimized(true);
              }}
              className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-600 transition-transform duration-150 hover:scale-110"
              title="Minimize"
              aria-label="Minimize window"
            />
            <button 
              data-guide={id === 'home' ? 'maximize' : undefined}
              onClick={() => {
                onInteract?.();
                toggleMaximize();
              }}
              className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-600 transition-transform duration-150 hover:scale-110"
              title="Maximize"
              aria-label="Maximize window"
            >
              <span className="sr-only">Maximize</span>
            </button>
          </div>

          {/* Title */}
          <h2 className={`text-xs md:text-sm font-medium truncate px-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            {title}
          </h2>

          {/* Spacer */}
          <div className="w-11 md:w-16 shrink-0" />
        </div>

        {/* Content */}
        <div className={`overflow-y-auto window-scroll ${
          isMaximized ? 'h-[calc(100dvh-6.5rem-41px)] md:h-[calc(85vh-53px)]' : 'max-h-[calc(100dvh-6.5rem-41px)] md:max-h-[calc(82vh-53px)]'
        } scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent`}>
          {children}
        </div>
      </div>
    </div>
  );
});

export default Window;