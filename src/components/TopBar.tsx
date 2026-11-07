import React, { useState, useEffect } from 'react';
import { 
  Apple, 
  Battery, 
  Wifi, 
  Search 
} from 'lucide-react';

interface TopBarProps {
  isDark: boolean;
}

const TopBar: React.FC<TopBarProps> = React.memo(({ isDark }) => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  const day = days[date.getDay()];
  const month = months[date.getMonth()];
  const dateNum = date.getDate();
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const seconds = date.getSeconds().toString().padStart(2, '0');

  return `${day} ${dateNum} ${month}, ${hours}:${minutes}:${seconds}`;
};


  return (
    <div className={`fixed top-0 left-0 right-0 h-7 flex items-center justify-between px-3 md:px-4 text-xs md:text-sm font-medium z-50 backdrop-blur-md transition-colors duration-200 ${
      isDark 
        ? 'bg-gray-900/85 text-white border-b border-gray-700/30' 
        : 'bg-white/75 text-black border-b border-white/20'
    }`} style={{ 
      fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Helvetica Neue", Arial, sans-serif'
    }}>
      {/* Left side */}
      <div className="flex items-center space-x-2 md:space-x-6 min-w-0">
        <Apple size={16} className={`shrink-0 ${isDark ? 'text-white' : 'text-black'}`} />
        <div className="flex items-center space-x-1 text-xs md:text-sm truncate">
          <span className="font-semibold">Welcome</span>
          <span className="hidden sm:inline hover:bg-black/10 px-2 py-1 rounded cursor-pointer transition-colors">To</span>
          <span className="hidden sm:inline hover:bg-black/10 px-2 py-1 rounded cursor-pointer transition-colors">My</span>
          <span className="hidden sm:inline hover:bg-black/10 px-2 py-1 rounded cursor-pointer transition-colors">Personal</span>
          <span className="hidden sm:inline hover:bg-black/10 px-2 py-1 rounded cursor-pointer transition-colors">Website</span>
        </div>
      </div>

      {/* Right side */}
      <div className="flex items-center space-x-2 md:space-x-3 shrink-0">
        <Battery size={16} className="shrink-0 hover:bg-black/10 md:p-1 rounded cursor-pointer transition-colors" />
        <Wifi size={16} className="shrink-0 hover:bg-black/10 md:p-1 rounded cursor-pointer transition-colors" />
        <Search size={16} className="hidden sm:block shrink-0 hover:bg-black/10 md:p-1 rounded cursor-pointer transition-colors" />
        <span className="font-mono text-[11px] md:text-sm ml-1 md:ml-2 whitespace-nowrap">
          {formatTime(currentTime)}
        </span>
      </div>
    </div>
  );
});

export default TopBar;