import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API routes FIRST
  app.post("/analyze", (req, res) => {
    const { log } = req.body;
    
    // Default requested response
    let response = {
      service: "payment-service",
      root_cause: "CONTAINER_CRASH",
      // Adding extra fields to keep the UI rich, but matching the requested schema
      confidence: 87,
      recommendation: "Verify database connection string and check if the database instance is currently running."
    };

    // Add a tiny bit of logic to make it feel real
    if (log && (log.toLowerCase().includes("auth") || log.toLowerCase().includes("token"))) {
      response = {
        service: "auth-service",
        root_cause: "EXPIRED_TOKEN",
        confidence: 92,
        recommendation: "Check token expiration settings and ensure client is refreshing tokens properly."
      };
    }

    // Simulate network delay
    setTimeout(() => {
      res.json(response);
    }, 1000);
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
