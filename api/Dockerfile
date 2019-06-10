FROM sandrokeil/typescript

RUN apk update && apk add mysql-client git

ADD . /api
WORKDIR /api
RUN npm install

CMD npm start
