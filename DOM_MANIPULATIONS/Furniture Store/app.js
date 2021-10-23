window.addEventListener('load', solve);

function solve() {
    let modelInput = document.getElementById('model');
    let yearInput = document.getElementById('year');
    let descriptionInput = document.getElementById('description');
    let priceInput = document.getElementById('price');
    let buttonAdd = document.getElementById('add');
    let tdTotalPrice = document.getElementsByClassName('total-price')[0];

    let tbody = document.getElementById('furniture-list');

    buttonAdd.addEventListener('click', transferToTable);

    function transferToTable(ev) {
        ev.preventDefault();

        if (!(modelInput.value !== "" && yearInput.value > 0 && descriptionInput.value !== "" && priceInput.value > 0)) {
            clearInputFields(modelInput, yearInput, descriptionInput, priceInput);
        } else {
            let tr = document.createElement('tr');
            let trHidden = document.createElement('tr');
            let tdModel = document.createElement('td');
            let tdPrice = document.createElement('td');
            let tdActions = document.createElement('td');
            let tdYear = document.createElement('td');
            let tdDescription = document.createElement('td');

            let btnMoreInfo = document.createElement('button');
            let btnBuyIt = document.createElement('button');

            tdModel.textContent = modelInput.value;
            tdPrice.textContent = Number(priceInput.value).toFixed(2);
            btnMoreInfo.textContent = 'More Info';
            btnBuyIt.textContent = 'Buy it';
            tdYear.textContent = `Year: ${yearInput.value}`;
            tdDescription.textContent = `Description: ${descriptionInput.value}`;

            tbody.appendChild(tr);
            tbody.appendChild(trHidden);
            tr.appendChild(tdModel);
            tr.appendChild(tdPrice);
            tr.appendChild(tdActions);
            trHidden.appendChild(tdYear);
            trHidden.appendChild(tdDescription);

            tdActions.appendChild(btnMoreInfo);
            tdActions.appendChild(btnBuyIt);

            //Adding classes
            tr.classList.add('info');
            trHidden.classList.add('hide');
            btnMoreInfo.classList.add('moreBtn');
            btnBuyIt.classList.add('buyBtn');

            //Set attributes
            tdDescription.setAttribute('colspan', 3);

            clearInputFields(modelInput, yearInput, descriptionInput, priceInput);

            btnMoreInfo.addEventListener('click', (ev) => {
                ev.preventDefault();
                if (btnMoreInfo.textContent == 'More Info') {
                    btnMoreInfo.textContent = 'Less Info';
                    trHidden.style.display = 'contents';
                } else if (btnMoreInfo.textContent == 'Less Info') {
                    btnMoreInfo.textContent = 'More Info';
                    trHidden.style.display = 'none';
                }
            });

            btnBuyIt.addEventListener('click', buyIt);

            function buyIt(ev) {
                ev.preventDefault();

                let parent = ev.target.parentElement.parentElement;
                let elementPrice = Number(parent.querySelectorAll('td')[1].textContent);

                let totalPrice = Number(tdTotalPrice.textContent);
                totalPrice += elementPrice;
                tdTotalPrice.textContent = totalPrice.toFixed(2);

                tr.remove();
                trHidden.remove();
            }
        }

        function clearInputFields(modelInput, yearInput, descriptionInput, priceInput) {
            modelInput.value = '';
            yearInput.value = '';
            descriptionInput.value = '';
            priceInput.value = '';
        }
    }
}
