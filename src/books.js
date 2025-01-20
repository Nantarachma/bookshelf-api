const { nanoid } = require('nanoid');

let books = [];

const addBook = (book) => {
	const newBook = {
		id: nanoid(),
		...book,
		finished: book.pageCount === book.readPage,
		insertedAt: new Date().toISOString(),
		updatedAt: new Date().toISOString(),
	};
	books.push(newBook);
	return newBook;
};

const getAllBooks = () => {
	return books.map(({ id, name, publisher }) => ({ id, name, publisher }));
};

const getBookById = (id) => {
	return books.find((book) => book.id === id);
};

const updateBookById = (id, updatedBook) => {
	const index = books.findIndex((book) => book.id === id);
	if (index !== -1) {
		books[index] = {
			...books[index],
			...updatedBook,
			finished: updatedBook.pageCount === updatedBook.readPage,
			updatedAt: new Date().toISOString(),
		};
		return books[index];
	}
	return null;
};

const deleteBookById = (id) => {
	const index = books.findIndex((book) => book.id === id);
	if (index !== -1) {
		books.splice(index, 1);
		return true;
	}
	return false;
};

module.exports = {
	books,
	addBook,
	getAllBooks,
	getBookById,
	updateBookById,
	deleteBookById,
};
