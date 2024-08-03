"use client";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler } from "react-hook-form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import  QRCodeStyling from "qr-code-styling"
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
import { useRef, useEffect } from "react";

const qrCode = new QRCodeStyling({
  width: 300,
  height: 300,
  image:
    "https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg",
    data: "http://localhost:3000/api/users/66ad5b216e710ad2464f4ced",
  dotsOptions: {
    color: "#072138",
    type: "rounded"
  },
  cornersSquareOptions:{
    color: "#7A914B",
    type: "extra-rounded"
  },
  imageOptions: {
    crossOrigin: "anonymous",
    margin: 20
  }
});

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
  type FormFields = z.infer<typeof healthFormSchema>;

  const form = useForm<FormFields>({
    resolver: zodResolver(healthFormSchema),
    defaultValues: {
      harmfulMedicalConditions: [{ name: "" }],
      harmfulMedications: [{ name: "" }],
      allergies: [{ name: "" }],
      doNotResusitate: false,
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

const showQRCode = () => {
    const divRef = ref.current;
    qrCode.append(divRef? divRef: new HTMLElement());
  }

  const ref = useRef(null);
  return (
    <div className="px-[10%]  py-20 flex flex-col justify-center items-center">
      <div className="form-container w-[90%] shadow-lg px-10 py-4 rounded-lg">
        <h1 className="text-center text-3xl font-bold">Health Form</h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div>
              <h3 className="font-bold">
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
                      type="button"
                      onClick={() => removeMedicalCondition(index)}
                    >
                      Remove
                    </Button>
                  )}
                </div>
              ))}
              <Button
                className="mt-4"
                type="button"
                onClick={() => appendMedicalCondition({ name: "" })}
              >
                Add 1 More
              </Button>
            </div>
            <div>
              <h3 className="font-bold">
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
                      type="button"
                      onClick={() => removeMedication(index)}
                    >
                      Remove
                    </Button>
                  )}
                </div>
              ))}
              <Button
                className="mt-4"
                type="button"
                onClick={() => appendMedication({ name: "" })}
              >
                Add 1 More
              </Button>
            </div>
            <div>
              <h3 className="font-bold">
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
                    <Button type="button" onClick={() => removeAllergy(index)}>
                      Remove
                    </Button>
                  )}
                </div>
              ))}
              <Button
                className="mt-4"
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
            <div className="">
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
                  className="mt-4"
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
                  className="mt-4"
                  type="button"
                  onClick={() => appendDoctorContacts({ name: "", number: "" })}
                >
                  Add 1 More
                </Button>
              )}
            </div>
            <Button onClick={showQRCode}  disabled={form.formState.isSubmitting} type="button">
              Generate QR Code
            </Button>
            <div ref={ref} />
          </form>
        </Form>
      </div>
    </div>
  );
};

export default HealthForm;
