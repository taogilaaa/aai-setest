import { app } from './app';
import { runWorker } from './listener';
import { stan } from './generals/nats';

const PORT = 8080;

app.listen(PORT, () => {
  console.log(`server is running on port: http://localhost:${PORT}/`);
});

runWorker(stan);
