FROM node:20-slim AS nodemodules

WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile 

FROM node:20-slim AS build

WORKDIR /app

COPY --from=nodemodules /app/node_modules /app/node_modules
COPY . ./

RUN yarn build

FROM node:20-slim AS runtime

RUN apt-get update && apt-get install -y jq

WORKDIR /app

COPY --from=nodemodules /app/node_modules /app/node_modules
COPY --from=build /app/dist /app/dist

COPY . .

EXPOSE 8000

CMD ["node", "dist/server/IJsonApi/main.js"]
