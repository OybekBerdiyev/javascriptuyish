import mongoose from "mongoose";

export class CreateMilkProductionDto {
    milk_yieId: number;
    shearing_schudule: Date;
    milk_quality: number;
    animal_id: mongoose.Schema.Types.ObjectId;
}
