import Component from './component';

const sidenav = document.querySelector('.sidenav');
const groupsUlSel = document.querySelector('#slide-out').querySelector('ul');
const pageTitleSel = document.querySelector('.page-title');

class GroupsView extends Component {
  init() {
    M.Sidenav.init(sidenav, {});
    this.on('renderGroups', this.renderGroups.bind(this), document);
    window.onhashchange = () => { this.emit('renderInit', null, document); };
  }

  // eslint-disable-next-line class-methods-use-this
  renderGroups(groups) {
    groupsUlSel.innerHTML = '';
    groups.forEach((group) => {
      let active;
      const hash = parseFloat(document.location.hash.split(/[#/]/)[1]);
      if (hash === group.group_id) {
        pageTitleSel.innerText = group.name;
        active = 'active';
      } else {
        active = '';
      }
      const myTemplate = `<li class=${active}><a href="#${group.group_id}/">${group.name} <span class="badge" data-badge-caption="">${group.amountOfUsers}</span></a></li>`;
      groupsUlSel.innerHTML += myTemplate;
    });
  }
}

export default GroupsView;
