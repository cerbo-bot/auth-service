FROM node:14-alpine

WORKDIR /app

COPY package*.json ./

COPY yarn.lock ./

RUN yarn install

COPY . .

ENV PORT=4000

EXPOSE 4000

CMD ["yarn", "start"]