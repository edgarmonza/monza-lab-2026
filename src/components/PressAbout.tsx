const PressAbout = () => {
  return (
    <div className="mt-10 bg-[#FFFCF7] border border-black/5 rounded-2xl p-6 md:p-8">
      <p className="text-monza-ink/60 text-xs tracking-wide uppercase mb-2">
        Lectura recomendada
      </p>
      <h4 className="font-display text-lg md:text-xl text-primary mb-2">
        La historia completa (como fundador)
      </h4>
      <p className="text-foreground/70 text-sm mb-5">
        Si quiere contexto de mi recorrido construyendo, empiece por acá.
      </p>
      <a
        href="https://theorg.com/iterate/bavarian-econs-how-two-colombians-are-reviving-germanys-iconic-auto-industry"
        target="_blank"
        rel="noreferrer noopener"
        className="inline-block group"
      >
        <img
          src="/press/theorg.png"
          alt="The Org"
          className="h-10 md:h-12 w-auto opacity-75 group-hover:opacity-100 group-hover:-translate-y-0.5 transition-all duration-200 mix-blend-multiply select-none"
        />
      </a>
    </div>
  );
};

export default PressAbout;
