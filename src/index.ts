import { serve } from '@hono/node-server';
import { app } from './main.js';
import { init } from './lib/db.js';
const port = Number(process.env.PORT) || 3000;

if (process.env.NODE_ENV !== 'test') {
  await init();
  serve(
    {
      fetch: app.fetch,
      port,
    },
    (info) => {
      console.log(`Server is running on http://localhost:${info.port}`);
    },
  );
}
