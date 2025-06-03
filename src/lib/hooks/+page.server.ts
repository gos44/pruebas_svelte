// src/hooks.server.ts
import type { Handle } from '@sveltejs/kit';


export const handle: Handle = async ({ event, resolve }) => {
    // Simulación de sesión
    const session = event.cookies.get('session');

    if (session) {
        event.locals.user = {
            id: '1', // <-- Agrega un id único aquí
            name: 'Juan Pérez',
            email: 'juan@example.com'
        };
    } else {
        event.locals.user =  null;
    }

    return resolve(event);
};
