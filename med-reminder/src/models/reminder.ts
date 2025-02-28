import mongoose from 'mongoose';

// An interface that describes the properties
// that are required to create a new user
interface MedAttrs {
  name: string;
  dosage: number;
  duration: {
    value: number;
    unit: string;
  };
  frequency: Array<string>;
  time: Array<string>;
  userid: string;
  expiration: string;
}

// An interface that descirbes the properties
// that a user model has
interface MedModel extends mongoose.Model<MedDoc> {
  build(attrs: MedAttrs): MedDoc;
}

// An interface that describes the propterties
// That a User document has
interface MedDoc extends mongoose.Document {
  name: string;
  dosage: number;
  duration: {
    value: number;
    unit: string;
  };
  frequency: Array<string>;
  time: Array<string>;
  userid: string;
  expiration: string;
}
const durationSchema = new mongoose.Schema({
  value: {
    type: Number,
    Required: false,
    default: 0,
  },
  unit: {
    type: String,
    Required: true,
  },
});

const medSchema = new mongoose.Schema({
  name: {
    type: String,
    Required: true,
  },
  dosage: {
    type: Number,
    Required: true,
  },
  duration: {
    type: durationSchema,
    Required: true,
  },
  frequency: {
    type: [String],
    Required: true,
  },
  time: {
    type: [String],
    Required: true,
  },
  userid: {
    type: String,
    Required: true,
  },
  expiration: {
    type: String,
    required: true,
  },
});

medSchema.statics.build = (attrs: MedAttrs) => {
  return new Reminder(attrs);
};

const Reminder = mongoose.model<MedDoc, MedModel>('Reminder', medSchema);

export { Reminder };
