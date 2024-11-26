import React, { useState, useEffect, ReactNode } from 'react';
import { useMutation } from '@apollo/client';
import { useDispatch } from 'react-redux';
import { AuthContextType } from '../contexts/AuthContext';
import { LOGIN_USER } from '../graphql/mutations/loginUser';
import { SIGNUP_USER } from '../graphql/mutations/signUp';
import { User, LoginResponse, SignupResponse } from '../types/auth';
import { AuthContext } from '../contexts/AuthContext';
import { setUser } from '../features/user/userSlice';

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUserState] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const dispatch = useDispatch();

  const [loginUserMutation] = useMutation<LoginResponse>(LOGIN_USER);
  const [signupUserMutation] = useMutation<SignupResponse>(SIGNUP_USER);

  useEffect(() => {
    const checkAuthStatus = () => {
      const token = localStorage.getItem('token');
      const storedUser = localStorage.getItem('user');
      if (token && storedUser) {
        const parsedUser = JSON.parse(storedUser) as User;
        setIsAuthenticated(true);
        setUserState(parsedUser);
        dispatch(setUser(parsedUser));
      } else {
        setIsAuthenticated(false);
        setUserState(null);
        dispatch(setUser(null));
      }
      setIsLoading(false);
    };

    checkAuthStatus();
  }, [dispatch]);

  const login = async (email: string, password: string): Promise<void> => {
    setIsLoading(true);
    try {
      const { data } = await loginUserMutation({
        variables: { input: { email, password } },
      });
      if (data?.loginUser.user) {
        localStorage.setItem('token', data.loginUser.token);
        localStorage.setItem('user', JSON.stringify(data.loginUser.user));
        setUserState(data.loginUser.user);
        setIsAuthenticated(true);
        dispatch(setUser(data.loginUser.user));
      } else {
        setIsAuthenticated(false);
        setUserState(null);
        dispatch(setUser(null));
        throw new Error(data?.loginUser.errors?.[0]);
      }
    } catch (error) {
      setIsAuthenticated(false);
      setUserState(null);
      dispatch(setUser(null));
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (
    name: string,
    email: string,
    password: string,
    passwordConfirmation: string
  ): Promise<void> => {
    setIsLoading(true);
    try {
      const { data } = await signupUserMutation({
        variables: {
          input: { name, email, password, passwordConfirmation },
        },
      });
      if (!data?.signUpUser.user) {
        setIsAuthenticated(false);
        setUserState(null);
        dispatch(setUser(null));
        throw new Error(data?.signUpUser.errors?.[0] || 'Signup failed');
      }
    } catch (error) {
      setIsAuthenticated(false);
      setUserState(null);
      dispatch(setUser(null));
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = (): void => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsAuthenticated(false);
    setUserState(null);
    dispatch(setUser(null));
  };

  const getJWT = (): string | null => {
    return localStorage.getItem('token');
  };

  const contextValue: AuthContextType = {
    isAuthenticated,
    isLoading,
    user,
    login,
    signup,
    logout,
    getJWT,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

