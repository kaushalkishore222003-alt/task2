export default function LoginPage() {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-4xl editorial-heading text-ink">Sign in.</h2>
        <p className="text-sm text-gray-400 mt-2 font-medium">Access your editorial workspace</p>
      </div>
      <form className="space-y-6">
        <div>
          <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1.5 ml-1">Email</label>
          <input 
            type="email" 
            className="block w-full bg-gray-50 border-none rounded-2xl px-4 py-4 text-sm text-ink placeholder-gray-300 focus:ring-2 focus:ring-primary-dark/10 focus:bg-white transition-all outline-none" 
            placeholder="name@studio.com" 
          />
        </div>
        <div>
          <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1.5 ml-1">Password</label>
          <input 
            type="password" 
            className="block w-full bg-gray-50 border-none rounded-2xl px-4 py-4 text-sm text-ink placeholder-gray-300 focus:ring-2 focus:ring-primary-dark/10 focus:bg-white transition-all outline-none" 
          />
        </div>
        <div className="flex items-center justify-between px-1">
           <label className="flex items-center group cursor-pointer">
              <input type="checkbox" className="w-4 h-4 rounded border-gray-200 text-primary-dark focus:ring-primary-dark/20" />
              <span className="ml-2 text-xs font-bold text-gray-400 group-hover:text-ink transition-colors">Keep me signed in</span>
           </label>
           <a href="#" className="text-xs font-bold text-primary-dark hover:underline">Forgot?</a>
        </div>
        <button type="submit" className="w-full bg-primary-dark text-white py-4 rounded-2xl font-bold uppercase tracking-widest hover:bg-ink transition-all shadow-xl shadow-primary-dark/20 active:scale-[0.98]">
          Authenticate
        </button>
      </form>
      <div className="text-center">
        <p className="text-xs text-gray-400 font-medium">
          New here? <a href="/auth/signup" className="text-primary-dark font-bold hover:underline">Apply for an account</a>
        </p>
      </div>
    </div>
  );
}
