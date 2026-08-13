import { useState, useEffect, useRef } from 'react';
import {
  Menu, X, ArrowRight, Sparkles, Check, Calendar, Users, ChevronLeft, ChevronRight,
  Plus, MessageCircle, Instagram, Facebook, Twitter, Youtube, Lock, ShieldCheck, Heart, Flag
} from 'lucide-react';

const COLORS = {
  navy: '#10143F',
  purple: '#7138E5',
  pink: '#F05B91',
  orange: '#FFAA32',
  green: '#70BE4C',
  blue: '#5D8FE8',
  cream: '#FFF9F1',
};

function hexToRgba(hex, alpha) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

const NAV_ITEMS = [
  { id: 'home', label: 'Home' },
  { id: 'circles', label: 'Circles' },
  { id: 'activities', label: 'Activities' },
  { id: 'about', label: 'About' },
  { id: 'safety', label: 'Safety' },
  { id: 'how-it-works', label: 'How It Works' },
  { id: 'faq', label: 'FAQ' },
];

const CIRCLES = [
  { id: 'creative', icon: '🎨', name: 'Creative Circle', desc: 'Photography · Art · Design · Writing', members: '1,284', color: 'purple', activities: ['Digital Art Jam', 'Sketch & Sip', 'Portrait Walk'], sample: ['Maya', 'Leo', 'Ines'] },
  { id: 'gaming', icon: '🎮', name: 'Gaming Circle', desc: 'Strategy · Co-op · Indie · Esports', members: '942', color: 'blue', activities: ['Game Night', 'Retro Arcade Hour', 'Speedrun Watch'], sample: ['Daniel', 'Zoe', 'Kabir'] },
  { id: 'fitness', icon: '🏃', name: 'Fitness Circle', desc: 'Running · Yoga · Strength · Hiking', members: '1,530', color: 'green', activities: ['Weekend Walk', 'Sunrise Yoga', '5K Fun Run'], sample: ['Sara', 'Tomas', 'Nina'] },
  { id: 'learning', icon: '📚', name: 'Learning Circle', desc: 'Languages · Coding · Ideas · Book Clubs', members: '876', color: 'orange', activities: ['Book Club', 'Language Exchange', 'Idea Lab'], sample: ['Priya', 'Owen', 'Fatima'] },
  { id: 'music', icon: '🎵', name: 'Music Circle', desc: 'Concerts · Jamming · Playlists · Vinyl', members: '1,102', color: 'pink', activities: ['Music & Chill', 'Vinyl Night', 'Open Mic Prep'], sample: ['Arjun', 'Lea', 'Sam'] },
  { id: 'travel', icon: '✈️', name: 'Travel Circle', desc: 'Backpacking · Road Trips · Culture · Food', members: '1,367', color: 'blue', activities: ['Trip Planning', 'Photo Swap', 'Visa Q&A'], sample: ['Arjun', 'Maya', 'Iris'] },
  { id: 'food', icon: '🍳', name: 'Food Circle', desc: 'Cooking · Baking · Tasting · Recipes', members: '998', color: 'orange', activities: ['Recipe Swap', 'Bake-Off', 'Taste Test Night'], sample: ['Riya', 'Marco', 'Aiko'] },
  { id: 'movies', icon: '🎬', name: 'Movies Circle', desc: 'Screenings · Reviews · Marathons · Trivia', members: '743', color: 'purple', activities: ['Creative Challenge', 'Trivia Night', 'Marathon Sunday'], sample: ['Daniel', 'Nora', 'Theo'] },
];

const ACTIVITIES = [
  { id: 1, name: 'Game Night', when: 'Tonight · 8:00 PM', count: 24, cta: 'Join Activity', color: 'blue' },
  { id: 2, name: 'Digital Art Jam', when: 'Tomorrow · 6:30 PM', count: 12, cta: 'Join Activity', color: 'pink' },
  { id: 3, name: 'Music & Chill', when: 'Saturday · 7:00 PM', count: 18, cta: 'View Event', color: 'purple' },
  { id: 4, name: 'Weekend Walk', when: 'Sunday · 7:30 AM', count: 31, cta: 'Join Activity', color: 'green' },
  { id: 5, name: 'Book Club', when: 'Sunday · 5:00 PM', count: 16, cta: 'View Event', color: 'orange' },
  { id: 6, name: 'Creative Challenge', when: 'Monday · 8:00 PM', count: 21, cta: 'Join Activity', color: 'pink' },
];

const HERO_PEOPLE = [
  { name: 'Maya', tag: 'Photography', top: '4%', left: '6%', color: 'pink' },
  { name: 'Arjun', tag: 'Travel', top: '14%', left: '64%', color: 'blue' },
  { name: 'Priya', tag: 'Books', top: '62%', left: '2%', color: 'orange' },
  { name: 'Daniel', tag: 'Gaming', top: '74%', left: '62%', color: 'purple' },
  { name: 'Sara', tag: 'Fitness', top: '38%', left: '78%', color: 'green' },
];

const HERO_BADGES = [
  { icon: '🎨', top: '0%', left: '36%' },
  { icon: '🎵', top: '28%', left: '0%' },
  { icon: '✈️', top: '86%', left: '32%' },
  { icon: '🎮', top: '48%', left: '0%' },
  { icon: '📚', top: '84%', left: '58%' },
  { icon: '☕', top: '8%', left: '84%' },
];

const PEOPLE_NETWORK = [
  { id: 1, name: 'Priya', age: 28, interests: ['Photography', 'Travel', 'Coffee'], distance: 'Near you', shared: 3, color: 'pink' },
  { id: 2, name: 'Arjun', age: 32, interests: ['Travel', 'Fitness', 'Movies'], distance: '2 km away', shared: 4, color: 'blue' },
  { id: 3, name: 'Daniel', age: 26, interests: ['Gaming', 'Music', 'Tech'], distance: 'Near you', shared: 2, color: 'purple' },
  { id: 4, name: 'Sara', age: 30, interests: ['Fitness', 'Yoga', 'Food'], distance: '5 km away', shared: 3, color: 'green' },
  { id: 5, name: 'Riya', age: 41, interests: ['Books', 'Art', 'Music'], distance: 'Near you', shared: 5, color: 'orange' },
  { id: 6, name: 'Leo', age: 27, interests: ['Design', 'Coffee', 'Movies'], distance: '3 km away', shared: 2, color: 'pink' },
];

const TESTIMONIALS = [
  { name: 'Maya', age: 29, interests: 'Photography · Travel · Coffee', quote: "I joined for the photography group. I stayed because I finally found people who get me.", color: 'pink' },
  { name: 'Arjun', age: 32, interests: 'Travel · Fitness · Movies', quote: 'The activities made meeting new people feel completely natural.', color: 'blue' },
  { name: 'Riya', age: 41, interests: 'Books · Art · Music', quote: 'It feels less like social media and more like a place where people actually talk.', color: 'orange' },
];

