import { type ReadabilityMetrics } from '@/utils/readabilityAnalyzer';
import { AlertCircle, CheckCircle2, Clock, FileText, Lightbulb } from 'lucide-react';

interface ReadabilityPanelProps {
  metrics: ReadabilityMetrics;
}

export default function ReadabilityPanel({ metrics }: ReadabilityPanelProps) {
  const getScoreColor = () => {
    if (metrics.fleschScore >= 70) return 'text-emerald-600';
    if (metrics.fleschScore >= 50) return 'text-blue-600';
    if (metrics.fleschScore >= 30) return 'text-amber-600';
    return 'text-destructive';
  };

  const getScoreIcon = () => {
    if (metrics.fleschScore >= 60) return <CheckCircle2 className="h-4 w-4" />;
    return <AlertCircle className="h-4 w-4" />;
  };

  const formatReadingTime = () => {
    if (metrics.readingTimeSeconds < 60) {
      return `~${metrics.readingTimeSeconds}s`;
    }
    const minutes = Math.floor(metrics.readingTimeSeconds / 60);
    const seconds = metrics.readingTimeSeconds % 60;
    return seconds > 0 ? `~${minutes}m ${seconds}s` : `~${minutes}m`;
  };

  return (
    <div className="space-y-3">
      {/* Header */}
      <div className="flex items-center gap-2 pb-2 border-b">
        <FileText className="h-4 w-4 text-muted-foreground" />
        <h3 className="font-semibold text-sm">Readability Analysis</h3>
      </div>

      {/* Score */}
      <div className="flex items-start gap-3">
        <div className={`${getScoreColor()} flex items-center gap-1.5`}>
          {getScoreIcon()}
        </div>
        <div className="flex-1">
          <div className="flex items-baseline gap-2">
            <span className={`text-2xl font-bold ${getScoreColor()}`}>
              {metrics.fleschScore}
            </span>
            <span className="text-sm text-muted-foreground">/ 100</span>
          </div>
          <p className="text-xs text-muted-foreground mt-0.5">
            {metrics.fleschLevel} - {metrics.complexity === 'easy' ? 'Easy to read' : 
             metrics.complexity === 'standard' ? 'Standard difficulty' : 
             metrics.complexity === 'difficult' ? 'Fairly difficult' : 
             'Very difficult'}
          </p>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 gap-3">
        {/* Reading Time */}
        <div className="flex items-start gap-2 p-2 rounded-md bg-muted/30">
          <Clock className="h-3.5 w-3.5 text-muted-foreground mt-0.5" />
          <div>
            <p className="text-xs font-medium">{formatReadingTime()}</p>
            <p className="text-[10px] text-muted-foreground">Reading time</p>
          </div>
        </div>

        {/* Avg Sentence Length */}
        <div className="flex items-start gap-2 p-2 rounded-md bg-muted/30">
          <FileText className="h-3.5 w-3.5 text-muted-foreground mt-0.5" />
          <div>
            <p className="text-xs font-medium">{metrics.avgSentenceLength} words</p>
            <p className="text-[10px] text-muted-foreground">Avg per sentence</p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="flex items-center justify-between text-xs text-muted-foreground pt-1">
        <span>{metrics.totalWords} words</span>
        <span>•</span>
        <span>{metrics.totalSentences} sentences</span>
      </div>

      {/* Long Sentences Warning */}
      {metrics.longSentenceIndexes.length > 0 && (
        <div className="flex items-start gap-2 p-2 rounded-md bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/30">
          <AlertCircle className="h-3.5 w-3.5 text-amber-600 dark:text-amber-500 mt-0.5 shrink-0" />
          <p className="text-xs text-amber-900 dark:text-amber-200">
            <strong>{metrics.longSentenceIndexes.length}</strong> long sentence{metrics.longSentenceIndexes.length > 1 ? 's' : ''} detected (over 25 words)
          </p>
        </div>
      )}

      {/* Suggestions */}
      {metrics.suggestions.length > 0 && (
        <div className="space-y-2 pt-2 border-t">
          <div className="flex items-center gap-1.5">
            <Lightbulb className="h-3.5 w-3.5 text-muted-foreground" />
            <h4 className="font-medium text-xs">Suggestions</h4>
          </div>
          <ul className="space-y-1.5">
            {metrics.suggestions.map((suggestion, index) => (
              <li key={index} className="text-xs text-muted-foreground flex items-start gap-1.5">
                <span className="text-primary mt-0.5">•</span>
                <span>{suggestion}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
