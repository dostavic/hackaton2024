from flask import Flask, request, jsonify
from zapv2 import ZAPv2
import time
import subprocess

app = Flask(__name__)

# Ініціалізація ZAP
zap = ZAPv2(proxies={'http': 'http://127.0.0.1:8080', 'https': 'http://127.0.0.1:8080'})

@app.route('/scan', methods=['POST'])
def scan():
    data = request.json
    target = data.get('url')
    
    if not target:
        return jsonify({"error": "URL is required"}), 400

    print("Spidering...")
    zap.spider.scan(target)
    while int(zap.spider.status()) < 100:
        print(f"Process s: {zap.spider.status()}%")
        time.sleep(2)

    print("Active scanning...")
    zap.ascan.scan(target)
    while int(zap.ascan.status()) < 100:
        print(f"Process a: {zap.ascan.status()}%")
        time.sleep(5)

    print("Report...")
    alerts = zap.core.alerts(baseurl=target)
    return jsonify(alerts)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001)
