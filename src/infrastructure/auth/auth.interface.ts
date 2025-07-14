export interface AuthInterface {
  login(correo: string): Promise<any | null>;
  cambioContrasena(id: number, contrasena: string): Promise<any>;
}
