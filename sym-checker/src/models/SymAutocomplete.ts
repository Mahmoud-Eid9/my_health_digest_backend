import mongoose from 'mongoose';

// An interface that describes the properties
// that are required to create a new user
interface SymAttrs {
  name: string;
}

// An interface that descirbes the properties
// that a user model has
interface UserModel extends mongoose.Model<SymDoc> {
  build(attrs: SymAttrs): SymDoc;
}

// An interface that describes the propterties
// That a User document has
interface SymDoc extends mongoose.Document {
  name: string;
}

const sympSchema = new mongoose.Schema({
  name: {
    type: String,
    Required: true,
  },
});

const SympAutocomp = mongoose.model<SymDoc, UserModel>('symp-autocomplete', sympSchema);

export { SympAutocomp };
