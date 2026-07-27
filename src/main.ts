/**
 * Importamos las dependencias principales de NestJS para la inicialización de la aplicación.
 */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { ResponseUtil } from './application/utilities/response.util';

/**
 * Función asíncrona principal que inicializa el servidor NestJS.
 */
async function bootstrap() {
  // 1. Creamos la instancia de la aplicación Nest utilizando el módulo raíz (AppModule).
  const app = await NestFactory.create(AppModule);

  // 2. Habilitamos CORS para permitir peticiones desde cualquier origen y método.
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  // 3. Configuramos un ValidationPipe global para validar todos los DTOs entrantes.
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Remueve campos no declarados en el DTO
      transform: true, // Transforma payloads a objetos DTO automáticamente
      exceptionFactory: (errors) => {
        // Mapeamos los errores de class-validator a nuestro formato de respuesta estándar
        const messages = errors.flatMap((err) =>
          Object.values(err.constraints || {})
        );
        return new BadRequestException(ResponseUtil.error(messages.join(', ')));
      },
    }),
  );

  // 4. Configuramos el generador de documentación Swagger para la API.
  const config = new DocumentBuilder()
    .setTitle('API de Proyectos')
    .setDescription('Documentacion de la api de proyectos')
    .setVersion('1.0')
    //    .addTag('Proyectos')
    .build();

  // 5. Inicializamos y montamos Swagger en el endpoint '/swagger'.
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document, {
    jsonDocumentUrl: 'swagger/json',
  });

  // 6. Arrancamos el servidor en el puerto 3000 o el especificado por variables de entorno.
  await app.listen(process.env.PORT ?? 3000);
  
  // 7. Imprimimos las URL de acceso en la consola.
  console.log(`🚀 App is running on: ${await app.getUrl()}`);
  console.log(`🚀 Swagger is running on: ${await app.getUrl()}/swagger`);
}

// Ejecutamos la función bootstrap para iniciar la app.
bootstrap();
