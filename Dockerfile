FROM node:14.16.1
LABEL description="node js backend microservices"

ARG NODE_ENV=development
ENV NODE_ENV=${NODE_ENV}

ARG SERVICE_PORT=3022
ENV SERVICE_PORT=${SERVICE_PORT}

# Create app directory
WORKDIR /opt/app

# Install the modules and build the code.
COPY package*.json ./
# RUN npm config set registry http://${NPM_REGISTRY}/ --> no artifactory yet
# RUN WITH_SASL=0 npm install --production --verbose
RUN npm install

# Bundle App Source
COPY . .

ENV TZ=Asia/Jakarta
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

# Expose then start the server.
EXPOSE ${SERVICE_PORT}

CMD ["node","server.js"]