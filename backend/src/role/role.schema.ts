import * as mongoose from "mongoose";
import { Role, RoleType } from "./role.model";

export interface RoleDocument extends Role, mongoose.Document {
  _id: mongoose.Types.ObjectId;
}

const schema = new mongoose.Schema({
  name: String,
  privileges: [{ type: mongoose.Schema.Types.ObjectId, ref: "Privilege" }],
  type: { type: String, enum: Object.values(RoleType) },
});

const fieldsToPopulate = "privileges";

schema.pre("find", function () {
  this.populate(fieldsToPopulate);
});

schema.pre("findOne", function () {
  this.populate(fieldsToPopulate);
});

export const roleModel = mongoose.model<RoleDocument>("Role", schema);
