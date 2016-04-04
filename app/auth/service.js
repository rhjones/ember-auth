import Ember from 'ember';
import { storageFor } from 'ember-local-storage';

export default Ember.Service.extend({
  ajax: Ember.inject.service(),
  credentials: storageFor('auth'),

  signUp (credentials) {
    return this.get('ajax').post('/sign-up', {
      data: {
        credentials
      },
    });
  },

  signIn (credentials) {
    return this.get('ajax').post('/sign-in', {
      data: {
        credentials
      }
    })
    .then((response) => {
      this.set('credentials.id', response.user.id);
      this.set('credentials.email', response.user.email);
      this.set('credentials.token', response.user.token);
    });
  },

  changePassword (passwords) {
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
    return this.get('ajax').del(`/sign-out/${this.get('credentials.id')}`)
    .finally(() => {
      this.get('credentials').reset();
    });
  }
});
