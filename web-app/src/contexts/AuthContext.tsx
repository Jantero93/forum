import React, { useCallback } from 'react';
import { decodeJwtClaims } from '~/util/jwt';

export type AuthState = {
  username: string;
  isLogged: boolean;
  role: string;
};
const initialState: AuthState = {
  isLogged: false,
  role: 'NONE',
  username: ''
};

/** Default values */
const AuthContext = React.createContext({
  isLogged: false,
  role: 'NONE',
  username: ''
});

// eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars
const SetAuthStateContext = React.createContext((token: string | null) => {});

const useAuthState = (): AuthState => React.useContext(AuthContext);
const useUpdateAuthState = (): ((token: string | null) => void) =>
  React.useContext(SetAuthStateContext);

export const useAuthHooks = { useAuthState, useUpdateAuthState };

type Props = {
  children: React.ReactNode;
};

const AuthProvider: React.FC<Props> = ({ children }: Props): JSX.Element => {
  const [authState, setAuthState] = React.useState<AuthState>({
    isLogged: false,
    role: 'NONE',
    username: ''
  });

  const updateUser = useCallback((token: string | null) => {
    if (token === null) {
      const notLoggedState: AuthState = {
        isLogged: false,
        role: 'NONE',
        username: ''
      };
      setAuthState(notLoggedState);
      return;
    }

    const { role, sub } = decodeJwtClaims(token);
    const newAuthState: AuthState = {
      isLogged: true,
      role: role,
      username: sub
    };
    setAuthState(newAuthState);
  }, []);

  return (
    <AuthContext.Provider value={authState}>
      <SetAuthStateContext.Provider value={updateUser}>
        {children}
      </SetAuthStateContext.Provider>
    </AuthContext.Provider>
  );
};

export default AuthProvider;
