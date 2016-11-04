import Ember from 'ember';

export default Ember.Route.extend({
  auth: Ember.inject.service(),
  flashMessages: Ember.inject.service(),

  actions: {
    signUp (credentials) {
      // call auth.signUp, which bypasses Ember Data
      this.get('auth').signUp(credentials)
      // sign in with original credentials (email, pwd)
      // auth.signIn sets credentials in localStorage
      .then(() => this.get('auth').signIn(credentials))
      // go back to index view
      .then(() => this.transitionTo('application'))
      // use flashMessages service
      .then(() => {
        this.get('flashMessages')
        .success('Successfully signed-up! You have also been signed-in.');
      })
      .catch(() => {
        this.get('flashMessages')
        .danger('There was a problem. Please try again.');
      });
    },
  },
});
