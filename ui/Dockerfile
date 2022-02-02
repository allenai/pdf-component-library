# NOTE: This Dockerfile is only used in development. It provides a runtime
# environment where the JavaScript build process can run. In production the
# files built by this process are served from disk, while in development a HTTP
# server that's distributed with the UI build tools is used.
FROM node:12.22.6

# Install dependencies for demo and create a link to the demo's react dependency
WORKDIR /usr/local/src/skiff/app/ui/demo
COPY ./demo/package.json ./demo/yarn.lock ./
RUN yarn install --frozen-lockfile

# Install dependencies for library and point library to demo react link
WORKDIR /usr/local/src/skiff/app/ui/library
COPY ./library/package.json ./library/yarn.lock ./
RUN yarn install --frozen-lockfile

# Copy in all of the source code for both the library and the demo
WORKDIR /usr/local/src/skiff/app/ui
COPY . .

# link the demo 'react' dependency to the 'library' to fulfill the peer dependency
# and build the library and create a link for it
RUN cd ./demo && yarn link:react \
    && cd ../library && yarn link:react \
    && yarn build && yarn link:lib \
    && cd ../demo && yarn link:lib

WORKDIR /usr/local/src/skiff/app/ui/demo

ENTRYPOINT [ "yarn" ]
CMD [ "start" ]
