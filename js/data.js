const STORAGE_KEY = "BOOKSHELF_APPS";

let books = [];

function isStorageExist() {
	if (typeof Storage === undefined) {
		alert("Browser anda tidak mendukung web storage");
		return false;
	}
	return true;
}

function saveData() {
	const parsed = JSON.stringify(books);
	localStorage.setItem(STORAGE_KEY, parsed);
	document.dispatchEvent(new Event("ondatasaved"));
}

function loadData() {
	const storageData = localStorage.getItem(STORAGE_KEY);
	let data = JSON.parse(storageData);

	if (data != null) {
		books = data;
	}

	document.dispatchEvent(new Event("ondataloaded"));
}

function makeBookObject(title, author, year, isComplete) {
	return {
		id: +new Date(),
		title,
		author,
		year,
		isComplete,
	};
}

function updateData() {
	if (isStorageExist()) {
		saveData();
	}
}

function findBookFromStorage(bookId) {
	for (let book of books) {
		if (book.id === bookId) {
			return book;
		}
	}
	return null;
}

function findBookIdxFromStorage(bookId) {
	let idx = 0;
	for (let book of books) {
		if (book.id === bookId) {
			return idx;
		}
		idx++;
	}
	return -1;
}

function refreshDataFromStorage() {
	const completedBookList = document.getElementById(COMPLETED_LIST_BOOK_ID);
	const incompletedBookList = document.getElementById(INCOMPLETED_LIST_BOOK_ID);

	for (let book of books) {
		const newBook = makeBook(book.title, book.author, book.year, book.isComplete);
		newBook[BOOK_ID] = book.id;

		if (book.isComplete) {
			completedBookList.append(newBook);
		} else {
			incompletedBookList.append(newBook);
		}
	}
}
