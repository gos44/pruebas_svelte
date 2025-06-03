import type { Actions, PageServerLoad } from './$types';
import { redirect, fail } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ cookies }) => {
const token = cookies.get('token');
if (token) throw redirect(302, '/dashboard');
};

export const actions: Actions = {
default: async ({ request, cookies }) => {
    const data = await request.formData();
    const username = data.get('username');
    const password = data.get('password');
    if (username === 'admin' && password === 'admin') {
			cookies.set('token', 'admin-token', {
				path: '/',
				httpOnly: true,
				sameSite: 'strict',
				secure: false,
				maxAge: 60 * 60 * 24
			});
			cookies.set('username', username.toString(), {
				path: '/',
				httpOnly: false, // Queremos que sea accesible desde el navegador
				sameSite: 'strict',
				secure: false,
				maxAge: 60 * 60 * 24
			});
			throw redirect(302, '/dashboard');
		}
    return fail(400, { error: 'Usuario o contraseña inválidos' });
}
};
