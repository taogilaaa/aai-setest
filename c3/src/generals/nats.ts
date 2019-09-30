import { connect } from 'node-nats-streaming';
import { NATS_CLUSTER, NATS_STREAMING_URL, NATS_CLIENT_ID } from './constants';

const stan = connect(
  NATS_CLUSTER,
  NATS_CLIENT_ID,
  { url: NATS_STREAMING_URL },
);

export { stan };
