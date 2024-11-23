import os
import openai
from fastapi import FastAPI
from pydantic import BaseModel
from typing import List
import sys
import io

app = FastAPI()

# Read the OpenAI API key from the environment variable
openai.api_key = os.getenv("OPENAI_API_KEY")

if not openai.api_key:
    raise ValueError("OpenAI API key not found. Please set the OPENAI_API_KEY environment variable.")

class CodeRequest(BaseModel):
    id: int
    code: str

def execute_python_code(code):
    # Capture the stdout
    old_stdout = sys.stdout
    redirected_output = sys.stdout = io.StringIO()
    try:
        exec(code)
        output = sys.stdout.getvalue()
        success = True
    except Exception as e:
        output = f"Error: {str(e)}"
        success = False
    finally:
        sys.stdout = old_stdout
    return success, output.strip()

def fix_code_with_ai(code, error_message):
    prompt = f"""
The following Python code has an error:

Code:
{code}

Error:
{error_message}

Please provide a corrected version of the code. Provide code and only code. Do not add any comments or explanations!
"""
    try:
        response = openai.chat.completions.create(
            model="gpt-3.5-turbo",  # Use 'gpt-4' if you have access
            messages=[
                {"role": "system", "content": "You are a helpful assistant that corrects Python code."},
                {"role": "user", "content": prompt}
            ],
            max_tokens=150,
            temperature=0.2,
            n=1,
            stop=None,
        )
        if response.choices and len(response.choices) > 0:
            fixed_code = response.choices[0].message.content.strip()
            print(f"OpenAI response with fixed code:\n{fixed_code}")
            return fixed_code
        else:
            print("No valid choices returned by OpenAI.")
            return code
    except openai.OpenAIError as e:
        print(f"OpenAI API error: {e}")
        return code
    except Exception as e:
        print(f"Unexpected error: {e}")
        return code

@app.post("/execute")
def execute_code(requests: List[CodeRequest]):
    retries = os.getenv("CODE_FIX_RETRIES") or 2
    results = []
    for req in requests:
        # First attempt to execute the code
        success, output = execute_python_code(req.code)
        if not success and retries != 0:
            # If execution fails, ask AI to fix the code
            print("Attempt to fix code with ChatGPT!")
            fixed_code = fix_code_with_ai(req.code, output)
            # Second attempt with fixed code
            success, output = execute_python_code(fixed_code)
            results.append({
                'id': req.id,
                'output': output,
                'attempts': 2
            })
            retries -=  1
        else:
            results.append({
                'id': req.id,
                'output': output,
                'attempts': 1
            })
    return results
