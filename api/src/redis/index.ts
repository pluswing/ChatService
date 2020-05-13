import * as redis from "redis";
import { Sockets } from "../websocket/sockets"
import { User } from "../repositories/User";
const client = redis.createClient({
  host: "redis"
});

export const setupRedis = (sockets: Sockets) => {
  client.subscribe("sendUser");
  client.subscribe("broadcastOperators");

  client.on("message", (channel, message) => {
    if (channel == "sendUser") {
      // message
      // sockets.sendUser(message)
    } else if (channel == "broadcastOperators") {
    }
  })
}

export const sendUser = (user: User, message: string) => {
  client.publish("sendUser", message)
}
export const broadcastOperators = (message: string) => {
  client.publish("broadcastOperators", message)
}
