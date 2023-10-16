import mongoose from "mongoose";

export class CreateMeatProductionDto {
    meat_yieId: number;
    sloughter_date: Date;
    shearing_schudule: Date;
    animal_id: mongoose.Schema.Types.ObjectId;
}
