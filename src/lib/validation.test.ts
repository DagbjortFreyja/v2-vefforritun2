import assert from 'node:assert';
import { describe, it } from 'node:test';
import { TodoItemSchema } from './validation.js';

describe('TodoItemSchema', () => {
  it('accepts valid title', () => {
    const result = TodoItemSchema.safeParse({ title: 'halló' });
    assert.strictEqual(result.success, true);
  });

  it('rejects empty title', () => {
    const result = TodoItemSchema.safeParse({ title: '' });
    assert.strictEqual(result.success, false);
  });
});
