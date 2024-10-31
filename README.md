Here's an improved and translated version of your README file for the Node.js backend project:

---

# URL Shortener API

The URL Shortener API is a tool designed to shorten URLs and generate short links, making sharing easy and efficient.

## Node.js Version

This project is built using Node.js version 20.18.0

# Start server using docker-compose

## Environment Configuration

To create and populate the `.env` file based on the `.env.template` file in the root of the project, follow these steps:

1. **Copy the `.env.template` file**:
   - Rename `.env.template` to `.env`.

2. **Edit the `.env` file**:
   - Fill in the necessary environment variables as required for your application.

## Running the Application

Ensure that you have Docker installed on your machine. Once you have your environment set up, you can start the application using Docker Compose.

Run the following command in your terminal:

```bash
docker-compose up
```

## API path

- **the default api path is /api/v1** it can be modified in .env file

## Authentication Endpoints

- **POST /auth/register**: Register a new user.
- **POST /auth/login**: Generate a user token.

## URL Endpoints

- **GET /url**: Retrieve all URLs associated with the logged-in user.
- **GET /url/:code**: Redirect to a specific shortened URL.
- **POST /url**: Create a new shortened URL.
- **PUT /url/:code**: Edit an existing shortened URL.
- **DELETE /url/:code**: Perform a soft delete on a specific shortened URL.

url example: **http://localhost:3000/api/v1/url/lkjYkaj**

## Database

This project use **Sqlite3** as default database.

## Getting Started

To get started with this API, follow these steps:

1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```
2. Navigate into the project directory:
   ```bash
   cd url-shortener-api
   ```
3. Install the required dependencies:
   ```bash
   yarn install
   ```
4. Start the server:
   ```bash
   yarn dev
   ```

## Usage

Once the server is running, you can use the authentication endpoints to register and log in. After obtaining a user token, you can use the URL endpoints to create and manage shortened links.

## License

This project is licensed under the MIT License.

## Contributing

Contributions are welcome! Please submit a pull request or open an issue to discuss improvements or features.

---

Feel free to customize any sections further if needed!