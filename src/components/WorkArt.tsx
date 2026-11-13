import type { Project } from "../data";

const A = "var(--accent)";
const L = "var(--line)";
const S = "var(--surface)";
const M = "var(--faint)";
const I = "var(--ink)";

function Frame({ children }: { children: React.ReactNode }) {
  return (
    <svg viewBox="0 0 400 250" className="h-full w-full" role="img" aria-hidden preserveAspectRatio="xMidYMid slice">
      {children}
    </svg>
  );
}

function Card({ x, y, w, h, r = 10 }: { x: number; y: number; w: number; h: number; r?: number }) {
  return <rect x={x} y={y} width={w} height={h} rx={r} fill={S} stroke={L} />;
}

function Bar({ x, y, w, o = 1, c = M }: { x: number; y: number; w: number; o?: number; c?: string }) {
  return <rect x={x} y={y} width={w} height={5} rx={2.5} fill={c} opacity={o} />;
}

function Gps() {
  return (
    <Frame>
      <g stroke={L} strokeWidth="1">
        {[40, 90, 140, 190, 240, 290, 340].map((x) => <line key={x} x1={x} y1="0" x2={x - 30} y2="250" />)}
        {[40, 95, 150, 205].map((y) => <line key={y} x1="0" y1={y} x2="400" y2={y + 12} />)}
      </g>
      <path className="draw" d="M40 200 C 90 190, 110 120, 170 125 S 250 70, 300 80 S 360 40, 372 30" fill="none" stroke={A} strokeWidth="3" strokeLinecap="round" />
      {[[170, 125], [300, 80]].map(([x, y], i) => (
        <g key={i}>
          <circle className="pulse-dot" cx={x} cy={y} r="7" fill={A} style={{ animationDelay: `${i * 0.8}s` }} />
          <circle cx={x} cy={y} r="6" fill={A} stroke={S} strokeWidth="2.5" />
        </g>
      ))}
      <g className="float-y">
        <Card x={232} y={150} w={140} h={72} />
        <circle cx={250} cy={170} r="5" fill="#22c55e" />
        <Bar x={262} y={167} w={56} c={I} o={0.75} />
        <Bar x={248} y={186} w={100} />
        <Bar x={248} y={200} w={70} o={0.6} />
        <text x={330} y={174} fontSize="9" fontFamily="Geist Mono" fill={M}>62 km/h</text>
      </g>
    </Frame>
  );
}

function Consent() {
  return (
    <Frame>
      <g className="float-y">
        <Card x={110} y={30} w={180} h={200} r={12} />
        <Bar x={130} y={52} w={90} c={I} o={0.8} />
        <Bar x={130} y={66} w={130} />
        {[0, 1, 2, 3].map((i) => (
          <g key={i} transform={`translate(130 ${92 + i * 30})`}>
            <rect width="16" height="16" rx="4" fill={i < 3 ? A : "none"} stroke={i < 3 ? A : L} />
            {i < 3 && <path d="M4 8.5 L7 11.5 L12.5 5" stroke="#fff" strokeWidth="2" fill="none" strokeLinecap="round" />}
            <Bar x={26} y={3} w={[96, 80, 110, 70][i]} o={0.8} />
            <Bar x={26} y={10} w={[60, 70, 50, 64][i]} o={0.4} />
          </g>
        ))}
      </g>
      <g transform="translate(272 150)">
        <path d="M30 0 L58 10 V32 C58 50 44 62 30 68 C16 62 2 50 2 32 V10 Z" fill={A} />
        <path className="draw" d="M18 34 L27 43 L43 25" stroke="#fff" strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </g>
      <text x={60} y={222} fontSize="9" fontFamily="Geist Mono" fill={M}>PDPA · audit trail · v3</text>
    </Frame>
  );
}

function Estate() {
  return (
    <Frame>
      <g fill="none" stroke={I} strokeOpacity="0.55" strokeWidth="2">
        <rect x="60" y="40" width="220" height="170" />
        <path d="M60 120 H150 V40 M150 120 V210 M150 150 H280 M210 150 V40" />
      </g>
      <rect x="152" y="42" width="56" height="106" fill={A} opacity="0.18" />
      <g fontFamily="Geist Mono" fontSize="8" fill={M}>
        <text x="72" y="58">BED 01</text>
        <text x="162" y="58">LIVING</text>
        <text x="220" y="58">KITCHEN</text>
        <text x="72" y="138">BED 02</text>
        <text x="162" y="168">BATH</text>
      </g>
      <g transform="translate(180 100)">
        <circle className="pulse-dot" r="8" fill={A} />
        <circle r="7" fill={A} stroke={S} strokeWidth="2.5" />
        <path d="M0 0 L-26 -40 A48 48 0 0 1 26 -40 Z" fill={A} opacity="0.22" />
      </g>
      <g className="float-y">
        <Card x={292} y={120} w={84} h={84} />
        <circle cx={334} cy={160} r="22" fill="none" stroke={A} strokeWidth="2" className="draw" />
        <text x={334} y={164} textAnchor="middle" fontSize="12" fontWeight="600" fontFamily="Geist" fill={I}>360°</text>
      </g>
    </Frame>
  );
}

