import jwtDecode from 'jwt-decode';

type JwtClaims = {
  sub: string;
  role: string;
  iat: number;
  exp: number;
  userId: number;
};

export const decodeJwtClaims = (token: string): JwtClaims => jwtDecode(token);
