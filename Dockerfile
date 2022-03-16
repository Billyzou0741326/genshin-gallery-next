FROM node:16-alpine3.14 AS dev-env
COPY package*.json /app/
WORKDIR /app/
RUN npm ci

FROM node:16-alpine3.14 AS prod-env
COPY package*.json /app/
WORKDIR /app/
RUN npm install --production && npm cache clean --force

FROM dev-env AS build
COPY . /app/
WORKDIR /app/
RUN npm run build

FROM prod-env
COPY --from=prod-env /app/package*.json /app/
COPY --from=prod-env /app/node_modules /app/node_modules
COPY --from=build /app/*.config.js /app/
COPY --from=build /app/.next /app/.next
WORKDIR /app/
ENTRYPOINT [ "npm", "run", "start" ]
