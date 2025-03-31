import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import PropertySchema from '../../schemas/Property.model';
import { AuthModule } from '../auth/auth.module';
import { ViewModule } from '../view/view.module';
import { MemberModule } from '../member/member.module';
import LikeSchema from '../../schemas/Like.model';
import { LikeService } from './like.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Like', 
        schema: LikeSchema,
      }
    ]), 
    AuthModule,
    ViewModule,
    MemberModule
  ],
providers: [LikeService],
exports: [LikeService],
})
export class LikeModule {
  
}
