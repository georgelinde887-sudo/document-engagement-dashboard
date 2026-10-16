/**
 * Document Engagement Dashboard Analytics Engine
 * Computes dwell heatmaps, funnel drop-off curves, and viewer session aggregations.
 */

class DashboardEngine {
  constructor(sessions = []) {
    this.sessions = Array.isArray(sessions) ? sessions : [];
  }

  getOverview(totalPages = 10) {
    const totalSessions = this.sessions.length;
    if (totalSessions === 0) {
      return {
        totalSessions: 0,
        averageDwellSeconds: 0,
        completionRatePercent: 0,
        pageHeatmap: [],
        funnelDropoff: [],
        topViewers: []
      };
    }

    let totalDwellAll = 0;
    let completedSessions = 0;
    const pageDwellTotals = Array(totalPages).fill(0);
    const pageViewCounts = Array(totalPages).fill(0);
    const viewerMap = new Map();

    for (const session of this.sessions) {
      const dwell = session.totalDwellSeconds || 0;
      totalDwellAll += dwell;

      if (session.completed || session.completionRatePercent >= 90) {
        completedSessions++;
      }

      // Aggregate page metrics
      (session.pages || []).forEach(p => {
        const pageIdx = p.page - 1;
        if (pageIdx >= 0 && pageIdx < totalPages) {
          pageDwellTotals[pageIdx] += (p.dwellSeconds || 0);
          if ((p.dwellSeconds || 0) > 0 || p.visited) {
            pageViewCounts[pageIdx]++;
          }
        }
      });

      // Track viewer engagement
      const email = session.viewerEmail || 'Anonymous Viewer';
      const existing = viewerMap.get(email) || { email, sessions: 0, totalDwell: 0, lastViewedAt: session.timestamp };
      existing.sessions++;
      existing.totalDwell += dwell;
      existing.lastViewedAt = session.timestamp;
      viewerMap.set(email, existing);
    }

    const averageDwellSeconds = Math.round(totalDwellAll / totalSessions);
    const completionRatePercent = Math.round((completedSessions / totalSessions) * 100);

    const pageHeatmap = pageDwellTotals.map((tot, idx) => ({
      page: idx + 1,
      totalDwellSeconds: tot,
      averageDwellSeconds: pageViewCounts[idx] > 0 ? Math.round(tot / pageViewCounts[idx]) : 0,
      viewsCount: pageViewCounts[idx]
    }));

    const funnelDropoff = pageViewCounts.map((count, idx) => ({
      page: idx + 1,
      viewersRemaining: count,
      retentionRatePercent: Math.round((count / totalSessions) * 100)
    }));

    const topViewers = Array.from(viewerMap.values())
      .sort((a, b) => b.totalDwell - a.totalDwell)
      .slice(0, 10);

    return {
      totalSessions,
      averageDwellSeconds,
      completionRatePercent,
      pageHeatmap,
      funnelDropoff,
      topViewers
    };
  }
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { DashboardEngine };
}
