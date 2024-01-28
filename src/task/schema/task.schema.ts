import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type TaskDocument = HydratedDocument<Task>;

@Schema()
export class Task {
  @Prop({ required: true })
  name: string;

  @Prop({ 
    required: true,
    enum:['InProgress', 'Completed', 'ToDo'] 
  })
  status: string;

  @Prop({ required: true })
  description: string;

  @Prop({ 
    required: true ,
    enum:['High', 'Low', 'Medium']
  })
  priority: string;

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const TaskSchema = SchemaFactory.createForClass(Task);