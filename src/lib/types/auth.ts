// Simula autenticación simple en memoria
type User = {
  email: string;
  password: string;
};

const users: User[] = [];

export function register(email: string, password: string) {
  const exists = users.find((u) => u.email === email);
  if (exists) {
    return { success: false, message: 'El usuario ya existe' };
  }
  users.push({ email, password });
  return { success: true };
}

export function login(email: string, password: string) {
  const user = users.find((u) => u.email === email && u.password === password);
  return !!user;
}