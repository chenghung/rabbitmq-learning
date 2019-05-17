const { connect } = require('../lib');

const ex = 'direct_logs';

const logLevel = process.argv.slice(2, 3)[0] || 'info';
const msg = process.argv.slice(3, 4)[0] || 'Hello World!';

(async function() {
  try {
    const ch = await conn.createChannel();
    ch.assertExchange(ex, 'direct', { durable:  false });

    ch.publish(ex, logLevel, new Buffer(msg));

    console.log('[x] Send', logLevel, msg);
    setTimeout(async () => {
    	await conn.close();
    }, 500);
  } catch (error) {
    console.error('error', error);
    process.exit(1);
  }
})();
