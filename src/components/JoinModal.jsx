import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Check, X } from "lucide-react";

const interests = ["🎨 Art", "🎵 Music", "✈️ Travel", "🎮 Gaming", "📚 Books", "🏃 Fitness", "🎬 Movies", "🍳 Food"];

export default function JoinModal({ open, onClose }) {
  const [selected, setSelected] = useState([]);
  const [done, setDone] = useState(false);

  const toggle = x => setSelected(s => s.includes(x) ? s.filter(v => v !== x) : [...s, x]);

  const close = () => { setDone(false); setSelected([]); onClose(); };

  return (
    <AnimatePresence>
      {open && (
        <motion.div className="modal-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={close}>
          <motion.div className="join-modal" initial={{ opacity: 0, scale: .92, y: 18 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: .92 }} onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={close}><X/></button>
            {!done ? (
              <>
                <div className="modal-welcome">👋</div>
                <div className="eyebrow">WELCOME TO CIRCLELY</div>
                <h3>Build Your Circle.</h3>
                <p>Pick a few things you love and we'll show you the kind of communities waiting for you.</p>
                <div className="join-interests">{interests.map(x => <button key={x} className={selected.includes(x) ? "selected" : ""} onClick={() => toggle(x)}>{x}{selected.includes(x) && <Check/>}</button>)}</div>
                <div className="match-result"><strong>{selected.length ? 18 + selected.length * 4 : 18}</strong><span>people share at least one of your interests</span></div>
                <button className="primary-btn full" onClick={() => setDone(true)}>Create My Circle <ArrowRight/></button>
              </>
            ) : (
              <div className="success-state">
                <div className="success-mark"><Check/></div>
                <div className="eyebrow">YOUR CIRCLE IS TAKING SHAPE</div>
                <h3>You're on your way ✨</h3>
                <p>We'll have your first recommendations ready soon. In the meantime, explore what's happening in the community.</p>
                <button className="primary-btn full" onClick={close}>Explore Activities <ArrowRight/></button>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
