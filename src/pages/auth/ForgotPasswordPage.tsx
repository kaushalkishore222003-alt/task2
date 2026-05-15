import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';
import { Loader2, ArrowLeft } from 'lucide-react';
import { useState } from 'react';

const schema = z.object({
  email: z.string().email('Invalid email address'),
});

type FormValues = z.infer<typeof schema>;

export default function ForgotPasswordPage() {
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  
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
    setSent(true);
    toast.success('Reset link sent to ' + data.email);
  };

  if (sent) {
    return (
      <div className="text-center space-y-6">
        <div className="w-16 h-16 bg-primary-light rounded-full flex items-center justify-center mx-auto">
          <Loader2 className="text-primary-dark w-8 h-8" />
        </div>
        <h2 className="text-3xl editorial-heading text-ink">Check your mail.</h2>
        <p className="text-sm text-gray-400 font-medium leading-relaxed">
          We've sent a password reset link to your email address. 
          Please follow the instructions to reset your password.
        </p>
        <Link to="/auth/login" className="inline-flex items-center text-primary-dark font-bold text-sm uppercase tracking-widest hover:underline">
          <ArrowLeft className="mr-2 w-4 h-4" /> Back to Sign In
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-4xl editorial-heading text-ink">Reset.</h2>
        <p className="text-sm text-gray-400 mt-2 font-medium">Enter your email to receive a recovery link</p>
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
        <button 
          disabled={loading}
          type="submit" 
          className="w-full bg-primary-dark text-white py-4 rounded-2xl font-bold uppercase tracking-widest hover:bg-ink transition-all shadow-xl shadow-primary-dark/20 active:scale-[0.98] flex items-center justify-center disabled:opacity-70"
        >
          {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Send Reset Link'}
        </button>
      </form>
      <div className="text-center">
        <Link to="/auth/login" className="inline-flex items-center text-xs text-gray-400 font-bold hover:text-ink transition-colors uppercase tracking-widest">
          <ArrowLeft className="mr-2 w-4 h-4" /> Return to Login
        </Link>
      </div>
    </div>
  );
}
