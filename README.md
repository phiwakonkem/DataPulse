# DataPulse

A real-time analytics dashboard that visualizes live metrics — revenue, active users, requests/sec, and error rates — updating continuously with smooth, animated charts.

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react) ![TypeScript](https://img.shields.io/badge/TypeScript-6-blue?logo=typescript) ![Recharts](https://img.shields.io/badge/Recharts-3-8884d8) ![TanStack Query](https://img.shields.io/badge/TanStack_Query-5-FF4154) ![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite)

---

## Features

- **Live metric tiles** — active users, requests/sec, error rate, average response time, refreshing every 2 seconds
- **Revenue area chart** (24h) — gradient-filled trend visualization
- **Active users line chart** (24h)
- **API requests vs errors bar chart** (24h)
- **Dark analytics UI** styled with Tailwind CSS and Recharts

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 19 |
| Language | TypeScript |
| Build tool | Vite 8 |
| Charts | Recharts |
| Data fetching | TanStack Query |
| Real-time (planned) | Socket.IO client |
| Styling | Tailwind CSS |

## How Data Works Right Now

DataPulse currently generates **simulated data client-side** — 24 hourly data points are randomly generated on load, and the live metric tiles tick with small random deltas every 2 seconds via `setInterval`. This means **you can run and demo the full UI with no backend at all.**

The `socket.io-client` dependency is included for a planned next step: replacing the simulated data with a real-time feed from a backend metrics service.

## Getting Started

### Prerequisites

- Node.js 20+

### 1. Clone the repository

```bash
git clone https://github.com/phiwakonkem/DataPulse.git
cd DataPulse
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run the development server

```bash
npm run dev
```

Visit the URL Vite prints (typically [http://localhost:5173](http://localhost:5173)). No backend setup needed — it works out of the box with simulated data.

## Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the Vite dev server |
| `npm run build` | Type-check and build for production |
| `npm run lint` | Run ESLint |
| `npm run preview` | Preview the production build locally |

## Roadmap

- [ ] Replace simulated data with a real Socket.IO backend feed
- [ ] Add date-range selection for historical charts
- [ ] Add export (CSV/PNG) for charts

## Author

**Phiwakonke Mthethwa**
Full-Stack Developer, Centurion, South Africa

- GitHub: [@phiwakonkem](https://github.com/phiwakonkem)
- LinkedIn: [phiwakonke-mthethwa](https://www.linkedin.com/in/phiwakonke-mthethwa-97aa74331)
- Email: phiwakonkem@gmail.com
