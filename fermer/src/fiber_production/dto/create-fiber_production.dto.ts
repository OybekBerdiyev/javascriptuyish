import mongoose from "mongoose";

export class CreateFiberProductionDto {
    fiber_yieId: number;
    shearing_schudule: Date;
    fiber_quality: number;
    animal_id: mongoose.Schema.Types.ObjectId;
}
