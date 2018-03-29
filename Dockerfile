# specify the node base image with your desired version node:<version>
FROM node:8

# replace this with your application's default port
EXPOSE 3030

WORKDIR /app

COPY package.json /app
RUN yarn
COPY . /app

CMD yarn start
