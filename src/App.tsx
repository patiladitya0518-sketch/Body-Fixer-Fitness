import { useState } from 'react';
import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
import { Workouts } from './components/Workouts';
import { DietPlans } from './components/DietPlans';
import { Remedies } from './components/Remedies';
import { Contact } from './components/Contact';
import { WaterTracker } from './components/WaterTracker';
import { CalorieCalculator } from './components/CalorieCalculator';
import { FitBot } from './components/FitBot';
import { MyPlans } from './components/MyPlans';
import { AuthModal } from './components/AuthModal';
import { useAuth } from './context/AuthContext';

function App() {
  const [authOpen, setAuthOpen] = useState(false);
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-deep-black text-white">
      <Navigation onLogin={() => setAuthOpen(true)} />
      <main>
        <Hero />
        <Workouts />
        <DietPlans />
        <Remedies />
        <CalorieCalculator />
        <WaterTracker />
        <FitBot />
        {user && <MyPlans />}
        <Contact />
      </main>
      <AuthModal isOpen={authOpen} onClose={() => setAuthOpen(false)} />
    </div>
  );
}

export default App;
