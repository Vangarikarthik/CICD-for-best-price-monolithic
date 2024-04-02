FROM node:lts-alpine

WORKDIR /usr/src/app

COPY . .

RUN npm install puppeteer

RUN npm install


CMD ["npm","start"]
