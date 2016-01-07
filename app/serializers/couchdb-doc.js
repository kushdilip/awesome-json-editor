import DS from 'ember-data';
import Ember from 'ember';

export default DS.RESTSerializer.extend({
  extractMeta: function (store, typeClass, payload) {
    payload.meta = {
      offset: payload.offset || 0,
      total: payload.total_rows || 0
    };
    
    this._super(store, typeClass, payload);
  },
  extractArray: function (store, primaryTypeClass, rawPayload) {
    rawPayload[Ember.String.pluralize(primaryTypeClass.typeKey)] = rawPayload['rows'] || [];
    return this._super(store, primaryTypeClass, rawPayload);
  },
  extractSingle: function () {
    return this._super(...arguments);
  }
});
