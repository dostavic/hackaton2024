from flask import Flask, request, jsonify
import pandas as pd
import requests
from openai import OpenAI
import time

app = Flask(__name__)

client = OpenAI(
    api_key=""  # Вставте ваш API-ключ OpenAI
)

def chat_gpt(prompt):
    response = client.chat.completions.create(
        model="gpt-4o",  
        messages=[{"role": "user", "content": prompt}]
    )
    return response.choices[0].message.content.strip()

def fetch_vulnerabilities(url):
    zap_api_url = "http://localhost:8080/zap-api/scan"
    headers = {"Content-Type": "application/json"}
    payload = {"url": url}
    print("HELOOOOOOOOOOOOOOOOOOOOOOOOOOOOO1")
    try:
        response = requests.post(zap_api_url, json=payload, timeout=600, headers=headers)
        response.raise_for_status()
        vulnerabilities = response.json()
        
        # Фільтруємо потрібні поля
        filtered_vulnerabilities = [
            f"URL: {vuln['url']}, Method: {vuln['method']}, Alert: {vuln['alert']}"
            for vuln in vulnerabilities
        ]
        return "\n".join(filtered_vulnerabilities)
    except Exception as e:
        return f"Error fetching vulnerabilities: {str(e)}"

@app.route('/upload_csv', methods=['POST'])
def upload_csv():
    if 'file' not in request.files:
        return jsonify({"error": "CSV файл не знайдено"}), 400
    
    file = request.files['file']
    url = request.form['url']
    
    if not url:
        return jsonify({"error": "Параметр URL не вказано"}), 400
    
    try:
        # Завантажуємо дані з CSV
        df = pd.read_csv(file)
        first_five_rows = df.head(5).to_dict(orient="records")
        
        # Отримуємо вразливості
        vulnerabilities_info = fetch_vulnerabilities(url)
        
        # Формуємо промпт для GPT
        prompt_template = """
        You are a cybersecurity expert. Analyze the following data and vulnerabilities. 
        Provide detailed and actionable recommendations for each vulnerability. Be thorough and specific.

        Data from CSV:
        {data}

        Vulnerabilities from ZAP scan:
        {vulnerabilities}
        """
        prompt = prompt_template.format(
            data=first_five_rows,
            vulnerabilities=vulnerabilities_info
        )
        
        gpt_response = chat_gpt(prompt)
        
        return jsonify({"gpt_response": gpt_response})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)