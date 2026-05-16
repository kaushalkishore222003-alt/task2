import { Suspense, useState } from "react";
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { 
  LayoutDashboard, 
  Briefcase, 
  CheckSquare, 
  Trello, 
  BarChart2, 
  Bell, 
  Users, 
  User, 
  Settings, 
  ShieldCheck,
  Menu,
  X,
  LogOut,
  Search,
  FileText,
  Moon,
  Sun
} from "lucide-react";
import { cn } from "../utils/cn";
import { useAuthStore } from "../store/useAuthStore";

const navigationItems = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Projects', href: '/dashboard/projects', icon: Briefcase },
  { name: 'Tasks', href: '/dashboard/tasks', icon: CheckSquare },
  { name: 'Kanban', href: '/dashboard/kanban', icon: Trello },
  { name: 'Team', href: '/dashboard/team', icon: Users },
  { name: 'Reports', href: '/dashboard/reports', icon: FileText },
  { name: 'Analytics', href: '/dashboard/analytics', icon: BarChart2, adminOnly: true },
];

const secondaryItems = [
  { name: 'Notifications', href: '/dashboard/notifications', icon: Bell },
  { name: 'Profile', href: '/dashboard/profile', icon: User },
  { name: 'Settings', href: '/dashboard/settings', icon: Settings },
];

