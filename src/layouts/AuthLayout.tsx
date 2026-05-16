import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";

export default function AuthLayout() {
  return (
    <div className="min-h-screen bg-white flex flex-col justify-center py-12 sm:px-6 lg:px-8 selection:bg-primary-light relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#064E3B 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-transparent via-white to-white pointer-events-none" />

      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center relative z-10">
        <div className="flex items-center justify-center space-x-2 mb-8">
          <div className="w-10 h-10 bg-primary-dark rounded-xl flex items-center justify-center shadow-xl shadow-primary-dark/20">
            <div className="w-5 h-5 bg-white rounded-sm rotate-45" />
          </div>
          <span className="text-3xl font-bold text-primary-dark tracking-tighter italic">Syncro.</span>
        </div>
        <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.4em] mb-4">Architecture for Productivity</p>
      </div>

      <div className="mt-12 sm:mx-auto sm:w-full sm:max-w-md relative z-10 px-4 sm:px-0">
        <div className="card-base py-12 px-8 sm:px-12 rounded-[2.5rem] bg-white/80 backdrop-blur-xl border-white shadow-2xl shadow-primary-dark/5">
          <AnimatePresence mode="wait">
             <Outlet />
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
