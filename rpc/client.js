const { connect } = require('../lib');

const q = 'rpc_queue';

const handler = async (ch, callbackQueue, msg) => {
  const { result } = JSON.parse(msg.content.toString());
  console.log('answer: ', result, ' ,correlationId: ', msg.properties.correlationId);

  process.exit(0);
};

(async function() {
  try {
    const conn = await connect();
    const ch = await conn.createChannel();

    const callbackQueue = await ch.assertQueue('', { durable: false });

    const requestBody = Buffer.from('{ "n": 20 }');
    const options = {
      correlationId: new Date().valueOf().toString(),
      replyTo: callbackQueue.queue
    };

    await ch.consume(
      callbackQueue.queue,
      handler.bind(null, ch, callbackQueue),
      { noAck: true },
    );

    await ch.sendToQueue(
      q,
      requestBody,
      options,
    );
  } catch (error) {
    console.error('error', error);
    process.exit(1);
  }
})();
