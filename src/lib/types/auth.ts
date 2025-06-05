// lib/types/auth.ts - Sistema de autenticación mejorado
type User = {
  id: string;
  email: string;
  password: string;
  createdAt: Date;
};

type AuthResult = {
  success: boolean;
  message?: string;
  user?: Omit<User, 'password'>;
};

// Simulación de base de datos en memoria
const users: User[] = [];

// Función auxiliar para generar ID único
function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

// Función auxiliar para validar email
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Función auxiliar para validar contraseña fuerte
function isStrongPassword(password: string): boolean {
  return (
    password.length >= 8 &&
    /[A-Z]/.test(password) &&
    /[a-z]/.test(password) &&
    /\d/.test(password)
  );
}

export async function register(email: string, password: string): Promise<AuthResult> {
  // Simular delay de red
  await new Promise(resolve => setTimeout(resolve, 1000));

  // Validaciones
  if (!isValidEmail(email)) {
    return { success: false, message: 'Email inválido' };
  }

  if (!isStrongPassword(password)) {
    return { 
      success: false, 
      message: 'La contraseña debe tener al menos 8 caracteres, incluir mayúscula, minúscula y número' 
    };
  }

  // Verificar si el usuario ya existe
  const exists = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
  if (exists) {
    return { success: false, message: 'El usuario ya existe' };
  }

  // Crear nuevo usuario
  const newUser: User = {
    id: generateId(),
    email: email.toLowerCase(),
    password, // En producción esto debería estar hasheado
    createdAt: new Date()
  };

  users.push(newUser);

  return { 
    success: true, 
    message: 'Usuario registrado exitosamente',
    user: {
      id: newUser.id,
      email: newUser.email,
      createdAt: newUser.createdAt
    }
  };
}

export async function login(email: string, password: string): Promise<AuthResult> {
  // Simular delay de red
  await new Promise(resolve => setTimeout(resolve, 800));

  // Validaciones básicas
  if (!email || !password) {
    return { success: false, message: 'Email y contraseña son requeridos' };
  }

  // Buscar usuario
  const user = users.find(
    (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
  );

  if (!user) {
    return { success: false, message: 'Credenciales inválidas' };
  }

  return { 
    success: true, 
    message: 'Login exitoso',
    user: {
      id: user.id,
      email: user.email,
      createdAt: user.createdAt
    }
  };
}

// Función para obtener todos los usuarios (para debugging)
export function getAllUsers(): Omit<User, 'password'>[] {
  return users.map(({ password, ...user }) => user);
}

// Función para limpiar usuarios (para testing)
export function clearUsers(): void {
  users.length = 0;
}