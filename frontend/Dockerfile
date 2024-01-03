FROM node:18

WORKDIR /app

COPY ./frontend/package.json /app/package.json

COPY ./frontend/package-lock.json /app/package-lock.json

RUN rm -rf node_modules

RUN npm ci

RUN npm install -g @angular/cli

COPY ./frontend /app

CMD ["ng", "serve", "--host", "0.0.0.0", "--port", "4200"]
