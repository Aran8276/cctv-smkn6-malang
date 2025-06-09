FROM node:lts-alpine

WORKDIR /app

COPY package.json package-lock.json* /app/
RUN npm install
COPY . /app/
RUN npm run build

EXPOSE 5500

CMD ["npm", "start"]
