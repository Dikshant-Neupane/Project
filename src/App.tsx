import { useEffect, useRef, useState, useCallback } from 'react';
import profileImage from '../profile.jpeg';

/* ─────────────────────────────────────────────────────────────────────────────
   ICON LIBRARY
───────────────────────────────────────────────────────────────────────────── */
const icons = {
  folder: (
    <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current" aria-hidden="true">
      <path d="M2 6.5C2 5.12 3.12 4 4.5 4h4.08c.61 0 1.19.24 1.62.67L11.5 6H19.5C20.88 6 22 7.12 22 8.5v9c0 1.38-1.12 2.5-2.5 2.5h-15C3.12 20 2 18.88 2 17.5v-11z"/>
    </svg>
  ),
  terminal: (
    <svg viewBox="0 0 24 24" className="w-6 h-6 fill-none stroke-current stroke-[2] [stroke-linecap:round] [stroke-linejoin:round]" aria-hidden="true">
      <polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/>
    </svg>
  ),
  person: (
    <svg viewBox="0 0 24 24" className="w-6 h-6 fill-none stroke-current stroke-[2] [stroke-linecap:round] [stroke-linejoin:round]" aria-hidden="true">
      <circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.58-7 8-7s8 3 8 7"/>
    </svg>
  ),
  mail: (
    <svg viewBox="0 0 24 24" className="w-6 h-6 fill-none stroke-current stroke-[2] [stroke-linecap:round] [stroke-linejoin:round]" aria-hidden="true">
      <rect x="2" y="4" width="20" height="16" rx="2"/><polyline points="2,4 12,13 22,4"/>
    </svg>
  ),
  image: (
    <svg viewBox="0 0 24 24" className="w-6 h-6 fill-none stroke-current stroke-[2] [stroke-linecap:round] [stroke-linejoin:round]" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/>
      <polyline points="21,15 16,10 5,21"/>
    </svg>
  ),
  close: (
    <svg viewBox="0 0 10 10" className="w-full h-full fill-none stroke-black/50 stroke-[1.2] [stroke-linecap:round] opacity-0 group-hover/tl:opacity-100 transition-opacity" aria-hidden="true">
      <line x1="2.5" y1="2.5" x2="7.5" y2="7.5"/><line x1="7.5" y1="2.5" x2="2.5" y2="7.5"/>
    </svg>
  ),
  minimize: (
    <svg viewBox="0 0 10 10" className="w-full h-full fill-none stroke-black/50 stroke-[1.2] [stroke-linecap:round] opacity-0 group-hover/tl:opacity-100 transition-opacity" aria-hidden="true">
      <line x1="2" y1="5" x2="8" y2="5"/>
    </svg>
  ),
  maximize: (
    <svg viewBox="0 0 10 10" className="w-full h-full fill-none stroke-black/50 stroke-[1.2] [stroke-linecap:round] [stroke-linejoin:round] opacity-0 group-hover/tl:opacity-100 transition-opacity" aria-hidden="true">
      <polyline points="2,6 2,2 6,2"/><polyline points="8,4 8,8 4,8"/>
    </svg>
  ),
  github: (
    <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current" aria-hidden="true">
      <path d="M12 2C6.48 2 2 6.48 2 12c0 4.42 2.87 8.17 6.84 9.49.5.09.68-.22.68-.48v-1.69c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.89 1.52 2.34 1.08 2.91.83.09-.65.35-1.08.63-1.33-2.22-.25-4.56-1.11-4.56-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02A9.56 9.56 0 0112 6.8c.85 0 1.71.11 2.51.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.69-4.57 4.94.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10.01 10.01 0 0022 12c0-5.52-4.48-10-10-10z"/>
    </svg>
  ),
  githubLg: (
    <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current" aria-hidden="true">
      <path d="M12 2C6.48 2 2 6.48 2 12c0 4.42 2.87 8.17 6.84 9.49.5.09.68-.22.68-.48v-1.69c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.89 1.52 2.34 1.08 2.91.83.09-.65.35-1.08.63-1.33-2.22-.25-4.56-1.11-4.56-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02A9.56 9.56 0 0112 6.8c.85 0 1.71.11 2.51.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.69-4.57 4.94.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10.01 10.01 0 0022 12c0-5.52-4.48-10-10-10z"/>
    </svg>
  ),
  externalLink: (
    <svg viewBox="0 0 24 24" className="w-3 h-3 fill-none stroke-current stroke-[2] [stroke-linecap:round] [stroke-linejoin:round]" aria-hidden="true">
      <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15,3 21,3 21,9"/><line x1="10" y1="14" x2="21" y2="3"/>
    </svg>
  ),
} as const;

/* ─────────────────────────────────────────────────────────────────────────────
   SHARED COMPONENTS
───────────────────────────────────────────────────────────────────────────── */
function TrafficLights({ onClose, onMinimize, onMaximize }: {
  onClose: () => void; onMinimize: () => void; onMaximize: () => void;
}) {
  return (
    <div className="flex gap-1.5 no-drag group/tl">
      <button onClick={onClose}    className="w-[11px] h-[11px] rounded-full bg-[#ff5f57] hover:brightness-110 transition-all relative">{icons.close}</button>
      <button onClick={onMinimize} className="w-[11px] h-[11px] rounded-full bg-[#ffbd2e] hover:brightness-110 transition-all relative">{icons.minimize}</button>
      <button onClick={onMaximize} className="w-[11px] h-[11px] rounded-full bg-[#28c840] hover:brightness-110 transition-all relative">{icons.maximize}</button>
    </div>
  );
}

