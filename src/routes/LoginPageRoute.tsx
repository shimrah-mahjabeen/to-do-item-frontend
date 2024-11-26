import { Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import LoginPage from '../pages/LoginPage';
import { User } from '../types/auth';

interface AuthContextType {
    isAuthenticated: boolean;
    isLoading: boolean;
    user: User;
    login: (email: string, password: string) => void;
    signup: (name: string, email: string, password: string, passwordConfirmation: string) => void;
    logout: () => void;
    getJWT: () => string | null;
}

const LoginPageRoute: React.FC = () => {
    const { isAuthenticated } = useAuth() as AuthContextType;

    return isAuthenticated ? <Navigate to="/" /> : <LoginPage />;
};

export default LoginPageRoute;
