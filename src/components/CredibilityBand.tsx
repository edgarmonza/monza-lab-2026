import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useTheme } from "@/theme/ThemeContext";

const EASE = [0.16, 1, 0.3, 1] as const;

const PRESS = [
  {
    publication: "Forbes Colombia",
    quote: "Estos colombianos están electrificando clásicos de BMW para coleccionistas en Europa y Estados Unidos.",
    href: "https://forbes.co/2024/09/10/editors-picks/estos-colombianos-estan-electrificando-clasicos-de-bmw-para-coleccionistas-en-europa-y-estados-unidos",
    image: "/press/forbes-article.jpg",
  },
  {
    publication: "Motor Trend",
    quote: "BMW 2002 Bavarian Econs 2002te EV Swap — First Drive Review.",
    href: "https://www.motortrend.com/reviews/bmw-2002-bavarian-econs-2002te-ev-swap-first-drive-review",
    image: "/press/motortrend-article.jpg",
  },
];

const CredibilityBand = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const { theme } = useTheme();
  const isModena = theme === "modena";

  return (
    <section
      ref={ref}
      className="relative py-20 md:py-28 overflow-hidden"
      style={{ background: "transparent" }}
    >
      {/* Top separator */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[60%] max-w-[400px] h-px"
        style={{ background: "linear-gradient(to right, transparent, rgba(var(--text-rgb), 0.08), transparent)" }}
      />

      <div className="mx-auto w-full max-w-[900px] px-6">

        {/* Label */}
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: EASE }}
          className="font-clash text-[10px] tracking-[0.45em] uppercase text-center mb-12"
          style={{ color: "rgba(var(--text-rgb), 0.22)" }}
        >
          As seen in
        </motion.p>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {PRESS.map((item, i) => (
            <motion.a
              key={item.publication}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 + i * 0.12, ease: EASE }}
              className="group block rounded-xl overflow-hidden relative transition-all duration-400"
              style={{
                border: "1px solid rgba(var(--text-rgb), 0.06)",
                minHeight: "260px",
              }}
            >
              {/* Background image */}
              <img
                src={item.image}
                alt={item.publication}
                className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
              />

              {/* Theme-adaptive overlay — dark in dark mode, light in light mode */}
              <div
                className="absolute inset-0"
                style={{
                  background: isModena
                    ? "linear-gradient(to top, rgba(245,240,235,0.95) 0%, rgba(245,240,235,0.75) 40%, rgba(245,240,235,0.40) 100%)"
                    : "linear-gradient(to top, rgba(11,11,16,0.97) 0%, rgba(11,11,16,0.80) 40%, rgba(11,11,16,0.35) 100%)",
                }}
              />

              {/* Content */}
              <div className="relative z-10 p-6 flex flex-col justify-end h-full">
                <p
                  className="font-clash text-[10px] tracking-[0.3em] uppercase mb-4"
                  style={{ color: "rgba(248,180,217,0.60)" }}
                >
                  {item.publication}
                </p>

                <p
                  className="font-clash text-[15px] md:text-[17px] leading-snug mb-6"
                  style={{ color: isModena ? "rgba(11,11,16,0.80)" : "rgba(255,252,247,0.80)" }}
                >
                  "{item.quote}"
                </p>

                <span
                  className="font-clash text-[10px] tracking-[0.25em] uppercase transition-colors duration-300"
                  style={{ color: "rgba(248,180,217,0.50)" }}
                >
                  Leer artículo →
                </span>
              </div>
            </motion.a>
          ))}
        </div>

      </div>

      {/* Bottom separator */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[60%] max-w-[400px] h-px"
        style={{ background: "linear-gradient(to right, transparent, rgba(var(--text-rgb), 0.08), transparent)" }}
      />
    </section>
  );
};

export default CredibilityBand;