function DockIcon({ onClick, title, bg, active, badge, children }: {
  onClick: () => void; title: string; bg: string;
  active?: boolean; badge?: number; children: React.ReactNode;
}) {
  const [showTooltip, setShowTooltip] = useState(false);
  return (
    <div className="relative flex flex-col items-center gap-1"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      {/* Tooltip */}
      <div className={`absolute -top-9 left-1/2 -translate-x-1/2 px-2.5 py-1 rounded-lg text-[11px] font-medium text-[#f5f0e8] whitespace-nowrap
        bg-[rgba(20,16,10,0.85)] backdrop-blur-sm border border-[rgba(255,220,160,0.12)] shadow-lg
        transition-all duration-150 pointer-events-none
        ${showTooltip ? 'opacity-100 -translate-y-0' : 'opacity-0 translate-y-1'}`}>
        {title}
      </div>
      <button
        onClick={onClick}
        className={`no-drag relative w-12 h-12 rounded-xl flex items-center justify-center cursor-pointer
          transition-all duration-200 hover:scale-[1.22] hover:-translate-y-1.5 active:scale-100 ${bg}`}
      >
        {children}
        {/* Notification badge */}
        {badge !== undefined && badge > 0 && (
          <span className="absolute -top-1 -right-1 min-w-[16px] h-4 px-1 rounded-full bg-[#ff5f57] text-white text-[9px] font-bold flex items-center justify-center leading-none">
            {badge}
          </span>
        )}
      </button>
      {/* Active dot */}
      <div className={`w-1 h-1 rounded-full bg-white/70 transition-opacity duration-200 ${active ? 'opacity-100' : 'opacity-0'}`} />
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   DATA
───────────────────────────────────────────────────────────────────────────── */
interface Project {
  id: string; category: string; name: string;
  overview: string; methods: string; stack: string;
  repo: string; demo: string; status: 'COMPLETE' | 'IN PROGRESS' | 'EXPERIMENTAL';
}

const projectData: Record<string, Project> = {
  cricnepal: {
    id:'01', category:'DATA / ML', status:'COMPLETE',
    name:'CricNepal — Janakpur Bolts Analytics Dashboard',
    overview:'Complete player performance, match analytics, and run-rate predictive modeling engine customized for franchise cricket.',
    methods:'Exploratory data analysis, match-phase clustering, and ball-by-ball win-probability modeling.',
    stack:'Python, Pandas, NumPy, Streamlit, Plotly, scikit-learn',
    repo:'https://github.com/Dikshant-Neupane/CricNepal', demo:'Local deployment mode',
  },
  'house-price': {
    id:'02', category:'SUPERVISED ML', status:'COMPLETE',
    name:'House Price Prediction',
    overview:'Multivariate real estate valuation pipeline evaluating structural, geographic, and municipal amenities data.',
    methods:'Feature engineering, outlier clipping, cross-validation tuning across Ridge, Random Forest, and Gradient Boosting.',
    stack:'Python, scikit-learn, XGBoost, Pandas, Seaborn',
    repo:'https://github.com/Dikshant-Neupane/House_price_prediction', demo:'Live pipeline notebook & model inference',
  },
  'nepal-election': {
    id:'03', category:'STATISTICS / ML', status:'IN PROGRESS',
    name:'Nepal Election 2082',
    overview:'Statistical analysis and demographic swing voter estimation framework modeling constituency-level trends.',
    methods:'Bayesian inference, spatial vote share distribution, and swing seat sensitivity simulation.',
    stack:'Python, Statsmodels, Scipy, GeoPandas, Matplotlib',
    repo:'https://github.com/Dikshant-Neupane/Election-2082', demo:'Constituency analytics notebook',
  },
  'jana-sunuwaai': {
    id:'04', category:'NLP / CIVIC TECH', status:'COMPLETE',
    name:'Jana Sunuwaai',
    overview:'Citizen grievance categorization and summarization system built for low-resource Nepali language text inputs.',
    methods:'Nepali fine-tuned transformer encoder, token classification for civic departments, priority ranking.',
    stack:'Python, PyTorch, Transformers, HuggingFace, FastAPI',
    repo:'https://github.com/Dikshant-Neupane/Jana_Sunuwaai', demo:'API staging instance',
  },
  'truva-agent': {
    id:'05', category:'AGENTIC AI', status:'IN PROGRESS',
    name:'Truva Agent',
    overview:'"Trust is a gate, not a guess." Autonomous multi-step task resolution agent — collaboration project for database queries, document indexing, and synthesized reporting.',
    methods:'Tool calling loops, structured scratchpad reasoning, vector memory retrieval.',
    stack:'Python, LangChain, OpenAI / Anthropic APIs, ChromaDB, Docker',
    repo:'https://github.com/Dikshant-Neupane/Truva_agent', demo:'CLI & webhook orchestrator',
  },
};

/* ── All real GitHub repos grouped by category ── */
interface Repo { name: string; desc: string; lang: string; url: string; }
const repoGroups: { label: string; accent: string; text: string; repos: Repo[] }[] = [
  { label: 'Web',         accent: '#7dd3fc', text: 'text-[#7dd3fc]',   // soft sky
    repos: [
      { name:'blog-yourself',         desc:'Vanilla JS blogging platform',         lang:'JS',  url:'https://github.com/Dikshant-Neupane/blog-yourself' },
      { name:'DESIGN-2-CODE',         desc:'Design-to-code practice',              lang:'HTML',url:'https://github.com/Dikshant-Neupane/DESIGN-2-CODE' },
      { name:'Electric_shop_wesbite', desc:'Electric shop website',                lang:'HTML',url:'https://github.com/Dikshant-Neupane/Electric_shop_wesbite' },
      { name:'Story_Game',            desc:'JavaScript story / game',              lang:'JS',  url:'https://github.com/Dikshant-Neupane/Story_Game' },
      { name:'Jana_Sunuwaai',         desc:'JS civic-tech project',                lang:'JS',  url:'https://github.com/Dikshant-Neupane/Jana_Sunuwaai' },
      { name:'sahayog-fund',          desc:'TypeScript crowdfunding project',      lang:'TS',  url:'https://github.com/Dikshant-Neupane/sahayog-fund' },
      { name:'ghostmark',             desc:'TypeScript project',                   lang:'TS',  url:'https://github.com/Dikshant-Neupane/ghostmark' },
      { name:'electric',              desc:'TypeScript-based project',             lang:'TS',  url:'https://github.com/Dikshant-Neupane/electric' },
    ],
  },
  { label: 'React',       accent: '#86efac', text: 'text-[#86efac]',   // soft mint
    repos: [
      { name:'Dikshant_Neupane-Portfolio', desc:'Personal portfolio website',          lang:'TS',  url:'https://github.com/Dikshant-Neupane/Dikshant_Neupane-Portfolio' },
      { name:'Chat-Portfolio',             desc:'Interactive TypeScript portfolio',     lang:'TS',  url:'https://github.com/Dikshant-Neupane/Chat-Portfolio' },
      { name:'LegacyX',                    desc:'TypeScript project',                   lang:'TS',  url:'https://github.com/Dikshant-Neupane/LegacyX' },
      { name:'legacy-x',                   desc:'Rust project',                         lang:'Rust',url:'https://github.com/Dikshant-Neupane/legacy-x' },
      { name:'React-3rd_SEM',              desc:'React coursework — third semester',    lang:'JSX', url:'https://github.com/Dikshant-Neupane/React-3rd_SEM' },
      { name:'gh-boost',                   desc:'GitHub contribution graph tool',       lang:'JS',  url:'https://github.com/Dikshant-Neupane/gh-boost' },
    ],
  },
  { label: 'Python',      accent: '#fcd34d', text: 'text-[#fcd34d]',   // warm amber
    repos: [
      { name:'Chaos_laboratory',         desc:'Chaos theory & nonlinear systems lab', lang:'Py', url:'https://github.com/Dikshant-Neupane/Chaos_laboratory' },
      { name:'Scraper_ultimate',         desc:'Web-scraping project',                 lang:'Py', url:'https://github.com/Dikshant-Neupane/Scraper_ultimate' },
      { name:'Arbitrage',                desc:'Python arbitrage project',             lang:'Py', url:'https://github.com/Dikshant-Neupane/Arbitrage' },
      { name:'contextcore',              desc:'Python project',                       lang:'Py', url:'https://github.com/Dikshant-Neupane/contextcore' },
      { name:'100_days_challenge_python',desc:'100-day Python challenge',             lang:'Py', url:'https://github.com/Dikshant-Neupane/100_days_challenge_python' },
    ],
  },
  { label: 'ML & Data',   accent: '#a3e635', text: 'text-[#a3e635]',   // lime — brand color
    repos: [
      { name:'CricNepal',              desc:'Cricket data & ML',                 lang:'Py', url:'https://github.com/Dikshant-Neupane/CricNepal' },
      { name:'House_price_prediction', desc:'House price prediction analysis',   lang:'Py', url:'https://github.com/Dikshant-Neupane/House_price_prediction' },
      { name:'Election-2082',          desc:'Election data analysis',            lang:'Py', url:'https://github.com/Dikshant-Neupane/Election-2082' },
      { name:'Spotify_ananlysis',      desc:'Spotify data analysis',             lang:'Py', url:'https://github.com/Dikshant-Neupane/Spotify_ananlysis' },
      { name:'Nft_anallysis',          desc:'NFT data analysis',                 lang:'Py', url:'https://github.com/Dikshant-Neupane/Nft_anallysis' },
      { name:'Cric_Data',              desc:'Cricket data project',              lang:'Py', url:'https://github.com/Dikshant-Neupane/Cric_Data' },
    ],
  },
  { label: 'DSA & CS',    accent: '#fca5a5', text: 'text-[#fca5a5]',   // muted rose
    repos: [
      { name:'DSA_Self_taught',            desc:'Self-taught DSA practice',         lang:'C++', url:'https://github.com/Dikshant-Neupane/DSA_Self_taught' },
      { name:'OOP',                        desc:'C++ OOP fundamentals',             lang:'C++', url:'https://github.com/Dikshant-Neupane/OOP' },
      { name:'C-__OOP',                    desc:'C++ basics and OOP concepts',      lang:'C++', url:'https://github.com/Dikshant-Neupane/C-__OOP' },
      { name:'oop-lab',                    desc:'OOP lab work',                     lang:'C++', url:'https://github.com/Dikshant-Neupane/oop-lab' },
      { name:'Numerical_method_practical', desc:'Numerical methods practicals',     lang:'Py',  url:'https://github.com/Dikshant-Neupane/Numerical_method_practical' },
    ],
  },
  { label: 'Experiments', accent: '#c4b5fd', text: 'text-[#c4b5fd]',   // soft lavender
    repos: [
      { name:'Truva_agent',  desc:'"Trust is a gate, not a guess." — Agentic AI (collab)', lang:'Py', url:'https://github.com/Dikshant-Neupane/Truva_agent' },
      { name:'Mage',         desc:'Experimental project',                                   lang:'—',  url:'https://github.com/Dikshant-Neupane/Mage' },
      { name:'techno-titans',desc:'Team / tech project',                                    lang:'—',  url:'https://github.com/Dikshant-Neupane/techno-titans' },
    ],
  },
];

const statusStyle: Record<Project['status'], string> = {
  'COMPLETE':     'bg-[#a3e635]/10 text-[#a3e635] border border-[#a3e635]/20',
  'IN PROGRESS':  'bg-amber-400/10 text-amber-300 border border-amber-400/20',
  'EXPERIMENTAL': 'bg-zinc-500/10 text-[#9a8f7a] border border-zinc-500/20',
};

type WinState = 'open' | 'minimized' | 'closed';

const WALLPAPERS = ['/images/hero-interior.jpg', '/images/interior-portrait.jpg'];

/* ─────────────────────────────────────────────────────────────────────────────
   HOOKS
───────────────────────────────────────────────────────────────────────────── */
function useTypewriter(text: string, speed = 28) {
  const [displayed, setDisplayed] = useState('');
  useEffect(() => {
    setDisplayed('');
    let i = 0;
    const id = setInterval(() => {
      i++;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) clearInterval(id);
    }, speed);
    return () => clearInterval(id);
  }, [text, speed]);
  return displayed;
}

function useIsMobile() {
  const [mobile, setMobile] = useState(() => window.innerWidth < 768);
  useEffect(() => {
    const fn = () => setMobile(window.innerWidth < 768);
    window.addEventListener('resize', fn);
    return () => window.removeEventListener('resize', fn);
  }, []);
  return mobile;
}

/* ─────────────────────────────────────────────────────────────────────────────
   ABOUT WINDOW CONTENT
───────────────────────────────────────────────────────────────────────────── */
function AboutContent() {
  return (
    <div className="space-y-4 text-xs font-mono">
      <div className="flex items-center gap-3 pb-3 border-b border-[rgba(255,220,160,0.12)]">
        <img src={profileImage} alt="Dikshant" className="w-14 h-14 rounded-xl object-cover border border-[rgba(255,220,160,0.12)]"/>
        <div>
          <div className="text-sm font-bold text-[#f5f0e8]">Dikshant Neupane</div>
          <div className="text-[10px] text-[#a3e635] tracking-widest uppercase mt-0.5">AI / Data / ML Engineer</div>
          <div className="text-[10px] text-[#c4b99a] mt-1 font-medium">Kathmandu, Nepal 🇳🇵</div>
        </div>
      </div>
      <div className="space-y-1">
        <div className="text-[9px] text-[#d9f99d] uppercase font-bold tracking-wider">About</div>
        <p className="text-[#c4b99a] leading-relaxed text-[11px]">
          Building practical AI/ML systems with a focus on real-world applications in the Nepali context.
          Passionate about low-resource NLP, sports analytics, and agentic systems that actually work in production.
        </p>
      </div>
      <div className="grid grid-cols-2 gap-2">
        {[['Focus','Applied ML & NLP'],['Stack','Python-first'],['Domain','Nepal & South Asia'],['Mode','Builder']].map(([k,v])=>(
          <div key={k} className="bg-black/20 rounded-lg p-2.5 border border-[rgba(255,220,160,0.07)]">
            <div className="text-[9px] text-[#d9f99d] uppercase tracking-wider font-medium">{k}</div>
            <div className="text-[11px] text-[#f5f0e8] mt-0.5 font-medium">{v}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   CONTACT WINDOW CONTENT
───────────────────────────────────────────────────────────────────────────── */
function ContactContent() {
  const links = [
    { icon: icons.mail,   label: 'Email',    value: 'dikshantneupane69@gmail.com', href: 'mailto:dikshantneupane69@gmail.com' },
    { icon: icons.github, label: 'GitHub',   value: 'github.com/Dikshant-Neupane',         href: 'https://github.com/Dikshant-Neupane' },
    { icon: icons.person, label: 'LinkedIn', value: 'linkedin.com/in/dikshant-neupane',          href: 'https://www.linkedin.com/in/dikshant-neupane-a64b09326/' },
  ];
  return (
    <div className="space-y-4 text-xs font-mono">
      <div className="text-[9px] text-[#d9f99d] uppercase font-bold tracking-wider pb-2 border-b border-[rgba(255,220,160,0.12)]">Contact &amp; Uplinks</div>
      {links.map(({ icon, label, value, href }) => (
        <a key={label} href={href} target="_blank" rel="noopener noreferrer"
          className="no-drag flex items-center gap-3 p-3 rounded-xl border border-[rgba(255,220,160,0.07)] bg-black/20
            hover:bg-[rgba(163,230,53,0.08)] hover:border-[rgba(163,230,53,0.3)] transition-all group cursor-pointer block">
          <span className="w-8 h-8 rounded-lg bg-[#a3e635]/10 flex items-center justify-center text-[#a3e635] shrink-0">{icon}</span>
          <div className="flex-1 min-w-0">
            <div className="text-[9px] text-[#d9f99d] uppercase tracking-wider">{label}</div>
            <div className="text-[11px] text-[#e8e0d0] group-hover:text-[#a3e635] transition-colors truncate mt-0.5">{value}</div>
          </div>
          <span className="text-[#5a5045] group-hover:text-[#a3e635] transition-colors">{icons.externalLink}</span>
        </a>
      ))}
      <div className="pt-2 border-t border-[rgba(255,220,160,0.07)] flex items-center gap-2">
        <div className="w-1.5 h-1.5 rounded-full bg-[#a3e635] animate-pulse"/>
        <span className="text-[9px] text-[#c4b99a] font-medium">Available for collaborations &amp; freelance projects</span>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   BLOGS / REPOS WINDOW CONTENT — enhanced visibility
───────────────────────────────────────────────────────────────────────────── */
function BlogsContent() {
  const [activeGroup, setActiveGroup] = useState(0);
  const group = repoGroups[activeGroup];

  return (
    <div className="flex flex-col gap-4 h-full">

      {/* Category pill bar — enhanced */}
      <div className="shrink-0 flex gap-2 overflow-x-auto pb-1.5 no-scrollbar">
        {repoGroups.map((g, i) => (
          <button key={i} onClick={() => setActiveGroup(i)}
            className={`shrink-0 flex items-center gap-2 px-3.5 py-2 rounded-full text-xs font-black border transition-all duration-150 cursor-pointer whitespace-nowrap
              ${i === activeGroup
                ? 'border-[#d9f99d]/30 bg-[#d9f99d]/10 shadow-[0_0_12px_rgba(163,230,53,0.2)]'
                : 'text-[#9a8f7a] border-[rgba(255,220,160,0.10)] hover:text-[#d9f99d] hover:border-[rgba(255,220,160,0.20)] hover:bg-[rgba(255,220,160,0.05)] bg-transparent'}`}
            style={i === activeGroup ? { color: g.accent } : {}}>
            <span className="text-[10px] font-black tabular-nums">{g.repos.length}</span>
            {g.label}
          </button>
        ))}
      </div>

      {/* Repo list — enhanced */}
      <div className="flex-1 overflow-y-auto custom-scrollbar space-y-2 pr-0.5">
        {group.repos.map((r, idx) => (
          <a key={r.name} href={r.url} target="_blank" rel="noopener noreferrer"
            className="no-drag flex items-center gap-4 rounded-xl border border-[rgba(255,230,160,0.12)] bg-[rgba(18,16,10,0.85)]
              hover:bg-[rgba(20,18,12,0.95)] hover:border-[#d9f99d]/40 transition-all group block overflow-hidden shadow-sm hover:shadow-md">

            {/* Left accent bar — inline style so it always works */}
            <div className="w-1 self-stretch shrink-0 rounded-r-full transition-opacity opacity-60 group-hover:opacity-100 shadow-[0_0_8px_currentColor]"
              style={{ backgroundColor: group.accent }}/>

            {/* Row number */}
            <span className="text-[10px] font-black text-[#d9f99d]/20 font-mono tabular-nums shrink-0 w-6 text-right select-none group-hover:text-[#d9f99d]/40 transition-colors">
              {String(idx + 1).padStart(2,'0')}
            </span>

            {/* Name + desc */}
            <div className="flex-1 min-w-0 py-3">
              <div className="font-black text-[13px] leading-tight truncate text-[#fffefb] group-hover:text-[#fffefb] transition-colors drop-shadow-sm">
                {r.name}
              </div>
              <div className="text-[#a3e635] text-[11px] truncate mt-0.5 group-hover:text-[#d9f99d] transition-colors drop-shadow-sm">
                {r.desc}
              </div>
            </div>

            {/* Lang badge */}
            <div className="shrink-0 flex items-center gap-2.5 pr-3">
              <span className="text-[10px] font-black px-2.5 py-1 rounded-md tabular-nums"
                style={{
                  color: group.accent,
                  background: `${group.accent}18`,
                  border: `1.5px solid ${group.accent}30`,
                  boxShadow: `0 0 6px ${group.accent}40`
                }}>
                {r.lang}
              </span>
              <span className="text-[#a3e635] group-hover:text-[#d9f99d] transition-colors opacity-0 group-hover:opacity-100">
                {icons.externalLink}
              </span>
            </div>
          </a>
        ))}
      </div>

      {/* Footer — enhanced */}
      <div className="shrink-0 pt-3 border-t-2 border-[rgba(255,230,160,0.12)] flex items-center justify-between">
        <span className="text-[10px] font-mono text-[#a3e635]">
          <span className="text-[#d9f99d] font-black">{group.repos.length}</span> repos · {group.label}
        </span>
        <a href="https://github.com/Dikshant-Neupane" target="_blank" rel="noopener noreferrer"
          className="no-drag flex items-center gap-2 text-[10px] text-[#a3e635] hover:text-[#d9f99d] transition-colors font-mono">
          {icons.github}
          <span>Dikshant-Neupane</span>
        </a>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   TERMINAL INPUT with ghost autocomplete
───────────────────────────────────────────────────────────────────────────── */
const ALL_COMMANDS = ['about','bio','blogs','clear','contact','exit','help','projects',
  'view 1','view 2','view 3','view 4','view 5',
  'cricnepal','house-price','nepal-election','jana-sunuwaai','truva-agent'];

function TerminalInput({ inputRef, value, onChange, onKeyDown, onSubmit }: {
  inputRef: React.RefObject<HTMLInputElement>;
  value: string;
  onChange: (v: string) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onSubmit: (v: string) => void;
}) {
  const ghost = value.length > 0
    ? ALL_COMMANDS.find(c => c.startsWith(value.toLowerCase()) && c !== value.toLowerCase()) ?? ''
    : '';
  const ghostSuffix = ghost ? ghost.slice(value.length) : '';

  const handleKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Tab' && ghostSuffix) {
      e.preventDefault();
      onChange(ghost);
      return;
    }
    if (e.key === 'Enter') {
      onSubmit(value);
      return;
    }
    onKeyDown(e);
  };

  return (
    <div className="no-drag mt-1 rounded-xl bg-[rgba(163,230,53,0.05)] border border-[rgba(163,230,53,0.15)] focus-within:border-[rgba(163,230,53,0.5)] focus-within:bg-[rgba(163,230,53,0.08)] transition-all">
      <div className="flex items-center gap-3 px-3 py-2.5">
        <span className="text-[#a3e635] font-bold text-sm font-mono shrink-0 select-none">$</span>
        <div className="flex-1 relative font-mono text-sm leading-none">
          <span className="invisible whitespace-pre">{value}</span>
          {ghostSuffix && (
            <span className="absolute left-0 top-0 whitespace-pre pointer-events-none select-none">
              <span className="invisible">{value}</span>
              <span className="text-[rgba(163,230,53,0.28)]">{ghostSuffix}</span>
            </span>
          )}
          <input
            ref={inputRef} value={value}
            onChange={e => onChange(e.target.value)}
            onKeyDown={handleKey}
            autoComplete="off" spellCheck={false}
            placeholder={value ? '' : 'type a command…  (Tab to complete)'}
            className="absolute inset-0 w-full bg-transparent border-none outline-none text-[#a3e635] placeholder:text-[rgba(163,230,53,0.28)] font-mono p-0"
          />
        </div>
        {ghostSuffix && (
          <span className="shrink-0 text-[9px] font-mono px-1.5 py-0.5 rounded border border-[rgba(163,230,53,0.25)] text-[rgba(163,230,53,0.5)] select-none">
            Tab
          </span>
        )}
        <span className="w-2 h-4 bg-[#a3e635] rounded-[2px] shrink-0 shadow-[0_0_6px_rgba(163,230,53,0.7)]"
          style={{animation:'blink 1s step-end infinite'}}/>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   MOBILE: BOTTOM SHEET for project detail
───────────────────────────────────────────────────────────────────────────── */
function MobileProjectSheet({ project, onClose }: { project: Project | null; onClose: () => void }) {
  const open = project !== null;
  return (
    <div
      className={`fixed inset-0 z-[300] transition-all duration-300 ${open ? 'pointer-events-auto' : 'pointer-events-none'}`}
      aria-modal="true"
      role="dialog"
    >
      {/* Backdrop */}
      <div
        className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${open ? 'opacity-100' : 'opacity-0'}`}
        onClick={onClose}
      />
      {/* Sheet */}
      <div
        className={`absolute bottom-0 left-0 right-0 h-[70vh] rounded-t-3xl
          bg-[rgba(12,10,8,0.92)] backdrop-blur-[48px] border-t border-[rgba(255,220,160,0.12)]
          flex flex-col transition-transform duration-300
          ${open ? 'translate-y-0' : 'translate-y-full'}`}
      >
        {/* Handle + close */}
        <div className="flex items-center justify-between px-5 pt-4 pb-3 shrink-0 border-b border-[rgba(255,220,160,0.10)]">
          <div className="w-10 h-1 rounded-full bg-white/20 mx-auto absolute left-1/2 -translate-x-1/2 top-3"/>
          <div className="w-6"/>
          <span className="text-[11px] font-mono text-[#9a8f7a] font-bold">PROJECT DETAIL</span>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center text-[#c4b99a] hover:bg-white/20 transition-all text-sm font-bold"
            aria-label="Close"
          >
            ×
          </button>
        </div>
        {/* Content */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-5 space-y-4 font-mono text-xs">
          {project && (
            <>
              <div className="flex items-center justify-between border-b border-[rgba(255,220,160,0.12)] pb-2">
                <span className="text-[#a3e635] font-bold tracking-wider text-[11px]">{project.id} // {project.category}</span>
                <span className={`text-[8px] font-bold px-2 py-0.5 rounded-md tracking-wider ${statusStyle[project.status]}`}>{project.status}</span>
              </div>
              <div>
                <h3 className="text-sm font-bold text-[#f5f0e8] font-['Space_Grotesk'] mb-1">{project.name}</h3>
                <p className="text-[#9a8f7a] leading-relaxed text-[11px]">{project.overview}</p>
              </div>
              <div className="bg-black/30 p-3 rounded-lg border border-[rgba(255,220,160,0.07)] space-y-1">
                <span className="text-[10px] text-[#d9f99d] uppercase font-bold tracking-wider block">Methods &amp; Modeling:</span>
                <p className="text-[#c4b99a] text-[11px] leading-relaxed">{project.methods}</p>
              </div>
              <div className="bg-black/30 p-3 rounded-lg border border-[rgba(255,220,160,0.07)] space-y-1">
                <span className="text-[10px] text-[#d9f99d] uppercase font-bold tracking-wider block">Technology Stack:</span>
                <p className="text-[#a3e635] text-[11px]">{project.stack}</p>
              </div>
              <div className="pt-2 border-t border-[rgba(255,220,160,0.12)] flex flex-wrap gap-2 items-center justify-between">
                <a href={project.repo} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#a3e635]/10 border border-[#a3e635]/20 text-[#a3e635] text-[10px] font-bold hover:bg-[#a3e635]/20 transition-all">
                  {icons.github} View on GitHub {icons.externalLink}
                </a>
                <span className="text-[#c4b99a] font-mono text-[10px] font-medium">Demo: <span className="text-[#d9f99d]">{project.demo}</span></span>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   MOBILE: TAB CONTENT COMPONENTS
───────────────────────────────────────────────────────────────────────────── */
type MobileTab = 'home' | 'projects' | 'repos' | 'about' | 'contact';

/* ── Mobile: large editorial home ── */
function MobileHomeTab({ clockTime, clockDay }: { clockTime: string; clockDay: string }) {
  return (
    <div className="pb-28 space-y-4">
      {/* Hero identity block — improved visibility and design */}
      <div className="relative overflow-hidden rounded-3xl shadow-2xl"
        style={{ background: 'linear-gradient(160deg, rgba(20,18,12,0.92) 0%, rgba(10,8,6,0.88) 100%)', backdropFilter: 'blur(40px)', border: '1.5px solid rgba(255,230,160,0.15)' }}>
        <div className="p-6 pb-6">
          <div className="flex items-start gap-5 mb-6">
            <img src={profileImage} alt="Dikshant Neupane"
              className="w-20 h-20 rounded-2xl object-cover border-2 border-[rgba(255,230,160,0.20)] shadow-xl shadow-[rgba(0,0,0,0.4)] shrink-0"/>
            <div className="pt-1 flex-1">
              <div className="text-[12px] text-[#d9f99d] font-black tracking-[0.2em] uppercase font-mono mb-1">AI / DATA / ML</div>
              <h1 className="text-3xl font-black leading-tight tracking-tight font-['Space_Grotesk'] text-[#fffefb] drop-shadow-lg">Dikshant<br/>Neupane</h1>
            </div>
          </div>
          <p className="text-base text-[#f5f0e8] leading-relaxed mb-6 font-medium drop-shadow-sm">
            Building practical AI/ML systems — data pipelines, NLP for low-resource languages, and agentic automation. Based in Kathmandu, Nepal.
          </p>
          {/* Stat row */}
          <div className="grid grid-cols-3 gap-4 border-t-2 border-[rgba(255,230,160,0.12)] pt-5">
            {[['05','Projects'],['03','ML Systems'],['02','AI Systems']].map(([n,l]) => (
              <div key={l} className="flex flex-col gap-1">
                <span className="text-3xl font-black text-[#f5f0e8] font-mono tracking-tight font-['Space_Grotesk'] drop-shadow-md">{n}</span>
                <span className="text-[11px] text-[#d9f99d] font-bold font-sans uppercase tracking-wider leading-tight drop-shadow-sm">{l}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Live clock — improved visibility */}
      <div className="rounded-3xl px-6 py-5 flex items-center justify-between shadow-xl"
        style={{ background: 'linear-gradient(135deg, rgba(183,255,55,0.12) 0%, rgba(163,230,53,0.06) 100%)', border: '1.5px solid rgba(163,230,53,0.25)' }}>
        <div>
          <div className="text-4xl font-mono font-black text-[#f5f0e8] tracking-tight drop-shadow-lg">{clockTime}</div>
          <div className="text-[12px] text-[#d9f99d] font-black tracking-[0.15em] uppercase mt-1 drop-shadow-sm">{clockDay}</div>
        </div>
        <div className="text-right">
          <div className="text-[11px] text-[#c4b99a] mb-1"><span className="text-[#a3e635] font-mono mr-1.5 font-bold">AD</span>Jun 07, 2026</div>
          <div className="text-[11px] text-[#c4b99a]"><span className="text-[#a3e635] font-mono mr-1.5 font-bold">BS</span>Jestha 19, 2081</div>
          <div className="flex items-center justify-end gap-2 mt-3">
            <span className="w-2 h-2 rounded-full bg-[#d9f99d] animate-pulse shadow-[0_0_12px_rgba(163,230,53,0.8)]"/>
            <span className="text-[10px] text-[#d9f99d] font-black tracking-widest drop-shadow-md">LIVE</span>
          </div>
        </div>
      </div>

      {/* Stack + focus — enhanced */}
      <div className="rounded-3xl p-6 space-y-5 shadow-2xl"
        style={{ background: 'rgba(18,16,10,0.88)', backdropFilter: 'blur(32px)', border: '1.5px solid rgba(255,255,255,0.10)' }}>
        <div>
          <div className="text-[12px] text-[#d9f99d] uppercase tracking-widest font-black font-mono mb-3 drop-shadow-sm">CURRENT FOCUS</div>
          <p className="text-sm text-[#f5f0e8] leading-relaxed font-medium">Building practical AI/ML systems across data, NLP, statistical analysis and autonomous agents.</p>
        </div>
        <div className="border-t-2 border-[rgba(255,230,160,0.10)] pt-4 space-y-2">
          <div className="text-[12px] text-[#d9f99d] uppercase tracking-widest font-black font-mono mb-2 drop-shadow-sm">STACK</div>
          <div className="flex flex-wrap gap-2">
            {['Python','Pandas','NumPy','scikit-learn','PyTorch','LLM APIs','SQL'].map(s => (
              <span key={s} className="text-[11px] px-3 py-1.5 rounded-lg font-mono font-bold text-[#d9f99d]"
                style={{ background: 'rgba(163,230,53,0.12)', border: '1.5px solid rgba(163,230,53,0.35)' }}>{s}</span>
            ))}
          </div>
        </div>
        <div className="flex items-center justify-between border-t-2 border-[rgba(255,230,160,0.10)] pt-4">
          <span className="text-[12px] text-[#c4b99a] font-mono font-bold">Kathmandu, Nepal</span>
          <span className="text-[11px] text-[#d9f99d] font-mono font-black">v2.0.4</span>
        </div>
      </div>
    </div>
  );
}

/* ── Mobile: project cards — enhanced visibility and design ── */
function MobileProjectsTab({ onSelectProject }: { onSelectProject: (p: Project) => void }) {
  return (
    <div className="pb-28 space-y-3">
      <div className="pt-1 pb-3">
        <h2 className="text-2xl font-black tracking-tight font-['Space_Grotesk'] text-[#f5f0e8] drop-shadow-lg">Projects</h2>
        <p className="text-[12px] text-[#d9f99d] mt-1 font-mono font-bold">5 active systems — tap to explore</p>
      </div>
      {Object.entries(projectData).map(([, proj]) => (
        <button key={proj.id} onClick={() => onSelectProject(proj)}
          className="w-full text-left rounded-3xl p-6 active:scale-[0.98] transition-transform shadow-xl"
          style={{ background: 'linear-gradient(155deg, rgba(25,22,14,0.95) 0%, rgba(15,12,8,0.92) 100%)', backdropFilter: 'blur(32px)', border: '1.5px solid rgba(255,230,160,0.18)' }}>
          {/* Left-border accent + category + status */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className="w-1.5 h-9 rounded-full bg-[#d9f99d] shrink-0 shadow-[0_0_10px_rgba(163,230,53,0.6)]"/>
              <span className="text-[11px] text-[#d9f99d] font-black font-mono tracking-[0.12em] uppercase drop-shadow-sm">{proj.category}</span>
            </div>
            <span className={`text-[9px] font-black px-3 py-1.5 rounded-full tracking-wider border ${statusStyle[proj.status]}`}>{proj.status}</span>
          </div>
          {/* Name */}
          <h3 className="text-lg font-black text-[#fffefb] leading-snug mb-3 drop-shadow-md">{proj.name}</h3>
          {/* Overview */}
          <p className="text-[12px] text-[#f5f0e8] leading-relaxed line-clamp-2 font-medium drop-shadow-sm">{proj.overview}</p>
          {/* Stack tags + VIEW */}
          <div className="flex items-center justify-between mt-4 pt-4 border-t-2 border-[rgba(255,230,160,0.12)]">
            <div className="flex flex-wrap gap-2">
              {proj.stack.split(', ').slice(0,3).map(s => (
                <span key={s} className="text-[10px] px-2.5 py-1 rounded-md text-[#d9f99d] font-mono font-bold"
                  style={{ background: 'rgba(163,230,53,0.15)', border: '1.5px solid rgba(163,230,53,0.35)' }}>{s}</span>
              ))}
            </div>
            <span className="text-[12px] text-[#d9f99d] font-black font-mono drop-shadow-md">VIEW →</span>
          </div>
        </button>
      ))}
    </div>
  );
}

/* ── Mobile: about ── enhanced visibility and design ── */
function MobileAboutTab() {
  return (
    <div className="pb-28 space-y-5">
      <div className="pt-1 pb-1">
        <h2 className="text-2xl font-black tracking-tight font-['Space_Grotesk'] text-[#f5f0e8] drop-shadow-lg">About</h2>
      </div>

      {/* Hero */}
      <div className="rounded-3xl p-6 shadow-xl"
        style={{ background: 'linear-gradient(160deg, rgba(22,20,14,0.95) 0%, rgba(12,10,8,0.92) 100%)', backdropFilter: 'blur(40px)', border: '1.5px solid rgba(255,230,160,0.18)' }}>
        <div className="flex items-center gap-5 mb-5">
          <img src={profileImage} alt="Dikshant" className="w-20 h-20 rounded-2xl object-cover border-2 border-[rgba(255,230,160,0.20)] shadow-xl shadow-[rgba(0,0,0,0.4)]"/>
          <div>
            <h3 className="text-2xl font-black text-[#fffefb] font-['Space_Grotesk'] drop-shadow-lg">Dikshant Neupane</h3>
            <div className="text-[12px] text-[#d9f99d] tracking-widest uppercase font-black font-mono mt-1">AI / DATA / ML</div>
            <div className="text-[11px] text-[#c4b99a] mt-1 font-medium">Kathmandu, Nepal 🇳🇵</div>
          </div>
        </div>
        <p className="text-base text-[#f5f0e8] leading-relaxed font-medium drop-shadow-sm">
          Building practical AI/ML systems with a focus on real-world applications in the Nepali context.
          Passionate about low-resource NLP, sports analytics, and agentic systems that actually work in production.
        </p>
      </div>

      {/* Grid cards */}
      <div className="grid grid-cols-2 gap-4">
        {[['Focus','Applied ML & NLP'],['Stack','Python-first'],['Domain','Nepal & South Asia'],['Mode','Builder']].map(([k,v]) => (
          <div key={k} className="rounded-2xl p-5 shadow-lg"
            style={{ background: 'rgba(20,18,12,0.92)', backdropFilter: 'blur(32px)', border: '1.5px solid rgba(255,230,160,0.15)' }}>
            <div className="text-[10px] text-[#d9f99d] uppercase tracking-wider font-black font-mono">{k}</div>
            <div className="text-[13px] text-[#fffefb] font-black mt-1 drop-shadow-sm">{v}</div>
          </div>
        ))}
      </div>

      {/* GitHub link */}
      <a href="https://github.com/Dikshant-Neupane" target="_blank" rel="noopener noreferrer"
        className="flex items-center gap-4 rounded-2xl p-5 active:scale-[0.98] transition-transform shadow-xl"
        style={{ background: 'linear-gradient(135deg, rgba(20,18,12,0.92) 0%, rgba(15,13,9,0.88) 100%)', backdropFilter: 'blur(32px)', border: '1.5px solid rgba(255,230,160,0.18)' }}>
        <span className="w-12 h-12 rounded-xl bg-[#d9f99d]/15 flex items-center justify-center text-[#d9f99d] shrink-0 shadow-[0_0_15px_rgba(163,230,53,0.3)]">
          {icons.githubLg}
        </span>
        <div className="flex-1 min-w-0">
          <div className="text-[12px] font-black text-[#fffefb] drop-shadow-sm">GitHub Profile</div>
          <div className="text-[11px] text-[#c4b99a] font-mono truncate">github.com/Dikshant-Neupane</div>
        </div>
        <span className="text-[#d9f99d]">{icons.externalLink}</span>
      </a>
    </div>
  );
}

/* ── Mobile: contact ── enhanced visibility and design ── */
function MobileContactTab() {
  const links = [
    { icon: icons.mail,     label: 'Email',    value: 'dikshantneupane69@gmail.com', href: 'mailto:dikshantneupane69@gmail.com', short: 'Gmail' },
    { icon: icons.githubLg, label: 'GitHub',   value: 'github.com/Dikshant-Neupane',  href: 'https://github.com/Dikshant-Neupane',  short: 'GitHub' },
    { icon: icons.person,   label: 'LinkedIn', value: 'linkedin.com/in/dikshant-neupane',           href: 'https://www.linkedin.com/in/dikshant-neupane-a64b09326/', short: 'LinkedIn' },
  ];
  return (
    <div className="pb-28 space-y-5">
      <div className="pt-1 pb-1">
        <h2 className="text-2xl font-black tracking-tight font-['Space_Grotesk'] text-[#f5f0e8] drop-shadow-lg">Contact</h2>
        <p className="text-[12px] text-[#d9f99d] mt-1 font-bold">Open for collaborations &amp; freelance</p>
      </div>

      <div className="space-y-4">
        {links.map(({ icon, label, value, href, short }) => (
          <a key={label} href={href} target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-5 rounded-3xl p-6 active:scale-[0.98] transition-transform block shadow-xl"
            style={{ background: 'linear-gradient(145deg, rgba(22,19,12,0.95) 0%, rgba(14,12,8,0.92) 100%)', backdropFilter: 'blur(40px)', border: '1.5px solid rgba(255,230,160,0.18)' }}>
            <span className="w-14 h-14 rounded-2xl bg-[#d9f99d]/15 flex items-center justify-center text-[#d9f99d] shrink-0 shadow-[0_0_15px_rgba(163,230,53,0.3)]">
              {icon}
            </span>
            <div className="flex-1 min-w-0">
              <div className="text-[11px] text-[#d9f99d] uppercase tracking-wider font-black font-mono mb-1">{label}</div>
              <div className="text-[13px] font-black text-[#fffefb] truncate drop-shadow-sm">{value}</div>
            </div>
            <div className="shrink-0 px-4 py-2 rounded-xl text-[11px] font-black text-[#d9f99d] font-mono"
              style={{ background: 'rgba(163,230,53,0.15)', border: '1.5px solid rgba(163,230,53,0.35)' }}>
              {short} ↗
            </div>
          </a>
        ))}
      </div>

      <div className="rounded-2xl p-5 flex items-center gap-4 shadow-lg"
        style={{ background: 'rgba(163,230,53,0.12)', border: '1.5px solid rgba(163,230,53,0.28)' }}>
        <span className="w-2.5 h-2.5 rounded-full bg-[#d9f99d] animate-pulse shrink-0 shadow-[0_0_12px_rgba(163,230,53,0.8)]"/>
        <p className="text-[13px] text-[#f5f0e8] font-medium drop-shadow-sm">Available for collaborations and freelance AI/ML projects</p>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   MOBILE BOTTOM TAB BAR — enhanced visibility
───────────────────────────────────────────────────────────────────────────── */
const mobileTabDefs: { id: MobileTab; label: string; icon: React.ReactNode }[] = [
  {
    id: 'home', label: 'Home',
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6 fill-none stroke-current stroke-[2] [stroke-linecap:round] [stroke-linejoin:round]" aria-hidden="true">
        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9,22 9,12 15,12 15,22"/>
      </svg>
    ),
  },
  {
    id: 'projects', label: 'Projects',
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current" aria-hidden="true">
        <path d="M2 6.5C2 5.12 3.12 4 4.5 4h4.08c.61 0 1.19.24 1.62.67L11.5 6H19.5C20.88 6 22 7.12 22 8.5v9c0 1.38-1.12 2.5-2.5 2.5h-15C3.12 20 2 18.88 2 17.5v-11z"/>
      </svg>
    ),
  },
  {
    id: 'repos', label: 'Repos',
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current" aria-hidden="true">
        <path d="M12 2C6.48 2 2 6.48 2 12c0 4.42 2.87 8.17 6.84 9.49.5.09.68-.22.68-.48v-1.69c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.89 1.52 2.34 1.08 2.91.83.09-.65.35-1.08.63-1.33-2.22-.25-4.56-1.11-4.56-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02A9.56 9.56 0 0112 6.8c.85 0 1.71.11 2.51.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.69-4.57 4.94.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10.01 10.01 0 0022 12c0-5.52-4.48-10-10-10z"/>
      </svg>
    ),
  },
  {
    id: 'about', label: 'About',
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6 fill-none stroke-current stroke-[2] [stroke-linecap:round] [stroke-linejoin:round]" aria-hidden="true">
        <circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.58-7 8-7s8 3 8 7"/>
      </svg>
    ),
  },
  {
    id: 'contact', label: 'Contact',
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6 fill-none stroke-current stroke-[2] [stroke-linecap:round] [stroke-linejoin:round]" aria-hidden="true">
        <rect x="2" y="4" width="20" height="16" rx="2"/><polyline points="2,4 12,13 22,4"/>
      </svg>
    ),
  },
];

/* ─────────────────────────────────────────────────────────────────────────────
   APP
───────────────────────────────────────────────────────────────────────────── */
export default function App() {
  /* Clock */
  const [clockTime, setClockTime] = useState('');
  const [clockDay,  setClockDay]  = useState('');

  /* Wallpaper */
  const [wallpaperIdx, setWallpaperIdx] = useState(0);

  /* Window states */
  const [terminalState, setTerminalState] = useState<WinState>('open');
  const [detailState,   setDetailState]   = useState<WinState>('closed');
  const [aboutState,    setAboutState]    = useState<WinState>('closed');
  const [contactState,  setContactState]  = useState<WinState>('closed');
  const [blogsState,    setBlogsState]    = useState<WinState>('closed');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  /* Terminal */
  const [inputValue,     setInputValue]     = useState('');
  const [cmdHistory,     setCmdHistory]     = useState<string[]>([]);
  const [historyIndex,   setHistoryIndex]   = useState(-1);
  const [terminalOutput, setTerminalOutput] = useState<{ type: 'cmd'|'out'; text: string }[]>([]);
  const [showIdleHint,   setShowIdleHint]   = useState(false);
  const inputRef    = useRef<HTMLInputElement>(null);
  const termBodyRef = useRef<HTMLDivElement>(null);
  const idleTimer   = useRef<ReturnType<typeof setTimeout> | null>(null);

  /* Active nav pill */
  const [activeNav, setActiveNav] = useState<string>('projects');

  /* Dragging */
  const zCounter = useRef(110);
  const dragRef  = useRef<{ el: HTMLElement | null; ox: number; oy: number }>({ el: null, ox: 0, oy: 0 });

  /* Typewriter welcome */
  const welcome = useTypewriter('Welcome to Dikshant OS v2.0.4. Type \'help\' to see available commands.');

  /* Mobile */
  const isMobile = useIsMobile();
  const [mobileTab, setMobileTab] = useState<MobileTab>('home');
  const [mobileSelectedProject, setMobileSelectedProject] = useState<Project | null>(null);

  /* ── Clock ── */
  useEffect(() => {
    const tick = () => {
      const now = new Date();
      setClockTime(now.toLocaleTimeString('en-US', { hour12: false }));
      setClockDay(now.toLocaleDateString('en-US', { weekday: 'long' }).toUpperCase());
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  /* ── Auto-scroll terminal body ── */
  useEffect(() => {
    if (termBodyRef.current) termBodyRef.current.scrollTop = termBodyRef.current.scrollHeight;
  }, [terminalOutput]);

  /* ── Idle hint: show "try typing 'help'" after 4s of no interaction ── */
  useEffect(() => {
    if (terminalState !== 'open') return;
    idleTimer.current = setTimeout(() => setShowIdleHint(true), 4000);
    return () => { if (idleTimer.current) clearTimeout(idleTimer.current); };
  }, [terminalState]);

  const dismissIdleHint = () => {
    setShowIdleHint(false);
    if (idleTimer.current) clearTimeout(idleTimer.current);
  };

  /* ── Global drag listeners ── */
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const { el, ox, oy } = dragRef.current;
      if (!el || el.classList.contains('win-maximized')) return;
      const maxX = window.innerWidth  - el.offsetWidth;
      const maxY = window.innerHeight - el.offsetHeight;
      el.style.left = Math.max(0, Math.min(e.clientX - ox, maxX)) + 'px';
      el.style.top  = Math.max(0, Math.min(e.clientY - oy, maxY)) + 'px';
    };
    const onUp = () => { dragRef.current.el = null; };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup',   onUp);
    return () => { window.removeEventListener('mousemove', onMove); window.removeEventListener('mouseup', onUp); };
  }, []);

  /* ── Keyboard shortcuts ── */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const mod = e.metaKey || e.ctrlKey;
      if (mod && e.key === 't') { e.preventDefault(); openWin('terminal'); }
      if (mod && e.key === 'k') { e.preventDefault(); setTerminalOutput([]); }
      if (e.key === 'Escape') {
        if (contactState  === 'open') { setContactState('closed');  return; }
        if (aboutState    === 'open') { setAboutState('closed');    return; }
        if (blogsState    === 'open') { setBlogsState('closed');    return; }
        if (detailState   === 'open') { setDetailState('closed');   return; }
        if (terminalState === 'open') { setTerminalState('closed'); return; }
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [terminalState, detailState, aboutState, contactState, blogsState]);

  /* ── Helpers ── */
  const bringToFront = useCallback((winId: string) => {
    const el = document.getElementById(winId);
    if (!el) return;
    zCounter.current += 1;
    el.style.zIndex = String(zCounter.current);
  }, []);

  const startDrag = (e: React.MouseEvent, winId: string) => {
    if ((e.target as Element).closest('.no-drag')) return;
    const el = document.getElementById(winId);
    if (!el) return;
    zCounter.current += 1;
    el.style.zIndex = String(zCounter.current);
    dragRef.current = { el, ox: e.clientX - el.offsetLeft, oy: e.clientY - el.offsetTop };
  };

  const toggleMaximize = (winId: string) => document.getElementById(winId)?.classList.toggle('win-maximized');

  const openWin = (win: 'terminal' | 'about' | 'contact' | 'blogs') => {
    if (win === 'terminal') { setTerminalState(s => s !== 'open' ? 'open' : s); setTimeout(() => bringToFront('win-terminal'), 0); }
    if (win === 'about')    { setAboutState(  s => s !== 'open' ? 'open' : s); setTimeout(() => bringToFront('win-about'),    0); }
    if (win === 'contact')  { setContactState(s => s !== 'open' ? 'open' : s); setTimeout(() => bringToFront('win-contact'),  0); }
    if (win === 'blogs')    { setBlogsState(  s => s !== 'open' ? 'open' : s); setTimeout(() => bringToFront('win-blogs'),    0); }
  };

  const showProject = (key: string) => {
    const proj = projectData[key];
    if (!proj) return;
    setSelectedProject(proj);
    setDetailState('open');
    setTimeout(() => bringToFront('win-detail'), 0);
  };

  /* ── Terminal commands ── */
  const runCommand = useCallback((raw: string) => {
    const cmd = raw.trim().toLowerCase();
    if (!cmd) return;

    if (cmd === 'clear') { setTerminalOutput([]); return; }
    if (cmd === 'exit')  { setTerminalState('closed'); return; }

    setCmdHistory(h => [cmd, ...h].slice(0, 50));
    setHistoryIndex(-1);

    const push = (text: string) =>
      setTerminalOutput(p => [...p, { type: 'cmd', text: cmd }, { type: 'out', text }]);

    const responses: Record<string, string> = {
      bio:      'Dikshant Neupane — AI & Data Architect / ML Engineer based in Nepal.',
      projects: "Index of 5 active systems. Use 'view 1–5' or click a project row.",
      blogs:    "Research Logs — Latest: low-resource NLP pipelines & dynamic agentic tooling.",
      contact:  'Opening contact window...',
      help:     'Commands: projects · view [1-5] · bio · blogs · contact · about · clear · exit   Shortcuts: Ctrl+T open terminal · Esc close window · Ctrl+K clear',
      about:    'Opening about window...',
    };

    if (cmd === 'contact') { push(responses.contact); openWin('contact'); setActiveNav('contact'); return; }
    if (cmd === 'blogs')   { push('Opening GitHub repository index...'); openWin('blogs'); setActiveNav('blogs'); return; }
    if (cmd === 'about' || cmd === 'bio') {
      push(responses[cmd] || responses.about);
      if (cmd === 'about') openWin('about');
      setActiveNav('bio');
      return;
    }

    if (responses[cmd]) { push(responses[cmd]); setActiveNav(cmd); return; }

    const viewMap: Record<string, string> = { '1':'cricnepal','2':'house-price','3':'nepal-election','4':'jana-sunuwaai','5':'truva-agent' };
    const vm = cmd.match(/^view\s+(\d)/);
    if (vm && viewMap[vm[1]]) { setTerminalOutput(p => [...p, { type:'cmd', text:cmd }]); showProject(viewMap[vm[1]]); return; }

    if (cmd.includes('cric'))                              { setTerminalOutput(p=>[...p,{type:'cmd',text:cmd}]); showProject('cricnepal'); }
    else if (cmd.includes('house'))                        { setTerminalOutput(p=>[...p,{type:'cmd',text:cmd}]); showProject('house-price'); }
    else if (cmd.includes('nepal')||cmd.includes('elect')) { setTerminalOutput(p=>[...p,{type:'cmd',text:cmd}]); showProject('nepal-election'); }
    else if (cmd.includes('jana')||cmd.includes('sunu'))   { setTerminalOutput(p=>[...p,{type:'cmd',text:cmd}]); showProject('jana-sunuwaai'); }
    else if (cmd.includes('truva')||cmd.includes('agent')) { setTerminalOutput(p=>[...p,{type:'cmd',text:cmd}]); showProject('truva-agent'); }
    else push(`command not found: ${cmd}. Type 'help'.`);
  }, []);

  /* ── Input key handler ── */
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    dismissIdleHint();
    if (e.key === 'Enter') {
      runCommand(inputValue);
      setInputValue('');
      setHistoryIndex(-1);
      return;
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      const next = Math.min(historyIndex + 1, cmdHistory.length - 1);
      setHistoryIndex(next);
      setInputValue(cmdHistory[next] ?? '');
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      const next = historyIndex - 1;
      if (next < 0) { setHistoryIndex(-1); setInputValue(''); }
      else { setHistoryIndex(next); setInputValue(cmdHistory[next] ?? ''); }
    }
  };

  /* ── Style constants ── */
  const winBase   = 'absolute flex flex-col rounded-2xl overflow-hidden shadow-2xl bg-[rgba(12,10,8,0.45)] backdrop-blur-[48px] border border-[rgba(255,255,255,0.06)] [box-shadow:inset_0_1px_0_rgba(255,255,255,0.07),0_24px_48px_-12px_rgba(0,0,0,0.55)]';
  // open = animate in with scale+fade, minimized = shrink to dock, closed = hidden
  const winClass  = (state: WinState) => {
    if (state === 'closed')    return `${winBase} hidden`;
    if (state === 'minimized') return `${winBase} scale-[0.15] translate-y-[700px] opacity-0 pointer-events-none transition-[transform,opacity] duration-300 ease-in`;
    return `${winBase} scale-100 opacity-100 transition-[transform,opacity] duration-200 ease-out`;
  };
  const cardBase  = 'backdrop-blur-[40px] rounded-2xl border [background:linear-gradient(145deg,rgba(40,32,20,0.38)_0%,rgba(20,16,10,0.30)_100%)] [border-color:rgba(255,220,160,0.10)] [box-shadow:inset_0_1px_0_rgba(255,230,180,0.08),0_16px_40px_-8px_rgba(0,0,0,0.45)]';

  const navPill = (cmd: string) =>
    `px-3.5 py-[5px] rounded-full text-[11px] font-medium font-mono border transition-all cursor-pointer ${
      activeNav === cmd
        ? 'bg-[rgba(163,230,53,0.25)] border-[#a3e635] text-[#d9f99d] shadow-[0_0_12px_rgba(163,230,53,0.3)]'
        : 'bg-[rgba(163,230,53,0.06)] border-[rgba(163,230,53,0.25)] text-[#a3e635] hover:bg-[rgba(163,230,53,0.2)] hover:border-[#a3e635] hover:-translate-y-px'
    }`;

  /* ─────────────────────────────────────────────────────────────────────────
     MOBILE LAYOUT
  ───────────────────────────────────────────────────────────────────────── */
  if (isMobile) {
    return (
      <>
        {/* Background — darkened more on mobile for readability */}
        <div
          className="fixed inset-0 bg-cover bg-center brightness-[0.55]"
          style={{ backgroundImage: `url('${WALLPAPERS[1]}')` }}
        />

        {/* SVG grade filter */}
        <svg className="absolute w-0 h-0" aria-hidden="true">
          <filter id="grade" colorInterpolationFilters="sRGB">
            <feColorMatrix type="matrix" values="1.12 0 0 0 -0.10  0 1.12 0 0 -0.10  0 0 1.176 0 -0.105  0 0 0 1 0"/>
          </filter>
        </svg>

        {/* Scrollable content area */}
        <main className="relative z-10 h-screen flex flex-col overflow-hidden">
          <div className="flex-1 overflow-y-auto custom-scrollbar px-4 pt-5">
            {mobileTab === 'home' && (
              <MobileHomeTab clockTime={clockTime} clockDay={clockDay} />
            )}
            {mobileTab === 'projects' && (
              <MobileProjectsTab
                onSelectProject={(p) => setMobileSelectedProject(p)}
              />
            )}
            {mobileTab === 'repos' && (
              <div className="pb-28">
                <div className="pt-1 pb-3">
                  <h2 className="text-xl font-bold tracking-tight font-['Space_Grotesk'] text-[#f5f0e8]">Repositories</h2>
                  <p className="text-[12px] text-[#7a6f5a] mt-1 font-mono">All public work on GitHub</p>
                </div>
                <div className="rounded-3xl overflow-hidden"
                  style={{ background: 'rgba(14,12,8,0.82)', backdropFilter: 'blur(28px)', border: '1px solid rgba(255,255,255,0.06)' }}>
                  <div className="p-4">
                    <BlogsContent />
                  </div>
                </div>
              </div>
            )}
            {mobileTab === 'about'   && <MobileAboutTab />}
            {mobileTab === 'contact' && <MobileContactTab />}
          </div>

          {/* Bottom tab bar — enhanced visibility */}
          <nav
            className="fixed bottom-0 left-0 right-0 z-[200] pb-safe"
            style={{ background: 'rgba(12,10,8,0.95)', backdropFilter: 'blur(48px)', borderTop: '1.5px solid rgba(255,230,160,0.18)', boxShadow: '0 -4px 20px rgba(0,0,0,0.4)' }}
            aria-label="Main navigation"
          >
            <div className="flex items-center justify-around px-2 pt-3 pb-3">
              {mobileTabDefs.map(tab => {
                const active = mobileTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setMobileTab(tab.id)}
                    className="flex flex-col items-center gap-2 px-2 py-2 rounded-2xl transition-all duration-200 min-w-[70px]"
                    style={active ? { background: 'rgba(163,230,53,0.12)' } : {}}
                    aria-current={active ? 'page' : undefined}
                  >
                    <span className={`transition-all duration-200 ${active ? 'text-[#d9f99d] scale-110 drop-shadow-[0_0_8px_rgba(163,230,53,0.5)]' : 'text-[#a3e635]'}`}>
                      {tab.icon}
                    </span>
                    <span className={`text-[12px] font-black tracking-wide transition-colors duration-200 ${active ? 'text-[#d9f99d] drop-shadow-sm' : 'text-[#9a8f7a]'}`}>
                      {tab.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </nav>
        </main>

        {/* Mobile project detail bottom sheet */}
        <MobileProjectSheet
          project={mobileSelectedProject}
          onClose={() => setMobileSelectedProject(null)}
        />

        <style>{`
          .pb-safe { padding-bottom: env(safe-area-inset-bottom, 16px); }
          .custom-scrollbar::-webkit-scrollbar { width: 4px; }
          .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
          .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,230,160,0.10); border-radius: 10px; }
          .no-scrollbar { scrollbar-width: none; }
          .no-scrollbar::-webkit-scrollbar { display: none; }
          .card-warm::before { content:''; position:absolute; inset:0; border-radius:inherit; pointer-events:none; background:linear-gradient(180deg,rgba(255,220,140,0.04) 0%,transparent 40%); }
          .line-clamp-2 { display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical; overflow:hidden; }
          @keyframes blink { 50% { opacity:0; } }
        `}</style>
      </>
    );
  }

  /* ─────────────────────────────────────────────────────────────────────────
     DESKTOP LAYOUT (unchanged)
  ───────────────────────────────────────────────────────────────────────── */
  return (
    <>
      {/* ── Background ── */}
      <div
        className="fixed inset-0 bg-cover bg-center brightness-[0.85] transition-all duration-700"
        style={{ backgroundImage: `url('${WALLPAPERS[wallpaperIdx]}')` }}
      />

      {/* ── SVG grade filter ── */}
      <svg className="absolute w-0 h-0" aria-hidden="true">
        <filter id="grade" colorInterpolationFilters="sRGB">
          <feColorMatrix type="matrix" values="1.12 0 0 0 -0.10  0 1.12 0 0 -0.10  0 0 1.176 0 -0.105  0 0 0 1 0"/>
        </filter>
      </svg>

      <main className="relative h-screen w-full z-10 flex overflow-hidden select-none">

        {/* ── SIDEBAR ── */}
        <aside className="w-80 h-full p-6 flex flex-col gap-5 shrink-0 z-10">
          <div className={`${cardBase} p-6 relative card-warm`}>
            <img src={profileImage} alt="Dikshant Neupane"
              className="w-20 h-20 rounded-2xl object-cover mb-4 border border-[rgba(255,220,160,0.12)] shadow-md"/>
            <h1 className="text-xl font-bold tracking-tight font-['Space_Grotesk'] text-[#f5f0e8]">Dikshant Neupane</h1>
            <p className="text-[10px] text-[#a3e635] tracking-[0.2em] uppercase font-bold mt-1">AI / DATA / ML</p>
            <div className="mt-7 space-y-3.5 text-xs font-mono">
              {[['PROJECTS:','05'],['ML SYSTEMS:','03'],['AI SYSTEMS:','02'],['EXPERIMENTS:','—']].map(([l,v],i,a)=>(
                <div key={l} className={`flex justify-between items-center pb-2 ${i<a.length-1?'border-b border-[rgba(255,220,160,0.07)]':''}`}>
                  <span className="text-[#9a8f7a] text-[11px] font-sans">{l}</span>
                  <span className="text-[#f5f0e8] font-semibold">{v}</span>
                </div>
              ))}
            </div>
          </div>
          <div className={`${cardBase} p-6 relative card-warm`}>
            <h3 className="text-[9px] text-[#d9f99d] font-bold uppercase mb-2.5 tracking-widest font-mono">CURRENT FOCUS</h3>
            <p className="text-xs text-[#e8e0d0] leading-relaxed font-mono">Building practical AI/ML systems across data, NLP, statistical analysis and autonomous agents.</p>
          </div>
        </aside>

        {/* ── DESKTOP ── */}
        <div className="flex-1 relative">

          {/* Clock + Telemetry */}
          <div className="absolute top-0 right-0 p-6 flex flex-col items-end gap-3.5 z-20 pointer-events-none">
            <div className={`pointer-events-auto ${cardBase} px-5 py-2.5 flex items-center gap-5 hover:brightness-110 transition-all`}>
              <div className="flex flex-col items-end">
                <span className="text-xl text-[#f5f0e8] font-mono font-bold tracking-tight">{clockTime}</span>
                <span className="text-[9px] text-[#a3e635] font-bold tracking-widest uppercase font-mono">{clockDay}</span>
              </div>
              <div className="w-px h-8 bg-white/10"/>
              <div className="space-y-0.5">
                <div className="flex items-center gap-2.5 text-[10px]">
                  <span className="text-[#c4b99a] font-mono">AD</span>
                  <span className="text-[#e8e0d0] font-medium">Jun 07, 2026</span>
                </div>
                <div className="flex items-center gap-2.5 text-[10px]">
                  <span className="text-[#c4b99a] font-mono">BS</span>
                  <span className="text-[#e8e0d0] font-medium">Jestha 19, 2081</span>
                </div>
              </div>
              <div className="flex items-center gap-1.5 px-2 py-1 bg-[#a3e635]/10 rounded-md">
                <div className="w-1.5 h-1.5 rounded-full bg-[#a3e635] animate-pulse"/>
                <span className="text-[8px] text-[#a3e635] font-black tracking-wider">LIVE</span>
              </div>
            </div>
            <div className={`pointer-events-auto w-72 ${cardBase} p-4 space-y-3.5`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#a3e635] shadow-[0_0_8px_rgba(163,230,53,0.6)]"/>
                  <span className="text-[10px] font-mono text-[#a3e635] font-bold uppercase tracking-wider">SYSTEM: ONLINE</span>
                </div>
                <span className="text-[9px] text-[#c4b99a] font-mono">22.4°C</span>
              </div>
              <div className="space-y-1 border-t border-[rgba(255,220,160,0.07)] pt-2.5 font-mono">
                <span className="text-[9px] text-[#d9f99d] uppercase font-bold tracking-wider block">PROJECT INDEX:</span>
                <span className="text-[11px] text-[#f5f0e8] font-semibold">05 PROJECTS</span>
              </div>
              <div className="space-y-1 font-mono">
                <span className="text-[9px] text-[#d9f99d] uppercase font-bold tracking-wider block">PRIMARY STACK:</span>
                <p className="text-[10px] text-[#c4b99a] leading-snug">Python, Pandas, NumPy, scikit-learn, SQL, PyTorch, LLM APIs</p>
              </div>
              <div className="space-y-1 font-mono">
                <span className="text-[9px] text-[#d9f99d] uppercase font-bold tracking-wider block">PROJECT TYPES:</span>
                <p className="text-[10px] text-[#a3e635]/90 leading-snug">DATA / ML, NLP, STATISTICS, AGENTIC AI</p>
              </div>
              <div className="flex justify-between items-center pt-2 border-t border-[rgba(255,220,160,0.07)]">
                <span className="text-[9px] text-[#9a8f7a] font-mono">LOC: NEPAL</span>
                <span className="text-[9px] text-[#a3e635]/60 font-mono">v2.0.4</span>
              </div>
            </div>
          </div>

          {/* ── TERMINAL WINDOW ── */}
          <div id="win-terminal" onMouseDown={e => { bringToFront('win-terminal'); startDrag(e,'win-terminal'); }}
            className={`${winClass(terminalState)} w-full max-w-2xl h-[510px]`}
            style={{ top:'14%', left:'48%', transform:'translateX(-48%)', zIndex:102 }}>
            <header className="h-[38px] shrink-0 bg-black/[0.28] flex items-center px-3.5 border-b border-[rgba(255,220,160,0.06)] cursor-grab active:cursor-grabbing">
              <TrafficLights onClose={()=>setTerminalState('closed')} onMinimize={()=>setTerminalState('minimized')} onMaximize={()=>toggleMaximize('win-terminal')}/>
              <div className="flex-1 text-center pr-8"><span className="text-[11px] font-mono text-[#9a8f7a]">guest@dikshant-os: ~/projects</span></div>
            </header>
            <div ref={termBodyRef} className="flex-1 p-6 font-mono text-sm overflow-y-auto custom-scrollbar bg-black/25 space-y-3.5"
              onClick={()=>inputRef.current?.focus()}>

              {/* Typewriter welcome */}
              <p className="text-[#a3e635] text-xs min-h-[1rem]">{welcome}<span className={welcome.length < 'Welcome to Dikshant OS v2.0.4. Type \'help\' to see available commands.'.length ? 'inline-block w-1.5 h-3 bg-[#a3e635] ml-0.5 align-middle' : 'hidden'} style={{animation:'blink 1s step-end infinite'}}/></p>

              {/* Nav pills */}
              <div className="flex flex-wrap gap-2 no-drag">
                {[['bio','About Me'],['projects','Projects'],['blogs','Logs'],['contact','Contact']].map(([cmd,label])=>(
                  <button key={cmd} onClick={()=>{ runCommand(cmd); }} className={navPill(cmd)}>[{label}]</button>
                ))}
              </div>

              {/* Static boot output */}
              <div className="text-xs text-[#c4b99a]">
                <span className="text-[#a3e635] font-bold">$</span> projects<br/>
                <span className="text-[#c4b99a] italic">Loading project index...</span>
              </div>

              {/* Project rows */}
              <div className="space-y-2 no-drag">
                {Object.entries(projectData).map(([key,proj])=>(
                  <div key={key} onClick={()=>showProject(key)}
                    className="border border-[rgba(255,220,160,0.07)] rounded-lg p-2.5 bg-black/20 cursor-pointer group transition-all hover:bg-[rgba(163,230,53,0.08)] hover:border-[rgba(163,230,53,0.35)] hover:pl-3.5">
                    <div className="flex items-center justify-between">
                      <div className="text-[10px] text-[#a3e635] font-bold tracking-wider">{proj.id} // {proj.category}</div>
                      <span className={`text-[8px] font-bold px-1.5 py-0.5 rounded-md tracking-wider ${statusStyle[proj.status]}`}>{proj.status}</span>
                    </div>
                    <div className="text-xs text-[#f5f0e8] font-semibold flex items-center justify-between mt-0.5">
                      <span>{proj.name}</span>
                      <span className="text-[10px] text-[#c4b99a] font-mono group-hover:text-[#a3e635] transition-colors ml-2 shrink-0">VIEW &gt;</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Terminal output history */}
              {terminalOutput.map((line,i)=>(
                <div key={i} className="text-xs">
                  {line.type==='cmd'
                    ? <><span className="text-[#a3e635] font-bold">$ </span><span className="text-[#c4b99a]">{line.text}</span></>
                    : <span className="text-[#9a8f7a] leading-relaxed">{line.text}</span>}
                </div>
              ))}

              {/* Quick command chips */}
              <div className="no-drag flex flex-wrap gap-1.5 pt-1">
                {(['about','contact','projects','bio','blogs','help','clear'] as const).map(cmd => (
                  <button key={cmd} onClick={()=>{ runCommand(cmd); inputRef.current?.focus(); }}
                    className="px-2.5 py-1 rounded-md text-[10px] font-mono font-medium
                      bg-black/30 border border-[rgba(255,220,160,0.10)] text-[#9a8f7a]
                      hover:border-[rgba(163,230,53,0.4)] hover:text-[#a3e635] hover:bg-[rgba(163,230,53,0.07)]
                      transition-all cursor-pointer select-none">
                    {cmd}
                  </button>
                ))}
              </div>

              {/* Input prompt with ghost autocomplete */}
              <TerminalInput
                inputRef={inputRef}
                value={inputValue}
                onChange={setInputValue}
                onKeyDown={handleKeyDown}
                onSubmit={(val) => { runCommand(val); setInputValue(''); setHistoryIndex(-1); }}
              />
            </div>
          </div>

          {/* ── PROJECT DETAIL WINDOW ── */}
          <div id="win-detail" onMouseDown={e=>{ bringToFront('win-detail'); startDrag(e,'win-detail'); }}
            className={`${winClass(detailState)} w-full max-w-xl h-[460px]`}
            style={{ top:'22%', left:'52%', transform:'translateX(-45%)', zIndex:103 }}>
            <header className="h-[38px] shrink-0 bg-black/[0.28] flex items-center px-3.5 border-b border-[rgba(255,220,160,0.06)] cursor-grab active:cursor-grabbing">
              <TrafficLights onClose={()=>setDetailState('closed')} onMinimize={()=>setDetailState('minimized')} onMaximize={()=>toggleMaximize('win-detail')}/>
              <div className="flex-1 text-center pr-8 font-mono text-[11px] text-[#9a8f7a]">
                dikshant-os: ~/projects/{selectedProject ? Object.keys(projectData).find(k=>projectData[k]===selectedProject) : ''}
              </div>
            </header>
            <div className="flex-1 p-6 font-mono text-xs overflow-y-auto custom-scrollbar bg-black/30 space-y-4">
              {selectedProject && (<>
                <div className="flex items-center justify-between border-b border-[rgba(255,220,160,0.12)] pb-2">
                  <span className="text-[#a3e635] font-bold tracking-wider text-[11px]">{selectedProject.id} // {selectedProject.category}</span>
                  <span className={`text-[8px] font-bold px-2 py-0.5 rounded-md tracking-wider ${statusStyle[selectedProject.status]}`}>{selectedProject.status}</span>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#f5f0e8] font-['Space_Grotesk'] mb-1">{selectedProject.name}</h3>
                  <p className="text-[#9a8f7a] leading-relaxed text-[11px]">{selectedProject.overview}</p>
                </div>
                <div className="bg-black/30 p-3 rounded-lg border border-[rgba(255,220,160,0.07)] space-y-1">
                  <span className="text-[10px] text-[#7a6f5a] uppercase font-bold tracking-wider block">Methods &amp; Modeling:</span>
                  <p className="text-[#c4b99a] text-[11px] leading-relaxed">{selectedProject.methods}</p>
                </div>
                <div className="bg-black/30 p-3 rounded-lg border border-[rgba(255,220,160,0.07)] space-y-1">
                  <span className="text-[10px] text-[#7a6f5a] uppercase font-bold tracking-wider block">Technology Stack:</span>
                  <p className="text-[#a3e635] text-[11px]">{selectedProject.stack}</p>
                </div>
                <div className="pt-2 border-t border-[rgba(255,220,160,0.12)] flex flex-wrap gap-2 items-center justify-between">
                  <a href={selectedProject.repo} target="_blank" rel="noopener noreferrer"
                    className="no-drag flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#a3e635]/10 border border-[#a3e635]/20 text-[#a3e635] text-[10px] font-bold hover:bg-[#a3e635]/20 transition-all">
                    {icons.github} View on GitHub {icons.externalLink}
                  </a>
                  <span className="text-[#7a6f5a] font-mono text-[10px]">Demo: <span className="text-[#c4b99a]">{selectedProject.demo}</span></span>
                </div>
              </>)}
            </div>
          </div>

          {/* ── ABOUT WINDOW ── */}
          <div id="win-about" onMouseDown={e=>{ bringToFront('win-about'); startDrag(e,'win-about'); }}
            className={`${winClass(aboutState)} w-80 h-auto`}
            style={{ top:'18%', left:'30%', zIndex:104 }}>
            <header className="h-[38px] shrink-0 bg-black/[0.28] flex items-center px-3.5 border-b border-[rgba(255,220,160,0.06)] cursor-grab active:cursor-grabbing">
              <TrafficLights onClose={()=>setAboutState('closed')} onMinimize={()=>setAboutState('minimized')} onMaximize={()=>toggleMaximize('win-about')}/>
              <div className="flex-1 text-center pr-8 font-mono text-[11px] text-[#9a8f7a]">dikshant-os: ~/about</div>
            </header>
            <div className="p-5 bg-black/30 overflow-y-auto custom-scrollbar max-h-[420px]"><AboutContent/></div>
          </div>

          {/* ── CONTACT WINDOW ── */}
          <div id="win-contact" onMouseDown={e=>{ bringToFront('win-contact'); startDrag(e,'win-contact'); }}
            className={`${winClass(contactState)} w-80 h-auto`}
            style={{ top:'25%', left:'22%', zIndex:105 }}>
            <header className="h-[38px] shrink-0 bg-black/[0.28] flex items-center px-3.5 border-b border-[rgba(255,220,160,0.06)] cursor-grab active:cursor-grabbing">
              <TrafficLights onClose={()=>setContactState('closed')} onMinimize={()=>setContactState('minimized')} onMaximize={()=>toggleMaximize('win-contact')}/>
              <div className="flex-1 text-center pr-8 font-mono text-[11px] text-[#9a8f7a]">dikshant-os: ~/contact</div>
            </header>
            <div className="p-5 bg-black/30 overflow-y-auto custom-scrollbar max-h-[340px]"><ContactContent/></div>
          </div>

          {/* ── BLOGS / REPOS WINDOW ── */}
          <div id="win-blogs" onMouseDown={e=>{ bringToFront('win-blogs'); startDrag(e,'win-blogs'); }}
            className={`${winClass(blogsState)} w-[520px] h-[480px]`}
            style={{ top:'12%', left:'36%', zIndex:106 }}>
            <header className="h-[38px] shrink-0 bg-black/[0.28] flex items-center px-3.5 border-b border-[rgba(255,220,160,0.06)] cursor-grab active:cursor-grabbing">
              <TrafficLights onClose={()=>setBlogsState('closed')} onMinimize={()=>setBlogsState('minimized')} onMaximize={()=>toggleMaximize('win-blogs')}/>
              <div className="flex-1 text-center pr-8 font-mono text-[11px] text-[#9a8f7a]">dikshant-os: ~/repos — github.com/Dikshant-Neupane</div>
            </header>
            <div className="flex-1 p-4 bg-black/30 overflow-hidden flex flex-col min-h-0"><BlogsContent/></div>
          </div>

        </div>
      </main>

      {/* ── DOCK ── */}
      <footer className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[200]">
        <div className="bg-[rgba(18,18,16,0.65)] backdrop-blur-[40px] border border-white/[0.12] px-3 pt-2 pb-1 rounded-[20px] flex items-end gap-2.5 shadow-[0_20px_40px_rgba(0,0,0,0.5)]">
          <DockIcon onClick={()=>openWin('terminal')} title="Projects" bg="bg-blue-600/90 text-white shadow-lg"
            active={terminalState==='open'} badge={5}>
            {icons.folder}
          </DockIcon>
          <DockIcon onClick={()=>openWin('terminal')} title="Terminal (Ctrl+T)" bg="bg-zinc-900 border border-zinc-800 text-[#a3e635] hover:border-zinc-700"
            active={terminalState==='open'}>
            {icons.terminal}
          </DockIcon>
          <DockIcon onClick={()=>openWin('about')} title="About Me" bg="bg-violet-700/80 text-white hover:bg-violet-700"
            active={aboutState==='open'}>
            {icons.person}
          </DockIcon>
          <DockIcon onClick={()=>openWin('contact')} title="Contact" bg="bg-emerald-700/80 text-white hover:bg-emerald-700"
            active={contactState==='open'}>
            {icons.mail}
          </DockIcon>
          <DockIcon onClick={()=>openWin('blogs')} title="All Repos" bg="bg-zinc-800 border border-zinc-700 text-[#e8e0d0] hover:bg-zinc-700"
            active={blogsState==='open'} badge={repoGroups.reduce((a,g)=>a+g.repos.length,0)}>
            {icons.githubLg}
          </DockIcon>
          <DockIcon onClick={()=>setWallpaperIdx(i=>(i+1)%WALLPAPERS.length)} title="Switch Wallpaper" bg="bg-zinc-800 text-[#c4b99a] hover:bg-zinc-700">
            {icons.image}
          </DockIcon>
        </div>
      </footer>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 5px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,230,160,0.12); border-radius: 10px; }
        .no-scrollbar { scrollbar-width: none; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .win-maximized { top:12px !important; left:12px !important; width:calc(100vw - 24px) !important; height:calc(100vh - 110px) !important; transform:none !important; }
        .card-warm::before { content:''; position:absolute; inset:0; border-radius:inherit; pointer-events:none; background:linear-gradient(180deg,rgba(255,220,140,0.04) 0%,transparent 40%); }
        @keyframes blink { 50% { opacity:0; } }
        .pb-safe { padding-bottom: env(safe-area-inset-bottom, 16px); }
      `}</style>
    </>
  );
}
