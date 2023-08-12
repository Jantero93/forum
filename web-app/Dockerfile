# build environment
FROM node:18.16.0-alpine AS build
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package*.json /app/
RUN npm install -g npm@latest
RUN npm ci --silent

ARG VITE_APP_API_URL
ENV VITE_APP_API_URL $VITE_APP_API_URL

ARG VITE_NODE_ENV
ENV VITE_NODE_ENV $VITE_NODE_ENV

ARG VITE_APP_TITLE
ENV VITE_APP_TITLE $VITE_APP_TITLE

COPY . /app
RUN npm run build

# production environment
FROM nginx:1.25.0-alpine
COPY --from=build /app/dist /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]