function Mcp() {
  const tools = ["send_sms", "list_campaigns", "get_balance", "schedule"];
  return (
    <Frame>
      <g className="float-y">
        <Card x={24} y={95} w={92} h={60} />
        <text x={70} y={121} textAnchor="middle" fontSize="11" fontWeight="600" fontFamily="Geist" fill={I}>AI agent</text>
        <text x={70} y={137} textAnchor="middle" fontSize="8" fontFamily="Geist Mono" fill={M}>LLM client</text>
      </g>
      <path className="dash-flow" d="M116 125 H164" stroke={A} strokeWidth="2" fill="none" />
      <rect x="164" y="80" width="96" height="90" rx="14" fill={A} />
      <text x="212" y="118" textAnchor="middle" fontSize="13" fontWeight="600" fontFamily="Geist" fill="#fff">MCP</text>
      <text x="212" y="134" textAnchor="middle" fontSize="8" fontFamily="Geist Mono" fill="#fff" opacity="0.85">server</text>
      <g transform="translate(212 152)">
        <rect x="-26" y="-6" width="52" height="12" rx="6" fill="#fff" opacity="0.2" />
        <text textAnchor="middle" y="3" fontSize="7" fontFamily="Geist Mono" fill="#fff">OAuth 2.1</text>
      </g>
      {tools.map((t, i) => {
        const y = 40 + i * 50;
        return (
          <g key={t}>
            <path className="dash-flow" d={`M260 125 C 290 125, 290 ${y + 14}, 300 ${y + 14}`} stroke={L} strokeWidth="1.5" fill="none" style={{ animationDelay: `${i * 0.2}s` }} />
            <Card x={300} y={y} w={84} h={28} r={7} />
            <text x={310} y={y + 17} fontSize="8.5" fontFamily="Geist Mono" fill={I}>{t}()</text>
          </g>
        );
      })}
    </Frame>
  );
}

function WhatsApp() {
  return (
    <Frame>
      <g>
        <rect x="40" y="40" width="130" height="34" rx="14" fill={S} stroke={L} />
        <Bar x={54} y={50} w={90} o={0.8} />
        <Bar x={54} y={60} w={60} o={0.4} />
        <rect x="70" y="84" width="120" height="30" rx="14" fill="#22c55e" opacity="0.9" />
        <rect x="84" y="96" width="80" height="5" rx="2.5" fill="#fff" opacity="0.85" />
        <rect x="40" y="124" width="110" height="30" rx="14" fill={S} stroke={L} />
        <Bar x={54} y={136} w={70} o={0.8} />
      </g>
      <path className="dash-flow" d="M200 110 H236" stroke={A} strokeWidth="2" fill="none" />
      <g>
        {[0, 1, 2].map((i) => (
          <g key={i} transform={`translate(${236 + i * 0} ${60 + i * 46})`}>
            <rect width="132" height="34" rx="9" fill={i === 1 ? A : S} stroke={i === 1 ? A : L} />
            <circle cx="16" cy="17" r="5" fill={i === 1 ? "#fff" : A} />
            <rect x="28" y="11" width={[70, 80, 60][i]} height="5" rx="2.5" fill={i === 1 ? "#fff" : I} opacity={i === 1 ? 0.95 : 0.7} />
            <rect x="28" y="20" width={[40, 54, 46][i]} height="4" rx="2" fill={i === 1 ? "#fff" : M} opacity="0.6" />
          </g>
        ))}
      </g>
      <text x="236" y="210" fontSize="8.5" fontFamily="Geist Mono" fill={M}>n8n → lead → follow-up</text>
    </Frame>
  );
}

