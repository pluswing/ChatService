import * as redis from 'redis';
import { User } from '../repositories/User';
import { Sockets } from '../websocket/sockets';

const subClient = redis.createClient({
  host: 'redis',
});
const pubClient = redis.createClient({
  host: 'redis',
});

export const setupRedis = (sockets: Sockets) => {
  subClient.subscribe('sendUser');
  subClient.subscribe('broadcastOperators');

  subClient.on('message', (channel, message) => {
    if (channel === 'sendUser') {
      const m = JSON.parse(message);
      const u = new User('');
      u.id = m.user_id;
      sockets.sendUser(u, m.message);
    } else if (channel === 'broadcastOperators') {
      sockets.broadcastOperators(message);
    }
  });
};

export const sendUser = (user: User, message: string) => {
  pubClient.publish('sendUser', JSON.stringify({
    user_id: user.id,
    message,
  }));
};

export const broadcastOperators = (message: string) => {
  pubClient.publish('broadcastOperators', message);
};
