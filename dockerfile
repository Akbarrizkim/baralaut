FROM node:12

WORKDIR /usr/src/app

COPY package.json ./

COPY npm-shrinkwrap.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]