import { z } from "zod";

const contactSchema = z.object({
  name: z.string().min(3),
  number: z.string().regex(/^\d{10}$/, { message: "Invalid phone number" }),
});
const allergySchema = z.object({
  name: z.string().min(3),
});
const medicationSchema = z.object({
  name: z.string().min(3),
});
const medicalConditionSchema = z.object({
  name: z.string().min(3),
});

export const healthFormSchema = z.object({
  harmfulMedicalConditions: z.array(medicalConditionSchema),
  harmfulMedications: z.array(medicationSchema),
  allergies: z.array(allergySchema),
  doNotResusitate: z.boolean(),
  seizureDisorder: z.boolean(),
  missingOrgans: z.boolean(),
  bloodType: z.string(),
  emergencyContacts: z.array(contactSchema),
  doctorContacts: z.array(contactSchema),
});