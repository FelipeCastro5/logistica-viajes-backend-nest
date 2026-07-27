import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { ConfigService } from '@nestjs/config';

/**
 * Clase de infraestructura: EmailService.
 * Provee implementación técnica de un servicio o adaptador (e.g. BD, APIs externas, JWT).
 */
@Injectable()
export class EmailService {
  private transporter: nodemailer.Transporter;

  /** Constructor de la clase. Inyecta los servicios o configuración necesarios para operar. */
    constructor(private readonly configService: ConfigService) {
    this.transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: this.configService.get<string>('EMAIL_USER'),
        pass: this.configService.get<string>('EMAIL_PASS'),
      },
    });
  }

  /**
     * Ejecuta la operación técnica de sendEmail.
     * @param to Parámetro de entrada de tipo string.
     * @param subject Parámetro de entrada de tipo string.
     * @param body Parámetro de entrada de tipo string.
     * @returns Resultado de la operación en la capa de infraestructura.
     */
    async sendEmail(to: string, subject: string, body: string) {
    await this.transporter.sendMail({
      from: `"Soporte Ing. Daniel Castro" <${this.configService.get<string>('EMAIL_USER')}>`,
      to,
      subject,
      text: body,
    });
  }
}
