# Stage 1: Build the Angular application
FROM node:22-bookworm-slim AS build

WORKDIR /app

RUN npm install --global npm@11.6.2

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build

# Stage 2: Serve the generated website
FROM nginx:stable-alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=build /app/dist/mithushika-portfolio/browser/ /usr/share/nginx/html/

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]