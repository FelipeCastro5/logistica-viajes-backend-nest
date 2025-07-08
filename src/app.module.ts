import { Module } from '@nestjs/common';
import { GoogleDriveModule } from './infrastructure/google-drive-api/google-drive.module';
import { GeminiModule } from './infrastructure/gemini-ia/gemini.module';
import { ConfigModule } from '@nestjs/config';
import { HistorialModule } from './presentation/modules/historial.module';
import { iaModule } from './infrastructure/ia-service/ia.module';
import { UsuarioModule } from './presentation/modules/usuario.module';
import { ClienteModule } from './presentation/modules/cliente.module';

@Module({
  imports: [
    iaModule,
    HistorialModule,
    GoogleDriveModule,
    ConfigModule.forRoot({ isGlobal: true }), // 👈 carga automáticamente .env
    GeminiModule,
    //Entidades
    UsuarioModule,
    ClienteModule,
  ],
  //controllers: [AppController],
  //providers: [AppService],
})
export class AppModule { }
