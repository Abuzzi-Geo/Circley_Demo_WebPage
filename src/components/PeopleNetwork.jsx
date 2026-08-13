import { motion } from "framer-motion";
import { Heart, MapPin, Sparkles, UserPlus } from "lucide-react";
import { people } from "../data/circles";

export default function PeopleNetwork({ onJoin }) {
  return (
    <section className="section people-section">
      <div className="people-copy">
        <div className="eyebrow">A LITTLE MAGIC OF MATCHING</div>
        <h2>People Like You Are <span>Already Here.</span></h2>
        <p>Shared interests are often the beginning of great friendships. Discover a few of the people who might fit naturally into your circle.</p>
        <div className="match-note"><Sparkles /> <strong>Demo matching</strong><span>based on shared interests</span></div>
        <button className="secondary-btn" onClick={onJoin}>Build My Circle <Heart size={17} /></button>
      </div>
      <div className="network">
        <div className="network-ring ring-1" /><div className="network-ring ring-2" />
        <svg className="network-lines" viewBox="0 0 620 520" aria-hidden="true">
          <path d="M310 260 L120 100 M310 260 L500 105 M310 260 L105 400 M310 260 L505 400 M310 260 L520 270" />
        </svg>
        <motion.div className="network-center" animate={{ scale: [1, 1.03, 1] }} transition={{ duration: 3, repeat: Infinity }}>
          <div>✦</div><strong>YOUR<br/>CIRCLE</strong><small>shared interests</small>
        </motion.div>
        {people.map((p, i) => (
          <motion.div key={p.name} className={`network-person np-${i} ${p.tone}`} whileHover={{ scale: 1.06, zIndex: 4 }}>
            <div className="network-avatar">{p.initials}</div>
            <div className="network-person-info"><strong>{p.name}, {p.age}</strong><small><MapPin size={11}/> near you</small><div>{p.interests.slice(0, 2).map(x => <span key={x}>{x}</span>)}</div></div>
            <div className="mutual"><Heart size={11} fill="currentColor"/> {p.mutual} shared</div>
            <button aria-label={`Connect with ${p.name}`}><UserPlus size={15}/></button>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
