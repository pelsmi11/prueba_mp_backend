FROM node:20.11.1-alpine3.19

WORKDIR /app

COPY package.json /app
RUN npm install

COPY . /app

CMD ["node", "src/index.js"]
