import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChatsGateway } from './chats.gateway';
import { ChatsModule } from './chats/chats.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGODB_URL , {
      // useNewUrlParser: true,
      // useUnifiedTopology : true,
      // useCreateIndex: true,
      // useFindAndModifiy: true
    }),
    ChatsModule,
    
  ],
  controllers: [AppController],
  providers: [AppService, ChatsGateway],
})
export class AppModule {

}

