import { createContext } from 'react';
import { User } from '../types/auth';

export interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string, passwordConfirmation: string ) => Promise<void>;
  logout: () => void;
  getJWT: () => string | null;
}

export const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  isLoading: false,
  user: null,
  login: async () => {},
  signup: async () => {},
  logout: () => {},
  getJWT: () => null,
});