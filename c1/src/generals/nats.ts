/* eslint-disable @typescript-eslint/ban-types */
import { connect } from 'node-nats-streaming';
import { v4 as uuid } from 'uuid';
import {
  NATS_CLUSTER,
  NATS_STREAMING_URL,
  IMAGE_UPLOADED_CHANNEL,
} from './constants';

const clientId = uuid();

const stan = connect(NATS_CLUSTER, uuid(), { url: NATS_STREAMING_URL });

async function sendMessage(message: object): Promise<string> {
  const stan = connect(NATS_CLUSTER, clientId, { url: NATS_STREAMING_URL });
  const jsonMessage = JSON.stringify(message);

  return new Promise((resolve, reject) => {
    stan.on('connect', () => {
      console.log(
        {
          natsCluster: NATS_CLUSTER,
          clientId,
          url: NATS_STREAMING_URL,
        },
        'Nats Connected',
      );

      stan.publish(IMAGE_UPLOADED_CHANNEL, jsonMessage, (err, guid) => {
        stan.close();

        if (err) {
          console.error({ err }, 'sendMessage Error');
          reject(err);
        }

        console.log({ guid }, 'sendMessage Success');
        resolve(guid);
      });
    });
  });
}

export { sendMessage, stan };
