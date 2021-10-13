let myLibrary = [];

const bookshelf = document.getElementById('bookshelf');
const newBookForm = document.querySelector('.newBook');
const newBookSubmit = document.querySelector('.newBookSubmit')

newBookSubmit.onclick = () => {
    const title = document.querySelector('#titleInput').value;
    const author = document.querySelector('#authorInput').value;
    const pages = document.querySelector('#pagesInput').value;
    const read = document.querySelector('#readInput').checked;
    addBookToLibrary(title, author, pages, read);
}

function Book (title, author, pages, read, id) {
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
    this.id = id
}

let writeID = function(){
    let id = Math.floor(Math.random() * (2**32))
    myLibrary.forEach(function (book) {
        if (book.id === id)
        writeID();
    });
    return id;
}

function addBookToLibrary(title, author, pages, read) {
    
    let bookExists = false;

    myLibrary.forEach(function (book) {
        if (title === book.title && author === book.author) {
            alert("This book has already been added to your library.");
            bookExists = true;
        }
    });

    if(!bookExists){
        const newBook = new Book(title, author, pages, read, writeID());
        myLibrary.push(newBook);
    }
}

let displayLibrary = () => {    

    bookshelf.innerHTML = '';
    myLibrary.forEach(function (book) {
        let newDeleteElement = document.createElement('button');
        newDeleteElement.setAttribute('type', 'button');
        newDeleteElement.classList.add('delete');
        newDeleteElement.innerHTML = "x";

        newDeleteElement.onclick = () => {
            let index = myLibrary.indexOf(book);
            myLibrary.splice(index, 1);
            displayLibrary();
        }

        let newTitleElement = document.createElement('h2');
        newTitleElement.classList.add('title');
        newTitleElement.innerHTML = book.title;

        let newAuthorElement = document.createElement('h3');
        newAuthorElement.classList.add('author');
        newAuthorElement.innerHTML = book.author;

        let newPagesElement = document.createElement('h3');
        newPagesElement.classList.add('pages');
        newPagesElement.innerHTML = book.pages;

        let newReadElement = document.createElement('h3');
        newReadElement.classList.add('read');
        newReadElement.innerHTML = book.read ? "read" : "unread";


        newReadElement.onclick = () => {
            book.read = !book.read;
            displayLibrary();
        }

        let newBookElement = document.createElement('div')
        newBookElement.classList.add('book')
        newBookElement.append(newDeleteElement, newTitleElement, newAuthorElement, newPagesElement, newReadElement);

        bookshelf.appendChild(newBookElement);
    });
}

const book1 = new Book("Goldfinch", "Mary Murray", 586, false, writeID());
const book2 = new Book("After Dawn", "John Maxcock", 194, true, writeID());

myLibrary.push(book1, book2);