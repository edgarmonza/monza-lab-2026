interface HelmetIconProps {
  className?: string;
  variant?: "solid" | "ghost";
  shellColor?: string;
  visorColor?: string;
  style?: React.CSSProperties;
}

/**
 * Racing helmet icon — replaces the "O" in MONZA.
 * Clean single-path design, front-view full-face helmet.
 *
 * Variants:
 *  - solid: Filled shell (for dark backgrounds)
 *  - ghost: Outline shell + filled visor (for light backgrounds or outline logos)
 */
const HelmetIcon = ({
  className = "",
  variant = "solid",
  shellColor = "#F8B4D9",
  visorColor,
  style,
}: HelmetIconProps) => {
  // 6-E: tall dome (Arai-inspired), visor low, zero decorative details — minimal for all uses
  const SHELL =
    "M60 3C36 3 12 18 7 40C2 57 2 72 6 86L15 103C23 113 38 118 57 118L60 118L63 118C82 118 97 113 105 103L114 86C118 72 118 57 113 40C108 18 84 3 60 3Z";
  const VISOR =
    "M14 46C14 36 33 30 60 30C87 30 106 36 106 46L106 68C105 77 86 83 60 83C34 83 15 77 14 68Z";
  const CHIN =
    "M26 90Q60 86 94 90";

  if (variant === "ghost") {
    const vFill = visorColor || "#F8B4D9";
    return (
      <svg viewBox="0 0 120 121" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} style={style}>
        <path d={SHELL} fill="none" stroke={shellColor} strokeWidth="2.5" />
        <path d={VISOR} fill={vFill} />
        <path d={CHIN} stroke={shellColor} strokeWidth="1" opacity="0.10" fill="none" />
      </svg>
    );
  }

  const vFill = visorColor || "#0d0d18";
  return (
    <svg viewBox="0 0 120 121" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} style={style}>
      <path d={SHELL} fill={shellColor} />
      <path d={VISOR} fill={vFill} />
      <path d={CHIN} stroke="rgba(0,0,0,0.14)" strokeWidth="1" fill="none" />
    </svg>
  );
};

export default HelmetIcon;