function Hr() {
  const days = Array.from({ length: 28 }, (_, i) => i);
  const leave = new Set([5, 6, 12, 19, 20]);
  return (
    <Frame>
      <g className="float-y">
        <Card x={40} y={34} w={180} h={182} />
        <Bar x={56} y={50} w={70} c={I} o={0.8} />
        {days.map((d) => {
          const x = 56 + (d % 7) * 22;
          const y = 72 + Math.floor(d / 7) * 34;
          return (
            <rect key={d} x={x} y={y} width="16" height="26" rx="4" fill={leave.has(d) ? A : "none"} stroke={leave.has(d) ? A : L} opacity={leave.has(d) ? 0.85 : 1} />
          );
        })}
      </g>
      <g>
        <Card x={240} y={60} w={130} h={130} />
        <text x={254} y={80} fontSize="8.5" fontFamily="Geist Mono" fill={M}>TIMESHEET</text>
        {[62, 88, 74, 96, 50].map((w, i) => (
          <g key={i}>
            <rect x={254} y={94 + i * 18} width={w} height={9} rx={4.5} fill={i === 3 ? A : I} opacity={i === 3 ? 1 : 0.2} />
            <text x={360} y={101 + i * 18} textAnchor="end" fontSize="7.5" fontFamily="Geist Mono" fill={M}>{(w / 12).toFixed(1)}h</text>
          </g>
        ))}
      </g>
    </Frame>
  );
}

function Torva() {
  return (
    <Frame>
      <path d="M0 180 C 80 150, 120 210, 200 175 S 330 130, 400 160 V250 H0Z" fill={A} opacity="0.08" />
      <path d="M0 80 C 70 60, 140 110, 220 80 S 340 30, 400 60" fill="none" stroke={L} strokeWidth="1.5" />
      <path className="draw" d="M50 200 C 90 140, 150 190, 190 130 S 260 110, 300 70" fill="none" stroke={A} strokeWidth="2.5" strokeDasharray="2 7" strokeLinecap="round" />
      <circle cx="50" cy="200" r="6" fill={I} />
      <g transform="translate(300 70)" stroke={A} strokeWidth="5" strokeLinecap="round">
        <path d="M-10 -10 L10 10 M10 -10 L-10 10" />
      </g>
      <g className="spin-slow" style={{ transformOrigin: "330px 190px" }}>
        <circle cx="330" cy="190" r="30" fill={S} stroke={L} />
        <path d="M330 166 L337 190 L330 214 L323 190 Z" fill={A} />
      </g>
      <g className="float-y">
        <Card x={70} y={30} w={120} h={52} />
        <text x={84} y={52} fontSize="9" fontFamily="Geist Mono" fill={M}>LEADERBOARD</text>
        <Bar x={84} y={62} w={84} c={I} o={0.7} />
      </g>
    </Frame>
  );
}

function HireLink() {
  return (
    <Frame>
      {[0, 1, 2].map((i) => (
        <g key={i} transform={`translate(${44 + i * 18} ${40 + i * 20})`} opacity={i === 2 ? 1 : 0.55 + i * 0.15}>
          <Card x={0} y={0} w={190} h={110} r={12} />
          <circle cx="26" cy="28" r="12" fill={i === 2 ? A : M} opacity={i === 2 ? 1 : 0.4} />
          <Bar x={46} y={20} w={80} c={I} o={0.75} />
          <Bar x={46} y={31} w={54} />
          <Bar x={16} y={58} w={150} o={0.5} />
          <Bar x={16} y={70} w={120} o={0.5} />
          {i === 2 && (
            <g>
              <rect x="16" y="84" width="54" height="14" rx="7" fill={A} opacity="0.15" />
              <text x="43" y="94" textAnchor="middle" fontSize="7.5" fontFamily="Geist Mono" fill={A}>94% match</text>
            </g>
          )}
        </g>
      ))}
      <g className="float-y">
        <rect x="270" y="70" width="104" height="70" rx="14" fill={A} />
        <path d="M296 92 l4 10 l10 4 l-10 4 l-4 10 l-4 -10 l-10 -4 l10 -4 z" fill="#fff" />
        <rect x="318" y="96" width="42" height="5" rx="2.5" fill="#fff" opacity="0.9" />
        <rect x="318" y="108" width="30" height="5" rx="2.5" fill="#fff" opacity="0.6" />
      </g>
    </Frame>
  );
}

export default function WorkArt({ project }: { project: Project }) {
  const map = { gps: Gps, consent: Consent, estate: Estate, mcp: Mcp, whatsapp: WhatsApp, hr: Hr, torva: Torva, hirelink: HireLink };
  const C = map[project.art];
  return <C />;
}
