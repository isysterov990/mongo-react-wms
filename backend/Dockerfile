#
FROM python:3.9

WORKDIR /app/

ADD requirements.txt /app/

RUN pip install -r requirements.txt

ADD . /app/
EXPOSE 80
EXPOSE 8000
#
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "80"]