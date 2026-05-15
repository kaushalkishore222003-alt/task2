import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { Loader2, KeyRound } from 'lucide-react';
import { resetPasswordSchema, ResetPasswordFormValues } from '../../utils/authSchemas';
import { cn } from '../../utils/cn';

export default function ResetPasswordPage() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const onSubmit = async (data: ResetPasswordFormValues) => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setLoading(false);
    navigate('/auth/login');
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-4xl editorial-heading text-ink">New Secret.</h2>
        <p className="text-sm text-gray-400 mt-2 font-medium">Create a strong new password</p>
      </div>

      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1.5 ml-1">New Password</label>
          <input 
            {...register('password')}
            type="password" 
            className={cn(
              "block w-full bg-gray-50 border-none rounded-2xl px-4 py-4 text-sm text-ink placeholder-gray-300 focus:ring-2 focus:ring-primary-dark/10 focus:bg-white transition-all outline-none",
              errors.password && "ring-2 ring-red-100"
            )} 
          />
          {errors.password && <p className="mt-1 ml-1 text-[10px] text-red-500 font-bold uppercase tracking-wider">{errors.password.message}</p>}
        </div>

        <div>
          <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1.5 ml-1">Confirm Secret</label>
          <input 
            {...register('confirmPassword')}
            type="password" 
            className={cn(
              "block w-full bg-gray-50 border-none rounded-2xl px-4 py-4 text-sm text-ink placeholder-gray-300 focus:ring-2 focus:ring-primary-dark/10 focus:bg-white transition-all outline-none",
              errors.confirmPassword && "ring-2 ring-red-100"
            )} 
          />
          {errors.confirmPassword && <p className="mt-1 ml-1 text-[10px] text-red-500 font-bold uppercase tracking-wider">{errors.confirmPassword.message}</p>}
        </div>

        <button 
          disabled={loading}
          type="submit" 
          className="w-full bg-primary-dark text-white py-4 rounded-2xl font-bold uppercase tracking-widest hover:bg-ink transition-all shadow-xl shadow-primary-dark/20 active:scale-[0.98] flex items-center justify-center space-x-2"
        >
          {loading ? <Loader2 className="animate-spin h-5 w-5" /> : <span>Update Secret</span>}
        </button>
      </form>
    </div>
  );
}
