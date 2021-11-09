let personInput = document.getElementById('person');
let phoneInput = document.getElementById('phone');
let ul = document.getElementById('phonebook');

function attachEvents() {
    document.getElementById('btnLoad').addEventListener('click', loadData);
    document.getElementById('btnCreate').addEventListener('click', onCreate);
    ul.addEventListener('click', onDelete);
}

attachEvents();

async function onDelete(event) {
    
    let id = event.target.id;
    console.log(id);

    if(event.target.tagName == 'BUTTON'){
        await deleteData(id);
        await loadData();
    }

}


async function onCreate() {
    let person = personInput.value;
    let phone = phoneInput.value;

    let contact = { person, phone };

    await postData(contact);
    loadData();
    personInput.value = '';
    phoneInput.value = '';
}

async function loadData() {
    const url = 'http://localhost:3030/jsonstore/phonebook';
    
    ul.replaceChildren();

    const res = await fetch(url);
    const data = await res.json();

    const info = Object.values(data);

    for(let item of info){
        let li = document.createElement('li');
        li.textContent = `${item.person}: ${item.phone}`;
        ul.appendChild(li);

        let btnDelete = document.createElement('button');
        btnDelete.textContent = 'Delete';
        btnDelete.setAttribute('id', `${item._id}`);
        li.appendChild(btnDelete);
    }

    return info;
}

async function postData(data) {
    const url = 'http://localhost:3030/jsonstore/phonebook';

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

async function deleteData(id) {
    const url = `http://localhost:3030/jsonstore/phonebook/` + id;

    const options = {
        method: 'delete'
    };

    const res = await fetch(url, options);
    const result = await res.json();
    
    return result;
}
