import Ember from 'ember';

// additional plugin that enables creation of custom ajax functions
import AjaxService from 'ember-ajax/services/ajax';

import ENV from 'ga-wdi-boston.ember-auth/config/environment';

export default AjaxService.extend({
  host: ENV.apiHost,
  auth: Ember.inject.service(),
  headers: Ember.computed('auth.credentials.token', {
    // auth is another service that we're injecting here (above)
    // auth holds on to the token
    // if we have a token, include it in the headers for all AJAX requests
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
