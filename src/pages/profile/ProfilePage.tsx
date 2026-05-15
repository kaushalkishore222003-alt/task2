import { useAuthStore } from "../../store/useAuthStore";
import { User, Mail, Calendar, Shield, BadgeCheck } from "lucide-react";

export default function ProfilePage() {
  const { user } = useAuthStore();

  if (!user) return null;

  return (
    <div className="max-w-4xl mx-auto space-y-10">
      <div className="header space-y-2">
        <h1 className="text-4xl editorial-heading text-ink">Account Profile.</h1>
        <p className="text-sm text-gray-400 font-medium tracking-wide">Manage your professional identity and workspace preferences.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        <div className="md:col-span-1 space-y-6">
          <div className="card-base p-8 text-center space-y-6">
            <div className="relative inline-block">
              <img 
                src={user.avatar} 
                alt={user.name} 
                className="w-32 h-32 rounded-full border-4 border-primary-light shadow-xl mx-auto"
              />
              <div className="absolute bottom-0 right-0 w-8 h-8 bg-primary-dark rounded-full flex items-center justify-center border-4 border-white">
                <Shield className="text-white w-4 h-4" />
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold text-ink">{user.name}</h3>
              <p className="text-[10px] font-black uppercase text-primary-dark tracking-[0.2em] mt-1">{user.role}</p>
            </div>
          </div>

          <div className="card-base p-6 space-y-4">
             <h4 className="text-[10px] font-black uppercase text-gray-400 tracking-widest border-b border-gray-50 pb-2">Status</h4>
             <div className="flex items-center space-x-3 text-emerald-600">
                <BadgeCheck size={18} />
                <span className="text-xs font-bold uppercase tracking-wider">Verified Professional</span>
             </div>
          </div>
        </div>

        <div className="md:col-span-2 space-y-8">
           <div className="card-base p-10 space-y-10">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div className="space-y-1.5">
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Full Legal Name</p>
                  <div className="flex items-center space-x-2 text-ink font-bold">
                    <User size={16} className="text-gray-300" />
                    <span>{user.name}</span>
                  </div>
                </div>
                <div className="space-y-1.5">
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Authored Email</p>
                  <div className="flex items-center space-x-2 text-ink font-bold">
                    <Mail size={16} className="text-gray-300" />
                    <span>{user.email}</span>
                  </div>
                </div>
                <div className="space-y-1.5">
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Member Since</p>
                  <div className="flex items-center space-x-2 text-ink font-bold">
                    <Calendar size={16} className="text-gray-300" />
                    <span>{new Date(user.joinedAt).toLocaleDateString()}</span>
                  </div>
                </div>
                <div className="space-y-1.5">
                   <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Workspace ID</p>
                   <div className="flex items-center space-x-2 text-ink font-mono text-xs font-bold">
                      <span className="bg-gray-50 px-2 py-1 rounded tracking-tighter">ST-{user.id.toUpperCase()}</span>
                   </div>
                </div>
              </div>

              <div className="pt-6 border-t border-gray-100 flex justify-end space-x-4">
                <button className="px-6 py-3 border border-gray-100 rounded-xl text-xs font-bold uppercase tracking-widest hover:border-ink transition-all">Export Data</button>
                <button className="px-6 py-3 bg-primary-dark text-white rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-ink shadow-lg shadow-primary-dark/10 transition-all">Update Identity</button>
              </div>
           </div>

           <div className="bg-primary-light/30 p-8 rounded-[2rem] border border-primary-light/50 flex items-center justify-between">
              <div className="space-y-1">
                <h4 className="font-bold text-primary-dark">Editorial Security</h4>
                <p className="text-xs text-primary-dark/60 font-medium">Two-factor authentication is active on your workspace.</p>
              </div>
              <button className="px-5 py-2.5 bg-white text-primary-dark rounded-full text-[10px] font-black uppercase tracking-widest shadow-sm">Manage</button>
           </div>
        </div>
      </div>
    </div>
  );
}
