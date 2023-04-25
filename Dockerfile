FROM node:16-bullseye

WORKDIR /server

COPY package.json .
COPY yarn.lock .

RUN yarn

COPY . .

RUN yarn build

CMD ["node", "dist/index.js"]