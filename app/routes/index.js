import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
  ajax: service(),
  location: 9,
  model() {
    return (
      this.ajax
        .request('https://jsonplaceholder.typicode.com/posts')
        //randomize
        .then(response => {
          console.log(response);
          return response.sort(() => Math.random() - 0.5);
        })
    );
  }
});
