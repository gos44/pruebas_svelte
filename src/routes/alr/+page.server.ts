import * as db from '$lib/server/database.js';

export function load({ cookies: cookies }: { cookies: any }) {} {
	let id = cookies.get('userid');

	if (!id) {
		id = crypto.randomUUID();
		cookies.set('userid', id, { path: '/' });
	}

	return {
		todos: db.getTodos(id)
	};
}

import type { RequestEvent } from '@sveltejs/kit';

export const actions = {
  default: async ({ cookies, request }: RequestEvent) => {
    let id = cookies.get('userid');
    if (!id) {
      id = crypto.randomUUID();
      cookies.set('userid', id, { path: '/' });
    }
    const data = await request.formData();
    db.createTodo(id, data.get('description') as string);
  }
};
