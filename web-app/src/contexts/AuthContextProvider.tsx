import React, { useCallback, useMemo, useState } from 'react';
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

const AuthUpdateContext = React.createContext({
  updateAuthState: (_token: string | null): void => undefined,
  checkTokenExpiration: (): void => undefined,
  authState: initialState
});

export const useAuthContext = (): {
  authState: AuthContextType;
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

  const setNotLoggedState = useCallback(() => {
    setLocalStorageToken(null);

    setExp((_prevState) => 0);
    setRole(null);
    setUsername(null);
    setIsLogged(false);
  }, [setLocalStorageToken]);

  const updateAuthState = useCallback(
    (token: string | null) => {
      if (token === null) {
        setNotLoggedState();
        return;
      }

      setLocalStorageToken(token);

      const { exp, role, sub } = decodeJwtClaims(token);
      setExp(exp);
      setRole(role);
      setUsername(sub);
      setIsLogged(true);
    },
    [setLocalStorageToken, setNotLoggedState]
  );

  const authState = useMemo(
    () => ({
      exp,
      role,
      token,
      username,
      isLogged
    }),
    [exp, isLogged, role, token, username]
  );

  const checkTokenExpiration = useCallback(() => {
    if (token === null) {
      setNotLoggedState();
      return;
    }

    const { exp, role, sub } = decodeJwtClaims(token);

    if (isBefore(exp, new Date())) {
      setNotLoggedState();
    }

    setExp(exp);
    setRole(role);
    setUsername(sub);
    setIsLogged(true);
  }, [setNotLoggedState, token]);

  const contextState = useMemo(
    () => ({
      authState,
      updateAuthState,
      checkTokenExpiration
    }),
    [authState, checkTokenExpiration, updateAuthState]
  );

  return (
    <AuthUpdateContext.Provider value={contextState}>
      {children}
    </AuthUpdateContext.Provider>
  );
};

export default AuthProvider;
