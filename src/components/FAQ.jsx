import { useState } from "react";
import { Plus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { faqs } from "../data/circles";
import SectionHeading from "./SectionHeading";

export default function FAQ() {
  const [open, setOpen] = useState(0);
  return (
    <section id="faq" className="section faq-section">
      <SectionHeading eyebrow="NEED TO KNOW" title="Frequently Asked Questions">
        Everything you need to know before finding your circle.
      </SectionHeading>
      <div className="faq-list">
        {faqs.map(([q, a], i) => (
          <div className={`faq-item ${open === i ? "open" : ""}`} key={q}>
            <button onClick={() => setOpen(open === i ? -1 : i)} aria-expanded={open === i}>
              <span>{q}</span><span className="faq-plus"><Plus/></span>
            </button>
            <AnimatePresence initial={false}>
              {open === i && <motion.div className="faq-answer" initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}><p>{a}</p></motion.div>}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </section>
  );
}
