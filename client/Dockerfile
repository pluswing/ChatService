FROM sandrokeil/typescript

ARG API_ENDPOINT
ARG API_ENDPOINT_WS

ENV API_ENDPOINT $API_ENDPOINT
ENV API_ENDPOINT_WS $API_ENDPOINT_WS

ADD . /client
WORKDIR /client
RUN npm install
RUN npm rebuild node-sass
RUN npm run build

CMD npx http-server -p 3001 public
