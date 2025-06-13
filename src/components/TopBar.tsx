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

const TopBar: React.FC<TopBarProps> = ({ isDark }) => {
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
    
    return `${day} ${dateNum} ${month}, ${hours}:${minutes}`;
  };

  return (
    <div className={`fixed top-0 left-0 right-0 h-7 flex items-center justify-between px-4 text-sm font-medium z-50 backdrop-blur-xl transition-all duration-300 ${
      isDark 
        ? 'bg-gray-900/80 text-white border-b border-gray-700/30' 
        : 'bg-white/60 text-black border-b border-white/20'
    }`} style={{ 
      fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Helvetica Neue", Arial, sans-serif'
    }}>
      {/* Left side */}
      <div className="flex items-center space-x-6">
        <Apple size={16} className={isDark ? 'text-white' : 'text-black'} />
        <div className="flex items-center space-x-1 text-sm">
          <span className="font-semibold">Welcome</span>
          <span className="hover:bg-black/10 px-2 py-1 rounded cursor-pointer transition-colors">To</span>
          <span className="hover:bg-black/10 px-2 py-1 rounded cursor-pointer transition-colors">My</span>
          <span className="hover:bg-black/10 px-2 py-1 rounded cursor-pointer transition-colors">Personal</span>
          <span className="hover:bg-black/10 px-2 py-1 rounded cursor-pointer transition-colors">Website</span>
        </div>
      </div>

      {/* Right side */}
      <div className="flex items-center space-x-3">
        <Battery size={16} className="hover:bg-black/10 p-1 rounded cursor-pointer transition-colors" />
        <Wifi size={16} className="hover:bg-black/10 p-1 rounded cursor-pointer transition-colors" />
        <Search size={16} className="hover:bg-black/10 p-1 rounded cursor-pointer transition-colors" />
        <span className="font-mono text-sm ml-2">
          {formatTime(currentTime)}
        </span>
      </div>
    </div>
  );
};

export default TopBar;