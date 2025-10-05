FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN rm -rf node_modules
RUN npm install
COPY . .
EXPOSE 3000
CMD ["sh", "-c", "npm run seed && npm start"]
