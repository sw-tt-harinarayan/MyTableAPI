import * as express from "express";
import { NestFactory } from "@nestjs/core";
import { ValidationPipe } from "@nestjs/common";

import { AppModule } from "./app.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { ResponseTransformInterceptor } from "./utils/interceptors/response-transform.interceptor";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const globalPrefix = "api/v1";
  app.setGlobalPrefix(globalPrefix);
  app.useGlobalPipes(new ValidationPipe());
  app.use(express.static("uploads"));

  app.useGlobalInterceptors(new ResponseTransformInterceptor());

  const config = new DocumentBuilder()
    .setTitle("NEST API")
    .setDescription("NEST API for learning nestjs.")
    .setVersion("1.0")
    .setBasePath(globalPrefix)
    .addServer(process.env.BASE_URL, "Local Server")
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(`${globalPrefix}/docs`, app, document);

  await app.listen(process.env.PORT);

  console.info(`\nApp is running on: ${process.env.BASE_URL}`);
}

bootstrap();
