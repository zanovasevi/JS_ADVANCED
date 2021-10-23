window.addEventListener('load', solve);

function solve() {
    let sections = document.getElementsByTagName('section');
    let section1 = sections[1];
    let section2 = sections[2];
    let section3 = sections[3];
    let section4 = sections[4];

    let genre = document.getElementById('genre');
    let name = document.getElementById('name');
    let author = document.getElementById('author');
    let date = document.getElementById('date');
    let buttonAdd = document.getElementById('add-btn');

    let totalLikes = 0;


    buttonAdd.addEventListener('click', (ev) => {
        ev.preventDefault();

        if(genre.value == '' || name.value == '' || author.value == '' || date.value == ''){
            return;
        }

        let sectionDiv = document.getElementsByTagName('section')[2].children[0];

        let div = document.createElement('div');
        div.setAttribute('class', 'hits-info');
        sectionDiv.appendChild(div);

        let img = document.createElement('img');
        img.setAttribute('src', './static/img/img.png');
        div.appendChild(img);

        let h2 = document.createElement('h2');
        h2.textContent = `Genre: ${genre.value}`;
        div.appendChild(h2);

        let h2Name = document.createElement('h2');
        h2Name.textContent = `Name: ${name.value}`;
        div.appendChild(h2Name);

        let h2Author = document.createElement('h2');
        h2Author.textContent = `Author: ${author.value}`;
        div.appendChild(h2Author);

        let h3 = document.createElement('h3');
        h3.textContent = `Date: ${date.value}`;
        div.appendChild(h3);

        //-----------------------------------------------
        let buttonSave = document.createElement('button');
        buttonSave.setAttribute('class', 'save-btn');
        buttonSave.textContent = 'Save song';
        div.appendChild(buttonSave);

        let buttonLike = document.createElement('button');
        buttonLike.setAttribute('class', 'like-btn');
        buttonLike.textContent = 'Like song';
        div.appendChild(buttonLike);

        let buttonDelete = document.createElement('button');
        buttonDelete.setAttribute('class', 'delete-btn');
        buttonDelete.textContent = 'Delete';
        div.appendChild(buttonDelete);

        genre.value = '';
        name.value = '';
        author.value = '';
        date.value = '';



        buttonLike.addEventListener('click', (ev) => {
            ev.preventDefault();

            let p = document.querySelector('#total-likes p');
            totalLikes++;
            p.textContent = `Total Likes: ${totalLikes}`;
            buttonLike.disabled = true;
        });

        buttonSave.addEventListener('click', (ev) => {
            ev.preventDefault();

            let section3Div = document.getElementsByTagName('section')[3].children[0];

            sectionDiv.removeChild(div);
            section3Div.appendChild(div);
            div.removeChild(buttonSave);
            div.removeChild(buttonLike);
            div.removeChild(buttonDelete);

            let btnDelete = document.createElement('button');
            btnDelete.setAttribute('class', 'delete-btn');
            btnDelete.textContent = 'Delete';
            div.appendChild(btnDelete);

            btnDelete.addEventListener('click', (ev) => {
                ev.preventDefault();

                section3Div.removeChild(div);
            });
        });

        buttonDelete.addEventListener('click', (ev) => {
            ev.preventDefault();

            sectionDiv.removeChild(div);
        });
    });
}
