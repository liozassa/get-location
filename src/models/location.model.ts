import mongoose, { Document, Schema } from "mongoose";
import mongooseUniqueValidator from "mongoose-unique-validator";

export interface ILocation extends Document {
  _id: string,
  user_id: string,
  date: number,
  request_id: string,
  lat: number,
  lon: number,
  water: boolean
};

var LocationSchema = new Schema({
  _id: {type: Schema.Types.ObjectId, auto: true},
  user_id: {type: String, require: true},
  date: {type: Number, require: true},
  request_id: {type: String, require: true},
  lat: {type: Number, require: true},
  lon: {type: Number, require: true},
  water: {type: Boolean, require: true}
});

LocationSchema.plugin(mongooseUniqueValidator);

export const Location = mongoose.model<ILocation>('Location', LocationSchema);
