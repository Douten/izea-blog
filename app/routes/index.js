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
            `%cI appreciate the opportunity for me to demonstrate my skills.`,
            style
          );
          console.log(
            `%cThere is still a lot for me to learn, but I believe you'll like what you see here.`,
            style
          );
          console.log(`%cIf you have any critiques please let me know!`, style);
          console.log(`%cThank you for your time — Minh`, style);
          return response.sort(() => Math.random() - 0.5);
        })
    );
  }
});
