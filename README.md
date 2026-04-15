```txt
npm install
npm run dev
```

```txt
npm run deploy
```

[For generating/synchronizing types based on your Worker configuration run](https://developers.cloudflare.com/workers/wrangler/commands/#types):

```txt
npm run cf-typegen
```

Pass the `CloudflareBindings` as generics when instantiation `Hono`:

```ts
// src/index.ts
const app = new Hono<{ Bindings: CloudflareBindings }>();
```

# Enviroment variables for Bun

"BUN_ENV": "development"

# Enviroment variables for JWT configuration

"JWT_ACCESS_SECRET": "your-access-secret-key-here-at-least-32-chars"
"JWT_REFRESH_SECRET": "your-refresh-secret-key-here-at-least-32-chars"
"JWT_ACCESS_EXPIRY": "15m"
"JWT_REFRESH_EXPIRY": "7d"
