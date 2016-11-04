import Ember from 'ember';
import { storageFor } from 'ember-local-storage';

// credentials: storageFor('auth') creates auth object in localStorage
// isAuthenticated can be used in Handlebars to affect view states
// isAuthenticated checks to see whether credentials.token exists
// bool() converts truthy/falsey data into hard true or false
// credentials.token could be a bad token, in which case isAuth.. would be true
// but you wouldn't actually work

export default Ember.Service.extend({
  ajax: Ember.inject.service(),
  credentials: storageFor('auth'),
  isAuthenticated: Ember.computed.bool('credentials.token'),

  signUp (credentials) {
    return this.get('ajax').post('/sign-up', {
      data: {
        credentials: {
          email: credentials.email,
          password: credentials.password,
          password_confirmation: credentials.passwordConfirmation,
        },
      },
    });
  },

  signIn (credentials) {
    return this.get('ajax').post('/sign-in', {
      data: {
        credentials: {
          email: credentials.email,
          password: credentials.password,
        },
      },
    })
    .then((result) => {
      this.get('credentials').set('id', result.user.id);
      this.get('credentials').set('email', result.user.email);
      this.get('credentials').set('token', result.user.token);
    });
  },

  changePassword (passwords) {
    // passwords are previous & next b/c 'new' is a JS keyword
    return this.get('ajax').patch(`/change-password/${this.get('credentials.id')}`, {
      data: {
        passwords: {
          old: passwords.previous,
          new: passwords.next,
        },
      },
    });
  },

  signOut () {
    // ember-ajax uses .del() instead of .delete b/c 'delete' is a JS keyword
    // .finally() will runs last no matter where you call it
    // .finally() runs regardless of success/failure
    return this.get('ajax').del(`/sign-out/${this.get('credentials.id')}`)
    .finally(() => this.get('credentials').reset());
  },
});
