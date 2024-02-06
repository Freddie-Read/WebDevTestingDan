FROM node:latest
ENV BACKEND_PROXY='http://backend:8000'
RUN useradd -m app
WORKDIR /app
COPY ./package*.json /app/
RUN chown -R app .
USER app
RUN npm ci --cache /app/.npm-cache
COPY ./ /app/
RUN npm run build
CMD ["npm", "run", "start"]
