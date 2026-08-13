import { motion } from "framer-motion";
import { ArrowRight, Users, Mountain, Coffee } from "lucide-react";

export default function About() {
  return (
    <section id="about" className="section about-section">
      <motion.div className="about-image" initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
        <div className="about-art">
          <div className="sun"/>
          <div className="hill hill-1"/><div className="hill hill-2"/>
          <div className="friend-row"><span>🧑🏽‍🎨</span><span>👩🏻‍💻</span><span>🧑🏾‍🚀</span><span>👩🏼‍🎤</span><span>🧑🏻‍🍳</span></div>
          <div className="about-caption"><Users/> weekends feel better together</div>
        </div>
        <div className="about-deco"/>
      </motion.div>
      <motion.div className="about-copy" initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
        <div className="eyebrow">ABOUT CIRCLELY</div>
        <h2>Real People.<br/>Real Conversations.<br/><span>Real Connections.</span></h2>
        <p>Circlely is designed to help people discover meaningful communities based on shared interests, activities and curiosity.</p>
        <p>No pressure. No judgement. Just a comfortable space where people can be themselves.</p>
        <div className="about-pills"><span><Mountain/> Explore</span><span><Coffee/> Share</span><span><Users/> Belong</span></div>
        <button className="secondary-btn" onClick={() => document.getElementById("how-it-works")?.scrollIntoView({ behavior: "smooth" })}>Learn How It Works <ArrowRight/></button>
      </motion.div>
    </section>
  );
}
