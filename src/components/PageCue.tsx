import { Link } from "react-router-dom";

interface PageCueProps {
  parentLabel?: string;
  parentHref?: string;
  currentLabel: string;
}

const PageCue = ({ 
  parentLabel = "Sistemas Monza", 
  parentHref = "/#sistemas",
  currentLabel 
}: PageCueProps) => {
  return (
    <div className="mx-auto w-full max-w-[1120px] px-6 sm:px-8 lg:px-10 pt-4 pb-2">
      <nav className="flex items-center gap-2 text-xs tracking-[0.15em]">
        <Link 
          to={parentHref}
          className="text-[#FFFCF7]/45 hover:text-[#FFFCF7]/60 transition-colors duration-200"
        >
          {parentLabel}
        </Link>
        <span className="text-[#F8B4D9]/55">/</span>
        <span className="text-[#FFFCF7]/45">{currentLabel}</span>
      </nav>
    </div>
  );
};

export default PageCue;
