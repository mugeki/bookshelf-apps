const COMPLETED_LIST_BOOK_ID = "completeBookshelfList";
const INCOMPLETED_LIST_BOOK_ID = "incompleteBookshelfList";
const BOOK_ID = "bookId";

function makeBook(title, author, year, isComplete) {
	const bookContainer = document.createElement("article");
	bookContainer.classList.add("book_item");

	const buttonContainer = document.createElement("div");
	buttonContainer.classList.add("action");

	const bookTitle = document.createElement("h3");
	bookTitle.classList.add("book_title");
	bookTitle.innerText = title;

	const bookAuthor = document.createElement("p");
	bookAuthor.innerHTML = '<span class="font-semibold">Penulis: </span>' + author;

	const bookYear = document.createElement("p");
	bookYear.innerHTML = '<span class="font-semibold">Tahun: </span>' + year;

	bookContainer.append(bookTitle, bookAuthor, bookYear, buttonContainer);
	buttonContainer.append(makeGreenButton(isComplete), makeRedButton());
	return bookContainer;
}

function makeGreenButton(isComplete) {
	if (isComplete) {
		return makeButton("btn-green", "Belum selesai dibaca", (event) => {
			addToIncompletedBook(event.target.parentElement.parentElement);
		});
	}
	return makeButton("btn-green", "Selesai dibaca", (event) => {
		addToCompletedBook(event.target.parentElement.parentElement);
	});
}

function makeRedButton() {
	return makeButton("btn-red", "Hapus buku", (event) => {
		deleteBook(event.target.parentElement.parentElement);
	});
}

function makeButton(buttonClass, buttonText, eventListener) {
	const button = document.createElement("button");
	button.innerText = buttonText;
	button.classList.add("btn");
	button.classList.add(buttonClass);
	button.addEventListener("click", (event) => {
		eventListener(event);
	});
	return button;
}

function addBook() {
	const completedBookList = document.getElementById(COMPLETED_LIST_BOOK_ID);
	const incompletedBookList = document.getElementById(INCOMPLETED_LIST_BOOK_ID);
	const bookTitle = document.getElementById("inputBookTitle").value;
	const bookAuthor = document.getElementById("inputBookAuthor").value;
	const bookYear = document.getElementById("inputBookYear").value;
	const bookIsComplete = document.getElementById("inputBookIsComplete").checked;
	const book = makeBook(bookTitle, bookAuthor, bookYear, bookIsComplete);
	const bookObject = makeBookObject(bookTitle, bookAuthor, bookYear, bookIsComplete);

	book[BOOK_ID] = bookObject.id;
	books.push(bookObject);

	if (bookIsComplete) {
		completedBookList.append(book);
	} else {
		incompletedBookList.append(book);
	}
	updateData();
}

function addToIncompletedBook(bookElement) {
	const incompletedBookList = document.getElementById(INCOMPLETED_LIST_BOOK_ID);
	const bookTitle = bookElement.childNodes[0].innerText;
	const bookAuthor = bookElement.childNodes[1].innerHTML.replace('<span class="font-semibold">Penulis: </span>', "");
	const bookYear = bookElement.childNodes[2].innerHTML.replace('<span class="font-semibold">Tahun: </span>', "");
	const newBook = makeBook(bookTitle, bookAuthor, bookYear, false);
	const book = findBookFromStorage(bookElement[BOOK_ID]);

	book.isComplete = false;
	newBook[BOOK_ID] = book.id;
	incompletedBookList.append(newBook);
	bookElement.remove();
	updateData();
}

function addToCompletedBook(bookElement) {
	const completedBookList = document.getElementById(COMPLETED_LIST_BOOK_ID);
	const bookTitle = bookElement.childNodes[0].innerText;
	const bookAuthor = bookElement.childNodes[1].innerHTML.replace('<span class="font-semibold">Penulis: </span>', "");
	const bookYear = bookElement.childNodes[2].innerHTML.replace('<span class="font-semibold">Tahun: </span>', "");
	const newBook = makeBook(bookTitle, bookAuthor, bookYear, true);
	const book = findBookFromStorage(bookElement[BOOK_ID]);

	book.isComplete = true;
	newBook[BOOK_ID] = book.id;
	completedBookList.append(newBook);
	bookElement.remove();
	updateData();
}

function deleteBook(bookElement) {
	const bookPosition = findBookIdxFromStorage(bookElement[BOOK_ID]);
	let confirmDelete = confirm("Apakah anda yakin untuk menghapus buku ini?");
	if (confirmDelete) {
		books.splice(bookPosition, 1);
		bookElement.remove();
		updateData();
	}
}

function findBook() {
	const existingBookList = document.getElementsByClassName("book_item");
	const bookTitle = document.getElementById("searchBookTitle").value;

	for (let i = 0; i < existingBookList.length; i++) {
		let bookFound = existingBookList[i].childNodes[0].innerText.toLowerCase() == bookTitle.toLowerCase();

		if (bookFound || bookTitle == "") {
			existingBookList[i].style.display = "block";
		} else if (!bookFound) {
			existingBookList[i].style.display = "none";
		}
	}
}

function changeSubmitButtonText() {
	const submitText = document.getElementById("bookSubmit");
	const isCompleteCheckbox = document.getElementById("inputBookIsComplete");
	if (isCompleteCheckbox.checked) {
		submitText.children[0].innerText = "Selesai dibaca";
	} else {
		submitText.children[0].innerText = "Belum selesai dibaca";
	}
}
