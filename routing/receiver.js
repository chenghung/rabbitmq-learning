const amqp = require('amqplib');

const host = 'amqp://localhost';
const ex = 'direct_logs';

const logLevels = process.argv.slice(2) || ['info'];

(async function() {
  try {
    const conn = await amqp.connect(host);
    const ch = await conn.createChannel();
    ch.assertExchange(ex, 'direct', { durable:  false });
    const queue = ch.assertQueue('', { exclusive: true });

    logLevels.forEach((l) => ch.bindQueue(queue.queue, ex, l));

    const handler = async (msg) => {
      console.log(" [x] Received %s", msg.fields.routingKey ,msg.content.toString());
    };

    await ch.consume(queue.queue, handler, { noAck: true });
  } catch (error) {
    console.error('error', error);
    process.exit(1);
  }
})();
