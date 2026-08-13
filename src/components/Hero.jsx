import { motion } from "framer-motion";
import { ArrowRight, Heart, ShieldCheck, Users, LockKeyhole, Sparkles, MessageCircle } from "lucide-react";

const bubbles = [
  { name: "Maya", role: "Photography", tone: "coral", x: "-2%", y: "7%" },
  { name: "Arjun", role: "Travel", tone: "blue", x: "68%", y: "1%" },
  { name: "Priya", role: "Books", tone: "pink", x: "78%", y: "53%" },
  { name: "Daniel", role: "Gaming", tone: "green", x: "2%", y: "62%" }
];

export default function Hero({ onJoin }) {
  return (
    <section id="home" className="hero section">
      <div className="hero-glow glow-one" /><div className="hero-glow glow-two" />
      <div className="hero-copy">
        <motion.div className="welcome-pill" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <Heart size={16} /> A community that feels like home.
        </motion.div>
        <motion.h1 initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .08, duration: .7 }}>
          Find Your People.<br />
          Build Your <span>Circle.</span><br />
          <em>Feel at Home.</em>
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .18 }}>
          Discover people who share your interests, curiosity and energy — and find communities where you can simply be yourself.
        </motion.p>
        <motion.div className="trust-row" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .3 }}>
          <span><Users /> Friendly communities</span>
          <span><ShieldCheck /> Privacy first</span>
          <span><LockKeyhole /> No dating pressure</span>
        </motion.div>
        <motion.div className="hero-actions" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .4 }}>
          <button className="primary-btn" onClick={onJoin}>Join the Circle <ArrowRight /></button>
          <button className="secondary-btn" onClick={() => document.getElementById("circles")?.scrollIntoView({ behavior: "smooth" })}>
            Explore Communities
          </button>
        </motion.div>
      </div>

      <div className="hero-visual" aria-label="Illustration of people forming a community">
        <div className="orbit orbit-a" /><div className="orbit orbit-b" /><div className="orbit orbit-c" />
        <div className="hero-label label-connect"><Users /><span>Connect</span></div>
        <div className="hero-label label-share"><MessageCircle /><span>Share</span></div>
        <div className="hero-label label-belong"><Heart /><span>Belong</span></div>

        {bubbles.map((b, i) => (
          <motion.div
            key={b.name}
            className={`floating-person ${b.tone}`}
            style={{ left: b.x, top: b.y }}
            animate={{ y: [0, -12, 0], rotate: [0, i % 2 ? 2 : -2, 0] }}
            transition={{ duration: 4 + i * .4, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="avatar">{b.name[0]}</div>
            <div><strong>{b.name}</strong><small>{b.role}</small></div>
          </motion.div>
        ))}

        <motion.div className="circle-core" initial={{ scale: .8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: .35, duration: .7 }}>
          <div className="core-icon"><Users /></div>
          <span>YOUR CIRCLE</span>
          <strong>Different people.<br />Same feeling.</strong>
          <small>One place to belong.</small>
        </motion.div>

        {["🎨", "🎵", "✈️", "🎮", "📚", "☕"].map((x, i) => (
          <motion.span key={i} className={`interest-float interest-${i}`} animate={{ y: [0, -8, 0] }} transition={{ duration: 3 + i * .3, repeat: Infinity }}>
            {x}
          </motion.span>
        ))}
        <div className="mini-spark spark-1"><Sparkles /></div>
        <div className="mini-spark spark-2"><Heart /></div>
      </div>
    </section>
  );
}