const SAFETY_CARDS = [
  { icon: 'Lock', title: 'Privacy First', desc: 'Your personal information stays protected.', color: 'purple' },
  { icon: 'ShieldCheck', title: 'Community Moderation', desc: 'Uncomfortable behavior can be reported and addressed.', color: 'blue' },
  { icon: 'Heart', title: 'No Dating Pressure', desc: 'Circlely is about shared interests and community.', color: 'pink' },
  { icon: 'Flag', title: 'Report & Block', desc: 'You stay in control of your experience.', color: 'orange' },
  { icon: 'Users', title: 'Respect Matters', desc: 'Everyone deserves a welcoming space.', color: 'green' },
  { icon: 'Sparkles', title: 'Positive Communities', desc: 'Healthy participation and respectful conversations come first.', color: 'purple' },
];

const STEPS = [
  { n: '01', title: 'Create Your Profile', desc: 'Set up your account in a few simple steps.', color: 'purple' },
  { n: '02', title: 'Choose Your Interests', desc: 'Tell us what you enjoy doing.', color: 'pink' },
  { n: '03', title: 'Discover Your Circles', desc: 'Find communities that match your interests.', color: 'blue' },
  { n: '04', title: 'Join Activities', desc: 'Participate in events, discussions and group activities.', color: 'orange' },
  { n: '05', title: 'Build Real Connections', desc: 'Meet people and build meaningful friendships.', color: 'green' },
];

const FAQS = [
  { q: 'What is Circlely?', a: 'Circlely is a community platform that helps you find people and groups built around shared interests — from photography to hiking to book clubs.' },
  { q: 'Is Circlely a dating platform?', a: 'No. Circlely is built for friendship, community and shared interests, not romantic matchmaking. There is no dating pressure here.' },
  { q: 'How do I find a community?', a: 'Browse the Circle Explorer, pick a few interests you enjoy, and we will surface circles and activities that match.' },
  { q: 'Is my information private?', a: 'Yes. Your profile details stay private by default, and you control what you share and with whom.' },
  { q: 'Can I create my own circle?', a: 'Absolutely. Once you join, you can start your own circle around any interest that is missing.' },
  { q: 'Are activities free?', a: 'Most community activities are free to join. A few special events may have a small optional cost, always shown upfront.' },
  { q: 'How does moderation work?', a: 'Every circle has community guidelines, and reports are reviewed by our moderation team to keep spaces respectful.' },
];

const STATS = [
  { value: '24K+', label: 'Community Members' },
  { value: '180+', label: 'Active Circles' },
  { value: '1,200+', label: 'Monthly Activities' },
  { value: '98%', label: 'Positive Interactions' },
];

const TICKER = [
  '12 people are joining Game Night',
  'New circle discovered: Urban Sketching',
  'Maya joined the Photography Circle',
  '18 people are talking about travel',
  'Weekend Walk is almost full',
  'Priya started a conversation in Book Club',
];

const INTERESTS = [
  { icon: '🎨', label: 'Art' }, { icon: '🎵', label: 'Music' }, { icon: '✈️', label: 'Travel' },
  { icon: '🎮', label: 'Gaming' }, { icon: '📚', label: 'Books' }, { icon: '🏃', label: 'Fitness' },
  { icon: '🎬', label: 'Movies' }, { icon: '🍳', label: 'Food' },
];

const ICONS = { Lock, ShieldCheck, Heart, Flag, Users, Sparkles };

function useInView(threshold = 0.2) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setInView(true); obs.unobserve(el); }
    }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
}

function Reveal({ children, delay = 0, className = '' }) {
  const [ref, inView] = useInView(0.15);
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(22px)',
        transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

function Avatar({ name, color, size = 44 }) {
  const hex = COLORS[color] || COLORS.purple;
  return (
    <div
      style={{
        width: size, height: size, borderRadius: '50%',
        background: `linear-gradient(135deg, ${hex}, ${hexToRgba(hex, 0.65)})`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: '#fff', fontWeight: 700, fontSize: size * 0.4, flexShrink: 0,
        boxShadow: `0 4px 14px ${hexToRgba(hex, 0.35)}`, border: '2px solid #fff',
      }}
    >
      {name.charAt(0)}
    </div>
  );
}

function SectionHeading({ eyebrow, title, subtitle }) {
  return (
    <Reveal className="max-w-2xl mx-auto text-center mb-12">
      {eyebrow && (
        <span className="inline-block text-xs font-bold tracking-widest uppercase mb-3" style={{ color: COLORS.purple }}>
          {eyebrow}
        </span>
      )}
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4 leading-tight" style={{ color: COLORS.navy, letterSpacing: '-0.02em' }}>
        {title}
      </h2>
      {subtitle && <p className="text-base sm:text-lg" style={{ color: '#5b5f7a' }}>{subtitle}</p>}
    </Reveal>
  );
}

function ModalShell({ children, onClose, maxWidth = 480 }) {
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = prevOverflow; };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 flex items-end sm:items-center justify-center p-0 sm:p-5 modal-backdrop"
      style={{ zIndex: 100, backgroundColor: 'rgba(16,20,63,0.55)', backdropFilter: 'blur(4px)' }}
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <div
        className="modal-panel bg-white w-full overflow-y-auto relative"
        style={{ maxWidth, maxHeight: '90vh', borderRadius: 28 }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="Close dialog"
          className="absolute top-5 right-5 w-9 h-9 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors"
          style={{ zIndex: 10 }}
        >
          <X size={18} color={COLORS.navy} />
        </button>
        {children}
      </div>
    </div>
  );
}

