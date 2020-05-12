import * as redis from "redis";
const client = redis.createClient({
  host: "redis"
});

client.subscribe("userMessage");
client.on("message", (channel, message) => {
  if (channel == "userMessage") {
    // message
  }
})

// client.publish("userMessage", message)
