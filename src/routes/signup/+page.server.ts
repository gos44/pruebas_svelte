import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

// Simulamos una "base de datos" temporal en memoria
const usuarios: Record<string, string> = {};

export const actions: Actions = {
	default: async ({ request, cookies }) => {
		const data = await request.formData();
		const username = data.get('username')?.toString();
		const password = data.get('password')?.toString();

		if (!username || !password) {
			return fail(400, { error: 'Faltan datos' });
		}

		if (usuarios[username]) {
			return fail(400, { error: 'Usuario ya existe' });
		}

		// Guardamos el usuario (solo para pruebas)
		usuarios[username] = password;

		// Simulamos un token
		cookies.set('token', 'fake-token', { path: '/', httpOnly: true });
		cookies.set('username', username, { path: '/' });

		throw redirect(302, '/dashboard');
	}
};
