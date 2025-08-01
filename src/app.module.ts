import { Module } from '@nestjs/common';
import { GoogleDriveModule } from './infrastructure/google-drive-api/google-drive.module';
import { GeminiModule } from './infrastructure/chatbot/gemini-ia/gemini.module';
import { ConfigModule } from '@nestjs/config';
import { HistorialModule } from './presentation/modules/historial.module';
import { iaModule } from './infrastructure/chatbot/ia-service/ia.module';
import { UsuarioModule } from './presentation/modules/usuario.module';
import { ClienteModule } from './presentation/modules/cliente.module';
import { GastoModule } from './presentation/modules/gasto.module';
import { LugarModule } from './presentation/modules/lugar.module';
import { ManifiestoModule } from './presentation/modules/manifiesto.module';
import { ViajeModule } from './presentation/modules/viaje.module';
import { RolModule } from './presentation/modules/rol.module';
import { Tipodoc } from './domain/tipodoc-domain/tipodoc.entity';
import { GastoxviajeModule } from './presentation/modules/gastoxviaje.module';
import { MensajeModule } from './presentation/modules/mensaje.module';
import { ChatModule } from './presentation/modules/chat.module';
import { EmailModule } from './infrastructure/email-service/email-service.module';
import { AuthModule } from './infrastructure/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), // 👈 carga automáticamente .env
    //Services
    iaModule,
    HistorialModule,
    GoogleDriveModule,
    GeminiModule,
    EmailModule,
    AuthModule,
    //Entidades
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
  ],
  //controllers: [AppController],
  //providers: [AppService],
})
export class AppModule { }
