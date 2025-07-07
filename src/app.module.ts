import { Module } from '@nestjs/common';
import { UsersModule } from './presentation/modules/user.module';
import { GoogleDriveModule } from './infrastructure/google-drive-api/google-drive.module';
import { ProjectsModule } from './presentation/modules/projects.module';
import { GeminiModule } from './infrastructure/gemini-ia/gemini.module';
import { ConfigModule } from '@nestjs/config';
import { HistorialModule } from './presentation/modules/historial.module';
import { ActivitiesModule } from './presentation/modules/activities.module';
import { iaModule } from './infrastructure/ia-service/ia.module';

@Module({
  imports: [
    iaModule,
    UsersModule,
    ProjectsModule,
    ActivitiesModule,
    HistorialModule,
    GoogleDriveModule,
    ConfigModule.forRoot({ isGlobal: true }), // 👈 carga automáticamente .env
    GeminiModule,
  ],
  //controllers: [AppController],
  //providers: [AppService],
})
export class AppModule { }
