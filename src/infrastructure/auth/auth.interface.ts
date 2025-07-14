export interface AuthInterface {
  login(correo: string): Promise<any | null>;
}
