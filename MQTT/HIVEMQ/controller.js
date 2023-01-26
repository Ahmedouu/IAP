// username/password is set for each connected client including the controller which is also a client
const mqtt = require('mqtt')
const client = mqtt.connect('mqtt://localhost:1883', options = {
  username : 'lol', 
  password : 'mylol'
});


var deviceState = ''
var connected = false
// set up a topic for each connected device 
client.on('connect', () => {
  client.subscribe('kulliyah/level/room/device1/connected')
  client.subscribe('kulliyah/level/room/device1/state')
  client.subscribe('kulliyah/level/room/device2/connected')
  client.subscribe('kulliyah/level/room/device2/state')
})

client.on('message', (topic, message) => {   //add new cases maybe
  switch (topic) {
    case 'kulliyah/level/room/device1/connected':
      return handleDevice1Connected(message) 
    case 'kulliyah/level/room/device1/state':
      return handleDevice1State(message)
    case 'kulliyah/level/room/device2/connected':
      return handleDevice2Connected(message) 
    case 'kulliyah/level/room/device2/state':
      return handleDevice2State(message)

  }
  console.log('No handler for topic %s', topic)
})
// handlers for all devices add more handlers as we connect more devices
function handleDevice1Connected (message) {
  console.log('device 1 connected status %s', message)
  connected = (message.toString() === 'true')
}
function handleDevice2Connected (message) {
  console.log('device 2 connected status %s', message)
  connected = (message.toString() === 'true')
}

function handleDevice2State (message) {
  deviceState = message
  console.log('device 2 state update to %s', message)
}

function handleDevice1State (message) {
  deviceState = message
  console.log('device 1 state update to %s', message)
}

function openDoor () {
  // can only open door if we're connected to mqtt and door isn't already open
  if (connected && deviceState !== 'open') {
    // Ask the door to open
    client.publish('kulliyah/level/room/device1/open', 'true')
    client.publish('kulliyah/level/room/device2/open', 'true')
  }
}

function closeDoor () {
  // can only close door if we're connected to mqtt and door isn't already closed
  if (connected && deviceState !== 'closed') {
    // Ask the door to close
    client.publish('kulliyah/level/room/device1/close', 'true')
    client.publish('kulliyah/level/room/device2/close', 'true')
  }
}

// --- For Demo Purposes Only ----//

// simulate opening a door
setTimeout(() => {
  console.log('open door')
  openDoor()
}, 5000)

// simulate closing a door
setTimeout(() => {
  console.log('close door')
  closeDoor()
}, 20000)