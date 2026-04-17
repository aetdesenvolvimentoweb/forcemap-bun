import { makeGlobalLogger } from "./main/factories/logger";
import app from "./main/server";

const logger = makeGlobalLogger();

// Configurações para simulação de produção local
const port = Number(process.env.PORT) || 3333;
const host = process.env.SERVER_HOST || "http://localhost";
const environment = process.env.BUN_ENV || "production";

// Log de inicialização em modo produção
logger.info("🚀 Starting server in production mode", {
  port,
  host,
  environment,
  simulated: true, // Indica que é simulação local
});

// Em produção real (Cloudflare Workers), o Wrangler cuida da inicialização
// Este arquivo serve para configuração e logs de produção local

// Simular inicialização bem-sucedida
logger.info(`✅ Server simulation running at ${host}:${port}/api/v1`, {
  port,
  host,
  environment,
  note: "This is a local simulation. Use 'wrangler deploy' for real production.",
});

// Exportar o app para compatibilidade
export default app;
