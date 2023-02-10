FROM node:18

RUN mkdir -p /app
WORKDIR /app

COPY package.json /app/
RUN yarn

COPY . .
RUN yarn build

CMD yarn start