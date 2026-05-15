import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../context/useAuthStore';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  rememberMe: z.boolean().optional(),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
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
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    try {
      await login(data.email, data.password);
      toast.success('Login successful! Welcome back.');
      navigate('/dashboard');
    } catch (error: any) {
      toast.error(error.message || 'Authentication failed');
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-4xl editorial-heading text-ink">Sign in.</h2>
        <p className="text-sm text-gray-400 mt-2 font-medium">Access your editorial workspace</p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1.5 ml-1">Email</label>
          <input 
            {...register('email')}
            type="email" 
            className={`block w-full bg-gray-50 border-none rounded-2xl px-4 py-4 text-sm text-ink placeholder-gray-300 focus:ring-2 focus:ring-primary-dark/10 focus:bg-white transition-all outline-none ${errors.email ? 'ring-2 ring-red-500/20 bg-red-50' : ''}`} 
            placeholder="name@studio.com" 
          />
          {errors.email && <p className="mt-1.5 ml-1 text-[10px] font-bold text-red-500 uppercase">{errors.email.message}</p>}
        </div>
        <div>
          <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1.5 ml-1">Password</label>
          <input 
            {...register('password')}
            type="password" 
            className={`block w-full bg-gray-50 border-none rounded-2xl px-4 py-4 text-sm text-ink placeholder-gray-300 focus:ring-2 focus:ring-primary-dark/10 focus:bg-white transition-all outline-none ${errors.password ? 'ring-2 ring-red-500/20 bg-red-50' : ''}`} 
          />
          {errors.password && <p className="mt-1.5 ml-1 text-[10px] font-bold text-red-500 uppercase">{errors.password.message}</p>}
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
           <Link to="/auth/forgot-password" size="sm" className="text-xs font-bold text-primary-dark hover:underline">Forgot?</Link>
        </div>
        <button 
          disabled={loading}
          type="submit" 
          className="w-full bg-primary-dark text-white py-4 rounded-2xl font-bold uppercase tracking-widest hover:bg-ink transition-all shadow-xl shadow-primary-dark/20 active:scale-[0.98] flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Authenticate'}
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
