import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import CircleExplorer from "./components/CircleExplorer";
import PeopleNetwork from "./components/PeopleNetwork";
import Activities from "./components/Activities";
import DarkCTA from "./components/DarkCTA";
import Safety from "./components/Safety";
import HowItWorks from "./components/HowItWorks";
import Testimonials from "./components/Testimonials";
import About from "./components/About";
import FAQ from "./components/FAQ";
import FinalCTA from "./components/FinalCTA";
import Footer from "./components/Footer";
import JoinModal from "./components/JoinModal";

export default function App() {
  const [joinOpen, setJoinOpen] = useState(false);

  useEffect(() => {
    const onKey = e => e.key === "Escape" && setJoinOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div className="app">
      <Navbar onJoin={() => setJoinOpen(true)} />
      <main>
        <Hero onJoin={() => setJoinOpen(true)} />
        <CircleExplorer onJoin={() => setJoinOpen(true)} />
        <PeopleNetwork onJoin={() => setJoinOpen(true)} />
        <Activities />
        <DarkCTA onJoin={() => setJoinOpen(true)} />
        <Safety />
        <HowItWorks />
        <Testimonials />
        <About />
        <FAQ />
        <FinalCTA onJoin={() => setJoinOpen(true)} />
      </main>
      <Footer />
      <JoinModal open={joinOpen} onClose={() => setJoinOpen(false)} />
    </div>
  );
}
