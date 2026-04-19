import { forwardRef, type AnchorHTMLAttributes } from "react";

type Size = "sm" | "md" | "lg";

type CTAButtonProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  size?: Size;
  external?: boolean;
  arrow?: boolean;
};

const sizeClasses: Record<Size, string> = {
  sm: "px-5 py-2 text-[11px] tracking-[0.2em]",
  md: "px-8 py-3.5 text-xs tracking-[0.2em]",
  lg: "px-10 py-4 text-sm tracking-[0.2em]",
};

const CTAButton = forwardRef<HTMLAnchorElement, CTAButtonProps>(
  ({ href, size = "md", external, arrow = false, className = "", children, ...rest }, ref) => {
    const isMailOrAnchor = href.startsWith("mailto:") || href.startsWith("#") || href.startsWith("/");
    const isExternal = external ?? !isMailOrAnchor;
    const externalProps = isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {};

    return (
      <a
        ref={ref}
        href={href}
        {...externalProps}
        className={[
          "inline-flex items-center justify-center gap-2 rounded-full font-semibold uppercase",
          "bg-[#F8B4D9] text-[#0b0b10]",
          "shadow-[0_6px_24px_-6px_rgba(248,180,217,0.4)]",
          "hover:bg-[#f4cbde] hover:shadow-[0_10px_36px_-6px_rgba(248,180,217,0.55)] hover:-translate-y-[1px]",
          "transition-all duration-300",
          sizeClasses[size],
          className,
        ].join(" ")}
        {...rest}
      >
        {children}
        {arrow && <span aria-hidden="true">→</span>}
      </a>
    );
  }
);

CTAButton.displayName = "CTAButton";

export default CTAButton;
