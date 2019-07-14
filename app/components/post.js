import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { LoremIpsum } from 'lorem-ipsum';

export default Component.extend({
  showBody: false,
  ajax: service(),
  user: null,
  fullText: null,
  imgSize: null,
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

    //generate lorem ipsum from npm lorem-ipsum
    const lorem = new LoremIpsum({
      sentencesPerParagraph: {
        max: 8,
        min: 2
      },
      wordsPerSentence: {
        max: 16,
        min: 5
      }
    });

    const paragaphs = Math.floor(Math.random() * (6 - 2) + 2);
    const text = [];
    for (let i = 0; i < paragaphs; i++) {
      text.push(lorem.generateParagraphs(1));
    }

    this.fullText = text;

    //random image size

    this.imgSize = Math.random() < 0.5 ? '200/300' : '300/200';
  }
});
