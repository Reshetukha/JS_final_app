import Component from './component';

const modalEditSel = document.querySelector('#modalEdit');

const blankGroupsSel = document.querySelector('#modalEdit').querySelector('#groups');

const groupSel = document.querySelector('#modalEdit').querySelector('select');

const firstNameSel = document.querySelector('#modalEdit').querySelector('#first_name');
const lastNameSel = document.querySelector('#modalEdit').querySelector('#last_name');
const streetSel = document.querySelector('#modalEdit').querySelector('#street');
const zipCodeSel = document.querySelector('#modalEdit').querySelector('#zip_code');
const citySel = document.querySelector('#modalEdit').querySelector('#city');
const phoneSel = document.querySelector('#modalEdit').querySelector('#phone');
const rangeCreditSel = document.querySelector('#modalEdit').querySelector('#range_credit');
const idContainerSel = document.querySelector('#modalEdit').querySelector('.modal-content');

const updateButtonSel = document.querySelector('#modalEdit').querySelector('#update_button');

const mainTableSel = document.querySelector('main').querySelector('tbody');

class EditBlank extends Component {
  init() {
    mainTableSel.addEventListener('dblclick', this.dblClickListenerFun.bind(this), false);
    this.on('editSendData', this.initBlank.bind(this), document);
    M.Modal.init(modalEditSel, {});
    updateButtonSel.addEventListener('click', this.editBlankUpdate.bind(this), false);
  }

  dblClickListenerFun(e) {
    this.emit('editRequestData', e.target.parentNode.id, document);
  }

  initBlank(params) {
    [this.user, this.groups] = params;
    const choosedGroup = this.groups.find(item => item.group_id === this.user.group_id);
    blankGroupsSel.innerHTML = '';
    blankGroupsSel.innerHTML += `<option value="${this.user.group_id}" disabled selected>${choosedGroup.name}</option>`;
    this.groups.forEach((item) => {
      blankGroupsSel.innerHTML += `<option value="${item.group_id}" id="${item.group_id}">${item.name}</option>`;
    });

    idContainerSel.id = this.user.user_id;
    const fullname = this.user.name.split(' ');
    [firstNameSel.value] = fullname;
    fullname.splice(0, 1);
    lastNameSel.value = fullname.join(' ');
    streetSel.value = this.user.street;
    zipCodeSel.value = this.user.zip_code;
    citySel.value = this.user.city;
    phoneSel.value = this.user.phone;
    rangeCreditSel.value = this.user.credits;

    if (parseFloat(rangeCreditSel.value) === 0) {
      firstNameSel.disabled = true;
      lastNameSel.disabled = true;
      streetSel.disabled = true;
      zipCodeSel.disabled = true;
      citySel.disabled = true;
      phoneSel.disabled = true;
      rangeCreditSel.disabled = true;
      blankGroupsSel.disabled = true;
    } else {
      firstNameSel.disabled = false;
      lastNameSel.disabled = false;
      streetSel.disabled = false;
      zipCodeSel.disabled = false;
      citySel.disabled = false;
      phoneSel.disabled = false;
      rangeCreditSel.disabled = false;
      blankGroupsSel.disabled = false;
    }

    if (choosedGroup.is_admin) {
      rangeCreditSel.disabled = true;
    }

    M.FormSelect.init(groupSel, {});

    M.updateTextFields();

    const instance = M.Modal.getInstance(modalEditSel);
    instance.open();
  }

  editBlankUpdate() {
    this.instance = M.FormSelect.init(groupSel, {});
    this.instance = M.FormSelect.getInstance(groupSel);

    const tempUser = {};
    tempUser.user_id = idContainerSel.id;
    // tempUser.group_id = this.instance.getSelectedValues()[0];
    [tempUser.group_id] = this.instance.getSelectedValues();
    tempUser.name = `${firstNameSel.value} ${lastNameSel.value}`;
    tempUser.street = streetSel.value;
    tempUser.zip_code = zipCodeSel.value;
    tempUser.city = citySel.value;
    tempUser.phone = phoneSel.value;
    tempUser.credits = rangeCreditSel.value;
    this.emit('fetchPutRequest', tempUser, document);
  }
}

export default EditBlank;