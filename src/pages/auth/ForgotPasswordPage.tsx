import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from 'react-router-dom';
import { Loader2, Mail, CheckCircle2 } from 'lucide-react';
import { forgotPasswordSchema, ForgotPasswordFormValues } from '../../utils/authSchemas';
import { cn } from '../../utils/cn';

export default function ForgotPasswordPage() {
  const [isSent, setIsSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = async (data: ForgotPasswordFormValues) => {
    setLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setLoading(false);
    setIsSent(true);
  };

  if (isSent) {
    return (
      <div className="text-center space-y-6 py-4">
        <div className="flex justify-center">
          <div className="w-16 h-16 bg-primary-light/30 rounded-full flex items-center justify-center">
            <CheckCircle2 className="text-primary-dark w-8 h-8" />
          </div>
        </div>
        <div className="space-y-2">
          <h2 className="text-3xl editorial-heading text-ink">Link Sent.</h2>
          <p className="text-sm text-gray-500 font-medium">Check your inbox for password recovery instructions.</p>
        </div>
        <Link 
          to="/auth/login" 
          className="inline-block mt-4 text-sm font-bold text-primary-dark hover:underline uppercase tracking-widest"
        >
          Return to Sign In
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-4xl editorial-heading text-ink">Recovery.</h2>
        <p className="text-sm text-gray-400 mt-2 font-medium">Enter your email to reset password</p>
      </div>

      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1.5 ml-1">Email Address</label>
          <div className="relative">
            <input 
              {...register('email')}
              type="email" 
              className={cn(
                "block w-full bg-gray-50 border-none rounded-2xl px-4 py-4 text-sm text-ink placeholder-gray-300 focus:ring-2 focus:ring-primary-dark/10 focus:bg-white transition-all outline-none",
                errors.email && "ring-2 ring-red-100"
              )} 
              placeholder="name@studio.com" 
            />
          </div>
          {errors.email && <p className="mt-1 ml-1 text-[10px] text-red-500 font-bold uppercase tracking-wider">{errors.email.message}</p>}
        </div>

        <button 
          disabled={loading}
          type="submit" 
          className="w-full bg-primary-dark text-white py-4 rounded-2xl font-bold uppercase tracking-widest hover:bg-ink transition-all shadow-xl shadow-primary-dark/20 active:scale-[0.98] flex items-center justify-center space-x-2"
        >
          {loading ? <Loader2 className="animate-spin h-5 w-5" /> : <span>Send Reset Link</span>}
        </button>
      </form>

      <div className="text-center">
        <Link to="/auth/login" className="text-xs text-primary-dark font-bold hover:underline uppercase tracking-widest">
          Nevermind, I remembered
        </Link>
      </div>
    </div>
  );
}
