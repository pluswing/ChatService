FROM sandrokeil/typescript

ADD . /client
WORKDIR /client
RUN npm install
RUN npm rebuild node-sass
RUN npm run build

CMD npx http-server -p 3001 public
