// Protege el acceso al dashboard
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ cookies }) => {
	const token = cookies.get('token');

	if (!token) {
		throw redirect(302, '/login');
	}

	// Simulación de usuario basado en token (solo ejemplo)
	const user = token === 'admin-token' ? 'admin' : 'usuario';

	return {
		user
	};
};
