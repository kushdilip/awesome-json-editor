import Ember from 'ember';
import config from 'awesome-json-editor/config/environment';

export default Ember.Route.extend({
  actions: {
    getDocs(url) {
      let controller = this.controller;
      config.APP.host = url;
      this.store.findAll('couchdb-doc').then(list => {
        this.setupController.call(this, controller, list);
      });
    }
  }
});