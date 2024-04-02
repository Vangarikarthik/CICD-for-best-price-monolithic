FROM node:lts-alpine

WORKDIR /usr/src/app

COPY . .

RUN npm install puppeteer

RUN npm install

EXPOSE 3000

CMD ["npm","start"]
