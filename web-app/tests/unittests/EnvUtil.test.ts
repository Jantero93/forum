import { describe, test, expect } from 'vitest';

import env from '~/util/env';

describe('Env variable tests', () => {
  test('NODE_ENV should equal "test"', () => {
    expect(env.NODE_ENV).toEqual('test');
    expect(env.API_URL).toBeTruthy();
  });
});
