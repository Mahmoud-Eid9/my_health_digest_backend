import mongoose from 'mongoose';

// An interface that describes the properties
// that are required to create a new user
interface MedAttrs {
  enName: string;
  arName: string;
  price: number;
  barcode: number;
  activeIngredient: string;

}

// An interface that descirbes the properties
// that a user model has
interface MedModel extends mongoose.Model<MedDoc> {
  build(attrs: MedAttrs): MedDoc;
}

// An interface that describes the propterties
// That a User document has
interface MedDoc extends mongoose.Document {
  enName: string;
  arName: string;
  price: number;
  barcode: number;
  activeIngredient: string;
}

const medSchema = new mongoose.Schema({
  enName: {
    type: String,
    Required: true
  },
    arnName: {
      type: String,
      Required: true
    },
    price:{
      type: Number,
      Required: true
    },
    barcode: {
      type: Number,
      Required: true
    },
    activeIngredient: {
      type: String,
      Required: true
    }
  },
    {
      toJSON: {
        transform(doc, ret) {
          ret.id = ret._id;
        },
      },
    }
);

const Medicine = mongoose.model<MedDoc, MedModel>('Medicine', medSchema);

export { Medicine };
