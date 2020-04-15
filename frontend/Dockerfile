FROM node:13.10.1-stretch

EXPOSE 3000

WORKDIR /app

RUN chown -R node:node .

USER node

COPY --chown=node:node package.json package-lock.json ./

RUN npm install && npm cache clean --force

COPY --chown=node:node . .

CMD ["node", "./src/index.js"]