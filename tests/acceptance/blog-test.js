import { module, test } from 'qunit';
import { visit } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import setupMirage from 'ember-cli-mirage/test-support/setup-mirage';

module('Acceptance | blog', function(hooks) {
  setupApplicationTest(hooks);
  setupMirage(hooks);

  test('should list available posts', async function(assert) {
    await visit('/');
    assert.equal(
      this.element.querySelectorAll('[data-test-post]').length,
      15,
      'should display 15 posts'
    );
  });
  
});
