import React, { useEffect, useState, useCallback } from 'react';
import { X } from 'lucide-react';

interface OnboardingArrowsProps {
  visible: boolean;
  isDark: boolean;
  onDismiss: () => void;
}

interface GuideCoords {
  rx: number;
  ry: number;
  yx: number;
  yy: number;
  gx: number;
  gy: number;
  dx: number;
  dy: number;
  vw: number;
}

const OnboardingArrows: React.FC<OnboardingArrowsProps> = React.memo(({
  visible,
  isDark,
  onDismiss,
}) => {
  const [coords, setCoords] = useState<GuideCoords | null>(null);

  const measure = useCallback(() => {
    const closeEl = document.querySelector('[data-guide="close"]');
    const minEl = document.querySelector('[data-guide="minimize"]');
    const maxEl = document.querySelector('[data-guide="maximize"]');
    const dockEl = document.querySelector('[data-guide="dock"]');

    if (!closeEl || !minEl || !maxEl || !dockEl) {
      setCoords(null);
      return;
    }

    const rRect = closeEl.getBoundingClientRect();
    const yRect = minEl.getBoundingClientRect();
    const gRect = maxEl.getBoundingClientRect();
    const dRect = dockEl.getBoundingClientRect();

    setCoords({
      rx: rRect.left + rRect.width / 2,
      ry: rRect.top + rRect.height / 2,
      yx: yRect.left + yRect.width / 2,
      yy: yRect.top + yRect.height / 2,
      gx: gRect.left + gRect.width / 2,
      gy: gRect.top + gRect.height / 2,
      dx: dRect.left + dRect.width / 2,
      dy: dRect.top,
      vw: window.innerWidth,
    });
  }, []);

  useEffect(() => {
    if (!visible) return;

    const initialTimer = setTimeout(measure, 220);
    const backupTimer = setTimeout(measure, 450);

    window.addEventListener('resize', measure);
    return () => {
      clearTimeout(initialTimer);
      clearTimeout(backupTimer);
      window.removeEventListener('resize', measure);
    };
  }, [visible, measure]);

  if (!visible || !coords) return null;

  const isMobile = coords.vw < 640;

  // 1. Green (Maximize) — Row 1 (Highest)
  const gTipX = coords.gx + 7;
  const gTipY = coords.gy + 7;
  const gTailX = coords.gx + (isMobile ? 32 : 52);
  const gTailY = coords.gy + (isMobile ? 18 : 22);
  const gCtrlX = coords.gx + (isMobile ? 15 : 22);
  const gCtrlY = gTailY;

  // 2. Yellow (Minimize) — Row 2 (Middle)
  const yTipX = coords.yx + 2;
  const yTipY = coords.yy + 9;
  const yTailX = coords.yx + (isMobile ? 22 : 38);
  const yTailY = coords.yy + (isMobile ? 44 : 50);
  const yCtrlX = coords.yx + 3;
  const yCtrlY = yTailY - 4;

  // 3. Red (Close) — Row 3 (Lowest)
  const rTipX = coords.rx;
  const rTipY = coords.ry + 9;
  const rTailX = coords.rx + (isMobile ? 14 : 24);
  const rTailY = coords.ry + (isMobile ? 70 : 78);
  const rCtrlX = coords.rx;
  const rCtrlY = rTailY - 4;

  const labelColor = isDark ? 'text-gray-100' : 'text-gray-900';
  const labelHaloStyle: React.CSSProperties = isDark
    ? { textShadow: '0 1px 4px rgba(0,0,0,0.85)' }
    : { textShadow: '0 0 8px rgba(255,255,255,0.98), 0 1px 2px rgba(255,255,255,0.95)' };

  return (
    <div
      className="fixed inset-0 z-[60] pointer-events-none select-none overflow-hidden"
      aria-hidden="true"
    >
      {/* Animated Curved SVG Arrows & Target Halo Rings */}
      <svg className="w-full h-full">
        <defs>
          <marker
            id="guide-arrow-red"
            markerWidth="8"
            markerHeight="8"
            refX="6.5"
            refY="4"
            orient="auto"
          >
            <path
              d="M 1.2 1.2 L 6.8 4 L 1.2 6.8"
              fill="none"
              stroke="#ef4444"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </marker>

          <marker
            id="guide-arrow-yellow"
            markerWidth="8"
            markerHeight="8"
            refX="6.5"
            refY="4"
            orient="auto"
          >
            <path
              d="M 1.2 1.2 L 6.8 4 L 1.2 6.8"
              fill="none"
              stroke="#f59e0b"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </marker>

          <marker
            id="guide-arrow-green"
            markerWidth="8"
            markerHeight="8"
            refX="6.5"
            refY="4"
            orient="auto"
          >
            <path
              d="M 1.2 1.2 L 6.8 4 L 1.2 6.8"
              fill="none"
              stroke="#10b981"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </marker>

          <marker
            id="guide-arrow-blue"
            markerWidth="8"
            markerHeight="8"
            refX="6.5"
            refY="4"
            orient="auto"
          >
            <path
              d="M 1.2 1.2 L 6.8 4 L 1.2 6.8"
              fill="none"
              stroke="#2563eb"
              strokeWidth="1.9"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </marker>
        </defs>

        {/* Subtle Pulsing Halo Rings around the 3 Traffic Lights */}
        <circle
          cx={coords.rx}
          cy={coords.ry}
          r="8.5"
          fill="none"
          stroke="#ef4444"
          strokeWidth="1.4"
          className="animate-guide-ring"
        />
        <circle
          cx={coords.yx}
          cy={coords.yy}
          r="8.5"
          fill="none"
          stroke="#f59e0b"
          strokeWidth="1.4"
          className="animate-guide-ring"
          style={{ animationDelay: '200ms' }}
        />
        <circle
          cx={coords.gx}
          cy={coords.gy}
          r="8.5"
          fill="none"
          stroke="#10b981"
          strokeWidth="1.4"
          className="animate-guide-ring"
          style={{ animationDelay: '400ms' }}
        />

        {/* Arrow 1: Red (Close) */}
        <g className="animate-guide-float-up" style={{ animationDelay: '240ms' }}>
          <path
            d={`M ${rTailX} ${rTailY} Q ${rCtrlX} ${rCtrlY} ${rTipX} ${rTipY}`}
            fill="none"
            stroke="#ef4444"
            strokeWidth="1.8"
            strokeLinecap="round"
            markerEnd="url(#guide-arrow-red)"
            className="animate-guide-draw"
            style={{ animationDelay: '60ms' }}
          />
        </g>

        {/* Arrow 2: Yellow (Minimize) */}
        <g className="animate-guide-float-up" style={{ animationDelay: '120ms' }}>
          <path
            d={`M ${yTailX} ${yTailY} Q ${yCtrlX} ${yCtrlY} ${yTipX} ${yTipY}`}
            fill="none"
            stroke="#f59e0b"
            strokeWidth="1.8"
            strokeLinecap="round"
            markerEnd="url(#guide-arrow-yellow)"
            className="animate-guide-draw"
            style={{ animationDelay: '180ms' }}
          />
        </g>

        {/* Arrow 3: Green (Maximize) */}
        <g className="animate-guide-float-up">
          <path
            d={`M ${gTailX} ${gTailY} Q ${gCtrlX} ${gCtrlY} ${gTipX} ${gTipY}`}
            fill="none"
            stroke="#10b981"
            strokeWidth="1.8"
            strokeLinecap="round"
            markerEnd="url(#guide-arrow-green)"
            className="animate-guide-draw"
            style={{ animationDelay: '300ms' }}
          />
        </g>
      </svg>

      {/* Label 3: Green -> Maximize */}
      <div
        style={{ left: gTailX + 6, top: gTailY - 9, animationDelay: '260ms' }}
        className="fixed pointer-events-auto animate-guide-badge"
      >
        <span
          onClick={onDismiss}
          style={labelHaloStyle}
          className={`block cursor-pointer text-xs md:text-[13px] font-medium tracking-tight whitespace-nowrap animate-guide-float-up ${labelColor}`}
        >
          Maximize
        </span>
      </div>

      {/* Label 2: Yellow -> Minimize */}
      <div
        style={{ left: yTailX + 6, top: yTailY - 9, animationDelay: '140ms' }}
        className="fixed pointer-events-auto animate-guide-badge"
      >
        <span
          onClick={onDismiss}
          style={{ ...labelHaloStyle, animationDelay: '120ms' }}
          className={`block cursor-pointer text-xs md:text-[13px] font-medium tracking-tight whitespace-nowrap animate-guide-float-up ${labelColor}`}
        >
          Minimize
        </span>
      </div>

      {/* Label 1: Red -> Close */}
      <div
        style={{ left: rTailX + 6, top: rTailY - 9, animationDelay: '40ms' }}
        className="fixed pointer-events-auto animate-guide-badge"
      >
        <span
          onClick={onDismiss}
          style={{ ...labelHaloStyle, animationDelay: '240ms' }}
          className={`block cursor-pointer text-xs md:text-[13px] font-medium tracking-tight whitespace-nowrap animate-guide-float-up ${labelColor}`}
        >
          Close
        </span>
      </div>

      {/* Label 4: Dock Hint + Close (X) Button + Curved Downward Arrow */}
      <div
        style={{
          left: coords.dx,
          top: coords.dy - (isMobile ? 34 : 38),
          transform: 'translateX(-50%)',
        }}
        className="fixed z-10 pointer-events-auto max-w-[94vw]"
      >
        <div
          style={{ animationDelay: '380ms' }}
          className="animate-guide-badge"
        >
          <div className="flex items-start gap-1.5 whitespace-nowrap animate-guide-bounce-down">
            <span
              onClick={onDismiss}
              style={labelHaloStyle}
              className={`cursor-pointer text-xs md:text-[13px] font-medium tracking-tight ${labelColor}`}
            >
              Klik ikon untuk buka lainnya
            </span>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onDismiss();
              }}
              className={`mt-0.5 p-0.5 rounded-full transition-colors ${
                isDark
                  ? 'bg-white/15 hover:bg-white/30 text-white'
                  : 'bg-black/10 hover:bg-black/20 text-gray-900'
              }`}
              title="Tutup petunjuk"
              aria-label="Tutup petunjuk"
            >
              <X size={12} />
            </button>
            <svg
              width="24"
              height="28"
              viewBox="0 0 24 28"
              className="overflow-visible shrink-0 mt-1"
            >
              <defs>
                <marker
                  id="guide-arrow-blue-dock"
                  markerWidth="8"
                  markerHeight="8"
                  refX="6.5"
                  refY="4"
                  orient="auto"
                >
                  <path
                    d="M 1.2 1.2 L 6.8 4 L 1.2 6.8"
                    fill="none"
                    stroke="#2563eb"
                    strokeWidth="1.9"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </marker>
              </defs>
              <path
                d="M 1 3 Q 17 3 17 23"
                fill="none"
                stroke="#2563eb"
                strokeWidth="1.9"
                strokeLinecap="round"
                markerEnd="url(#guide-arrow-blue-dock)"
                className="animate-guide-draw"
                style={{ animationDelay: '420ms' }}
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
});

export default OnboardingArrows;
