import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { Animal } from "../../animals/schemas/animal.schema";

export type FiberProductionDocument = HydratedDocument<FiberProduction>


@Schema({versionKey: false})
export class FiberProduction {

    @Prop()
    fiber_yieId: number;
    
    @Prop()
    shearing_schudule: Date;
    
    @Prop()
    fiber_quality: number;

    @Prop({type:mongoose.Schema.Types.ObjectId, ref: "Animal" })
    animal_id: Animal;
}

export const FiberProductionSchema = SchemaFactory.createForClass(FiberProduction)