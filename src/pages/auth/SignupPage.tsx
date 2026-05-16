import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SignupPage() {
  const navigate = useNavigate();
  
  useEffect(() => {
    navigate('/auth/login', { replace: true });
  }, [navigate]);

  return (
    <div className="flex items-center justify-center p-12">
      <div className="w-8 h-8 border-4 border-primary-dark border-t-transparent rounded-full animate-spin" />
    </div>
  );
}
