import mongoose from 'mongoose';

// An interface that describes the properties
// that are required to create a new user
interface DocAttrs {
  name: string;
  date: string;
  userid: string;
}

// An interface that descirbes the properties
// that a user model has
interface DocModel extends mongoose.Model<DocDoc> {
  build(attrs: DocAttrs): DocDoc;
}

// An interface that describes the propterties
// That a User document has
interface DocDoc extends mongoose.Document {
  name: string;
  date: string;
  userid: string;
}

const docSchema = new mongoose.Schema({
  name: {
    type: String,
    Required: true
  },
    date: {
      type: String,
      Required: true
    },
    userid: {
      type: String,
      Required: true
    }
});

docSchema.statics.build = (attrs: DocAttrs) => {
  return new Appoint(attrs);
};

const Appoint = mongoose.model<DocDoc, DocModel>('Appointments', docSchema);

export { Appoint };
