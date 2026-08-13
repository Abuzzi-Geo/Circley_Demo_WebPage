import { motion } from "framer-motion";
import { ArrowUpRight, Users } from "lucide-react";
import * as Icons from "lucide-react";
import { activities } from "../data/circles";
import SectionHeading from "./SectionHeading";

export default function Activities() {
  return (
    <section id="activities" className="section activities-section">
      <SectionHeading eyebrow="DO MORE TOGETHER" title="There's Always Something Happening.">
        Join conversations, challenges and activities that make your circle feel alive.
      </SectionHeading>

      <div className="activity-grid">
        {activities.map((a, i) => {
          const Icon = Icons[a.icon] || Icons.Sparkles;
          return (
            <motion.article key={a.name} className={`activity-card ${a.tone}`} initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * .05 }} whileHover={{ y: -7 }}>
              <div className="activity-top"><div className="activity-icon"><Icon /></div><span>{a.type}</span></div>
              <h3>{a.name}</h3>
              <p>{a.date}</p>
              <div className="activity-bottom"><span><Users size={15}/> {a.people} people joining</span><button>Join <ArrowUpRight size={16}/></button></div>
            </motion.article>
          );
        })}
      </div>

      <div className="live-feed">
        <div className="live-dot" /><strong>Community pulse</strong>
        <div className="pulse-items">
          <span>12 people are joining Game Night</span><i>•</i><span>New circle discovered</span><i>•</i><span>18 people are talking about travel</span>
        </div>
      </div>
    </section>
  );
}
