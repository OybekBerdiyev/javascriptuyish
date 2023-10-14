
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { AnimalType } from "../../animal_type/schemas/animal_type.schema";

export type AnimalDocument = HydratedDocument<Animal>

@Schema({versionKey: false})
export class Animal {


    @Prop({type: mongoose.Schema.Types.ObjectId, ref: "Animaltype"})
    animal_type_id: AnimalType;
    
    @Prop()
    photos: Array<string>;

    @Prop()
    unique_id: string;
}

export const AnimalScheme = SchemaFactory.createForClass(Animal)
