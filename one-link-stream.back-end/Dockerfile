FROM node:18-alpine AS development

RUN mkdir -p /app
WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

ENV NODE_ENV=development
EXPOSE 3001 

CMD ["npm", "run", "start:debug"]
