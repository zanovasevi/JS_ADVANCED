function solution() {
    let input = document.getElementsByTagName('input')[0];
    let addButton = document.getElementsByTagName('button')[0];

    let uls = document.querySelectorAll('ul');
    let ulGifts = uls[0];
    let ulSend = uls[1];
    let ulDiscard = uls[2];

    addButton.addEventListener('click', (ev) => {
        ev.preventDefault();

        let gift = input.value;
        let li = document.createElement('li');
        li.textContent = gift;
        li.setAttribute('class', 'gift');
        ulGifts.appendChild(li);

        let buttonSend = document.createElement('button');
        buttonSend.textContent = 'Send';
        buttonSend.setAttribute('id', 'sendButton');
        let buttonDiscard = document.createElement('button');
        buttonDiscard.textContent = 'Discard';
        buttonDiscard.setAttribute('id', 'discardButton');

        li.appendChild(buttonSend);
        li.appendChild(buttonDiscard);

        let items = document.querySelectorAll('ul')[0].childNodes;
        let itemsArr = [];
        for (var i in items) {
            if (items[i].nodeType == 1) {
               itemsArr.push(items[i]);
            }
        }

        itemsArr.sort(function (a, b) {
            return a.innerHTML == b.innerHTML
               ? 0
               : (a.innerHTML > b.innerHTML ? 1 : -1);
         });

        for (i = 0; i < itemsArr.length; ++i) {
            ulGifts.appendChild(itemsArr[i]);
        }

        input.value = '';

        buttonSend.addEventListener('click', (ev) => {
            ev.preventDefault();

            ulGifts.removeChild(li);
            ulSend.appendChild(li);
            li.removeChild(buttonSend);
            li.removeChild(buttonDiscard);
        });

        buttonDiscard.addEventListener('click', (ev) => {
            ev.preventDefault();

            ulGifts.removeChild(li);
            ulDiscard.appendChild(li);
            li.removeChild(buttonSend);
            li.removeChild(buttonDiscard);
        });
    });
}
