# Базовий образ
FROM python:3.10-slim

RUN apt-get update && apt-get install -y wget openjdk-17-jre-headless unzip && \
    wget https://github.com/zaproxy/zaproxy/releases/download/w2024-11-18/ZAP_WEEKLY_D-2024-11-18.zip -O /zap.zip && \
    unzip /zap.zip -d /opt && \
    mv /opt/ZAP_D-2024-11-18 /opt/zap && \
    chmod +x /opt/zap/zap.sh

COPY requirements.txt /app/requirements.txt
RUN pip install --no-cache-dir -r /app/requirements.txt

COPY app.py /app/app.py

WORKDIR /app
EXPOSE 5000
CMD ["sh", "-c", "/opt/zap/zap.sh -daemon -port 8080 -config api.disablekey=true & python app.py"]
