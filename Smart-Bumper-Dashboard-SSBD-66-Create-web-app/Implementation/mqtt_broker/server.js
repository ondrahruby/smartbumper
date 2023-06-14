//MQTT Connector package
var mqtt=require('mqtt');


//Options for the connection. Duh
options={
  username:"lenflex-smart-bumper@ttn",
  password:"NNSXS.7JPMMXCGRDENVTGDE52NTAT7GAEMHUZZZ5W45HI.D77LS5J2UTQR42W2N7UPGBYXBW4SHSEJS3H6OOBAZXJXOW5PP6QA",
  clean:true};
//eu1.cloud.thethings.network:1883 ; TLS 8883
var client = mqtt.connect("mqtt://eu1.cloud.thethings.network",options)
const topic = '/nodejs/mqtt'
//Building and connection to the service 
client.on("connect",() => {
  console.log('Connected')
  client.subscribe("/lenflex-smart-bumper@ttn/devices/up", () => {
    console.log(`Subscribe to topic /lenflex-smart-bumper@ttn/devices/up`)
  })
})

//Sample thingy, if some answer comes from the network @todo to the real thingy
client.on('message', (topic, payload) => {
  console.log('Received Message:', topic, payload.toString())
})

/*
async function loadIncomingSensor(_topic, payload) {
  console.log("new sensor data");
  const txt = new TextDecoder().decode(payload);
  const json = JSON.parse(txt);

  // Emit a global event indicating new data.
  dispatchEvent(new Event(MQTT_NEW_DATA_EVENT));

  if (!await StationManager.hasStation(json.end_device_ids.device_id)) {
    // new station registered
    const newStationKey = await Station.create({
      station_key: "...", // TODO: what to do here
      // assign to holder user.
      user_id: undefined,
      name: json.end_device_ids.device_id,
      latitude: json.uplink_message.decoded_payload.lat,
      longitude: json.uplink_message.decoded_payload.long,
      is_private: false,
      is_disabled: false,
    });

    // new station created in DB
    if (newStationKey) {
      StationManager.register(json.end_device_ids.device_id, newStationKey);
    }
  }

  
}*/
