import { Hono } from "hono";

const healthDocs = new Hono();

healthDocs.get("/", (c) => {
  return c.json({ message: "Welcome to the API!" });
});

healthDocs.get("/health", (c) => {
  return c.json({ status: "ok" });
});

healthDocs.get("/docs", (c) => {
  return c.json({ docs: "API documentation would go here." });
});

export default healthDocs;
