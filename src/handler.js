const { nanoid } = require('nanoid');
const books = require('./books');

const addBookHandler = (request, h) => {
    const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload;

    if (!name) {
        const response = h.response({
            status: 'fail',
            message: 'Gagal menambahkan buku. Mohon isi nama buku',
        });
        response.code(400);
        return response;
    }

    if (readPage > pageCount) {
        const response = h.response({
            status: 'fail',
            message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
        });
        response.code(400);
        return response;
    }

    const id = nanoid();
    const insertedAt = new Date().toISOString();
    const updatedAt = insertedAt;
    const finished = pageCount === readPage;

    const newBook = {
        id,
        name,
        year,
        author,
        summary,
        publisher,
        pageCount,
        readPage,
        finished,
        insertedAt,
        updatedAt,
    };

    books.push(newBook);

    const response = h.response({
        status: 'success',
        message: 'Buku berhasil ditambahkan',
        data: {
            bookId: id,
        },
    });
    response.code(201);
    return response;
};

const getAllBooksHandler = (request, h) => {
    const response = h.response({
        status: 'success',
        data: {
            books: books.map(({ id, name, publisher }) => ({ id, name, publisher })),
        },
    });
    response.code(200);
    return response;
};

const getBookByIdHandler = (request, h) => {
    const { bookId } = request.params;
    const book = books.find((b) => b.id === bookId);

    if (!book) {
        const response = h.response({
            status: 'fail',
            message: 'Buku tidak ditemukan',
        });
        response.code(404);
        return response;
    }

    const response = h.response({
        status: 'success',
        data: {
            book,
        },
    });
    response.code(200);
    return response;
};

const updateBookByIdHandler = (request, h) => {
	const { bookId } = request.params;
	const { name, year, author, summary, publisher, pageCount, readPage, reading } =
		request.payload;

	if (!name) {
		const response = h.response({
			status: 'fail',
			message: 'Gagal memperbarui buku. Mohon isi nama buku',
		});
		response.code(400);
		return response;
	}

	if (readPage > pageCount) {
		const response = h.response({
			status: 'fail',
			message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
		});
		response.code(400);
		return response;
	}

	const index = books.findIndex((book) => book.id === bookId);

	if (index !== -1) {
		const finished = pageCount === readPage;
		const updatedAt = new Date().toISOString();

		books[index] = {
			...books[index],
			name,
			year,
			author,
			summary,
			publisher,
			pageCount,
			readPage,
			finished,
			reading,
			updatedAt,
		};

		const response = h.response({
			status: 'success',
			message: 'Buku berhasil diperbarui',
		});
		response.code(200);
		return response;
	}

	const response = h.response({
		status: 'fail',
		message: 'Gagal memperbarui buku. Id tidak ditemukan',
	});
	response.code(404);
	return response;
};

const deleteBookByIdHandler = (request, h) => {
    const { bookId } = request.params;
    const index = books.findIndex((b) => b.id === bookId);

    if (index === -1) {
        const response = h.response({
            status: 'fail',
            message: 'Buku gagal dihapus. Id tidak ditemukan',
        });
        response.code(404);
        return response;
    }

    books.splice(index, 1);

    const response = h.response({
        status: 'success',
        message: 'Buku berhasil dihapus',
    });
    response.code(200);
    return response;
};

module.exports = {
    addBookHandler,
    getAllBooksHandler,
    getBookByIdHandler,
    updateBookByIdHandler,
    deleteBookByIdHandler,
};