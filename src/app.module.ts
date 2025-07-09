import { Module } from '@nestjs/common';
import { GoogleDriveModule } from './infrastructure/google-drive-api/google-drive.module';
import { GeminiModule } from './infrastructure/gemini-ia/gemini.module';
import { ConfigModule } from '@nestjs/config';
import { HistorialModule } from './presentation/modules/historial.module';
import { iaModule } from './infrastructure/ia-service/ia.module';
import { UsuarioModule } from './presentation/modules/usuario.module';
import { ClienteModule } from './presentation/modules/cliente.module';
import { GastoModule } from './presentation/modules/gasto.module';
import { LugarModule } from './presentation/modules/lugar.module';
import { ManifiestoModule } from './presentation/modules/manifiesto.module';
import { ViajeModule } from './presentation/modules/viaje.module';
import { RolModule } from './presentation/modules/rol.module';
import { Tipodoc } from './domain/tipodoc-domain/tipodoc.entity';
import { GastoxviajeModule } from './presentation/modules/gastoxviaje.module';

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
    GastoModule,
    LugarModule,
    ManifiestoModule,
    ViajeModule,
    RolModule,
    Tipodoc,
    GastoxviajeModule,
  ],
  //controllers: [AppController],
  //providers: [AppService],
})
export class AppModule { }
