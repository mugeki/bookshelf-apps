document.addEventListener("DOMContentLoaded", () => {
	const formCheckbox = document.getElementById("inputBookIsComplete");
	const submitForm = document.getElementById("inputBook");
	const searchBook = document.getElementById("searchBook");

	formCheckbox.addEventListener("click", () => {
		changeSubmitButtonText();
	});

	submitForm.addEventListener("submit", (event) => {
		event.preventDefault();
		addBook();
	});

	searchBook.addEventListener("submit", (event) => {
		event.preventDefault();
		findBook();
	});

	if (isStorageExist()) {
		loadData();
	}
});

document.addEventListener("ondatasaved", () => {
	console.log("Data tersimpan pada storage");
});

document.addEventListener("ondataloaded", () => {
	refreshDataFromStorage();
});
