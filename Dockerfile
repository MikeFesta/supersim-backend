# This file is used by docker-compose (for Dev)
# Note: if package.json changes, need to rebuild the docker image
FROM node:24-alpine

ENV HOME=/home/node
ENV WORKDIR=/home/node/supersim
ENV NODE_ENV=development

# Build tools needed for bcrypt
RUN apk add --no-cache make gcc g++ python3

RUN mkdir -p $WORKDIR

# Installing node_modules outside of the current directory so it will not be overwritten by the docker-compose mount
COPY package.json package-lock.json /home/node

RUN cd /home/node && \
    npm ci --include=dev && \
    npm rebuild bcrypt --build-from-source

RUN chown -R node:node $HOME

WORKDIR $WORKDIR

USER node

CMD ["node", "build/app.js"]
