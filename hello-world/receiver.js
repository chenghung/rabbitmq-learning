const { connect } = require('../lib');

const q = 'hello';

(async function() {
  const conn = await connect();
  const ch = await conn.createChannel();
  await ch.assertQueue(q, { durable: false });
  const handler = (msg) => {
    const json = JSON.parse(msg.content.toString());
    console.log(" [x] Received %s", json.x, json.y);
  };
  await ch.consume(q, handler, { noAck: true });
})();
