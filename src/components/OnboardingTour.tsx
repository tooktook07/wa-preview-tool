import Joyride, { CallBackProps, STATUS, EVENTS, ACTIONS } from 'react-joyride';
import { tourSteps } from '@/utils/tourSteps';
import { useIsMobile } from '@/hooks/use-mobile';

interface OnboardingTourProps {
  run: boolean;
  onComplete: () => void;
  onSkip: () => void;
}

export function OnboardingTour({ run, onComplete, onSkip }: OnboardingTourProps) {
  const isMobile = useIsMobile();
  
  const handleJoyrideCallback = (data: CallBackProps) => {
    const { status, action, type } = data;

    // Tour completed
    if (status === STATUS.FINISHED || status === STATUS.SKIPPED) {
      if (action === ACTIONS.SKIP) {
        onSkip();
      } else {
        onComplete();
      }
    }

    // User closed the tour
    if (type === EVENTS.TOUR_END && action === ACTIONS.CLOSE) {
      onSkip();
    }
  };

  return (
    <Joyride
      steps={tourSteps}
      run={run}
      continuous
      showProgress
      showSkipButton
      disableOverlayClose
      disableCloseOnEsc={false}
      scrollToFirstStep
      scrollOffset={isMobile ? 50 : 100}
      callback={handleJoyrideCallback}
      styles={{
        options: {
          arrowColor: 'hsl(var(--popover))',
          backgroundColor: 'hsl(var(--popover))',
          overlayColor: 'rgba(0, 0, 0, 0.6)',
          primaryColor: 'hsl(var(--primary))',
          textColor: 'hsl(var(--popover-foreground))',
          zIndex: 10000,
        },
        tooltip: {
          fontSize: isMobile ? 12 : 14,
          padding: isMobile ? 12 : 20,
          maxWidth: isMobile ? '90vw' : 420,
        },
        tooltipContainer: {
          textAlign: 'left',
        },
        buttonNext: {
          backgroundColor: 'hsl(var(--primary))',
          fontSize: isMobile ? 12 : 14,
          padding: isMobile ? '6px 12px' : '8px 16px',
        },
        buttonBack: {
          color: 'hsl(var(--muted-foreground))',
          fontSize: isMobile ? 12 : 14,
          marginRight: isMobile ? 4 : 8,
        },
        buttonSkip: {
          color: 'hsl(var(--muted-foreground))',
          fontSize: isMobile ? 11 : 13,
        },
      }}
      locale={{
        back: 'Back',
        close: 'Close',
        last: 'Finish',
        next: 'Next',
        skip: isMobile ? 'Skip' : 'Skip tour',
      }}
    />
  );
}
