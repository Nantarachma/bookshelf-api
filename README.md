# Bookshelf API

This project is a simple API for managing a bookshelf, allowing users to add, retrieve, update, and delete books.

## Features

- Add a new book
- Retrieve all books
- Retrieve a book by ID
- Update a book by ID
- Delete a book by ID

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm (Node package manager)

### Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```
   cd bookshelf-api
   ```
3. Install the dependencies:
   ```
   npm install
   ```

### Running the Application

To start the application, run the following command:
```
npm run start
```

The server will start on port 9000.

### API Endpoints

- **POST /books**: Add a new book
- **GET /books**: Retrieve all books
- **GET /books/{bookId}**: Retrieve a book by ID
- **PUT /books/{bookId}**: Update a book by ID
- **DELETE /books/{bookId}**: Delete a book by ID

### License

This project is licensed under the MIT License.