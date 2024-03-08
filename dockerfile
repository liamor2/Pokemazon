FROM node:14-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 8080
COPY start.sh .
RUN chmod +x start.sh
CMD ["./start.sh"]