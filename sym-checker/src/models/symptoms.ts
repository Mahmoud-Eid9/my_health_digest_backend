import mongoose from 'mongoose';

// An interface that describes the properties
// that are required to create a new user
interface SymAttrs {
  disease: string;
  symptoms: Array<string>
}

// An interface that descirbes the properties
// that a user model has
interface UserModel extends mongoose.Model<SymDoc> {
  build(attrs: SymAttrs): SymDoc;
}

// An interface that describes the propterties
// That a User document has
interface SymDoc extends mongoose.Document {
  disease: string;
  symptoms: Array<string>
}

const sympSchema = new mongoose.Schema({
  disease: {
    type: String,
    Required: true
  },
    symptoms: {
      type: [String],
      Required: true
    }
});

const Symptom = mongoose.model<SymDoc, UserModel>('Symptom', sympSchema);

export { Symptom };
