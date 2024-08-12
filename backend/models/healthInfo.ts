import { HealthInfo as HealthInfoType } from "../types/healthInfo";
import mongoose from "mongoose";

const { Schema } = mongoose;

const contactSchema = new Schema({
  name: { type: String, required: true, minlength: 3 },
  number: { type: String, required: true, match: /^\d{10}$/ },
});

const allergySchema = new Schema({
  name: { type: String, required: true, minlength: 3 },
});

const medicationSchema = new Schema({
  name: { type: String, required: true, minlength: 3 },
});

const medicalConditionSchema = new Schema({
  name: { type: String, required: true, minlength: 3 },
});

const HealthInfoSchema = new Schema(
  {
    legalName: { type: String, required: true },
    profileImage: { type: String, required: true },
    age: { type: String, required: true },
    harmfulMedicalConditions: { type: [medicalConditionSchema], required: true },
    harmfulMedications: { type: [medicationSchema], required: true },
    allergies: { type: [allergySchema], required: true },
    doNotResusitate: { type: Boolean, required: true },
    seizureDisorder: { type: Boolean, required: true },
    missingOrgans: { type: Boolean, required: true },
    bloodType: { type: String, required: true },
    emergencyContacts: { type: [contactSchema], required: true },
    doctorContacts: { type: [contactSchema], required: true },
  },
  { timestamps: true }
);

const HealthInfo = mongoose.models.HealthInfo || mongoose.model<HealthInfoType>("HealthInfo", HealthInfoSchema);

export default HealthInfo;
