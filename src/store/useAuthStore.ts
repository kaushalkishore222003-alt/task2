import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User, Role } from '../types';

interface AuthState {
  user: User | null;
  token: string | null;
  role: Role | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (name: string, role: Role) => Promise<void>;
  signup: (userData: Partial<User>) => Promise<void>;
  logout: () => void;
  setUser: (user: User | null) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      role: null,
      isAuthenticated: false,
      loading: false,

      login: async (name, role) => {
        set({ loading: true });
        // Simulate minor processing delay
        await new Promise((resolve) => setTimeout(resolve, 500));
        
        const mockUser: User = {
          id: `${role.toLowerCase()}-${Math.random().toString(36).substr(2, 5)}`,
          name: name,
          email: `${name.toLowerCase().replace(/\s+/g, '.')}@studio.io`,
          role: role,
          joinedAt: new Date().toISOString(),
          avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=064e3b&color=fff`
        };

        set({
          user: mockUser,
          token: 'simplified-session-token',
          role: role,
          isAuthenticated: true,
          loading: false,
        });
      },

      signup: async (userData) => {
        set({ loading: true });
        await new Promise((resolve) => setTimeout(resolve, 1000));
        
        const mockUser: User = {
          id: Math.random().toString(36).substr(2, 9),
          name: userData.name || 'New User',
          email: userData.email || '',
          role: userData.role || 'MEMBER',
          joinedAt: new Date().toISOString(),
          avatar: `https://ui-avatars.com/api/?name=${userData.name}&background=064e3b&color=fff`
        };

        set({
          user: mockUser,
          token: 'mock-jwt-token',
          role: userData.role || 'MEMBER',
          isAuthenticated: true,
          loading: false,
        });
      },

      logout: () => {
        set({
          user: null,
          token: null,
          role: null,
          isAuthenticated: false,
        });
        localStorage.removeItem('auth-storage');
      },

      setUser: (user) => set({ user, isAuthenticated: !!user, role: user?.role || null }),
    }),
    {
      name: 'auth-storage',
    }
  )
);
