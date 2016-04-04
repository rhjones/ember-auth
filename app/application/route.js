import Ember from 'ember';

export default Ember.Route.extend({
  auth: Ember.inject.service(),

  actions: {
    signUp (credentials) {
      return this.get('auth').signUp(credentials);
    },

    signIn (credentials) {
      return this.get('auth').signIn(credentials);
    },

    changePassword (passwords) {
      return this.get('auth').changePassword(passwords)
      .then(() => this.get('auth').signOut())
      .then(() => this.transitionTo('sign-in'))
      .then(() => console.log('signed out'));
    },

    signOut () {
      return this.get('auth').signOut();
    },
  },
});
