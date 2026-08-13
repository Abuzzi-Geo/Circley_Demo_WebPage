import { ArrowRight, Compass, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export default function FinalCTA({ onJoin }) {
  return (
    <section className="final-cta section">
      <div className="final-blob blob-left"/><div className="final-blob blob-right"/>
      <motion.div className="final-content" initial={{ opacity: 0, scale: .96 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}>
        <div className="eyebrow">YOUR NEXT CHAPTER STARTS HERE</div>
        <h2>Your People Are Out There.</h2>
        <p>You just haven't found your circle yet.</p>
        <div className="final-actions"><button className="primary-btn" onClick={onJoin}>Find My Circle <ArrowRight/></button><button className="secondary-btn" onClick={() => document.getElementById("activities")?.scrollIntoView({ behavior: "smooth" })}><Compass/> Explore Activities</button></div>
      </motion.div>
      <div className="final-float f1">🎨</div><div className="final-float f2">☕</div><div className="final-float f3">🎵</div><div className="final-float f4"><Sparkles/></div>
    </section>
  );
}
