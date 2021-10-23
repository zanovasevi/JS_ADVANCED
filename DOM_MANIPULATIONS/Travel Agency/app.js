window.addEventListener('load', solution);

function solution() {
  let fullNameInput = document.getElementById('fname');
  let emailInput = document.getElementById('email');
  let phoneInput = document.getElementById('phone');
  let addressInput = document.getElementById('address');
  let codeInput = document.getElementById('code');

  let input = {
    fullNameInput,
    emailInput,
    phoneInput,
    addressInput,
    codeInput
  };

  let btnSubmit = document.getElementById('submitBTN');
  let btnEdit = document.getElementById('editBTN');
  let btnContinue = document.getElementById('continueBTN');

  let ul = document.getElementById('infoPreview');
  let div = document.getElementById('block');

  btnSubmit.addEventListener('click', (ev) => {
    ev.preventDefault();

    const fullName= input.fullNameInput.value.trim();
     const email= input.emailInput.value.trim();
     const phoneNumber= input.phoneInput.value.trim();
     const address= input.addressInput.value.trim();
     const postalCode= Number(input.codeInput.value.trim());
 

    if(fullNameInput.value == '' || emailInput.value == ''){
      return;
    }
    
    let name = e('li', {},`Full Name: ${fullNameInput.value}`);
    let emaill = e('li', {}, `Email: ${emailInput.value}`);
    let phone = e('li', {}, `Phone Number: ${phoneInput.value}`);
    let addresss = e('li', {}, `Address: ${addressInput.value}`);
    let code = e('li', {}, `Postal Code: ${codeInput.value}`);
    
    ul.appendChild(name);
    ul.appendChild(emaill);
    ul.appendChild(phone);
    ul.appendChild(addresss);
    ul.appendChild(code);

    // btnSubmit.setAttribute('disabled', true);
    btnSubmit.disabled = true;

    fullNameInput.value = '';
    emailInput.value = '';
    phoneInput.value = '';
    addressInput.value = '';
    codeInput.value = '';
    // btnEdit.removeAttribute('disabled');
    btnEdit.disabled = false;
    // btnContinue.removeAttribute('disabled');
    btnContinue.disabled = false;
    


    btnEdit.addEventListener('click', edit.bind(null,input,fullName,email,phoneNumber,address,postalCode)); 
    
  });

  function edit( input,fullName, email, phoneNumber, address, postalCode){
    input.fullNameInput.value = fullName;
    input.emailInput = email;
    input.phoneInput = phoneNumber;
    input.addressInput = address;
    input.codeInput = postalCode;

    while(ul.firstChild){
      ul.removeChild(ul.firstChild);
    }
    btnSubmit.disabled = false;
    btnEdit.disabled = true;
    btnContinue.disabled = true;
  }

  btnContinue.addEventListener('click', () => {
    while(div.firstChild){
      div.removeChild(div.firstChild);
    }

    const complete = e('h3', {}, 'Thank you for your reservation!');
    div.appendChild(complete);
  });


  function e(type, attr, ...content){
    const element = document.createElement(type);

    for(let prop in attr) {
      element[prop] == attr[prop];
    }
    for(let item of content) {
      if(typeof item == 'string' || typeof item == 'number'){
        item = document.createTextNode(item);
      }
      element.appendChild(item);
    }

    return element;
  }
}
