import { Navigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth';
import SignupPage from '../pages/SignUpPage';
import { User } from '../types/auth';

interface AuthContextType {
    isAuthenticated: boolean;
    user: User;
    signup: (name: string, email: string, password: string, passwordConfirmation: string) => void;
    logout: () => void;
    getJWT: () => string | null;
}

const LoginPageRoute: React.FC = () => {
    const { isAuthenticated } = useAuth() as AuthContextType;

    return isAuthenticated ? <Navigate to="/dashboard" /> : <SignupPage />;
};

export default LoginPageRoute;
