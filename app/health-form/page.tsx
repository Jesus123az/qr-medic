"use client";
import { Suspense } from "react";
import { Input } from "@/components/ui/input";
import QRCodeComponent from "@/components/QRCodeComponent/QRCodeComponent";
import { z } from "zod";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler } from "react-hook-form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { CldUploadButton } from "next-cloudinary";
import Image from "next/image";
import { User } from "lucide-react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";

const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

const HealthForm = () => {
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

  const healthFormSchema = z.object({
    legalName: z.string().min(3),
    harmfulMedicalConditions: z.array(medicalConditionSchema),
    harmfulMedications: z.array(medicationSchema),
    allergies: z.array(allergySchema),
    doNotResusitate: z.boolean(),
    profileImage: z.string().nullable(),
    seizureDisorder: z.boolean(),
    missingOrgans: z.boolean(),
    bloodType: z.string(),
    emergencyContacts: z.array(contactSchema),
    doctorContacts: z.array(contactSchema),
  });
  type FormFields = z.infer<typeof healthFormSchema>;

  const form = useForm<FormFields>({
    resolver: zodResolver(healthFormSchema),
    defaultValues: {
      harmfulMedicalConditions: [{ name: "" }],
      harmfulMedications: [{ name: "" }],
      allergies: [{ name: "" }],
      doNotResusitate: false,
      profileImage: null,
      seizureDisorder: false,
      missingOrgans: false,
      bloodType: "",
      emergencyContacts: [{ name: "", number: "" }],
      doctorContacts: [{ name: "", number: "" }],
    },
  });

  const {
    fields: medicalConditionFields,
    append: appendMedicalCondition,
    remove: removeMedicalCondition,
  } = useFieldArray({
    control: form.control,
    name: "harmfulMedicalConditions",
  });

  const {
    fields: medicationFields,
    append: appendMedication,
    remove: removeMedication,
  } = useFieldArray({
    control: form.control,
    name: "harmfulMedications",
  });

  const {
    fields: allergyFields,
    append: appendAllergy,
    remove: removeAllergy,
  } = useFieldArray({
    control: form.control,
    name: "allergies",
  });

  const {
    fields: emergencyFields,
    append: appendEmergency,
    remove: removeEmergency,
  } = useFieldArray({
    control: form.control,
    name: "emergencyContacts",
  });

  const {
    fields: doctorContactsFields,
    append: appendDoctorContacts,
    remove: removeDoctorContacts,
  } = useFieldArray({
    control: form.control,
    name: "doctorContacts",
  });

  const onSubmit: SubmitHandler<FormFields> = (
    values: z.infer<typeof healthFormSchema>
  ) => {
    setTimeout(() => {
      console.log(values);
    }, 2000);
  };

  return (
    <div className="px-[10%] py-8 bg-[#CBE9EF]  flex flex-col justify-center items-center">
      <h1 className="text-[30px] font-bold">Medical Form</h1>
      <p className="font-medium">It only takes two easy steps!</p>
      <div className="form-container mt-20  bg-white w-[90%] shadow-lg px-28 py-10 rounded-[31px]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div>
              <div className="step1 flex justify-between">
                <div className="flex flex-col">
        <h1 className=" text-3xl font-bold">Step 1</h1>
        <div className="flex gap-x-5 mt-5 h-full ">
          <div className="flex flex-col h-full justify-between items-center py-1">
            <div className="min-w-5 min-h-5 border-2 border-[#14264C] rounded-full"></div>
            <div className="min-w-[1px] max-w-[1px] min-h-5 bg-[#D1D1D1] rounded-full h-[70%]"></div>
            <div className="min-w-5 min-h-5 border-2 border-[#14264C] rounded-full"></div>
          </div>
          <div className="flex flex-col h-full justify-between">
            <div>
              <h3 className="text-xl font-medium">Enter your legally authorized name</h3>
              <FormField
                    control={form.control}
                    name={`legalName`}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input className="w-96 mt-5" placeholder="Full Name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                    />
                    </div>
              <h3 className="text-xl font-medium">Upload your Photo for Verification</h3>
              </div>
              </div>
              </div>
              <div className="flex flex-col items-center gap-y-5">
                <div className="w-40 h-40 bg-[#C0E4EB] rounded-3xl border-2 border-[#88CBD7] flex justify-center items-center">
                {form.getValues("profileImage")?
                <Image className="max-w-full max-h-full" src={""} alt="" />
                :
                <User className="w-16 h-16 text-[#88CBD7]" />
              }
                </div>
                <CldUploadButton
            uploadPreset="med-ar"
            onSuccess={(result) => {
              form.setValue(
                "profileImage",
                typeof result.info === "object" ? result.info.secure_url : null
              );
              // setProfilePic(
              //   typeof result.info === "object" ? result.info.secure_url : null
              // );
            }}
            options={{
              sources: ["local"],
              clientAllowedFormats: ['jpeg', 'jpg', 'png'],
              cropping: true,
              maxFiles: 1,
              multiple: false,
            }}
            className="bg-[#1A4E68] rounded-xl text-white px-5 py-2"
          >Upload Photo</CldUploadButton>
              </div>
                    </div>
                    <div className="min-h-[1px] min-w-full bg-[#D1D1D1] my-20"></div>
                    <h1 className=" text-3xl font-bold ">Step 2</h1>
                    <FormField
              control={form.control}
              name="bloodType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Blood Type?</FormLabel>
                  <FormControl>
                    <Select>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Blood Group" />
                      </SelectTrigger>
                      <SelectContent>
                        {bloodGroups.map((group, index) => (
                          <SelectItem key={index} value={group}>
                            {group}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
              <h3 className="text-xl font-medium">
                List of Medical Conditions that can harm or kill you?
              </h3>
              {medicalConditionFields.map((field, index) => (
                <div key={field.id} className="flex items-end gap-x-5">
                  <FormField
                    control={form.control}
                    name={`harmfulMedicalConditions.${index}.name`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Medical Condition {index + 1}</FormLabel>
                        <FormControl>
                          <Input placeholder="example: xyz" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {index !== 0 && (
                    <Button
                    className="bg-[#1A4E68]"
                      type="button"
                      onClick={() => removeMedicalCondition(index)}
                    >
                      Remove
                    </Button>
                  )}
                </div>
              ))}
              <Button
                className="mt-4 bg-[#1A4E68]"
                type="button"
                onClick={() => appendMedicalCondition({ name: "" })}
              >
                Add 1 More
              </Button>
            </div>
            <div>
              <h3 className="text-xl font-medium">
                {" "}
                List of Medications that can harm or kill you, might not do well
                with or without?
              </h3>
              {medicationFields.map((field, index) => (
                <div key={field.id} className="flex items-end gap-x-5">
                  <FormField
                    control={form.control}
                    name={`harmfulMedications.${index}.name`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Medication {index + 1}</FormLabel>
                        <FormControl>
                          <Input placeholder="example: xyz" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {index !== 0 && (
                    <Button
                    className="bg-[#1A4E68]"
                      type="button"
                      onClick={() => removeMedication(index)}
                    >
                      Remove
                    </Button>
                  )}
                </div>
              ))}
              <Button
                className="mt-4 bg-[#1A4E68]"
                type="button"
                onClick={() => appendMedication({ name: "" })}
              >
                Add 1 More
              </Button>
            </div>
            <div>
              <h3 className="text-xl font-medium">
                {" "}
                List of Allergies that can harm or kill you?
              </h3>
              {allergyFields.map((field, index) => (
                <div key={field.id} className="flex items-end gap-x-5">
                  <FormField
                    control={form.control}
                    name={`allergies.${index}.name`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Allergy {index + 1}</FormLabel>
                        <FormControl>
                          <Input placeholder="example: xyz" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {index !== 0 && (
                    <Button className="bg-[#1A4E68]" type="button" onClick={() => removeAllergy(index)}>
                      Remove
                    </Button>
                  )}
                </div>
              ))}
              <Button
                className="mt-4 bg-[#1A4E68]"
                type="button"
                onClick={() => appendAllergy({ name: "" })}
              >
                Add 1 More
              </Button>
            </div>
            <FormField
              control={form.control}
              name="doNotResusitate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Do you have a Do Not Resuscitate order?</FormLabel>
                  <FormControl>
                    <RadioGroup onChange={field.onChange} defaultValue="false">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem id="true" value="true" />
                        <Label htmlFor="true">Yes</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem id="false" value="false" />
                        <Label htmlFor="false">No</Label>
                      </div>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="seizureDisorder"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Do you have a Seizure disorder?</FormLabel>
                  <FormControl>
                    <RadioGroup onChange={field.onChange} defaultValue="false">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem id="true" value="true" />
                        <Label htmlFor="true">Yes</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem id="false" value="false" />
                        <Label htmlFor="false">No</Label>
                      </div>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="missingOrgans"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Do you have any missing organs?</FormLabel>
                  <FormControl>
                    <RadioGroup defaultValue="false">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem id="organs-true" value="true" />
                        <Label htmlFor="organs-true">Yes</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem id="organs-false" value="false" />
                        <Label htmlFor="organs-false">No</Label>
                      </div>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div>
              <h3 className="text-xl">Emergency Contacts</h3>
              {emergencyFields.map((field, index) => (
                <div key={field.id} className="flex gap-x-6 items-end mt-4">
                  <FormField
                    control={form.control}
                    name={`emergencyContacts.${index}.name`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Emergency Contact {index + 1} Name{" "}
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="example: xyz" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`emergencyContacts.${index}.number`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Emergency Contact {index + 1} Number{" "}
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="10 digits" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {index === 1 && (
                    <Button
                    className="bg-[#1A4E68]"
                      type="button"
                      onClick={() => removeEmergency(index)}
                    >
                      Remove
                    </Button>
                  )}
                </div>
              ))}
              {emergencyFields.length < 2 && (
                <Button
                  className="mt-4 bg-[#1A4E68]"
                  type="button"
                  onClick={() => appendEmergency({ name: "", number: "" })}
                >
                  Add 1 More
                </Button>
              )}
            </div>
            <div className="">
              <h3 className="text-xl">Doctor Contacts</h3>
              {doctorContactsFields.map((field, index) => (
                <div key={field.id} className="flex gap-x-6 items-end mt-4">
                  <FormField
                    control={form.control}
                    name={`doctorContacts.${index}.name`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Doctor {index + 1} Name </FormLabel>
                        <FormControl>
                          <Input placeholder="example: xyz" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`doctorContacts.${index}.number`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Doctor {index + 1} Number </FormLabel>
                        <FormControl>
                          <Input
                            type="tel"
                            placeholder="10 digits"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {index === 1 && (
                    <Button
                    className="bg-[#1A4E68]"
                      type="button"
                      onClick={() => removeDoctorContacts(index)}
                    >
                      Remove
                    </Button>
                  )}
                </div>
              ))}
              {doctorContactsFields.length < 2 && (
                <Button
                  className="mt-4 bg-[#1A4E68]"
                  type="button"
                  onClick={() => appendDoctorContacts({ name: "", number: "" })}
                >
                  Add 1 More
                </Button>
              )}
            </div>
            <Button className="bg-[#1A4E68]"  disabled={form.formState.isSubmitting} type="button">
              Generate QR Code
            </Button>
            <QRCodeComponent />
          </form>
        </Form>
      </div>
    </div>
  );
};

export default HealthForm;
