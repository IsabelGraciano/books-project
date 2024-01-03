FROM node:18.13

WORKDIR /app

COPY ./frontend /app

RUN npm install -g @angular/cli

RUN npm install

CMD ["ng", "serve", "--host", "0.0.0.0", "--port", "4200"]