function GlobalStyles() {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Caveat:wght@600;700&display=swap');
      .circlely-root { font-family: 'Plus Jakarta Sans', system-ui, sans-serif; }
      .circlely-root button { cursor: pointer; font-family: inherit; }
      .circlely-root button:focus-visible, .circlely-root a:focus-visible {
        outline: 2.5px solid ${COLORS.purple}; outline-offset: 2px; border-radius: 8px;
      }
      @keyframes floatY { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-10px); } }
      @keyframes floatYSlow { 0%, 100% { transform: translateY(0px) rotate(0deg); } 50% { transform: translateY(-14px) rotate(4deg); } }
      .hero-float { animation: floatY 4.5s ease-in-out infinite; }
      .hero-float-slow { animation: floatYSlow 6s ease-in-out infinite; }
      .fade-swap { display: inline-block; animation: fadeSlide 0.5s ease; }
      @keyframes fadeSlide { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }
      @keyframes modalIn { from { opacity: 0; transform: translateY(30px) scale(0.98); } to { opacity: 1; transform: translateY(0) scale(1); } }
      .modal-panel { animation: modalIn 0.35s cubic-bezier(0.16,1,0.3,1); }
      @keyframes backdropIn { from { opacity: 0; } to { opacity: 1; } }
      .modal-backdrop { animation: backdropIn 0.25s ease; }
      .no-scrollbar::-webkit-scrollbar { display: none; }
      .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }

      /* Responsive visual compositions. These rules intentionally control only the two radial visuals. */
      .hero-visual { overflow: visible; }
      .hero-orbit { position:absolute; left:50%; top:50%; transform:translate(-50%,-50%); border:1px dashed rgba(113,56,229,.18); border-radius:50%; pointer-events:none; }
      .hero-orbit-outer { width:92%; height:92%; }
      .hero-orbit-inner { width:68%; height:68%; border-color:rgba(240,91,145,.18); }
      .hero-visual svg line { stroke:rgba(113,56,229,.25); stroke-width:1.5; stroke-dasharray:6 7; }
      .hero-center { left:50%; top:50%; transform:translate(-50%,-50%); z-index:4; }
      .hero-person { z-index:6; }
      .hero-person-maya { left:16%; top:13%; }
      .hero-person-arjun { left:79%; top:17%; }
      .hero-person-priya { left:18%; top:77%; }
      .hero-person-daniel { left:77%; top:78%; }
      .hero-person-sara { left:91%; top:49%; }
      .hero-badge { width:44px; height:44px; z-index:3; }
      .hero-badge-0 { left:36%; top:3%; }
      .hero-badge-1 { left:2%; top:46%; }
      .hero-badge-2 { left:31%; top:89%; }
      .hero-badge-3 { left:4%; top:61%; }
      .hero-badge-4 { left:60%; top:88%; }
      .hero-badge-5 { left:86%; top:7%; }

      .people-network { overflow:visible; }
      .people-orbit { position:absolute; left:50%; top:50%; transform:translate(-50%,-50%); border:1px dashed rgba(113,56,229,.16); border-radius:50%; pointer-events:none; }
      .people-orbit-1 { width:96%; height:96%; }
      .people-orbit-2 { width:76%; height:76%; border-color:rgba(240,91,145,.16); }
      .people-orbit-3 { width:54%; height:54%; border-color:rgba(255,170,50,.15); }
      .people-network svg line { stroke:rgba(113,56,229,.24); stroke-width:1.5; stroke-dasharray:6 7; }
      .people-network-center { left:50%; top:50%; transform:translate(-50%,-50%); width:128px; height:128px; background:linear-gradient(135deg, ${COLORS.navy}, ${COLORS.purple}); box-shadow:0 20px 40px ${hexToRgba(COLORS.purple,0.32)}; z-index:5; }
      .people-card { width:210px; }
      .people-card-0 { left:17%; top:15%; }
      .people-card-1 { left:83%; top:15%; }
      .people-card-2 { left:15%; top:51%; }
      .people-card-3 { left:85%; top:51%; }
      .people-card-4 { left:20%; top:87%; }
      .people-card-5 { left:80%; top:87%; }

      @media (max-width: 1023px) {
        .hero-visual { height:500px !important; max-width:650px !important; }
        .people-network { height:660px !important; max-width:700px !important; }
      }

      @media (max-width: 767px) {
        .hero-visual { height:470px !important; max-width:420px !important; margin-top:18px; }
        .hero-orbit-outer { width:98%; height:86%; }
        .hero-orbit-inner { width:72%; height:62%; }
        .hero-person > div { padding:7px 10px 7px 7px !important; border-radius:16px !important; }
        .hero-person .text-xs { font-size:10px; }
        .hero-person-maya { left:7%; top:10%; }
        .hero-person-arjun { left:68%; top:12%; }
        .hero-person-priya { left:7%; top:72%; }
        .hero-person-daniel { left:67%; top:73%; }
        .hero-person-sara { left:76%; top:43%; }
        .hero-center { transform:translate(-50%,-50%) scale(.88); }
        .hero-badge { transform:scale(.82); }
        .hero-badge-0 { left:40%; top:4%; }
        .hero-badge-1 { left:1%; top:45%; }
        .hero-badge-2 { left:30%; top:91%; }
        .hero-badge-3 { left:3%; top:57%; }
        .hero-badge-4 { left:58%; top:90%; }
        .hero-badge-5 { left:88%; top:6%; }

        .people-network { height:700px !important; max-width:430px !important; }
        .people-orbit-1 { width:100%; height:74%; }
        .people-orbit-2 { width:82%; height:58%; }
        .people-orbit-3 { width:60%; height:42%; }
        .people-network-center { width:108px; height:108px; font-size:14px; }
        .people-card { width:145px; }
        .people-card > div { padding:11px !important; border-radius:18px !important; }
        .people-card .flex.items-center.gap-3 { gap:8px; }
        .people-card .text-sm { font-size:11px; }
        .people-card .text-xs { font-size:9px; }
        .people-card-0 { left:20%; top:16%; }
        .people-card-1 { left:80%; top:16%; }
        .people-card-2 { left:18%; top:47%; }
        .people-card-3 { left:82%; top:47%; }
        .people-card-4 { left:20%; top:79%; }
        .people-card-5 { left:80%; top:79%; }
      }

      @media (max-width: 390px) {
        .hero-visual { height:440px !important; }
        .hero-person > div { transform:scale(.9); transform-origin:center; }
        .hero-person-maya { left:4%; top:10%; }
        .hero-person-arjun { left:66%; top:12%; }
        .hero-person-priya { left:4%; top:73%; }
        .hero-person-daniel { left:65%; top:74%; }
        .hero-person-sara { left:73%; top:43%; }
        .hero-center { transform:translate(-50%,-50%) scale(.78); }
        .people-network { height:720px !important; }
        .people-card { width:132px; }
        .people-card > div { padding:9px !important; }
        .people-card-0 { left:19%; top:15%; }
        .people-card-1 { left:81%; top:15%; }
        .people-card-2 { left:18%; top:47%; }
        .people-card-3 { left:82%; top:47%; }
        .people-card-4 { left:19%; top:80%; }
        .people-card-5 { left:81%; top:80%; }
      }

      @media (prefers-reduced-motion: reduce) {
        .circlely-root *, .circlely-root *::before, .circlely-root *::after {
          animation-duration: 0.01ms !important;
          animation-iteration-count: 1 !important;
          transition-duration: 0.01ms !important;
        }
      }
    `}</style>
  );
}

function Navbar({ activeSection, onNavClick, onJoinClick }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className="fixed top-0 left-0 right-0 transition-all duration-300"
      style={{
        zIndex: 50,
        backgroundColor: scrolled ? 'rgba(255,249,241,0.88)' : 'transparent',
        backdropFilter: scrolled ? 'blur(14px)' : 'none',
        boxShadow: scrolled ? '0 4px 24px rgba(16,20,63,0.08)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(16,20,63,0.06)' : '1px solid transparent',
      }}
    >
      <nav className="max-w-7xl mx-auto px-5 sm:px-8 flex items-center justify-between h-16 md:h-20">
        <button onClick={() => onNavClick('home')} className="flex items-center gap-2 font-extrabold text-xl" style={{ color: COLORS.navy }}>
          <span
            className="flex items-center justify-center text-white"
            style={{ width: 32, height: 32, borderRadius: 11, background: `linear-gradient(135deg, ${COLORS.purple}, ${COLORS.pink})` }}
          >
            ◎
          </span>
          Circlely
        </button>

        <div className="hidden lg:flex items-center gap-1">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavClick(item.id)}
              className="px-4 py-2 rounded-full text-sm font-semibold transition-colors"
              style={{
                color: activeSection === item.id ? COLORS.purple : COLORS.navy,
                backgroundColor: activeSection === item.id ? hexToRgba(COLORS.purple, 0.08) : 'transparent',
              }}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className="hidden lg:block">
          <button
            onClick={onJoinClick}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-bold text-sm text-white transition-transform hover:-translate-y-0.5"
            style={{ background: `linear-gradient(135deg, ${COLORS.purple}, #8f5cf0)`, boxShadow: `0 8px 20px ${hexToRgba(COLORS.purple, 0.35)}` }}
          >
            Join Now
          </button>
        </div>

        <button
          className="lg:hidden p-2"
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((o) => !o)}
        >
          {mobileOpen ? <X size={24} color={COLORS.navy} /> : <Menu size={24} color={COLORS.navy} />}
        </button>
      </nav>

      <div className="lg:hidden overflow-hidden transition-all duration-300" style={{ maxHeight: mobileOpen ? 440 : 0, backgroundColor: '#FFF9F1' }}>
        <div className="px-5 pb-5 flex flex-col gap-1">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => { onNavClick(item.id); setMobileOpen(false); }}
              className="text-left px-4 py-3 rounded-xl font-semibold"
              style={{
                color: activeSection === item.id ? COLORS.purple : COLORS.navy,
                backgroundColor: activeSection === item.id ? hexToRgba(COLORS.purple, 0.08) : 'transparent',
              }}
            >
              {item.label}
            </button>
          ))}
          <button
            onClick={() => { onJoinClick(); setMobileOpen(false); }}
            className="mt-2 px-4 py-3 rounded-full font-bold text-white text-center"
            style={{ background: `linear-gradient(135deg, ${COLORS.purple}, #8f5cf0)` }}
          >
            Join Now
          </button>
        </div>
      </div>
    </header>
  );
}

