# BlueSky ABA Core API

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![TypeORM](https://img.shields.io/badge/TypeORM-FE0803?style=for-the-badge&logo=typeorm&logoColor=white)

## 📖 Overview

BlueSky ABA Core is a robust backend clinical system designed to solve real-world data management challenges in ABA therapy. It provides a secure, typed, and scalable foundation for managing patient records, therapy sessions, and clinical assessments.

Built with **Clean Architecture** principles and **Domain-Driven Design (DDD)**, this API ensures high maintainability and type safety from the database layer up to the HTTP response.

---

## 🛠️ Tech Stack

- **Runtime & Framework:** Node.js, Express.js
- **Language:** TypeScript
- **Database & ORM:** PostgreSQL (Dockerized), TypeORM
- **Validation & Routing:** TSOA (TypeScript OpenAPI)
- **Code Quality:** ESLint (Flat Config), Prettier

---

## 📂 Architecture Structure

The project follows a modular, feature-based structure:

```text
src/
├── api/                  # Domain modules (Feature-based routing)
│   ├── health/           # Healthcheck domain (Controllers & DTOs)
│   └── patients/         # Patient domain (Controllers, Services, DTOs)
├── config/               # Global configuration (Database, Environment)
├── database/             # Persistence layer
│   └── entities/         # TypeORM Models mapping to Postgres tables
├── docs/                 # Auto-generated Swagger specifications
├── utils/                # Shared utilities and helpers
├── app.ts                # Express application setup & Middlewares
└── server.ts             # Application entry point
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- Docker & Docker Compose
- npm or yarn

### 1. Environment Setup

Clone the repository and install dependencies:

```bash
git clone https://github.com/mvelezg99/bluesky-aba-core.git
cd bluesky-aba-core
npm install
```

Create a `.env` file in the root directory:

```dotenv
PORT=8000
DB_HOST=localhost
DB_PORT=5432
DB_USER=bluesky_user
DB_PASSWORD=bluesky_password
DB_NAME=bluesky_aba_core
```

### 2. Database Initialization

Spin up the PostgreSQL database using the provided Docker Compose configuration:

```bash
npm run docker:up
```

### 3. Start the Server

Run the development server. This will automatically trigger TSOA to generate the routes and Swagger documentation, then start the API with hot-reloading:

```bash
npm run dev
```

## 📜 Available Scripts

- `npm run dev` - Compiles TSOA routes/specs and starts the dev server with hot-reload.
- `npm run build` - Compiles the TypeScript code into the `/dist` directory for production.
- `npm start` - Runs the compiled application.
- `npm run docker:up` - Starts the PostgreSQL container in detached mode.
- `npm run docker:down` - Stops and removes the PostgreSQL container and networks.
- `npm run docker:logs` - Streams the logs from the running PostgreSQL container.

## 📚 API Documentation

Once the server is running, you can interact with the API and test endpoints via the auto-generated Swagger UI.

👉 Swagger Dashboard: http://localhost:8000/api-docs
