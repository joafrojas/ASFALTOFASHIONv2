

import React, { useState } from 'react';
import LoginForm from '../Auth/LoginForm';
import RegisterForm from '../Auth/RegisterForm';
import { type UserData } from '../../utils/validation';
import '../../styles/Auth.css';


interface PaginaAuthProps {
    onLoginSuccess: (user: UserData) => void;
}

const PaginaAuth: React.FC<PaginaAuthProps> = ({ onLoginSuccess }) => {
    const [view, setView] = useState<'login' | 'register'>('login');

    const handleLoginSuccess = (user: UserData) => {
        onLoginSuccess(user);
    };

    const handleRegisterSuccess = () => {
        setView('login');
    };

    return (
        <div className="contenedorAsfalto">
            
            <div className="ladoImagen">
                 {/* Esta sección solo contiene la imagen de fondo */}
            </div>

            <div className="ladoFormulario">
                
                <div className="topContent">
                    
                    <img src="/IMG/asfaltofashion.png" alt="ASFALTO FASHION Logo" className="logoPrincipal" /> 
                    
                    {/* El bloque de texto editorial */}
                    <div className="editorialTexto">
                      
                        <p>Accede a contenido exclusivo de diseño y recursos acerca fashion de propiedad.</p>
                    </div>
                </div>

                {view === 'login' ? (
                    <LoginForm
                        onSuccess={handleLoginSuccess}
                        onSwitchToRegister={() => setView('register')}
                    />
                ) : (
                    <RegisterForm
                        onSuccess={handleRegisterSuccess}
                    />
                )}

                <p className="marca">@asaltofashionistas</p>
            </div>
        </div>
    );
};

export default PaginaAuth;