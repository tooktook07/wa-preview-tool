export interface ReadabilityMetrics {
  fleschScore: number;
  fleschLevel: string;
  readingTimeSeconds: number;
  avgSentenceLength: number;
  longSentenceIndexes: number[];
  totalWords: number;
  totalSentences: number;
  complexity: 'easy' | 'standard' | 'difficult' | 'very-difficult';
  suggestions: string[];
}

function countSyllables(word: string): number {
  word = word.toLowerCase();
  if (word.length <= 3) return 1;
  
  // Remove non-letters
  word = word.replace(/[^a-z]/g, '');
  
  // Count vowel groups
  const vowels = word.match(/[aeiouy]+/g);
  let syllables = vowels ? vowels.length : 1;
  
  // Adjust for silent 'e'
  if (word.endsWith('e')) syllables--;
  
  // Ensure at least 1 syllable
  return Math.max(syllables, 1);
}

function getSentences(text: string): string[] {
  // Split by sentence-ending punctuation
  const sentences = text
    .split(/[.!?]+/)
    .map(s => s.trim())
    .filter(s => s.length > 0);
  
  return sentences;
}

function getWords(text: string): string[] {
  // Split by whitespace and filter empty
  return text
    .split(/\s+/)
    .filter(w => w.trim().length > 0);
}

function getFleschLevel(score: number): string {
  if (score >= 90) return 'Very Easy';
  if (score >= 80) return 'Easy';
  if (score >= 70) return 'Fairly Easy';
  if (score >= 60) return 'Standard';
  if (score >= 50) return 'Fairly Difficult';
  if (score >= 30) return 'Difficult';
  return 'Very Confusing';
}

function getComplexity(score: number): 'easy' | 'standard' | 'difficult' | 'very-difficult' {
  if (score >= 70) return 'easy';
  if (score >= 50) return 'standard';
  if (score >= 30) return 'difficult';
  return 'very-difficult';
}

function generateSuggestions(metrics: Partial<ReadabilityMetrics>): string[] {
  const suggestions: string[] = [];
  
  if (metrics.longSentenceIndexes && metrics.longSentenceIndexes.length > 0) {
    suggestions.push(`Break ${metrics.longSentenceIndexes.length} long sentence${metrics.longSentenceIndexes.length > 1 ? 's' : ''} into shorter ones`);
  }
  
  if (metrics.fleschScore !== undefined && metrics.fleschScore < 50) {
    suggestions.push('Use simpler words and shorter sentences');
  }
  
  if (metrics.avgSentenceLength !== undefined && metrics.avgSentenceLength > 25) {
    suggestions.push('Average sentence is too long - aim for 15-20 words');
  }
  
  if (metrics.totalSentences !== undefined && metrics.totalSentences > 5) {
    suggestions.push('Consider using bullet points or numbered lists');
  }
  
  return suggestions;
}

export function analyzeReadability(text: string): ReadabilityMetrics | null {
  // Don't analyze empty or very short texts
  if (!text || text.trim().length < 10) {
    return null;
  }
  
  // Clean text (remove WhatsApp formatting markers)
  const cleanText = text
    .replace(/[*_~`]/g, '') // Remove formatting markers
    .replace(/^\s*[-•]\s/gm, '') // Remove bullet points
    .replace(/^\s*\d+\.\s/gm, '') // Remove numbered lists
    .replace(/^>\s/gm, ''); // Remove quotes
  
  const sentences = getSentences(cleanText);
  const words = getWords(cleanText);
  
  // Need at least 1 sentence and 1 word
  if (sentences.length === 0 || words.length === 0) {
    return null;
  }
  
  // Calculate total syllables
  const totalSyllables = words.reduce((sum, word) => sum + countSyllables(word), 0);
  
  // Calculate Flesch Reading Ease Score
  // Formula: 206.835 - 1.015 * (total words / total sentences) - 84.6 * (total syllables / total words)
  const wordsPerSentence = words.length / sentences.length;
  const syllablesPerWord = totalSyllables / words.length;
  const fleschScore = Math.max(
    0,
    Math.min(100, 206.835 - 1.015 * wordsPerSentence - 84.6 * syllablesPerWord)
  );
  
  // Calculate reading time (average 200 words per minute)
  const readingTimeSeconds = Math.ceil((words.length / 200) * 60);
  
  // Calculate average sentence length
  const avgSentenceLength = Math.round(words.length / sentences.length);
  
  // Find long sentences (>25 words)
  const longSentenceIndexes: number[] = [];
  sentences.forEach((sentence, index) => {
    const sentenceWords = getWords(sentence);
    if (sentenceWords.length > 25) {
      longSentenceIndexes.push(index);
    }
  });
  
  const metrics: Partial<ReadabilityMetrics> = {
    fleschScore: Math.round(fleschScore),
    fleschLevel: getFleschLevel(fleschScore),
    readingTimeSeconds,
    avgSentenceLength,
    longSentenceIndexes,
    totalWords: words.length,
    totalSentences: sentences.length,
    complexity: getComplexity(fleschScore),
  };
  
  metrics.suggestions = generateSuggestions(metrics);
  
  return metrics as ReadabilityMetrics;
}
