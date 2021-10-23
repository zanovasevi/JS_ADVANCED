function solve() {
    let task = document.getElementById('task');
    let description = document.getElementById('description');
    let date = document.getElementById('date');
    let buttonAdd = document.getElementById('add');

    let sections = document.getElementsByTagName('section');

    buttonAdd.addEventListener('click', (ev) => {
        ev.preventDefault();

        if (task.value == '' || description.value == '' || date.value == '') {
            return;
        }

        let openSectionDiv = sections[1].children[1];
        let progressSectionDiv = sections[2].children[1];
        let completeSectionDiv = sections[3].children[1];

        let article = document.createElement('article');
        openSectionDiv.appendChild(article);

        let h3 = document.createElement('h3');
        h3.textContent = task.value;
        article.appendChild(h3);

        let pDescription = document.createElement('p');
        pDescription.textContent = `Description: ${description.value}`;
        article.appendChild(pDescription);

        let pDate = document.createElement('p');
        pDate.textContent = `Due Date: ${date.value}`;
        article.appendChild(pDate);

        let div = document.createElement('div');
        div.setAttribute('class', 'flex');
        article.appendChild(div);

        let buttonStart = document.createElement('button');
        buttonStart.textContent = 'Start';
        buttonStart.setAttribute('class', 'green');
        div.appendChild(buttonStart);

        let buttonDelete = document.createElement('button');
        buttonDelete.textContent = 'Delete';
        buttonDelete.setAttribute('class', 'red');
        div.appendChild(buttonDelete);


        buttonDelete.addEventListener('click', (ev) => {
            ev.preventDefault();
            openSectionDiv.removeChild(article);
        });


        buttonStart.addEventListener('click', (ev) => {
            ev.preventDefault();

            openSectionDiv.removeChild(article);
            progressSectionDiv.appendChild(article);
            div.removeChild(buttonStart);
            div.removeChild(buttonDelete);

            let btnDelete = document.createElement('button');
            btnDelete.textContent = 'Delete';
            btnDelete.setAttribute('class', 'red');
            div.appendChild(btnDelete);

            let buttonFinish = document.createElement('button');
            buttonFinish.textContent = 'Finish';
            buttonFinish.setAttribute('class', 'orange');
            div.appendChild(buttonFinish);

            btnDelete.addEventListener('click', (ev) => {
                ev.preventDefault();
                progressSectionDiv.removeChild(article);
            });

            buttonFinish.addEventListener('click', (ev) => {
                ev.preventDefault();

                progressSectionDiv.removeChild(article);
                completeSectionDiv.appendChild(article);
                article.removeChild(div);
            });
        });

        task.value = '';
        description.value = '';
        date.value = ''; 
    }); 
}
