// Define una interfaz genérica para un elemento CRUD
// T es el tipo de datos del item (e.g., User, Product)
// El ID es opcional al crear, pero requerido al leer/actualizar/borrar
export interface CrudItem<T = any> {
  id?: string; // O number, según tu backend/preferencia
  [key: string]: any; // Permite propiedades adicionales
}