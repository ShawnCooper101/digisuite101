import cron from 'node-cron';
import fetch from 'node-fetch';

// Placeholder imports - implement actual clients for Google Trends, RSS, YouTube, Reddit, TikTok
import { upsertTrendDocument } from '../storage/vectorStore';
import { embedText } from '../services/embeddings';

// Configuration (move to env/config)
const SCHEDULE = process.env.TREND_WATCHER_CRON || '*/30 * * * *'; // every 30 minutes
const RSS_FEEDS = (process.env.TREND_RSS_FEEDS || '').split(',').filter(Boolean);
const GOOGLE_TRENDS_REGION = process.env.GOOGLE_TRENDS_REGION || 'US';

async function fetchRssFeed(url: string) {
  try {
    const res = await fetch(url);
    const text = await res.text();
    // lightweight parse - replace with robust RSS parser
    return text.slice(0, 2000);
  } catch (err) {
    console.error('RSS fetch error', url, err);
    return null;
  }
}

async function fetchGoogleTrends() {
  // TODO: integrate google-trends-api or third-party service
  return [
    { topic: 'example trend', score: 0.8, snippet: 'Example trending topic snippet' }
  ];
}

async function fetchSocialSignals() {
  // Placeholder: integrate platform connectors to fetch trending hashtags, posts, video stats
  return [
    { channel: 'youtube', topic: 'how to start a funnel', score: 0.6 },
  ];
}

async function ingestSignal(signals: Array<any>) {
  for (const s of signals) {
    const docText = JSON.stringify(s);
    const embedding = await embedText(docText);
    await upsertTrendDocument({
      id: `trend-${Date.now()}-${Math.random().toString(36).slice(2,8)}`,
      text: docText,
      embedding,
      source: s.channel || 'google-trends',
      meta: { score: s.score || 0 }
    });
  }
}

export function startTrendWatcher() {
  console.log('Starting Trend Watcher with schedule', SCHEDULE);
  cron.schedule(SCHEDULE, async () => {
    try {
      const trendSignals = await fetchGoogleTrends();
      const rssPromises = RSS_FEEDS.map(fetchRssFeed);
      const rssResults = await Promise.all(rssPromises);
      const social = await fetchSocialSignals();

      await ingestSignal(trendSignals);
      await ingestSignal(rssResults.filter(Boolean).map((r: any) => ({ channel: 'rss', snippet: r })));
      await ingestSignal(social);

      console.log('Trend watcher run complete at', new Date().toISOString());
    } catch (err) {
      console.error('Trend watcher error', err);
    }
  });
}

// If run directly (for simple testing)
if (require.main === module) {
  startTrendWatcher();
}