import { toggleReadButton, deleteBookButton } from './script.js'

export default (bookTitle, bookAuthor, bookPages, bookRead, index) => {

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

    const author = document.createElement("p");
    author.className = "subtitle";
    author.textContent = `Author: ${bookAuthor}`;
    cardContent.appendChild(author);

    const cardFooter = document.createElement("footer");
    cardFooter.className = "card-footer";
    card.appendChild(cardFooter);

    const pages = document.createElement("p");
    pages.className = "card-footer-item";
    pages.textContent = `Pages: ${bookPages}`;
    cardFooter.appendChild(pages);

    const toggleRead = document.createElement("button");
    toggleRead.id = bookTitle
    toggleRead.addEventListener("click", toggleReadButton);
    toggleRead.className = "card-footer-item button is-link is-inverted";
    toggleRead.textContent = (bookRead) ? "Status: read" : "Status: unread";
    cardFooter.appendChild(toggleRead);

    const deleteButton = document.createElement("button");
    deleteButton.id = bookTitle
    deleteButton.addEventListener("click", deleteBookButton);
    deleteButton.className = "card-footer-item button is-danger is-inverted";
    deleteButton.textContent = "Delete";
    cardFooter.appendChild(deleteButton);
};
