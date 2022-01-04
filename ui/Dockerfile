# NOTE: This Dockerfile is only used in development. It provides a runtime
# environment where the JavaScript build process can run. In production the
# files built by this process are served from disk, while in development a HTTP
# server that's distributed with the UI build tools is used.
FROM node:14.15.1

# Setup a spot for our code
WORKDIR /usr/local/src/skiff/app/ui

# Install dependencies for demo
WORKDIR /usr/local/src/skiff/app/ui/demo
COPY ./demo/package.json ./demo/yarn.lock ./
RUN yarn install --frozen-lockfile

# Install dependencies for library
WORKDIR /usr/local/src/skiff/app/ui/library
COPY ./library/package.json ./library/yarn.lock ./
RUN yarn install --frozen-lockfile

# Copy in all of the source code for both the library and the demo
WORKDIR /usr/local/src/skiff/app/ui
COPY . .

# build the library
WORKDIR /usr/local/src/skiff/app/ui/library
RUN yarn build

# setup and start the demo
WORKDIR /usr/local/src/skiff/app/ui/demo
RUN yarn link:react
RUN yarn link:lib

# ENTRYPOINT [ "yarn" ]
# CMD [ "start" ]
ENTRYPOINT ["tail", "-f", "/dev/null"]
