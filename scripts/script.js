import createCard from './createCard.js';
export { deleteBookButton, toggleReadButton }

// Firebase configuration

const firebaseConfig = {
    apiKey: "AIzaSyB1den_lakXXB3mbFTMzKlm-l_5Xo1KhsQ",
    authDomain: "library-project-1030f.firebaseapp.com",
    databaseURL: "https://library-project-1030f.firebaseio.com",
    projectId: "library-project-1030f",
    storageBucket: "library-project-1030f.appspot.com",
    messagingSenderId: "681119190151",
    appId: "1:681119190151:web:ada8f10aec6e2bbd3ebc22"
};
firebase.initializeApp(firebaseConfig);  
let db = firebase.firestore();

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

let myLibrary = [];

// Library modifiers

const addBookToLibrary = () => {
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
            case "y":
                return response;
                break;
            case "n":
                return response;
                break;
            case null:
                return !!response;
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
        db.collection("books").doc(newBook.title).set({
            title: newBook.title,
            author: newBook.author,
            pages: newBook.pages,
            read: (newBook.read === "y") ? true : false,
        })
        .then(function() {
            console.log("Document successfully written!");
        })
        .catch(function(error) {
            console.error("Error writing document: ", error);
        });
        render();
    } else {
        render();
    }
}

const deleteBookButton = (e) => {
    db.collection("books").doc(e.target.id).delete().then(function() {
        console.log("Document successfully deleted!");
    }).catch(function(error) {
        console.error("Error removing document: ", error);
    });
    render();
}

const toggleReadButton = (e) => {
    const read = myLibrary.find(book => book.title === e.target.id).read;

    db.collection("books").doc(e.target.id).set({
        read: !read,
    }, { merge: true })
    .then(function() {
        console.log("Document successfully written!");
    })
    .catch(function(error) {
        console.error("Error writing document: ", error);
    }).then(render());
}

// Rendering library 

const render = () => {
    let newLibrary = [];
    db.collection("books").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            const data = doc.data();
            let book = new Book(data.title, data.author, data.pages, data.read);
            newLibrary.push(book);
        });
        myLibrary = newLibrary;
    })
    .then(() => {
        const libraryNode = document.getElementById("library");
        while (libraryNode.firstChild) libraryNode.removeChild(libraryNode.firstChild);
    
        myLibrary.map((book, index) => {
            createCard(book["title"], book["author"], book["pages"], book["read"], index);
        });
    });
}

document.getElementById("add-book").addEventListener("click", addBookToLibrary);

render();
