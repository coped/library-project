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

function addBookToLibrary() {
    const parseTitle = () => {
        const response = prompt("Book title?");
        return (response === null) ? null : response;
    }
    const parseAuthor = () => {
        const response = prompt("Book author?");
        return (response === null) ? null : response;
    }
    const parsePages = () => {
        const response = prompt("Number of pages?");
        if (response === null) {
            return null;
        } else if (Number(response)) {
            return response;
        } else {
            alert("Not a valid number, please try again.");
            return parsePages();
        }
    }
    const parseRead = () => {
        const response = prompt("Have you read the book? (y/n)").toLowerCase();
        switch (response) {
            case null:
                return null;
                break;
            case "y":
                return true;
                break;
            case "n": 
                return false;
            default:
                alert("Invalid response, please try again.");
                return parseRead();
        }
    }

    const parseInput = () => {
        const title = parseTitle();
        if (title === null) return false;
        const author = parseAuthor();
        if (author === null) return false;
        const pages = parsePages();
        if (pages === null) return false;
        const read = parseRead();
        if (read === null) return false;

        return [title, author, pages, read];
    }

    const parsedInput = parseInput();

    if (parsedInput) {
        const newBook = new Book(...parsedInput)
        myLibrary.push(newBook);
        render(myLibrary);
    } else {
        render(myLibrary);
    }
}

const deleteBook = (e) => {
    const bookId = Number(e.target.parentNode.parentNode.parentNode.id.slice(-1));
    myLibrary.splice(bookId, 1);
    render(myLibrary);
}

const toggleRead = (e) => {
    const bookId = Number(e.target.parentNode.parentNode.parentNode.id.slice(-1));
    myLibrary[bookId]["read"] = !myLibrary[bookId]["read"];
    render(myLibrary);
}

const createCard = (bookTitle, bookAuthor, bookPages, bookRead, index) => {
    const libraryList = document.getElementById("library");

    const container = document.createElement("section");
    container.className = "section";
    container.id = `book-${index}`;
    libraryList.appendChild(container);

    const card = document.createElement("div");
    card.className = "card";
    container.appendChild(card);

    const cardContent = document.createElement("div");
    cardContent.className = "card-content";
    card.appendChild(cardContent);

    const title = document.createElement("p");
    title.className = "title";
    title.textContent = bookTitle;
    cardContent.appendChild(title);

    const subtitle = document.createElement("p");
    subtitle.className = "subtitle";
    subtitle.textContent = `Author: ${bookAuthor}`;
    cardContent.appendChild(subtitle);

    const cardFooter = document.createElement("footer");
    cardFooter.className = "card-footer";
    card.appendChild(cardFooter);

    const cardFooterItem1 = document.createElement("p");
    cardFooterItem1.className = "card-footer-item";
    cardFooterItem1.textContent = `Pages: ${bookPages}`;
    cardFooter.appendChild(cardFooterItem1);

    const cardFooterItem2 = document.createElement("button");
    cardFooterItem2.addEventListener("click", toggleRead);
    cardFooterItem2.className = "card-footer-item button is-link is-inverted";
    cardFooterItem2.textContent = (bookRead) ? "Status: read" : "Status: unread";
    cardFooter.appendChild(cardFooterItem2);

    const cardFooterItem3 = document.createElement("button");
    cardFooterItem3.addEventListener("click", deleteBook);
    cardFooterItem3.className = "card-footer-item button is-danger is-inverted";
    cardFooterItem3.textContent = "Delete";
    cardFooter.appendChild(cardFooterItem3);
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

