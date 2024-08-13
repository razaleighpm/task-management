# Task Management

This project consists of a Java Spring Boot backend and an Angular frontend. For simplicity, I use H2 in-memory DB.

## Getting Started

### Clone the Repository

1. Open a terminal or command prompt.

2. Clone the repository using the following command:
```
git clone https://github.com/razaleighpm/task-management.git
```

3. Navigate to the project directory:
```
cd task-management
```

## Prerequisites

- Docker
- Java JDK 11 or later
- Maven
- Node.js and npm
- Angular CLI

## Running the Backend

1. Navigate to the backend directory:
```
cd backend
```

2. Build the application with Maven:
```
mvn clean package
```

3. Build the Docker image:
```
docker build -t taskmanager .
```

4. Run the Docker container:
```
docker run -p 8080:8080 taskmanager
```

The backend will be available at `http://localhost:8080`.

## Running the Frontend

1. Navigate to the frontend directory:
```
cd frontend
```

2. Install dependencies:
```
npm install
```

3. Start the Angular development server:
```
ng serve
```

The frontend will be available at `http://localhost:4200`.

## Accessing the Application

Once both the backend and frontend are running, you can access the full application by opening a web browser and navigating to `http://localhost:4200`.

## API Documentation

API documentation for the backend can be found at `http://localhost:8080/swagger-ui.html` when the backend is running.

## Troubleshooting

If you encounter any issues, please check the following:

1. Ensure all prerequisites are installed and up to date.
2. Verify that the specified ports (8080 for backend, 4200 for frontend) are not in use by other applications.
3. Check the console output for any error messages.
4. For backend issues, try cleaning and rebuilding the project:
```
mvn clean install
```

For further assistance, please open an issue in this repository.