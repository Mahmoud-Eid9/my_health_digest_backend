import mongoose from 'mongoose';

// An interface that describes the properties
// that are required to create a new user
interface WeightAttrs {
  userId: string;
  cal_goal: number;
  cal_progress: number;
  water: number;
  exercise: number;
  weight: { date: string; value: number }[];
  date: string;
}

// An interface that descirbes the properties
// that a user model has
interface WeightModel extends mongoose.Model<WeightDoc> {
  build(attrs: WeightAttrs): WeightDoc;
}

// An interface that describes the propterties
// That a User document has
interface WeightDoc extends mongoose.Document {
  userId: string;
  cal_goal: number;
  cal_progress: number;
  water: number;
  exercise: number;
  weight: { date: string; value: number }[];
  date: string;
}

const weightSchema = new mongoose.Schema({
  userId: {
    type: String,
    Required: true,
  },
  cal_goal: {
    type: Number,
    Required: true,
  },
  cal_progress: {
    type: Number,
    Required: true,
  },
  water: {
    type: Number,
    Required: true,
  },
  exercise: {
    type: Number,
    required: true
  },
  weight: [
    {
      date: {
        type: String,
        Required: true,
      },
      value: {
        type: Number,
        Required: true,
      },
    },
  ],
  date: {
    type: String,
    required: true
  }
});

weightSchema.statics.build = (attrs: WeightAttrs) => {
  return new Weight(attrs);
};

const Weight = mongoose.model<WeightDoc, WeightModel>('WeightMonitoring', weightSchema);

export { Weight };
