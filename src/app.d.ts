declare global {
	declare namespace App {
	interface Error {
		code?: string;
	}
	interface Locals {
		user?: {
		id: string;
		name?: string;
		email?: string;
		} | null;
	}
	}
	


}


export {};