function Hero({ onJoin, onExplore }) {
  return (
    <section id="home" className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden" style={{ backgroundColor: COLORS.cream }}>
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div style={{ position: 'absolute', top: '-10%', left: '-8%', width: 420, height: 420, borderRadius: '50%', background: COLORS.purple, opacity: 0.08, filter: 'blur(60px)' }} />
        <div style={{ position: 'absolute', bottom: '-15%', right: '-10%', width: 480, height: 480, borderRadius: '50%', background: COLORS.pink, opacity: 0.1, filter: 'blur(70px)' }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-5 sm:px-8 grid lg:grid-cols-2 gap-14 items-center">
        <div className="hero-copy">
          <Reveal>
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold mb-6" style={{ backgroundColor: '#fff', color: COLORS.purple, border: `1px solid ${hexToRgba(COLORS.purple, 0.2)}` }}>
              <Sparkles size={14} /> A community that feels like home
            </span>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight mb-6" style={{ color: COLORS.navy, letterSpacing: '-0.02em' }}>
              Find Your People.<br />
              Build Your Circle.<br />
              <span style={{ fontFamily: "'Caveat', cursive", color: COLORS.purple, fontWeight: 700, fontSize: '1.2em' }}>Feel at Home.</span>
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-lg mb-8 max-w-lg" style={{ color: '#4b4f6b' }}>
              Discover people who share your interests, curiosity and energy — and find communities where you can simply be yourself.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="flex flex-wrap gap-2.5 mb-8">
              {['No dating pressure', 'Privacy first', 'Friendly communities', 'Built for adults'].map((t) => (
                <span key={t} className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full" style={{ backgroundColor: '#fff', color: COLORS.navy, border: '1px solid rgba(16,20,63,0.08)' }}>
                  <Check size={13} color={COLORS.green} /> {t}
                </span>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="flex flex-wrap gap-4">
              <button onClick={onJoin} className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-bold text-white transition-transform hover:-translate-y-1" style={{ background: `linear-gradient(135deg, ${COLORS.purple}, #8f5cf0)`, boxShadow: `0 14px 30px ${hexToRgba(COLORS.purple, 0.4)}` }}>
                Join the Circle <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
              </button>
              <button onClick={onExplore} className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-bold transition-colors hover:bg-white" style={{ border: `2px solid ${COLORS.navy}`, color: COLORS.navy }}>
                Explore Communities
              </button>
            </div>
          </Reveal>
        </div>

        <div className="hero-visual relative mx-auto w-full" style={{ height: 'clamp(390px, 42vw, 540px)', maxWidth: 620 }}>
          <div className="hero-orbit hero-orbit-outer" />
          <div className="hero-orbit hero-orbit-inner" />
          <svg className="absolute inset-0 w-full h-full pointer-events-none" aria-hidden="true">
            <line x1="50%" y1="50%" x2="16%" y2="13%" />
            <line x1="50%" y1="50%" x2="79%" y2="17%" />
            <line x1="50%" y1="50%" x2="18%" y2="77%" />
            <line x1="50%" y1="50%" x2="77%" y2="78%" />
            <line x1="50%" y1="50%" x2="91%" y2="48%" />
          </svg>
          <div className="hero-center absolute">
            <div className="flex flex-col items-center justify-center text-center rounded-full text-white font-extrabold" style={{ width: 128, height: 128, background: `linear-gradient(135deg, ${COLORS.navy}, ${COLORS.purple})`, boxShadow: `0 20px 45px ${hexToRgba(COLORS.purple, 0.45)}` }}>
              <span className="text-xs tracking-widest opacity-80">YOUR</span>
              <span className="text-base leading-tight">CIRCLE</span>
            </div>
          </div>
          {HERO_PEOPLE.map((p, i) => (
            <div key={p.name} className={`hero-person hero-person-${p.name.toLowerCase()} absolute hero-float`} style={{ animationDelay: `${i * 0.6}s` }}>
              <div className="flex items-center gap-2 bg-white rounded-2xl pl-2 pr-3.5 py-2" style={{ boxShadow: '0 10px 25px rgba(16,20,63,0.12)' }}>
                <Avatar name={p.name} color={p.color} size={34} />
                <div className="text-left">
                  <div className="text-xs font-bold" style={{ color: COLORS.navy }}>{p.name}</div>
                  <div className="text-xs" style={{ color: '#8b8ea8' }}>{p.tag}</div>
                </div>
              </div>
            </div>
          ))}
          {HERO_BADGES.map((b, i) => (
            <div key={i} className={`hero-badge hero-badge-${i} absolute hero-float-slow flex items-center justify-center rounded-full bg-white text-lg`} style={{ animationDelay: `${i * 0.4}s`, boxShadow: '0 6px 16px rgba(16,20,63,0.1)' }}>
              {b.icon}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function LiveTicker() {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % TICKER.length), 3200);
    return () => clearInterval(id);
  }, []);
  return (
    <div className="relative" style={{ zIndex: 10, marginTop: -28, marginBottom: 16 }}>
      <div className="max-w-xl mx-auto px-5">
        <div className="flex items-center gap-3 bg-white rounded-full px-5 py-3" style={{ boxShadow: '0 10px 30px rgba(16,20,63,0.1)' }}>
          <span className="relative flex h-2.5 w-2.5 shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-60" style={{ backgroundColor: COLORS.green }} />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5" style={{ backgroundColor: COLORS.green }} />
          </span>
          <span key={index} className="text-sm font-medium fade-swap truncate" style={{ color: COLORS.navy }}>{TICKER[index]}</span>
        </div>
      </div>
    </div>
  );
}

function CircleExplorer({ onOpenCircle }) {
  return (
    <section id="circles" className="relative py-24" style={{ backgroundColor: '#fff' }}>
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <SectionHeading eyebrow="Circle Explorer" title="Find Your Circle" subtitle="Start with what you love. The right people usually follow." />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {CIRCLES.map((c, i) => (
            <Reveal key={c.id} delay={i * 0.05}>
              <button
                onClick={() => onOpenCircle(c)}
                className="group w-full text-left h-full flex flex-col p-6 rounded-3xl transition-all hover:-translate-y-1.5"
                style={{ backgroundColor: hexToRgba(COLORS[c.color], 0.06), border: `1.5px solid ${hexToRgba(COLORS[c.color], 0.18)}` }}
              >
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl mb-4 transition-transform group-hover:scale-110"
                  style={{ backgroundColor: hexToRgba(COLORS[c.color], 0.15) }}
                >
                  {c.icon}
                </div>
                <h3 className="font-extrabold text-lg mb-1" style={{ color: COLORS.navy }}>{c.name}</h3>
                <p className="text-sm mb-4 flex-1" style={{ color: '#6b6f8c' }}>{c.desc}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold" style={{ color: COLORS[c.color] }}>{c.members} members</span>
                  <span className="inline-flex items-center gap-1 text-xs font-bold" style={{ color: COLORS.navy }}>
                    Explore <ArrowRight size={13} className="transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </button>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function CircleModal({ circle, onClose, onJoin }) {
  const hex = COLORS[circle.color];
  return (
    <ModalShell onClose={onClose}>
      <div className="p-7 sm:p-9">
        <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl mb-5" style={{ backgroundColor: hexToRgba(hex, 0.15) }}>
          {circle.icon}
        </div>
        <h3 className="text-2xl font-extrabold mb-1" style={{ color: COLORS.navy }}>{circle.name}</h3>
        <p className="text-sm mb-5" style={{ color: '#6b6f8c' }}>{circle.desc}</p>
        <div className="flex items-center gap-2 mb-6">
          <Users size={16} color={hex} />
          <span className="text-sm font-bold" style={{ color: hex }}>{circle.members} members</span>
        </div>
        <div className="mb-6">
          <h4 className="text-xs font-bold uppercase tracking-wide mb-3" style={{ color: '#9497ad' }}>Sample members</h4>
          <div className="flex -space-x-3">
            {circle.sample.map((n) => <Avatar key={n} name={n} color={circle.color} size={42} />)}
          </div>
        </div>
        <div className="mb-8">
          <h4 className="text-xs font-bold uppercase tracking-wide mb-3" style={{ color: '#9497ad' }}>Active activities</h4>
          <div className="flex flex-wrap gap-2">
            {circle.activities.map((a) => (
              <span key={a} className="text-xs font-semibold px-3 py-1.5 rounded-full" style={{ backgroundColor: hexToRgba(hex, 0.08), color: hex }}>
                {a}
              </span>
            ))}
          </div>
        </div>
        <button
          onClick={onJoin}
          className="w-full py-3.5 rounded-full font-bold text-white transition-transform hover:-translate-y-0.5"
          style={{ background: `linear-gradient(135deg, ${hex}, ${COLORS.purple})` }}
        >
          Join Circle
        </button>
      </div>
    </ModalShell>
  );
}

function PeopleNetwork() {
  const [hovered, setHovered] = useState(null);
  return (
    <section className="relative py-24 overflow-hidden" style={{ backgroundColor: COLORS.cream }}>
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <SectionHeading eyebrow="Discovery" title="People Like You Are Already Here." subtitle="Shared interests are often the beginning of great friendships." />
        <div className="people-network relative mx-auto" style={{ maxWidth: 760, height: 620 }}>
          <div className="people-orbit people-orbit-1" />
          <div className="people-orbit people-orbit-2" />
          <div className="people-orbit people-orbit-3" />
          <svg className="absolute inset-0 w-full h-full pointer-events-none" aria-hidden="true">
            <line x1="50%" y1="50%" x2="17%" y2="15%" />
            <line x1="50%" y1="50%" x2="83%" y2="15%" />
            <line x1="50%" y1="50%" x2="15%" y2="51%" />
            <line x1="50%" y1="50%" x2="85%" y2="51%" />
            <line x1="50%" y1="50%" x2="20%" y2="87%" />
            <line x1="50%" y1="50%" x2="80%" y2="87%" />
          </svg>
          <div className="people-network-center absolute rounded-full flex items-center justify-center text-white font-extrabold text-center px-2">
            Circlely
          </div>
          {PEOPLE_NETWORK.map((p, i) => {
            const dim = hovered && hovered !== p.id;
            return (
              <div
                key={p.id}
                className={`people-card people-card-${i} absolute transition-all duration-300`}
                style={{ transform: `translate(-50%, -50%) scale(${hovered === p.id ? 1.04 : 1})`, opacity: dim ? 0.45 : 1, zIndex: hovered === p.id ? 20 : 2 }}
                onMouseEnter={() => setHovered(p.id)}
                onMouseLeave={() => setHovered(null)}
              >
                <div className="bg-white rounded-2xl p-4" style={{ boxShadow: '0 12px 30px rgba(16,20,63,0.12)' }}>
                  <div className="flex items-center gap-3 mb-2">
                    <Avatar name={p.name} color={p.color} size={40} />
                    <div>
                      <div className="font-bold text-sm" style={{ color: COLORS.navy }}>{p.name}, {p.age}</div>
                      <div className="text-xs" style={{ color: '#8b8ea8' }}>{p.distance}</div>
                    </div>
                  </div>
                  <div className="text-xs mb-2" style={{ color: '#6b6f8c' }}>{p.interests.join(' · ')}</div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-bold px-2 py-1 rounded-full" style={{ backgroundColor: hexToRgba(COLORS[p.color], 0.12), color: COLORS[p.color] }}>{p.shared} shared</span>
                    <button className="text-xs font-bold px-3 py-1.5 rounded-full text-white" style={{ backgroundColor: COLORS.navy }}>Connect</button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Activities({ onJoinActivity }) {
  return (
    <section id="activities" className="relative py-24" style={{ backgroundColor: '#fff' }}>
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <SectionHeading eyebrow="Happening Now" title="There's Always Something Happening." subtitle="Join conversations, challenges and activities that make your circle feel alive." />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {ACTIVITIES.map((a, i) => {
            const hex = COLORS[a.color];
            return (
              <Reveal key={a.id} delay={i * 0.05}>
                <div
                  className="h-full rounded-3xl p-6 bg-white transition-all hover:-translate-y-1.5"
                  style={{ border: '1px solid rgba(16,20,63,0.06)', boxShadow: '0 6px 20px rgba(16,20,63,0.05)', borderTop: `4px solid ${hex}` }}
                >
                  <div className="flex items-center gap-2 text-xs font-bold mb-3" style={{ color: hex }}>
                    <Calendar size={14} /> {a.when}
                  </div>
                  <h3 className="text-xl font-extrabold mb-4" style={{ color: COLORS.navy }}>{a.name}</h3>
                  <div className="flex items-center gap-2 mb-5">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-60" style={{ backgroundColor: hex }} />
                      <span className="relative inline-flex rounded-full h-2 w-2" style={{ backgroundColor: hex }} />
                    </span>
                    <span className="text-xs font-semibold" style={{ color: '#6b6f8c' }}>{a.count} people joining</span>
                  </div>
                  <button
                    onClick={onJoinActivity}
                    className="w-full py-2.5 rounded-full font-bold text-sm transition-transform hover:-translate-y-0.5"
                    style={a.cta === 'Join Activity' ? { backgroundColor: hex, color: '#fff' } : { border: `2px solid ${hex}`, color: hex, backgroundColor: 'transparent' }}
                  >
                    {a.cta}
                  </button>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function DarkCTA({ onJoin }) {
  const bubbles = [
    { name: 'Maya', color: 'pink' }, { name: 'Arjun', color: 'blue' },
    { name: 'Sara', color: 'green' }, { name: 'Leo', color: 'orange' },
  ];
  return (
    <section className="relative py-24 overflow-hidden" style={{ backgroundColor: COLORS.navy }}>
      <div className="pointer-events-none absolute inset-0">
        <div style={{ position: 'absolute', top: '-10%', left: '10%', width: 380, height: 380, borderRadius: '50%', background: COLORS.purple, opacity: 0.25, filter: 'blur(90px)' }} />
        <div style={{ position: 'absolute', bottom: '-15%', right: '5%', width: 420, height: 420, borderRadius: '50%', background: COLORS.pink, opacity: 0.2, filter: 'blur(90px)' }} />
        {bubbles.map((b, i) => (
          <div key={b.name} className="absolute hero-float" style={{ top: `${14 + i * 20}%`, left: i % 2 ? '86%' : '4%', animationDelay: `${i * 0.5}s`, opacity: 0.55 }}>
            <Avatar name={b.name} color={b.color} size={40} />
          </div>
        ))}
      </div>
      <div className="relative max-w-4xl mx-auto px-5 sm:px-8 text-center">
        <Reveal>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-5 leading-tight">
            The internet is huge.<br />Your circle doesn't have to be.
          </h2>
        </Reveal>
        <Reveal delay={0.05}>
          <p className="text-lg mb-12" style={{ color: 'rgba(255,255,255,0.7)' }}>A smaller space can make room for bigger conversations.</p>
        </Reveal>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {STATS.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.07}>
              <div className="text-3xl sm:text-4xl font-extrabold mb-1" style={{ color: COLORS.pink }}>{s.value}</div>
              <div className="text-xs sm:text-sm" style={{ color: 'rgba(255,255,255,0.6)' }}>{s.label}</div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.1}>
          <button
            onClick={onJoin}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold text-white transition-transform hover:-translate-y-1"
            style={{ background: `linear-gradient(135deg, ${COLORS.purple}, ${COLORS.pink})`, boxShadow: `0 15px 35px ${hexToRgba(COLORS.purple, 0.4)}` }}
          >
            Find My Circle <ArrowRight size={18} />
          </button>
        </Reveal>
      </div>
    </section>
  );
}

function Safety() {
  return (
    <section id="safety" className="relative py-24" style={{ backgroundColor: COLORS.cream }}>
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <SectionHeading eyebrow="Trust & Safety" title="A Social Space Built Around Trust." subtitle="Connection feels better when people feel safe." />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {SAFETY_CARDS.map((c, i) => {
            const Icon = ICONS[c.icon];
            const hex = COLORS[c.color];
            return (
              <Reveal key={c.title} delay={i * 0.05}>
                <div
                  className="h-full bg-white rounded-3xl p-6 transition-all hover:-translate-y-1.5"
                  style={{ border: '1px solid rgba(16,20,63,0.06)', boxShadow: '0 6px 20px rgba(16,20,63,0.05)' }}
                >
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4" style={{ backgroundColor: hexToRgba(hex, 0.12) }}>
                    <Icon size={22} color={hex} />
                  </div>
                  <h3 className="font-extrabold text-lg mb-2" style={{ color: COLORS.navy }}>{c.title}</h3>
                  <p className="text-sm" style={{ color: '#6b6f8c' }}>{c.desc}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  const [ref, inView] = useInView(0.25);
  return (
    <section id="how-it-works" className="relative py-24" style={{ backgroundColor: '#fff' }}>
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <SectionHeading eyebrow="The Journey" title="From Stranger to Circle in 5 Steps." />
        <div ref={ref} className="relative">
          <div className="hidden md:block absolute top-8 left-0 right-0 h-0.5" style={{ backgroundColor: 'rgba(16,20,63,0.08)' }}>
            <div
              className="h-full"
              style={{
                width: inView ? '100%' : '0%',
                transition: 'width 1.4s ease-out',
                background: `linear-gradient(90deg, ${COLORS.purple}, ${COLORS.pink}, ${COLORS.orange}, ${COLORS.blue}, ${COLORS.green})`,
              }}
            />
          </div>
          <div className="grid md:grid-cols-5 gap-8 md:gap-4">
            {STEPS.map((s, i) => (
              <div
                key={s.n}
                className="relative flex md:flex-col items-start md:items-center gap-4 md:gap-0 md:text-center"
                style={{
                  opacity: inView ? 1 : 0,
                  transform: inView ? 'translateY(0)' : 'translateY(20px)',
                  transition: `opacity 0.6s ease ${i * 0.15}s, transform 0.6s ease ${i * 0.15}s`,
                }}
              >
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center font-extrabold text-white shrink-0 md:mb-5 relative"
                  style={{ backgroundColor: COLORS[s.color], boxShadow: `0 10px 25px ${hexToRgba(COLORS[s.color], 0.4)}`, zIndex: 1 }}
                >
                  {s.n}
                </div>
                <div>
                  <h3 className="font-extrabold mb-1.5" style={{ color: COLORS.navy }}>{s.title}</h3>
                  <p className="text-sm" style={{ color: '#6b6f8c' }}>{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setIdx((i) => (i + 1) % TESTIMONIALS.length), 5000);
    return () => clearInterval(id);
  }, [paused]);
  const t = TESTIMONIALS[idx];
  return (
    <section className="relative py-24" style={{ backgroundColor: COLORS.cream }}>
      <div className="max-w-3xl mx-auto px-5 sm:px-8">
        <SectionHeading eyebrow="Community Voices" title="Loved by the Community." />
        <div
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          className="relative bg-white rounded-3xl p-8 sm:p-12 text-center"
          style={{ boxShadow: '0 20px 50px rgba(16,20,63,0.08)' }}
        >
          <div className="text-5xl mb-2" style={{ color: hexToRgba(COLORS[t.color], 0.4), fontFamily: 'Georgia, serif' }}>"</div>
          <p key={idx} className="text-xl sm:text-2xl font-medium mb-8 fade-swap" style={{ color: COLORS.navy }}>{t.quote}</p>
          <div className="flex items-center justify-center gap-3">
            <Avatar name={t.name} color={t.color} size={48} />
            <div className="text-left">
              <div className="font-extrabold" style={{ color: COLORS.navy }}>{t.name}, {t.age}</div>
              <div className="text-xs" style={{ color: '#8b8ea8' }}>{t.interests}</div>
            </div>
          </div>
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              aria-label="Previous testimonial"
              onClick={() => setIdx((i) => (i - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)}
              className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-gray-100"
              style={{ border: '1px solid rgba(16,20,63,0.1)' }}
            >
              <ChevronLeft size={16} color={COLORS.navy} />
            </button>
            <div className="flex gap-2">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  aria-label={`Go to testimonial ${i + 1}`}
                  onClick={() => setIdx(i)}
                  className="rounded-full transition-all"
                  style={{ width: idx === i ? 20 : 8, height: 8, backgroundColor: idx === i ? COLORS.purple : 'rgba(16,20,63,0.15)' }}
                />
              ))}
            </div>
            <button
              aria-label="Next testimonial"
              onClick={() => setIdx((i) => (i + 1) % TESTIMONIALS.length)}
              className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-gray-100"
              style={{ border: '1px solid rgba(16,20,63,0.1)' }}
            >
              <ChevronRight size={16} color={COLORS.navy} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function About({ onLearnMore }) {
  const nodes = [
    { x: 150, y: 150, r: 34, color: COLORS.navy },
    { x: 60, y: 90, r: 20, color: COLORS.pink },
    { x: 235, y: 70, r: 16, color: COLORS.orange },
    { x: 250, y: 190, r: 22, color: COLORS.blue },
    { x: 80, y: 230, r: 18, color: COLORS.green },
    { x: 150, y: 38, r: 14, color: COLORS.purple },
    { x: 38, y: 168, r: 13, color: COLORS.purple },
  ];
  return (
    <section id="about" className="relative py-24" style={{ backgroundColor: '#fff' }}>
      <div className="max-w-7xl mx-auto px-5 sm:px-8 grid lg:grid-cols-2 gap-16 items-center">
        <Reveal>
          <div className="relative" style={{ maxWidth: 460, margin: '0 auto' }}>
            <div
              style={{ position: 'absolute', top: 20, left: -20, right: -20, bottom: -20, borderRadius: 40, background: `linear-gradient(135deg, ${COLORS.purple}, ${COLORS.pink})`, opacity: 0.15, transform: 'rotate(-3deg)' }}
            />
            <div
              className="relative flex items-center justify-center p-8 sm:p-12"
              style={{ backgroundColor: COLORS.cream, border: '1px solid rgba(16,20,63,0.06)', borderRadius: 40, aspectRatio: '1 / 1' }}
            >
              <svg viewBox="0 0 300 300" className="w-full h-full">
                <circle cx="150" cy="150" r="95" fill="none" stroke={hexToRgba(COLORS.purple, 0.15)} strokeDasharray="3 7" />
                {nodes.map((n, i) => (
                  <g key={i}>
                    {i > 0 && <line x1="150" y1="150" x2={n.x} y2={n.y} stroke={n.color} strokeOpacity="0.3" strokeWidth="1.5" />}
                    <circle cx={n.x} cy={n.y} r={n.r} fill={n.color} opacity={i === 0 ? 1 : 0.85} />
                  </g>
                ))}
              </svg>
            </div>
          </div>
        </Reveal>
        <div>
          <Reveal><span className="text-xs font-bold tracking-widest uppercase" style={{ color: COLORS.purple }}>About Circlely</span></Reveal>
          <Reveal delay={0.05}>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mt-3 mb-6 leading-tight" style={{ color: COLORS.navy }}>
              Real People.<br />Real Conversations.<br /><span style={{ color: COLORS.purple }}>Real Connections.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-base mb-4" style={{ color: '#4b4f6b' }}>
              Circlely is designed to help people discover meaningful communities based on shared interests, activities and curiosity.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="text-base mb-8" style={{ color: '#4b4f6b' }}>
              No pressure. No judgement. Just a comfortable space where people can be themselves.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <button onClick={onLearnMore} className="inline-flex items-center gap-2 font-bold" style={{ color: COLORS.purple }}>
              Learn How It Works <ArrowRight size={16} />
            </button>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function FAQ() {
  const [open, setOpen] = useState(0);
  return (
    <section id="faq" className="relative py-24" style={{ backgroundColor: COLORS.cream }}>
      <div className="max-w-3xl mx-auto px-5 sm:px-8">
        <SectionHeading eyebrow="Questions" title="Frequently Asked Questions" />
        <div className="space-y-4">
          {FAQS.map((f, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={f.q} delay={i * 0.03}>
                <div className="bg-white rounded-3xl overflow-hidden" style={{ border: '1px solid rgba(16,20,63,0.06)' }}>
                  <button
                    className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
                    aria-expanded={isOpen}
                    onClick={() => setOpen(isOpen ? -1 : i)}
                  >
                    <span className="font-bold" style={{ color: COLORS.navy }}>{f.q}</span>
                    <span
                      className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform"
                      style={{ backgroundColor: hexToRgba(COLORS.purple, 0.1), transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)' }}
                    >
                      <Plus size={16} color={COLORS.purple} />
                    </span>
                  </button>
                  <div style={{ display: 'grid', gridTemplateRows: isOpen ? '1fr' : '0fr', transition: 'grid-template-rows 0.35s ease' }}>
                    <div className="overflow-hidden">
                      <p className="px-6 pb-5 text-sm" style={{ color: '#6b6f8c' }}>{f.a}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function FinalCTA({ onJoin, onExploreActivities }) {
  const icons = ['🎨', '🎵', '✈️', '🎮', '📚'];
  return (
    <section className="relative py-28 overflow-hidden" style={{ background: `linear-gradient(135deg, ${COLORS.cream}, #FBEFF7)` }}>
      <div className="pointer-events-none absolute inset-0">
        {icons.map((icon, i) => (
          <div key={i} className="absolute hero-float text-2xl" style={{ top: `${8 + i * 18}%`, left: i % 2 ? '85%' : '4%', animationDelay: `${i * 0.4}s`, opacity: 0.6 }}>
            {icon}
          </div>
        ))}
      </div>
      <div className="relative max-w-2xl mx-auto px-5 sm:px-8 text-center">
        <Reveal><h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4" style={{ color: COLORS.navy }}>Your People Are Out There.</h2></Reveal>
        <Reveal delay={0.05}><p className="text-lg mb-10" style={{ color: '#4b4f6b' }}>You just haven't found your circle yet.</p></Reveal>
        <Reveal delay={0.1}>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={onJoin}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold text-white transition-transform hover:-translate-y-1"
              style={{ background: `linear-gradient(135deg, ${COLORS.purple}, ${COLORS.pink})`, boxShadow: `0 15px 35px ${hexToRgba(COLORS.purple, 0.35)}` }}
            >
              Find My Circle <ArrowRight size={18} />
            </button>
            <button
              onClick={onExploreActivities}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold"
              style={{ border: `2px solid ${COLORS.navy}`, color: COLORS.navy }}
            >
              Explore Activities
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function FooterCol({ title, items }) {
  return (
    <div>
      <h4 className="text-white font-bold text-sm mb-4">{title}</h4>
      <ul className="space-y-2.5">
        {items.map((i) => (
          <li key={i}>
            <a href="#" onClick={(e) => e.preventDefault()} className="text-sm transition-colors hover:text-white" style={{ color: 'rgba(255,255,255,0.55)' }}>
              {i}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Footer() {
  const socials = [Instagram, Facebook, Twitter, Youtube];
  return (
    <footer style={{ backgroundColor: COLORS.navy }} className="pt-20 pb-8">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-14">
          <div>
            <div className="flex items-center gap-2 font-extrabold text-xl text-white mb-4">
              <span className="flex items-center justify-center" style={{ width: 32, height: 32, borderRadius: 11, background: `linear-gradient(135deg, ${COLORS.purple}, ${COLORS.pink})` }}>◎</span>
              Circlely
            </div>
            <p className="text-sm mb-6" style={{ color: 'rgba(255,255,255,0.55)' }}>Find your people.<br />Build your circle.</p>
            <button className="inline-flex items-center gap-2 text-sm font-semibold px-4 py-2.5 rounded-full text-white" style={{ backgroundColor: 'rgba(255,255,255,0.08)' }}>
              <MessageCircle size={16} /> Join the community chat
            </button>
          </div>
          <FooterCol title="Explore" items={['Circles', 'Activities', 'Events', 'About']} />
          <FooterCol title="Community" items={['Safety', 'Guidelines', 'Privacy', 'FAQ']} />
          <div>
            <h4 className="text-white font-bold text-sm mb-4">Connect</h4>
            <div className="flex gap-3">
              {socials.map((Icon, i) => (
                <button key={i} aria-label="Social link" className="w-9 h-9 rounded-full flex items-center justify-center transition-colors hover:opacity-80" style={{ backgroundColor: 'rgba(255,255,255,0.08)' }}>
                  <Icon size={16} color="#fff" />
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4" style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}>
          <span className="text-xs" style={{ color: 'rgba(255,255,255,0.45)' }}>© 2026 Circlely. All rights reserved.</span>
          <span className="text-xs text-center" style={{ color: 'rgba(255,255,255,0.35)' }}>A demo community platform — for illustration purposes only.</span>
        </div>
      </div>
    </footer>
  );
}

function JoinModal({ onClose }) {
  const [step, setStep] = useState(1);
  const [selected, setSelected] = useState([]);
  const toggle = (label) => setSelected((s) => (s.includes(label) ? s.filter((x) => x !== label) : [...s, label]));
  const matches = PEOPLE_NETWORK.slice(0, 4);

  return (
    <ModalShell onClose={onClose} maxWidth={560}>
      <div className="p-7 sm:p-10">
        {step === 1 && (
          <>
            <h3 className="text-2xl font-extrabold mb-2" style={{ color: COLORS.navy }}>Welcome to Your Circle 👋</h3>
            <p className="text-sm mb-6" style={{ color: '#6b6f8c' }}>What are you interested in?</p>
            <div className="flex flex-wrap gap-2.5 mb-8">
              {INTERESTS.map((it) => {
                const active = selected.includes(it.label);
                return (
                  <button
                    key={it.label}
                    onClick={() => toggle(it.label)}
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full text-sm font-semibold transition-all"
                    style={active ? { backgroundColor: COLORS.purple, color: '#fff' } : { backgroundColor: '#F5F4FB', color: COLORS.navy }}
                  >
                    <span>{it.icon}</span>{it.label}
                  </button>
                );
              })}
            </div>
            <button
              disabled={selected.length === 0}
              onClick={() => setStep(2)}
              className="w-full py-3.5 rounded-full font-bold text-white transition-opacity"
              style={{ background: `linear-gradient(135deg, ${COLORS.purple}, #8f5cf0)`, opacity: selected.length === 0 ? 0.4 : 1 }}
            >
              Continue
            </button>
          </>
        )}
        {step === 2 && (
          <>
            <h3 className="text-xl font-extrabold mb-1" style={{ color: COLORS.navy }}>We've found 18 people who share your interests.</h3>
            <p className="text-sm mb-6" style={{ color: '#6b6f8c' }}>Based on {selected.join(', ')}</p>
            <div className="grid sm:grid-cols-2 gap-3 mb-8">
              {matches.map((p) => (
                <div key={p.id} className="flex items-center gap-3 p-3 rounded-2xl" style={{ backgroundColor: '#F8F7FC' }}>
                  <Avatar name={p.name} color={p.color} size={40} />
                  <div>
                    <div className="font-bold text-sm" style={{ color: COLORS.navy }}>{p.name}, {p.age}</div>
                    <div className="text-xs" style={{ color: '#8b8ea8' }}>{p.interests.slice(0, 2).join(' · ')}</div>
                  </div>
                </div>
              ))}
            </div>
            <button
              onClick={() => setStep(3)}
              className="w-full py-3.5 rounded-full font-bold text-white inline-flex items-center justify-center gap-2"
              style={{ background: `linear-gradient(135deg, ${COLORS.purple}, #8f5cf0)` }}
            >
              Create My Circle <ArrowRight size={16} />
            </button>
          </>
        )}
        {step === 3 && (
          <div className="text-center py-4">
            <div className="text-5xl mb-4">✨</div>
            <h3 className="text-2xl font-extrabold mb-2" style={{ color: COLORS.navy }}>Your circle is taking shape ✨</h3>
            <p className="text-sm mb-8" style={{ color: '#6b6f8c' }}>We'll have your first recommendations ready soon.</p>
            <button
              onClick={() => {
                onClose();
                setTimeout(() => document.getElementById('activities')?.scrollIntoView({ behavior: 'smooth' }), 300);
              }}
              className="w-full py-3.5 rounded-full font-bold text-white"
              style={{ background: `linear-gradient(135deg, ${COLORS.purple}, #8f5cf0)` }}
            >
              Explore Activities
            </button>
          </div>
        )}
      </div>
    </ModalShell>
  );
}

export default function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [joinOpen, setJoinOpen] = useState(false);
  const [circleOpen, setCircleOpen] = useState(null);

  useEffect(() => {
    const ids = ['home', 'circles', 'activities', 'about', 'safety', 'how-it-works', 'faq'];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: '-40% 0px -50% 0px', threshold: 0 }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="circlely-root min-h-screen w-full overflow-x-hidden" style={{ backgroundColor: COLORS.cream }}>
      <GlobalStyles />
      <Navbar activeSection={activeSection} onNavClick={scrollTo} onJoinClick={() => setJoinOpen(true)} />
      <Hero onJoin={() => setJoinOpen(true)} onExplore={() => scrollTo('circles')} />
      <LiveTicker />
      <CircleExplorer onOpenCircle={setCircleOpen} />
      <PeopleNetwork />
      <Activities onJoinActivity={() => setJoinOpen(true)} />
      <DarkCTA onJoin={() => setJoinOpen(true)} />
      <Safety />
      <HowItWorks />
      <Testimonials />
      <About onLearnMore={() => scrollTo('how-it-works')} />
      <FAQ />
      <FinalCTA onJoin={() => setJoinOpen(true)} onExploreActivities={() => scrollTo('activities')} />
      <Footer />
      {circleOpen && (
        <CircleModal
          circle={circleOpen}
          onClose={() => setCircleOpen(null)}
          onJoin={() => { setCircleOpen(null); setJoinOpen(true); }}
        />
      )}
      {joinOpen && <JoinModal onClose={() => setJoinOpen(false)} />}
    </div>
  );
}
