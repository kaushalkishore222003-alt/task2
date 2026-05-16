import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useNavigate } from 'react-router-dom';
import { Lock, Eye, EyeOff, ArrowRight, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { resetPasswordSchema, ResetPasswordFormValues } from '../../utils/authSchemas';
import { cn } from '../../utils/cn';

export default function ResetPasswordPage() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const onSubmit = async (data: ResetPasswordFormValues) => {
    setLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setLoading(false);
    setIsSuccess(true);
    setTimeout(() => navigate('/auth/login'), 2000);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-display font-bold text-text-primary tracking-tight">Access Reset</h2>
        <p className="text-sm text-text-secondary opacity-60 font-medium">Configure your new secure operational keys.</p>
      </div>

      <AnimatePresence mode="wait">
        {!isSuccess ? (
          <motion.form 
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onSubmit={handleSubmit(onSubmit)} 
            className="space-y-6"
          >
            <div className="space-y-2">
              <label className="text-[10px] font-black text-text-secondary uppercase tracking-[0.2em] ml-1 opacity-70">New Password</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-text-secondary group-focus-within:text-accent-primary transition-colors">
                  <Lock size={18} />
                </div>
                <input
                  {...register('password')}
                  type={showPassword ? 'text' : 'password'}
                  className={cn(
                    "input-premium pl-12 h-14 bg-bg-main/50 border-white/5",
                    errors.password && "border-red-500/50"
                  )}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-text-secondary hover:text-text-primary transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.password && (
                <p className="text-[10px] text-red-500 font-bold ml-1">{errors.password.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-text-secondary uppercase tracking-[0.2em] ml-1 opacity-70">Confirm New Password</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-text-secondary group-focus-within:text-accent-primary transition-colors">
                  <Lock size={18} />
                </div>
                <input
                  {...register('confirmPassword')}
                  type={showPassword ? 'text' : 'password'}
                  className={cn(
                    "input-premium pl-12 h-14 bg-bg-main/50 border-white/5",
                    errors.confirmPassword && "border-red-500/50"
                  )}
                  placeholder="••••••••"
                />
              </div>
              {errors.confirmPassword && (
                <p className="text-[10px] text-red-500 font-bold ml-1">{errors.confirmPassword.message}</p>
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
                  Update Keys <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </span>
              )}
            </button>
          </motion.form>
        ) : (
          <motion.div 
            key="success"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center space-y-6 py-6"
          >
            <div className="flex justify-center">
              <div className="w-16 h-16 bg-accent-primary/10 rounded-full flex items-center justify-center text-accent-primary shadow-glow ring-1 ring-accent-primary/30">
                <ShieldCheck size={32} />
              </div>
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-text-primary">Keys Updated</h3>
              <p className="text-sm text-text-secondary opacity-60 leading-relaxed max-w-[280px] mx-auto">
                Your credentials have been successfully rotated. Redirecting to login terminal...
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="text-center pt-2">
        <Link to="/auth/login" className="text-[10px] font-black text-text-secondary/40 hover:text-accent-primary uppercase tracking-[0.2em] transition-colors">
          Abort Recovery
        </Link>
      </div>
    </motion.div>
  );
}
