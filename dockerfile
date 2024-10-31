FROM node:20.18.0-alpine as base

COPY package.json ./

RUN yarn install

COPY src ./src
COPY tsconfig.json ./tsconfig.json

RUN yarn run build

FROM node:20.18.0-alpine

COPY .env ./
COPY --from=base ./node_modules ./node_modules
COPY --from=base ./package.json ./package.json
COPY --from=base /dist /dist

EXPOSE 3000
CMD ["yarn", "run", "dev"]