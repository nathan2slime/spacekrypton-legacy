import { getModelForClass, index, prop } from '@typegoose/typegoose';
import { Field, InputType, ObjectType } from 'type-graphql';
import 'reflect-metadata';

@index({ title: 1, description: 1 })
@ObjectType()
export class News {
  @Field(() => String)
  _id: string;

  @Field(() => String)
  @prop({ required: true })
  title: string;

  @Field(() => String)
  @prop({ required: true })
  description: string;

  @Field(() => String)
  @prop({ required: true })
  content: string;

  @Field(() => String)
  @prop({ required: true })
  thumb: string;

  @Field(() => String)
  @prop({ required: true })
  origin: string;

  @Field(() => Date)
  @prop({ default: Date.now })
  created_at: Date;

  @Field(() => Date, { nullable: true })
  @prop()
  deleted_at: Date;

  @Field(() => Date, { nullable: true })
  @prop()
  updated_at: Date;
}

export const NewsModel = getModelForClass<typeof News>(News);

@InputType()
export class CreateNewsInput {
  @Field(() => String)
  title: string;

  @Field(() => String)
  description: string;

  @Field(() => String)
  thumb: string;

  @Field(() => String)
  origin: string;

  @Field(() => String)
  content: string;
}
