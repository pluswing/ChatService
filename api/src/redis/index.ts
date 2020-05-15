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
      const m = JSON.parse(message)
      const u = new User("")
      u.id = m.user_id
      sockets.sendUser(u, m.message)
    } else if (channel == "broadcastOperators") {
      sockets.broadcastOperators(message)
    }
  })
}

export const sendUser = (user: User, message: string) => {
  client.publish("sendUser", JSON.stringify({
    user_id: user.id,
    message
  }))
}

export const broadcastOperators = (message: string) => {
  client.publish("broadcastOperators", message)
}
