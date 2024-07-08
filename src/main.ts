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
  app.use(express.static("uploads"));
  app.useGlobalPipes(new ValidationPipe());

  app.useGlobalInterceptors(new ResponseTransformInterceptor());

  //     "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImhhcmlAdGVzdC5jb20iLCJpYXQiOjE3MjAyOTMwMzIsImV4cCI6MTcyNTQ3NzAzMn0._RdM0KZ1yXzo__SZvn8LtaJjLWZG6r4bgMh4UPO1v1M",

  const config = new DocumentBuilder()
    .setTitle("MyTable API")
    .setDescription("MyTable API for complete project.")
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
