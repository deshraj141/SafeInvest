# SafeInvest.ai — AI-Powered Investment Research Dashboard

SafeInvest.ai is a complete, production-ready full-stack AI Investment Research Dashboard built using the MERN stack (without database dependencies, relying on localStorage for state persistence) and integrating Google Gemini API for deep business insights.

The user interface follows premium design systems (inspired by Linear, Vercel, and TradingView) with high-fidelity components, robust error checking, and seamless dark/light mode class transitions.

## 🚀 Features

- **🏠 Interactive Dashboard**: Welcome banners, real-time market indices mock tables, recent timeline activities, quick research metrics, and search widgets.
- **🔍 AI Company Analyzer**: Analyze any global ticker or company name. Returns deep insights, including revenue metrics, business models, SWOT evaluations, news summaries, and investment buy/sell metrics.
- **📂 Workspace Tabs**: Dual-theme Chrome-style tabs supporting opening, closing, switching, pinning, and mobile scrolling for up to 8 assets.
- **⚖ Compare Assets**: Compare up to 4 assets side-by-side. Highlights winning metrics and displays an advanced **AI Winner Card** detailing the ideal investor profile and long-term viability.
- **💡 AI Quick Actions**: Populate search fields instantly using recommended prompts for terminology (P/E ratio, ROE) or asset tickers.
- **🌓 Dynamic Dark Mode**: Tailwind class-based theme switcher that persists choices inside localStorage.

---

## 🛠 Project Structure

```
investment-research-dashboard/
├── client/
│   ├── src/
│   │   ├── components/      # Logo.jsx, MetricCard.jsx, SearchBar.jsx, WorkspaceTabs.jsx, Layout.jsx
│   │   ├── pages/           # Dashboard.jsx, Analyze.jsx, Compare.jsx, About.jsx
│   │   ├── hooks/           # useLocalStorage.js
│   │   ├── services/        # api.js (Axios base instance)
│   │   ├── constants/       # companies.js (popular company metadata)
│   │   ├── utils/           # helpers.js (initials, avatar gradients)
│   │   ├── App.jsx          # Route mapping and dark mode toggles
│   │   └── main.jsx
│   ├── tailwind.config.js
│   └── vite.config.js
├── server/
│   ├── controllers/         # analyzeController.js
│   ├── routes/              # analyzeRoutes.js
│   ├── services/            # geminiService.js (Gemini API Integration)
│   ├── utils/               # prompts.js (System prompts for JSON extraction)
│   ├── app.js               # Express application settings
│   └── server.js            # Node startup hook
└── README.md
```

---

## ⚙ Environment Variables

To operate the backend successfully, create a `.env` file in the `server/` directory:

```env
PORT=5000
GEMINI_API_KEY=your_google_gemini_api_key_here
NODE_ENV=development
```

Get your Gemini API Key from the [Google AI Studio](https://aistudio.google.com/).

---

## 💻 Installation & Local Development

### 1. Clone the repository
Navigate to the root directory `c:\Users\Deshraj\Desktop\AI-Investmet`.

### 2. Configure Backend Server
```bash
cd server
npm install
```
Create your `.env` file and insert your `GEMINI_API_KEY`.
Start the backend dev server:
```bash
npm run dev
```
The server will boot up at `http://localhost:5000`. You can inspect the health check at `http://localhost:5000/health`.

### 3. Configure Frontend Client
In a new terminal window:
```bash
cd client
npm install
```
Start the local Vite server:
```bash
npm run dev
```
Vite will serve the frontend at `http://localhost:5173`. Any API queries sent to `/api/*` are dynamically proxied to port `5000` via `vite.config.js`.

---

## 🤖 How Gemini API Works

SafeInvest.ai communicates with the Gemini model `gemini-1.5-flash` using standard HTTP POST requests. 

1. **System Instruction Enforcement**: System prompts in `server/utils/prompts.js` specify strict JSON schemas for the response format.
2. **Structured JSON Output**: The backend configures `generationConfig: { responseMimeType: "application/json" }` to guarantee Gemini returns structured, valid, parseable JSON text.
3. **Data Scrubbing**: The backend parses code boundaries, stripping away markdown boundaries before decoding the JSON and forwarding it to the React client.

---

## ⚡ Deployment

### Frontend (Vercel)
Ensure that you configure the production API base URL or deploy client and server components synchronously. 
For standalone client deployments, configure Vercel rewrite headers inside `vercel.json` if needed to proxy api paths.

### Backend (Render)
1. Deploy `server/` subdirectory as a Web Service.
2. Inject `GEMINI_API_KEY` into Environment variables configuration.
3. Update the origin inside `server/app.js` if you wish to restrict CORS to your Vercel client domain.
