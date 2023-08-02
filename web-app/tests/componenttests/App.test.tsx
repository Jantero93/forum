import { describe, test, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import App from '~/App';
import { BrowserRouter } from 'react-router-dom';

global.fetch = vi.fn();

describe('<App />', () => {
  test.skip('App mounts properly', () => {
    throw new Error('not implemented');
    const wrapper = render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    expect(wrapper).toBeTruthy();
  });
});
