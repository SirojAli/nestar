import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { PropertyService } from './property.service';
import { Property } from '../../libs/dto/property/property';
import { PropertyInput } from '../../libs/dto/property/property.input';
import { Roles } from '../auth/decorators/roles.decorator';
import { UseGuards } from '@nestjs/common';
import { RolesGuard } from '../auth/guards/roles.guard';
import { MemberType } from '../../libs/enums/member.enum';
import { AuthMember } from '../auth/decorators/authMember.decorator';
import { ObjectId } from 'mongoose';
import { WithoutGuard } from '../auth/guards/without.guard';
import { shapeIntoMongoObject } from '../../libs/config';

@Resolver()
export class PropertyResolver {
    constructor(private readonly propertyService: PropertyService) {}
  
    @Roles(MemberType.AGENT)
    @UseGuards(RolesGuard)
    @Mutation(() => Property)
    public async createProperty(
      @Args('input') input: PropertyInput,  // InputType
      @AuthMember('_id') memberId: ObjectId
    ): Promise<Property> {  // ObjectType
      console.log('Mutation: createProperty');
      input.memberId = memberId;  // ID larni tekshirib oladi, xavfsizlik uchun
      return await this.propertyService.createProperty(input);
    }

    @UseGuards(WithoutGuard)
    @Mutation(() => Property)
    public async getProperty(
      @Args('propertyId') input: string,  
      @AuthMember('_id') memberId: ObjectId
    ): Promise<Property> {  
      console.log('Query: getProperty');
      const propertyId = shapeIntoMongoObject(input);
      return await this.propertyService.getProperty(memberId, propertyId);
    }
}
