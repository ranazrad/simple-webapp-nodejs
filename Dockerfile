FROM node:18.16.1-bullseye-slim

COPY . .

RUN npm install

ENTRYPOINT ["npm", "start"]