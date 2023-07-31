import { InvalidTokenError } from 'jwt-decode';
import { describe, test, expect } from 'vitest';

import { decodeJwtClaims } from '~/util/jwt';

const validToken =
  'eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiQURNSU4iLCJzdWIiOiJhZG1pbiIsImlhdCI6MTY5MDgxMDc0NiwiZXhwIjoxNjkwODk3MTQ2fQ.rw8LK6zhTPOuG3K_Q920MM3DwVYtTHMjRTGT-iGfeVE';

describe('Decode JWT utilities tests', () => {
  test('Decode JWT utility with valid token', () => {
    const { exp, iat, role, sub } = decodeJwtClaims(validToken);
    expect(exp).toEqual(1690897146);
    expect(iat).toEqual(1690810746);
    expect(sub).toEqual('admin');
    expect(role).toEqual('ADMIN');
  });

  test('Decode JWT with invalid token', () => {
    expect(() => decodeJwtClaims('ABC')).toThrow(InvalidTokenError);
  });
});
