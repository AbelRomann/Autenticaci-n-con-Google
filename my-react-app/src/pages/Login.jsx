import React from 'react';
import { useNavigate } from 'react-router-dom'; // Importar el hook useNavigate
import { supabase } from '../supabase/supabaseconfig';

const Login = () => {
  const navigate = useNavigate(); // Inicializar el hook

  const handleLogin = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
    });

    if (error) {
      console.error('Error al iniciar sesión:', error.message);
    } else {
      console.log('Inicio de sesión exitoso:', data);
    }
  };

  // Escuchar el cambio de estado de autenticación
  React.useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN') {
        navigate('/user'); // Redirigir al usuario
      }
    });

    return () => {
      authListener.subscription.unsubscribe(); // Limpiar el listener al desmontar el componente
    };
  }, [navigate]);

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Inicia Sesión</h1>
      <button onClick={handleLogin}>Iniciar sesión con Google</button>
    </div>
  );
};

export default Login;
