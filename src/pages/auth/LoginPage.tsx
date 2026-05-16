import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  Shield, 
  User as UserIcon, 
  ArrowRight,
  Chrome,
  Github,
  AlertCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useAuthStore } from '../../store/useAuthStore';
import { Role } from '../../types';
import { loginSchema, LoginFormValues } from '../../utils/authSchemas';
import { cn } from '../../utils/cn';

export default function LoginPage() {
  const navigate = useNavigate();
  const { login, loading } = useAuthStore();
  const [showPassword, setShowPassword] = useState(false);
  const [selectedRole, setSelectedRole] = useState<Role>('ADMIN');
  const [error, setError] = useState<string | null>(null);

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
    }
  });

  const onSubmit = async (data: LoginFormValues) => {
    try {
      setError(null);
      // Using email as the "name" for the store's simplified login for now
      await login(data.email, selectedRole);
      navigate('/dashboard');
    } catch (err: any) {
      setError('Invalid credentials. Please verify your permissions.');
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="space-y-8"
    >
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-display font-bold text-text-primary tracking-tight">Sign In to SyncroTask</h2>
        <p className="text-sm text-text-secondary opacity-60 font-medium">Manage projects, tasks and team collaboration.</p>
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

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Email Field */}
        <div className="space-y-2">
          <label className="text-[10px] font-black text-text-secondary uppercase tracking-[0.2em] ml-1 opacity-70">Email Address</label>
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
        <div className="space-y-2">
          <div className="flex justify-between items-center px-1">
            <label className="text-[10px] font-black text-text-secondary uppercase tracking-[0.2em] opacity-70">Password</label>
            <Link to="/auth/forgot-password" title="Recover Password" className="text-[10px] font-black text-accent-primary uppercase tracking-widest hover:opacity-80 transition-opacity">Forgot?</Link>
          </div>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-text-secondary group-focus-within:text-accent-primary transition-colors">
              <Lock size={18} />
            </div>
            <input
              {...register('password')}
              type={showPassword ? 'text' : 'password'}
              className={cn(
                "input-premium pl-12 pr-12 h-14 bg-bg-main/50 border-white/5 hover:border-white/10 focus:border-accent-primary/40",
                errors.password && "border-red-500/50 focus:border-red-500"
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

        {/* Role Selector */}
        <div className="space-y-3">
          <label className="text-[10px] font-black text-text-secondary uppercase tracking-[0.2em] ml-1 opacity-70">Permissions Tier</label>
          <div className="grid grid-cols-2 gap-4">
            <button
              type="button"
              onClick={() => setSelectedRole('ADMIN')}
              className={cn(
                "flex flex-col items-center justify-center p-5 rounded-2xl border transition-all duration-300 relative overflow-hidden group",
                selectedRole === 'ADMIN' 
                  ? "bg-accent-primary/10 border-accent-primary/40 shadow-glow" 
                  : "bg-white/[0.02] border-white/5 hover:border-white/10"
              )}
            >
              <Shield className={cn(
                "mb-2 transition-all duration-300",
                selectedRole === 'ADMIN' ? "text-accent-primary scale-110" : "text-text-secondary opacity-40 group-hover:opacity-100"
              )} size={20} />
              <span className="text-[10px] font-black uppercase tracking-widest text-text-primary">Admin</span>
              <span className="text-[8px] font-medium text-text-secondary opacity-50 mt-1">Full Control</span>
            </button>

            <button
              type="button"
              onClick={() => setSelectedRole('MEMBER')}
              className={cn(
                "flex flex-col items-center justify-center p-5 rounded-2xl border transition-all duration-300 relative overflow-hidden group",
                selectedRole === 'MEMBER' 
                  ? "bg-accent-primary/10 border-accent-primary/40 shadow-glow" 
                  : "bg-white/[0.02] border-white/5 hover:border-white/10"
              )}
            >
              <UserIcon className={cn(
                "mb-2 transition-all duration-300",
                selectedRole === 'MEMBER' ? "text-accent-primary scale-110" : "text-text-secondary opacity-40 group-hover:opacity-100"
              )} size={20} />
              <span className="text-[10px] font-black uppercase tracking-widest text-text-primary">Member</span>
              <span className="text-[8px] font-medium text-text-secondary opacity-50 mt-1">Collaborator</span>
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="btn-primary w-full h-14 text-sm tracking-[0.2em] uppercase font-black group"
        >
          {loading ? (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
              className="w-5 h-5 border-2 border-bg-main border-t-transparent rounded-full"
            />
          ) : (
            <span className="flex items-center gap-2">
              Continue <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </span>
          )}
        </button>
      </form>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-white/5"></div>
        </div>
        <div className="relative flex justify-center text-[10px] uppercase tracking-[0.3em] font-black">
          <span className="bg-transparent px-4 text-text-secondary/40">Secure Identity Sync</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <button className="flex items-center justify-center gap-3 px-6 py-4 bg-white/[0.02] border border-white/5 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-white/[0.05] hover:border-white/10 transition-all group">
          <Chrome size={18} className="text-text-secondary group-hover:text-text-primary transition-colors" />
          Google
        </button>
        <button className="flex items-center justify-center gap-3 px-6 py-4 bg-white/[0.02] border border-white/5 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-white/[0.05] hover:border-white/10 transition-all group">
          <Github size={18} className="text-text-secondary group-hover:text-text-primary transition-colors" />
          GitHub
        </button>
      </div>

      <div className="text-center pt-4">
        <p className="text-xs text-text-secondary opacity-60">
          New to the ecosystem? {' '}
          <Link to="/auth/signup" className="text-accent-primary font-bold hover:underline">Request Access</Link>
        </p>
      </div>
    </motion.div>
  );
}
