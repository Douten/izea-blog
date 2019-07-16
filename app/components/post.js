import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { LoremIpsum } from 'lorem-ipsum';

export default Component.extend({
  showBody: false,
  ajax: service(),
  user: null,
  fullText: null,
  picId: null,
  posY: null,
  unRead: true,
  actions: {
    show(from) {
      if (this.showBody && from == 'close') {
        //don't scroll if closing from title
        //if it's opened (closing) then scroll up
        this.set('unRead', false);
        //offsetTop (gets *current* el to top of page) 
        // minus (because scrolling up)
        //posY (how far down el *previously* was on canvas)
        //gives original location, no matter how many other elements have expanded.
        let scrollY = document.querySelector(`#${this.elementId}`).offsetTop - this.posY;
        //if it's too far above, reset to top
        if (scrollY > document.querySelector(`#${this.elementId}`).offsetTop){
          scrollY = document.querySelector(`#${this.elementId}`).offsetTop - 20;
        }

        console.log(scrollY);
        window.scrollTo({
          top: scrollY,
          behavior: 'smooth'
        });
      } else {
        //store y compared to canvas.
        this.posY = document
          .querySelector(`#${this.elementId}`)
          .getBoundingClientRect().y;
        console.log(this.posY)
      }

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

    //sometimes picsum url 404
    let picId = this.post.id;
    if (this.post.id == 97 || this.post.id == 86) {
      picId = picId + 100;
    }
    this.picId = picId;
    //preload images
    new Image().src = `https://picsum.photos/id/${picId}/650/300`;

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
  }
});
