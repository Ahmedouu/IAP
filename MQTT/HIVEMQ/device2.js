// uername/password is set for each connected client
const mqtt = require('mqtt')
const client = mqtt.connect('mqtt://localhost:1883', options = {
  username : 'lol', 
  password : 'mylol'
});

/**
 * The state of the garage, defaults to closed
 * Possible states : closed, opening, open, closing
 */
var state = 'closed'
// each device need to be connected only to the relevant topic
client.on('connect', () => {
  client.subscribe('device2/open')
  client.subscribe('device2/close')

  // Inform controllers that device is connected
  client.publish('device2/connected', 'true')
  sendStateUpdate()
})

client.on('message', (topic, message) => {
  console.log('received message %s %s', topic, message)
  switch (topic) {
    case 'device2/open':
      return handleOpenRequest(message)
    case 'device2/close':
      return handleCloseRequest(message)
  }
})

function sendStateUpdate () {
  console.log('sending state %s', state)
  client.publish('device2/state', state)
}

function handleOpenRequest (message) {
  if (state !== 'open' && state !== 'opening') {
    console.log('opening door')
    state = 'opening'
    sendStateUpdate()

    // simulate door open after 5 seconds (would be listening to hardware)
    setTimeout(() => {
      state = 'open'
      sendStateUpdate()
    }, 5000)
  }
}

function handleCloseRequest (message) {
  if (state !== 'closed' && state !== 'closing') {
    state = 'closing'
    sendStateUpdate()

    // simulate door closed after 5 seconds (would be listening to hardware)
    setTimeout(() => {
      state = 'closed'
      sendStateUpdate()
    }, 5000)
  }
}

/**
 * Want to notify controller that device is disconnected before shutting down
 */
function handleAppExit (options, err) {
  if (err) {
    console.log(err.stack)
  }

  if (options.cleanup) {
    client.publish('device/connected', 'false')
  }

  if (options.exit) {
    process.exit()
  }
}

/**
 * Handle the different ways an application can shutdown
 */
process.on('exit', handleAppExit.bind(null, {
  cleanup: true
}))
process.on('SIGINT', handleAppExit.bind(null, {
  exit: true
}))
process.on('uncaughtException', handleAppExit.bind(null, {
  exit: true
}))