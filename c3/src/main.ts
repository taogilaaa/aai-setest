import { stan } from './generals/nats';
import { runWorker } from './listener';

runWorker(stan);
