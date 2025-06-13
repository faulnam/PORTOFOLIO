import { useState } from 'react';
import TopBar from './components/TopBar';
import Dock from './components/Dock';
import Window from './components/Window';
import WindowContent from './components/WindowContent';
import MirrorModal from './components/MirrorModal'; // ← Sudah ditambahkan



function App() {
  const [isDark, setIsDark] = useState(false);
  const [openWindows, setOpenWindows] = useState<string[]>([]);
  const [mirrorOpen, setMirrorOpen] = useState(false); // ← Tambahkan ini

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  const openApp = (app: string) => {
    if (app === 'mirror') {
      setMirrorOpen(true); // ← Buka kaca
    } else if (!openWindows.includes(app)) {
      setOpenWindows([...openWindows, app]);
    }
  };

  const closeWindow = (app: string) => {
    setOpenWindows(openWindows.filter(window => window !== app));
  };

  const getWindowTitle = (app: string) => {
    const titles: { [key: string]: string } = {
      home: 'Welcome',
      about: 'About Me',
      skills: 'Skills & Expertise',
      projects: 'My Projects',
      contact: 'Contact Me',
    };
    return titles[app] || 'Window';
  };

  return (
    <div className={`min-h-screen transition-all duration-500 ${
      isDark ? 'bg-gray-900' : 'bg-gradient-to-br from-pink-100 via-purple-50 to-indigo-100'
    }`}>
      {/* macOS Monterey Wallpaper */}
      <div className="fixed inset-0">
        <div className={`w-full h-full transition-all duration-500 ${
          isDark 
            ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-black'
            : 'bg-gradient-to-br from-pink-200 via-purple-200 to-indigo-300'
        }`}>
          {/* Abstract shapes */}
          <div className={`absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-40 blur-3xl ${
            isDark ? 'bg-gradient-to-r from-blue-600 to-purple-600' : 'bg-gradient-to-r from-pink-400 to-purple-400'
          }`} />
          <div className={`absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full opacity-30 blur-3xl ${
            isDark ? 'bg-gradient-to-r from-purple-600 to-indigo-600' : 'bg-gradient-to-r from-purple-400 to-indigo-400'
          }`} />
          <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full opacity-35 blur-3xl ${
            isDark ? 'bg-gradient-to-r from-indigo-600 to-pink-600' : 'bg-gradient-to-r from-indigo-400 to-pink-400'
          }`} />
        </div>

        {/* Welcome Text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <h1 className={`text-6xl md:text-8xl font-light mb-6 ${
            isDark ? 'text-white' : 'text-white'
          }`} style={{ 
            fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Helvetica Neue", Arial, sans-serif',
            textShadow: '0 2px 20px rgba(0,0,0,0.3), 0 1px 4px rgba(0,0,0,0.2)'
          }}>
            My Portofolio
          </h1>
          <p className={`text-xl md:text-2xl font-light ${
            isDark ? 'text-gray-200' : 'text-white'
          }`} style={{ 
            fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Helvetica Neue", Arial, sans-serif',
            textShadow: '0 1px 10px rgba(0,0,0,0.3)'
          }}>
            Feel free to explore the dock below!
          </p>
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
            zIndex={30 + index}
          >
            <WindowContent app={app} isDark={isDark} />
          </Window>
        ))}
      </div>

      {/* Dock */}
      <Dock 
        isDark={isDark} 
        onToggleTheme={toggleTheme}
        onAppClick={openApp} // ← sudah mendukung 'mirror'
      />

      {/* Mirror (Glass) Modal */}
      <MirrorModal isOpen={mirrorOpen} onClose={() => setMirrorOpen(false)} />
    </div>
  );
}

export default App;
