import createCard from './createCard.js';
export { deleteBookButton, toggleReadButton }

let myLibrary = [
    new Book("East of Eden", "John Steinbeck", "612", true),
    new Book("The Gunslinger", "Stephen King", "384", false)
];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

Book.prototype.toggleRead = function() {
    this.read = !this.read;
}

function addBookToLibrary() {
    const parsePages = () => {
        const response = prompt("Number of pages?");
        if (response === null || Number(response)) {
            return response;
        } else {
            alert("Not a valid number, please try again.");
            return parsePages();
        }
    }
    const parseRead = () => {
        const response = prompt("Have you read the book? (y/n)").toLowerCase();
        switch (response) {
            case "y" || null:
                return response;
                break;
            case "n": 
                return false;
                break;
            default:
                alert("Invalid response, please try again.");
                return parseRead();
        }
    }
    const parseUserInput = () => {
        const title = prompt("Book title?");
        if (!title) return false;
        const author = prompt("Book author?");
        if (!author) return false;
        const pages = parsePages();
        if (!pages) return false;
        const read = parseRead();
        if (!read) return false;

        return [title, author, pages, read];
    }

    const parsedInput = parseUserInput();

    if (parsedInput) {
        const newBook = new Book(...parsedInput)
        myLibrary.push(newBook);
        render(myLibrary);
    } else {
        render(myLibrary);
    }
}

const deleteBookButton = (e) => {
    const bookId = Number(e.target.parentNode.parentNode.parentNode.id.slice(-1));
    myLibrary.splice(bookId, 1);
    render(myLibrary);
}

const toggleReadButton = (e) => {
    const bookId = Number(e.target.parentNode.parentNode.parentNode.id.slice(-1));
    myLibrary[bookId].toggleRead();
    render(myLibrary);
}

const render = (library) => {
    const libraryNode = document.getElementById("library");
    while (libraryNode.firstChild) libraryNode.removeChild(libraryNode.firstChild);
    library.map((book, index) => {
        createCard(book["title"], book["author"], book["pages"], book["read"], index);
    });
}

document.getElementById("add-book").addEventListener("click", addBookToLibrary);
render(myLibrary); 
