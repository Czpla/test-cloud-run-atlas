FROM node:18-alpine

WORKDIR /usr/src/app

ARG MONGODB_URI
ENV MONGODB_URI ${MONGODB_URI}

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 80

CMD [ "npm", "start" ]
