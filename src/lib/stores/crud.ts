type Persona = { 
    id: string;
    nombre: string; 
    edad: number;
    fechaCreacion: Date;
};


export const personas: Persona[] = [
    { id: '1', nombre: 'Juan', edad: 30, fechaCreacion: new Date('2023-01-01') },
    { id: '2', nombre: 'Ana', edad: 25, fechaCreacion: new Date('2023-02-01') }];