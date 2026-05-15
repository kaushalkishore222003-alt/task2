import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../context/useAuthStore';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';

const signupSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string(),
  role: z.enum(['ADMIN', 'MEMBER']),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type SignupFormValues = z.infer<typeof signupSchema>;

export default function SignupPage() {
  const navigate = useNavigate();
  const { signup, loading } = useAuthStore();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      role: 'MEMBER',
    },
  });

  const onSubmit = async (data: SignupFormValues) => {
    try {
      await signup(data);
      toast.success('Account created! Welcome to SyncroTask.');
      navigate('/dashboard');
    } catch (error: any) {
      toast.error(error.message || 'Registration failed');
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-4xl editorial-heading text-ink">Join.</h2>
        <p className="text-sm text-gray-400 mt-2 font-medium">Create your editorial workspace</p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1.5 ml-1">Full Name</label>
          <input 
            {...register('name')}
            className={`block w-full bg-gray-50 border-none rounded-2xl px-4 py-3 text-sm text-ink placeholder-gray-300 focus:ring-2 focus:ring-primary-dark/10 focus:bg-white transition-all outline-none ${errors.name ? 'ring-2 ring-red-500/20 bg-red-50' : ''}`} 
            placeholder="John Doe" 
          />
          {errors.name && <p className="mt-1 ml-1 text-[10px] font-bold text-red-500 uppercase">{errors.name.message}</p>}
        </div>
        <div>
          <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1.5 ml-1">Email</label>
          <input 
            {...register('email')}
            type="email" 
            className={`block w-full bg-gray-50 border-none rounded-2xl px-4 py-3 text-sm text-ink placeholder-gray-300 focus:ring-2 focus:ring-primary-dark/10 focus:bg-white transition-all outline-none ${errors.email ? 'ring-2 ring-red-500/20 bg-red-50' : ''}`} 
            placeholder="name@studio.com" 
          />
          {errors.email && <p className="mt-1 ml-1 text-[10px] font-bold text-red-500 uppercase">{errors.email.message}</p>}
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1.5 ml-1">Password</label>
            <input 
              {...register('password')}
              type="password" 
              className={`block w-full bg-gray-50 border-none rounded-2xl px-4 py-3 text-sm text-ink placeholder-gray-300 focus:ring-2 focus:ring-primary-dark/10 focus:bg-white transition-all outline-none ${errors.password ? 'ring-2 ring-red-500/20 bg-red-50' : ''}`} 
            />
          </div>
          <div>
            <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1.5 ml-1">Confirm</label>
            <input 
              {...register('confirmPassword')}
              type="password" 
              className={`block w-full bg-gray-50 border-none rounded-2xl px-4 py-3 text-sm text-ink placeholder-gray-300 focus:ring-2 focus:ring-primary-dark/10 focus:bg-white transition-all outline-none ${errors.confirmPassword ? 'ring-2 ring-red-500/20 bg-red-50' : ''}`} 
            />
          </div>
        </div>
        {(errors.password || errors.confirmPassword) && (
          <p className="mt-1 ml-1 text-[10px] font-bold text-red-500 uppercase text-center">
            {errors.password?.message || errors.confirmPassword?.message}
          </p>
        )}

        <div>
          <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1.5 ml-1">Role</label>
          <div className="grid grid-cols-2 gap-2">
            {['MEMBER', 'ADMIN'].map((role) => (
              <label key={role} className="cursor-pointer">
                <input 
                  type="radio" 
                  value={role} 
                  {...register('role')} 
                  className="peer hidden" 
                />
                <div className="text-center py-2 rounded-xl text-[10px] font-black uppercase tracking-widest bg-gray-50 text-gray-400 peer-checked:bg-primary-light peer-checked:text-primary-dark border border-transparent peer-checked:border-primary-dark/10 transition-all">
                  {role}
                </div>
              </label>
            ))}
          </div>
        </div>

        <button 
          disabled={loading}
          type="submit" 
          className="w-full bg-primary-dark text-white py-4 rounded-2xl font-bold uppercase tracking-widest hover:bg-ink transition-all shadow-xl shadow-primary-dark/20 active:scale-[0.98] flex items-center justify-center disabled:opacity-70 mt-4"
        >
          {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Create Account'}
        </button>
      </form>
      <div className="text-center">
        <p className="text-xs text-gray-400 font-medium">
          Already have an account? <Link to="/auth/login" className="text-primary-dark font-bold hover:underline">Sign in</Link>
        </p>
      </div>
    </div>
  );
}
