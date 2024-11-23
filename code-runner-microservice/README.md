# Python Code Executor Microservice
A simple FastAPI microservice that accepts JSON containing Python code snippets, executes them, and returns the results. Built for a hackathon project to demonstrate code vulnerability exploitation.

### Start the microservice

``` 
uvicorn main:app --reload
```

### Install dependencies
pip install fastapi uvicorn pydantic

## Send a POST Request
Endpoint: ```http://localhost:8000/execute```
Body: 
```
[
  {"id": 1, "code": "print('Hello, World!')"},
  {"id": 2, "code": "print(2 + 2)"},
  {"id": 3, "code": "for i in range(3): print(i)"}
]```