import * as mongoose from "mongoose";
import {
  Privilege,
  PrivilegeCategories,
  UserPrivileges,
} from "./privilege.model";

export interface PrivilegeDocument extends Privilege, mongoose.Document {
  _id: mongoose.Types.ObjectId;
}

const schema = new mongoose.Schema({
  name: { type: String, enum: Object.values(UserPrivileges), required: true },
  category: {
    type: String,
    enum: Object.values(PrivilegeCategories),
    required: true,
  },
});

export const privilegeModel = mongoose.model<PrivilegeDocument>(
  "Privilege",
  schema
);