export default function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    navigate('/auth/login');
  };

  const filteredNav = navigationItems.filter(item => !item.adminOnly || user?.role === 'ADMIN');

  return (
    <div className="min-h-screen bg-bg-main flex selection:bg-accent-primary/30">
      {/* Sidebar for Desktop */}
      <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0 border-r border-white/[0.05] bg-bg-main">
        <div className="flex flex-col flex-grow pt-8 pb-4 overflow-y-auto scrollbar-hide">
          <div className="px-8 mb-10">
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="w-8 h-8 rounded-lg bg-accent-primary flex items-center justify-center shadow-lg shadow-accent-primary/20 group-hover:scale-110 transition-transform duration-300">
                 <div className="w-4 h-4 bg-bg-main rounded-sm rotate-45" />
              </div>
              <span className="text-xl font-display font-bold tracking-tighter text-text-primary">Syncro<span className="text-accent-primary">.</span></span>
            </Link>
          </div>

          <nav className="flex-1 px-4 space-y-1">
            <div className="px-4 mb-4">
              <p className="text-[10px] font-black text-text-secondary uppercase tracking-[0.2em] opacity-50">Main Workspace</p>
            </div>
            {filteredNav.map((item, i) => {
              const active = location.pathname === item.href || (item.href !== '/dashboard' && location.pathname.startsWith(item.href));
              return (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    to={item.href}
                    className={cn(
                      "group flex items-center px-4 py-2.5 text-sm font-medium rounded-xl transition-all duration-300 relative overflow-hidden",
                      active 
                        ? 'bg-accent-soft text-accent-primary' 
                        : 'text-text-secondary hover:text-text-primary hover:bg-white/[0.03]'
                    )}
                  >
                    {active && (
                      <motion.div 
                        layoutId="sidebar-active"
                        className="absolute left-0 w-1 h-1/2 bg-accent-primary rounded-r-full"
                      />
                    )}
                    <item.icon className={cn(
                      'mr-3 h-4 w-4 transition-all duration-300',
                      active ? 'text-accent-primary scale-110' : 'opacity-50 group-hover:opacity-100'
                    )} />
                    {item.name}
                  </Link>
                </motion.div>
              );
            })}

            <div className="px-4 mt-10 mb-4">
              <p className="text-[10px] font-black text-text-secondary uppercase tracking-[0.2em] opacity-50">Utilities</p>
            </div>
            {secondaryItems.map((item, i) => {
              const active = location.pathname === item.href;
              return (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: (filteredNav.length + i) * 0.05 }}
                >
                  <Link
                    to={item.href}
                    className={cn(
                      "group flex items-center px-4 py-2.5 text-sm font-medium rounded-xl transition-all duration-300",
                      active 
                        ? 'bg-white/[0.05] text-text-primary' 
                        : 'text-text-secondary hover:text-text-primary hover:bg-white/[0.03]'
                    )}
                  >
                    <item.icon className="mr-3 h-4 w-4 opacity-50 group-hover:opacity-100" />
                    {item.name}
                  </Link>
                </motion.div>
              );
            })}
          </nav>
          
          <div className="mt-auto px-4 space-y-4">
            <div className="p-4 rounded-2xl border border-white/[0.05] bg-white/[0.02] shadow-sm">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <img 
                    src={user?.avatar || `https://i.pravatar.cc/100?u=${user?.email}`} 
                    className="h-9 w-9 rounded-full bg-slate-800 border-2 border-white/[0.05]" 
                    alt={user?.name}
                  />
                  <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-accent-primary border-2 border-bg-main rounded-full" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-text-primary truncate">{user?.name}</p>
                  <p className="text-[9px] text-text-secondary font-black uppercase tracking-widest">{user?.role}</p>
                </div>
                <button onClick={handleLogout} className="text-text-secondary hover:text-red-400 transition-colors">
                   <LogOut size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="md:pl-64 flex flex-col flex-1">
        {/* Top Header */}
        <header className="h-20 px-8 border-b border-white/[0.05] flex items-center justify-between sticky top-0 bg-bg-main/80 backdrop-blur-xl z-20">
          <div className="flex items-center">
            <button
              type="button"
              className="mr-4 text-text-secondary md:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="h-6 w-6" />
            </button>
            <div className="flex flex-col">
               <h1 className="text-xl font-display font-bold text-text-primary capitalize tracking-tight">
                 {location.pathname.split('/').pop()?.replace('-', ' ') || 'Overview'}
               </h1>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="relative hidden lg:block group">
              <div className="absolute inset-y-0 left-3.5 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-text-secondary group-focus-within:text-accent-primary transition-colors" />
              </div>
              <input
                className="block w-64 bg-white/[0.03] border border-white/[0.08] rounded-xl pl-10 pr-4 py-2 text-sm text-text-primary placeholder-text-secondary focus:bg-white/[0.05] focus:border-accent-primary/30 transition-all outline-none"
                placeholder="Search..."
                type="search"
              />
            </div>
            
            <div className="flex items-center gap-1">
               <button className="p-2 rounded-lg text-text-secondary hover:text-text-primary hover:bg-white/[0.05] transition-all relative">
                 <Bell size={20} />
                 <span className="absolute top-2 right-2 w-2 h-2 bg-accent-primary rounded-full shadow-[0_0_10px_rgba(16,185,129,0.5)]"></span>
               </button>
               <button className="p-2 rounded-lg text-text-secondary hover:text-text-primary hover:bg-white/[0.05] transition-all">
                 <Settings size={20} />
               </button>
            </div>
          </div>
        </header>

        <main className="flex-1 p-8 overflow-y-auto scrollbar-hide">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              <Suspense fallback={
                <div className="flex items-center justify-center p-20">
                   <div className="w-10 h-10 border-2 border-white/10 border-t-accent-primary rounded-full animate-spin" />
                </div>
              }>
                <Outlet />
              </Suspense>
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-bg-main/80 backdrop-blur-md z-40 md:hidden" 
              onClick={() => setSidebarOpen(false)}
            />
            <motion.div 
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 left-0 flex flex-col max-w-xs w-full shadow-2xl z-50 md:hidden bg-bg-main border-r border-white/[0.05]"
            >
              <div className="p-6 flex items-center justify-between">
                <span className="text-xl font-display font-bold tracking-tighter text-text-primary">Syncro<span className="text-accent-primary">.</span></span>
                <button onClick={() => setSidebarOpen(false)} className="p-2 text-text-secondary hover:text-text-primary"><X size={20} /></button>
              </div>
              <div className="flex-1 h-0 pt-2 pb-4 overflow-y-auto">
                 <nav className="px-4 space-y-1">
                   {filteredNav.map((item) => (
                     <Link
                       key={item.name}
                       to={item.href}
                       onClick={() => setSidebarOpen(false)}
                       className={cn(
                         "group flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all",
                         location.pathname === item.href
                           ? 'bg-accent-soft text-accent-primary'
                           : 'text-text-secondary hover:bg-white/[0.03]'
                       )}
                     >
                       <item.icon className="mr-3 h-5 w-5" />
                       {item.name}
                     </Link>
                   ))}
                 </nav>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

