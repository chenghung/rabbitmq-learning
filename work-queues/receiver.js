const { connect } = require('../lib');

const q = 'tasks';

(async function() {
  const conn = await connect();
  const ch = await conn.createChannel();
  await ch.assertQueue(q, { durable: true });
  const handler = async (msg) => {
    const json = JSON.parse(msg.content.toString());
    console.log(" [x] Received %s", json.x, json.y);
    await ch.ack(msg);
  };
  await ch.consume(q, handler);
})();

