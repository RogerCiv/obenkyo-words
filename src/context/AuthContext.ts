import { createContext } from 'react';
import { User } from '@supabase/supabase-js';

export interface AuthContextType {
	user: User | null;
	loading: boolean;
	login: (email: string, password: string) => Promise<void>;
	logout: () => Promise<void>;
	register: (email: string, password: string) => Promise<void>;
	updatePassword: (oldPassword: string, newPassword: string) => Promise<void>;
	updateDisplayName: (displayName: string) => Promise<void>;
}

export const AuthContext = createContext<AuthContextType>({
	user: null,
	loading: true,
	login: async () => {},
	logout: async () => {},
	register: async () => {},
	updatePassword: async () => {},
	updateDisplayName: async () => {},
});
