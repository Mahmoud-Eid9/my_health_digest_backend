import mongoose from 'mongoose';

// An interface that describes the properties
// that are required to create a new user
interface CalAttrs {
item: string;
servingSize: string;
carbohydratesGrams: number;
fatGrams: number;
calories: number;
}

// An interface that descirbes the properties
// that a user model has
interface CalModel extends mongoose.Model<CalDoc> {
  build(attrs: CalAttrs): CalDoc;
}

// An interface that describes the propterties
// That a User document has
interface CalDoc extends mongoose.Document {
  item: string;
  servingSize: string;
  carbohydratesGrams: number;
  fatGrams: number;
  calories: number;
}

const CalSchema = new mongoose.Schema({
  item: {
    type: String,
    required: true
  },
  servingSize: {
    type: String,
    required: true
  },
  carbohydratesGrams: {
    type: Number,
    required: true
  },
  fatGrams: {
    type: Number,
    required: true
  },
  calories: {
    type: Number,
    required: true
  }
});

CalSchema.statics.build = (attrs: CalAttrs) => {
  return new Calories(attrs);
};

const Calories = mongoose.model<CalDoc, CalModel>('Calories', CalSchema);

export {Calories };
