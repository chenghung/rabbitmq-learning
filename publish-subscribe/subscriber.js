const { connect } = require('../lib');

const ex = 'logs';

(async function() {
  const conn = await connect();
  const ch = await conn.createChannel();
  ch.assertExchange(ex, 'fanout', { durable: false });
  const queue = await ch.assertQueue('', { exclusive: true });
  console.log('queue name: ', queue.queue);
  await ch.bindQueue(queue.queue, ex, '');
  const handler = async (msg) => {
    const json = JSON.parse(msg.content.toString());
    console.log(" [x] Received %s", json.time);
  };
  await ch.consume(queue.queue, handler);
})();

