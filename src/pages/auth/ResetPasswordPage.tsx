import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';
import { useState } from 'react';

const schema = z.object({
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type FormValues = z.infer<typeof schema>;

export default function ResetPasswordPage() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormValues) => {
    setLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setLoading(false);
    toast.success('Password updated successfully');
    navigate('/auth/login');
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-4xl editorial-heading text-ink">New Pass.</h2>
        <p className="text-sm text-gray-400 mt-2 font-medium">Create a strong, new password</p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1.5 ml-1">New Password</label>
          <input 
            {...register('password')}
            type="password" 
            className={`block w-full bg-gray-50 border-none rounded-2xl px-4 py-4 text-sm text-ink placeholder-gray-300 focus:ring-2 focus:ring-primary-dark/10 focus:bg-white transition-all outline-none ${errors.password ? 'ring-2 ring-red-500/20 bg-red-50' : ''}`} 
          />
          {errors.password && <p className="mt-1.5 ml-1 text-[10px] font-bold text-red-500 uppercase">{errors.password.message}</p>}
        </div>
        <div>
          <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1.5 ml-1">Confirm New Password</label>
          <input 
            {...register('confirmPassword')}
            type="password" 
            className={`block w-full bg-gray-50 border-none rounded-2xl px-4 py-4 text-sm text-ink placeholder-gray-300 focus:ring-2 focus:ring-primary-dark/10 focus:bg-white transition-all outline-none ${errors.confirmPassword ? 'ring-2 ring-red-500/20 bg-red-50' : ''}`} 
          />
          {errors.confirmPassword && <p className="mt-1.5 ml-1 text-[10px] font-bold text-red-500 uppercase">{errors.confirmPassword.message}</p>}
        </div>
        <button 
          disabled={loading}
          type="submit" 
          className="w-full bg-primary-dark text-white py-4 rounded-2xl font-bold uppercase tracking-widest hover:bg-ink transition-all shadow-xl shadow-primary-dark/20 active:scale-[0.98] flex items-center justify-center disabled:opacity-70"
        >
          {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Update Password'}
        </button>
      </form>
    </div>
  );
}
