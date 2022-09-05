import mongoose from 'mongoose';

// An interface that describes the properties
// that are required to create a new user
interface CodeAttrs {
  code: string;
  userId: string | null;
  used: boolean;
  duration: string;
  company: string | null;
}

// An interface that descirbes the properties
// that a user model has
interface CodeModel extends mongoose.Model<CodeDoc> {
  build(attrs: CodeAttrs): CodeDoc;
}

// An interface that describes the propterties
// That a User document has
interface CodeDoc extends mongoose.Document {
  code: string;
  userId: string | null;
  used: boolean;
  duration: string;
  company: string | null;
}

const codeSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: false,
    default: null,
  },
  used: {
    type: Boolean,
    required: true,
  },
  duration: {
    type: String,
    required: true
  },
  company: {
    type: String,
    required: false,
    default: null,
  },
});

codeSchema.statics.build = (attrs: CodeAttrs) => {
  return new Code(attrs);
};

const Code = mongoose.model<CodeDoc, CodeModel>('Code', codeSchema);

export { Code };
