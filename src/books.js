const { nanoid } = require('nanoid');

let books = [
	{
		id: 'Qbax5_wp',
		name: 'Buku A',
		year: 2010,
		author: 'John Doe',
		summary: 'Lorem ipsum dolor sit amet',
		publisher: 'Dicoding Indonesia',
		pageCount: 100,
		readPage: 100,
		finished: true,
		reading: false,
		insertedAt: '2023-10-12T05:19:22.000Z',
		updatedAt: '2023-10-12T05:19:22.000Z',
	},
	{
		id: 'Qbax5_wp2',
		name: 'Buku B',
		year: 2011,
		author: 'Jane Doe',
		summary: 'Dolor sit amet',
		publisher: 'Coding Indonesia',
		pageCount: 200,
		readPage: 50,
		finished: false,
		reading: true,
		insertedAt: '2023-10-12T05:19:22.000Z',
		updatedAt: '2023-10-12T05:19:22.000Z',
	},
	{
		id: 'Qbax5_wp3',
		name: 'Buku C',
		year: 2015,
		author: 'Bob Smith',
		summary: 'Consectetur adipiscing elit',
		publisher: 'Learning Press',
		pageCount: 150,
		readPage: 0,
		finished: false,
		reading: false,
		insertedAt: '2023-10-12T05:19:22.000Z',
		updatedAt: '2023-10-12T05:19:22.000Z',
	},
	{
		id: 'Qbax5_wp4',
		name: 'Buku D',
		year: 2018,
		author: 'Alice Johnson',
		summary: 'Sed do eiusmod tempor',
		publisher: 'Tech Books',
		pageCount: 300,
		readPage: 300,
		finished: true,
		reading: true,
		insertedAt: '2023-10-12T05:19:22.000Z',
		updatedAt: '2023-10-12T05:19:22.000Z',
	},
	{
		id: 'Qbax5_wp5',
		name: 'Buku E',
		year: 2020,
		author: 'Charlie Brown',
		summary: 'Ut labore et dolore',
		publisher: 'Code Masters',
		pageCount: 250,
		readPage: 125,
		finished: false,
		reading: true,
		insertedAt: '2023-10-12T05:19:22.000Z',
		updatedAt: '2023-10-12T05:19:22.000Z',
	},
	{
		id: 'Qbax5_wp6',
		name: 'Buku F',
		year: 2019,
		author: 'Diana White',
		summary: 'Magna aliqua ut enim',
		publisher: 'Dev Books',
		pageCount: 175,
		readPage: 175,
		finished: true,
		reading: false,
		insertedAt: '2023-10-12T05:19:22.000Z',
		updatedAt: '2023-10-12T05:19:22.000Z',
	},
	{
		id: 'Qbax5_wp7',
		name: 'Buku G',
		year: 2022,
		author: 'Edward Green',
		summary: 'Minim veniam quis',
		publisher: 'Programming House',
		pageCount: 400,
		readPage: 200,
		finished: false,
		reading: true,
		insertedAt: '2023-10-12T05:19:22.000Z',
		updatedAt: '2023-10-12T05:19:22.000Z',
	},
];

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
    return books.find(book => book.id === id);
};

const updateBookById = (id, updatedBook) => {
    const index = books.findIndex(book => book.id === id);
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
    const index = books.findIndex(book => book.id === id);
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