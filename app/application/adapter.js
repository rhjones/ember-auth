import ENV from 'ga-wdi-boston.ember-auth/config/environment';
import ActiveModelAdapter from 'active-model-adapter';

import Ember from 'ember';

// this is the exact same code as ajax/service.js
export default ActiveModelAdapter.extend({
  host: ENV.apiHost,

  auth: Ember.inject.service(),

  headers: Ember.computed('auth.credentials.token', {
    get () {
      let headers = {};
      const token = this.get('auth.credentials.token');
      if (token) {
        headers.Authorization = `Token token=${token}`;
      }

      return headers;
    },
  }),
});
