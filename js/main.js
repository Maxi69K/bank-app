const accBtn = document.getElementById('accBtn');
const addAccBtn = document.getElementById('addAccBtn');
const errorBox = document.getElementById('error-box');
const editDelBtn = document.getElementById('editDelBtn');
const mainView = document.getElementById('mainView');
const mainBody = document.getElementById('mainBody');
const formView = document.getElementById('formView');
const saveBtn = document.getElementById('saveBtn');
const accId = document.getElementById('accId');
const accName = document.getElementById('accName');
const accDeposit = document.getElementById('accDeposit');
const accCard = document.getElementById('accCard');
const editView = document.getElementById('editView');
const editBody = document.getElementById('editBody');
const editFormView = document.getElementById('editFormView');
const eaccId = document.getElementById('eaccId');
const eaccName = document.getElementById('eaccName');
const eaccDeposit = document.getElementById('eaccDeposit');
const eaccCard = document.getElementById('eaccCard');
const editBtn = document.getElementById('editBtn');
let id = null;

const db = [];

addAccBtn.addEventListener('click', showForm);
accBtn.addEventListener('click', showMainView);
saveBtn.addEventListener('click', saveAccount);
editDelBtn.addEventListener('click', showEditView);
editBtn.addEventListener('click', changeAccount);

accId.addEventListener('keypress', enterSaveAcc);
accName.addEventListener('keypress', enterSaveAcc);
accDeposit.addEventListener('keypress', enterSaveAcc);
accCard.addEventListener('keypress', enterSaveAcc);

eaccId.addEventListener('keypress', enterEditAcc);
eaccName.addEventListener('keypress', enterEditAcc);
eaccDeposit.addEventListener('keypress', enterEditAcc);
eaccCard.addEventListener('keypress', enterEditAcc);

createTable();

function createTable() {
    let text = ``;
    for (let i = 0; i < db.length; i++) {
        text += `
        <tr>
        <td>${db[i].id}</td>
        <td>${db[i].name}</td>
        <td>${db[i].deposit}</td>
        <td>${db[i].cCard}</td>
        </tr>
        `;
    }
    mainBody.innerHTML = text;
}

function createEditTable() {
    let text = ``;
    for (let i = 0; i < db.length; i++) {
        text += `
        <tr>
        <td>${db[i].id}</td>
        <td>${db[i].name}</td>
        <td>${db[i].deposit}</td>
        <td>${db[i].cCard}</td>
        <td><button data-id="${i}" class="btn btn-warning edit">Edit</button></td>
        <td><button id="${i}" class="btn btn-danger delete">Delete</button></td>
        </tr>
        `;
    }
    editBody.innerHTML = text;
    const deleteBtns = document.getElementsByClassName('delete');
    const editBtns = document.getElementsByClassName('edit');
    for (let i = 0; i < deleteBtns.length; i++) {
        deleteBtns[i].addEventListener('click', deleteAccount);
        editBtns[i].addEventListener('click', editAccount);
    }
}

function changeAccount() {
    let accId = eaccId.value;
    let accName = eaccName.value;
    let accDeposit = eaccDeposit.value;
    let accCard = eaccCard.value;

    db[id] = {
        id: accId,
        name: accName,
        deposit: accDeposit,
        cCard: accCard
    };
    createTable();
    showEditView();
}

function editAccount() {
    mainView.style.display = 'none';
    formView.style.display = 'none';
    editView.style.display = 'none';
    editFormView.style.display = 'block';

    id = this.getAttribute('data-id');
    eaccId.value = db[id].id;
    eaccName.value = db[id].name;
    eaccDeposit.value = db[id].deposit;
    eaccCard.value = db[id].cCard;
}

function deleteAccount() {
    let id = this.id;
    db.splice(id, 1);
    createTable();
    showEditView();
}

function showEditView() {
    createEditTable();
    mainView.style.display = 'none';
    formView.style.display = 'none';
    editView.style.display = 'block';
    editFormView.style.display = 'none';
}

function showForm() {
    clrAddAccTable();
    errorBox.innerText = '';
    formView.style.display = 'block';
    mainView.style.display = 'none';
    editView.style.display = 'none';
    editFormView.style.display = 'none';
    accName.focus();
}

function showMainView() {
    formView.style.display = 'none';
    mainView.style.display = 'block';
    editView.style.display = 'none';
    editFormView.style.display = 'none';
}

function saveAccount() {
    let i = null;
    for (i = 0; i < db.length; i++) {}
    let k = i + 1;
    let id = k;
    /* let id = accId.value; */
    let name = accName.value;
    let deposit = accDeposit.value;
    let card = accCard.value;

    let newAccount = {
        id: id,
        name: name,
        deposit: deposit,
        cCard: card
    }
    if (name !== '' && deposit !== '' && card !== '') {
        db.push(newAccount);
        clrAddAccTable();
        createTable();
        showForm();
    } else {
        if (name === '' || deposit === '' || card === '') {
            errorBox.innerText = 'Popunite prazna polja!';
        }
    }
}

function clrAddAccTable() {
    accId.value = '';
    accName.value = '';
    accDeposit.value = '';
    accCard.value = '';
}

function enterSaveAcc(e) {
    if (e.keyCode === 13) {
        saveAccount();
    }
}

function enterEditAcc(e) {
    if (e.keyCode === 13) {
        changeAccount();
    }
}