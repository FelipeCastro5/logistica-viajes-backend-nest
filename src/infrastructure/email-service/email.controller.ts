import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { EmailService } from '../../infrastructure/email-service/email-service.service';
import { SendEmailDto } from './send-email.dto';

/**
 * Clase de infraestructura: EmailController.
 * Provee implementación técnica de un servicio o adaptador (e.g. BD, APIs externas, JWT).
 */
@ApiTags('Email')
@Controller('email')
export class EmailController {
  /** Constructor de la clase. Inyecta los servicios o configuración necesarios para operar. */
    constructor(private readonly emailService: EmailService) {}

  /**
     * Ejecuta la operación técnica de sendEmail.
     * @param dto Parámetro de entrada de tipo SendEmailDto.
     * @returns Resultado de la operación en la capa de infraestructura.
     */
    @Post('send')
  @ApiOperation({ summary: 'Enviar un correo de prueba' })
  @ApiResponse({ status: 201, description: 'Correo enviado exitosamente' })
  async sendEmail(@Body() dto: SendEmailDto) {
    await this.emailService.sendEmail(dto.to, dto.subject, dto.body);
    return { message: `Correo enviado a ${dto.to}` };
  }
}
