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
    const password = data.gimport { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import bcrypt from 'bcryptjs';
import { db } from '$lib/server/database';

export const load: PageServerLoad = async ({ locals }) => {
    if (locals.user) {
        throw redirect(302, '/dashboard');
    }
    return {};
};

export const actions: Actions = {
    default: async ({ request, cookies, locals }) => {
        const data = await request.formData();
        const username = data.get('username')?.toString().trim();
        const password = data.get('password')?.toString();

        if (!username || !password) {
            return fail(400, { error: 'Usuario y contraseña son requeridos' });
        }

        try {
            const user = await db.user.findUnique({
                where: { username }
            });

            if (!user) {
                return fail(400, { error: 'Credenciales inválidas' });
            }

            const passwordValid = await bcrypt.compare(password, user.passwordHash);
            if (!passwordValid) {
                return fail(400, { error: 'Credenciales inválidas' });
            }

            // Autenticación exitosa
            const authenticatedUser = {
                id: user.id,
                username: user.username
            };

            const session = await db.session.create({
                data: {
                    userId: user.id,
                    expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7) // 1 semana
                }
            });

            cookies.set('session_id', session.id, {
                path: '/',
                httpOnly: true,
                sameSite: 'strict',
                secure: process.env.NODE_ENV === 'production',
                maxAge: 60 * 60 * 24 * 7 // 1 semana
            });

            throw redirect(303, '/dashboard');
        } catch (error) {
            console.error('Login error:', error);
            return fail(500, { error: 'Error en el servidor. Inténtalo de nuevo más tarde.' });
        }
    }
};et('password');
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
