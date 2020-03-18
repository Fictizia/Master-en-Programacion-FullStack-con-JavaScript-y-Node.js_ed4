
const idContact = document.getElementById("idContact");
const nameContact = document.getElementById("nameContact");
const phoneContact = document.getElementById("phoneContact");
const emailContact = document.getElementById("emailContact");
const buttonSave = document.getElementById("buttonSave");



function validateName(name) {
	const regex = new RegExp(/^[A-Za-z ÑñÁÉÍÓÚáéíóú]{1,50}$/);
	return regex.test(name);
}



function validatePhone(phone) {
	const regex = new RegExp(/^(1[ \-\+]{0,3}|\+1[ -\+]{0,3}|\+1|\+)?((\(\+?1-[2-9][0-9]{1,2}\))|(\(\+?[2-8][0-9][0-9]\))|(\(\+?[1-9][0-9]\))|(\(\+?[17]\))|(\([2-9][2-9]\))|([ \-\.]{0,3}[0-9]{2,4}))?([ \-\.][0-9])?([ \-\.]{0,3}[0-9]{2,4}){2,3}$/);
	return regex.test(phone);
}



function validateEmail(email) {
	const regex = new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);
	return regex.test(email);
}




function validateForm() {
	const listErrorsId = "listErrors";
	const listErrorsClass = "list-errors";
	const listErrorsDOM = document.getElementById(listErrorsId);

	if (listErrorsDOM) {
		listErrorsDOM.remove();
	}

	if (
		!validateName(nameContact.value) ||
		!validatePhone(phoneContact.value) ||
		!validateName(nameContact.value)
	) {
		console.warn("Error validation form");

		const listErrors = document.createElement("ul");
		listErrors.setAttribute("id", listErrorsId);
		listErrors.setAttribute("class", listErrorsClass);

		function itemError(message) {
			let item = document.createElement("li");
			let itemText = document.createTextNode(message);
			item.appendChild(itemText);
			listErrors.appendChild(item);
		}

		if (!validateName(nameContact.value)) {
			// console.info(nameContact.value, validateName(nameContact.value));
			itemError("Name not valid. Only maximum 50 characters of uppercase and lowercase letters, and spaces are valid.");
		}
		if (!validatePhone(phoneContact.value)) {
			// console.info(phoneContact.value, validatePhone(phoneContact.value));
			itemError("Phone not valid");
		}
		if (!validateEmail(emailContact.value)) {
			// console.info(emailContact.value, validateEmail(emailContact.value));
			itemError("Email not valid");
		}

		return listErrors;
	} else {
		return true;
	}
}



function emptyForm() {
	idContact.value = "";
	nameContact.value = "";
	phoneContact.value = "";
	emailContact.value = "";
};



function saveContact() {
	let checkForm = validateForm();
	if (checkForm === true) {
		const dataContact = {
			"phone": phoneContact.value,
			"email": emailContact.value,
			"avatar": `http://api.adorable.io/avatars/80/${emailContact.value}.png`
		}

		if (idContact.value !== "") {
			if (localStorage.key(idContact.value)) {
				localStorage.removeItem(localStorage.key(idContact.value));
				localStorage.setItem(nameContact.value, JSON.stringify(dataContact));
			}
		} else {
			localStorage.setItem(nameContact.value, JSON.stringify(dataContact));
		}

		emptyForm();
		setContacts();
	} else {
		const listErrors = checkForm;
		document.querySelector("#formSaveContact").appendChild(listErrors);
	}
}



function editContact($this) {
	let itemIndex = $this.getAttribute("data-index");
	let nameContactValue = localStorage.key(parseInt(itemIndex));

	let dataContact = localStorage.getItem(localStorage.key(parseInt(itemIndex)));
	dataContact = JSON.parse(dataContact);

	idContact.value = itemIndex;
	nameContact.value = nameContactValue;
	phoneContact.value = dataContact.phone;
	emailContact.value = dataContact.email;
	dataContact.avatar = `http://api.adorable.io/avatars/80/${dataContact.email}.png`;

	updateContacts();
}



function removeContact($this) {
	let itemIndex = $this.getAttribute("data-index");
	let nameContact = localStorage.key(parseInt(itemIndex));
	localStorage.removeItem(nameContact);
	updateContacts();
}



function removeAllContacts() {
	localStorage.clear();
	updateContacts();
}



function getContacts() {
	let items = "";
	for (var index = 0; index < localStorage.length; index++) {
		let nameContactValue = localStorage.key(index);

		let dataContact = localStorage.getItem(nameContactValue);
		dataContact = JSON.parse(dataContact);

		let itemTemplate = `
				<li class="list-group-item d-flex align-items-start justify-content-between">
					<div class="d-flex">
						<div class="pr-4">
							<img src="${dataContact.avatar}" alt="${nameContactValue}">
						</div>
						<div>
							<p class="m-0">${nameContactValue}</p>
							<p class="m-0">${dataContact.phone}</p>
							<p class="m-0">${dataContact.email}</p>
						</div>
					</div>
					<div class="btn-group">
						<button type="button" class="button-edit btn btn-success" data-index="${index}">
							<i class="fa fa-pen"></i> Editar
						</button>
						<button type="button" class="button-remove btn btn-danger" data-index="${index}">
							<i class="fa fa-trash"></i> Eliminar
						</button>
					</div>
				</li>`;
		items += itemTemplate;
	}

	return items;
}



function setContacts() {
	const listContactDOM = document.getElementById("listContact");

	listContactDOM.innerHTML = "";

	const list = getContacts();

	const template = `
		<div class="mb-2 d-flex justify-content-between bg-transparent text-info">
			<h2 class="font-weight-light">
				Lista contactos
			</h2>
			<button type="button" id="buttonRemoveAll" class="btn btn-danger">
				<i class="fa fa-trash"></i> Eliminar Todos
			</button>
		</div>
		<div id ="listContact"><ul class="list-group pt-3">${list}</ul></div>`;

	const nodeTemplate = document.createRange().createContextualFragment(template);
	listContactDOM.appendChild(nodeTemplate);

	const buttonsEdit = document.getElementsByClassName("button-edit");
	Array.from(buttonsEdit).map(buttonEdit => {
		buttonEdit.addEventListener("click", function () {
			editContact(this);
		});
	});

	const buttonsRemove = document.getElementsByClassName("button-remove");
	Array.from(buttonsRemove).map(buttonRemove => {
		buttonRemove.addEventListener("click", function () {
			removeContact(this);
		});
	});

	const buttonRemoveAll = document.getElementById("buttonRemoveAll");
	buttonRemoveAll.addEventListener("click", function () {
		removeAllContacts();
	});
}



function updateContacts() {
	const listContactDOM = document.getElementById("listContact");
	if (localStorage.length !== 0) {
		setContacts();
	} else {
		listContactDOM.innerHTML = "";
	}
}



function init() {
	buttonSave.addEventListener("click", function () {
		saveContact();
	});

	updateContacts();
}



init();