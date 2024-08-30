FROM node:20.11.1-alpine3.19

WORKDIR /app

COPY package.json /app
RUN npm install

COPY . /app

EXPOSE  $PORT

ENV PORT $PORT

CMD ["node", "src/index.js"]
