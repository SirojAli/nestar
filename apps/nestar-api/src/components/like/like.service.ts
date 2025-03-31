import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { MemberService } from '../member/member.service';
import { ViewService } from '../view/view.service';
import { Like } from '../../libs/dto/like/like';

@Injectable()
export class LikeService {
  constructor(
      @InjectModel('Like') private readonly propertyModel: Model<Like>,
      private memberService: MemberService,
      private viewService: ViewService,
  
    ) {}
  


    
}
