import { useEffect } from 'react';
import { useUser } from '../contexts/UserContext';

export function useAuth() {
  const { setUser } = useUser();

  useEffect(() => {
    const token = localStorage.getItem('jwt_token');
    if (token) {
      // (Optional) Validate token on the server before using it
      setUser({ token, email: 'example@user.com' }); // Replace with actual user info from validation
    }
  }, [setUser]);
}
