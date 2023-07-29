import React, { useState } from 'react';
import { useLocalStorage } from '~/hooks/useLocalStorage';
import { isBefore } from '~/util/dateHelpers';
import { decodeJwtClaims } from '~/util/jwt';

type AuthContextType = {
  exp: number | null;
  token: string | null;
  isLogged: boolean;
  role: string | null;
  username: string | null;
};

const initialState: AuthContextType = {
  exp: null,
  token: null,
  isLogged: false,
  role: null,
  username: null
};

const AuthContext = React.createContext(initialState);
const AuthUpdateContext = React.createContext({
  updateAuthState: (_token: string | null): void => undefined,
  checkTokenExpiration: (): void => undefined
});

export const useAuthState = (): AuthContextType =>
  React.useContext(AuthContext);
export const useAuthLogin = (): {
  updateAuthState: (token: string | null) => void;
  checkTokenExpiration: () => void;
} => React.useContext(AuthUpdateContext);

type AuthProviderProps = { children: React.ReactNode };

const AuthProvider = ({ children }: AuthProviderProps) => {
  const { localStorageItem: token, setLocalStorageItem: setLocalStorageToken } =
    useLocalStorage<string>('JWT_TOKEN');
  const [exp, setExp] = useState(0);
  const [username, setUsername] = useState<string | null>(null);
  const [isLogged, setIsLogged] = useState(false);
  const [role, setRole] = useState<string | null>(null);

  const setNotLoggedState = () => {
    setExp(0);
    setRole(null);
    setUsername(null);
    setIsLogged(false);
  };

  const updateAuthState = (token: string | null) => {
    if (token === null) {
      setNotLoggedState;
      setLocalStorageToken(null);
      return;
    }

    setLocalStorageToken(token);

    const { exp, role, sub } = decodeJwtClaims(token);
    setExp(exp);
    setRole(role);
    setUsername(sub);
    setIsLogged(true);
  };

  const context: AuthContextType = {
    exp,
    role,
    token,
    username,
    isLogged
  };

  const checkTokenExpiration = () => {
    if (token === null) {
      setNotLoggedState();
      return;
    }

    const { exp } = decodeJwtClaims(token);

    if (isBefore(exp, new Date())) {
      setNotLoggedState();
      return;
    }
  };

  return (
    <AuthContext.Provider value={context}>
      <AuthUpdateContext.Provider
        value={{ updateAuthState, checkTokenExpiration }}
      >
        {children}
      </AuthUpdateContext.Provider>
    </AuthContext.Provider>
  );
};

export default AuthProvider;
