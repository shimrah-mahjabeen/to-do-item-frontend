import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { AuthContextType } from '../types/auth';

export default function useAuth(): AuthContextType {
  return useContext(AuthContext);
}

