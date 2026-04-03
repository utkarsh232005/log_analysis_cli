# Log Analysis CLI

A web-based log analysis tool that helps developers and DevOps engineers quickly identify the **root cause** of system errors and failures by analyzing raw log output. Built with React, TypeScript, and an Express backend, it provides an intuitive interface for paste-and-analyze log inspection alongside a real-time service health dashboard.

---

## Features

- **Log Analyzer** — Paste any stack trace or error log and instantly receive:
  - The affected **service** (e.g., `payment-service`, `auth-service`)
  - The identified **root cause** (e.g., `CONTAINER_CRASH`, `EXPIRED_TOKEN`)
  - A **confidence score** showing how certain the analysis is
  - An actionable **recommendation** to resolve the issue

- **System Dashboard** — At-a-glance view of your services including:
  - Live status (UP / DOWN) for each service
  - Uptime percentage and average latency
  - Recent alerts with severity levels (critical / warning)

- **Powered by Gemini AI** — Integrates with Google's Gemini API for intelligent log interpretation

---

## Tech Stack

| Layer      | Technology                              |
|------------|-----------------------------------------|
| Frontend   | React 19, TypeScript, TailwindCSS v4    |
| Backend    | Node.js, Express                        |
| Build Tool | Vite 6                                  |
| AI         | Google Gemini (`@google/genai`)         |
| Icons      | Lucide React                            |
| Animation  | Motion                                  |

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- A [Gemini API key](https://aistudio.google.com/app/apikey)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/utkarsh232005/log_analysis_cli.git
   cd log_analysis_cli
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure your API key:**

   Copy the example env file and add your Gemini API key:
   ```bash
   cp .env.example .env.local
   ```
   Then open `.env.local` and set:
   ```
   GEMINI_API_KEY=your_api_key_here
   ```

4. **Start the development server:**
   ```bash
   npm run dev
   ```

   The app will be available at `http://localhost:3000`.

---

## Usage

1. Navigate to the **Log Analyzer** page.
2. Paste your error log or stack trace into the text area.
3. Click **Analyze Log**.
4. View the detected service, root cause, confidence score, and recommended fix.

Visit the **Dashboard** page to monitor service health and recent system alerts.

---

## Project Structure

```
log_analysis_cli/
├── src/
│   ├── pages/
│   │   ├── LogAnalyzer.tsx   # Log input and analysis result UI
│   │   └── Dashboard.tsx     # Service status and alerts overview
│   ├── App.tsx               # App routing and layout
│   ├── main.tsx              # React entry point
│   └── index.css             # Global styles
├── server.ts                 # Express server with /analyze API endpoint
├── vite.config.ts            # Vite build configuration
├── tsconfig.json             # TypeScript configuration
└── package.json
```

---

## Available Scripts

| Command           | Description                              |
|-------------------|------------------------------------------|
| `npm run dev`     | Start development server (Express + Vite)|
| `npm run build`   | Build the frontend for production        |
| `npm run preview` | Preview the production build             |
| `npm run lint`    | Type-check the project with TypeScript   |
| `npm run clean`   | Remove the `dist` build folder           |

---

## API Reference

### `POST /analyze`

Analyzes a log entry and returns the diagnosis.

**Request body:**
```json
{ "log": "<your log text here>" }
```

**Response:**
```json
{
  "service": "payment-service",
  "root_cause": "CONTAINER_CRASH",
  "confidence": 87,
  "recommendation": "Verify database connection string and check if the database instance is currently running."
}
```

---

## License

This project is open source. See the repository for details.
