const { nanoid } = require('nanoid');

const books = [];

const addBookHandler = (request, h) => {
	const { name, year, author, summary, publisher, pageCount, readPage, reading } =
		request.payload;

	if (!name) {
		return h
			.response({
				status: 'fail',
				message: 'Gagal menambahkan buku. Mohon isi nama buku',
			})
			.code(400);
	}

	if (readPage > pageCount) {
		return h
			.response({
				status: 'fail',
				message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
			})
			.code(400);
	}

	const id = nanoid(16); // Pastikan ID dibuat
	const finished = pageCount === readPage;
	const insertedAt = new Date().toISOString();
	const updatedAt = insertedAt;

	const newBook = {
		id, // Pastikan ID dimasukkan ke objek buku
		name,
		year,
		author,
		summary,
		publisher,
		pageCount,
		readPage,
		finished,
		reading,
		insertedAt,
		updatedAt,
	};

	books.push(newBook);

	return h
		.response({
			status: 'success',
			message: 'Buku berhasil ditambahkan',
			data: {
				bookId: id,
			},
		})
		.code(201);
};

const getAllBooksHandler = (request, h) => {
	try {
		const { name, reading, finished } = request.query;

		let filteredBooks = [...books];

		if (name) {
			filteredBooks = filteredBooks.filter((book) =>
				book.name.toLowerCase().includes(name.toLowerCase()),
			);
		}

		if (reading !== undefined) {
			filteredBooks = filteredBooks.filter((book) => book.reading === !!Number(reading));
		}

		if (finished !== undefined) {
			filteredBooks = filteredBooks.filter((book) => book.finished === !!Number(finished));
		}

		// Perbaikan: Pastikan response memiliki id, name, dan publisher
		return h
			.response({
				status: 'success',
				data: {
					books: filteredBooks.map(({ id, name, publisher }) => ({
						id, // Tambahkan id di sini
						name,
						publisher,
					})),
				},
			})
			.code(200);
	} catch (error) {
		console.error('Error getting books:', error);
		return h
			.response({
				status: 'error',
				message: 'Gagal mengambil buku',
			})
			.code(500);
	}
};

const getBookByIdHandler = (request, h) => {
	const { bookId } = request.params;
	const book = books.find((b) => b.id === bookId);

	if (book) {
		// Clone book object dan set id ke null
		const bookResponse = {
			id: undefined, // Set id ke null alih-alih undefined
			name: book.name,
			year: book.year,
			author: book.author,
			summary: book.summary,
			publisher: book.publisher,
			pageCount: book.pageCount,
			readPage: book.readPage,
			finished: book.finished,
			reading: book.reading,
			insertedAt: book.insertedAt,
			updatedAt: book.updatedAt,
		};

		return h
			.response({
				status: 'success',
				data: {
					book: bookResponse,
				},
			})
			.code(200);
	}

	return h
		.response({
			status: 'fail',
			message: 'Buku tidak ditemukan',
		})
		.code(404);
};

const updateBookByIdHandler = (request, h) => {
	try {
		const { bookId } = request.params;
		const { name, year, author, summary, publisher, pageCount, readPage, reading } =
			request.payload;

		// Validate required name field
		if (!name) {
			return h
				.response({
					status: 'fail',
					message: 'Gagal memperbarui buku. Mohon isi nama buku',
				})
				.code(400);
		}

		// Validate readPage not greater than pageCount
		if (readPage > pageCount) {
			return h
				.response({
					status: 'fail',
					message:
						'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
				})
				.code(400);
		}

		const index = books.findIndex((book) => book.id === bookId);

		if (index === -1) {
			return h
				.response({
					status: 'fail',
					message: 'Gagal memperbarui buku. Id tidak ditemukan',
				})
				.code(404);
		}

		const updatedAt = new Date().toISOString();
		const finished = pageCount === readPage;

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

		return h
			.response({
				status: 'success',
				message: 'Buku berhasil diperbarui',
			})
			.code(200);
	} catch (error) {
		console.error('Error updating book:', error);
		return h
			.response({
				status: 'error',
				message: 'Gagal memperbarui buku',
			})
			.code(500);
	}
};

const deleteBookByIdHandler = (request, h) => {
	try {
		const { bookId } = request.params;
		const index = books.findIndex((book) => book.id === bookId);

		if (index === -1) {
			return h
				.response({
					status: 'fail',
					message: 'Buku gagal dihapus. Id tidak ditemukan',
				})
				.code(404);
		}

		books.splice(index, 1);

		return h
			.response({
				status: 'success',
				message: 'Buku berhasil dihapus',
			})
			.code(200);
	} catch (error) {
		console.error('Error deleting book:', error);
		return h
			.response({
				status: 'error',
				message: 'Gagal menghapus buku',
			})
			.code(500);
	}
};

module.exports = {
	addBookHandler,
	getAllBooksHandler,
	getBookByIdHandler,
	updateBookByIdHandler,
	deleteBookByIdHandler,
};
