import { useState, useEffect } from 'react';
import { analyzeReadability, type ReadabilityMetrics } from '@/utils/readabilityAnalyzer';

export function useReadability(text: string, debounceMs: number = 300) {
  const [metrics, setMetrics] = useState<ReadabilityMetrics | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  
  useEffect(() => {
    setIsAnalyzing(true);
    
    const timer = setTimeout(() => {
      const result = analyzeReadability(text);
      setMetrics(result);
      setIsAnalyzing(false);
    }, debounceMs);
    
    return () => {
      clearTimeout(timer);
      setIsAnalyzing(false);
    };
  }, [text, debounceMs]);
  
  return { metrics, isAnalyzing };
}
