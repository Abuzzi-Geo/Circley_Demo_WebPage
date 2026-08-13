import { useEffect, useState } from "react";
import { Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { testimonials } from "../data/circles";

export default function Testimonials() {
  const [active, setActive] = useState(0);
  useEffect(() => { const t = setInterval(() => setActive(v => (v + 1) % testimonials.length), 5000); return () => clearInterval(t); }, []);
  const t = testimonials[active];
  return (
    <section className="section testimonial-section">
      <div className="testimonial-title"><div className="eyebrow">REAL PEOPLE, REAL STORIES</div><h2>Loved by the Community.</h2></div>
      <div className="testimonial-wrap">
        <AnimatePresence mode="wait">
          <motion.div key={active} className="testimonial-card" initial={{ opacity: 0, x: 25 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -25 }} transition={{ duration: .35 }}>
            <Quote className="quote-icon"/>
            <p>"{t.quote}"</p>
            <div className="testimonial-person"><div className="avatar">{t.initials}</div><div><strong>{t.name}</strong><span>{t.meta}</span></div></div>
          </motion.div>
        </AnimatePresence>
        <div className="testimonial-controls">
          <button onClick={() => setActive((active - 1 + testimonials.length) % testimonials.length)} aria-label="Previous testimonial"><ChevronLeft/></button>
          <div>{testimonials.map((_, i) => <button key={i} className={i === active ? "active" : ""} onClick={() => setActive(i)} aria-label={`Testimonial ${i+1}`}/>)}</div>
          <button onClick={() => setActive((active + 1) % testimonials.length)} aria-label="Next testimonial"><ChevronRight/></button>
        </div>
      </div>
    </section>
  );
}
