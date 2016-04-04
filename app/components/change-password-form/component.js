import Ember from 'ember';

export default Ember.Component.extend({
  passwords: {},

  actions: {
    submit () {
      this.sendAction('submit', this.get('passwords'));
    }
  }
});
