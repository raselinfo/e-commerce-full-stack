FROM node:16-alpine3.15

RUN addgroup -S app && adduser -S app -G app
USER app

WORKDIR /user/src/app

COPY package*.json ./

RUN yarn install --frozen-lockfile

COPY . .

ENV PORT 4000
EXPOSE ${PORT}

CMD ["yarn","dev"]
