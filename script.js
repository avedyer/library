const bookshelf = document.getElementById('bookshelf');
const formBox = document.querySelector('.formBox');
const newBookSubmit = document.querySelector('.newBookSubmit');
const newBookButton = document.querySelector('.newBookButton');
const newBookCancel = document.querySelector('.newBookCancel');
const pagesInput = document.getElementById('pagesInput');
const deleteLibraryButton = document.querySelector('.deleteLibraryButton');

let myLibrary = [];

if(!localStorage.getItem('myLibrary')){
    populateStorage();
}

else {
    myLibrary = JSON.parse(localStorage.getItem('myLibrary'));
}

function populateStorage () {
    localStorage.setItem('myLibrary', JSON.stringify(myLibrary));
}

newBookButton.onclick = () => {
    formBox.style.display = "block";
}

newBookCancel.onclick = () => {
    formBox.style.display = "none";
}

newBookSubmit.onclick = () => {
    let librarySize = myLibrary.length;

    const title = document.querySelector('#titleInput').value;
    const author = document.querySelector('#authorInput').value;
    const pages = pagesInput.value;
    const read = document.querySelector('#readInput').checked;

    if(!title || !author) {
        alert ('Please fill out each field.');
        return;
    }

    if(pagesInput.value.match(/^[0-9]+$/) === null) {
        alert('Please enter a numerical page value');
        pagesInput.value = '';
        return;
    }


    addBookToLibrary(title, author, pages, read);
     if (librarySize < myLibrary.length) {
        formBox.style.display = "none";
     }
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

    populateStorage();
    displayLibrary();
}

let displayLibrary = () => {    

    bookshelf.innerHTML = '';
    myLibrary.forEach(function (book) {
        let newDeleteElement = document.createElement('button');
        newDeleteElement.setAttribute('type', 'button');
        newDeleteElement.classList.add('delete');
        newDeleteElement.innerHTML = "Remove this title";

        newDeleteElement.onclick = () => {
            let index = myLibrary.indexOf(book);
            myLibrary.splice(index, 1);
            populateStorage();
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
        let pages = book.pages + ' pages'
        newPagesElement.innerHTML = pages;

        let newSpanElement = document.createElement('span');
        newSpanElement.classList.add('unreadSpan');
        newSpanElement.innerHTML = 'un';

        let newReadElement = document.createElement('h3');
        newReadElement.classList.add('read');
        newReadElement.innerHTML = 'read';

        if (!book.read) {
            newReadElement.prepend(newSpanElement);
        }


        newReadElement.onclick = () => {
            book.read = !book.read;
            displayLibrary();
        }

        let newBookElement = document.createElement('div');
        newBookElement.classList.add('book');
        newBookElement.append(newTitleElement, newAuthorElement, newPagesElement, newReadElement, newDeleteElement);

        bookshelf.appendChild(newBookElement);
    });
}

deleteLibraryButton.onclick = () => {
    if (confirm('Delete your library? This cannot be undone.')) {
        myLibrary = [];
        populateStorage();
        displayLibrary();
    }
}

displayLibrary();