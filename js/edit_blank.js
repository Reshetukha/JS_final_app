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
    const user = params[0];
    this.groups = params[1];
    // const user;
    // [user, this.groups] = params;
    const choosedGroup = this.groups.find(item => item.group_id == user.group_id);
    blankGroupsSel.innerHTML = '';
    blankGroupsSel.innerHTML += `<option value="${user.group_id}" disabled selected>${choosedGroup.name}</option>`;
    this.groups.forEach((item) => {
      blankGroupsSel.innerHTML += `<option value="${item.group_id}" id="${item.group_id}">${item.name}</option>`;
    });

    if (choosedGroup.is_admin) {
      rangeCreditSel.disabled = true;
    } else {
      rangeCreditSel.disabled = false;
    }

    idContainerSel.id = user.user_id;
    const fullname = user.name.split(' ');
    firstNameSel.value = fullname[0];
    fullname.splice(0, 1);
    lastNameSel.value = fullname.join(' ');
    streetSel.value = user.street;
    zipCodeSel.value = user.zip_code;
    citySel.value = user.city;
    phoneSel.value = user.phone;
    rangeCreditSel.value = user.credits;

    if (rangeCreditSel.value == 0) {
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
    } else {
      rangeCreditSel.disabled = false;
    }

    M.FormSelect.init(groupSel, {});

    M.updateTextFields();

    const instance = M.Modal.getInstance(modalEditSel);
    instance.open();

    const materialGroupUl = document.querySelector('#modalEdit').querySelector('.select-wrapper').querySelector('ul');
    Array.from(materialGroupUl.children).forEach((li) => {
      li.onclick = this.groupChoosed.bind(this);
    });

  }

  editBlankUpdate() {
    this.instance = M.FormSelect.init(groupSel, {});
    this.instance = M.FormSelect.getInstance(groupSel);

    const tempUser = {};
    tempUser.user_id = idContainerSel.id;
    tempUser.group_id = this.instance.getSelectedValues()[0];
    tempUser.name = `${firstNameSel.value} ${lastNameSel.value}`;
    tempUser.street = streetSel.value;
    tempUser.zip_code = zipCodeSel.value;
    tempUser.city = citySel.value;
    tempUser.phone = phoneSel.value;
    tempUser.credits = rangeCreditSel.value;
    this.emit('fetchPutRequest', tempUser, document);
  }

  groupChoosed() {
    this.instance = M.FormSelect.init(groupSel, {});
    this.instance = M.FormSelect.getInstance(groupSel);
    const groupId = this.instance.getSelectedValues()[0];
    if (groupId) {
      const selectedGroup = this.groups.find(item => item.group_id == groupId);
      if (selectedGroup && selectedGroup.is_admin) {
        rangeCreditSel.disabled = true;
      } else {
        rangeCreditSel.disabled = false;
      }
    }

    const materialGroupUl = document.querySelector('#modalEdit').querySelector('.select-wrapper').querySelector('ul');
    Array.from(materialGroupUl.children).forEach((li) => {
      li.onclick = this.groupChoosed.bind(this);
    });
  }

}

export default EditBlank;