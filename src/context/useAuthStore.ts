import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User, Role } from '../types';

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (data: any) => Promise<void>;
  logout: () => void;
  updateProfile: (data: Partial<User>) => void;
}

// Mock users for development
const MOCK_USERS = [
  {
    id: '1',
    name: 'Admin User',
    email: 'admin@gmail.com',
    password: 'password123',
    role: 'ADMIN' as Role,
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
  },
  {
    id: '2',
    name: 'Team Member',
    email: 'member@gmail.com',
    password: 'password123',
    role: 'MEMBER' as Role,
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
  }
];

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      loading: false,

      login: async (email, password) => {
        set({ loading: true });
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));

        const user = MOCK_USERS.find(u => u.email === email && u.password === password);

        if (user) {
          const { password: _, ...userWithoutPassword } = user;
          set({
            user: userWithoutPassword as User,
            token: 'fake-jwt-token-' + Date.now(),
            isAuthenticated: true,
            loading: false,
          });
        } else {
          set({ loading: false });
          throw new Error('Invalid email or password');
        }
      },

      signup: async (data) => {
        set({ loading: true });
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1500));
        
        const newUser: User = {
          id: Math.random().toString(36).substr(2, 9),
          name: data.name,
          email: data.email,
          role: data.role,
          joinedAt: new Date().toISOString(),
        };

        set({
          user: newUser,
          token: 'fake-jwt-token-' + Date.now(),
          isAuthenticated: true,
          loading: false,
        });
      },

      logout: () => {
        set({
          user: null,
          token: null,
          isAuthenticated: false,
        });
        localStorage.removeItem('auth-storage');
      },

      updateProfile: (data) => {
        set((state) => ({
          user: state.user ? { ...state.user, ...data } : null
        }));
      }
    }),
    {
      name: 'auth-storage',
    }
  )
);
