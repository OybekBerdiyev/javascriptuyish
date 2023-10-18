import mongoose from "mongoose";

export class CreateFeedingDto {
    animal_id: mongoose.Schema.Types.ObjectId;
    worker_id: mongoose.Schema.Types.ObjectId;
    feeding_shedules: Date;
    type_of_feed: string;
    dietary: string;

}
