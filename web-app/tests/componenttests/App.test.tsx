import { describe, test, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import App from '~/App';
import { BrowserRouter } from 'react-router-dom';

global.fetch = vi.fn();

describe('<App />', () => {
  throw new Error('not implemented');
  test('App mounts properly', () => {
    const wrapper = render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    expect(wrapper).toBeTruthy();
  });
});
