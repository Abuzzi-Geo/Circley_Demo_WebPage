import { motion } from "framer-motion";
import { UserPlus, Heart, Users, CalendarDays, Handshake } from "lucide-react";
import SectionHeading from "./SectionHeading";

const steps = [
  [UserPlus, "Create Your Profile", "Create your account in a few simple steps.", "01", "orange"],
  [Heart, "Choose Your Interests", "Tell us what you enjoy.", "02", "pink"],
  [Users, "Discover Your Circles", "Find communities that match your interests.", "03", "purple"],
  [CalendarDays, "Join Activities", "Participate in events and group conversations.", "04", "green"],
  [Handshake, "Build Real Connections", "Meet people and build meaningful friendships.", "05", "blue"]
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="section how-section">
      <SectionHeading eyebrow="SIMPLE BY DESIGN" title="From Stranger to Circle in 5 Steps.">
        No complicated feeds. Just a simple path from shared interest to shared experience.
      </SectionHeading>
      <div className="timeline">
        <div className="timeline-line"><motion.div initial={{ width: 0 }} whileInView={{ width: "100%" }} viewport={{ once: true }} transition={{ duration: 1.5, ease: "easeInOut" }}/></div>
        {steps.map(([Icon, title, text, num, tone], i) => (
          <motion.div key={num} className={`step ${tone}`} initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i*.12 }}>
            <div className="step-icon"><Icon/></div><span className="step-num">{num}</span><h3>{title}</h3><p>{text}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
