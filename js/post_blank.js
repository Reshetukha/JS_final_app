import Component from './component';

const navAddSel = document.querySelector('.navigation-add').querySelector('a');
const blankGroupsSel = document.querySelector('#modalAdd').querySelector('#groups');

const groupSel = document.querySelector('#modalAdd').querySelector('select');

const firstNameSel = document.querySelector('#modalAdd').querySelector('#first_name');
const lastNameSel = document.querySelector('#modalAdd').querySelector('#last_name');
const streetSel = document.querySelector('#modalAdd').querySelector('#street');
const zipCodeSel = document.querySelector('#modalAdd').querySelector('#zip_code');
const citySel = document.querySelector('#modalAdd').querySelector('#city');
const phoneSel = document.querySelector('#modalAdd').querySelector('#phone');
const rangeCreditSel = document.querySelector('#modalAdd').querySelector('#range_credit');

const createButtonSel = document.querySelector('#modalAdd').querySelector('#create_button');

class PostBlank extends Component {
  init() {
    this.on('postSendData', this.initBlank.bind(this), document);
    navAddSel.addEventListener('click', this.postRequestData.bind(this), false);
    createButtonSel.addEventListener('click', this.postBlankCreate.bind(this), false);
    M.Modal.init(document.querySelector('#modalAdd'), {});
  }

  initBlank(groups) {
    firstNameSel.value = '';
    lastNameSel.value = '';
    streetSel.value = '';
    zipCodeSel.value = '';
    citySel.value = '';
    phoneSel.value = '';
    rangeCreditSel.value = '';
    this.groups = groups;
    M.updateTextFields();

    blankGroupsSel.innerHTML = '';
    blankGroupsSel.innerHTML += '<option value="" disabled selected>Choose group</option>';
    groups.forEach((item) => {
      blankGroupsSel.innerHTML += `<option value="${item.group_id}" id="${item.group_id}">${item.name}</option>`;
    });
    M.FormSelect.init(groupSel, {});

    const materialGroupUl = document.querySelector('#modalAdd').querySelector('.select-wrapper').querySelector('ul');
    Array.from(materialGroupUl.children).forEach((li) => {
      li.onclick = this.groupChoosed.bind(this);
    });

  }

  postRequestData() {
    this.emit('postRequestData', null, document);
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

    const materialGroupUl = document.querySelector('#modalAdd').querySelector('.select-wrapper').querySelector('ul');
    Array.from(materialGroupUl.children).forEach((li) => {
      li.onclick = this.groupChoosed.bind(this);
    });
  }

  postBlankCreate() {
    this.instance = M.FormSelect.init(groupSel, {});
    this.instance = M.FormSelect.getInstance(groupSel);

    const tempUser = {};
    [tempUser.group_id] = this.instance.getSelectedValues();
    // tempUser.group_id = this.instance.getSelectedValues()[0];
    tempUser.name = `${firstNameSel.value} ${lastNameSel.value}`;
    tempUser.street = streetSel.value;
    tempUser.zip_code = zipCodeSel.value;
    tempUser.city = citySel.value;
    tempUser.phone = phoneSel.value;
    tempUser.credits = rangeCreditSel.value;
    this.emit('fetchPostRequest', tempUser, document);
  }

}

export default PostBlank;