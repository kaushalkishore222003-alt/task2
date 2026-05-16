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
    <div className={cn("min-h-screen flex selection:bg-primary-light transition-colors duration-500", isDark ? "bg-ink text-white" : "bg-white text-ink")}>
      {/* Sidebar for Desktop */}
      <div className={cn(
        "hidden md:flex md:w-72 md:flex-col md:fixed md:inset-y-0 border-r",
        isDark ? "bg-ink border-white/5" : "bg-white border-gray-100"
      )}>
        <div className="flex flex-col flex-grow pt-8 pb-4 overflow-y-auto">
          <div className="flex items-center justify-between px-8 mb-12">
            <Link to="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary-dark rounded-xl flex items-center justify-center shadow-lg shadow-primary-dark/20">
                 <div className="w-5 h-5 bg-white rounded-sm rotate-45" />
              </div>
              <span className={cn("text-2xl font-bold tracking-tighter", isDark ? "text-white" : "text-primary-dark font-black")}>Syncro.</span>
            </Link>
          </div>

          <nav className="flex-1 px-6 space-y-1">
            {filteredNav.map((item) => {
              const active = location.pathname === item.href || (item.href !== '/dashboard' && location.pathname.startsWith(item.href));
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={cn(
                    active 
                      ? (isDark ? 'bg-white/5 text-primary-light' : 'bg-primary-light text-primary-dark font-semibold')
                      : 'text-gray-400 hover:text-ink',
                    'group flex items-center px-4 py-3 text-sm rounded-2xl transition-all duration-300'
                  )}
                >
                  <item.icon className={cn(active ? 'text-primary-dark' : 'text-gray-300 group-hover:text-gray-500', 'mr-3 h-5 w-5 transition-colors')} />
                  {item.name}
                </Link>
              );
            })}
          </nav>
          
          <div className="mt-auto px-6 pt-4 space-y-6">
            {/* Theme Toggle */}
            <button 
              onClick={() => setIsDark(!isDark)}
              className={cn(
                "w-full flex items-center justify-between px-6 py-3 rounded-2xl border transition-all",
                isDark ? "bg-white/5 border-white/10 text-white" : "bg-gray-50 border-gray-100 text-gray-500"
              )}
            >
              <div className="flex items-center gap-3">
                 {isDark ? <Moon size={16} /> : <Sun size={16} />}
                 <span className="text-[10px] font-black uppercase tracking-widest">{isDark ? 'Dark Mode' : 'Light Mode'}</span>
              </div>
              <div className={cn("w-8 h-4 rounded-full relative transition-all", isDark ? "bg-primary-dark" : "bg-gray-200")}>
                 <div className={cn("absolute top-0.5 w-3 h-3 rounded-full bg-white transition-all", isDark ? "right-0.5" : "left-0.5")} />
              </div>
            </button>

            <div className={cn("p-4 rounded-2xl border mb-6", isDark ? "bg-white/5 border-white/10" : "bg-gray-50 border-gray-100")}>
              <div className="flex items-center space-x-3">
                <img 
                  src={user?.avatar || `https://i.pravatar.cc/100?u=${user?.email}`} 
                  className="h-10 w-10 rounded-full bg-gray-200 border-2 border-white shadow-sm" 
                  alt={user?.name}
                />
                <div className="flex-1 min-w-0">
                  <p className={cn("text-sm font-bold truncate", isDark ? "text-white" : "text-ink")}>{user?.name}</p>
                  <p className="text-[10px] text-gray-500 font-medium uppercase">{user?.role} Access</p>
                </div>
                <button onClick={handleLogout} className="text-gray-400 hover:text-red-500 transition-colors">
                   <LogOut size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="md:pl-72 flex flex-col flex-1">
        {/* Top Header */}
        <header className={cn(
          "h-24 px-10 border-b flex items-center justify-between sticky top-0 backdrop-blur-xl z-20 transition-colors",
          isDark ? "bg-ink/80 border-white/5" : "bg-white/80 border-gray-100"
        )}>
          <div className="flex items-center">
            <button
              type="button"
              className="mr-4 text-gray-400 md:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="h-6 w-6" />
            </button>
            <div className="flex flex-col">
               <h1 className={cn("text-3xl editorial-heading capitalize", isDark ? "text-white" : "text-ink")}>
                 {location.pathname.split('/').pop()?.replace('-', ' ') || 'Overview.'}
               </h1>
               <p className="text-[11px] text-gray-400 font-medium tracking-wide">
                 {new Date().toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
               </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-6">
            <div className="relative hidden lg:block">
              <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-gray-300" />
              </div>
              <input
                className={cn(
                  "block w-64 border-none rounded-full pl-10 pr-4 py-2.5 text-sm outline-none transition-all",
                  isDark ? "bg-white/5 text-white placeholder-white/20 focus:bg-white/10" : "bg-gray-50 text-ink placeholder-gray-400 focus:bg-white focus:ring-4 focus:ring-gray-100"
                )}
                placeholder="Synchronize search..."
                type="search"
              />
            </div>
            
            <button className="relative p-2.5 rounded-full hover:bg-gray-50 transition-colors text-gray-400 hover:text-ink">
              <Bell className="h-6 w-6" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-primary-dark border-2 border-white rounded-full"></span>
            </button>
          </div>
        </header>

        <main className="flex-1 p-10 pt-8 overflow-y-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
            >
              <Suspense fallback={
                <div className="flex items-center justify-center p-20">
                   <div className="w-12 h-12 border-4 border-gray-100 border-t-primary-dark rounded-full animate-spin" />
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
              className="fixed inset-0 bg-ink/80 backdrop-blur-sm z-40 md:hidden" 
              onClick={() => setSidebarOpen(false)}
            />
            <motion.div 
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className={cn("fixed inset-y-0 left-0 flex flex-col max-w-xs w-full shadow-2xl z-50 md:hidden", isDark ? "bg-ink" : "bg-white")}
            >
              <div className="absolute top-4 right-4 focus:outline-none">
                <button onClick={() => setSidebarOpen(false)} className="p-2 text-gray-400 hover:text-ink"><X size={24} /></button>
              </div>
              <div className="flex-1 h-0 pt-8 pb-4 overflow-y-auto">
                 <div className="px-8 mb-12">
                    <span className="text-2xl font-black tracking-tighter text-primary-dark">Syncro.</span>
                 </div>
                 <nav className="px-6 space-y-1">
                   {filteredNav.map((item) => (
                     <Link
                       key={item.name}
                       to={item.href}
                       onClick={() => setSidebarOpen(false)}
                       className={cn(
                         location.pathname === item.href
                           ? 'bg-primary-dark text-white'
                           : 'text-gray-600 hover:bg-gray-50',
                         'group flex items-center px-4 py-3 text-base font-medium rounded-2xl transition-all'
                       )}
                     >
                       <item.icon className="mr-4 h-6 w-6" />
                       {item.name}
                     </Link>
                   ))}
                   <div className="pt-8 space-y-1">
                      {secondaryItems.map(item => (
                        <Link
                          key={item.name}
                          to={item.href}
                          onClick={() => setSidebarOpen(false)}
                          className="flex items-center px-4 py-2 text-sm font-bold text-gray-400 hover:text-ink"
                        >
                          <item.icon className="mr-4 h-5 w-5 opacity-50" />
                          {item.name}
                        </Link>
                      ))}
                   </div>
                 </nav>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

