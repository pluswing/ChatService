FROM node:8.12.0-alpine

ADD . /operator
WORKDIR /operator
RUN npm install
RUN npm run build

CMD npx http-server -p $PORT dist
