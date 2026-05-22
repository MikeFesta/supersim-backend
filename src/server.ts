import App from '#root/app.js';
import { initModels } from '#root/models/index.js';

const port = parseInt(process.env.PORT || '3000');

try {
  await initModels();

  const server = await App.create();
  server.app.listen(port, '0.0.0.0', () => {
    console.log(`Server listening on 0.0.0.0:${port}`);
  });
} catch (err) {
  console.error(`Failed to start server: ${(err as Error).message}`);
  process.exit(1);
}
