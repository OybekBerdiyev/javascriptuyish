import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";

enum Gender {
    Male = "male",
    Female = "female"
  }

export type InfoDocument = HydratedDocument<Info>

@Schema({versionKey: false})
export class Info {

    @Prop()
    wieght: number;

    @Prop()
    color: string;

    @Prop()
    height: number;

    @Prop()
    breed: string;

    @Prop({ type: String, enum: Object.values(Gender) })
    gender: string;

    @Prop()
    birth_or_acquisition: Date;

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: "Block"})
    block_id: mongoose.Schema.Types.ObjectId;
    
    @Prop({type: mongoose.Schema.Types.ObjectId, ref: "Animal"})
    animal_id: mongoose.Schema.Types.ObjectId;
    
    @Prop({type: mongoose.Schema.Types.ObjectId, ref: "Animal"})
    parent_id: mongoose.Schema.Types.ObjectId;
}

export const InfoSchema = SchemaFactory.createForClass(Info)