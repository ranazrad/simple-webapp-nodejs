FROM node:8
workdir /app
COPY . .
RUN npm install
RUN npm run test
EXPOSE 3000
CMD ["npm", "run", "start"]
