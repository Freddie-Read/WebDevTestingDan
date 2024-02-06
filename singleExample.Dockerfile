FROM nikolaik/python-nodejs:latest
RUN apt-get update && apt-get install -y supervisor
RUN mkdir -p /var/log/supervisor
COPY supervisord.conf /etc/supervisor/conf.d/supervisord.conf
RUN useradd -m app
WORKDIR /app
COPY ./ /app/
RUN chown -R app .
USER app
WORKDIR /app/frontend
RUN npm ci --cache /app/.npm-cache
RUN npm run build
WORKDIR /app/backend
RUN pip install -r requirements.txt
RUN python manage.py migrate
WORKDIR /app/
CMD ["/usr/bin/supervisord"]
