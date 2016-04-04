import Ember from 'ember';

export default Ember.Component.extend({
  credentials: {},

  actions: {
    submit () {
      this.sendAction('submit', this.get('credentials'));
    }
  }
});
