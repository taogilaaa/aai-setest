import { Message, Stan } from 'node-nats-streaming';
import { NATS_CHANNEL, NATS_QUEUE_GROUP } from './generals/constants';

function runWorker(stan: Stan) {
  stan.on('connect', () => {
    const opts = stan.subscriptionOptions().setDurableName('image.processor');
    const subscription = stan.subscribe(NATS_CHANNEL, NATS_QUEUE_GROUP, opts);

    subscription.on('ready', () => {
      console.log('Subscription ready');
    });

    subscription.on('message', async (msg: Message) => {
      const data = msg.getData();

      try {
        console.log(data);
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
