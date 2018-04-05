const amqp = require('amqplib/callback_api');

const q = 'hello';

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
    // Note: on Node 6 Buffer.from(msg) should be used
    ch.sendToQueue(q, new Buffer('Hello World!'));
    console.log(" [x] Sent 'Hello World!'");
  });

  setTimeout(function() { conn.close(); process.exit(0) }, 5000);
});
