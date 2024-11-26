export interface User {
  id: number;
  email: string;
}

export interface LoginResponse {
  loginUser: {
    user: User;
    token: string;
    errors: string[] | null;
  }
}

export interface SignupResponse {
  signUpUser: {
    user: User;
    errors: string[] | null;
  }
}

export interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (
    name: string,
    email: string,
    password: string,
    passwordConfirmation: string,
  ) => Promise<void>;
  logout: () => void;
  getJWT: () => string | null;
}
