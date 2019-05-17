const amqp = require('amqplib');
const dotenv = require('dotenv');

dotenv.config();

exports.connect = async (host = process.env.HOST) => {
  const conn = await amqp.connect(host);

  return conn;
}
