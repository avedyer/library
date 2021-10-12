let myLibrary = [];

function Book (title, author, pages, read) {
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
}

function addBookToLibrary(title, author, pages, read) {
    const newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);
}

let displayLibrary = () => {console.table(myLibrary)}

const book1 = new Book("Goldfinch", "Mary Murray", 586, false);
const book2 = new Book("After Dawn", "John Maxcock", 194, true);

myLibrary.push(book1, book2);

let tbody = document.querySelector("tbody")

let displayLibrary = () => {    
    myLibrary.forEach(function (book) {

        let newRow = tbody.insertRow();

        let i = 0;
        for(const key in book ) {
            let newCell = newRow.insertCell(i);
            newCell.innerHTML = book[key];
            ++i;
        }
    });
}