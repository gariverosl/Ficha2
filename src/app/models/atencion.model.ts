export interface Atencion {
    id: { type: String },
    nombre: { type: String, required: true },
    apellido: { type: String, required: true },
    edad: { type: number, required: true },
    diagnostico: { type: String, required: true }
 };