import { InvalidTokenError } from 'jwt-decode';
import { describe, test, expect } from 'vitest';

import { decodeJwtClaims } from '~/util/jwt';

const validToken =
  'eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiQURNSU4iLCJ1c2VySWQiOjEyMzUyLCJzdWIiOiJhZG1pbiIsImlhdCI6MTY5MTA0MDE0NSwiZXhwIjoxNjkxMTI2NTQ1fQ.ZlDPH3KOUJOBSIGv1O4FsYoj91BQ4Z2HmYuH3ZfYD2A';

describe('Decode JWT utilities tests', () => {
  test('Decode JWT utility with valid token', () => {
    const { exp, iat, role, sub, userId } = decodeJwtClaims(validToken);
    expect(exp).toEqual(1691126545);
    expect(iat).toEqual(1691040145);
    expect(sub).toEqual('admin');
    expect(role).toEqual('ADMIN');
    expect(userId).toEqual(12352);
  });

  test('Decode JWT with invalid token', () => {
    expect(() => decodeJwtClaims('ABC')).toThrow(InvalidTokenError);
  });
});
