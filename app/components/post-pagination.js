import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
  page: 1,
  paginateBy: 15,
  maxPage: computed('page', function() {
    // length / pagination (+1 if leftover)
    let pageCount = Math.floor(this.items.length / this.paginateBy);
    if (this.items.length % this.paginateBy > 0) {
      pageCount++;
    }
    return pageCount;
  }),
  paginatedItems: computed('page', function() {
    const items = this.items;
    // const start = this.page * this.paginateBy - this.paginateBy;
    const end = this.page * this.paginateBy - 1;
    return items.slice(0, end);
  }),
  showNext: computed('page', function() {
    return this.page < this.maxPage;
  }),
  showPrev: computed('page', function() {
    return this.page > 1;
  }),
  actions: {
    nextPage() {
      this.set('page', this.get('page') + 1);
    } //,
    // prevPage() {
    //   this.set('page', this.get('page') - 1);
    // }
  }
});
