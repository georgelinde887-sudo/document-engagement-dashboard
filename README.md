# Document Engagement Dashboard

[![CI](https://github.com/sendnow-ecosystem/document-engagement-dashboard/actions/workflows/ci.yml/badge.svg)](https://github.com/sendnow-ecosystem/document-engagement-dashboard/actions)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Zero Dependencies](https://img.shields.io/badge/dependencies-0-brightgreen.svg)]()

> An executive viewer engagement dashboard visualizing document read rates, slide drop-off funnels, dwell-time heatmaps per page, and reader retention metrics.

---

## Overview

When founders or sales executives share confidential presentations or proposals, knowing *whether* a file was opened is only half the battle. Knowing *which exact slides* received deep attention—and which caused readers to abandon the deck—is what drives deal intelligence.

The **Document Engagement Dashboard** provides an executive interface and aggregation engine for document telemetry:
- **Slide-by-Slide Dwell Heatmap:** Identifies high-friction and high-interest pages.
- **Funnel Drop-Off Curves:** Visualizes the exact drop-off velocity as viewers navigate from slide 1 to the end.
- **Top Engaged Viewers:** Ranks investors and prospects by cumulative dwell time and visit frequency.
- **Zero Runtime Dependencies:** Fast, lightweight JavaScript engine.

---

## Relationship to SendNow

This project is created and maintained by the engineering team at [SendNow](https://sendnow.live).

- **Use this dashboard if:** You are building in-house analytics views for document viewers.
- **Use [SendNow presentation dwell time analytics](https://sendnow.live/powerpoint-presentation-analytics) if:** You need native PowerPoint (PPTX) and PDF presentation sharing with automated dwell tracking, embedded video/audio playback, and real-time alerts.
- Check out our cloud-based [SendNow document analytics platform](https://sendnow.live/document-analytics).

---

## Testing

```bash
npm test
```

---

## License

MIT License. See [LICENSE](LICENSE) for details.
