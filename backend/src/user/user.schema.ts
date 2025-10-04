import * as bcrypt from "bcrypt";
import * as mongoose from "mongoose";
import { User } from "./user.model";

export interface UserDocument extends User, mongoose.Document {
  _id: mongoose.Types.ObjectId;
}

const schema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  fullName: {
    type: String,
    required: true,
    trim: true,
  },
  login: {
    type: String,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    select: true,
    trim: true,
  },
  role: { type: mongoose.Schema.Types.ObjectId, ref: "Role" },
});

schema.pre<User>("save", async function (next) {
  if (this.isModified("password") || this.isNew) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  this.fullName = `${this.lastName} ${this.firstName}`;

  next();
});

schema.methods.validPassword = function (
  this: User,
  password: string
): Promise<boolean> {
  return bcrypt.compare(password, this.password);
};

const fieldsToPopulate = "role";

schema.pre("find", function () {
  this.populate(fieldsToPopulate);
});

schema.pre("findOne", function () {
  this.populate(fieldsToPopulate);
});

export const userModel = mongoose.model<User>("User", schema);
