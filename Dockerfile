FROM node:16.9-alpine3.11
WORKDIR /app
ADD . /app
RUN yarn install
EXPOSE 3000
CMD yarn start
