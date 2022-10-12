import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({
  timestamps: true,
  versionKey: false,
})
export class Product extends Document {

  @Prop({
    required: true,
    index: true,
  })
  title: string;


  @Prop({
    required: true,
    index: true,
  })
  price: number;


  @Prop({
    nullable: true,
    index: true,
  })
  img: string;

}

export const ProductSchema = SchemaFactory.createForClass(Product);
