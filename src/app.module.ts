/**
 * Importaciones de decoradores y módulos core de NestJS.
 */
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

/**
 * Importaciones de Módulos de Infraestructura (Servicios Externos, IA, Email, BD).
 */
import { GoogleDriveModule } from './infrastructure/google-drive-api/google-drive.module';
import { GeminiModule } from './infrastructure/chatbot/llm-services/gemini-ia/gemini.module';
import { iaModule } from './infrastructure/chatbot/ia-service/ia.module';
import { EmailModule } from './infrastructure/email-service/email-service.module';
import { AuthModule } from './infrastructure/auth/auth.module';
import { OpenRouterModule } from './infrastructure/chatbot/llm-services/openrouter-ia/openrouter.module';
import { Nl2sqlModule } from './infrastructure/chatbot/nl2sql/nl2sql.module';

/**
 * Importaciones de Módulos de Presentación (Controladores de Entidades del Negocio).
 */
import { HistorialModule } from './presentation/modules/historial.module';
import { UsuarioModule } from './presentation/modules/usuario.module';
import { ClienteModule } from './presentation/modules/cliente.module';
import { GastoModule } from './presentation/modules/gasto.module';
import { LugarModule } from './presentation/modules/lugar.module';
import { ManifiestoModule } from './presentation/modules/manifiesto.module';
import { ViajeModule } from './presentation/modules/viaje.module';
import { RolModule } from './presentation/modules/rol.module';
import { GastoxviajeModule } from './presentation/modules/gastoxviaje.module';
import { MensajeModule } from './presentation/modules/mensaje.module';
import { ChatModule } from './presentation/modules/chat.module';
import { VehiculoModule } from './presentation/modules/vehiculo.module';
import { SeguroModule } from './presentation/modules/seguro.module';
import { RemesaModule } from './presentation/modules/remesa.module';
import { MercanciaPeligrosaModule } from './presentation/modules/mercancia-peligrosa.module';
import { FirmaModule } from './presentation/modules/firma.module';
import { Tipodoc } from './domain/tipodoc-domain/tipodoc.entity';

/**
 * Módulo raíz de la aplicación NestJS.
 * Agrupa y organiza todos los submódulos de la arquitectura (Infraestructura y Presentación).
 */
@Module({
  imports: [
    // 1. Cargamos configuración global (variables de entorno .env) de manera que esté disponible en toda la app.
    ConfigModule.forRoot({ isGlobal: true }),

    // 2. Módulos de Infraestructura (Servicios, integraciones)
    iaModule,
    HistorialModule,
    GoogleDriveModule,
    GeminiModule,
    EmailModule,
    AuthModule,
    OpenRouterModule,
    Nl2sqlModule,

    // 3. Módulos de Presentación (Endpoints y Lógica de Negocio)
    UsuarioModule,
    ClienteModule,
    GastoModule,
    LugarModule,
    ManifiestoModule,
    ViajeModule,
    RolModule,
    Tipodoc,
    GastoxviajeModule,
    MensajeModule,
    ChatModule,
    VehiculoModule,
    SeguroModule,
    RemesaModule,
    MercanciaPeligrosaModule,
    FirmaModule,
  ],
})
export class AppModule { }
