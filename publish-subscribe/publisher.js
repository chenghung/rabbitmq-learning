const { connect } = require('../lib');

const ex = 'logs';
const q = 'hello';

(async function() {
  try {
    const conn = await connect();
    const ch = await conn.createChannel();
    ch.assertExchange(ex, 'fanout', { durable:  false });

    const content = JSON.stringify({ time: new Date() });
    ch.publish(ex, '', new Buffer(content));

    console.log('[x] Send', content);
    setTimeout(async () => {
    	await conn.close();
    }, 500);
  } catch (error) {
    console.error('error', error);
    process.exit(1);
  }
})();
