import { useAuthStore } from "../../context/useAuthStore";
import { User, Mail, Shield, Calendar, Camera } from "lucide-react";
import { motion } from "motion/react";

export default function ProfilePage() {
  const { user } = useAuthStore();

  return (
    <div className="max-w-4xl mx-auto space-y-10">
      <header className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 pb-10 border-b border-gray-100">
        <div className="flex items-center gap-8">
          <div className="relative group">
            {user?.avatar ? (
              <img src={user.avatar} alt={user.name} className="w-32 h-32 rounded-[2.5rem] object-cover shadow-2xl shadow-primary-dark/20" />
            ) : (
              <div className="w-32 h-32 rounded-[2.5rem] bg-primary-dark flex items-center justify-center text-white text-4xl font-bold">
                {user?.name.charAt(0)}
              </div>
            )}
            <button className="absolute -bottom-2 -right-2 p-3 bg-white rounded-2xl shadow-xl border border-gray-100 text-primary-dark hover:scale-110 transition-transform">
              <Camera className="w-5 h-5" />
            </button>
          </div>
          <div>
            <h1 className="text-5xl editorial-heading text-ink mb-2">{user?.name}</h1>
            <p className="text-gray-400 font-medium uppercase tracking-[0.2em] text-xs">{user?.role} — SYNCRO STUDIO</p>
          </div>
        </div>
        <button className="px-8 py-4 bg-primary-dark text-white rounded-2xl font-bold uppercase tracking-widest text-xs hover:bg-ink transition-all shadow-xl shadow-primary-dark/10">
          Edit Profile
        </button>
      </header>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-8">
          <section className="card-base p-10">
            <h2 className="text-2xl editorial-heading text-ink mb-8">Base Information.</h2>
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center mr-4 border border-gray-100">
                  <User className="w-5 h-5 text-gray-400" />
                </div>
                <div>
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Full Identity</p>
                  <p className="text-ink font-bold">{user?.name}</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center mr-4 border border-gray-100">
                  <Mail className="w-5 h-5 text-gray-400" />
                </div>
                <div>
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Email Protocol</p>
                  <p className="text-ink font-bold">{user?.email}</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center mr-4 border border-gray-100">
                  <Shield className="w-5 h-5 text-gray-400" />
                </div>
                <div>
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Access Level</p>
                  <div className="flex items-center">
                    <span className="px-3 py-1 bg-primary-light text-primary-dark text-[10px] font-black rounded-full border border-primary-dark/10">
                      {user?.role}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center mr-4 border border-gray-100">
                  <Calendar className="w-5 h-5 text-gray-400" />
                </div>
                <div>
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Onboarding Date</p>
                  <p className="text-ink font-bold">{new Date(user?.joinedAt || Date.now()).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
                </div>
              </div>
            </div>
          </section>

          <section className="card-base p-10 bg-ink text-white">
            <h2 className="text-2xl editorial-heading mb-6">Security Context.</h2>
            <p className="text-gray-400 text-sm mb-8 leading-relaxed">
              Maintain the integrity of your workspace. Always rotate your password every 90 days and ensure 2FA is active.
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="px-6 py-3 bg-white text-ink rounded-xl font-bold text-[10px] uppercase tracking-widest hover:bg-gray-100 transition-all">
                Change Password
              </button>
              <button className="px-6 py-3 bg-white/10 text-white rounded-xl font-bold text-[10px] uppercase tracking-widest hover:bg-white/20 transition-all">
                Two-Factor Security
              </button>
            </div>
          </section>
        </div>

        <div className="space-y-8">
           <section className="card-base p-8 border-dashed border-gray-200">
             <h3 className="text-sm font-bold text-ink uppercase tracking-widest mb-4">Workspace Stats</h3>
             <div className="space-y-6">
                <div>
                  <div className="flex justify-between items-end mb-2">
                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Tasks Kiled</span>
                    <span className="text-xl editorial-heading text-primary-dark">142</span>
                  </div>
                  <div className="h-1.5 bg-gray-50 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: '65%' }}
                      className="h-full bg-primary-dark"
                    />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-end mb-2">
                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Efficiency index</span>
                    <span className="text-xl editorial-heading text-ink">9.4</span>
                  </div>
                  <div className="h-1.5 bg-gray-50 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: '94%' }}
                      className="h-full bg-accent"
                    />
                  </div>
                </div>
             </div>
           </section>

           <section className="p-8 border border-gray-100 rounded-[2rem] bg-gray-50/50">
              <h3 className="text-sm font-bold text-ink uppercase tracking-widest mb-4">Active Projects</h3>
              <div className="space-y-3">
                {['Brand Refresh', 'Editorial System', 'Market Expansion'].map((p) => (
                  <div key={p} className="flex items-center p-3 bg-white rounded-xl border border-gray-100">
                    <div className="w-2 h-2 bg-primary-dark rounded-full mr-3" />
                    <span className="text-xs font-bold text-gray-600">{p}</span>
                  </div>
                ))}
              </div>
           </section>
        </div>
      </div>
    </div>
  );
}
