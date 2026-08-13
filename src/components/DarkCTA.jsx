import { motion } from "framer-motion";
import { ArrowRight, Users, Sparkles } from "lucide-react";

const stats = [["24K+", "Community Members"], ["180+", "Active Circles"], ["1,200+", "Monthly Activities"], ["98%", "Positive Interactions"]];

export default function DarkCTA({ onJoin }) {
  return (
    <section className="dark-cta section">
      <div className="dark-orb orb-a"/><div className="dark-orb orb-b"/>
      <div className="dark-copy">
        <div className="eyebrow light">THE CIRCLELY DIFFERENCE</div>
        <h2>The internet is huge.<br/><span>Your circle doesn't have to be.</span></h2>
        <p>A smaller space can make room for bigger conversations.</p>
        <button className="primary-btn" onClick={onJoin}>Find My Circle <ArrowRight /></button>
      </div>
      <div className="stat-grid">
        {stats.map(([n,l], i) => <motion.div key={l} className="stat" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i*.08 }}><strong>{n}</strong><span>{l}</span></motion.div>)}
      </div>
      <div className="dark-bubbles"><span>🎨</span><span>☕</span><span>🎵</span><span><Users/></span><span><Sparkles/></span></div>
    </section>
  );
}
