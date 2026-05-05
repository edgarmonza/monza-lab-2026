import { useTheme } from '@/theme/ThemeContext';

interface ThemeSwitcherProps {
  /** Compact mode — single dot, no label, no container.
   *  Use in nav. The dot's two halves invert between Enzo and Modena. */
  compact?: boolean;
}

const ThemeSwitcher = ({ compact = false }: ThemeSwitcherProps) => {
  const { theme, toggleTheme } = useTheme();
  const isEnzo = theme === 'enzo';

  if (compact) {
    return (
      <button
        onClick={toggleTheme}
        aria-label={`Switch to ${isEnzo ? 'Modena' : 'Enzo'} mode`}
        title={isEnzo ? 'Enzo · click for Modena' : 'Modena · click for Enzo'}
        className="relative flex items-center justify-center w-7 h-7 rounded-full transition-all duration-500 hover:scale-110"
        aria-pressed={!isEnzo}
      >
        <span
          className="block w-3.5 h-3.5 rounded-full overflow-hidden transition-all duration-500"
          style={{
            border: `1.5px solid #F8B4D9`,
            transform: isEnzo ? 'rotate(0deg)' : 'rotate(180deg)',
          }}
        >
          <span className="block w-full h-full relative">
            <span
              className="absolute inset-0"
              style={{
                background: '#0B0B10',
                clipPath: 'polygon(0 0, 50% 0, 50% 100%, 0 100%)',
              }}
            />
            <span
              className="absolute inset-0"
              style={{
                background: '#F8B4D9',
                clipPath: 'polygon(50% 0, 100% 0, 100% 100%, 50% 100%)',
              }}
            />
          </span>
        </span>
      </button>
    );
  }

  // Verbose mode for legacy usage / mobile menu — keeps the labeled pill
  return (
    <button
      onClick={toggleTheme}
      aria-label={`Switch to ${isEnzo ? 'Modena' : 'Enzo'} mode`}
      title={isEnzo ? 'Enzo · click for Modena' : 'Modena · click for Enzo'}
      className="relative flex items-center gap-1.5 px-2.5 py-1 rounded-full transition-all duration-500"
      style={{
        background: isEnzo ? 'rgba(255,255,255,0.04)' : 'rgba(11,11,16,0.06)',
        border: `1px solid ${isEnzo ? 'rgba(255,255,255,0.08)' : 'rgba(11,11,16,0.12)'}`,
      }}
    >
      <span
        className="rounded-full transition-all duration-500 overflow-hidden flex-shrink-0"
        style={{
          width: 14,
          height: 14,
          opacity: isEnzo ? 1 : 0.35,
          transform: isEnzo ? 'scale(1)' : 'scale(0.75)',
          border: `1.5px solid ${isEnzo ? '#F8B4D9' : 'rgba(11,11,16,0.25)'}`,
        }}
      >
        <span className="block w-full h-full relative">
          <span className="absolute inset-0" style={{ background: '#0B0B10', clipPath: 'polygon(0 0, 50% 0, 50% 100%, 0 100%)' }} />
          <span className="absolute inset-0" style={{ background: '#F8B4D9', clipPath: 'polygon(50% 0, 100% 0, 100% 100%, 50% 100%)' }} />
        </span>
      </span>
      <span
        className="font-clash text-[9px] tracking-[0.18em] uppercase transition-all duration-500"
        style={{ color: isEnzo ? 'rgba(255,252,247,0.35)' : 'rgba(11,11,16,0.40)' }}
      >
        {isEnzo ? 'Enzo' : 'Modena'}
      </span>
      <span
        className="rounded-full transition-all duration-500 overflow-hidden flex-shrink-0"
        style={{
          width: 14,
          height: 14,
          opacity: isEnzo ? 0.35 : 1,
          transform: isEnzo ? 'scale(0.75)' : 'scale(1)',
          border: `1.5px solid ${isEnzo ? 'rgba(11,11,16,0.20)' : '#F8B4D9'}`,
        }}
      >
        <span className="block w-full h-full relative">
          <span className="absolute inset-0" style={{ background: '#F5F0EB', clipPath: 'polygon(0 0, 50% 0, 50% 100%, 0 100%)' }} />
          <span className="absolute inset-0" style={{ background: '#F8B4D9', clipPath: 'polygon(50% 0, 100% 0, 100% 100%, 50% 100%)' }} />
        </span>
      </span>
    </button>
  );
};

export default ThemeSwitcher;
