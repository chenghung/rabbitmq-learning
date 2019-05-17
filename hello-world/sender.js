const { connect } = require('../lib');

const q = 'hello';

(async function() {
  try {
    const conn = await connect();
    const ch = await conn.createChannel();
    const queue = await ch.assertQueue(q, { durable: false });
    const content = JSON.stringify({ x: 1, y: 2 });
    await ch.sendToQueue(q, new Buffer(content));

    console.log('[x] Send', content);
    setTimeout(async () => {
    	await conn.close();
    }, 500);
  } catch (error) {
    console.error('error', error);
    process.exit(1);
  }
})();
