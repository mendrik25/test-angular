import mongoose from "mongoose";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import { privilegeModel } from "./src/privilege/privilege.schema";
import { roleModel } from "./src/role/role.schema";
import { userModel } from "./src/user/user.schema";
import { studentModel } from "./src/student/student.schema";
import { examModel } from "./src/exam/exam.schema";
dotenv.config();

const env = (process.env.NODE_ENV || "development").trim();
const data = require("./seed.json")[env];

if (!data || !data.MONGODB_URI) {
  throw new Error(`No valid MONGO_URI for NODE_ENV: ${env}`);
}

const mongoUri = data.MONGODB_URI.trim();

function normalizeObjectId(obj: any) {
  if (obj._id && obj._id.$oid) {
    obj._id = obj._id.$oid;
  }
  return obj;
}

async function seed() {
  try {
    await mongoose.connect(mongoUri);
    const privilegeData = JSON.parse(
      fs.readFileSync(path.join(__dirname, "seeds/privileges.json"), "utf-8")
    ).map(normalizeObjectId);

    const roleData = JSON.parse(
      fs.readFileSync(path.join(__dirname, "seeds/roles.json"), "utf-8")
    ).map(normalizeObjectId);

    const userData = JSON.parse(
      fs.readFileSync(path.join(__dirname, "seeds/users.json"), "utf-8")
    ).map(normalizeObjectId);

    const studentData = JSON.parse(
      fs.readFileSync(path.join(__dirname, "seeds/students.json"), "utf-8")
    ).map(normalizeObjectId);

    const examData = JSON.parse(
      fs.readFileSync(path.join(__dirname, "seeds/exams.json"), "utf-8")
    ).map(normalizeObjectId);

    await privilegeModel.deleteMany({});
    await roleModel.deleteMany({});
    await userModel.deleteMany({});
    await studentModel.deleteMany({});
    await examModel.deleteMany({});

    await privilegeModel.insertMany(privilegeData);
    await roleModel.insertMany(roleData);
    await userModel.insertMany(userData);
    await studentModel.insertMany(studentData);
    await examModel.insertMany(examData);

    console.log("Opération terminée!");
    process.exit(0);
  } catch (error) {
    console.error("Erreur lors du seed :", error);
    process.exit(1);
  }
}

seed();
