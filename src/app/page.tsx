"use client";

import { useState } from "react";
import LandingPage from "@/components/LandingPage";
import GeneratorApp from "@/components/GeneratorApp";

export default function Home() {
    const [showApp, setShowApp] = useState(false);

  if (showApp) {
        return <GeneratorApp onBack={() => setShowApp(false)} />;
  }

  return <LandingPage onStart={() => setShowApp(true)} />;
}
