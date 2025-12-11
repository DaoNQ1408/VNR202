import React from "react";
import { Hero } from "../components/sections/Hero";
import ReformAnalysis from "../components/sections/ReformAnalysis";
import KeyAchievements from "../components/sections/KeyAchievements";
import CTA from "../components/sections/CTA";

const HomePage: React.FC = () => {
  return (
    <main>
      <Hero />
      <ReformAnalysis />
      <KeyAchievements />
      <CTA />
    </main>
  );
};

export default HomePage;
