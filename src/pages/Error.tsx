import Lottie from 'react-lottie-player';
import animationData from '../assets/animation-lottie.json';
import { useNavigate } from "react-router-dom";
import { Button } from '../components/catalyst/button';

const Error = () => {
    const navigate = useNavigate();

    return (
        <div>
            <section className="flex items-center h-screen py-5">
                <div className="container py-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 items-center">
                        <div className="md:order-2 flex justify-center">
                            <Lottie
                                loop
                                animationData={animationData}
                                play
                                style={{ width: '100%', height: 'auto' }}
                            />
                        </div>
                        <div className="text-center md:text-left">
                            <div className="mb-3">
                                <h1 className="font-bold text-4xl">PAGE NOT FOUND!</h1>
                            </div>
                            <div className="mb-3">
                                <h1 className="text-6xl font-bold text-gray-500">Error 404</h1>
                            </div>
                            <div className="mb-5">
                                <p className="text-sm font-light">
                                    The page you are looking for was moved, removed, or might never have existed.
                                </p>
                            </div>
                            <div>
                            <Button type="button" onClick={() => navigate('/dashboard')}>
                                Back to homepage
                            </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Error;
