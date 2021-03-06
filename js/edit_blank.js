import Component from './component';

class EditBlank extends Component {
  init() {
    this.modalEditSel = document.querySelector('#modalEdit');
    this.mainTableSel = document.querySelector('main').querySelector('tbody');
    this.mainTableSel.addEventListener('dblclick', this.openModalEdit.bind(this), false);
    this.on('editSendData', this.initBlank.bind(this), document);
  }

  openModalEdit(e) {
    this.modalEditSel.innerHTML = `
    <div class="modal-content">
        <h4>Edit member</h4>
        <div class="row">
            <form class="col s12">
                <div class="row">
                    <div class="input-field col s6">
                        <input id="first_name" type="text" class="validate">
                        <label for="first_name">First Name</label>
                    </div>
                    <div class="input-field col s6">
                        <input id="last_name" type="text" class="validate">
                        <label for="last_name">Last Name</label>
                    </div>
                </div>
                <div class="row">
                    <div class="input-field col s12">
                        <input id="street" type="text" class="validate">
                        <label for="street">Street</label>
                    </div>
                </div>
                <div class="row">
                    <div class="input-field col s6">
                        <input id="zip_code" type="text" class="validate">
                        <label for="zip_code">Zip code</label>
                    </div>
                    <div class="input-field col s6">
                        <input id="city" type="text" class="validate">
                        <label for="city">City</label>
                    </div>
                </div>
                <div class="row">
                    <div class="input-field col s12">
                        <input id="phone" type="text" class="validate">
                        <label for="phone">Phone number</label>
                    </div>
                </div>
                <div class="row">
                    <div class="input-field col s12">
                        <select id="groups">

                        </select>
                        <label>Group</label>
                    </div>
                </div>
                <div class="row">
                    <div class="input-field col s12">
                        <label for="range_credit">Credit</label>
                    </div>
                </div>
                <div class="row">
                    <div class="input-field col s12">
                        <input id="range_credit" type="range" min="0" max="1000" />
                    </div>
                </div>
            </form>
        </div>
    </div>
    <div class="modal-footer">
        <a id="close_button" class="modal-action modal-close waves-effect waves-green btn-flat">Close</a>
        <a id="update_button" class="modal-action modal-close waves-effect waves-green btn-flat">Update</a>
    </div>
    `;

    M.Modal.init(this.modalEditSel, {});

    this.instance = M.Modal.getInstance(this.modalEditSel);
    this.instance.open();

    this.blankGroupsSel = this.modalEditSel.querySelector('#groups');
    this.groupSel = this.modalEditSel.querySelector('select');
    this.firstNameSel = this.modalEditSel.querySelector('#first_name');
    this.lastNameSel = this.modalEditSel.querySelector('#last_name');
    this.streetSel = this.modalEditSel.querySelector('#street');
    this.zipCodeSel = this.modalEditSel.querySelector('#zip_code');
    this.citySel = this.modalEditSel.querySelector('#city');
    this.phoneSel = this.modalEditSel.querySelector('#phone');
    this.rangeCreditSel = this.modalEditSel.querySelector('#range_credit');
    this.idContainerSel = this.modalEditSel.querySelector('.modal-content');
    this.modalOverlaySel = document.querySelector('.modal-overlay');
    this.updateButtonSel = this.modalEditSel.querySelector('#update_button');
    this.closeButtonSel = this.modalEditSel.querySelector('#close_button');

    M.Range.init(this.rangeCreditSel, {});
    this.emit('editRequestData', e.target.parentNode.id, document);

    this.updateButtonSel.addEventListener('click', this.editBlankUpdate.bind(this), false);
    this.closeButtonSel.addEventListener('click', this.closeModal.bind(this), false);
    this.updateButtonSel.addEventListener('click', this.closeModal.bind(this), false);
    this.modalOverlaySel.addEventListener('click', this.closeModal.bind(this), false);
  }

  initBlank(params) {
    [this.user, this.groups] = params;
    const choosedGroup = this.groups.find(item => item.group_id === this.user.group_id);
    this.blankGroupsSel.innerHTML = '';
    this.blankGroupsSel.innerHTML += `<option value="${this.user.group_id}" disabled selected>${choosedGroup.name}</option>`;
    this.groups.forEach((item) => {
      this.blankGroupsSel.innerHTML += `<option value="${item.group_id}" id="${item.group_id}">${item.name}</option>`;
    });

    this.idContainerSel.id = this.user.user_id;
    const fullname = this.user.name.split(' ');
    [this.firstNameSel.value] = fullname;
    fullname.splice(0, 1);
    this.lastNameSel.value = fullname.join(' ');
    this.streetSel.value = this.user.street;
    this.zipCodeSel.value = this.user.zip_code;
    this.citySel.value = this.user.city;
    this.phoneSel.value = this.user.phone;
    this.rangeCreditSel.value = this.user.credits;

    if (parseFloat(this.rangeCreditSel.value) === 0) {
      this.firstNameSel.disabled = true;
      this.lastNameSel.disabled = true;
      this.streetSel.disabled = true;
      this.zipCodeSel.disabled = true;
      this.citySel.disabled = true;
      this.phoneSel.disabled = true;
      this.rangeCreditSel.disabled = true;
      this.blankGroupsSel.disabled = true;
      this.updateButtonSel.setAttribute('disabled', null);
    }

    if (choosedGroup.is_admin) {
      this.rangeCreditSel.disabled = true;
    }

    M.FormSelect.init(this.groupSel, {});

    M.updateTextFields();
  }

  editBlankUpdate() {
    this.instance = M.FormSelect.init(this.groupSel, {});
    this.instance = M.FormSelect.getInstance(this.groupSel);

    const tempUser = {};
    tempUser.user_id = this.idContainerSel.id;
    [tempUser.group_id] = this.instance.getSelectedValues();
    tempUser.name = `${this.firstNameSel.value} ${this.lastNameSel.value}`;
    tempUser.street = this.streetSel.value;
    tempUser.zip_code = this.zipCodeSel.value;
    tempUser.city = this.citySel.value;
    tempUser.phone = this.phoneSel.value;
    tempUser.credits = this.rangeCreditSel.value;
    this.emit('fetchPutRequest', tempUser, document);
  }

  // eslint-disable-next-line class-methods-use-this
  closeModal() {
    this.modalEditSel.innerHTML = '';
  }
}

export default EditBlank;
