const amqp = require('amqplib');

const host = 'amqp://localhost';    
const q = 'hello';

(async function() {
  const conn = await amqp.connect(host);
  const ch = await conn.createChannel();
  await ch.assertQueue(q, { durable: false });
  const handler = (msg) => {
    const json = JSON.parse(msg.content.toString());
    console.log(" [x] Received %s", json.x, json.y);
  };
  await ch.consume(q, handler);
})();

/*
amqp.connect('amqp://localhost', function(err, conn) {
  if (err) {
    console.error('connect error', err);
    process.exit(1);
  }

  conn.createChannel(function(err, ch) {
    if (err) {
      console.error('create channel error', err);
      process.exit(1);
    }

    ch.assertQueue(q, {durable: false});
    console.info(`ready to consume messages on queue(${q})`);
    ch.consume(q, function(msg) {
      console.log(typeof msg.content);
      const json = JSON.parse(msg.content.toString());
      console.log(" [x] Received %s", json.x, json.y);
    }, {noAck: true});
  });
});
*/
