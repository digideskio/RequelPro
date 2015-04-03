import styles from './connect.scss';
import React from 'react';
import Favorite from '../../models/favorite.js';

let Connect = React.createClass({
  getInitialState() {
    // Pull the initial list of users
    // from Firebase
    Favorite.findAll();

    return { favorites: Favorite.getAll() };
  },
  onChange() {
    this.setState({ favorites: Favorite.getAll() });
  },
  componentDidMount() {
    Favorite.on('change', this.onChange);
  },
  componentWillUnmount() {
    Favorite.off('change', this.onChange);
  },
  render: function () {
    return (
      <div id="connectPage">
        <div className="row">
          <div className="small-4 columns">
            <div className="panel panel-default am-fade-and-slide-bottom" data-ng-show="ConnectCtrl.showList"
              data-ng-init="ConnectCtrl.showList = false">
              <div className="panel-heading">
                <h3 className="panel-title">Favorites</h3>
              </div>
              <ul className="list-group">
                <li className="list-group-item" data-ng-class="{ active: !ConnectCtrl.fav.id }"
                  data-ng-click="ConnectCtrl.newConnection()" data-ng-if="ConnectCtrl.favorites.length">
                  <h4 class="list-group-item-heading">
                    <i class="fa fa-plus"></i>
                  New Connection
                  </h4>

                  <p class="list-group-item-text">
                  ConnectCtrl.newFav.host || '127.0.0.1':ConnectCtrl.newFav.port || 28015
                  </p>
                </li>
                <li class="list-group-item" data-ng-class="{ active: ConnectCtrl.fav.id === fav.id }"
                  data-ng-repeat="fav in ConnectCtrl.favorites track by fav.id"
                  data-ng-click="ConnectCtrl.fav = fav">
                  <h4 class="list-group-item-heading">
                    <span class="pull-right text-danger" data-ng-click="ConnectCtrl.remove(fav)">
                      <i class="fa fa-trash-o">&nbsp;</i>
                    </span>
                  fav.name
                  </h4>

                  <p class="list-group-item-text">
                  fav.host:fav.port
                  </p>
                </li>
                <li class="list-group-item" data-ng-if="!ConnectCtrl.favorites.length">
                  <h4 class="list-group-item-heading">
                  You have not added any favorites...
                  </h4>
                </li>
              </ul>
            </div>
          </div>
          <div className="small-4 columns">
            <form name="connectForm" id="connectForm" class="panel panel-default am-fade-and-slide-bottom"
              data-ng-show="ConnectCtrl.showForm" data-ng-init="ConnectCtrl.showForm = false"
              data-ng-submit="ConnectCtrl.connect(ConnectCtrl.fav)">
              <div class="panel-heading">
                <h3 class="panel-title">Connection Details</h3>
              </div>
              <div class="panel-body">
                <div class="form-group">
                  <div class="input-group">
                    <span class="input-group-addon">
                      <i class="fa fa-bookmark"></i>
                    </span>
                    <input type="text" class="form-control" id="name" name="name"
                      placeholder="name this connection..."
                      data-ng-model="ConnectCtrl.fav.name"/>
                  </div>
                </div>

                <div class="form-group">
                  <div class="input-group">
                    <span class="input-group-addon">
                      <i class="fa fa-database"></i>
                    </span>
                    <input type="text" class="form-control" id="host" name="host" placeholder="127.0.0.1"
                      data-ng-model="ConnectCtrl.fav.host"/>
                  </div>
                </div>

                <div class="form-group">
                  <div class="input-group">
                    <span class="input-group-addon">
                      <i class="fa fa-anchor"></i>
                    </span>
                    <input type="text" class="form-control" id="port" name="port" placeholder="28015"
                      data-ng-model="ConnectCtrl.fav.port"/>
                  </div>
                </div>

                <div class="form-group">
                  <div class="input-group">
                    <span class="input-group-addon">
                      <i class="fa fa-key"></i>
                    </span>
                    <input type="password" class="form-control" id="authKey" name="authKey"
                      data-ng-model="ConnectCtrl.fav.authKey"/>
                  </div>
                </div>

                <div class="form-group">
                  <button type="button" class="btn btn-primary"
                    data-ng-click="ConnectCtrl.test(ConnectCtrl.fav)">
                  Test Connection
                  </button>
                  <button type="button" class="btn btn-success"
                    data-ng-click="ConnectCtrl.save(ConnectCtrl.fav)">
                  ConnectCtrl.fav.id || processing  'Save' : 'Save to Favorites'
                  </button>
                  <button type="submit" class="btn btn-success">
                  Connect
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
});

export default Connect;
