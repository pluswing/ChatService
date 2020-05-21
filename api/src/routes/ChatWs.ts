import * as Express from 'express';
import * as ExpressWs from 'express-ws';
import sockets from '../websocket/sockets';

import * as jwt from 'jsonwebtoken';
import { broadcastOperators, sendUser } from '../redis';
import { OperatorDAO } from '../repositories/Operator';
import { UserDAO } from '../repositories/User';
import { UserMessage, UserMessageDAO } from '../repositories/UserMessage';

const bind = (path: string, originalApp: Express.Application) => {
  const { app, getWss, applyTo } = ExpressWs(originalApp);

  applyTo(Express.Router());

  getWss().clients.forEach((ws) => {
    if (ws.readyState !== ws.OPEN) {
      ws.terminate();
      return;
    }
    ws.ping();
  });

  // {method: 'register', uid: 'xxxxxxxxx'}
  // {method: 'post', to: 'xxxxxxx', body: '......'}

  const userDao = new UserDAO();
  const userMessageDao = new UserMessageDAO();
  const operatorDao = new OperatorDAO();

  app.ws(path, (ws, req) => {
    ws.on('message', async (msg) => {

      const m = JSON.parse(msg.toString());
      console.log(m);
      if (m.method === 'register') {
        // 登録処理 (オペレータのみ)
        if (m.isOperator) {
          const decoded: any = jwt.verify(m.token, process.env.SECRET || '');
          const operator = await operatorDao.find(decoded.sub);
          if (operator != null) {
            sockets.addOperatorSocket(operator, ws);
          }
        }
        ws.send(msg);
      }

      if (m.method === 'disconnect') {
        if (m.isOperator) {
          const decoded: any = jwt.verify(m.token, process.env.SECRET || '');
          const operator = await operatorDao.find(decoded.sub);
          if (operator != null) {
            sockets.removeOperatorSocket(operator);
          }
        } else {
          const u = await userDao.findOrCreate(m.uid);
          sockets.removeUserSocket(u);
        }
      }

      if (m.method === 'post') {
        const u = await userDao.findOrCreate(m.uid);
        sockets.addUserSocket(u, ws);
        const um = new UserMessage(u.id, m.message);
        await userMessageDao.add(um);
        const resp = JSON.stringify({
          method: 'post',
          body: um.body,
          id: um.id,
          operatorId: null,
          createdAt: um.createdAt,
          uid: u.uid,
        });
        // sockets.sendUser(u, resp);
        sendUser(u, resp);
        // sockets.broadcastOperators(resp);
        broadcastOperators(resp);
      }

      if (m.method === 'histories') {
        const u = await userDao.find(m.uid);
        // ユーザが登録されていなければ、空を返す。
        //  -> ユーザが登録されるタイミングは、初回メッセージ送信時。
        if (!u) {
          console.log('user not found!');
          ws.send(JSON.stringify({
            method: 'histories',
            histories: [],
          }));
          return;
        }

        sockets.addUserSocket(u, ws);
        const histories = await userMessageDao.histories(u);
        // sockets.sendUser(u, JSON.stringify({
        //   method: 'histories',
        //   histories,
        // }));
        sendUser(u, JSON.stringify({
          method: 'histories',
          histories,
        }));
      }
    });
  });
};

export default {
  bind,
};
