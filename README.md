Here's an improved and translated version of your README file for the Node.js backend project:

---

# URL Shortener API

The URL Shortener API is a tool designed to shorten URLs and generate short links, making sharing easy and efficient.

## Node.js Version

This project is built using Node.js version 20.18.

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