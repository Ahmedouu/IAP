const amqp = require("amqplib");
const Venue1 = {
    "id": [1711957, 182334, 18992],
    "password": "WR5X4"
};
const Venue2 = {
    "id": [1711957, 19093, 12233],
    "password": "VB345"
};
const Venue3 = {
    "id": [1711957, 19093, 198766],
    "password": "RQF55"
};
const Venue4 = {
    "id": [198766, 19093, 12233],
    "password": "ZY705"
};
connect();
async function connect() {

    try {
        const amqpServer = "amqp://localhost:9009"
        const connection = await amqp.connect(amqpServer)
        const channel = await connection.createChannel();
        await channel.assertQueue("jobs");

        channel.consume("jobs", message => {
            const input = JSON.parse(message.content.toString());
            console.log(`Recieved job with input ${input.id} and ${input.password}`)
            
            switch (input.id && input.password) {
                case (1711957 && Venue1.password): {
                    channel.ack(message); console.log(`....===>Welcome to Venue 1 ${input.id} go anywhere you want!!,...,...,`);break;
                }
                case (182334 && Venue1.password): {
                    channel.ack(message); console.log(`....===>Welcome to Venue 1 ${input.id} go anywhere you want!!.....`);break;
                }
                case (18992 && Venue1.password): {
                    channel.ack(message); console.log(`....===>Welcome to Venue 1 ${input.id} go anywhere you want!!....`);break;
                }
                case (1711957 && Venue2.password): {
                    channel.ack(message); console.log(`....===>Welcome to Venue 2 ${input.id} go anywhere you want!!...`);break;
                }
                case (19093 && Venue3.password): {
                    channel.ack(message); console.log(`....===>Welcome to VEnue 3 ${input.id} go anywhere you want....`);break;
                }
                case (198766 && Venue4.password): {
                    channel.ack(message); console.log(`....===>Welcome to AVEnue 4 ${input.id} go anywhere you want....`);break;
                }
            }
        });

        console.log("Waiting for messages...")
    }
    catch (ex) {
        console.error(ex)
    }

}
