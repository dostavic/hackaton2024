# Testify
<p align="center">
  <img src="https://github.com/user-attachments/assets/84f77807-ac2c-4a50-956c-7fb1594893ca" alt="LOGO" height="200">
</p>
Testify is an AI-driven automated pentesting tool designed to streamline vulnerability validation and exploit generation. Built as a modular application composed of microservices, it empowers security teams to identify and confirm exploitable issues in web applications with minimal manual effort.

## Functionality
**AI-Driven Pentesting**: Leverages AI to generate context-aware payloads dynamically for any vulnerabilities you dare to throw at it.

**Microservice Architecture**: Utilizes microservice architecture for maximum efficiency and reliability.
- **RAG Module**: Matches vulnerabilities from predefined lists (e.g., CWE, CVE) to discovered endpoints and generates relevant payloads.
- **Code Runner**: Executes dynamically generated or predefined payloads and validates the results.
- **Report Generator**: Produces actionable reports with success/failure status, payloads used, and proof artifacts.

**Proof-of-Exploit Generation**: Captures evidence of successful exploitation, such as screenshots for XSS or altered server responses for SQLi.

**Ease of Deployment**: Comes with a **Docker Compose** setup for seamless deployment, integrating **Nginx** for routing and load balancing.
## How to start
```docker-compose up --build```
## Architecture

![Hack drawio(1)](https://github.com/user-attachments/assets/839f9a18-b6a5-4b3d-b87d-8719c8b0724b)

![image](https://github.com/user-attachments/assets/4d570406-ba57-45e5-aa38-6d9be76f9ea6)


