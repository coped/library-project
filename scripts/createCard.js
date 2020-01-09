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
    cardFooterItem2.addEventListener("click", toggleReadButton);
    cardFooterItem2.className = "card-footer-item button is-link is-inverted";
    cardFooterItem2.textContent = (bookRead) ? "Status: read" : "Status: unread";
    cardFooter.appendChild(cardFooterItem2);

    const cardFooterItem3 = document.createElement("button");
    cardFooterItem3.addEventListener("click", deleteBookButton);
    cardFooterItem3.className = "card-footer-item button is-danger is-inverted";
    cardFooterItem3.textContent = "Delete";
    cardFooter.appendChild(cardFooterItem3);
};