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
    console.info(`ready to consume messages on queue(${q})`);
    ch.consume(q, function(msg) {
      console.log(" [x] Received %s", msg.content.toString());
    }, {noAck: true});
  });
});
