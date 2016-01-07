import Ember from 'ember';


export default Ember.Component.extend({
  didInsertElement: function () {
    this._super(...arguments);
    let schema = this.get('schema');
    Ember.run.scheduleOnce('afterRender', function() {
      var editor = new JSONEditor(document.getElementById('editor_holder'), {
         schema: schema
       });
    });
  }
});
