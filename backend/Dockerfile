FROM python:3.8

WORKDIR /app

COPY ./backend /app

RUN pip install -r requirements.txt

EXPOSE 4000

CMD ["flask", "run", "--host=0.0.0.0", "--port=4000"]
