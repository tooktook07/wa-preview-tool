import { useState, useEffect, ReactNode } from 'react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface ContextualTooltipProps {
  children: ReactNode;
  content: string;
  storageKey: string;
  delayDuration?: number;
}

/**
 * ContextualTooltip - Shows a tooltip on first hover/interaction
 * Uses localStorage to track which tooltips have been seen
 * Perfect for progressive onboarding and feature discovery
 */
export function ContextualTooltip({ 
  children, 
  content, 
  storageKey,
  delayDuration = 200 
}: ContextualTooltipProps) {
  const [hasBeenSeen, setHasBeenSeen] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Check if user has seen this tooltip before
    const seenTooltips = JSON.parse(
      localStorage.getItem('contextual_tooltips_seen') || '{}'
    );
    
    if (!seenTooltips[storageKey]) {
      setHasBeenSeen(false);
    }
  }, [storageKey]);

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    
    if (open && !hasBeenSeen) {
      // Mark as seen after tooltip shows
      setTimeout(() => {
        const seenTooltips = JSON.parse(
          localStorage.getItem('contextual_tooltips_seen') || '{}'
        );
        seenTooltips[storageKey] = true;
        localStorage.setItem('contextual_tooltips_seen', JSON.stringify(seenTooltips));
        setHasBeenSeen(true);
      }, 2000); // Show for 2 seconds before marking as seen
    }
  };

  // Don't show tooltip if already seen
  if (hasBeenSeen) {
    return <>{children}</>;
  }

  return (
    <TooltipProvider delayDuration={delayDuration}>
      <Tooltip open={isOpen} onOpenChange={handleOpenChange}>
        <TooltipTrigger asChild>
          {children}
        </TooltipTrigger>
        <TooltipContent 
          side="bottom" 
          className="max-w-[250px] bg-primary text-primary-foreground"
        >
          <p className="text-sm">{content}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
