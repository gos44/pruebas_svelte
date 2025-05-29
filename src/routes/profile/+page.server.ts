// src/routes/profile/+page.server.ts
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

// El tipo Locals debe extenderse en src/app.d.ts, no aquí.

export const load: PageServerLoad = async ({ locals }) => {
	// Supongamos que en `locals.user` tienes los datos del usuario logueado
	const user = locals.user;
	if (!user) {
		// Redirige al login si no está autenticado
		throw redirect(302, '/login');
	}
	// Aquí puedes consultar la base de datos si quieres más información
	// const userDetails = await getUserDetails(user.id);
	return {
		user: {
			name: user.name,
			email: user.email
		}
	};
};
