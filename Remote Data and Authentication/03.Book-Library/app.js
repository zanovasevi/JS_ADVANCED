let form = document.querySelector('form');
let formEdit = document.getElementById('form-edit');
let tbody = document.querySelector('tbody');
let titleInput = document.querySelector('[name="title"]');
let authorInput = document.querySelector('[name="author"]');
let titleInputEdit = document.querySelector('[name="title-edit"]');
let authorInputEdit = document.querySelector('[name="author-edit"]');
let btnSave = document.getElementById('btnSave');


let btnLoadBooks = document.getElementById('loadBooks').addEventListener('click', loadBooks);
let btnSubmit = document.querySelector('form button').addEventListener('click', onSubmit);
tbody.addEventListener('click', onDeleteOrEdit);



async function onDeleteOrEdit(event) {
    let id = event.target.dataset.id;
    let idEdit = event.target.dataset.idedit;
    if(id != undefined){
        await deleteBook(id);
        await loadBooks();
    }

    if(idEdit != undefined){
        let title = titleInputEdit.value;
        let author = authorInputEdit.value;

        let resultt = await getBookById(idEdit);
        titleInputEdit.value = resultt.title;
        authorInputEdit.value = resultt.author;

        formEdit.style.display = 'block';
        form.style.display = 'none';
        btnSave.addEventListener('click', onSave);

        async function onSave(event) {
            event.preventDefault();
            
            let obj = {
                title: `${titleInputEdit.value}`,
                author: `${authorInputEdit.value}`
            };

            await putBook(idEdit, obj);

            titleInputEdit.value = '';
            authorInputEdit.value = '';

            formEdit.style.display = 'none';
            form.style.display = 'block';

            await loadBooks();
        }
    }
}

async function onSubmit(event) {
    event.preventDefault();
    let title = titleInput.value;
    let author = authorInput.value;

    if(title == '' || author == ''){
        return;
    }

    let obj = {
        author: `${author}`,
        title: `${title}`
    };

    await postBook(obj);
    
    titleInput.value = '';
    authorInput.value = '';

    await loadBooks();
}

function createElement(id, title, author) {
    let tr = document.createElement('tr');
    let td1 = document.createElement('td');
    let td2 = document.createElement('td');
    let td3 = document.createElement('td');

    let btnEdit = document.createElement('button');
    let btnDelete = document.createElement('button');

    btnDelete.setAttribute('data-id', `${id}`);
    btnEdit.setAttribute('data-idedit', `${id}`);

    td1.textContent = title;
    td2.textContent = author;
    btnEdit.textContent = 'Edit';
    btnDelete.textContent = 'Delete';

    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);

    td3.appendChild(btnEdit);
    td3.appendChild(btnDelete);

    return tr;
}

async function loadBooks() {
    tbody.replaceChildren();
    let allBooks = await getBooks();

    for(let book of allBooks){

        let id = book[0];
        let title = book[1].title;
        let author = book[1].author;

        let tr = createElement(id, title, author);
        tbody.appendChild(tr);
    }
}

// GET BY ID
async function getBookById(id) {
    const url = 'http://localhost:3030/jsonstore/collections/books/' + id;

    const res = await fetch(url);
    const result = await res.json();

    // const allBooks = Object.entries(result);
    return result;
}

// GET
async function getBooks() {
    const url = 'http://localhost:3030/jsonstore/collections/books';

    const res = await fetch(url);
    const result = await res.json();

    const allBooks = Object.entries(result);
    return allBooks;
}

// POST
async function postBook(data) {
    const url = 'http://localhost:3030/jsonstore/collections/books';

    const options = {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };

    const res = await fetch(url, options);
    const result = await res.json();
    return result;
}

// DELETE
async function deleteBook(id) {
    const url = 'http://localhost:3030/jsonstore/collections/books/' + id;

    const options = {
        method: 'delete'
    };

    const res = await fetch(url, options);
    const result = await res.json();

    return result;
}

// PUT
async function putBook(id, data) {
    const url = 'http://localhost:3030/jsonstore/collections/books/' + id;

    const options = {
        method: 'put',
        headers: {
            'Content-Type': 'applications/json'
        },
        body: JSON.stringify(data)
    };

    const res = await fetch(url, options);
    const result = await res.json();
    return result;
}
