import { Message, Stan } from 'node-nats-streaming';
import {
  NATS_QUEUE_GROUP,
  IMAGE_PROCESSED_CHANNEL,
} from './generals/constants';
import Jimp from 'jimp';
import path from 'path';

function runWorker(stan: Stan) {
  stan.on('connect', () => {
    const opts = stan.subscriptionOptions().setDurableName('image.writer');
    const subscription = stan.subscribe(
      IMAGE_PROCESSED_CHANNEL,
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

      try {
        const processedImage = await Jimp.read(
          Buffer.from(image.processedImage),
        );
        const fileName = `${msg.getSequence()}.png`;
        const filePath = path.join(__dirname, '../storage', fileName);
        processedImage.write(filePath);
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
