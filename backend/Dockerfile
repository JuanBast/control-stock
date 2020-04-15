FROM node:13.12.0-buster

ENV NODE_ENV development

EXPOSE 4000

WORKDIR /app

RUN chown -R node:node .

USER node

COPY --chown=node:node package.json package-lock.json ./

RUN npm install && npm cache clean --force

COPY --chown=node:node . .

CMD ["node", "index.js"]