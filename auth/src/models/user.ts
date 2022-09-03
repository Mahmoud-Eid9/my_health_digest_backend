import mongoose from 'mongoose';
import { PasswordManager } from '../services/password-manager';

// An interface that describes the properties
// that are required to create a new user
interface UserAttrs {
  email: string;
  password: string;
  name: string;
  age: number;
  gender: string;
  admin: boolean;
  activated: boolean;
}

// An interface that descirbes the properties
// that a user model has
interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc;
}

// An interface that describes the propterties
// That a User document has
interface UserDoc extends mongoose.Document {
  email: string;
  password: string;
  name: string;
  age: number;
  gender: string;
  admin: boolean;
  activated: boolean;
}

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    admin: {
      type: Boolean,
    },
    activated: {
      type: Boolean,
      required: true
    }
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.password;
        delete ret.__v;
      },
    },
  }
);

// .isModified works whenever a password is modified or created
// pre is a middlware that executes with mongoose
userSchema.pre('save', async function (done) {
  if (this.isModified('password')) {
    const hashed = await PasswordManager.toHash(this.get('password'));
    this.set('password', hashed);
  }
  done();
});

userSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs);
};

const User = mongoose.model<UserDoc, UserModel>('User', userSchema);

export { User };
