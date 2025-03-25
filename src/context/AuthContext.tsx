import { createContext, useContext, useEffect, useState } from 'react';
import supabase from '../utils/supabase-client';
import { User } from '@supabase/supabase-js';

interface AuthContextType {
	// Se actualiza el tipo de usuario
	user: User | null;
	loading: boolean;
	// Nuevas funciones de autenticación
	login: (email: string, password: string) => Promise<void>;
	logout: () => Promise<void>;
	register: (email: string, password: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
	user: null,
	loading: true,
	login: async () => {},
	logout: async () => {},
	register: async () => {}
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
	const [user, setUser] = useState<User | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		supabase.auth.getSession().then(({ data: { session } }) => {
			setUser(session?.user ?? null);
			setLoading(false);
		});

		const { data: subscription } = supabase.auth.onAuthStateChange(
			(_event, session) => {
				setUser(session?.user ?? null);
			}
		);

		return () => {
			subscription?.subscription.unsubscribe();
		};
	}, []);

	// Implementación de login
	const login = async (email: string, password: string) => {
		const { error } = await supabase.auth.signInWithPassword({ email, password });
		if (error) throw error;
	};

	// Implementación de logout
	const logout = async () => {
		const { error } = await supabase.auth.signOut();
		if (error) throw error;
	};

	// Implementación de register
	const register = async (email: string, password: string) => {
		const { error } = await supabase.auth.signUp({ email, password });
		if (error) throw error;
	};

	return (
		<AuthContext.Provider value={{ user, loading, login, logout, register }}>
			{children}
		</AuthContext.Provider>
	);
}

export function useAuth() {
	return useContext(AuthContext);
}
