import { useState } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const links = [
  ["Home", "home"], ["Circles", "circles"], ["Activities", "activities"],
  ["About", "about"], ["Safety", "safety"], ["How It Works", "how-it-works"], ["FAQ", "faq"]
];

export default function Navbar({ onJoin }) {
  const [open, setOpen] = useState(false);
  const go = id => {
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header className="navbar">
      <button className="brand" onClick={() => go("home")} aria-label="Circlely home">
        <span className="brand-mark"><span>C</span><i /></span>
        <span><strong>Circlely</strong><small>Find Your People</small></span>
      </button>

      <nav className="desktop-nav">
        {links.map(([label, id]) => (
          <button key={id} onClick={() => go(id)}>{label}</button>
        ))}
        <button className="nav-join" onClick={onJoin}>Join Now <span>→</span></button>
      </nav>

      <button className="menu-button" onClick={() => setOpen(v => !v)} aria-label="Toggle navigation">
        {open ? <X /> : <Menu />}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="mobile-menu"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
          >
            {links.map(([label, id]) => <button key={id} onClick={() => go(id)}>{label}</button>)}
            <button className="nav-join" onClick={() => { setOpen(false); onJoin(); }}>Join Now →</button>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
