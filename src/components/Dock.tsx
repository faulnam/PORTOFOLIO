import React, { useState } from "react";
import {
  Home,
  User,
  Code,
  FolderOpen,
  Mail,
  Sun,
  Moon,
  Camera,
  Images,
  Award,
} from "lucide-react";

interface DockProps {
  isDark: boolean;
  onToggleTheme: () => void;
  onAppClick: (app: string) => void;
}

const APPS = [
  {
    id: "home",
    icon: Home,
    label: "Beranda",
    color: "from-blue-500 to-blue-600",
  },
  {
    id: "about",
    icon: User,
    label: "Tentang",
    color: "from-green-500 to-green-600",
  },
  {
    id: "skills",
    icon: Code,
    label: "Keahlian",
    color: "from-purple-500 to-purple-600",
  },
  {
    id: "projects",
    icon: FolderOpen,
    label: "Proyek",
    color: "from-orange-500 to-orange-600",
  },
  {
    id: "documentation",
    icon: Images,
    label: "Dokumentasi",
    color: "from-amber-500 to-rose-500",
  },
  {
    id: "certificates",
    icon: Award,
    label: "Sertifikat",
    color: "from-teal-500 to-teal-600",
  },
  {
    id: "contact",
    icon: Mail,
    label: "Kontak",
    color: "from-red-500 to-red-600",
  },
  {
    id: "mirror",
    icon: Camera,
    label: "Cermin",
    color: "from-cyan-500 to-indigo-500",
  },
];

const Dock: React.FC<DockProps> = React.memo(({ isDark, onToggleTheme, onAppClick }) => {
  const [hoveredIcon, setHoveredIcon] = useState<string | null>(null);

  const getIconScale = (iconIndex: number) => {
    if (!hoveredIcon) return 1;
    const hoveredIndex = APPS.findIndex((app) => app.id === hoveredIcon);
    if (hoveredIndex === -1) return 1;

    const distance = Math.abs(iconIndex - hoveredIndex);
    if (distance === 0) return 1.5;
    if (distance === 1) return 1.25;
    if (distance === 2) return 1.08;
    return 1;
  };

  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
      <div
        className={`flex items-end space-x-2 px-4 py-3 rounded-2xl backdrop-blur-md border transition-colors duration-200 ${
          isDark
            ? "bg-gray-900/80 border-gray-700/50 shadow-2xl shadow-black/20"
            : "bg-white/80 border-white/40 shadow-2xl shadow-black/10"
        }`}
        onMouseLeave={() => setHoveredIcon(null)}
      >
        {APPS.map((app, index) => {
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
              <div
                className={`absolute -top-14 left-1/2 transform -translate-x-1/2 px-3 py-1 rounded-lg text-xs whitespace-nowrap transition-all duration-150 pointer-events-none ${
                  isHovered
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-2"
                } ${
                  isDark
                    ? "bg-gray-800 text-white border border-gray-700"
                    : "bg-gray-900 text-white"
                }`}
              >
                {app.label}
                <div
                  className={`absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent ${
                    isDark ? "border-t-gray-800" : "border-t-gray-900"
                  }`}
                />
              </div>

              {/* Icon */}
              <div
                className="relative transition-transform duration-200 ease-out will-change-transform"
                style={{
                  transform: `scale(${scale}) translateY(${
                    scale > 1 ? -((scale - 1) * 2) : 0
                  }px)`,
                  transformOrigin: "bottom center",
                }}
              >
                <div
                  className={`w-14 h-14 rounded-xl bg-gradient-to-br ${
                    app.color
                  } shadow-lg flex items-center justify-center ${
                    isHovered ? "shadow-xl" : ""
                  }`}
                >
                  <IconComponent
                    size={28}
                    className="text-white drop-shadow-sm"
                  />
                </div>
                <div
                  className={`absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 rounded-full ${
                    isDark ? "bg-white" : "bg-gray-800"
                  } opacity-60`}
                />
              </div>
            </div>
          );
        })}

        {/* Separator */}
        <div
          className={`w-px h-12 mx-2 ${
            isDark ? "bg-gray-600/50" : "bg-gray-400/50"
          }`}
        />

        {/* Theme Toggle */}
        <div
          className="relative group cursor-pointer"
          onMouseEnter={() => setHoveredIcon("theme")}
          onClick={onToggleTheme}
        >
          <div
            className={`absolute -top-14 left-1/2 transform -translate-x-1/2 px-3 py-1 rounded-lg text-xs whitespace-nowrap transition-all duration-150 pointer-events-none ${
              hoveredIcon === "theme"
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-2"
            } ${
              isDark
                ? "bg-gray-800 text-white border border-gray-700"
                : "bg-gray-900 text-white"
            }`}
          >
            {isDark ? "Mode Terang" : "Mode Gelap"}
            <div
              className={`absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent ${
                isDark ? "border-t-gray-800" : "border-t-gray-900"
              }`}
            />
          </div>

          <div
            className="relative transition-transform duration-200 ease-out will-change-transform"
            style={{
              transform: `scale(${
                hoveredIcon === "theme" ? 1.5 : 1
              }) translateY(${hoveredIcon === "theme" ? -2 : 0}px)`,
              transformOrigin: "bottom center",
            }}
          >
            <div
              className={`w-14 h-14 rounded-xl shadow-lg flex items-center justify-center ${
                isDark
                  ? "bg-gradient-to-br from-yellow-400 to-orange-500"
                  : "bg-gradient-to-br from-indigo-500 to-purple-600"
              } ${hoveredIcon === "theme" ? "shadow-xl" : ""}`}
            >
              {isDark ? (
                <Sun size={28} className="text-white drop-shadow-sm" />
              ) : (
                <Moon size={28} className="text-white drop-shadow-sm" />
              )}
            </div>
            <div
              className={`absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 rounded-full ${
                isDark ? "bg-white" : "bg-gray-800"
              } opacity-60`}
            />
          </div>
        </div>
      </div>
    </div>
  );
});

export default Dock;
