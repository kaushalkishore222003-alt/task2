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
  Search
} from "lucide-react";
import { cn } from "../utils/cn";
import { useAuthStore } from "../store/useAuthStore";

const baseNavigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Projects', href: '/dashboard/projects', icon: Briefcase },
];

const memberNavigation = [
  ...baseNavigation,
  { name: 'My Tasks', href: '/dashboard/tasks', icon: CheckSquare },
  { name: 'Kanban', href: '/dashboard/kanban', icon: Trello },
];

const adminNavigation = [
  ...baseNavigation,
  { name: 'All Tasks', href: '/dashboard/tasks', icon: CheckSquare },
  { name: 'Analytics', href: '/dashboard/analytics', icon: BarChart2 },
  { name: 'Team Management', href: '/dashboard/team', icon: Users },
  { name: 'Admin Panel', href: '/dashboard/admin', icon: ShieldCheck },
];

const sharedSecondary = [
  { name: 'Notifications', href: '/dashboard/notifications', icon: Bell },
  { name: 'Profile', href: '/dashboard/profile', icon: User },
  { name: 'Settings', href: '/dashboard/settings', icon: Settings },
];

export default function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    navigate('/auth/login');
  };

  const navigation = user?.role === 'ADMIN' ? adminNavigation : memberNavigation;

  return (
    <div className="min-h-screen bg-white flex selection:bg-primary-light">
      {/* Sidebar for Desktop */}
      <div className="hidden md:flex md:w-72 md:flex-col md:fixed md:inset-y-0 bg-white border-r border-gray-100">
        <div className="flex flex-col flex-grow pt-8 pb-4 overflow-y-auto">
          <div className="flex items-center space-x-3 px-8 mb-12">
            <Link to="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary-dark rounded-xl flex items-center justify-center shadow-lg shadow-primary-dark/20">
                 <div className="w-5 h-5 bg-white rounded-sm rotate-45" />
              </div>
              <span className="text-2xl font-bold text-primary-dark tracking-tighter">Syncro.</span>
            </Link>
          </div>

          <nav className="flex-1 px-6 space-y-1">
            {navigation.map((item) => {
              const active = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={cn(
                    active 
                      ? 'bg-primary-light text-primary-dark font-semibold' 
                      : 'text-gray-400 hover:bg-gray-50 hover:text-ink',
                    'group flex items-center px-4 py-3 text-sm rounded-2xl transition-all duration-300'
                  )}
                >
                  <item.icon className={cn(active ? 'text-primary-dark' : 'text-gray-300 group-hover:text-gray-500', 'mr-3 h-5 w-5 transition-colors')} />
                  {item.name}
                </Link>
              );
            })}
          </nav>
          
          <div className="mt-auto px-6 pt-4 space-y-4">
            <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100 mb-6">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">Your Account</p>
              <div className="flex items-center space-x-3">
                <img 
                  src={user?.avatar} 
                  className="h-10 w-10 rounded-full bg-gradient-to-tr from-primary-dark to-accent overflow-hidden" 
                  alt={user?.name}
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-ink truncate">{user?.name}</p>
                  <p className="text-[10px] text-gray-500 font-medium uppercase">{user?.role} Plan</p>
                </div>
              </div>
            </div>

            <div className="space-y-1 pb-4">
              {sharedSecondary.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={cn(
                    location.pathname === item.href
                      ? 'text-primary-dark font-bold'
                      : 'text-gray-400 hover:text-ink',
                    'group flex items-center px-4 py-2 text-xs font-medium rounded-lg transition-all duration-200'
                  )}
                >
                  <item.icon className="mr-3 h-4 w-4 opacity-50 group-hover:opacity-100 transition-opacity" />
                  {item.name}
                </Link>
              ))}
              <button 
                onClick={handleLogout}
                className="w-full text-left text-red-400 hover:text-red-600 group flex items-center px-4 py-2 text-xs font-medium rounded-lg transition-all duration-200"
              >
                <LogOut className="mr-3 h-4 w-4 opacity-50 group-hover:opacity-100 transition-opacity" />
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="md:pl-72 flex flex-col flex-1">
        {/* Top Header */}
        <header className="h-24 px-10 border-b border-gray-100 flex items-center justify-between sticky top-0 bg-white/80 backdrop-blur-xl z-20">
          <div className="flex items-center">
            <button
              type="button"
              className="mr-4 text-gray-400 md:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="h-6 w-6" />
            </button>
            <div className="flex flex-col">
               <h1 className="text-3xl editorial-heading text-ink capitalize">
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
                className="block w-64 bg-gray-50 border-none rounded-full pl-10 pr-4 py-2.5 text-sm text-ink placeholder-gray-400 focus:ring-2 focus:ring-primary-dark/10 focus:bg-white transition-all outline-none"
                placeholder="Search resources..."
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
              <Suspense fallback={<div className="flex items-center justify-center p-20">Loading view...</div>}>
                <Outlet />
              </Suspense>
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 flex z-40 md:hidden">
          <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setSidebarOpen(false)}></div>
          <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white transition-all transform ease-in-out duration-300">
            <div className="absolute top-0 right-0 -mr-12 pt-2">
              <button
                className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                onClick={() => setSidebarOpen(false)}
              >
                <X className="h-6 w-6 text-white" />
              </button>
            </div>
            {/* Same navigation content as desktop... */}
            <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
               <div className="flex-shrink-0 flex items-center px-4">
                 <h1 className="text-2xl font-bold text-primary-dark font-display">SyncroTask</h1>
               </div>
               <nav className="mt-5 px-2 space-y-1">
                 {navigation.map((item) => (
                   <Link
                     key={item.name}
                     to={item.href}
                     onClick={() => setSidebarOpen(false)}
                     className={cn(
                       location.pathname === item.href
                         ? 'bg-primary-dark text-white'
                         : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                       'group flex items-center px-2 py-2 text-base font-medium rounded-md'
                     )}
                   >
                     <item.icon className="mr-4 h-6 w-6" />
                     {item.name}
                   </Link>
                 ))}
               </nav>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
