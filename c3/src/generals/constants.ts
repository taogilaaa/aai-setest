import { v4 as uuid } from 'uuid';

export const NATS_STREAMING_URL =
  process.env.NATS_STREAMING_URL ?? 'nats://localhost:4222';
export const IMAGE_UPLOADED_CHANNEL = 'image.uploaded';
export const IMAGE_PROCESSED_CHANNEL = 'image.processed';
export const NATS_QUEUE_GROUP = 'image.uploaded.worker';
export const NATS_CLUSTER = 'test-cluster';
export const NATS_CLIENT_ID = uuid();
