import React from 'react';
import { Hero } from '../components/sections/Hero';
import HistoryTimeline from '../components/sections/HistoryTimeline';
import ReformAnalysis from '../components/sections/ReformAnalysis';
import KeyAchievements from '../components/sections/KeyAchievements';
import ModernContext from '../components/sections/ModernContext';
import CTA from '../components/sections/CTA';

const HomePage: React.FC = () => {
  return (
    <main>
      <Hero />
      <HistoryTimeline />
      <ReformAnalysis />
      <KeyAchievements />
      <ModernContext />
      <CTA />
    </main>
  );
};

export default HomePage;
