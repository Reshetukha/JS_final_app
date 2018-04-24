import Component from './component';

class GroupsView extends Component {
  init() {
    document.querySelector('#groups-view').innerHTML = `
    <div id="slide-out" class="sidenav sidenav-fixed navigation-container">
      <ul>
      </ul>
      <div id="nav-add-button">
      </div>
    </div>
    `;
    this.sidenav = document.querySelector('.this.sidenav');
    this.groupsUlSel = document.querySelector('#slide-out').querySelector('ul');
    this.pageTitleSel = document.querySelector('.page-title');
    M.Sidenav.init(this.sidenav, {});
    this.on('renderGroups', this.renderGroups.bind(this), document);
    window.onhashchange = () => { this.emit('renderInit', null, document); };
  }

  // eslint-disable-next-line class-methods-use-this
  renderGroups(groups) {
    this.groupsUlSel.innerHTML = '';
    groups.forEach((group) => {
      let active;
      const hash = parseFloat(document.location.hash.split(/[#/]/)[1]);
      if (hash === group.group_id) {
        this.pageTitleSel.innerText = group.name;
        active = 'active';
      } else {
        active = '';
      }
      const myTemplate = `<li class=${active}><a href="#${group.group_id}/">${group.name} <span class="badge" data-badge-caption="">${group.amountOfUsers}</span></a></li>`;
      this.groupsUlSel.innerHTML += myTemplate;
    });
  }
}

export default GroupsView;
