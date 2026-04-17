import app from "./main/server";

// Log de informações de desenvolvimento
const isDevelopment = process.env.BUN_ENV === "development";
console.log(
  "🔍 CORS Mode: BUN_ENV=" +
    process.env.BUN_ENV +
    ", isDevelopment=" +
    isDevelopment,
);
console.log("🚀 Starting server in development mode...");

// Em desenvolvimento com Wrangler, o servidor é iniciado automaticamente
// Este arquivo serve apenas para configuração adicional se necessário

// Exportar o app para que o Wrangler possa usá-lo
export default app;

// Log adicional para confirmar que o arquivo foi carregado
console.log("📦 Development configuration loaded successfully");
