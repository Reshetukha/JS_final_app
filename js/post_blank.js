import Component from './component';

class PostBlank extends Component {
  init() {
    document.querySelector('#nav-add-button').innerHTML =
    `
    <div class="navigation-add">
        <a class="btn-floating btn-large waves-effect waves-light">
            <i class="material-icons">add</i>
        </a>
    </div>
    `;
    this.modalAddSel = document.querySelector('#modalAdd');
    this.openModalSel = document.querySelector('.navigation-add').querySelector('a');
    this.on('postSendData', this.initBlank.bind(this), document);
    this.openModalSel.addEventListener('click', this.openModalPost.bind(this), false);
  }

  openModalPost() {
    this.emit('postRequestData', null, document);
  }

  initBlank(groups) {
    this.modalAddSel.innerHTML = `
    <div class="modal-content">
        <h4>Add new member</h4>
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
        <a id="create_button" class="modal-action modal-close waves-effect waves-green btn-flat">Create</a>
    </div>
    `;

    M.Modal.init(this.modalAddSel, {});

    this.instance = M.Modal.getInstance(this.modalAddSel);
    this.instance.open();

    this.blankGroupsSel = this.modalAddSel.querySelector('#groups');
    this.groupSel = this.modalAddSel.querySelector('select');
    this.firstNameSel = this.modalAddSel.querySelector('#first_name');
    this.lastNameSel = this.modalAddSel.querySelector('#last_name');
    this.streetSel = this.modalAddSel.querySelector('#street');
    this.zipCodeSel = this.modalAddSel.querySelector('#zip_code');
    this.citySel = this.modalAddSel.querySelector('#city');
    this.phoneSel = this.modalAddSel.querySelector('#phone');
    this.rangeCreditSel = this.modalAddSel.querySelector('#range_credit');
    this.createButtonSel = this.modalAddSel.querySelector('#create_button');
    this.modalOverlaySel = document.querySelector('.modal-overlay');
    this.closeButtonSel = this.modalAddSel.querySelector('#close_button');

    this.createButtonSel.addEventListener('click', this.postBlankCreate.bind(this), false);
    this.closeButtonSel.addEventListener('click', this.closeModal.bind(this), false);
    this.modalOverlaySel.addEventListener('click', this.closeModal.bind(this), false);
    this.createButtonSel.addEventListener('click', this.closeModal.bind(this), false);

    this.blankGroupsSel.innerHTML = '';
    this.blankGroupsSel.innerHTML += '<option value="" disabled selected>Choose group</option>';
    groups.forEach((item) => {
      this.blankGroupsSel.innerHTML += `<option value="${item.group_id}" id="${item.group_id}">${item.name}</option>`;
    });
    M.FormSelect.init(this.groupSel, {});
    M.Range.init(this.rangeCreditSel, {});
  }

  postBlankCreate() {
    this.instance = M.FormSelect.init(this.groupSel, {});
    this.instance = M.FormSelect.getInstance(this.groupSel);
    const tempUser = {};
    [tempUser.group_id] = this.instance.getSelectedValues();
    tempUser.name = `${this.firstNameSel.value} ${this.lastNameSel.value}`;
    tempUser.street = this.streetSel.value;
    tempUser.zip_code = this.zipCodeSel.value;
    tempUser.city = this.citySel.value;
    tempUser.phone = this.phoneSel.value;
    tempUser.credits = this.rangeCreditSel.value;
    this.emit('fetchPostRequest', tempUser, document);
  }

  // eslint-disable-next-line class-methods-use-this
  closeModal() {
    this.modalAddSel.innerHTML = '';
  }
}

export default PostBlank;
