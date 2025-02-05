export interface Usuario {
    usuarioId?: number;
    nombre: string;
    apellido: string;
    cedula: number;
    correo: string;
    contrasena: string;
    ultimoAcceso?: Date; 
    puntaje?: number; 
}
