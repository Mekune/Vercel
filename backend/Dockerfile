FROM node:16

WORKDIR /app/backend

# Installation des outils MongoDB
RUN apt-get update && apt-get install -y mongo-tools

COPY ./backend/package*.json ./

RUN npm install

COPY ./backend .

CMD ["npm", "start"]
