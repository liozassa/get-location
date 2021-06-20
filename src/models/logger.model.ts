import mongoose, { Schema, Document} from 'mongoose';
import mongooseUniqueValidator from 'mongoose-unique-validator';
mongoose.set('useCreateIndex', true);

export interface ILog extends Document {
  _id: string,
  service_name: string,
  date: number,
  level: number,
  message: string
};

var LogSchema = new Schema({
  _id: {type: Schema.Types.ObjectId, auto: true},
  service_name: {type: String, require: true},
  date: {type: Number, require: true},
  level: {type: Number, require: true},
  message: {type: String, require: true}
});

LogSchema.plugin(mongooseUniqueValidator);

export const Log = mongoose.model<ILog>('Log', LogSchema);
