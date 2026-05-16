import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useNavigate } from 'react-router-dom';
import { 
  User,
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  Shield, 
  User as UserIcon, 
  ArrowRight,
  AlertCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useAuthStore } from '../../store/useAuthStore';
import { Role } from '../../types';
import { signupSchema, SignupFormValues } from '../../utils/authSchemas';
import { cn } from '../../utils/cn';

export default function SignupPage() {
  const navigate = useNavigate();
  const { signup, loading } = useAuthStore();
  const [showPassword, setShowPassword] = useState(false);
  const [selectedRole, setSelectedRole] = useState<Role>('MEMBER');
  const [error, setError] = useState<string | null>(null);

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
      role: 'MEMBER'
    }
  });

  const onSubmit = async (data: SignupFormValues) => {
    try {
      setError(null);
      await signup({
        name: data.name,
        email: data.email,
        role: selectedRole
      });
      navigate('/dashboard');
    } catch (err: any) {
      setError('Registration failed. Please try again.');
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="space-y-8"
    >
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-display font-bold text-text-primary tracking-tight">Request Access</h2>
        <p className="text-sm text-text-secondary opacity-60 font-medium">Join 50,000+ teams building the future.</p>
      </div>

      <AnimatePresence>
        {error && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-red-500/10 border border-red-500/20 text-red-500 p-4 rounded-xl flex items-center gap-3 text-xs font-bold"
          >
            <AlertCircle size={16} />
            {error}
          </motion.div>
        )}
      </AnimatePresence>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Name Field */}
        <div className="space-y-2">
          <label className="text-[10px] font-black text-text-secondary uppercase tracking-[0.2em] ml-1 opacity-70">Legal Name</label>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-text-secondary group-focus-within:text-accent-primary transition-colors">
              <User size={18} />
            </div>
            <input
              {...register('name')}
              type="text"
              className={cn(
                "input-premium pl-12 h-14 bg-bg-main/50 border-white/5 hover:border-white/10 focus:border-accent-primary/40",
                errors.name && "border-red-500/50 focus:border-red-500"
              )}
              placeholder="Your Full Name"
            />
          </div>
          {errors.name && (
            <p className="text-[10px] text-red-500 font-bold ml-1">{errors.name.message}</p>
          )}
        </div>

        {/* Email Field */}
        <div className="space-y-2">
          <label className="text-[10px] font-black text-text-secondary uppercase tracking-[0.2em] ml-1 opacity-70">Work Email</label>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-text-secondary group-focus-within:text-accent-primary transition-colors">
              <Mail size={18} />
            </div>
            <input
              {...register('email')}
              type="email"
              className={cn(
                "input-premium pl-12 h-14 bg-bg-main/50 border-white/5 hover:border-white/10 focus:border-accent-primary/40",
                errors.email && "border-red-500/50 focus:border-red-500"
              )}
              placeholder="name@company.com"
            />
          </div>
          {errors.email && (
            <p className="text-[10px] text-red-500 font-bold ml-1">{errors.email.message}</p>
          )}
        </div>

        {/* Password Field */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-text-secondary uppercase tracking-[0.2em] ml-1 opacity-70">Password</label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-text-secondary group-focus-within:text-accent-primary transition-colors">
                <Lock size={16} />
              </div>
              <input
                {...register('password')}
                type={showPassword ? 'text' : 'password'}
                className={cn(
                  "input-premium pl-10 h-14 bg-bg-main/50 border-white/5 focus:border-accent-primary/40",
                  errors.password && "border-red-500/50"
                )}
                placeholder="••••••••"
              />
            </div>
            {errors.password && (
              <p className="text-[9px] text-red-500 font-bold ml-1 leading-tight">{errors.password.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black text-text-secondary uppercase tracking-[0.2em] ml-1 opacity-70">Confirm</label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-text-secondary group-focus-within:text-accent-primary transition-colors">
                <Lock size={16} />
              </div>
              <input
                {...register('confirmPassword')}
                type={showPassword ? 'text' : 'password'}
                className={cn(
                  "input-premium pl-10 h-14 bg-bg-main/50 border-white/5 focus:border-accent-primary/40",
                  errors.confirmPassword && "border-red-500/50"
                )}
                placeholder="••••••••"
              />
            </div>
            {errors.confirmPassword && (
              <p className="text-[9px] text-red-500 font-bold ml-1 leading-tight">{errors.confirmPassword.message}</p>
            )}
          </div>
        </div>

        {/* Role Selector */}
        <div className="space-y-3">
          <label className="text-[10px] font-black text-text-secondary uppercase tracking-[0.2em] ml-1 opacity-70">Operational Role</label>
          <div className="grid grid-cols-2 gap-4">
            <button
              type="button"
              onClick={() => setSelectedRole('ADMIN')}
              className={cn(
                "flex items-center gap-3 p-4 rounded-xl border transition-all duration-300",
                selectedRole === 'ADMIN' 
                  ? "bg-accent-primary/10 border-accent-primary/30 shadow-glow" 
                  : "bg-white/[0.02] border-white/5 hover:border-white/10"
              )}
            >
              <Shield className={cn(
                "transition-colors",
                selectedRole === 'ADMIN' ? "text-accent-primary" : "text-text-secondary opacity-40"
              )} size={18} />
              <span className="text-[10px] font-black uppercase tracking-widest text-text-primary">Admin</span>
            </button>

            <button
              type="button"
              onClick={() => setSelectedRole('MEMBER')}
              className={cn(
                "flex items-center gap-3 p-4 rounded-xl border transition-all duration-300",
                selectedRole === 'MEMBER' 
                  ? "bg-accent-primary/10 border-accent-primary/30 shadow-glow" 
                  : "bg-white/[0.02] border-white/5 hover:border-white/10"
              )}
            >
              <UserIcon className={cn(
                "transition-colors",
                selectedRole === 'MEMBER' ? "text-accent-primary" : "text-text-secondary opacity-40"
              )} size={18} />
              <span className="text-[10px] font-black uppercase tracking-widest text-text-primary">Member</span>
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="btn-primary w-full h-14 text-sm tracking-[0.2em] uppercase font-black group mt-4"
        >
          {loading ? (
             <div className="w-5 h-5 border-2 border-bg-main border-t-transparent rounded-full animate-spin" />
          ) : (
            <span className="flex items-center gap-2">
              Begin Onboarding <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </span>
          )}
        </button>
      </form>

      <div className="text-center pt-2">
        <p className="text-xs text-text-secondary opacity-60 font-medium">
          Already synced? {' '}
          <Link to="/auth/login" className="text-accent-primary font-bold hover:underline">Re-establish Connection</Link>
        </p>
      </div>
    </motion.div>
  );
}
