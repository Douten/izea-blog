import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';
import { visit, click } from '@ember/test-helpers';

module('Integration | Component | post-pagination', function(hooks) {
  setupApplicationTest(hooks);

  test('should load more posts on button click', async function(assert) {
    await visit('/');
    assert.equal(
      this.element.querySelectorAll('[data-test-post]').length,
      15,
      'should display 15 posts'
    );

    await click('[data-test-more-button]');

    assert.equal(
      this.element.querySelectorAll('[data-test-post]').length,
      30,
      'should display 30 posts after button click'
    );
    
  });
});
