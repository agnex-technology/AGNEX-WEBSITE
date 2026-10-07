// AGNEX Technology — AI Slop Website Auditor
// Duplicate Content & Semantic Similarity Clustering Subsystem

import { DuplicateCluster } from './types';

interface PageTextItem {
  id: string;
  url: string;
  path: string;
  title: string;
  text: string;
}

/**
 * Tokenizes text into word 3-grams for min-hash / Jaccard similarity estimation
 */
function extractShingles(text: string): Set<string> {
  const words = text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, '')
    .split(/\s+/)
    .filter(w => w.length > 2);

  const shingles = new Set<string>();
  for (let i = 0; i < words.length - 2; i++) {
    shingles.add(`${words[i]} ${words[i + 1]} ${words[i + 2]}`);
  }
  return shingles;
}

/**
 * Calculates Jaccard similarity between two sets of shingles (0.0 to 1.0)
 */
function calculateJaccardSimilarity(setA: Set<string>, setB: Set<string>): number {
  if (setA.size === 0 || setB.size === 0) return 0;
  let intersection = 0;
  for (const s of setA) {
    if (setB.has(s)) intersection++;
  }
  const union = setA.size + setB.size - intersection;
  return union === 0 ? 0 : intersection / union;
}

/**
 * Identifies duplicate or programmatic boilerplate page clusters across crawled URLs.
 */
export function detectDuplicateClusters(pages: PageTextItem[], similarityThreshold = 0.55): DuplicateCluster[] {
  if (pages.length < 2) return [];

  const shinglesMap = new Map<string, Set<string>>();
  pages.forEach(p => {
    shinglesMap.set(p.id, extractShingles(p.text));
  });

  const clusters: DuplicateCluster[] = [];
  const assigned = new Set<string>();

  for (let i = 0; i < pages.length; i++) {
    const pageA = pages[i];
    if (assigned.has(pageA.id)) continue;

    const currentClusterPages = [pageA];
    let highestSim = 0;

    for (let j = i + 1; j < pages.length; j++) {
      const pageB = pages[j];
      if (assigned.has(pageB.id)) continue;

      const sim = calculateJaccardSimilarity(shinglesMap.get(pageA.id)!, shinglesMap.get(pageB.id)!);
      if (sim >= similarityThreshold) {
        currentClusterPages.push(pageB);
        if (sim > highestSim) highestSim = sim;
      }
    }

    if (currentClusterPages.length > 1) {
      currentClusterPages.forEach(p => assigned.add(p.id));
      const simPct = Math.round(highestSim * 100);

      clusters.push({
        id: `cluster-${clusters.length + 1}`,
        similarityPercentage: simPct,
        representativeTheme: `${pageA.title || pageA.path} (Template Duplication)`,
        explanation: `${currentClusterPages.length} pages exhibit ${simPct}% structural text similarity. These appear to be programmatically generated or clone pages with identical paragraph bodies and localized keyword swaps.`,
        pages: currentClusterPages.map(p => ({
          url: p.url,
          path: p.path,
          title: p.title,
          snippet: p.text.slice(0, 140) + '...'
        }))
      });
    }
  }

  return clusters;
}
