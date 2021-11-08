function attachEvents() {
    document.getElementById('refresh').addEventListener('click', loadMessages);

    document.getElementById('submit').addEventListener('click', onSubmit);
    
    loadMessages();
}

let authorInput = document.querySelector('[name="author"]');
let contentInput = document.querySelector('[name="content"]');
let list = document.getElementById('messages');

attachEvents();

async function onSubmit() {
    let author = authorInput.value;
    let content = contentInput.value;

    let message = { author, content };

    const result = await createMessage(message);
    contentInput.value = '';
    await loadMessages();
}

async function loadMessages() {
    const url = 'http://localhost:3030/jsonstore/messenger';

    const res = await fetch(url);
    const data = await res.json();
    const messages = Object.values(data);

    let result = [];
    for(let item of messages){
        result.push(`${item.author}: ${item.content}`);
    }
    list.textContent = result.join('\n');
    
}

async function createMessage(message) {
    const url = 'http://localhost:3030/jsonstore/messenger';

    const options = {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(message)
    };

    try{
        const res = await fetch(url, options);
        if(res.ok != true){
            const error = await res.json();
            throw new Error(`Error...${error.message}`);
        }

        const data = await res.json();
        return data;
    }catch(err){
        alert(err.message);
    }
}
