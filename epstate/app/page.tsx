"use client";

import { useState } from "react";
import Preloader from "@/components/Preloader";
import Hero from "@/components/Hero";
import Manifesto from "@/components/Manifesto";
import ServicesGrid from "@/components/ServicesGrid";
import Marquee from "@/components/Marquee";
import Footer from "@/components/Footer";

export default function Home() {
  const [ready, setReady] = useState(false);

  return (
    <>
      <Preloader onComplete={() => setReady(true)} />
      <main>
        <Hero ready={ready} />
        <Manifesto />
        <ServicesGrid />
        <Marquee />
        <Footer />
      </main>
    </>
  );
}
