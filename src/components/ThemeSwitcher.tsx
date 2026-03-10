import { useTheme } from '@/theme/ThemeContext';

const ThemeSwitcher = () => {
  const { theme, toggleTheme } = useTheme();
  const isEnzo = theme === 'enzo';

  return (
    <button
      onClick={toggleTheme}
      aria-label={`Switch to ${isEnzo ? 'Modena' : 'Enzo'} mode`}
      className="relative flex items-center gap-1.5 px-2.5 py-1 rounded-full transition-all duration-500"
      style={{
        background: isEnzo ? 'rgba(255,255,255,0.04)' : 'rgba(11,11,16,0.06)',
        border: `1px solid ${isEnzo ? 'rgba(255,255,255,0.08)' : 'rgba(11,11,16,0.12)'}`,
      }}
    >
      {/* Enzo dot */}
      <span
        className="w-[14px] h-[14px] rounded-full transition-all duration-500 overflow-hidden flex-shrink-0"
        style={{
          opacity: isEnzo ? 1 : 0.35,
          transform: isEnzo ? 'scale(1)' : 'scale(0.75)',
          border: `1.5px solid ${isEnzo ? '#F8B4D9' : 'rgba(11,11,16,0.25)'}`,
        }}
      >
        {/* Split circle: black + pink */}
        <span className="block w-full h-full relative">
          <span className="absolute inset-0" style={{ background: '#0B0B10', clipPath: 'polygon(0 0, 50% 0, 50% 100%, 0 100%)' }} />
          <span className="absolute inset-0" style={{ background: '#F8B4D9', clipPath: 'polygon(50% 0, 100% 0, 100% 100%, 50% 100%)' }} />
        </span>
      </span>

      {/* Label */}
      <span
        className="font-clash text-[9px] tracking-[0.18em] uppercase transition-all duration-500"
        style={{ color: isEnzo ? 'rgba(255,252,247,0.35)' : 'rgba(11,11,16,0.40)' }}
      >
        {isEnzo ? 'Enzo' : 'Modena'}
      </span>

      {/* Modena dot */}
      <span
        className="w-[14px] h-[14px] rounded-full transition-all duration-500 overflow-hidden flex-shrink-0"
        style={{
          opacity: isEnzo ? 0.35 : 1,
          transform: isEnzo ? 'scale(0.75)' : 'scale(1)',
          border: `1.5px solid ${isEnzo ? 'rgba(11,11,16,0.20)' : '#F8B4D9'}`,
        }}
      >
        {/* Split circle: cream + pink */}
        <span className="block w-full h-full relative">
          <span className="absolute inset-0" style={{ background: '#F5F0EB', clipPath: 'polygon(0 0, 50% 0, 50% 100%, 0 100%)' }} />
          <span className="absolute inset-0" style={{ background: '#F8B4D9', clipPath: 'polygon(50% 0, 100% 0, 100% 100%, 50% 100%)' }} />
        </span>
      </span>
    </button>
  );
};

export default ThemeSwitcher;
