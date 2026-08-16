import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Role, User } from '../types';

interface AuthContextType {
  user: User | null;
  role: Role | null;
  isAuthenticated: boolean;
  login: (email: string, role: Role, name?: string) => void;
  logout: () => void;
  switchRole: (role: Role) => void;
}

const DEFAULT_USERS: Record<Role, User> = {
  admin: {
    id: 'usr-admin-01',
    name: 'Dr. Arthur Pendelton',
    email: 'admin@college.com',
    role: 'admin',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
    phone: '+1 (555) 000-1122'
  },
  faculty: {
    id: 'usr-fac-01',
    name: 'Dr. Rajesh Sharma',
    email: 'faculty@college.com',
    role: 'faculty',
    department: 'Artificial Intelligence & Machine Learning',
    facultyId: 'FAC202101',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    phone: '+1 (555) 234-5678'
  },
  student: {
    id: 'usr-std-01',
    name: 'Aarav Patel',
    email: 'student@college.com',
    role: 'student',
    department: 'Computer Science & Engineering',
    studentId: 'STU2023001',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80',
    phone: '+1 (555) 101-2001'
  }
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    try {
      const saved = localStorage.getItem('cms_auth_user');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('cms_auth_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('cms_auth_user');
    }
  }, [user]);

  const login = (email: string, role: Role, customName?: string) => {
    const baseUser = DEFAULT_USERS[role];
    const newUser: User = {
      ...baseUser,
      email: email || baseUser.email,
      name: customName || baseUser.name,
      role
    };
    setUser(newUser);
  };

  const logout = () => {
    setUser(null);
  };

  const switchRole = (newRole: Role) => {
    setUser(DEFAULT_USERS[newRole]);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        role: user?.role || null,
        isAuthenticated: !!user,
        login,
        logout,
        switchRole
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
