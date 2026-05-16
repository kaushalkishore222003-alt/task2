import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import { loginSchema, LoginFormValues } from '../../utils/authSchemas';
import { useAuthStore } from '../../store/useAuthStore';
import { cn } from '../../utils/cn';

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { login, loading } = useAuthStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    }
  });

  const onSubmit = async (data: LoginFormValues) => {
    setAuthError(null);
    try {
      // Mock logic: allow kaushalkishore222003@gmail.com, admin@gmail.com / member@gmail.com with password123
      const isCorrectPassword = data.password === 'password123';
      const adminEmails = ['admin@gmail.com', 'kaushalkishore222003@gmail.com'];
      const allowedEmails = [...adminEmails, 'member@gmail.com'];
      
      const role = adminEmails.includes(data.email) ? 'ADMIN' : 'MEMBER';
      
      if (allowedEmails.includes(data.email) && isCorrectPassword) {
        await login(data.email, role);
        navigate('/dashboard');
      } else {
        setAuthError(`Invalid credentials. Use one of [${allowedEmails.join(', ')}] with password123`);
      }
    } catch (error) {
      setAuthError('An unexpected error occurred. Please try again.');
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-4xl editorial-heading text-ink">Sign in.</h2>
        <p className="text-sm text-gray-400 mt-2 font-medium">Access your editorial workspace</p>
      </div>

      {authError && (
        <div className="bg-red-50 border border-red-100 text-red-600 px-4 py-3 rounded-2xl text-xs font-bold transition-all animate-pulse">
          {authError}
        </div>
      )}

      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1.5 ml-1">Email</label>
          <input 
            {...register('email')}
            type="email" 
            className={cn(
              "block w-full bg-gray-50 border-none rounded-2xl px-4 py-4 text-sm text-ink placeholder-gray-300 focus:ring-2 focus:ring-primary-dark/10 focus:bg-white transition-all outline-none",
              errors.email && "ring-2 ring-red-100"
            )} 
            placeholder="name@studio.com" 
          />
          {errors.email && <p className="mt-1 ml-1 text-[10px] text-red-500 font-bold uppercase tracking-wider">{errors.email.message}</p>}
        </div>

        <div className="relative">
          <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1.5 ml-1">Password</label>
          <input 
            {...register('password')}
            type={showPassword ? "text" : "password"} 
            className={cn(
              "block w-full bg-gray-50 border-none rounded-2xl px-4 py-4 text-sm text-ink placeholder-gray-300 focus:ring-2 focus:ring-primary-dark/10 focus:bg-white transition-all outline-none",
              errors.password && "ring-2 ring-red-100"
            )} 
          />
          <button 
            type="button" 
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 bottom-4 text-gray-300 hover:text-gray-500 transition-colors"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
          {errors.password && <p className="mt-1 ml-1 text-[10px] text-red-500 font-bold uppercase tracking-wider">{errors.password.message}</p>}
        </div>

        <div className="flex items-center justify-between px-1">
           <label className="flex items-center group cursor-pointer">
              <input 
                {...register('rememberMe')}
                type="checkbox" 
                className="w-4 h-4 rounded border-gray-200 text-primary-dark focus:ring-primary-dark/20" 
              />
              <span className="ml-2 text-xs font-bold text-gray-400 group-hover:text-ink transition-colors">Keep me signed in</span>
           </label>
           <Link to="/auth/forgot-password" size={18} className="text-xs font-bold text-primary-dark hover:underline">Forgot?</Link>
        </div>

        <button 
          disabled={loading}
          type="submit" 
          className="w-full bg-primary-dark text-white py-4 rounded-2xl font-bold uppercase tracking-widest hover:bg-ink transition-all shadow-xl shadow-primary-dark/20 active:scale-[0.98] flex items-center justify-center space-x-2"
        >
          {loading ? <Loader2 className="animate-spin h-5 w-5" /> : <span>Authenticate</span>}
        </button>

        <div className="relative py-2">
          <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-100"></div></div>
          <div className="relative flex justify-center text-xs uppercase"><span className="bg-white px-4 text-gray-300 font-bold tracking-widest">Or Continue with</span></div>
        </div>

        <button type="button" className="w-full bg-white border border-gray-100 text-ink py-4 rounded-2xl font-bold text-xs uppercase tracking-widest hover:border-ink transition-all flex items-center justify-center space-x-2">
          <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" className="w-4 h-4" alt="Google" />
          <span>Google Account</span>
        </button>
      </form>

      <div className="text-center">
        <p className="text-xs text-gray-400 font-medium">
          New here? <Link to="/auth/signup" className="text-primary-dark font-bold hover:underline">Apply for an account</Link>
        </p>
      </div>
    </div>
  );
}
