import Component from '@ember/component';
import { inject as service } from '@ember/service';

export default Component.extend({
  showBody: false,
  ajax: service(),
  user: null,
  actions: {
    show() {
      this.toggleProperty('showBody');
    }
  },
  didReceiveAttrs() {
    //called too many times?
    this.ajax
      .request('https://jsonplaceholder.typicode.com/users')
      .then(response =>
        this.set('user', response.find(user => this.post.userId === user.id))
      );
  }
});
