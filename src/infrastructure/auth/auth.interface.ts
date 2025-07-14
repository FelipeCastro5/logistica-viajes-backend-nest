export interface AuthInterface {
  login(correo: string): Promise<any | null>;
  updatePassword(id: number, contrasena: string): Promise<any>;
}
