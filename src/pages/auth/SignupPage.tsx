import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import { signupSchema, SignupFormValues } from '../../utils/authSchemas';
import { useAuthStore } from '../../store/useAuthStore';
import { cn } from '../../utils/cn';

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);
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
    }
  });

  const onSubmit = async (data: SignupFormValues) => {
    try {
      await signup(data);
      navigate('/dashboard');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-4xl editorial-heading text-ink">Join Workspace.</h2>
        <p className="text-sm text-gray-400 mt-2 font-medium">Create your professional profile</p>
      </div>

      <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1.5 ml-1">Full Name</label>
          <input 
            {...register('name')}
            type="text" 
            className={cn(
              "block w-full bg-gray-50 border-none rounded-2xl px-4 py-4 text-sm text-ink placeholder-gray-300 focus:ring-2 focus:ring-primary-dark/10 focus:bg-white transition-all outline-none",
              errors.name && "ring-2 ring-red-100"
            )} 
            placeholder="John Sterling" 
          />
          {errors.name && <p className="mt-1 ml-1 text-[10px] text-red-500 font-bold uppercase tracking-wider">{errors.name.message}</p>}
        </div>

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

        <div>
          <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1.5 ml-1">Your Role</label>
          <select 
            {...register('role')}
            className={cn(
              "block w-full bg-gray-50 border-none rounded-2xl px-4 py-4 text-sm text-ink focus:ring-2 focus:ring-primary-dark/10 focus:bg-white transition-all outline-none appearance-none",
              errors.role && "ring-2 ring-red-100"
            )}
          >
            <option value="MEMBER">Team Member</option>
            <option value="ADMIN">Team Administrator</option>
          </select>
          {errors.role && <p className="mt-1 ml-1 text-[10px] text-red-500 font-bold uppercase tracking-wider">{errors.role.message}</p>}
        </div>

        <div className="grid grid-cols-2 gap-4">
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
            {errors.password && <p className="mt-1 ml-1 text-[10px] text-red-500 font-bold uppercase tracking-wider">{errors.password.message}</p>}
          </div>

          <div className="relative">
            <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1.5 ml-1">Confirm</label>
            <input 
              {...register('confirmPassword')}
              type={showPassword ? "text" : "password"} 
              className={cn(
                "block w-full bg-gray-50 border-none rounded-2xl px-4 py-4 text-sm text-ink placeholder-gray-300 focus:ring-2 focus:ring-primary-dark/10 focus:bg-white transition-all outline-none",
                errors.confirmPassword && "ring-2 ring-red-100"
              )} 
            />
            {errors.confirmPassword && <p className="mt-1 ml-1 text-[10px] text-red-500 font-bold uppercase tracking-wider">{errors.confirmPassword.message}</p>}
          </div>
        </div>

        <button 
          disabled={loading}
          type="submit" 
          className="w-full bg-primary-dark text-white py-4 rounded-2xl font-bold uppercase tracking-widest hover:bg-ink transition-all shadow-xl shadow-primary-dark/20 active:scale-[0.98] flex items-center justify-center space-x-2 mt-4"
        >
          {loading ? <Loader2 className="animate-spin h-5 w-5" /> : <span>Create Account</span>}
        </button>
      </form>

      <div className="text-center">
        <p className="text-xs text-gray-400 font-medium">
          Already a member? <Link to="/auth/login" className="text-primary-dark font-bold hover:underline">Sign in instead</Link>
        </p>
      </div>
    </div>
  );
}
