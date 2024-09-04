FROM node:20.11.1-alpine3.19

WORKDIR /app

COPY . ./

RUN npm install

CMD npm start
