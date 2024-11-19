import React, { useEffect, useState } from 'react';
import { supabase } from '../supabase/supabaseconfig';

const UserInfo = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await supabase.auth.getUser();

      if (data) {
        setUser(data.user);
      } else {
        console.error('Error obteniendo el usuario:', error);
      }
    };

    fetchUser();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = '/';
  };

  if (!user) {
    return <div>Cargando...</div>;
  }

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Información del Usuario</h1>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Nombre:</strong> {user.user_metadata?.full_name}</p>
      <button onClick={handleLogout}>Cerrar sesión</button>
    </div>
  );
};

export default UserInfo;
