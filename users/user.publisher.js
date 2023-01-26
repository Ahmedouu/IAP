const amqp = require("amqplib");

const msg = {id: process.argv[2],
            password: process.argv[3]}
connect();
async function connect() {

    try {
        const amqpServer = "amqp://localhost:9009"
        const connection = await amqp.connect(amqpServer)
        const channel = await connection.createChannel();
        await channel.assertQueue("jobs");
        await channel.sendToQueue("jobs", Buffer.from(JSON.stringify(msg)));
        //await channel.sendToQueue("jobs", Buffer.from(msg))
        console.log(`Job sent successfully ${msg.id} with ${msg.password}`);
        await channel.close();
        await connection.close();
    }
    catch (ex){
        console.error(ex)
    }

}