const { connect } = require('../lib');

const q = 'tasks';

(async function() {
  try {
    const conn = await connect();
    const ch = await conn.createChannel();
    const queue = await ch.assertQueue(q, { durable: true });
    const content = JSON.stringify({ x: 1, y: 2 });
    await ch.sendToQueue(q, new Buffer(content), { persistent: true });

    console.log('[x] Send', content);
    setTimeout(async () => {
    	await conn.close();
    }, 500);
  } catch (error) {
    console.error('error', error);
    process.exit(1);
  }
})();
