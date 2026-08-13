import { Instagram, Facebook, Youtube, Twitter, MessageCircle } from "lucide-react";

export default function Footer() {
  const go = id => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  return (
    <footer className="footer">
      <div className="footer-main">
        <div className="footer-brand">
          <div className="brand"><span className="brand-mark"><span>C</span><i /></span><span><strong>Circlely</strong><small>Find Your People</small></span></div>
          <p>Find your people.<br/>Build your circle.</p>
        </div>
        <div className="footer-col"><h4>Explore</h4><button onClick={() => go("circles")}>Circles</button><button onClick={() => go("activities")}>Activities</button><button onClick={() => go("about")}>About</button></div>
        <div className="footer-col"><h4>Community</h4><button onClick={() => go("safety")}>Safety</button><button onClick={() => go("faq")}>Guidelines</button><button onClick={() => go("faq")}>Privacy</button></div>
        <div className="footer-col"><h4>Connect</h4><div className="socials"><a href="#instagram" aria-label="Instagram"><Instagram/></a><a href="#facebook" aria-label="Facebook"><Facebook/></a><a href="#twitter" aria-label="X"><Twitter/></a><a href="#youtube" aria-label="YouTube"><Youtube/></a></div></div>
        <div className="footer-community"><h4>Join the community</h4><button><MessageCircle/> WhatsApp-style demo</button><small>Demo link — no external group is connected.</small></div>
      </div>
      <div className="footer-bottom"><span>© 2026 Circlely. All rights reserved.</span><span>Made for meaningful connections.</span></div>
    </footer>
  );
}
