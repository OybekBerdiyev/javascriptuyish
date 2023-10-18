import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";

export type FeedingDocument = HydratedDocument<Feeding>

@Schema({versionKey: false})
export class Feeding {
    @Prop({type:mongoose.Schema.Types.ObjectId, ref: "Animal"})
    animal_id: mongoose.Schema.Types.ObjectId;
    
    @Prop()
    feeding_shedules: Date;

    @Prop()
    type_of_feed: string;

    @Prop()
    dietary: string;

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: "Worker"})
    worker_id: mongoose.Schema.Types.ObjectId;
}

export const FeedingSchema = SchemaFactory.createForClass(Feeding)