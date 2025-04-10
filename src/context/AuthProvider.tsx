import { useEffect, useState } from 'react';
import supabase from '../utils/supabase-client';

import { User } from '@supabase/supabase-js';
import { AuthContext } from './AuthContext';

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

	const login = async (email: string, password: string) => {
		const { error } = await supabase.auth.signInWithPassword({ email, password });
		if (error) throw error;
	};

	const logout = async () => {
		const { error } = await supabase.auth.signOut();
		if (error) throw error;
	};

	const register = async (email: string, password: string) => {
		const { error } = await supabase.auth.signUp({ email, password });
		if (error) throw error;
	};

	const updatePassword = async (oldPassword: string, newPassword: string) => {
		// Re-autenticar con la contraseña actual
		const { error: signInError } = await supabase.auth.signInWithPassword({ email: user?.email ?? '', password: oldPassword });
		if (signInError) throw signInError;
		// Actualizar la contraseña
		const { error: updateError } = await supabase.auth.updateUser({ password: newPassword });
		if (updateError) throw updateError;
	};

	const updateDisplayName = async (displayName: string) => {
		const { error } = await supabase.auth.updateUser({ data: { display_name: displayName } });
		if (error) throw error;	
	}

	const data = {
		user,
		loading,
		login,
		logout,
		register,
		updatePassword,
		updateDisplayName,

	};

	return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>;
}
