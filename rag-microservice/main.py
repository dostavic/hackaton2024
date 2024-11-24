from flask import Flask, request, jsonify
import pandas as pd
from openai import OpenAI

app = Flask(__name__)

client = OpenAI(
    api_key="KEY!!!" 
)

def chat_gpt(prompt):
    response = client.chat.completions.create(
        model="gpt-4o",  
        messages=[{"role": "user", "content": prompt}]
    )
    return response.choices[0].message.content.strip()

@app.route('/upload_csv', methods=['POST'])
def upload_csv():
    if 'file' not in request.files:
        return jsonify({"error": "CSV файл не знайдено"}), 400
    
    file = request.files['file']
    try:
        df = pd.read_csv(file)
        prompt_template = """
        You are a cybersecurity expert. Analyze the following vulnerabilities. 
        Provide recommendations to fix or mitigate these vulnerabilities. Be detailed and clear.

        Data:
        {data}
        """
        first_five_rows = df.head(5).to_dict(orient="records")

        prompt = prompt_template.format(data=first_five_rows)
        gpt_response = chat_gpt(prompt)
        
        return jsonify({"gpt_response": gpt_response})
    except Exception as e:
        return jsonify({"error": str(e)}), 500



if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
