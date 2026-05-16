import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from 'react-router-dom';
import { Mail, ArrowLeft, ArrowRight, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { forgotPasswordSchema, ForgotPasswordFormValues } from '../../utils/authSchemas';
import { cn } from '../../utils/cn';

export default function ForgotPasswordPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);
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
    setIsSubmitted(true);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-display font-bold text-text-primary tracking-tight">Recovery Protocol</h2>
        <p className="text-sm text-text-secondary opacity-60 font-medium">Lost access? Enter your email to begin the sync recovery.</p>
      </div>

      <AnimatePresence mode="wait">
        {!isSubmitted ? (
          <motion.form 
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onSubmit={handleSubmit(onSubmit)} 
            className="space-y-6"
          >
            <div className="space-y-2">
              <label className="text-[10px] font-black text-text-secondary uppercase tracking-[0.2em] ml-1 opacity-70">Registered Email</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-text-secondary group-focus-within:text-accent-primary transition-colors">
                  <Mail size={18} />
                </div>
                <input
                  {...register('email')}
                  type="email"
                  className={cn(
                    "input-premium pl-12 h-14 bg-bg-main/50 border-white/5",
                    errors.email && "border-red-500/50"
                  )}
                  placeholder="name@company.com"
                />
              </div>
              {errors.email && (
                <p className="text-[10px] text-red-500 font-bold ml-1">{errors.email.message}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full h-14 text-sm tracking-[0.2em] uppercase font-black group"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-bg-main border-t-transparent rounded-full animate-spin" />
              ) : (
                <span className="flex items-center gap-2">
                  Send Recovery Link <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </span>
              )}
            </button>
          </motion.form>
        ) : (
          <motion.div 
            key="success"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center space-y-6 py-4"
          >
            <div className="flex justify-center">
              <div className="w-16 h-16 bg-accent-primary/10 rounded-full flex items-center justify-center text-accent-primary shadow-glow ring-1 ring-accent-primary/30">
                <CheckCircle2 size={32} />
              </div>
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-text-primary">Transmission Successful</h3>
              <p className="text-sm text-text-secondary opacity-60 leading-relaxed max-w-[280px] mx-auto">
                Check your secure inbox for instructions to re-establish your workspace link.
              </p>
            </div>
            <button 
              onClick={() => setIsSubmitted(false)}
              className="text-[10px] font-black text-accent-primary uppercase tracking-[0.2em] hover:opacity-80 transition-opacity"
            >
              Retry Transmission
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="text-center">
        <Link to="/auth/login" className="inline-flex items-center gap-2 text-xs text-text-secondary hover:text-text-primary transition-colors font-medium">
          <ArrowLeft size={14} />
          Back to Secure Login
        </Link>
      </div>
    </motion.div>
  );
}
