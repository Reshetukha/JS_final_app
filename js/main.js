import DataStore from './data_store';
import MyWebSocket from './web_socket';
import GroupsView from './groups_view';
import UsersView from './users_view';
import PostBlank from './post_blank';
import EditBlank from './edit_blank';
import FetchService from './fetch_service';
import HeaderInit from './header_init';

HeaderInit.bindTo(document);
DataStore.bindTo(document);
MyWebSocket.bindTo(document);
GroupsView.bindTo(document);
UsersView.bindTo(document);
PostBlank.bindTo(document);
EditBlank.bindTo(document);
FetchService.bindTo(document);
