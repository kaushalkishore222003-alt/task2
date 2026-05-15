import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";

export default function AuthLayout() {
  return (
    <div className="min-h-screen bg-white flex flex-col justify-center py-12 sm:px-6 lg:px-8 selection:bg-primary-light">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <div className="flex items-center justify-center space-x-2 mb-8">
          <div className="w-8 h-8 bg-primary-dark rounded-lg flex items-center justify-center">
            <div className="w-4 h-4 bg-white rounded-sm rotate-45" />
          </div>
          <span className="text-2xl font-bold text-primary-dark tracking-tighter">Syncro.</span>
        </div>
        <p className="text-sm font-bold text-gray-400 uppercase tracking-[0.2em]">The Standard of Work</p>
      </div>

      <div className="mt-12 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="card-base py-12 px-10">
          <AnimatePresence mode="wait">
             <Outlet />
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
