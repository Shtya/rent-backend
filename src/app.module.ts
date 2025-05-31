import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import * as path from 'path';
import { ConfigModule } from '@nestjs/config'; // Import ConfigModule and ConfigService
import {
  I18nModule,
  QueryResolver,
  HeaderResolver,
} from 'nestjs-i18n';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { ImageModule } from './images/images.module';
import { LoggingValidationPipe } from 'common/translationPipe';
import { QueryFailedErrorFilter } from 'common/QueryFailedErrorFilter';
import { UserModule } from './user/user.module';
import { CategoryModule } from './category/category.module';
import { SubCategoryModule } from './sub-category/sub-category.module';
import { ServiceModule } from './service/service.module';
import { ComplaintsModule } from './complaints/complaints.module';
import { AuthGuard } from './auth/auth.guard';
import { BannerModule } from './banner/banner.module';
import { ChatModule } from './chat/chat.module';

@Module({
  imports: [
    ConfigModule.forRoot(),

    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT, 10),
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: [__dirname + '/../**/*.entity{.ts,.js}'],
      synchronize: true,
    }),

    // I18nModule with async configuration
    I18nModule.forRoot({
      fallbackLanguage: 'en',
      loaderOptions: {
        path: path.join(__dirname, '/../i18n/'),
        watch: true,
      },
      resolvers: [
        { use: QueryResolver, options: ['lang'] },
        new HeaderResolver(['x-lang']),
      ],
    }),

    AuthModule,
    ImageModule,
    UserModule,
    CategoryModule,
    SubCategoryModule,
    ServiceModule,
    ComplaintsModule,
    BannerModule,
    ChatModule
  ],
  controllers: [AppController],
  providers: [AppService, LoggingValidationPipe , QueryFailedErrorFilter  ],
  exports: [LoggingValidationPipe  ],
})
export class AppModule {}
