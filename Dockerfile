FROM node
WORKDIR /app
EXPOSE 8080
RUN npm install -g supervisor