import DS from 'ember-data';
import config from 'awesome-json-editor/config/environment';

export default DS.RESTAdapter.extend({
  proxy: config.APP.CORS_PROXY,
  host: config.APP.host,
  
  _buildURL: function () {
    var parts = [];
  
    if (this.get('proxy')) {
      parts.push( this.get('proxy').replace(/\/$/, "") );
    }
  
    if (this.get('host')) {
      parts.push( this.get('host').replace(/\/$/, "") );
    }
    
    if (!parts.length) {
      parts.push('');
    }
    
    return `${parts.join('/')}/_all_docs`;
  },
  
  urlForFindAll: function() {
    return this._buildURL();
  }
  
});
