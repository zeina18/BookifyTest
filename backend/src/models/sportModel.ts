import mongoose, { Schema, Document } from "mongoose";

export interface ISport extends Document {
  team1: string;
  team2: string;
  tournament: string;
  stage: string;
  stadium: string;
  city: string;
  date: string;
  time: string;
  status: string;
  
}

const sportSchema = new Schema<ISport>({
    team1: { type: String, required: true },
    team2: { type: String, required: true },
    tournament: { type: String, required: true },
    stage: { type: String, required: true },
    stadium: { type: String, required: true },
    city: { type: String, required: true },
    date: { type: String, required: true },
    time: { type: String, required: true },
    status: { type: String, required: true },
    
});

const SportModel = mongoose.model<ISport>("Sport", sportSchema);

export default SportModel;
