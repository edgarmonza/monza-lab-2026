import { ImageResponse } from '@vercel/og';

export const config = { runtime: 'edge' };

const SITE_URL = 'https://monzalab.com';

/* ──────────────────────────────────────────
   PER-PAGE OG CONFIG
   Each card is an editorial split layout.
   Left = wordmark + headline + tagline.
   Right = a venture-specific image (loaded from public/).
   ────────────────────────────────────────── */
type OGEntry = {
  eyebrow: string;
  headline: string;
  sub: string;
  accent: string;
  image: string;
};

/* Ventures shown in the home mosaic — 2×2 grid, top-left clockwise. */
const HOME_MOSAIC = [
  {
    name: 'Studio',
    accent: '#f074aa',
    image: `${SITE_URL}/images/people/santi/santi-clubmaster.png`,
  },
  {
    name: 'Haus',
    accent: '#F8B4D9',
    image: `${SITE_URL}/images/projects/monza-haus-cover.png`,
  },
  {
    name: 'Index',
    accent: '#FFFCF7',
    image: `${SITE_URL}/images/projects/ia-index-cover.jpg`,
  },
  {
    name: 'Bavarian',
    accent: '#A8A29E',
    image: `${SITE_URL}/images/projects/bavarian-econs/coast-frontal.jpeg`,
  },
];

const OG_PAGES: Record<string, OGEntry> = {
  home: {
    eyebrow: 'MONZA LAB · COMPANY BUILDER',
    headline: '4 Ventures. 1 Founder.',
    sub: 'AI-Native Company Builder. Construido con criterio.',
    accent: '#F8B4D9',
    image: `${SITE_URL}/images/Edgar/edgar-about.png`,
  },
  monzastudio: {
    eyebrow: 'MONZA STUDIO · VENTURE 03',
    headline: 'No delego marcas. Las construyo.',
    sub: 'Branding · Content · E-commerce · Growth · con criterio editorial.',
    accent: '#f074aa',
    image: `${SITE_URL}/images/brands/eleonora/eleonora-portrait.jpg`,
  },
  monzahaus: {
    eyebrow: 'MONZAHAUS · VENTURE 01',
    headline: 'Decisiones inteligentes para el ecosistema Porsche.',
    sub: '35.000+ Porsches · JP · EU · USA · una sola plataforma AI-native.',
    accent: '#F8B4D9',
    image: `${SITE_URL}/images/projects/monza-haus-cover.png`,
  },
  monzaindex: {
    eyebrow: 'MONZA INDEX · VENTURE 02',
    headline: 'Medir la IA no basta. Hay que entenderla.',
    sub: '6 dimensiones auditables. Colombia · LATAM · Mundo.',
    accent: '#FFFCF7',
    image: `${SITE_URL}/images/projects/ia-index-cover.jpg`,
  },
  bavarianecons: {
    eyebrow: 'BAVARIAN ECONS · VENTURE 04',
    headline: 'BMW clásicos, ahora eléctricos.',
    sub: 'German Engineering. Latin Soul. Hecho a mano en Munich.',
    accent: '#A8A29E',
    image: `${SITE_URL}/images/projects/bavarian-econs/coast-frontal.jpeg`,
  },
};

const fallback: OGEntry = OG_PAGES.home;

