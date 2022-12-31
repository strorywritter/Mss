FROM node:18-alpine as base

RUN npm install --global nodemon

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 4000

CMD ["nodemon", "index.js"]
