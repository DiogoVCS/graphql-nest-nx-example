FROM ubuntu:20.04 as buildImage

RUN apt-get update

ENV NODE_VERSION=16.13.2
RUN apt install -y curl
RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
ENV NVM_DIR=/root/.nvm
RUN . "$NVM_DIR/nvm.sh" && nvm install ${NODE_VERSION}
RUN . "$NVM_DIR/nvm.sh" && nvm use v${NODE_VERSION}
RUN . "$NVM_DIR/nvm.sh" && nvm alias default v${NODE_VERSION}
ENV PATH="/root/.nvm/versions/node/v${NODE_VERSION}/bin/:${PATH}"
RUN node --version
RUN npm --version

# DOCKERIZE
ENV DOCKERIZE_VERSION v0.6.1

RUN apt install apt-utils net-tools curl wget -y

# Add dockerize tool -------------------
RUN apt install openssl -y
RUN wget https://github.com/jwilder/dockerize/releases/download/$DOCKERIZE_VERSION/dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    && tar -C /usr/local/bin -xzvf dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    && rm dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz



WORKDIR /app

FROM buildImage

COPY ./dist/apps/calendar-management-api .
ENV PORT=3337
EXPOSE ${PORT}
RUN npm install --production
# dependencies that nestjs needs
RUN npm install reflect-metadata tslib rxjs @nestjs/platform-express





CMD node ./main.js



# COPY . .

# FROM buildImage

# WORKDIR /usr/src

# RUN npm install --production
# # dependencies that nestjs needs
# RUN npm install reflect-metadata tslib rxjs @nestjs/platform-express

# RUN npx nx build --prod

# EXPOSE 3337

# CMD [ "node", "dist/apps/calendar-management-api/main.js"]

