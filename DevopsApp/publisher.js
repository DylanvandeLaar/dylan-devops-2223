const amqp = require('amqplib');
let channel;
let connection;

let madeConnection = false;

connectQueue();
async function connectQueue() {
    try {
        connection = await amqp.connect(process.env.MESSAGE_QUEUE);
        channel = await connection.createChannel();
        await channel.assertQueue('logs', {durable: true});

        console.log('Made connection!');
        madeConnection = true;
    } catch (error) {
        console.log(error);

        if (!madeConnection) {
            setTimeout(connectQueue, 10 * 1000);
        }
    }
}

module.exports = {
    sendMessageToQueue: async function sendMessageToQueue(textMessage) {
        try {
            const message = {text: textMessage};

            console.log('sending a message to queue');

          channel.sendToQueue('logs', Buffer.from(JSON.stringify(message)), {
              contentType: 'application/json',
              persistent: true,
          });
        } catch (error) {
          console.log(error);
        }
    },
};
