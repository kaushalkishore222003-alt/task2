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
        <h2 className="text-5xl editorial-heading text-ink">Enter Workspace.</h2>
        <p className="text-sm text-gray-400 font-medium max-w-sm mx-auto">No password required. Specify your identity and select your permissions tier.</p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-100 text-red-600 px-6 py-4 rounded-3xl text-xs font-bold text-center">
          {error}
        </div>
      )}

      <div className="space-y-8">
        <div className="group">
          <label className="block text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-3 ml-2">Display Name</label>
          <input 
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="block w-full bg-gray-50 border-none rounded-[2rem] px-8 py-6 text-lg font-medium text-ink placeholder-gray-300 focus:ring-4 focus:ring-primary-dark/5 focus:bg-white transition-all outline-none text-center"
            placeholder="Your Full Name"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button 
            disabled={loading}
            onClick={() => handleLogin('ADMIN')}
            className="flex flex-col items-center justify-center p-8 bg-ink text-white rounded-[2.5rem] group hover:bg-primary-dark transition-all shadow-2xl shadow-ink/20 active:scale-[0.98]"
          >
            <Shield className="mb-4 opacity-40 group-hover:opacity-100 transition-all group-hover:scale-110" size={32} />
            <span className="text-[11px] font-black uppercase tracking-widest">Login as Admin</span>
            <span className="text-[9px] font-medium opacity-40 mt-1">Full Management Control</span>
          </button>

          <button 
            disabled={loading}
            onClick={() => handleLogin('MEMBER')}
            className="flex flex-col items-center justify-center p-8 bg-white border-2 border-gray-100 text-ink rounded-[2.5rem] group hover:border-primary-dark transition-all active:scale-[0.98]"
          >
            <UserIcon className="mb-4 text-gray-300 group-hover:text-primary-dark transition-all group-hover:scale-110" size={32} />
            <span className="text-[11px] font-black uppercase tracking-widest">Login as Member</span>
            <span className="text-[9px] font-medium text-gray-400 mt-1">Collaborator Access</span>
          </button>
        </div>

        {loading && (
          <div className="flex justify-center">
             <Loader2 className="animate-spin text-primary-dark" size={32} />
          </div>
        )}
      </div>

      <div className="text-center">
        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">
           Protected by local persistence
        </p>
      </div>
    </div>
  );
}
