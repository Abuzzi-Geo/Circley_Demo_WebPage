import { motion } from "framer-motion";
import { ShieldCheck, LockKeyhole, Ban, Flag, HeartHandshake, MessageCircleHeart } from "lucide-react";
import SectionHeading from "./SectionHeading";

const cards = [
  [LockKeyhole, "Privacy First", "Your personal information stays protected.", "purple"],
  [ShieldCheck, "Community Moderation", "Uncomfortable behavior can be reported and addressed.", "blue"],
  [Ban, "No Dating Pressure", "Circlely is about shared interests and community.", "pink"],
  [Flag, "Report & Block", "You stay in control of your experience.", "orange"],
  [HeartHandshake, "Respect Matters", "Everyone deserves a welcoming space.", "green"],
  [MessageCircleHeart, "Positive Communities", "Healthy participation comes first.", "purple"]
];

export default function Safety() {
  return (
    <section id="safety" className="section safety-section">
      <SectionHeading eyebrow="TRUST BY DESIGN" title="A Social Space Built Around Trust.">
        Connection feels better when people feel safe.
      </SectionHeading>
      <div className="safety-grid">
        {cards.map(([Icon, title, text, tone], i) => (
          <motion.article key={title} className={`safety-card ${tone}`} initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i*.05 }} whileHover={{ y: -6 }}>
            <div className="safety-icon"><Icon /></div><div><h3>{title}</h3><p>{text}</p></div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
