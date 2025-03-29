import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { MemberService } from '../member/member.service';
import { Direction, Message } from '../../libs/enums/common.enum';
import { ViewService } from '../view/view.service';
import { StatisticModifier, T } from '../../libs/types/common';
import { ViewGroup } from '../../libs/enums/view.enum';
import * as moment from 'moment';
import { lookupMember, shapeIntoMongoObject } from '../../libs/config';
import { BoardArticle } from '../../libs/dto/board-article/board-article';

@Injectable()
export class BoardArticleService {
  constructor(
      @InjectModel('BoardArticle') private readonly boardArticleModel: Model<BoardArticle>,
      private memberService: MemberService,
      private viewService: ViewService,
  
    ) {}


}