export default async function handler(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const pageKey = (searchParams.get('page') ?? 'home').toLowerCase();
    const cfg = OG_PAGES[pageKey] ?? fallback;

    return new ImageResponse(
      (
        <div
          style={{
            display: 'flex',
            width: '100%',
            height: '100%',
            background: '#0B0B10',
            fontFamily: 'system-ui, -apple-system, sans-serif',
            position: 'relative',
          }}
        >
          {/* Subtle accent glow top-left */}
          <div
            style={{
              position: 'absolute',
              top: -120,
              left: -120,
              width: 520,
              height: 520,
              borderRadius: '50%',
              background: `radial-gradient(circle, ${cfg.accent}26 0%, transparent 70%)`,
            }}
          />
          {/* Left column — copy + wordmark */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              padding: '64px 56px',
              width: '60%',
              height: '100%',
              position: 'relative',
              zIndex: 1,
            }}
          >
            {/* Wordmark MONZA LAB */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 0,
                }}
              >
                <span
                  style={{
                    fontSize: 36,
                    fontWeight: 800,
                    color: '#FFFCF7',
                    letterSpacing: '-0.02em',
                  }}
                >
                  M
                </span>
                {/* Helmet placeholder — pink circle for the O */}
                <div
                  style={{
                    width: 30,
                    height: 30,
                    borderRadius: '50%',
                    background: '#F8B4D9',
                    margin: '0 2px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <div
                    style={{
                      width: 22,
                      height: 9,
                      background: '#1a1a2a',
                      borderRadius: 5,
                      marginTop: -4,
                    }}
                  />
                </div>
                <span
                  style={{
                    fontSize: 36,
                    fontWeight: 800,
                    color: '#FFFCF7',
                    letterSpacing: '-0.02em',
                  }}
                >
                  NZA
                </span>
              </div>
              <span
                style={{
                  fontSize: 14,
                  letterSpacing: '0.4em',
                  color: 'rgba(255,252,247,0.4)',
                  fontWeight: 600,
                  marginLeft: 12,
                }}
              >
                LAB
              </span>
            </div>

            {/* Eyebrow + Headline + Sub */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
              <span
                style={{
                  fontSize: 16,
                  letterSpacing: '0.35em',
                  color: cfg.accent,
                  fontWeight: 600,
                }}
              >
                {cfg.eyebrow}
              </span>
              <h1
                style={{
                  fontSize: 64,
                  fontWeight: 700,
                  color: 'rgba(255,252,247,0.95)',
                  lineHeight: 1.05,
                  letterSpacing: '-0.025em',
                  margin: 0,
                  maxWidth: 600,
                }}
              >
                {cfg.headline}
              </h1>
              <p
                style={{
                  fontSize: 22,
                  color: 'rgba(255,252,247,0.6)',
                  lineHeight: 1.4,
                  letterSpacing: '-0.005em',
                  margin: 0,
                  maxWidth: 580,
                }}
              >
                {cfg.sub}
              </p>
            </div>

            {/* Footer URL */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 14,
              }}
            >
              <div
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  background: cfg.accent,
                }}
              />
              <span
                style={{
                  fontSize: 16,
                  letterSpacing: '0.2em',
                  color: 'rgba(255,252,247,0.5)',
                  fontWeight: 500,
                }}
              >
                MONZALAB.COM
              </span>
            </div>
          </div>

          {/* Right column — venture image OR home mosaic */}
          {pageKey === 'home' ? (
            <div
              style={{
                width: '40%',
                height: '100%',
                display: 'flex',
                flexWrap: 'wrap',
                position: 'relative',
                overflow: 'hidden',
                padding: 12,
                gap: 8,
                background: '#0B0B10',
              }}
            >
              {HOME_MOSAIC.map((v) => (
                <div
                  key={v.name}
                  style={{
                    /* Yoga (satori) no acepta calc() en width/height: con
                       calc(50% - 4px) el render revienta a mitad del stream y
                       la respuesta sale 200 con cuerpo vacío — LinkedIn/WhatsApp
                       entonces toman cualquier <img> de la página. Columna
                       derecha = 480px × 630px, padding 12, gap 8 → tiles fijos. */
                    width: 224,
                    height: 299,
                    position: 'relative',
                    borderRadius: 12,
                    overflow: 'hidden',
                    display: 'flex',
                    border: `1px solid ${v.accent}30`,
                  }}
                >
                  <img
                    src={v.image}
                    alt=""
                    width={240}
                    height={310}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      opacity: 0.85,
                    }}
                  />
                  {/* Bottom gradient + label */}
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background:
                        'linear-gradient(180deg, transparent 40%, rgba(0,0,0,0.85) 100%)',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'flex-end',
                      padding: '12px 14px',
                    }}
                  >
                    <span
                      style={{
                        fontSize: 11,
                        letterSpacing: '0.25em',
                        color: v.accent,
                        fontWeight: 600,
                      }}
                    >
                      {v.name.toUpperCase()}
                    </span>
                  </div>
                </div>
              ))}
              {/* Vignette toward left to blend with copy */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background:
                    'linear-gradient(90deg, #0B0B10 0%, transparent 12%, transparent 100%)',
                  pointerEvents: 'none',
                  display: 'flex',
                }}
              />
            </div>
          ) : (
            <div
              style={{
                width: '40%',
                height: '100%',
                position: 'relative',
                display: 'flex',
                overflow: 'hidden',
              }}
            >
              <img
                src={cfg.image}
                alt=""
                width={480}
                height={630}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  opacity: 0.92,
                }}
              />
              {/* Vignette toward left to blend with copy */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background:
                    'linear-gradient(90deg, #0B0B10 0%, transparent 30%, transparent 100%)',
                  display: 'flex',
                }}
              />
              {/* Tonal glow */}
              <div
                style={{
                  position: 'absolute',
                  bottom: -100,
                  right: -100,
                  width: 400,
                  height: 400,
                  borderRadius: '50%',
                  background: `radial-gradient(circle, ${cfg.accent}33 0%, transparent 70%)`,
                }}
              />
            </div>
          )}

          {/* Bottom hairline accent */}
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: 3,
              background: `linear-gradient(90deg, transparent 0%, ${cfg.accent} 50%, transparent 100%)`,
              opacity: 0.6,
            }}
          />
        </div>
      ),
      {
        width: 1200,
        height: 630,
        headers: {
          'Cache-Control': 'public, max-age=31536000, immutable, stale-while-revalidate=31536000',
        },
      },
    );
  } catch (e) {
    return new Response(`Failed to generate OG image: ${(e as Error).message}`, { status: 500 });
  }
}
