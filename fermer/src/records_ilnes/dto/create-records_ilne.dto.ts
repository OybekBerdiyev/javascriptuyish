import mongoose from "mongoose";

export class CreateRecordsIlneDto {
    animal_id: mongoose.Schema.Types.ObjectId;
    ilness_type: string;
    data_disease: Date;
    medicines: string;
    date_treatment: Date;
    illnes_photo: string;
    worker_id: mongoose.Schema.Types.ObjectId;

}
