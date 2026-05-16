import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader2, Shield, User as UserIcon } from 'lucide-react';
import { useAuthStore } from '../../store/useAuthStore';
import { cn } from '../../utils/cn';

export default function LoginPage() {
  const [name, setName] = useState('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { login, loading } = useAuthStore();

  const handleLogin = async (role: 'ADMIN' | 'MEMBER') => {
    if (!name.trim()) {
      setError('Please provide your identity');
      return;
    }
    setError(null);
    try {
      await login(name, role);
      navigate('/dashboard');
    } catch (e) {
      setError('Access failed. Please try again.');
    }
  };

  return (
    <div className="space-y-12">
      <div className="text-center space-y-4">
        <h2 className="text-4xl font-display font-bold text-text-primary tracking-tight">Establish Identity<span className="text-accent-primary">.</span></h2>
        <p className="text-xs text-text-secondary font-medium max-w-xs mx-auto opacity-60">No password required. Specify your name and select your permissions tier.</p>
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500/20 text-red-500 px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest text-center">
          {error}
        </div>
      )}

      <div className="space-y-8">
        <div className="group">
          <label className="block text-[10px] font-black text-text-secondary uppercase tracking-[0.2em] mb-3 ml-2 opacity-50">Legal Name</label>
          <input 
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="input-premium py-5 text-center text-xl font-display"
            placeholder="Your Display Name"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button 
            disabled={loading}
            onClick={() => handleLogin('ADMIN')}
            className="flex flex-col items-center justify-center p-8 bg-white/[0.03] border border-white/5 text-text-primary rounded-3xl group hover:border-accent-primary/40 hover:bg-white/[0.05] transition-all duration-500 active:scale-[0.98]"
          >
            <Shield className="mb-4 text-accent-primary opacity-40 group-hover:opacity-100 transition-all duration-500 group-hover:scale-110 group-hover:shadow-accent" size={28} />
            <span className="text-[10px] font-black uppercase tracking-widest">Admin Node</span>
            <span className="text-[9px] font-medium opacity-40 mt-1">Full Portfolio Control</span>
          </button>

          <button 
            disabled={loading}
            onClick={() => handleLogin('MEMBER')}
            className="flex flex-col items-center justify-center p-8 bg-white/[0.02] border border-white/5 text-text-primary rounded-3xl group hover:border-text-secondary/20 transition-all active:scale-[0.98]"
          >
            <UserIcon className="mb-4 text-text-secondary opacity-40 group-hover:opacity-100 transition-all group-hover:scale-110" size={28} />
            <span className="text-[10px] font-black uppercase tracking-widest">Member Node</span>
            <span className="text-[9px] font-medium opacity-40 mt-1">Collaborator Access</span>
          </button>
        </div>

        {loading && (
          <div className="flex justify-center">
             <Loader2 className="animate-spin text-accent-primary" size={24} />
          </div>
        )}
      </div>

      <div className="text-center">
        <p className="text-[9px] text-text-secondary font-bold uppercase tracking-[0.3em] opacity-30">
           Protected by local encryption protocols
        </p>
      </div>
    </div>
  );
}
