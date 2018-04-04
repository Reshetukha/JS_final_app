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
        // this.on('postSendData', this.renderPostBlank.bind(this), document);
        this.on('postSendData', this.initBlank.bind(this), document);
        navAddSel.addEventListener('click', this.postRequestData.bind(this), false);
        // navAddSel.addEventListener('click', this.initBlank.bind(this), false);
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
        blankGroupsSel.innerHTML += `<option value="" disabled selected>Choose group</option>`;
        groups.forEach( (item) => {
            blankGroupsSel.innerHTML += `<option value="${item.group_id}" id="${item.group_id}">${item.name}</option>`;
        });
        M.FormSelect.init(groupSel, {});

        let materialGroupUl = document.querySelector('#modalAdd').querySelector('.select-wrapper').querySelector('ul');
        Array.from(materialGroupUl.children).forEach( (li) => {
            li.onclick = this.groupChoosed.bind(this);
        });
        // materialGroupInput.addEventListener('blur', this.groupChoosed.bind(this), false);
        // materialGroupUl.blur = this.groupChoosed.bind(this);
        // materialGroupUl.addEventListener('click', this.groupChoosed.bind(this), false);

    }

    postRequestData() {
        // console.log('postRequestData');
        this.emit('postRequestData', null, document);
    }

    // renderPostBlank (groups) {
    //     console.log('renderPostBlank');
    //     blankGroupsSel.innerHTML = '';
    //     blankGroupsSel.innerHTML += `<option value="" disabled selected>Choose group</option>`;
    //     groups.forEach( (item) => {
    //         blankGroupsSel.innerHTML += `<option value="${item.group_id}" id="${item.group_id}">${item.name}</option>`;
    //     });
    //     M.FormSelect.init(groupSel, {});
    // }

    groupChoosed() {
        console.log('GROUP CHOOSED');
        this.instance = M.FormSelect.init(groupSel, {});
        this.instance = M.FormSelect.getInstance(groupSel);
        let groupId = this.instance.getSelectedValues()[0];
        console.log(groupId);
        if (groupId) {
            console.log(this.groups, 'groups');
            let selectedGroup = this.groups.find( (item) => item.group_id == groupId );
            console.log('sel group', selectedGroup)
            if ( selectedGroup && selectedGroup.is_admin ) {
                console.log('rangeCreditSel.disabled = true;');
                rangeCreditSel.disabled = true;
            } else {
                rangeCreditSel.disabled = false;
            }
        }

        // костыль, спадают лисенеры
        let materialGroupUl = document.querySelector('#modalAdd').querySelector('.select-wrapper').querySelector('ul');
        Array.from(materialGroupUl.children).forEach( (li) => {
            li.onclick = this.groupChoosed.bind(this);
        });
        // rangeCreditSel
    }

    postBlankCreate() {
        // groupSel = document.querySelector('#modalAdd').querySelector('select');
        this.instance = M.FormSelect.init(groupSel, {});
        this.instance = M.FormSelect.getInstance(groupSel);
        // console.log(this.instance.getSelectedValues());

        let tempUser = {};
        tempUser.group_id = this.instance.getSelectedValues()[0];
        tempUser.name = firstNameSel.value + ' ' + lastNameSel.value;
        tempUser.street = streetSel.value;
        tempUser.zip_code = zipCodeSel.value;
        tempUser.city = citySel.value;
        tempUser.phone = phoneSel.value;
        tempUser.credits = rangeCreditSel.value;
        this.emit('fetchPostRequest', tempUser, document);
        // console.log(tempUser);
    }

}

export default PostBlank;

// elem = document.querySelector('select');
// //instance = M.FormSelect.init(elem);
// instance = M.FormSelect.getInstance(elem);
// instance.getSelectedValues();

// elem = document.querySelector('select');
// instance = M.FormSelect.getInstance(elem);
// instance.getSelectedValues();