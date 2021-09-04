# build stage
FROM node:lts-alpine as build-stage
WORKDIR /app
COPY frontend_vue/package*.json ./
COPY frontend_vue/yarn.lock ./
RUN yarn install
COPY frontend_vue/ ./
RUN yarn build

# production stage
FROM nginx:1.21 as production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html
COPY default.conf /etc/nginx/conf.d/
#EXPOSE 80
#CMD ["nginx", "-g", "daemon off;"]
