FROM node:14.17.3-alpine AS builder
WORKDIR /app
RUN apk add --update nodejs npm
COPY package-lock.json package.json ./
RUN npm install
COPY . .
RUN npm run build

FROM node:14.17.3-alpine AS release
WORKDIR /root
RUN npm install -g husky
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json .
COPY --from=builder /app/node_modules ./node_modules
CMD npm run start
