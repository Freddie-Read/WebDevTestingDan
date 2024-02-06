FROM python:latest
ENV ALLOWED_HOSTS='backend .localhost 127.0.0.1 [::1]'
RUN useradd -m app
WORKDIR /app
RUN chown -R app .
USER app
COPY ./requirements.txt /app/
RUN pip install -r requirements.txt
COPY ./ /app/
RUN python manage.py migrate
WORKDIR /app/
CMD ["python", "-m", "daphne", "-b", "0.0.0.0","-p", "8000", "mysite.asgi:application"]
