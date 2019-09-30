# Builder Image
FROM node:12.7-alpine AS builder
WORKDIR /usr/src/app
COPY . .
RUN yarn && yarn build

# Dependencies Image
FROM node:12.7-alpine AS deps
WORKDIR /usr/src/app
COPY package.json yarn.lock ./
RUN yarn install --production

# Main Image
FROM node:12.7-alpine
WORKDIR /usr/src/app

ENV NODE_ENV=production

COPY --from=deps /usr/src/app/node_modules ./node_modules/
COPY --from=builder /usr/src/app/lib ./lib
COPY --from=builder /usr/src/app/package.json ./

CMD ["yarn", "start"]
