'use client';
import React, { createContext, useContext } from 'react';
import { SafeUser } from '../types';

type UserContextType = {
    currentUser: SafeUser | null;
};

type UserContextProviderProps = {
    currentUser?: SafeUser | null;
    children: React.ReactNode;
};

export const UserContext = createContext<UserContextType>({
    currentUser: null,
});

export default function UserContextProvider({ 
    currentUser = null, 
    children, 
}: UserContextProviderProps) {
    return (
      <UserContext.Provider value={{ currentUser }}>
        {children}
      </UserContext.Provider>
    );
};

export function useUserContext() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUserContext must be used within a UserContextProvider');
  }
  return context;
};

