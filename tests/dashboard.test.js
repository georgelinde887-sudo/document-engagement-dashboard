const { test, describe } = require('node:test');
const assert = require('node:assert/strict');
const { DashboardEngine } = require('../src/dashboard-engine');

describe('Document Engagement Dashboard Tests', () => {
  const sampleSessions = [
    {
      viewerEmail: 'partner@sequoia.com',
      totalDwellSeconds: 150,
      completed: true,
      timestamp: '2026-10-15T10:00:00Z',
      pages: [
        { page: 1, dwellSeconds: 40 },
        { page: 2, dwellSeconds: 60 },
        { page: 3, dwellSeconds: 50 }
      ]
    },
    {
      viewerEmail: 'associate@a16z.com',
      totalDwellSeconds: 50,
      completed: false,
      timestamp: '2026-10-15T11:00:00Z',
      pages: [
        { page: 1, dwellSeconds: 30 },
        { page: 2, dwellSeconds: 20 }
      ]
    }
  ];

  test('aggregates sessions, dwell times, and completion rates accurately', () => {
    const engine = new DashboardEngine(sampleSessions);
    const overview = engine.getOverview(3);

    assert.equal(overview.totalSessions, 2);
    assert.equal(overview.averageDwellSeconds, 100);
    assert.equal(overview.completionRatePercent, 50);

    // Page 1 retention: both viewers saw page 1 (100%)
    assert.equal(overview.funnelDropoff[0].retentionRatePercent, 100);
    // Page 3 retention: only 1 viewer reached page 3 (50%)
    assert.equal(overview.funnelDropoff[2].retentionRatePercent, 50);

    // Top viewers: partner@sequoia should be #1
    assert.equal(overview.topViewers[0].email, 'partner@sequoia.com');
    assert.equal(overview.topViewers[0].totalDwell, 150);
  });
});
