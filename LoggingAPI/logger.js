const amqp = require('amqplib');
const {db} = require('./services/database');

let madeConnection = false;

async function start() {
    try {
        const connection = await amqp.connect(process.env.MESSAGE_QUEUE);
        const channel = await connection.createChannel();
        await channel.assertQueue('logs', {durable: true});
        await channel.prefetch(1);

        channel.consume('logs', (data) => {
            const message = `${Buffer.from(data.content)}`;

            console.log('received a message from rabbitmq');
            console.log('Data received : ', message);

            const log = {
                'message': message,
            };

            db.collection('logs').insertOne(log)
                .then((log) => console.log('success: ' + log))
                .catch((err) => console.log('error: ' + err));

            channel.ack(data);
        });

        madeConnection = true;
        console.log('Made connection!');
    } catch (error) {
        console.log(error);
    }

    if (!madeConnection) {
        setTimeout(start, 10 * 1000);
    }
}

start();
