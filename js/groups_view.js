import Component from './component';
const groupsUlSel = document.querySelector('#slide-out').querySelector('ul');
const pageTitleSel = document.querySelector('.page-title');

class GroupsView extends Component {

  init() {
    this.on('renderGroups', this.renderGroups.bind(this), document);
    // groupsUlSel.addEventListener('click', ()=> {this.emit('renderInit', null, document);}, false);
    window.onhashchange = ()=> {this.emit('renderInit', null, document);};
  }

  renderGroups(groups) {
    groupsUlSel.innerHTML = '';
    groups.forEach( (group) => {
      // let active = (document.location.hash.includes(group.group_id)) ? 'active' : '';
      let active;
      let hash = document.location.hash.split(/[#\/]/);
      if (hash.some( (item) => item == group.group_id)) {
        pageTitleSel.innerText = group.name;
        active = 'active';
      } else {
        active = '';
      }
      // console.log('hash', document.location.hash);
      let myTemplate = `<li class=${active}><a href="#${group.group_id}/">${group.name} <span class="badge" data-badge-caption="">${group.amountOfUsers}</span></a></li>`;
      groupsUlSel.innerHTML += myTemplate;
    });
    console.log(groups);
  }

}

export default GroupsView;