from fastapi import FastAPI
from pydantic import BaseModel
from typing import List
import sys
import io

app = FastAPI()

class CodeRequest(BaseModel):
    id: int
    code: str

@app.post("/execute")
def execute_code(requests: List[CodeRequest]):
    results = []
    for req in requests:
        # Capture the stdout
        old_stdout = sys.stdout
        redirected_output = sys.stdout = io.StringIO()
        try:
            exec(req.code)
            output = sys.stdout.getvalue()
        except Exception as e:
            output = f"Error: {str(e)}"
        finally:
            sys.stdout = old_stdout
        results.append({
            'id': req.id,
            'output': output.strip()
        })
    return results
