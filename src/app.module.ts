import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { EmailModule } from './email/email.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://main_user:main_user@cluster0.w8smv.mongodb.net/gmail?retryWrites=true&w=majority',
    ),
    EmailModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
