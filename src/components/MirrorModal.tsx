import { useEffect, useRef } from 'react';

interface MirrorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const MirrorModal: React.FC<MirrorModalProps> = ({ isOpen, onClose }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    let stream: MediaStream;

    if (isOpen && videoRef.current) {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then((mediaStream) => {
          stream = mediaStream;
          if (videoRef.current) {
            videoRef.current.srcObject = mediaStream;
            videoRef.current.play();
          }
        })
        .catch((err) => {
          console.error('Kamera gagal diakses:', err);
        });
    }

    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-lg z-[999] flex items-center justify-center px-4">
      <div className="relative bg-white/10 border border-white/30 rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.4)] backdrop-blur-2xl w-full max-w-md text-white overflow-hidden">
        
        {/* Title Bar ala macOS */}
        <div className="flex items-center justify-between px-4 py-2 bg-white/10 border-b border-white/20 rounded-t-2xl">
          <div className="flex space-x-2">
            <span className="w-3 h-3 bg-red-500 rounded-full"></span>
            <span className="w-3 h-3 bg-yellow-400 rounded-full"></span>
            <span className="w-3 h-3 bg-green-500 rounded-full"></span>
          </div>
          <span className="text-sm font-medium text-white/80">Mirror</span>
          <div className="w-6" />
        </div>

        <div className="p-6 text-center">
          <h2 className="text-xl font-semibold mb-2">💫 Cermin Diri</h2>
          <p className="text-sm italic opacity-80 mb-4">
            "Kamu luar biasa, jangan pernah lupakan itu."
          </p>

          {/* Mirror bubble */}
          <div className="relative w-48 h-48 mx-auto rounded-full overflow-hidden border border-white/30 shadow-inner bg-white/5">
            <video
              ref={videoRef}
              className="w-full h-full object-cover scale-x-[-1]"
              playsInline
              autoPlay
              muted
            />
          </div>

          <p className="mt-4 text-xs text-white/50">Bayanganmu ada dalam dirimu ✨</p>

          <button
            onClick={onClose}
            className="mt-6 text-sm px-4 py-1.5 rounded-md bg-white/20 hover:bg-white/30 border border-white/30 transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default MirrorModal;
