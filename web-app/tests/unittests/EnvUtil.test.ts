import { describe, test, expect } from 'vitest';

import env from '~/util/env';

describe('Env variable tests', () => {
  test('NODE_ENV should equal "test"', () => {
    const { API_URL, NODE_ENV } = env;
    expect(NODE_ENV).toEqual('test');
    expect(API_URL).not.toBeUndefined();
    expect(API_URL).contains('localhost');
  });
});
