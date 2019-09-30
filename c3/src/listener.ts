import { Message, Stan } from 'node-nats-streaming';
import {
  IMAGE_UPLOADED_CHANNEL,
  NATS_QUEUE_GROUP,
  IMAGE_PROCESSED_CHANNEL,
} from './generals/constants';

function runWorker(stan: Stan) {
  stan.on('connect', () => {
    const opts = stan.subscriptionOptions().setDurableName('image.processor');
    const subscription = stan.subscribe(
      IMAGE_UPLOADED_CHANNEL,
      NATS_QUEUE_GROUP,
      opts,
    );

    subscription.on('ready', () => {
      console.log('Subscription ready');
    });

    subscription.on('message', async (msg: Message) => {
      console.log(`Incoming Message: ${msg.getSequence()}`);
      const data = msg.getData();
      const image = JSON.parse(String(data));
      const imageSize = image.size / Math.pow(1024, 1);

      try {
        stan.publish(
          IMAGE_PROCESSED_CHANNEL,
          JSON.stringify({ size: imageSize }),
          (err) => {
            console.log({ err }, 'Message Published');
          },
        );
      } catch (error) {
        console.error(error);
      }
    });
  });

  stan.on('error', (reason) => {
    console.error(reason);
  });

  stan.on('close', () => {
    console.error('Connection Closed');
    process.exit();
  });
}

export { runWorker };
