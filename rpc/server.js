const { connect } = require('../lib');

const q = 'rpc_queue';

const fib = (n) => {
  if (n < 2) {
    return n;
  }

  return fib(n - 1) + fib(n - 2);
}

const handler = async (ch, msg) => {
  const { n } = JSON.parse(msg.content.toString());

  console.log('received rpc request, n=', n);

  const replyContent = { result: fib(n) };
  const requestBody = Buffer.from(JSON.stringify(replyContent));
  const options = {
    correlationId: msg.properties.correlationId,
  }

  console.log('reply to: ', msg.properties.replyTo);

  await ch.sendToQueue(
    msg.properties.replyTo,
    requestBody,
    options,
  );

  await ch.ack(msg);

  console.log('request processed');
};

(async function() {
  try {
    const conn = await connect();
    const ch = await conn.createChannel();
    ch.prefetch(1);

    const queue = await ch.assertQueue(q, { durable: false });

    await ch.consume(
      q,
      handler.bind(null, ch),
    );
  } catch (error) {
    console.error('error', error);
    process.exit(1);
  }
})();
