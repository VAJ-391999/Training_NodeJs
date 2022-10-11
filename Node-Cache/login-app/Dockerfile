# Dockerfile
FROM node:14.17.5
# Or whatever Node version/image you want
WORKDIR /app

COPY package*.json .

RUN npm ci

COPY . .

EXPOSE 3000

CMD [ "npm", "start"]