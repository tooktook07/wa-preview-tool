import { useState, useEffect } from 'react';

const ONBOARDING_KEY = 'whatsapp-preview-onboarding-completed';

export function useOnboarding() {
  const [runTour, setRunTour] = useState(false);
  const [tourCompleted, setTourCompleted] = useState(false);

  useEffect(() => {
    // Check if user has completed onboarding before
    const hasCompletedOnboarding = localStorage.getItem(ONBOARDING_KEY);
    
    if (!hasCompletedOnboarding) {
      // Small delay to ensure page is fully rendered
      setTimeout(() => {
        setRunTour(true);
      }, 500);
    } else {
      setTourCompleted(true);
    }
  }, []);

  const completeTour = () => {
    localStorage.setItem(ONBOARDING_KEY, 'true');
    setTourCompleted(true);
    setRunTour(false);
  };

  const restartTour = () => {
    setRunTour(true);
  };

  const skipTour = () => {
    completeTour();
  };

  return {
    runTour,
    tourCompleted,
    setRunTour,
    completeTour,
    restartTour,
    skipTour,
  };
}
