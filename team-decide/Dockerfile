FROM node:current-alpine

WORKDIR /app

COPY . .
RUN npm install

ENV PORT=8080
ENV HOST="https://team-decide.fly.dev"

CMD [ "npm","run", "start" ]