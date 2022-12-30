import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type EmailDocument = Email & Document;

@Schema()
export class Email {
  @Prop()
  id: string;

  @Prop()
  starred: boolean;

  @Prop()
  from: string;

  @Prop()
  subject: string;

  @Prop()
  message: string;

  @Prop()
  received: string;

  @Prop()
  read: boolean;
}

export const EmailSchema = SchemaFactory.createForClass(Email);
