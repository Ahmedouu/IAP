const mqtt = require('mqtt');

//connection vars
let broker_host = 'localhost';
let broker_port = 1883;
let client_id = 'levelHandler';

//publish variables 

let pub_topic = 'kulliyah/lvl/room/device';
let message = 'lock all doors, order coming from ' + client_id.toString();
let pub_options = {qos: 0, retain: false};

//subscribe variables
let sub_topic = 'kulliyah/lvl/room/+';
let sub_options = {qos: 0};

const connection_options = {
  port: broker_port,
  host: broker_host,
  client_id: client_id, 
  reconnectPeriod: 5000 ,// try reconnecting
  username: 'perkio',
  password: 'perkio'
};

const client = mqtt.connect(connection_options);

client.on(message, (topic, message)=>{
  console.log('Recieved message ' + message.toString() + 'on topic '+ topic.toString());

});

client.on('connect', async function(){

  console.log('connection succesful');
  client.subscribe(sub_topic, sub_options, (err)=>{

    if (err) {
      console.log('An error occurred while subscribing');
    }else {
      console.log('Subscribed successfully to ' + sub_topic.toString() + ' ' + message);
    }

  });
  while (client.connected){
    client.publish(pub_topic, message, pub_options, function(err){
      if (err){
        console.log('An error occurred during publishing')
      } else {
        console.log('Published successfully to ' + pub_topic.toString() + ' '+message)
      }
    });
    // 5 secs delay
    await new Promise(resolve => setTimeout(resolve, 5000));
  }
})

//Handle errors

client.on('error', (error)=> {
  console.log('Error occurred: '+ error);
});

//Notify offline status
client.on("offline", ()=>{
  console.log("Currently offline. Please check your internet!!");
});

