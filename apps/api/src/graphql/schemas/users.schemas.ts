import { getModelForClass, ModelOptions, prop, Severity } from '@typegoose/typegoose';
import { Field, ID, InputType, Int, ObjectType } from 'type-graphql';
import { IsEmail } from 'class-validator';
import 'reflect-metadata';

@ObjectType()
@ModelOptions({
  schemaOptions: {
    timestamps: true,
  },
  options: {
    allowMixed: Severity.ALLOW,
  },
})
export class User {
  @Field(() => ID)
  @prop({ unique: true, required: true })
  id: String;

  @Field(() => String)
  @prop({ required: true })
  username: string;

  @Field(() => String, { nullable: true })
  @prop()
  avatar: string;

  @Field(() => Date)
  @prop({ default: Date.now })
  created_at: Date;

  @Field(() => Date, { nullable: true })
  @prop()
  deleted_at: Date;

  @Field(() => Date, { nullable: true })
  @prop()
  updated_at: Date;

  @Field(() => String, { nullable: true })
  @prop()
  thumb: string;

  @Field(() => String)
  @prop({ required: true, unique: true })
  email: string;

  @Field(() => [String], { defaultValue: [] })
  @prop({ default: ['user'] })
  roles: string[];

  @Field(() => [Int])
  @prop({ default: [] })
  satellites: number[];

  @prop({ required: true })
  password: string;
}

export const UserModel = getModelForClass<typeof User>(User);

@InputType()
export class CreateUserInput {
  @Field(() => String)
  username: string;

  @IsEmail()
  @Field(() => String)
  email: string;

  @Field(() => String)
  password: string;
}

@InputType()
export class UpdateUserInput {
  @Field(() => String, { nullable: true })
  username?: string;

  @Field(() => String, { nullable: true })
  avatar?: string;

  @Field(() => String, { nullable: true })
  thumb?: string;

  @Field(() => [Int], { nullable: true })
  satellites?: number[];
}

@InputType()
export class LoginInput {
  @IsEmail()
  @Field(() => String)
  email: string;

  @Field(() => String)
  password: string;
}

@ObjectType()
export class AuthUser {
  @Field(() => User)
  user: User;

  @Field()
  token: string;
}
