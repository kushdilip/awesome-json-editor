import Ember from 'ember';
import config from 'awesome-json-editor/config/environment';

export default Ember.Controller.extend({
  url: '',
  
  docs: Ember.computed('selectedSchema', {
    get(){
      let content = this.get('content') || [];
      let schema = this.get('selectedSchema.id');
      return content.filter(c => {
        return c.get('id') !== schema;
      });
    }
  }),
  
  actions: {
    loadDocuments: function () {
      let schemaId = this.get('selectedSchema.id');
      let docId = this.get('selectDocument.id');
      
      let proxy = config.APP.CORS_PROXY;
      let host = config.APP.host;
      
      var parts = [];
      if (proxy) {
        parts.push(proxy.replace(/\/$/, "") );
      }
      if (host) {
        parts.push(host.replace(/\/$/, "") );
      }
      if (!parts.length) {
        parts.push('');
      }
      
      let url = `${parts.join('/')}`;
      Ember.RSVP.hash({
        schema: Ember.$.get(`${url}/${schemaId}`),
        doc: Ember.$.get(`${url}/${docId}`)
      }).then(hash =>{
        this.set('schema', JSON.parse(hash.schema));
        this.set('doc', JSON.parse(hash.doc));
      }); 
    }
  }
});