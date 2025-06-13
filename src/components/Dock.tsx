import React, { useState, useRef } from 'react';
import { 
  Home, 
  User, 
  Code, 
  FolderOpen, 
  Mail, 
  Sun, 
  Moon,
  Camera // Tambahkan ikon kamera
} from 'lucide-react';


interface DockProps {
  isDark: boolean;
  onToggleTheme: () => void;
  onAppClick: (app: string) => void;
}

const Dock: React.FC<DockProps> = ({ isDark, onToggleTheme, onAppClick }) => {
  const [hoveredIcon, setHoveredIcon] = useState<string | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const dockRef = useRef<HTMLDivElement>(null);

  const apps = [
    { id: 'home', icon: Home, label: 'Home', color: 'from-blue-500 to-blue-600' },
    { id: 'about', icon: User, label: 'About', color: 'from-green-500 to-green-600' },
    { id: 'skills', icon: Code, label: 'Skills', color: 'from-purple-500 to-purple-600' },
    { id: 'projects', icon: FolderOpen, label: 'Projects', color: 'from-orange-500 to-orange-600' },
    { id: 'contact', icon: Mail, label: 'Contact', color: 'from-red-500 to-red-600' },
    { id: 'mirror', icon: Camera, label: 'Mirror', color: 'from-cyan-500 to-indigo-500' }, // ← Tambahan Camera

  ];

  const handleMouseMove = (e: React.MouseEvent) => {
    if (dockRef.current) {
      const rect = dockRef.current.getBoundingClientRect();
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
    }
  };

  const getIconScale = (iconIndex: number) => {
    if (!hoveredIcon) return 1;
    const hoveredIndex = apps.findIndex(app => app.id === hoveredIcon);
    if (hoveredIndex === -1) return 1;

    const distance = Math.abs(iconIndex - hoveredIndex);
    if (distance === 0) return 1.6;
    if (distance === 1) return 1.3;
    if (distance === 2) return 1.1;
    return 1;
  };

  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
      <div 
        ref={dockRef}
        className={`flex items-end space-x-2 px-4 py-3 rounded-2xl backdrop-blur-xl border transition-all duration-300 ${
          isDark 
            ? 'bg-gray-900/70 border-gray-700/50 shadow-2xl shadow-black/20' 
            : 'bg-white/70 border-white/30 shadow-2xl shadow-black/10'
        }`}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setHoveredIcon(null)}
        style={{
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)'
        }}
      >
        {apps.map((app, index) => {
          const IconComponent = app.icon;
          const isHovered = hoveredIcon === app.id;
          const scale = getIconScale(index);

          return (
            <div
              key={app.id}
              className="relative group cursor-pointer"
              onMouseEnter={() => setHoveredIcon(app.id)}
              onClick={() => onAppClick(app.id)}
            >
              {/* Tooltip */}
              <div className={`absolute -top-14 left-1/2 transform -translate-x-1/2 px-3 py-1 rounded-lg text-xs whitespace-nowrap transition-all duration-200 pointer-events-none ${
                isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
              } ${
                isDark 
                  ? 'bg-gray-800/90 text-white border border-gray-700/50' 
                  : 'bg-black/80 text-white'
              }`} style={{
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)'
              }}>
                {app.label}
                <div className={`absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent ${
                  isDark ? 'border-t-gray-800/90' : 'border-t-black/80'
                }`} />
              </div>

              {/* Icon */}
              <div 
                className="relative transition-all duration-300 ease-out"
                style={{ 
                  transform: `scale(${scale}) translateY(${scale > 1 ? -((scale - 1) * 2) : 0}px)`,
                  transformOrigin: 'bottom center'
                }}
              >
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${app.color} shadow-lg flex items-center justify-center transition-all duration-300 ${
                  isHovered ? 'shadow-xl' : ''
                }`}>
                  <IconComponent size={28} className="text-white drop-shadow-sm" />
                </div>
                <div className={`absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 rounded-full transition-all duration-200 ${
                  isDark ? 'bg-white' : 'bg-gray-800'
                } opacity-60`} />
              </div>
            </div>
          );
        })}

        {/* Separator */}
        <div className={`w-px h-12 mx-2 ${isDark ? 'bg-gray-600/50' : 'bg-gray-400/50'}`} />

        {/* Theme Toggle */}
        <div
          className="relative group cursor-pointer"
          onMouseEnter={() => setHoveredIcon('theme')}
          onClick={onToggleTheme}
        >
          <div className={`absolute -top-14 left-1/2 transform -translate-x-1/2 px-3 py-1 rounded-lg text-xs whitespace-nowrap transition-all duration-200 pointer-events-none ${
            hoveredIcon === 'theme' ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
          } ${
            isDark 
              ? 'bg-gray-800/90 text-white border border-gray-700/50' 
              : 'bg-black/80 text-white'
          }`} style={{
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)'
          }}>
            {isDark ? 'Light Mode' : 'Dark Mode'}
            <div className={`absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent ${
              isDark ? 'border-t-gray-800/90' : 'border-t-black/80'
            }`} />
          </div>

          <div 
            className="relative transition-all duration-300 ease-out"
            style={{ 
              transform: `scale(${hoveredIcon === 'theme' ? 1.6 : 1}) translateY(${hoveredIcon === 'theme' ? -2 : 0}px)`,
              transformOrigin: 'bottom center'
            }}
          >
            <div className={`w-14 h-14 rounded-xl shadow-lg flex items-center justify-center transition-all duration-300 ${
              isDark 
                ? 'bg-gradient-to-br from-yellow-400 to-orange-500' 
                : 'bg-gradient-to-br from-indigo-500 to-purple-600'
            } ${hoveredIcon === 'theme' ? 'shadow-xl' : ''}`}>
              {isDark ? (
                <Sun size={28} className="text-white drop-shadow-sm" />
              ) : (
                <Moon size={28} className="text-white drop-shadow-sm" />
              )}
            </div>
            <div className={`absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 rounded-full transition-all duration-200 ${
              isDark ? 'bg-white' : 'bg-gray-800'
            } opacity-60`} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dock;
