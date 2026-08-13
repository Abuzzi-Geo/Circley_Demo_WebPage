import { motion } from "framer-motion";

export default function SectionHeading({ eyebrow, title, children, dark = false }) {
  return (
    <motion.div
      className={`section-heading ${dark ? "dark" : ""}`}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: .55 }}
    >
      {eyebrow && <div className="eyebrow">{eyebrow}</div>}
      <h2>{title}</h2>
      {children && <p>{children}</p>}
    </motion.div>
  );
}
