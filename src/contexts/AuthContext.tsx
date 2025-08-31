import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'manager' | 'user';
  avatar?: string;
  managedTurfId?: string; // For turf managers
}

interface TurfManager {
  id: string;
  name: string;
  email: string;
  password: string;
  managedTurfId: string;
  turfName: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  logout: () => void;
  isLoading: boolean;
  createTurfManager: (managerData: Omit<TurfManager, 'id'>) => Promise<void>;
  getTurfManagers: () => TurfManager[];
  getTurfManagerByTurfId: (turfId: string) => TurfManager | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Demo users data
const demoUsers: User[] = [
  {
    id: '1',
    name: 'Admin User',
    email: 'admin@galli2ground.com',
    role: 'admin',
    avatar: '👑'
  },
  {
    id: '2',
    name: 'Turf Manager',
    email: 'manager@galli2ground.com',
    role: 'manager',
    avatar: '🏢',
    managedTurfId: '1'
  },
  {
    id: '3',
    name: 'Regular User',
    email: 'user@galli2ground.com',
    role: 'user',
    avatar: '👤'
  }
];

// Demo passwords mapping
const demoPasswords: { [key: string]: string } = {
  'admin@galli2ground.com': 'admin123',
  'manager@galli2ground.com': 'manager123',
  'user@galli2ground.com': 'user123'
};

// Turf managers storage
const TURF_MANAGERS_KEY = 'galli2ground_turf_managers';

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [turfManagers, setTurfManagers] = useState<TurfManager[]>([]);

  useEffect(() => {
    // Check for existing session on app load
    const savedUser = localStorage.getItem('galli2ground_user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error('Error parsing saved user:', error);
        localStorage.removeItem('galli2ground_user');
      }
    }

    // Load turf managers
    const savedManagers = localStorage.getItem(TURF_MANAGERS_KEY);
    if (savedManagers) {
      try {
        setTurfManagers(JSON.parse(savedManagers));
      } catch (error) {
        console.error('Error parsing saved managers:', error);
        localStorage.removeItem(TURF_MANAGERS_KEY);
      }
    }

    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<void> => {
    setIsLoading(true);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Check if it's a demo account
      if (demoPasswords[email] && demoPasswords[email] === password) {
        const demoUser = demoUsers.find(u => u.email === email);
        if (demoUser) {
          setUser(demoUser);
          localStorage.setItem('galli2ground_user', JSON.stringify(demoUser));
          return;
        }
      }

      // Check if it's a turf manager account
      const turfManager = turfManagers.find(m => m.email === email && m.password === password);
      if (turfManager) {
        const managerUser: User = {
          id: turfManager.id,
          name: turfManager.name,
          email: turfManager.email,
          role: 'manager',
          avatar: '🏢',
          managedTurfId: turfManager.managedTurfId
        };
        setUser(managerUser);
        localStorage.setItem('galli2ground_user', JSON.stringify(managerUser));
        return;
      }

      // For non-demo accounts, you would typically make an API call here
      // For now, we'll simulate a failed login for non-demo accounts
      throw new Error('Invalid credentials');
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const loginWithGoogle = async (): Promise<void> => {
    setIsLoading(true);
    
    try {
      // Simulate Google OAuth flow
      await new Promise(resolve => setTimeout(resolve, 1500));

      // For demo purposes, we'll create a mock Google user
      // In a real app, you would integrate with Google OAuth
      const googleUser: User = {
        id: 'google_' + Date.now(),
        name: 'Google User',
        email: 'googleuser@gmail.com',
        role: 'user',
        avatar: '🔍'
      };

      setUser(googleUser);
      localStorage.setItem('galli2ground_user', JSON.stringify(googleUser));
    } catch (error) {
      throw new Error('Google login failed');
    } finally {
      setIsLoading(false);
    }
  };

  const logout = (): void => {
    setUser(null);
    localStorage.removeItem('galli2ground_user');
  };

  const createTurfManager = async (managerData: Omit<TurfManager, 'id'>): Promise<void> => {
    const newManager: TurfManager = {
      ...managerData,
      id: 'manager_' + Date.now()
    };

    const updatedManagers = [...turfManagers, newManager];
    setTurfManagers(updatedManagers);
    localStorage.setItem(TURF_MANAGERS_KEY, JSON.stringify(updatedManagers));
  };

  const getTurfManagers = (): TurfManager[] => {
    return turfManagers;
  };

  const getTurfManagerByTurfId = (turfId: string): TurfManager | null => {
    return turfManagers.find(m => m.managedTurfId === turfId) || null;
  };

  const value: AuthContextType = {
    user,
    login,
    loginWithGoogle,
    logout,
    isLoading,
    createTurfManager,
    getTurfManagers,
    getTurfManagerByTurfId
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};