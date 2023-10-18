import mongoose from "mongoose";

export class CreateInfoDto {
    wieght: number;
    color: string;
    height: number;
    breed: string;
    gender: string;
    birth_or_acquisition: Date;
    block_id: mongoose.Schema.Types.ObjectId;
    animal_id: mongoose.Schema.Types.ObjectId;
    parent_id: mongoose.Schema.Types.ObjectId;
}
