import { useState, useCallback } from 'react';
import TopBar from './components/TopBar';
import Dock from './components/Dock';
import Window from './components/Window';
import WindowContent from './components/WindowContent';
import TypewriterText from './components/TypewriterText';
import MirrorModal from './components/MirrorModal';
import OnboardingArrows from './components/OnboardingArrows';

const WINDOW_TITLES: { [key: string]: string } = {
  home: 'Beranda',
  about: 'Tentang Saya',
  skills: 'Keahlian & Teknologi',
  projects: 'Proyek Saya',
  documentation: 'Dokumentasi Kegiatan',
  certificates: 'Sertifikat & Pelatihan',
  contact: 'Hubungi Saya',
};

function App() {
  const [isDark, setIsDark] = useState(false);
  const [openWindows, setOpenWindows] = useState<string[]>(['home']);
  const [mirrorOpen, setMirrorOpen] = useState(false);
  const [showGuide, setShowGuide] = useState(true);

  const dismissGuide = useCallback(() => {
    setShowGuide(false);
  }, []);

  const toggleTheme = useCallback(() => {
    setShowGuide(false);
    setIsDark((prev) => !prev);
  }, []);

  const openApp = useCallback((app: string) => {
    setShowGuide(false);
    if (app === 'mirror') {
      setMirrorOpen(true);
    } else {
      setOpenWindows((prev) => {
        if (prev.includes(app)) {
          // Bring existing window to front
          return [...prev.filter((w) => w !== app), app];
        }
        return [...prev, app];
      });
    }
  }, []);

  const closeWindow = useCallback((app: string) => {
    setShowGuide(false);
    setOpenWindows((prev) => prev.filter((window) => window !== app));
  }, []);

  const focusWindow = useCallback((app: string) => {
    setOpenWindows((prev) => {
      if (prev[prev.length - 1] === app) return prev;
      return [...prev.filter((w) => w !== app), app];
    });
  }, []);

  const getWindowTitle = (app: string) => {
    return WINDOW_TITLES[app] || 'Window';
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDark ? 'bg-gray-900' : 'bg-gradient-to-br from-pink-100 via-purple-50 to-indigo-100'
      }`}>
      {/* macOS Monterey Wallpaper */}
      <div className="fixed inset-0 pointer-events-none" style={{ transform: 'translateZ(0)' }}>
        <div className={`w-full h-full transition-colors duration-300 ${isDark
            ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-black'
            : 'bg-gradient-to-br from-pink-200 via-purple-200 to-indigo-300'
          }`}>
          {/* Lightweight GPU-friendly radial glow instead of expensive blur-3xl filters */}
          <div
            className="absolute inset-0"
            style={{
              background: isDark
                ? 'radial-gradient(circle at 30% 35%, rgba(37, 99, 235, 0.28), transparent 45%), radial-gradient(circle at 70% 70%, rgba(147, 51, 234, 0.22), transparent 45%), radial-gradient(circle at 50% 50%, rgba(79, 70, 229, 0.2), transparent 40%)'
                : 'radial-gradient(circle at 30% 35%, rgba(244, 114, 182, 0.35), transparent 45%), radial-gradient(circle at 70% 70%, rgba(168, 85, 247, 0.25), transparent 45%), radial-gradient(circle at 50% 50%, rgba(129, 140, 248, 0.3), transparent 40%)',
            }}
          />
        </div>

        {/* Welcome Text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-4xl sm:text-6xl md:text-8xl font-light mb-4 md:mb-6 text-white" style={{
            fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Helvetica Neue", Arial, sans-serif',
            textShadow: '0 2px 20px rgba(0,0,0,0.3), 0 1px 4px rgba(0,0,0,0.2)'
          }}>
            My Portfolio
          </h1>
          <TypewriterText
            text="Feel free to explore the dock below!"
            isDark={isDark}
            paused={openWindows.length > 0 || mirrorOpen}
          />
        </div>
      </div>

      {/* Top Bar */}
      <TopBar isDark={isDark} />

      {/* Windows */}
      <div className="pt-6 min-h-screen relative">
        {openWindows.map((app, index) => (
          <Window
            key={app}
            id={app}
            title={getWindowTitle(app)}
            isDark={isDark}
            onClose={() => closeWindow(app)}
            onFocus={() => focusWindow(app)}
            onInteract={dismissGuide}
            zIndex={30 + index}
          >
            <WindowContent app={app} isDark={isDark} />
          </Window>
        ))}
      </div>

      {/* Onboarding 4 Animated Guide Arrows */}
      <OnboardingArrows
        visible={showGuide && openWindows.length === 1 && openWindows[0] === 'home'}
        isDark={isDark}
        onDismiss={dismissGuide}
      />

      {/* Dock */}
      <Dock
        isDark={isDark}
        onToggleTheme={toggleTheme}
        onAppClick={openApp}
      />

      {/* Mirror (Glass) Modal */}
      <MirrorModal isOpen={mirrorOpen} onClose={() => setMirrorOpen(false)} />
    </div>
  );
}

export default App;
