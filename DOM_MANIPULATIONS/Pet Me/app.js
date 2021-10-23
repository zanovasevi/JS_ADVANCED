function solve() {
    let containerInputs = document.getElementById('container');
    let collectionInputs = containerInputs.children;
    let nameInput = collectionInputs[0];
    let ageInput = collectionInputs[1];
    let kindInput = collectionInputs[2];
    let currentOwnerInput = collectionInputs[3];
    let buttonAdd = collectionInputs[4];

    let adoptionField = document.getElementById('adoption');
    let adoptedField = document.getElementById('adopted');
    
    
    buttonAdd.addEventListener('click', addNewPet);


    function addNewPet(ev) {
        ev.preventDefault();

        let age = Number(ageInput.value);

        if(nameInput.value != '' && age != '' && !(Number.isNaN(age)) && 
        kindInput.value != '' && currentOwnerInput.value != ''){

            let ulAdoption = adoptionField.children[1];

            let li = document.createElement('li');
            let p = document.createElement('p');
            let strongName = document.createElement('strong');
            let strongAge = document.createElement('strong');
            let strongKind = document.createElement('strong');
            let span = document.createElement('span');
            let btnContactOwner = document.createElement('button');
            let btnTakeIt = document.createElement('button');
            let btnChecked = document.createElement('button');
            

            ulAdoption.appendChild(li);
            li.appendChild(p);

            p.appendChild(strongName);
            strongName.textContent = nameInput.value;
            // p.append(' is a ');
            p.insertAdjacentHTML( 'beforeend', ' is a ' );
            p.appendChild(strongAge);
            strongAge.textContent = ageInput.value;
            // p.append(' year old ');
            p.insertAdjacentHTML( 'beforeend', ' year old ' );
            p.appendChild(strongKind);
            strongKind.textContent = kindInput.value;

            li.appendChild(span);
            span.textContent = `Owner: ${currentOwnerInput.value}`;

            li.appendChild(btnContactOwner);
            btnContactOwner.textContent = 'Contact with owner';


            btnContactOwner.addEventListener('click', (ev) => {
                ev.preventDefault();

                li.removeChild(btnContactOwner);
                
                btnTakeIt.textContent = 'Yes! I take it!';

                let div = document.createElement('div');
                let inputName = document.createElement('input');

                li.appendChild(div);
                div.appendChild(inputName);
                inputName.setAttribute('placeholder', 'Enter your names');
                div.appendChild(btnTakeIt);

                btnTakeIt.addEventListener('click', (ev) => {
                    ev.preventDefault();

                    if(inputName.value != ''){
                        let ulAdopted = adoptedField.children[1];

                        span.textContent = `New Owner: ${inputName.value}`;
                        

                        ulAdoption.removeChild(li);
                        ulAdopted.appendChild(li);

                        li.removeChild(div);
                        // div.removeChild(inputName);
                        // div.removeChild(btnTakeIt);

                        li.appendChild(btnChecked);
                        btnChecked.textContent = 'Checked';

                        btnChecked.addEventListener('click', (ev) => {
                            ev.preventDefault();

                            ulAdopted.removeChild(li);
                        });
                    }
                });
            });

            clearInputFields(nameInput, ageInput, kindInput, currentOwnerInput);
        }
    }

    function clearInputFields(nameInput, ageInput, kindInput, currentOwnerInput) {
        nameInput.value = '';
        ageInput.value = '';
        kindInput.value = '';
        currentOwnerInput.value = '';
    }
}
