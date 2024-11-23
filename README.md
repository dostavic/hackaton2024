# Testify
Testify is an AI-driven automated pentesting tool designed to streamline vulnerability validation and exploit generation. Built as a modular application composed of microservices, it empowers security teams to identify and confirm exploitable issues in web applications with minimal manual effort.

## Functionality
**AI-Driven Pentesting**: Leverages AI to generate context-aware payloads dynamically for any vulnerabilities you dare to throw at it.

**Microservice Architecture**: Utilizes microservice architecture for maximum efficiency and reliability.
- **RAG Module**: Matches vulnerabilities from predefined lists (e.g., CWE, CVE) to discovered endpoints and generates relevant payloads.
- **Code Runner**: Executes dynamically generated or predefined payloads and validates the results.
- **Report Generator**: Produces actionable reports with success/failure status, payloads used, and proof artifacts.

**Proof-of-Exploit Generation**: Captures evidence of successful exploitation, such as screenshots for XSS or altered server responses for SQLi.

**Ease of Deployment**: Comes with a **Docker Compose** setup for seamless deployment, integrating **Nginx** for routing and load balancing.

## Architecture

![Hack drawio](https://github.com/user-attachments/assets/c4a5386a-7ef9-4f8f-9d32-0ccfe8397515)

![image](https://github.com/user-attachments/assets/4a6c8f08-2c8f-4b43-9d37-c5839b9ff091)

