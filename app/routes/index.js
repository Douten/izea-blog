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
          const style = `background: #25262b; color: #f2ede3; font: 20px/40px 'Literata', serif; padding: 15px; margin: 0; border 0;`;

          console.log(
            `%cThank you for the opportunity to let me show what I know.`,
            style
          );
          console.log(
            `%cThere is still a lot for me to learn, but I hope what is there is good.`,
            style
          );
          console.log(`%cIf you have any critiques please let me know!`, style);
          return response.sort(() => Math.random() - 0.5);
        })
    );
  }
});
