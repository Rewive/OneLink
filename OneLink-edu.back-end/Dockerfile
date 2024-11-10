FROM node:18-alpine AS development

WORKDIR /newfolder

COPY --chown=node:node package*.json ./

RUN npm ci

COPY --chown=node:node . .

FROM node:18-alpine AS build

WORKDIR /newfolder

COPY --chown=node:node --from=development /newfolder/node_modules ./node_modules
COPY --chown=node:node . .

RUN npm run build

FROM node:18-alpine AS production

WORKDIR /newfolder

COPY --chown=node:node --from=build /newfolder/node_modules ./node_modules
COPY --chown=node:node --from=build /newfolder/dist ./dist

ENV NODE_ENV production

CMD [ "node", "dist/main.js" ]
