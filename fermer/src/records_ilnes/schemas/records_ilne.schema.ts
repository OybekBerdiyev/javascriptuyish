import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";

export type RecordsIlneDocument = HydratedDocument<RecordsIlne>

@Schema({versionKey: false})
export class RecordsIlne {
    @Prop({type:mongoose.Schema.Types.ObjectId, ref: "Animal"})
    animal_id: mongoose.Schema.Types.ObjectId;
    
    @Prop()
    ilness_type: string;
    
    @Prop()
    data_disease: Date;

    @Prop()
    medicines: string;

    @Prop()
    date_treatment: Date;

    @Prop()
    illnes_photo: string;

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: "Worker"})
    worker_id: mongoose.Schema.Types.ObjectId;
}

export const RecordsIlneSchema = SchemaFactory.createForClass(RecordsIlne)