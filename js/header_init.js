import Component from './component';

class HeaderInit extends Component {
  // eslint-disable-next-line class-methods-use-this
  init() {
    document.querySelector('header').innerHTML = `
    <nav>
        <div class="nav-wrapper">
            <a href="#" data-target="slide-out" class="brand-logo sidenav-trigger">
                <i class="material-icons">menu</i>
            </a>
            <span class="page-title"></span>
        </div>
    </nav>
    `;
  }
}

export default HeaderInit;
