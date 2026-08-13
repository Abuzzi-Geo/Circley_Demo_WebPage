import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import * as Icons from "lucide-react";
import { circles } from "../data/circles";
import SectionHeading from "./SectionHeading";

export default function CircleExplorer({ onJoin }) {
  const [selected, setSelected] = useState(null);
  const c = circles.find(x => x.id === selected);

  return (
    <section id="circles" className="section circles-section">
      <SectionHeading eyebrow="DISCOVER YOUR PEOPLE" title="Find Your Circle">
        Start with what you love. The right people usually follow.
      </SectionHeading>

      <div className="circle-grid">
        {circles.map((item, i) => {
          const Icon = Icons[item.icon] || Icons.Circle;
          return (
            <motion.button
              key={item.id}
              className={`circle-card ${item.tone}`}
              onClick={() => setSelected(item.id)}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * .05 }}
              whileHover={{ y: -8 }}
            >
              <div className="circle-icon"><Icon /></div>
              <h3>{item.name}</h3>
              <p>{item.description}</p>
              <div className="circle-meta"><span>{item.members} members</span><span>Explore →</span></div>
            </motion.button>
          );
        })}
      </div>

      <div className="interest-strip">
        <span>Popular interests</span>
        {["🎨 Art", "🎵 Music", "✈️ Travel", "🎮 Gaming", "📚 Books", "☕ Coffee"].map(x => <button key={x}>{x}</button>)}
      </div>

      <AnimatePresence>
        {c && (
          <motion.div className="modal-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelected(null)}>
            <motion.div className="circle-modal" initial={{ opacity: 0, scale: .92, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: .92 }} onClick={e => e.stopPropagation()}>
              <button className="modal-close" onClick={() => setSelected(null)}>×</button>
              <div className={`modal-icon ${c.tone}`}>{(() => { const I = Icons[c.icon] || Icons.Circle; return <I /> })()}</div>
              <div className="eyebrow">COMMUNITY PREVIEW</div>
              <h3>{c.name}</h3>
              <p>{c.description}</p>
              <div className="tag-row">{c.tags.map(t => <span key={t}>{t}</span>)}</div>
              <div className="modal-stats"><strong>{c.members}</strong><span>members already exploring this circle</span></div>
              <button className="primary-btn full" onClick={() => { setSelected(null); onJoin(); }}>Join this Circle <Icons.ArrowRight /></button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
