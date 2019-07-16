import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | post', function(hooks) {
  setupRenderingTest(hooks);

  // test('should show details of post', async function(assert) {});

  hooks.beforeEach(function() {
    this.post = {
      title: 'test-title',
      body: 'Lorem Ipsum'
    };
  });

  test('should display post details', async function(assert) {
    await render(hbs`<Post @post={{post}} />`);
    assert.equal(
      this.element.querySelector('[data-test-post-title]').textContent.trim(),
      'test-title',
      'Post title'
    );
    assert.equal(
      this.element.querySelector('[data-test-post-body]').textContent.trim(),
      'Lorem Ipsum',
      'Post body'
    );
  });

  test('should toggle post info on click', async function(assert) {
    await render(hbs`<Post @post={{post}} />`);
    assert.notOk(this.$('[data-test-full-post]')[0], 'undefined before click');
    await this.$('[data-test-link]')[0].click();
    assert.ok(this.$('[data-test-full-post]')[0].innerText, 'data after click');
    await this.$('[data-test-link]')[0].click();
    assert.notOk(this.$('[data-test-full-post]')[0], 'undefined after clicking again');
  });

});
