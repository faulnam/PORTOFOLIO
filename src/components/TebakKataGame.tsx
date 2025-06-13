import React, { useState } from 'react';

interface GameProps {
  isDark: boolean;
}

const wordList = ['macbook', 'react', 'coding', 'portofolio', 'typescript', 'glass', 'mirror', 'apple'];

const TebakKataGame: React.FC<GameProps> = ({ isDark }) => {
  const [word] = useState(() => wordList[Math.floor(Math.random() * wordList.length)]);
  const [guess, setGuess] = useState('');
  const [status, setStatus] = useState('');
  const [tries, setTries] = useState(0);

  const handleSubmit = () => {
    if (guess.toLowerCase() === word) {
      setStatus('🎉 Benar! Kamu hebat!');
    } else {
      setTries(tries + 1);
      setStatus('❌ Salah, coba lagi!');
    }
  };

  const handleRestart = () => {
    window.location.reload();
  };

  return (
    <div className="p-6 text-center text-sm font-medium">
      <h2 className="text-xl font-bold mb-4">🧠 Tebak Kata</h2>
      <p className="mb-4 text-white/70">Tebak satu kata rahasia! (Clue: teknologi)</p>

      <input
        type="text"
        value={guess}
        onChange={(e) => setGuess(e.target.value)}
        className={`px-4 py-2 rounded-lg border w-full max-w-xs mx-auto text-center outline-none transition-all duration-300 ${
          isDark
            ? 'bg-gray-800 border-gray-600 text-white'
            : 'bg-white border-gray-300 text-black'
        }`}
        placeholder="Masukkan tebakan..."
      />

      <button
        onClick={handleSubmit}
        className="mt-4 block mx-auto px-4 py-1.5 rounded bg-blue-500 hover:bg-blue-600 text-white transition"
      >
        Tebak
      </button>

      {status && <p className="mt-4">{status}</p>}

      {status.includes('Benar') && (
        <button
          onClick={handleRestart}
          className="mt-2 text-xs text-white/70 hover:underline"
        >
          Main lagi?
        </button>
      )}

      <p className="mt-6 text-xs opacity-50">Tebakan ke-{tries}</p>
    </div>
  );
};

export default TebakKataGame;
